const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface Event {
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

export interface CreateEventData {
  summary: string;
  description?: string;
  startDateTime: string;
  endDateTime: string;
}

const BASE_URL = `${API_URL}/api`;

function toRfc3339WithOffset(localDateTime: string): string {
  // Converte "YYYY-MM-DDTHH:mm" para RFC3339 com timezone local: YYYY-MM-DDTHH:mm:ss±HH:MM
  const d = new Date(localDateTime);
  const pad = (n: number) => String(n).padStart(2, "0");
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());
  const tzOffsetMin = -d.getTimezoneOffset();
  const sign = tzOffsetMin >= 0 ? "+" : "-";
  const tzH = pad(Math.floor(Math.abs(tzOffsetMin) / 60));
  const tzM = pad(Math.abs(tzOffsetMin) % 60);
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${tzH}:${tzM}`;
}

export const eventsService = {
  // Listar eventos
  async getEvents(startDate: string, endDate: string): Promise<Event[]> {
    // Chamará o backend na próxima etapa; por ora retorna vazio para evitar dependência do Google
    const url = `${BASE_URL}/events?start=${encodeURIComponent(startDate)}&end=${encodeURIComponent(endDate)}`;
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("ga_token") : null;
      const res = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },

  // Criar evento
  async createEvent(eventData: CreateEventData): Promise<Event> {
    const token = typeof window !== "undefined" ? localStorage.getItem("ga_token") : null;
    const body = {
      summary: eventData.summary,
      description: eventData.description,
      startDateTime: toRfc3339WithOffset(eventData.startDateTime),
      endDateTime: toRfc3339WithOffset(eventData.endDateTime),
    };
    const res = await fetch(`${BASE_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Falha ao criar evento");
    return await res.json();
  },

  // Atualizar evento
  async updateEvent(
    eventId: string,
    eventData: CreateEventData
  ): Promise<Event> {
    const token = typeof window !== "undefined" ? localStorage.getItem("ga_token") : null;
    const body = {
      summary: eventData.summary,
      description: eventData.description,
      startDateTime: toRfc3339WithOffset(eventData.startDateTime),
      endDateTime: toRfc3339WithOffset(eventData.endDateTime),
    };
    const res = await fetch(`${BASE_URL}/events/${encodeURIComponent(eventId)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Falha ao atualizar evento");
    return await res.json();
  },

  // Deletar evento
  async deleteEvent(eventId: string): Promise<void> {
    const token = typeof window !== "undefined" ? localStorage.getItem("ga_token") : null;
    const res = await fetch(`${BASE_URL}/events/${encodeURIComponent(eventId)}`, {
      method: "DELETE",
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    });
    if (!res.ok) throw new Error("Falha ao deletar evento");
  },
};

