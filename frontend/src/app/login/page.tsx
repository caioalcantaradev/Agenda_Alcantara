"use client";

import { useState } from "react";
import { API_URL } from "@/lib/api-client";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const url = `${API_URL}/api/auth/login`;
    console.log("🔗 Tentando login em:", url);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("📡 Resposta do servidor:", res.status, res.statusText);

      if (!res.ok) {
        let errorData: any = {};
        try {
          errorData = await res.json();
        } catch {
          // Se não conseguir parsear JSON, usa mensagem padrão
        }

        if (res.status === 401) {
          throw new Error("Email ou senha incorretos");
        } else if (res.status === 400) {
          throw new Error(errorData.message || "Preencha todos os campos");
        } else if (res.status === 0 || res.status >= 500) {
          throw new Error(
            "Servidor indisponível. Tente novamente em alguns instantes."
          );
        } else {
          throw new Error(
            errorData.message || "Erro ao fazer login. Tente novamente."
          );
        }
      }

      const data = await res.json();
      if (typeof window !== "undefined") {
        localStorage.setItem("ga_token", data.token);
      }
      window.location.href = "/";
    } catch (err: any) {
      console.error("❌ Erro no login:", err);
      console.error("URL usada:", url);
      console.error("API_URL:", API_URL);

      if (err?.message && typeof err.message === "string") {
        // Se já tem uma mensagem de erro em português, usa ela
        if (
          !err.message.includes("fetch") &&
          !err.message.includes("Failed") &&
          !err.message.includes("NetworkError")
        ) {
          setError(err.message);
        } else {
          setError(
            `Não foi possível conectar ao servidor. Verifique se a URL da API está configurada corretamente. (URL: ${API_URL})`
          );
        }
      } else if (
        err?.name === "TypeError" ||
        err?.message?.includes("fetch") ||
        err?.message?.includes("Failed") ||
        err?.message?.includes("NetworkError")
      ) {
        setError(
          `Não foi possível conectar ao servidor. Verifique se a URL da API está configurada corretamente na Vercel. (URL atual: ${
            API_URL || "não configurada"
          })`
        );
      } else {
        setError("Erro ao fazer login. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Senha
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 pr-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            {showPassword ? (
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
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Agenda Alcantara
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Faça login para acessar sua agenda compartilhada
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow rounded-lg">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Entrar
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Use seu email e senha
              </p>
            </div>

            <LoginForm />
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Acesso restrito aos usuários autorizados</p>
        </div>
      </div>
    </div>
  );
}
