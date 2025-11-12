"use client";

import { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { eventsService, Event } from "@/lib/events";
import { isHoliday } from "@/lib/holidays";
import EventDetailsModal from "./EventDetailsModal";

interface CalendarProps {
  onDateClick: (date: Date) => void;
  refreshTrigger?: number;
}

export default function Calendar({
  onDateClick,
  refreshTrigger,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  // Inclui dias de "folga" no início/fim para alinhar corretamente com Dom..Sáb
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // Domingo
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const loadEvents = async () => {
    setLoading(true);
    try {
      const startDate = monthStart.toISOString();
      const endDate = monthEnd.toISOString();
      const eventsData = await eventsService.getEvents(startDate, endDate);
      setEvents(eventsData);
    } catch (error) {
      console.error("Erro ao carregar eventos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [currentDate, refreshTrigger]); // eslint-disable-line react-hooks/exhaustive-deps

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start.dateTime);
      return isSameDay(eventDate, date);
    });
  };

  // Função para detectar conflitos de horários
  const hasConflict = (event: Event) => {
    const eventStart = new Date(event.start.dateTime);
    const eventEnd = new Date(event.end.dateTime);

    return events.some((otherEvent) => {
      if (otherEvent.id === event.id) return false;

      const otherStart = new Date(otherEvent.start.dateTime);
      const otherEnd = new Date(otherEvent.end.dateTime);

      // Verifica se há sobreposição de horários
      return (
        (eventStart < otherEnd && eventEnd > otherStart) ||
        (otherStart < eventEnd && otherEnd > eventStart)
      );
    });
  };

  const handleEventClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation(); // Previne o clique na célula do calendário
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  const handleEventUpdated = () => {
    loadEvents();
    // Força o recarregamento quando um evento é atualizado
  };

  const handleEventDeleted = () => {
    loadEvents();
    // Força o recarregamento quando um evento é deletado
  };

  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          {format(currentDate, "MMMM yyyy", { locale: ptBR })}
        </h2>

        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const dayEvents = getEventsForDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isToday = isSameDay(day, new Date());
          const holiday = isHoliday(day);

          return (
            <div
              key={day.toISOString()}
              onClick={() => onDateClick(day)}
              className={`
                min-h-[80px] p-2 border cursor-pointer transition-colors
                ${
                  !isCurrentMonth
                    ? "text-gray-300 dark:text-gray-600"
                    : "text-gray-700 dark:text-gray-300"
                }
                ${
                  isToday
                    ? "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700"
                    : holiday
                    ? "bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                }
                hover:bg-gray-50 dark:hover:bg-gray-700
              `}
            >
              <div className="flex items-center justify-between mb-1">
                <div
                  className={`text-sm font-medium ${
                    isToday
                      ? "text-blue-600 dark:text-blue-400"
                      : holiday
                      ? "text-red-600 dark:text-red-400"
                      : ""
                  }`}
                >
                  {format(day, "d")}
                </div>
                {holiday && (
                  <svg
                    className="w-3 h-3 text-red-500 dark:text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>

              {dayEvents.length > 0 && (
                <div className="mt-1 space-y-1">
                  {dayEvents.slice(0, 2).map((event) => {
                    const conflict = hasConflict(event);
                    return (
                      <div
                        key={event.id}
                        onClick={(e) => handleEventClick(event, e)}
                        className={`text-xs px-1 py-0.5 rounded truncate cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1 ${
                          conflict
                            ? "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700"
                            : "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200"
                        }`}
                        title={
                          conflict ? "⚠️ Conflito de horário" : event.summary
                        }
                      >
                        {conflict && (
                          <svg
                            className="w-3 h-3 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        <span className="truncate">{event.summary}</span>
                      </div>
                    );
                  })}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{dayEvents.length - 2} mais
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {loading && (
        <div className="flex justify-center mt-4">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
        </div>
      )}

      <EventDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        event={selectedEvent}
        onEventUpdated={handleEventUpdated}
        onEventDeleted={handleEventDeleted}
      />
    </div>
  );
}
