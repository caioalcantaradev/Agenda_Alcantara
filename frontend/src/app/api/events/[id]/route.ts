import { NextRequest, NextResponse } from "next/server";
import { Event } from "@/models/Event";
import { connectMongo } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verifica autenticação
    requireAuth(request);

    // Conecta ao MongoDB
    await connectMongo();

    const { id } = params;
    const body = await request.json();
    const { summary, description, startDateTime, endDateTime } = body as {
      summary?: string;
      description?: string;
      startDateTime?: string;
      endDateTime?: string;
    };

    const updateData: any = {};
    if (summary !== undefined) updateData.summary = summary;
    if (description !== undefined) updateData.description = description;
    if (startDateTime) updateData.startDateTime = new Date(startDateTime);
    if (endDateTime) updateData.endDateTime = new Date(endDateTime);

    const updated = await Event.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { message: "Evento não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: String(updated._id),
      summary: updated.summary,
      description: updated.description,
      start: { dateTime: updated.startDateTime.toISOString(), timeZone: "" },
      end: { dateTime: updated.endDateTime.toISOString(), timeZone: "" },
    });
  } catch (error: any) {
    if (error.message === "Não autenticado") {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    console.error("❌ Erro ao atualizar evento:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verifica autenticação
    requireAuth(request);

    // Conecta ao MongoDB
    await connectMongo();

    const { id } = params;
    const deleted = await Event.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Evento não encontrado" },
        { status: 404 }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    if (error.message === "Não autenticado") {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    console.error("❌ Erro ao deletar evento:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
