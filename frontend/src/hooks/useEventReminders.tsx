"use client";

import { useEffect, useRef, useCallback } from "react";
import { eventsService } from "@/lib/events";
import { useNotification } from "./useNotification";
import { useAuth } from "./useAuth";

interface Event {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
}

const REMINDER_TIME_HOURS = 3; // 3 horas antes do compromisso
const CHECK_INTERVAL_MS = 60000; // Verifica a cada 1 minuto (60000ms = 1min)
const NOTIFICATION_KEY = "ga_event_reminders"; // Chave do localStorage para eventos notificados

interface NotifiedEvent {
  eventId: string;
  notifiedAt: string;
  reminderTime: string; // Hora que o evento deveria acontecer
}

/**
 * Hook para gerenciar lembretes de eventos
 * Verifica periodicamente se há eventos próximos e envia notificações
 *
 * Funcionalidades:
 * - Verifica eventos a cada 1 minuto
 * - Envia notificação 3 horas antes de cada compromisso
 * - Evita notificações duplicadas usando localStorage
 * - Funciona para ambos os usuários (eventos compartilhados)
 * - Suporta notificações do navegador (funciona mesmo com a aba fechada)
 * - Limpa automaticamente notificações antigas (mais de 24 horas)
 */
export function useEventReminders() {
  const { showInfo } = useNotification();
  const { isAuthenticated } = useAuth();
  const notifiedEventsRef = useRef<Set<string>>(new Set());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Carrega eventos já notificados do localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(NOTIFICATION_KEY);
      if (stored) {
        const notified: NotifiedEvent[] = JSON.parse(stored);
        // Limpa eventos antigos (mais de 24 horas)
        const now = new Date();
        const validNotifications = notified.filter((item) => {
          const notifiedAt = new Date(item.notifiedAt);
          const hoursSinceNotification =
            (now.getTime() - notifiedAt.getTime()) / (1000 * 60 * 60);
          return hoursSinceNotification < 24; // Mantém apenas notificações das últimas 24 horas
        });

        // Atualiza o localStorage com apenas notificações válidas
        if (validNotifications.length !== notified.length) {
          localStorage.setItem(
            NOTIFICATION_KEY,
            JSON.stringify(validNotifications)
          );
        }

        // Adiciona eventos válidos ao Set
        validNotifications.forEach((item) => {
          notifiedEventsRef.current.add(item.eventId);
        });
      }
    } catch (error) {
      console.error("Erro ao carregar notificações do localStorage:", error);
    }
  }, []);

  // Marca um evento como notificado
  const markEventAsNotified = (eventId: string, eventStartTime: Date) => {
    if (typeof window === "undefined") return;

    try {
      const notified: NotifiedEvent[] = JSON.parse(
        localStorage.getItem(NOTIFICATION_KEY) || "[]"
      );

      notified.push({
        eventId,
        notifiedAt: new Date().toISOString(),
        reminderTime: eventStartTime.toISOString(),
      });

      localStorage.setItem(NOTIFICATION_KEY, JSON.stringify(notified));
      notifiedEventsRef.current.add(eventId);
    } catch (error) {
      console.error("Erro ao salvar notificação no localStorage:", error);
    }
  };

  // Verifica eventos próximos e envia notificações
  const checkUpcomingEvents = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const now = new Date();
      // Busca eventos das próximas 4 horas (para pegar eventos que estão 3h antes)
      const endDate = new Date(now.getTime() + 4 * 60 * 60 * 1000);
      // Busca eventos de 1 hora atrás até 4 horas no futuro
      const startDate = new Date(now.getTime() - 1 * 60 * 60 * 1000);

      const events = await eventsService.getEvents(
        startDate.toISOString(),
        endDate.toISOString()
      );

      events.forEach((event) => {
        const eventStartTime = new Date(event.start.dateTime);
        const eventId = event.id;

        // Verifica se o evento está na janela de lembrete (3 horas antes)
        const reminderTime = new Date(
          eventStartTime.getTime() - REMINDER_TIME_HOURS * 60 * 60 * 1000
        );
        const isInReminderWindow = now >= reminderTime && now < eventStartTime;

        if (isInReminderWindow) {
          // Verifica se já foi notificado
          if (!notifiedEventsRef.current.has(eventId)) {
            // Calcula o tempo restante
            const timeUntilEvent = eventStartTime.getTime() - now.getTime();
            const hoursUntilEvent = Math.floor(
              timeUntilEvent / (1000 * 60 * 60)
            );
            const minutesUntilEvent = Math.floor(
              (timeUntilEvent % (1000 * 60 * 60)) / (1000 * 60)
            );

            // Formata a mensagem de tempo
            let timeMessage = "";
            if (hoursUntilEvent > 0 && minutesUntilEvent > 0) {
              timeMessage = `${hoursUntilEvent}h ${minutesUntilEvent}min`;
            } else if (hoursUntilEvent > 0) {
              timeMessage = `${hoursUntilEvent}h`;
            } else if (minutesUntilEvent > 0) {
              timeMessage = `${minutesUntilEvent}min`;
            } else {
              timeMessage = "agora";
            }

            // Formata a hora do evento
            const eventTime = eventStartTime.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            });

            // Mensagem de notificação
            const message = `⏰ Lembrete: "${event.summary}" em ${timeMessage} (${eventTime})`;

            // Envia notificação visual (toast)
            showInfo(message, 10000); // Mostra por 10 segundos

            // Marca como notificado
            markEventAsNotified(eventId, eventStartTime);

            // Solicita permissão para notificações do navegador se ainda não tiver
            if (
              typeof window !== "undefined" &&
              "Notification" in window &&
              Notification.permission === "default"
            ) {
              Notification.requestPermission()
                .then((permission) => {
                  if (permission === "granted") {
                    try {
                      new Notification("Agenda Alcantara - Lembrete", {
                        body: message,
                        icon: "/icon.png",
                        badge: "/icon.png",
                        tag: eventId,
                        requireInteraction: false,
                      });
                    } catch (error) {
                      console.warn(
                        "Erro ao exibir notificação do navegador:",
                        error
                      );
                    }
                  }
                })
                .catch((error) => {
                  console.warn(
                    "Erro ao solicitar permissão de notificação:",
                    error
                  );
                });
            } else if (
              typeof window !== "undefined" &&
              "Notification" in window &&
              Notification.permission === "granted"
            ) {
              // Envia notificação do navegador
              try {
                new Notification("Agenda Alcantara - Lembrete", {
                  body: message,
                  icon: "/icon.png",
                  badge: "/icon.png",
                  tag: eventId,
                  requireInteraction: false,
                });
              } catch (error) {
                console.warn("Erro ao exibir notificação do navegador:", error);
              }
            }
          }
        }
      });
    } catch (error) {
      console.error("Erro ao verificar eventos próximos:", error);
    }
  }, [isAuthenticated, showInfo]);

  // Inicia a verificação periódica
  useEffect(() => {
    if (!isAuthenticated) {
      // Limpa o intervalo se o usuário não estiver autenticado
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Verifica imediatamente ao autenticar
    checkUpcomingEvents();

    // Configura verificação periódica (a cada 1 minuto)
    intervalRef.current = setInterval(() => {
      checkUpcomingEvents();
    }, CHECK_INTERVAL_MS);

    // Limpa o intervalo ao desmontar ou quando isAuthenticated mudar
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAuthenticated, checkUpcomingEvents]);

  // Função para limpar eventos notificados (útil para testes)
  const clearNotifiedEvents = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(NOTIFICATION_KEY);
    notifiedEventsRef.current.clear();
  };

  return {
    clearNotifiedEvents,
  };
}
