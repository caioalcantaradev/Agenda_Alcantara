"use client";

import { useState, useEffect } from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  addWeeks,
  subWeeks,
  getWeek,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { eventsService, Event } from "@/lib/events";
import { isHoliday, getHolidaysInRange } from "@/lib/holidays";
import EventDetailsModal from "./EventDetailsModal";

interface WeeklyCalendarProps {
  onDateClick: (date: Date) => void;
  refreshTrigger?: number;
}

export default function WeeklyCalendar({
  onDateClick,
  refreshTrigger,
}: WeeklyCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const loadEvents = async () => {
    setLoading(true);
    try {
      const startDate = weekStart.toISOString();
      const endDate = weekEnd.toISOString();
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

  const goToPreviousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };

  const goToNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4">
        <div className="flex items-center space-x-4 w-full sm:w-auto justify-center sm:justify-start">
          <button
            onClick={goToPreviousWeek}
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

          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 min-w-[250px] text-center">
            {format(weekStart, "dd/MM", { locale: ptBR })} -{" "}
            {format(weekEnd, "dd/MM/yyyy", { locale: ptBR })}
            <span className="block text-sm text-gray-500 dark:text-gray-400 font-normal mt-1">
              Semana {getWeek(currentDate)}
            </span>
          </h2>

          <button
            onClick={goToNextWeek}
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

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-7 gap-4">
        {days.map((day) => {
          const dayEvents = getEventsForDate(day);
          const isToday = isSameDay(day, new Date());
          const holiday = isHoliday(day);

          return (
            <div
              key={day.toISOString()}
              className={`border rounded-lg p-3 min-h-[300px] sm:min-h-[400px] ${
                isToday
                  ? "bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700"
                  : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              } ${
                holiday
                  ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/30"
                  : ""
              }`}
            >
              {/* Day Header */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-sm font-semibold ${
                      isToday
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {format(day, "EEEE", { locale: ptBR })}
                  </span>
                  <span
                    className={`text-lg font-bold rounded-full w-8 h-8 flex items-center justify-center ${
                      isToday
                        ? "bg-blue-600 text-white"
                        : holiday
                        ? "bg-red-600 dark:bg-red-500 text-white"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {format(day, "d")}
                  </span>
                </div>
                {holiday && (
                  <div className="text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {holiday.name}
                  </div>
                )}
              </div>

              {/* Events */}
              <div className="space-y-1">
                {dayEvents.map((event) => {
                  const conflict = hasConflict(event);
                  return (
                    <div
                      key={event.id}
                      onClick={(e) => handleEventClick(event, e)}
                      className={`text-xs p-2 rounded cursor-pointer hover:opacity-80 transition-opacity ${
                        conflict
                          ? "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700"
                          : "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200"
                      }`}
                      title={
                        conflict ? "⚠️ Conflito de horário" : event.summary
                      }
                    >
                      <div className="font-medium truncate">
                        {event.summary}
                      </div>
                      <div className="text-xs opacity-75">
                        {format(new Date(event.start.dateTime), "HH:mm")} -{" "}
                        {format(new Date(event.end.dateTime), "HH:mm")}
                      </div>
                    </div>
                  );
                })}
                {dayEvents.length === 0 && (
                  <div className="text-center text-gray-400 dark:text-gray-500 text-xs py-4">
                    Nenhum evento
                  </div>
                )}
              </div>
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
