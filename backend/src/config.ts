import dotenv from "dotenv";

dotenv.config();

// Porta: Railway/Render fornece via PORT, se não tiver, usa 5000
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

export const config = {
  port,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET || "change-me",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
};

if (!config.mongoUri) {
  console.error("❌ MONGODB_URI não está definido!");
  console.error("Configure a variável de ambiente MONGODB_URI com a connection string do MongoDB Atlas.");
  console.error("Exemplo: mongodb+srv://usuario:senha@cluster.mongodb.net/agenda");
  process.exit(1);
}
