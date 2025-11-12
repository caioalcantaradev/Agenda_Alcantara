import bcrypt from "bcryptjs";
import { User } from "@/models/User";
import { connectMongo } from "./db";

export async function seedUsersIfNeeded() {
  try {
    // Conecta ao MongoDB
    await connectMongo();

    // Verifica se já existem usuários
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log(
        `✅ Já existem ${userCount} usuário(s) no banco. Seed não necessário.`
      );
      return;
    }

    console.log("🌱 Nenhum usuário encontrado. Executando seed automático...");

    const users = [
      {
        name: "Caio Alcantara",
        email: "caiocralcantara@gmail.com",
        password: "Senha123",
      },
      {
        name: "Vívian Rodrigues",
        email: "viviansarodrigues@gmail.com",
        password: "Senha123",
      },
    ];

    for (const u of users) {
      const hash = await bcrypt.hash(u.password, 10);
      await User.findOneAndUpdate(
        { email: u.email.toLowerCase() },
        {
          name: u.name,
          email: u.email.toLowerCase(),
          passwordHash: hash,
          mustChangePassword: true,
        },
        { upsert: true, new: true }
      );
      console.log(`✅ Usuário criado: ${u.email}`);
    }

    console.log("✅ Seed automático concluído!");
  } catch (error) {
    console.error("❌ Erro ao executar seed automático:", error);
    // Não interrompe o servidor se o seed falhar
  }
}
