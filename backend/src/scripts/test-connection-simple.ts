import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("❌ MONGODB_URI não está definido!");
  process.exit(1);
}

console.log("🔌 Testando conexão com MongoDB Atlas...");
console.log(
  `📡 URI: ${mongoUri.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@")}`
);
console.log(
  `🔍 Hostname extraído: ${mongoUri.match(/@([^/]+)/)?.[1] || "não encontrado"}`
);

// Testar DNS primeiro
import { promisify } from "util";
import dns from "dns";

const resolveSrv = promisify(dns.resolveSrv);

async function testDNS(): Promise<boolean> {
  if (!mongoUri) {
    console.error("❌ MONGODB_URI não está definido!");
    return false;
  }

  try {
    const hostname = mongoUri.match(/@([^/]+)/)?.[1];
    if (!hostname) {
      console.error(
        "❌ Não foi possível extrair o hostname da connection string"
      );
      return false;
    }

    console.log(`\n🔍 Testando DNS para: ${hostname}`);
    console.log(`🔍 Tentando resolver: _mongodb._tcp.${hostname}`);

    try {
      const records = (await Promise.race([
        resolveSrv(`_mongodb._tcp.${hostname}`),
        new Promise<any>((_, reject) =>
          setTimeout(() => reject(new Error("Timeout após 10 segundos")), 10000)
        ),
      ])) as any[];

      console.log(`✅ DNS resolvido com sucesso!`);
      console.log(`   Encontrados ${records.length} registros SRV`);
      records.forEach((record, index) => {
        console.log(
          `   ${index + 1}. ${record.name}:${record.port} (prioridade: ${
            record.priority
          }, peso: ${record.weight})`
        );
      });
      return true;
    } catch (dnsError: any) {
      console.error(`❌ Erro ao resolver DNS: ${dnsError.message}`);
      console.error(`\n💡 Possíveis causas:`);
      console.error(`   1. O cluster está pausado no MongoDB Atlas`);
      console.error(`   2. O hostname está incorreto na connection string`);
      console.error(`   3. Problema de rede/DNS`);
      console.error(`   4. O cluster não existe ou foi deletado`);
      return false;
    }
  } catch (error: any) {
    console.error(`❌ Erro ao testar DNS: ${error.message}`);
    return false;
  }
}

async function testConnection(): Promise<void> {
  if (!mongoUri) {
    console.error("❌ MONGODB_URI não está definido!");
    process.exit(1);
  }

  console.log(`\n🔌 Tentando conectar ao MongoDB...`);

  try {
    await mongoose.connect(mongoUri, {
      dbName: "agenda",
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 15000,
    });

    console.log("✅ Conectado ao MongoDB Atlas com sucesso!");
    console.log(`📊 Database: ${mongoose.connection.db?.databaseName}`);
    console.log(`🔗 Host: ${mongoose.connection.host}`);
    console.log(
      `📡 Estado: ${
        mongoose.connection.readyState === 1 ? "Conectado" : "Desconectado"
      }`
    );

    // Desconectar
    await mongoose.disconnect();
    console.log("👋 Desconectado do MongoDB");
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Erro ao conectar ao MongoDB:", error.message);

    if (error.name === "MongoServerSelectionError") {
      console.error("\n💡 Possíveis soluções:");
      console.error(
        "   1. Verifique se o cluster está ativo (não pausado) no MongoDB Atlas"
      );
      console.error(
        "   2. Verifique se seu IP está na lista de Network Access"
      );
      console.error("   3. Verifique se a connection string está correta");
    } else if (error.name === "MongoAuthenticationError") {
      console.error("\n💡 Possíveis soluções:");
      console.error("   1. Verifique se o usuário e senha estão corretos");
      console.error("   2. Verifique se o usuário tem permissões adequadas");
    } else if (
      error.code === "ETIMEOUT" ||
      error.message.includes("ETIMEOUT")
    ) {
      console.error("\n💡 Erro de timeout - Possíveis causas:");
      console.error("   1. O cluster está pausado no MongoDB Atlas");
      console.error("   2. O Network Access não está configurado");
      console.error("   3. Problema de rede/DNS");
      console.error("   4. O cluster não existe mais");
      console.error("\n🔍 Verifique no MongoDB Atlas:");
      console.error("   - Acesse: https://cloud.mongodb.com/");
      console.error("   - Verifique se o cluster está ativo (não pausado)");
      console.error("   - Verifique se o Network Access está configurado");
      console.error("   - Verifique se a connection string está correta");
    }

    process.exit(1);
  }
}

async function main() {
  // Testar DNS primeiro
  const dnsOk = await testDNS();

  if (!dnsOk) {
    console.error(
      "\n❌ DNS não pôde ser resolvido. Verifique o MongoDB Atlas."
    );
    console.error("\n🔍 Verifique no MongoDB Atlas:");
    console.error("   1. Acesse: https://cloud.mongodb.com/");
    console.error(
      "   2. Verifique se o cluster 'agenda-alcantara' existe e está ativo"
    );
    console.error(
      "   3. Se estiver pausado, clique em 'Resume' ou 'Resume Cluster'"
    );
    console.error("   4. Verifique se o Network Access está configurado");
    process.exit(1);
  }

  // Se DNS está OK, tentar conectar
  await testConnection();
}

main();
