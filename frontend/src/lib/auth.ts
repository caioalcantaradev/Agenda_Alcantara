export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

type StoredAuth = {
  accessToken: string;
  expiresAt: number; // epoch ms
  user: User;
};

const LS_KEY = "ga_auth";
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string | undefined;
const GOOGLE_OAUTH_SCOPES = [
  "openid",
  "email",
  "profile",
  "https://www.googleapis.com/auth/calendar.events",
].join(" ");

let gsiLoaded = false;
let tokenClient: any | null = null; // google.accounts.oauth2.TokenClient

async function loadScript(src: string): Promise<void> {
  if (document.querySelector(`script[src="${src}"]`)) return;
  await new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Falha ao carregar script: ${src}`));
    document.head.appendChild(s);
  });
}

function getStoredAuth(): StoredAuth | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredAuth;
  } catch {
    return null;
  }
}

function setStoredAuth(data: StoredAuth | null) {
  if (!data) {
    localStorage.removeItem(LS_KEY);
    return;
  }
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

async function ensureGsi(): Promise<void> {
  if (gsiLoaded) return;
  if (!GOOGLE_CLIENT_ID) throw new Error("Defina NEXT_PUBLIC_GOOGLE_CLIENT_ID no .env");
  await loadScript("https://accounts.google.com/gsi/client");
  // @ts-ignore
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CLIENT_ID,
    scope: GOOGLE_OAUTH_SCOPES,
    callback: () => {},
  });
  gsiLoaded = true;
}

async function requestAccessToken(interactive: boolean): Promise<{ access_token: string; expires_in?: number }> {
  await ensureGsi();
  return await new Promise((resolve, reject) => {
    try {
      tokenClient!.callback = (response: any) => {
        if (response && response.access_token) {
          resolve(response);
        } else {
          reject(new Error(response?.error || "Falha ao obter token"));
        }
      };
      tokenClient!.requestAccessToken({ prompt: interactive ? "consent" : "" });
    } catch (err) {
      reject(err);
    }
  });
}

async function fetchUserInfo(accessToken: string): Promise<User> {
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error("Não foi possível obter dados do usuário");
  const data = await res.json();
  return {
    id: data.sub,
    email: data.email,
    name: data.name,
    picture: data.picture,
  } as User;
}

export const authService = {
  async signIn(): Promise<User> {
    const tokenResponse = await requestAccessToken(true);
    const accessToken = tokenResponse.access_token;
    const expiresAt = Date.now() + (tokenResponse.expires_in ? tokenResponse.expires_in * 1000 : 50 * 60 * 1000);
    const user = await fetchUserInfo(accessToken);
    setStoredAuth({ accessToken, expiresAt, user });
    return user;
  },

  async getAccessToken(): Promise<string> {
    const stored = getStoredAuth();
    if (stored && stored.expiresAt > Date.now() + 10_000) {
      return stored.accessToken;
    }
    // Tenta renovar silenciosamente, cai para interação se necessário
    try {
      const silent = await requestAccessToken(false);
      const accessToken = silent.access_token;
      const expiresAt = Date.now() + (silent.expires_in ? silent.expires_in * 1000 : 50 * 60 * 1000);
      const user = stored?.user || (await fetchUserInfo(accessToken));
      setStoredAuth({ accessToken, expiresAt, user });
      return accessToken;
    } catch {
      const interactive = await requestAccessToken(true);
      const accessToken = interactive.access_token;
      const expiresAt = Date.now() + (interactive.expires_in ? interactive.expires_in * 1000 : 50 * 60 * 1000);
      const user = stored?.user || (await fetchUserInfo(accessToken));
      setStoredAuth({ accessToken, expiresAt, user });
      return accessToken;
    }
  },

  async getCurrentUser(): Promise<User> {
    const stored = getStoredAuth();
    if (stored) return stored.user;
    // Sem cache, força sign-in
    const user = await this.signIn();
    return user;
  },

  logout() {
    setStoredAuth(null);
    window.location.href = "/login";
  },

  isAuthenticated(): boolean {
    const stored = getStoredAuth();
    return !!stored && stored.expiresAt > Date.now();
  },
};

