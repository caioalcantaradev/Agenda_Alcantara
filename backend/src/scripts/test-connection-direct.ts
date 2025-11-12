import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("❌ MONGODB_URI não está definido!");
  process.exit(1);
}

console.log("🔌 Testando conexão direta com MongoDB Atlas...");
console.log(
  `📡 URI: ${mongoUri.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@")}`
);

// Testar conexão direta (sem verificar DNS primeiro)
async function testDirectConnection() {
  if (!mongoUri) {
    console.error("❌ MONGODB_URI não está definido!");
    process.exit(1);
  }

  console.log(`\n🔌 Tentando conectar diretamente ao MongoDB...`);
  console.log(`⏳ Aguardando resposta... (pode levar até 30 segundos)\n`);

  try {
    await mongoose.connect(mongoUri, {
      dbName: "agenda",
      serverSelectionTimeoutMS: 30000, // 30 segundos
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000, // 30 segundos
      maxPoolSize: 10,
      minPoolSize: 1,
      retryWrites: true,
      w: "majority",
    });

    console.log("✅ Conectado ao MongoDB Atlas com sucesso!");
    console.log(`📊 Database: ${mongoose.connection.db?.databaseName}`);
    console.log(`🔗 Host: ${mongoose.connection.host}`);
    console.log(
      `📡 Estado: ${
        mongoose.connection.readyState === 1 ? "Conectado" : "Desconectado"
      }`
    );

    // Testar operações básicas
    console.log(`\n🧪 Testando operações básicas...`);
    const db = mongoose.connection.db;
    if (db) {
      const collections = await db.listCollections().toArray();
      console.log(`✅ Coleções encontradas: ${collections.length}`);
      collections.forEach((col) => {
        console.log(`   - ${col.name}`);
      });
    }

    // Desconectar
    await mongoose.disconnect();
    console.log("\n👋 Desconectado do MongoDB");
    console.log("🎉 Conexão funcionando perfeitamente!\n");
    process.exit(0);
  } catch (error: any) {
    console.error("\n❌ Erro ao conectar ao MongoDB:", error.message);
    console.error(`   Tipo: ${error.name}`);
    console.error(`   Código: ${error.code || "N/A"}`);

    if (error.name === "MongoServerSelectionError") {
      console.error("\n💡 Possíveis soluções:");
      console.error(
        "   1. Verifique se o cluster está ativo (não pausado) no MongoDB Atlas"
      );
      console.error(
        "   2. Verifique se o Network Access está configurado (0.0.0.0/0)"
      );
      console.error(
        "   3. Aguarde alguns minutos após configurar Network Access"
      );
      console.error("   4. Verifique se a connection string está correta");
    } else if (error.name === "MongoAuthenticationError") {
      console.error("\n💡 Possíveis soluções:");
      console.error("   1. Verifique se o usuário e senha estão corretos");
      console.error("   2. Verifique se o usuário tem permissões adequadas");
      console.error("   3. Verifique se o usuário existe no MongoDB Atlas");
    } else if (
      error.code === "ETIMEOUT" ||
      error.message.includes("ETIMEOUT") ||
      error.message.includes("querySrv")
    ) {
      console.error("\n💡 Erro de timeout - Possíveis causas:");
      console.error(
        "   1. Network Access não foi aplicado ainda (aguarde alguns minutos)"
      );
      console.error("   2. Problema de DNS/rede local");
      console.error("   3. Firewall ou antivírus bloqueando");
      console.error("   4. Proxy ou VPN interferindo");
      console.error("\n🔍 Verifique no MongoDB Atlas:");
      console.error("   - Acesse: https://cloud.mongodb.com/");
      console.error("   - Vá em Network Access");
      console.error("   - Verifique se 0.0.0.0/0 está configurado");
      console.error("   - Aguarde 5-10 minutos após configurar");
    }

    process.exit(1);
  }
}

testDirectConnection();
