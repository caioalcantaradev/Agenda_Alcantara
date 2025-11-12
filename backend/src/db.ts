import mongoose from "mongoose";
import { config } from "./config.js";

export async function connectMongo(): Promise<void> {
  try {
    if (!config.mongoUri) {
      throw new Error("MONGODB_URI não está definido");
    }

    console.log("🔌 Tentando conectar ao MongoDB...");
    console.log(`📡 URI: ${config.mongoUri.replace(/\/\/.*@/, "//***:***@")}`); // Oculta credenciais no log

    // Opções de conexão otimizadas para MongoDB Atlas
    const options: mongoose.ConnectOptions = {
      dbName: "agenda",
      serverSelectionTimeoutMS: 10000, // 10 segundos para selecionar servidor
      socketTimeoutMS: 45000, // 45 segundos para operações
      connectTimeoutMS: 10000, // 10 segundos para estabelecer conexão
      maxPoolSize: 10, // Máximo de conexões no pool
      minPoolSize: 1, // Mínimo de conexões no pool
      retryWrites: true, // Retry automático de writes
      w: "majority", // Write concern: espera confirmação da maioria
    };

    await mongoose.connect(config.mongoUri, options);

    console.log("✅ Conectado ao MongoDB Atlas");
    console.log(`📊 Database: ${mongoose.connection.db?.databaseName}`);
    console.log(`🔗 Host: ${mongoose.connection.host}`);

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

    // Evento quando a conexão é estabelecida
    mongoose.connection.once("open", () => {
      console.log("🚀 Conexão MongoDB estabelecida com sucesso");
    });
  } catch (error: any) {
    console.error("❌ Erro ao conectar ao MongoDB:", error.message);
    
    // Mensagens de erro mais descritivas
    if (error.name === "MongoServerSelectionError") {
      console.error("💡 Dica: Verifique se:");
      console.error("   1. Sua connection string está correta");
      console.error("   2. Seu IP está na lista de Network Access no MongoDB Atlas");
      console.error("   3. O cluster está ativo e não pausado");
    } else if (error.name === "MongoAuthenticationError") {
      console.error("💡 Dica: Verifique se:");
      console.error("   1. Usuário e senha estão corretos");
      console.error("   2. O usuário tem permissões adequadas");
    } else if (error.name === "MongoParseError") {
      console.error("💡 Dica: Verifique se a connection string está no formato correto:");
      console.error("   mongodb+srv://usuario:senha@cluster.mongodb.net/agenda");
    }
    
    console.error("Detalhes:", error);
    throw error;
  }
}

// Função para desconectar graciosamente
export async function disconnectMongo(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.log("👋 Desconectado do MongoDB");
  } catch (error: any) {
    console.error("❌ Erro ao desconectar do MongoDB:", error.message);
    throw error;
  }
}
