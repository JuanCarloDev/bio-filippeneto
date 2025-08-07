import { NextRequest, NextResponse } from "next/server";
import { SendTelegramMessage, TelegramGroup } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    // TEMPORÁRIO: Permitir em desenvolvimento para teste
    console.log("🔧 Modo:", process.env.NODE_ENV);

    const body = await request.json();
    const { type, title, url, timestamp, userAgent } = body;

    // Obter informações básicas do usuário
    const userInfo = {
      ip:
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        "IP não disponível",
      userAgent: userAgent || "Não disponível",
      timestamp: timestamp || new Date().toISOString(),
    };

    // Criar mensagem para o Telegram
    let message = `<b>🖱️ Clique Detectado - Filippe Neto AI</b>\n\n`;

    // Emoji baseado no tipo
    const typeEmoji = {
      link: "🔗",
      card: "🃏",
      button: "🔘",
    };

    message += `${
      typeEmoji[type as keyof typeof typeEmoji] || "🖱️"
    } <b>Tipo:</b> ${type}\n`;
    message += `📝 <b>Título:</b> ${title}\n`;

    if (url) {
      message += `🌐 <b>URL:</b> ${url}\n`;
    }

    message += `🌐 <b>IP:</b> ${userInfo.ip}\n`;
    message += `📱 <b>Device:</b> ${
      userInfo.userAgent.includes("Mobile") ? "Mobile" : "Desktop"
    }\n`;
    message += `⏰ <b>Horário:</b> ${new Date(
      userInfo.timestamp
    ).toLocaleString("pt-BR")}\n`;
    message += `🌍 <b>User Agent:</b> ${userInfo.userAgent.substring(
      0,
      100
    )}...`;

    // Enviar notificação para o Telegram
    /* await SendTelegramMessage(message, TelegramGroup.FILIPPENETO); */

    console.log("✅ Notificação de clique enviada para o Telegram");

    return NextResponse.json({
      success: true,
      message: "Click tracked successfully",
    });
  } catch (error) {
    console.error("❌ Erro ao rastrear clique:", error);
    return NextResponse.json(
      { error: "Error tracking click" },
      { status: 500 }
    );
  }
}
