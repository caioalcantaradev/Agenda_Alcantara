"use client";

import LoginButton from "@/components/LoginButton";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Família Alcantara
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Faça login para acessar sua agenda compartilhada
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow rounded-lg">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Entrar com Google
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Use sua conta Google para acessar a agenda
              </p>
            </div>

            <div className="flex justify-center">
              <LoginButton />
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Agenda integrada com Google Calendar</p>
          <p>Compartilhada entre usuários autorizados</p>
        </div>
      </div>
    </div>
  );
}
