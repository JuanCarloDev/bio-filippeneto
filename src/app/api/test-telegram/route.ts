import { NextRequest, NextResponse } from "next/server";
import { SendTelegramMessage, TelegramGroup } from "@/lib/utils";

export async function GET() {
  try {
    const testMessage = `
<b>🧪 Teste de Mensagem - Filippe Neto AI</b>

📍 Esta é uma mensagem de teste para verificar se o sistema está funcionando.
⏰ <b>Horário:</b> ${new Date().toLocaleString("pt-BR")}
🔧 <b>Status:</b> Sistema funcionando corretamente!
    `;

    const result = await SendTelegramMessage(
      testMessage.trim(),
      TelegramGroup.FILIPPENETO
    );

    if (result) {
      return NextResponse.json({
        success: true,
        message: "Mensagem de teste enviada com sucesso para o Telegram!",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Falha ao enviar mensagem de teste",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("❌ Erro no teste do Telegram:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erro interno no teste",
      },
      { status: 500 }
    );
  }
}
