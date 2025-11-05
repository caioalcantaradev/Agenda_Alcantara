import express from "express";
import cors from "cors";
import { config } from "./config";
import { connectMongo } from "./db";
import { authRouter } from "./routes/auth";
import { eventsRouter } from "./routes/events";

async function bootstrap() {
  try {
    console.log("🚀 Iniciando servidor...");
    console.log(`📡 Porta: ${config.port}`);
    console.log(`🔗 CORS Origin: ${config.corsOrigin}`);
    
    // Conectar ao MongoDB
    await connectMongo();

    const app = express();
    app.use(cors({ origin: config.corsOrigin }));
    app.use(express.json());

    // Health check (sem autenticação)
    app.get("/api/health", (_req, res) => {
      res.json({ ok: true, timestamp: new Date().toISOString() });
    });

    app.use("/api/auth", authRouter);
    app.use("/api/events", eventsRouter);

    // Tratamento de erros global
    app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
      console.error("❌ Erro não tratado:", err);
      res.status(500).json({ message: "Erro interno do servidor" });
    });

    // Iniciar servidor
    const server = app.listen(config.port, "0.0.0.0", () => {
      console.log(`✅ API rodando na porta ${config.port}`);
      console.log(`🌐 Health check: http://0.0.0.0:${config.port}/api/health`);
    });

    // Tratamento de erros do servidor
    server.on("error", (err: any) => {
      if (err.code === "EADDRINUSE") {
        console.error(`❌ Porta ${config.port} já está em uso`);
      } else {
        console.error("❌ Erro no servidor:", err);
      }
      process.exit(1);
    });

    // Graceful shutdown
    process.on("SIGTERM", () => {
      console.log("🛑 SIGTERM recebido, encerrando servidor...");
      server.close(() => {
        console.log("✅ Servidor encerrado");
        process.exit(0);
      });
    });

    process.on("SIGINT", () => {
      console.log("🛑 SIGINT recebido, encerrando servidor...");
      server.close(() => {
        console.log("✅ Servidor encerrado");
        process.exit(0);
      });
    });

  } catch (error) {
    console.error("❌ Falha ao iniciar servidor:", error);
    process.exit(1);
  }
}

bootstrap();

