import { NextRequest, NextResponse } from "next/server";
import { Event } from "@/models/Event";
import { connectMongo } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // Verifica autenticação
    requireAuth(request);

    // Conecta ao MongoDB
    await connectMongo();

    const { searchParams } = new URL(request.url);
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    const filter: any = {};
    if (start || end) {
      filter.startDateTime = {};
      if (start) filter.startDateTime.$gte = new Date(start);
      if (end) filter.startDateTime.$lte = new Date(end);
    }

    const items = await Event.find(filter).sort({ startDateTime: 1 }).lean();
    const mapped = items.map((e) => ({
      id: String(e._id),
      summary: e.summary,
      description: e.description,
      start: { dateTime: e.startDateTime.toISOString(), timeZone: "" },
      end: { dateTime: e.endDateTime.toISOString(), timeZone: "" },
    }));

    return NextResponse.json(mapped);
  } catch (error: any) {
    if (error.message === "Não autenticado") {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    console.error("❌ Erro ao listar eventos:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verifica autenticação
    requireAuth(request);

    // Conecta ao MongoDB
    await connectMongo();

    const body = await request.json();
    const { summary, description, startDateTime, endDateTime } = body as {
      summary?: string;
      description?: string;
      startDateTime?: string;
      endDateTime?: string;
    };

    if (!summary || !startDateTime || !endDateTime) {
      return NextResponse.json(
        { message: "Campos obrigatórios ausentes" },
        { status: 400 }
      );
    }

    const created = await Event.create({
      summary,
      description,
      startDateTime: new Date(startDateTime),
      endDateTime: new Date(endDateTime),
      ownerId: null,
    });

    return NextResponse.json(
      {
        id: String(created._id),
        summary: created.summary,
        description: created.description,
        start: { dateTime: created.startDateTime.toISOString(), timeZone: "" },
        end: { dateTime: created.endDateTime.toISOString(), timeZone: "" },
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.message === "Não autenticado") {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    console.error("❌ Erro ao criar evento:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
