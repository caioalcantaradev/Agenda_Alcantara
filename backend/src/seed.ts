import bcrypt from "bcryptjs";
import { connectMongo } from "./db.js";
import { User } from "./models/User.js";

async function run() {
  await connectMongo();

  const users = [
    { name: "Caio Alcantara", email: "caiocralcantara@gmail.com", password: "Senha123" },
    { name: "Vívian Rodrigues", email: "viviansarodrigues@gmail.com", password: "Senha123" },
  ];

  for (const u of users) {
    const hash = await bcrypt.hash(u.password, 10);
    await User.findOneAndUpdate(
      { email: u.email.toLowerCase() },
      { name: u.name, email: u.email.toLowerCase(), passwordHash: hash, mustChangePassword: true },
      { upsert: true, new: true }
    );
  }

  console.log("Seed concluído");
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

