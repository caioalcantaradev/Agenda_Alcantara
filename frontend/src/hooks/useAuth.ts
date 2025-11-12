import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api-client";

export type User = {
  id: string;
  name: string;
  email: string;
  mustChangePassword?: boolean;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("ga_token") : null;
    if (!token) {
      setLoading(false);
      return;
    }
    const run = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("unauthorized");
        const data = await res.json();
        setUser(data.user);
      } catch {
        if (typeof window !== "undefined") localStorage.removeItem("ga_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Credenciais inválidas");
    const data = await res.json();
    if (typeof window !== "undefined")
      localStorage.setItem("ga_token", data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ga_token");
    }
    setUser(null);
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
};
