import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "@/models/User";
import { connectMongo } from "@/lib/db";
import { config } from "@/lib/config";
import { seedUsersIfNeeded } from "@/lib/seed-auto";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    console.log("🔐 Tentativa de login recebida");

    // Conecta ao MongoDB
    await connectMongo();

    // Executa seed automático se necessário
    await seedUsersIfNeeded();

    const body = await request.json();
    const { email, password } = body as { email?: string; password?: string };

    if (!email || !password) {
      console.log("❌ Login falhou: email ou senha ausentes");
      return NextResponse.json(
        { message: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    console.log(`🔍 Buscando usuário: ${email.toLowerCase()}`);
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log("❌ Login falhou: usuário não encontrado");
      return NextResponse.json(
        { message: "Email ou senha incorretos" },
        { status: 401 }
      );
    }

    console.log(`✅ Usuário encontrado: ${user.name}`);
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      console.log("❌ Login falhou: senha incorreta");
      return NextResponse.json(
        { message: "Email ou senha incorretos" },
        { status: 401 }
      );
    }

    console.log(`✅ Login bem-sucedido para: ${user.email}`);

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      config.jwtSecret,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        mustChangePassword: user.mustChangePassword,
      },
    });
  } catch (error: any) {
    console.error("❌ Erro no login:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
