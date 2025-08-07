import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Notification Data Interface
export interface NotificationData {
  nome: string;
  email: string;
  telefone?: string;
  source?: string;
  sessionId?: string;
}

// Configurações do Telegram
const CHAT_ID_PRODUCTION = "-4977721363";
const CHAT_ID_FILIPPENETO = "-4977721363"; // ID do novo grupo do Filippe Neto
const BOT_ID = "6946151816:AAGo9-kEQs94bwaQjkdRmCz7MAp63IBM8mY";

// Enum para facilitar seleção do grupo
export enum TelegramGroup {
  PRODUCTION = "production",
  FILIPPENETO = "filippeneto",
}

export async function SendTelegramMessage(
  message: string,
  groupType?: TelegramGroup | string,
  AlternativeBotId?: string
) {
  // Determina qual chat ID usar
  let chatId: string = CHAT_ID_FILIPPENETO; // Default para o grupo do Filippe Neto

  if (groupType) {
    if (typeof groupType === "string") {
      if (groupType === TelegramGroup.FILIPPENETO) {
        chatId = CHAT_ID_FILIPPENETO;
      } else if (groupType === TelegramGroup.PRODUCTION) {
        chatId = CHAT_ID_PRODUCTION;
      } else if (groupType.startsWith("-")) {
        // ID de chat direto
        chatId = groupType;
      } else {
        chatId = CHAT_ID_FILIPPENETO;
      }
    }
  }

  const botId = AlternativeBotId || BOT_ID;
  const formattedMessage = message.replace(/\n/g, "%0A");

  const apiUrl = `https://api.telegram.org/bot${botId}/sendMessage?chat_id=${chatId}&text=${formattedMessage}&parse_mode=HTML`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error(
        "Telegram API error:",
        response.status,
        response.statusText
      );
      return false;
    }

    const data = await response.json();
    console.log("Telegram message sent successfully:", data.message_id);
    return true;
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    return false;
  }
}
