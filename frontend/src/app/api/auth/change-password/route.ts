import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";
import { connectMongo } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // Verifica autenticação
    const authUser = requireAuth(request);

    // Conecta ao MongoDB
    await connectMongo();

    const body = await request.json();
    const { currentPassword, newPassword } = body as {
      currentPassword?: string;
      newPassword?: string;
    };

    if (!newPassword) {
      return NextResponse.json(
        { message: "Nova senha é obrigatória" },
        { status: 400 }
      );
    }

    const user = await User.findById(authUser.id);
    if (!user) {
      return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
    }

    if (user.mustChangePassword) {
      // No primeiro acesso, currentPassword pode ser omitida
    } else {
      if (!currentPassword) {
        return NextResponse.json(
          { message: "Senha atual é obrigatória" },
          { status: 400 }
        );
      }
      const ok = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!ok) {
        return NextResponse.json(
          { message: "Senha atual incorreta" },
          { status: 401 }
        );
      }
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    user.mustChangePassword = false;
    await user.save();

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.message === "Não autenticado") {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    console.error("❌ Erro ao alterar senha:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
