import { NextRequest, NextResponse } from "next/server";
import { SendTelegramMessage, TelegramGroup } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const { nome, whatsapp } = await request.json();

    if (!nome || !whatsapp) {
      return NextResponse.json(
        {
          success: false,
          message: "Nome e WhatsApp são obrigatórios",
        },
        { status: 400 }
      );
    }

    const message = `
<b>🎯 NOVA INSCRIÇÃO - MASTERMIND EXCLUSIVO</b>

👤 <b>Nome:</b> ${nome}
📱 <b>WhatsApp:</b> ${whatsapp}
⏰ <b>Data/Hora:</b> ${new Date().toLocaleString("pt-BR")}
🌐 <b>Fonte:</b> Linktree Filippe Neto
    `;

    const result = await SendTelegramMessage(
      message.trim(),
      TelegramGroup.FILIPPENETO
    );

    if (result) {
      return NextResponse.json({
        success: true,
        message: "Inscrição enviada com sucesso!",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Falha ao enviar inscrição",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("❌ Erro na inscrição do Mastermind:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erro interno no servidor",
      },
      { status: 500 }
    );
  }
}
