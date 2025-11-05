import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { Event } from "../models/Event";

export const eventsRouter = Router();

eventsRouter.use(requireAuth);

eventsRouter.get("/", async (req, res) => {
  const { start, end } = req.query as { start?: string; end?: string };
  const filter: any = {};
  if (start || end) {
    filter.startDateTime = {};
    if (start) filter.startDateTime.$gte = new Date(start);
    if (end) filter.startDateTime.$lte = new Date(end);
  }
  const items = await Event.find(filter).sort({ startDateTime: 1 }).lean();
  const mapped = items.map((e) => ({
    id: String(e._id),
    summary: e.summary,
    description: e.description,
    start: { dateTime: e.startDateTime.toISOString(), timeZone: "" },
    end: { dateTime: e.endDateTime.toISOString(), timeZone: "" },
  }));
  return res.json(mapped);
});

eventsRouter.post("/", async (req, res) => {
  const { summary, description, startDateTime, endDateTime } = req.body as {
    summary?: string;
    description?: string;
    startDateTime?: string;
    endDateTime?: string;
  };
  if (!summary || !startDateTime || !endDateTime) {
    return res.status(400).json({ message: "Campos obrigatórios ausentes" });
  }
  const created = await Event.create({
    summary,
    description,
    startDateTime: new Date(startDateTime),
    endDateTime: new Date(endDateTime),
    ownerId: null,
  });
  return res.status(201).json({
    id: String(created._id),
    summary: created.summary,
    description: created.description,
    start: { dateTime: created.startDateTime.toISOString(), timeZone: "" },
    end: { dateTime: created.endDateTime.toISOString(), timeZone: "" },
  });
});

eventsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { summary, description, startDateTime, endDateTime } = req.body as {
    summary?: string;
    description?: string;
    startDateTime?: string;
    endDateTime?: string;
  };
  const updated = await Event.findByIdAndUpdate(
    id,
    {
      ...(summary !== undefined ? { summary } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(startDateTime ? { startDateTime: new Date(startDateTime) } : {}),
      ...(endDateTime ? { endDateTime: new Date(endDateTime) } : {}),
    },
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: "Evento não encontrado" });
  return res.json({
    id: String(updated._id),
    summary: updated.summary,
    description: updated.description,
    start: { dateTime: updated.startDateTime.toISOString(), timeZone: "" },
    end: { dateTime: updated.endDateTime.toISOString(), timeZone: "" },
  });
});

eventsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await Event.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ message: "Evento não encontrado" });
  return res.status(204).send();
});

