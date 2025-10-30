import api from "./api";

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

export const eventsService = {
  // Listar eventos
  async getEvents(startDate: string, endDate: string): Promise<Event[]> {
    const response = await api.get("/api/events", {
      params: { startDate, endDate },
    });
    return response.data;
  },

  // Criar evento
  async createEvent(eventData: CreateEventData): Promise<Event> {
    const response = await api.post("/api/events", eventData);
    return response.data;
  },

  // Atualizar evento
  async updateEvent(
    eventId: string,
    eventData: CreateEventData
  ): Promise<Event> {
    const response = await api.put(`/api/events/${eventId}`, eventData);
    return response.data;
  },

  // Deletar evento
  async deleteEvent(eventId: string): Promise<void> {
    await api.delete(`/api/events/${eventId}`);
  },
};

