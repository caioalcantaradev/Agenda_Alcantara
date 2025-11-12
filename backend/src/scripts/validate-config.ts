import dotenv from "dotenv";

/**
 * Script para validar a configuração do projeto
 * Execute: npm run validate:config
 */
function validateConfig() {
  console.log("🔍 Validando configuração do projeto...\n");

  // Carregar variáveis de ambiente
  dotenv.config();

  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Verificar MONGODB_URI
  console.log("1️⃣  Verificando MONGODB_URI...");
  if (!process.env.MONGODB_URI) {
    errors.push("MONGODB_URI não está definido");
    console.log("   ❌ MONGODB_URI não está definido");
  } else {
    const uri = process.env.MONGODB_URI;

    // Validar formato básico
    if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
      errors.push("MONGODB_URI deve começar com mongodb:// ou mongodb+srv://");
      console.log(
        "   ❌ Formato inválido (deve começar com mongodb:// ou mongodb+srv://)"
      );
    } else {
      // Ocultar credenciais no log
      const maskedUri = uri.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@");
      console.log(`   ✅ MONGODB_URI definido: ${maskedUri}`);

      // Verificar se tem nome do banco
      if (
        !uri.includes("/agenda") &&
        !uri.includes("?") &&
        !uri.endsWith("/")
      ) {
        warnings.push(
          "MONGODB_URI não especifica o nome do banco. O padrão 'agenda' será usado."
        );
        console.log(
          "   ⚠️  Nome do banco não especificado (usando 'agenda' como padrão)"
        );
      }
    }
  }
  console.log();

  // 2. Verificar JWT_SECRET
  console.log("2️⃣  Verificando JWT_SECRET...");
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET === "change-me") {
    warnings.push(
      "JWT_SECRET não está definido ou está com valor padrão. Use uma string aleatória e segura."
    );
    console.log("   ⚠️  JWT_SECRET não está definido ou está com valor padrão");
  } else {
    if (process.env.JWT_SECRET.length < 32) {
      warnings.push(
        "JWT_SECRET é muito curto. Recomenda-se pelo menos 32 caracteres."
      );
      console.log(
        "   ⚠️  JWT_SECRET é muito curto (recomenda-se pelo menos 32 caracteres)"
      );
    } else {
      console.log("   ✅ JWT_SECRET definido");
    }
  }
  console.log();

  // 3. Verificar PORT
  console.log("3️⃣  Verificando PORT...");
  if (!process.env.PORT) {
    console.log("   ℹ️  PORT não definido (usando padrão: 5000)");
  } else {
    const port = parseInt(process.env.PORT, 10);
    if (isNaN(port) || port < 1 || port > 65535) {
      errors.push("PORT deve ser um número entre 1 e 65535");
      console.log("   ❌ PORT inválido");
    } else {
      console.log(`   ✅ PORT definido: ${port}`);
    }
  }
  console.log();

  // 4. Verificar CORS_ORIGIN
  console.log("4️⃣  Verificando CORS_ORIGIN...");
  if (!process.env.CORS_ORIGIN) {
    console.log(
      "   ℹ️  CORS_ORIGIN não definido (usando padrão: http://localhost:3000)"
    );
  } else {
    console.log(`   ✅ CORS_ORIGIN definido: ${process.env.CORS_ORIGIN}`);
  }
  console.log();

  // 5. Verificar NODE_ENV
  console.log("5️⃣  Verificando NODE_ENV...");
  if (!process.env.NODE_ENV) {
    console.log("   ℹ️  NODE_ENV não definido");
  } else {
    console.log(`   ✅ NODE_ENV definido: ${process.env.NODE_ENV}`);
  }
  console.log();

  // Resumo
  console.log("📋 Resumo:");
  if (errors.length === 0 && warnings.length === 0) {
    console.log("   ✅ Todas as configurações estão corretas!");
    process.exit(0);
  } else {
    if (errors.length > 0) {
      console.log(`   ❌ ${errors.length} erro(s) encontrado(s):`);
      errors.forEach((error) => console.log(`      - ${error}`));
    }
    if (warnings.length > 0) {
      console.log(`   ⚠️  ${warnings.length} aviso(s):`);
      warnings.forEach((warning) => console.log(`      - ${warning}`));
    }
    console.log();
    console.log(
      "💡 Dica: Verifique o arquivo .env e siga o exemplo em env.example"
    );
    process.exit(errors.length > 0 ? 1 : 0);
  }
}

validateConfig();
