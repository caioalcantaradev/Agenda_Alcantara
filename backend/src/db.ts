import mongoose from "mongoose";
import { config } from "./config";

export async function connectMongo(): Promise<void> {
  try {
    if (!config.mongoUri) {
      throw new Error("MONGODB_URI não está definido");
    }

    console.log("🔌 Tentando conectar ao MongoDB...");
    
    await mongoose.connect(config.mongoUri, {
      dbName: "agenda",
      serverSelectionTimeoutMS: 10000, // 10 segundos
      socketTimeoutMS: 45000,
    });

    console.log("✅ Conectado ao MongoDB Atlas");

    // Tratamento de eventos de conexão
    mongoose.connection.on("error", (err) => {
      console.error("❌ Erro na conexão MongoDB:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  MongoDB desconectado");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("✅ MongoDB reconectado");
    });

  } catch (error: any) {
    console.error("❌ Erro ao conectar ao MongoDB:", error.message);
    console.error("Detalhes:", error);
    throw error;
  }
}

