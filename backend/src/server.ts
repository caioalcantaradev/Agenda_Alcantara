import express from "express";
import cors from "cors";
import { config } from "./config.js";
import { connectMongo } from "./db.js";
import { authRouter } from "./routes/auth.js";
import { eventsRouter } from "./routes/events.js";
import { seedUsersIfNeeded } from "./seed-auto.js";

async function bootstrap() {
  try {
    console.log("🚀 Iniciando servidor...");
    console.log(`📡 Porta: ${config.port}`);
    console.log(`🔗 CORS Origin: ${config.corsOrigin}`);

    // Conectar ao MongoDB
    await connectMongo();

    // Executar seed automático se necessário
    await seedUsersIfNeeded();

    const app = express();

    // CORS configurado para aceitar múltiplas origens
    const allowedOrigins = [
      config.corsOrigin,
      "http://localhost:3000",
      "https://agenda-alcantara.vercel.app",
      process.env.FRONTEND_URL,
    ].filter(Boolean);

    app.use(
      cors({
        origin: (origin, callback) => {
          // Permite requisições sem origin (mobile apps, Postman, etc)
          if (!origin) return callback(null, true);
          if (allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            console.warn(`⚠️  CORS bloqueado para origem: ${origin}`);
            callback(null, true); // Permitir todas por enquanto para debug
          }
        },
        credentials: true,
      })
    );

    app.use(express.json());

    // Log de requisições para debug
    app.use((req, res, next) => {
      console.log(
        `${req.method} ${req.path} - Origin: ${
          req.headers.origin || "sem origin"
        }`
      );
      // Log adicional para debug de rotas
      if (req.path.includes("/auth/login")) {
        console.log(
          `🔍 Login route hit - Method: ${req.method}, Path: ${req.path}`
        );
      }
      next();
    });

    // Health check (sem autenticação)
    app.get("/api/health", (_req, res) => {
      res.json({ ok: true, timestamp: new Date().toISOString() });
    });

    // Rota de teste para verificar se o servidor está funcionando
    app.get("/api/test", (_req, res) => {
      res.json({
        message: "API está funcionando!",
        routes: ["/api/auth/login", "/api/auth/me", "/api/events"],
      });
    });

    // Registrar rotas
    app.use("/api/auth", authRouter);
    app.use("/api/events", eventsRouter);

    // Tratamento de erros global
    app.use(
      (
        err: any,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction
      ) => {
        console.error("❌ Erro não tratado:", err);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    );

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
