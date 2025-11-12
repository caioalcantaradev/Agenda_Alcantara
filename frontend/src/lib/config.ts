// Configuração de variáveis de ambiente
export const config = {
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET || "change-me",
};

// Não fazemos process.exit() aqui porque pode quebrar o build do Next.js
// A validação será feita quando a conexão for estabelecida
if (!config.mongoUri && typeof window === "undefined") {
  console.warn("⚠️  MONGODB_URI não está definido!");
  console.warn(
    "Configure a variável de ambiente MONGODB_URI com a connection string do MongoDB Atlas."
  );
  console.warn(
    "Exemplo: mongodb+srv://usuario:senha@cluster.mongodb.net/agenda"
  );
}
