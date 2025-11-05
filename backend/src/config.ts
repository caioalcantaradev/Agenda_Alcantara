import dotenv from "dotenv";

dotenv.config();

// Connection string do MongoDB Atlas
// Pode ser sobrescrita via variável de ambiente MONGODB_URI
const DEFAULT_MONGODB_URI =
  "mongodb+srv://caioalcantaradev_db_user:Cvv2BdcvOWvNPJEM@agenda-alcantara.dxxyho2.mongodb.net/?appName=Agenda-Alcantara";

export const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 5000,
  mongoUri: process.env.MONGODB_URI || DEFAULT_MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET || "change-me",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
};

if (!config.mongoUri) {
  console.warn("MONGODB_URI não definido. Configure o .env.");
} else if (
  config.mongoUri === DEFAULT_MONGODB_URI &&
  !process.env.MONGODB_URI
) {
  console.log("ℹ️  Usando connection string padrão do MongoDB Atlas");
}
