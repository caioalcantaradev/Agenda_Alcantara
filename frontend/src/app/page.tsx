"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Calendar from "@/components/Calendar";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import DailyCalendar from "@/components/DailyCalendar";
import EventModal from "@/components/EventModal";
import ThemeToggle from "@/components/ThemeToggle";

type ViewType = "month" | "week" | "day";

export default function HomePage() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewType, setViewType] = useState<ViewType>("month");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (!loading && isAuthenticated && user?.mustChangePassword) {
      router.push("/alterar-senha");
    }
  }, [loading, isAuthenticated, user?.mustChangePassword, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || user?.mustChangePassword) {
    return null;
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleAddEvent = () => {
    setSelectedDate(new Date());
    setIsModalOpen(true);
  };

  const handleEventCreated = () => {
    // Força o recarregamento dos calendários
    setRefreshTrigger((prev) => prev + 1);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Agenda Alcantara
              </h1>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />

              <div className="hidden sm:flex items-center space-x-3">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {user?.name}
                </span>
              </div>

              <button
                onClick={logout}
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <button
            onClick={handleAddEvent}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Adicionar Compromisso</span>
          </button>

          {/* View Selector */}
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-full sm:w-auto justify-center">
            <button
              onClick={() => setViewType("day")}
              className={`px-3 sm:px-4 py-2 rounded-md transition-colors flex items-center space-x-1 sm:space-x-2 text-sm ${
                viewType === "day"
                  ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Dia</span>
            </button>
            <button
              onClick={() => setViewType("week")}
              className={`px-3 sm:px-4 py-2 rounded-md transition-colors flex items-center space-x-1 sm:space-x-2 text-sm ${
                viewType === "week"
                  ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <span>Semana</span>
            </button>
            <button
              onClick={() => setViewType("month")}
              className={`px-3 sm:px-4 py-2 rounded-md transition-colors flex items-center space-x-1 sm:space-x-2 text-sm ${
                viewType === "month"
                  ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Mês</span>
            </button>
          </div>
        </div>

        {/* Calendar View */}
        {viewType === "month" && (
          <Calendar
            onDateClick={handleDateClick}
            refreshTrigger={refreshTrigger}
          />
        )}
        {viewType === "week" && (
          <WeeklyCalendar
            onDateClick={handleDateClick}
            refreshTrigger={refreshTrigger}
          />
        )}
        {viewType === "day" && (
          <DailyCalendar
            onDateClick={handleDateClick}
            refreshTrigger={refreshTrigger}
          />
        )}

        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedDate={selectedDate}
          onEventCreated={handleEventCreated}
        />
      </main>
    </div>
  );
}
