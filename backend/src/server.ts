import express from "express";
import cors from "cors";
import { config } from "./config";
import { connectMongo } from "./db";
import { authRouter } from "./routes/auth";
import { eventsRouter } from "./routes/events";

async function bootstrap() {
  await connectMongo();

  const app = express();
  app.use(cors({ origin: config.corsOrigin }));
  app.use(express.json());

  app.get("/api/health", (_req, res) => res.json({ ok: true }));
  app.use("/api/auth", authRouter);
  app.use("/api/events", eventsRouter);

  app.listen(config.port, () => {
    console.log(`API rodando na porta ${config.port}`);
  });
}

bootstrap().catch((err) => {
  console.error("Falha ao iniciar servidor:", err);
  process.exit(1);
});

