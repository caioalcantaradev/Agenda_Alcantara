"use client";

import { useState, useEffect } from "react";
import { format, isSameDay, addDays, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { eventsService, Event } from "@/lib/events";
import { isHoliday } from "@/lib/holidays";
import EventDetailsModal from "./EventDetailsModal";

interface DailyCalendarProps {
  onDateClick: (date: Date) => void;
  refreshTrigger?: number;
}

export default function DailyCalendar({
  onDateClick,
  refreshTrigger,
}: DailyCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const startDate = new Date(currentDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(currentDate);
      endDate.setHours(23, 59, 59, 999);

      const eventsData = await eventsService.getEvents(
        startDate.toISOString(),
        endDate.toISOString()
      );
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

  const hasConflict = (event: Event) => {
    const eventStart = new Date(event.start.dateTime);
    const eventEnd = new Date(event.end.dateTime);

    return events.some((otherEvent) => {
      if (otherEvent.id === event.id) return false;

      const otherStart = new Date(otherEvent.start.dateTime);
      const otherEnd = new Date(otherEvent.end.dateTime);

      return (
        (eventStart < otherEnd && eventEnd > otherStart) ||
        (otherStart < eventEnd && otherEnd > eventStart)
      );
    });
  };

  const handleEventClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  const handleEventUpdated = () => {
    loadEvents();
  };

  const handleEventDeleted = () => {
    loadEvents();
  };

  const goToPreviousDay = () => {
    setCurrentDate(subDays(currentDate, 1));
  };

  const goToNextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const isToday = isSameDay(currentDate, new Date());
  const holiday = isHoliday(currentDate);

  // Ordenar eventos por horário
  const sortedEvents = [...events].sort((a, b) => {
    return (
      new Date(a.start.dateTime).getTime() -
      new Date(b.start.dateTime).getTime()
    );
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={goToPreviousDay}
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

          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {format(currentDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {format(currentDate, "EEEE", { locale: ptBR })}
              {holiday && ` • ${holiday.name}`}
            </p>
          </div>

          <button
            onClick={goToNextDay}
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

        <button
          onClick={goToToday}
          className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm"
        >
          Hoje
        </button>
      </div>

      {/* Holiday Badge */}
      {holiday && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg flex items-center gap-2">
          <svg
            className="w-5 h-5 text-red-600 dark:text-red-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-semibold text-red-800 dark:text-red-300">
            {holiday.name}
          </span>
          <span className="text-sm text-red-600 dark:text-red-400">
            • Feriado Nacional
          </span>
        </div>
      )}

      {/* Events List */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : sortedEvents.length > 0 ? (
          sortedEvents.map((event) => {
            const conflict = hasConflict(event);
            return (
              <div
                key={event.id}
                onClick={(e) => handleEventClick(event, e)}
                className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${
                  conflict
                    ? "bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700"
                    : "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                        {event.summary}
                      </h3>
                      {conflict && (
                        <span className="px-2 py-0.5 bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 text-xs rounded-full flex items-center gap-1">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Conflito
                        </span>
                      )}
                    </div>
                    {event.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {event.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {format(new Date(event.start.dateTime), "HH:mm")} -{" "}
                      {format(new Date(event.end.dateTime), "HH:mm")}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 text-gray-400 dark:text-gray-500">
            <svg
              className="w-16 h-16 mx-auto mb-3 text-gray-300 dark:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-lg font-medium">Nenhum evento para este dia</p>
            <p className="text-sm mt-1">
              Clique em "Adicionar Compromisso" para criar um evento
            </p>
          </div>
        )}
      </div>

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
