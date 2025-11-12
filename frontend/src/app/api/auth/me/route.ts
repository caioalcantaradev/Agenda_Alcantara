import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User";
import { connectMongo } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // Verifica autenticação
    const authUser = requireAuth(request);

    // Conecta ao MongoDB
    await connectMongo();

    const user = await User.findById(authUser.id);
    if (!user) {
      return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: String(user._id),
        email: user.email,
        name: user.name,
        mustChangePassword: user.mustChangePassword,
      },
    });
  } catch (error: any) {
    if (error.message === "Não autenticado") {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    console.error("❌ Erro ao obter usuário:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
