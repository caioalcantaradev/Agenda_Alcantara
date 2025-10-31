import { authService } from "./auth";

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

const CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID || "primary";
const BASE_URL = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
  CALENDAR_ID
)}`;

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
    const accessToken = await authService.getAccessToken();
    const url = `${BASE_URL}/events?timeMin=${encodeURIComponent(
      startDate
    )}&timeMax=${encodeURIComponent(endDate)}&singleEvents=true&orderBy=startTime`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) throw new Error("Falha ao listar eventos");
    const data = await res.json();
    const items = (data.items || []) as any[];
    return items
      .filter((e) => e.start?.dateTime && e.end?.dateTime)
      .map((e) => ({
        id: e.id,
        summary: e.summary || "(Sem título)",
        description: e.description,
        start: {
          dateTime: e.start.dateTime,
          timeZone: e.start.timeZone || "",
        },
        end: {
          dateTime: e.end.dateTime,
          timeZone: e.end.timeZone || "",
        },
      }));
  },

  // Criar evento
  async createEvent(eventData: CreateEventData): Promise<Event> {
    const accessToken = await authService.getAccessToken();
    const body = {
      summary: eventData.summary,
      description: eventData.description,
      start: { dateTime: toRfc3339WithOffset(eventData.startDateTime) },
      end: { dateTime: toRfc3339WithOffset(eventData.endDateTime) },
    };
    const res = await fetch(`${BASE_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Falha ao criar evento");
    const e = await res.json();
    return {
      id: e.id,
      summary: e.summary || "(Sem título)",
      description: e.description,
      start: { dateTime: e.start.dateTime, timeZone: e.start.timeZone || "" },
      end: { dateTime: e.end.dateTime, timeZone: e.end.timeZone || "" },
    };
  },

  // Atualizar evento
  async updateEvent(
    eventId: string,
    eventData: CreateEventData
  ): Promise<Event> {
    const accessToken = await authService.getAccessToken();
    const body = {
      summary: eventData.summary,
      description: eventData.description,
      start: { dateTime: toRfc3339WithOffset(eventData.startDateTime) },
      end: { dateTime: toRfc3339WithOffset(eventData.endDateTime) },
    };
    const res = await fetch(`${BASE_URL}/events/${encodeURIComponent(eventId)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Falha ao atualizar evento");
    const e = await res.json();
    return {
      id: e.id,
      summary: e.summary || "(Sem título)",
      description: e.description,
      start: { dateTime: e.start.dateTime, timeZone: e.start.timeZone || "" },
      end: { dateTime: e.end.dateTime, timeZone: e.end.timeZone || "" },
    };
  },

  // Deletar evento
  async deleteEvent(eventId: string): Promise<void> {
    const accessToken = await authService.getAccessToken();
    const res = await fetch(`${BASE_URL}/events/${encodeURIComponent(eventId)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) throw new Error("Falha ao deletar evento");
  },
};

