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

// Telegram Configuration
export enum TelegramGroup {
  JUANCARLO = "JUANCARLO",
  VR_PROJECT = "VR_PROJECT",
  GENERAL = "GENERAL",
}

// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_IDS = {
  [TelegramGroup.JUANCARLO]: process.env.TELEGRAM_CHAT_ID_JUANCARLO,
  [TelegramGroup.VR_PROJECT]: process.env.TELEGRAM_CHAT_ID_VR_PROJECT,
  [TelegramGroup.GENERAL]: process.env.TELEGRAM_CHAT_ID_GENERAL,
};

export async function SendTelegramMessage(
  message: string,
  group: TelegramGroup = TelegramGroup.GENERAL
): Promise<boolean> {
  try {
    if (!TELEGRAM_BOT_TOKEN) {
      console.warn("TELEGRAM_BOT_TOKEN not configured");
      return false;
    }

    const chatId = TELEGRAM_CHAT_IDS[group];
    if (!chatId) {
      console.warn(`Chat ID not configured for group: ${group}`);
      return false;
    }

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Telegram API error:", errorData);
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
