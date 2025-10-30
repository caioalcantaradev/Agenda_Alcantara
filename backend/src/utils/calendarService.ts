import { google } from "googleapis";
import { oauth2Client } from "./googleAuth";

export class CalendarService {
  private calendar: any;

  constructor(accessToken: string) {
    oauth2Client.setCredentials({ access_token: accessToken });
    this.calendar = google.calendar({ version: "v3", auth: oauth2Client });
  }

  async getEvents(startDate: string, endDate: string) {
    try {
      const response = await this.calendar.events.list({
        calendarId: process.env.SHARED_CALENDAR_ID,
        timeMin: startDate,
        timeMax: endDate,
        singleEvents: true,
        orderBy: "startTime",
      });

      return response.data.items || [];
    } catch (error) {
      throw new Error("Erro ao buscar eventos do calendário");
    }
  }

  async createEvent(eventData: {
    summary: string;
    description?: string;
    start: { dateTime: string; timeZone: string };
    end: { dateTime: string; timeZone: string };
  }) {
    try {
      const response = await this.calendar.events.insert({
        calendarId: process.env.SHARED_CALENDAR_ID,
        resource: eventData,
      });

      return response.data;
    } catch (error) {
      throw new Error("Erro ao criar evento no calendário");
    }
  }

  async updateEvent(
    eventId: string,
    eventData: {
      summary: string;
      description?: string;
      start: { dateTime: string; timeZone: string };
      end: { dateTime: string; timeZone: string };
    }
  ) {
    try {
      const response = await this.calendar.events.update({
        calendarId: process.env.SHARED_CALENDAR_ID,
        eventId: eventId,
        resource: eventData,
      });

      return response.data;
    } catch (error) {
      throw new Error("Erro ao atualizar evento no calendário");
    }
  }

  async deleteEvent(eventId: string) {
    try {
      await this.calendar.events.delete({
        calendarId: process.env.SHARED_CALENDAR_ID,
        eventId: eventId,
      });

      return { success: true };
    } catch (error) {
      throw new Error("Erro ao deletar evento do calendário");
    }
  }
}

