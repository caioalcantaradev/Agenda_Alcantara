import { Router, Response } from "express";
import { CalendarService } from "../utils/calendarService";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const router = Router();

// Aplicar middleware de autenticação em todas as rotas
router.use(authenticateToken);

// Listar eventos
router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "startDate e endDate são obrigatórios" });
    }

    const calendarService = new CalendarService(req.user.accessToken);
    const events = await calendarService.getEvents(
      startDate as string,
      endDate as string
    );

    res.json(events);
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    res.status(500).json({ message: "Erro ao buscar eventos" });
  }
});

// Criar evento
router.post("/", async (req: AuthRequest, res: Response) => {
  try {
    const { summary, description, startDateTime, endDateTime } = req.body;

    if (!summary || !startDateTime || !endDateTime) {
      return res.status(400).json({
        message: "summary, startDateTime e endDateTime são obrigatórios",
      });
    }

    const calendarService = new CalendarService(req.user.accessToken);
    const event = await calendarService.createEvent({
      summary,
      description,
      start: {
        dateTime: startDateTime,
        timeZone: "America/Sao_Paulo",
      },
      end: {
        dateTime: endDateTime,
        timeZone: "America/Sao_Paulo",
      },
    });

    res.status(201).json(event);
  } catch (error) {
    console.error("Erro ao criar evento:", error);
    res.status(500).json({ message: "Erro ao criar evento" });
  }
});

// Atualizar evento
router.put("/:eventId", async (req: AuthRequest, res: Response) => {
  try {
    const { eventId } = req.params;
    const { summary, description, startDateTime, endDateTime } = req.body;

    if (!summary || !startDateTime || !endDateTime) {
      return res.status(400).json({
        message: "summary, startDateTime e endDateTime são obrigatórios",
      });
    }

    const calendarService = new CalendarService(req.user.accessToken);
    const event = await calendarService.updateEvent(eventId, {
      summary,
      description,
      start: {
        dateTime: startDateTime,
        timeZone: "America/Sao_Paulo",
      },
      end: {
        dateTime: endDateTime,
        timeZone: "America/Sao_Paulo",
      },
    });

    res.json(event);
  } catch (error) {
    console.error("Erro ao atualizar evento:", error);
    res.status(500).json({ message: "Erro ao atualizar evento" });
  }
});

// Deletar evento
router.delete("/:eventId", async (req: AuthRequest, res: Response) => {
  try {
    const { eventId } = req.params;

    const calendarService = new CalendarService(req.user.accessToken);
    await calendarService.deleteEvent(eventId);

    res.json({ message: "Evento deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar evento:", error);
    res.status(500).json({ message: "Erro ao deletar evento" });
  }
});

export default router;
