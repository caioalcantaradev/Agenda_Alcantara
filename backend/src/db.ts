import mongoose from "mongoose";
import { config } from "./config";

export async function connectMongo(): Promise<void> {
  try {
    await mongoose.connect(config.mongoUri, {
      dbName: "agenda",
    });
    console.log("✅ Conectado ao MongoDB Atlas");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
    throw error;
  }
}

