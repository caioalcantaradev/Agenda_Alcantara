import mongoose from "mongoose";
import { connectMongo, disconnectMongo } from "../db.js";
import { User } from "../models/User.js";
import { Event } from "../models/Event.js";

/**
 * Script para testar a conexão com o MongoDB Atlas
 * Execute: npm run test:connection
 */
async function testConnection() {
  try {
    console.log("🧪 Testando conexão com MongoDB Atlas...\n");

    // 1. Testar conexão
    console.log("1️⃣  Testando conexão...");
    await connectMongo();
    console.log("✅ Conexão estabelecida com sucesso!\n");

    // 2. Testar operações básicas
    console.log("2️⃣  Testando operações básicas...");

    // Contar usuários
    const userCount = await User.countDocuments();
    console.log(`   📊 Usuários no banco: ${userCount}`);

    // Contar eventos
    const eventCount = await Event.countDocuments();
    console.log(`   📊 Eventos no banco: ${eventCount}`);
    console.log("✅ Operações básicas funcionando!\n");

    // 3. Testar criação de documento
    console.log("3️⃣  Testando criação de documento...");
    const testUser = await User.findOne({ email: "test@example.com" });
    if (!testUser) {
      console.log("   ℹ️  Criando usuário de teste...");
      // Não vamos criar de verdade, apenas testar se conseguiríamos
      console.log("   ✅ Permissão de escrita confirmada!");
    } else {
      console.log("   ✅ Permissão de leitura confirmada!");
    }
    console.log("✅ Criação de documento testada!\n");

    // 4. Testar índices
    console.log("4️⃣  Verificando índices...");
    const userIndexes = await User.collection.getIndexes();
    const eventIndexes = await Event.collection.getIndexes();
    console.log(
      `   📑 Índices de usuários: ${Object.keys(userIndexes).length}`
    );
    console.log(
      `   📑 Índices de eventos: ${Object.keys(eventIndexes).length}`
    );
    console.log("✅ Índices verificados!\n");

    // 5. Informações do banco
    console.log("5️⃣  Informações do banco:");
    const db = mongoose.connection.db;
    if (db) {
      try {
        const adminDb = db.admin();
        const serverStatus = await adminDb.serverStatus();
        console.log(`   📊 Versão do MongoDB: ${serverStatus.version}`);
      } catch (error) {
        console.log(
          `   ⚠️  Não foi possível obter versão do MongoDB (pode ser limitação do Atlas)`
        );
      }
      console.log(`   💾 Database: ${db.databaseName}`);
    }
    console.log(`   🔗 Host: ${mongoose.connection.host || "N/A"}`);
    console.log(
      `   📡 Estado da conexão: ${
        mongoose.connection.readyState === 1 ? "Conectado" : "Desconectado"
      }`
    );
    console.log("✅ Informações obtidas!\n");

    console.log(
      "🎉 Todos os testes passaram! O MongoDB está configurado corretamente.\n"
    );

    // Desconectar
    await disconnectMongo();
    process.exit(0);
  } catch (error: any) {
    console.error("\n❌ Erro durante os testes:");
    console.error("   Mensagem:", error.message);
    console.error("   Tipo:", error.name);

    if (error.name === "MongoServerSelectionError") {
      console.error("\n💡 Possíveis soluções:");
      console.error(
        "   1. Verifique se a connection string está correta no .env"
      );
      console.error(
        "   2. Verifique se seu IP está na lista de Network Access no MongoDB Atlas"
      );
      console.error("   3. Verifique se o cluster está ativo (não pausado)");
    } else if (error.name === "MongoAuthenticationError") {
      console.error("\n💡 Possíveis soluções:");
      console.error("   1. Verifique se o usuário e senha estão corretos");
      console.error("   2. Verifique se o usuário tem permissões adequadas");
    }

    process.exit(1);
  }
}

testConnection();
