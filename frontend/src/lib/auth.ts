import api from "./api";

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  // Obter URL de autenticação do Google
  async getAuthUrl(): Promise<string> {
    const response = await api.get("/api/auth/google");
    return response.data.authUrl;
  },

  // Fazer login com código do Google
  async loginWithGoogle(code: string): Promise<AuthResponse> {
    const response = await api.post("/api/auth/google/callback", { code });
    return response.data;
  },

  // Obter usuário autenticado
  async getCurrentUser(): Promise<User> {
    const response = await api.get("/api/auth/me");
    return response.data;
  },

  // Fazer logout
  logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  },

  // Verificar se está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  },
};

