import mongoose from "mongoose";
import { config } from "./config";

// Cache da conexão para reutilização em Serverless Functions
let cachedConnection: typeof mongoose | null = null;

export async function connectMongo(): Promise<typeof mongoose> {
  // Se já existe conexão e está conectada, reutiliza
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  try {
    if (!config.mongoUri) {
      throw new Error("MONGODB_URI não está definido");
    }

    // Opções de conexão otimizadas para MongoDB Atlas e Vercel Serverless
    const options: mongoose.ConnectOptions = {
      dbName: "agenda",
      serverSelectionTimeoutMS: 30000, // 30 segundos
      socketTimeoutMS: 45000, // 45 segundos
      connectTimeoutMS: 30000, // 30 segundos
      maxPoolSize: 1, // Serverless Functions: pool menor
      minPoolSize: 1,
      retryWrites: true,
      w: "majority",
    };

    // Conecta ao MongoDB
    cachedConnection = await mongoose.connect(config.mongoUri, options);

    console.log("✅ Conectado ao MongoDB Atlas");

    // Tratamento de eventos de conexão
    mongoose.connection.on("error", (err) => {
      console.error("❌ Erro na conexão MongoDB:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  MongoDB desconectado");
      cachedConnection = null;
    });

    mongoose.connection.on("reconnected", () => {
      console.log("✅ MongoDB reconectado");
    });

    return cachedConnection;
  } catch (error: any) {
    console.error("❌ Erro ao conectar ao MongoDB:", error.message);

    // Mensagens de erro mais descritivas
    if (error.name === "MongoServerSelectionError") {
      console.error("💡 Dica: Verifique se:");
      console.error("   1. Sua connection string está correta");
      console.error(
        "   2. Seu IP está na lista de Network Access no MongoDB Atlas"
      );
      console.error("   3. O cluster está ativo e não pausado");
    } else if (error.name === "MongoAuthenticationError") {
      console.error("💡 Dica: Verifique se:");
      console.error("   1. Usuário e senha estão corretos");
      console.error("   2. O usuário tem permissões adequadas");
    } else if (error.name === "MongoParseError") {
      console.error(
        "💡 Dica: Verifique se a connection string está no formato correto:"
      );
      console.error(
        "   mongodb+srv://usuario:senha@cluster.mongodb.net/agenda"
      );
    }

    throw error;
  }
}
