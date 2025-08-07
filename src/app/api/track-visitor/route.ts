import { NextRequest, NextResponse } from "next/server";
import { SendTelegramMessage, TelegramGroup } from "@/lib/utils";

// Lista de IPs bloqueados para evitar spam
const DEFAULT_BLOCKED_IPS = [
  "189.40.70.175", // IP do Filippe Neto - removido para evitar spam
  "191.177.160.44", // IP adicional bloqueado
];

// Lista de ASNs/ISPs suspeitos (data centers, clouds, hosting)
const SUSPICIOUS_ASNS = [
  "Microsoft Corporation",
  "Amazon.com",
  "Google LLC",
  "DigitalOcean",
  "Linode",
  "Vultr",
  "Hetzner",
  "OVH",
  "Scaleway",
  "Oracle",
];

// Rate limiting simples (em memória)
const ipRequestCounts = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const MAX_REQUESTS_PER_WINDOW = 5; // máximo 5 requests por IP por minuto

// Função para verificar rate limiting
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const ipData = ipRequestCounts.get(ip);

  if (!ipData) {
    ipRequestCounts.set(ip, { count: 1, lastReset: now });
    return false;
  }

  // Reset counter se passou da janela de tempo
  if (now - ipData.lastReset > RATE_LIMIT_WINDOW) {
    ipRequestCounts.set(ip, { count: 1, lastReset: now });
    return false;
  }

  // Incrementa contador
  ipData.count++;

  // Verifica se excedeu o limite
  if (ipData.count > MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  return false;
}

// Detecção avançada de bots baseada em características
function analyzeVisitorData(data: any): { isBot: boolean; reasons: string[] } {
  const reasons: string[] = [];
  let botScore = 0;

  // Análise do User Agent
  const ua = data.userAgent?.toLowerCase() || "";
  const botPatterns = [
    "bot",
    "crawler",
    "spider",
    "scraper",
    "parser",
    "fetcher",
    "monitor",
    "headless",
    "phantom",
    "selenium",
    "puppeteer",
    "playwright",
    "chrome-lighthouse",
    "pingdom",
    "uptimerobot",
    "uptime",
    "sitechecker",
    "gtmetrix",
    "webpagetest",
  ];

  if (botPatterns.some((pattern) => ua.includes(pattern))) {
    botScore += 10;
    reasons.push("User Agent indica bot");
  }

  // Análise de tela (bots frequentemente têm resoluções estranhas)
  if (data.screenInfo) {
    const { width, height, colorDepth } = data.screenInfo;

    // Resoluções muito pequenas ou muito grandes
    if (width < 800 || height < 600 || width > 5000 || height > 5000) {
      botScore += 5;
      reasons.push("Resolução de tela suspeita");
    }

    // Color depth incomum
    if (colorDepth && (colorDepth < 16 || colorDepth > 32)) {
      botScore += 3;
      reasons.push("Color depth suspeito");
    }
  }

  // Análise de janela
  if (data.windowInfo) {
    const { innerWidth, innerHeight, outerWidth, outerHeight } =
      data.windowInfo;

    // Janela com dimensões exatas da tela (típico de bots)
    if (
      data.screenInfo &&
      innerWidth === data.screenInfo.width &&
      innerHeight === data.screenInfo.height
    ) {
      botScore += 4;
      reasons.push("Janela em fullscreen exato (típico de bots)");
    }

    // Dimensões zeradas ou inválidas
    if (outerWidth <= 0 || outerHeight <= 0) {
      botScore += 6;
      reasons.push("Dimensões de janela inválidas");
    }
  }

  // Análise de navegador
  if (data.browserInfo) {
    const { language, languages, cookieEnabled, hardwareConcurrency } =
      data.browserInfo;

    // Sem idioma definido
    if (!language) {
      botScore += 3;
      reasons.push("Idioma não definido");
    }

    // Cookies desabilitados
    if (cookieEnabled === false) {
      botScore += 2;
      reasons.push("Cookies desabilitados");
    }

    // Hardware concurrency suspeito
    if (
      hardwareConcurrency &&
      (hardwareConcurrency > 32 || hardwareConcurrency < 1)
    ) {
      botScore += 3;
      reasons.push("Hardware concurrency suspeito");
    }

    // Lista de idiomas vazia ou muito pequena
    if (!languages || languages.length === 0) {
      botScore += 2;
      reasons.push("Lista de idiomas vazia");
    }
  }

  return { isBot: botScore >= 8, reasons };
}

// Função para obter informações de geolocalização do IP
async function getIPInfo(ip: string) {
  try {
    // Usar ip-api.com - gratuito e sem necessidade de API key
    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "fail") {
      console.log(`❌ Erro ao obter info do IP ${ip}: ${data.message}`);
      return null;
    }

    return {
      country: data.country || "Não disponível",
      countryCode: data.countryCode || "N/A",
      region: data.regionName || "Não disponível",
      city: data.city || "Não disponível",
      isp: data.isp || "Não disponível",
      org: data.org || "Não disponível",
      timezone: data.timezone || "Não disponível",
      as: data.as || "Não disponível",
    };
  } catch (error) {
    console.error(`❌ Erro ao buscar informações do IP ${ip}:`, error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    // TEMPORÁRIO: Permitir em desenvolvimento para teste
    console.log("🔧 Modo:", process.env.NODE_ENV);

    const body = await request.json();
    const {
      userAgent,
      referrer,
      timestamp,
      screenInfo,
      browserInfo,
      windowInfo,
    } = body;

    // Obter informações básicas do visitante
    const visitorInfo = {
      userAgent: userAgent || "Não disponível",
      referrer: referrer || "Acesso direto",
      timestamp: timestamp || new Date().toISOString(),
      ip:
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        "IP não disponível",
      screenInfo,
      browserInfo,
      windowInfo,
    };

    // Verificar rate limiting
    if (isRateLimited(visitorInfo.ip)) {
      console.log(
        `🚫 Rate limit excedido para IP: ${visitorInfo.ip} - notificação não enviada`
      );
      return NextResponse.json({
        success: true,
        message: "Rate limited - notification not sent",
      });
    }

    // Verificar se o IP está na lista de bloqueados
    if (DEFAULT_BLOCKED_IPS.includes(visitorInfo.ip)) {
      console.log(
        `🚫 IP bloqueado detectado: ${visitorInfo.ip} - notificação não enviada`
      );
      return NextResponse.json({
        success: true,
        message: "IP blocked - notification not sent",
      });
    }

    // Análise avançada de bot
    const botAnalysis = analyzeVisitorData(body);
    if (botAnalysis.isBot) {
      console.log(
        `🤖 Bot detectado para IP ${
          visitorInfo.ip
        }. Razões: ${botAnalysis.reasons.join(", ")}`
      );
      return NextResponse.json({
        success: true,
        message: "Bot detected - notification not sent",
        reasons: botAnalysis.reasons,
      });
    }

    // Obter informações de geolocalização do IP
    const ipInfo = await getIPInfo(visitorInfo.ip);

    // Verificar se é de um ISP/ASN suspeito (data center)
    if (ipInfo && SUSPICIOUS_ASNS.some((asn) => ipInfo.org.includes(asn))) {
      console.log(
        `☁️ Tráfego de data center detectado: ${ipInfo.org} - notificação com flag`
      );
    }

    // Criar mensagem para o Telegram com informações de localização
    let message =
      `<b>👀 Novo Visitante - Filippe Neto AI</b>\n\n` +
      `🌐 <b>IP:</b> ${visitorInfo.ip}\n`;

    // Adicionar informações de localização se disponíveis
    if (ipInfo) {
      message += `🏳️ <b>País:</b> ${ipInfo.country} (${ipInfo.countryCode})\n`;
      message += `📍 <b>Região:</b> ${ipInfo.region}\n`;
      message += `🏙️ <b>Cidade:</b> ${ipInfo.city}\n`;
      message += `🌐 <b>ISP:</b> ${ipInfo.isp}\n`;
      message += `🏢 <b>Organização:</b> ${ipInfo.org}\n`;
      message += `⏰ <b>Timezone:</b> ${ipInfo.timezone}\n`;

      // Flag para tráfego suspeito
      if (SUSPICIOUS_ASNS.some((asn) => ipInfo.org.includes(asn))) {
        message += `⚠️ <b>ALERTA:</b> Tráfego de data center\n`;
      }
    }

    message +=
      `📱 <b>Device:</b> ${
        visitorInfo.userAgent.includes("Mobile") ? "Mobile" : "Desktop"
      }\n` +
      `🔗 <b>Referrer:</b> ${visitorInfo.referrer}\n` +
      `⏰ <b>Horário:</b> ${new Date(visitorInfo.timestamp).toLocaleString(
        "pt-BR"
      )}\n`;

    // Adicionar informações técnicas extras se disponíveis
    if (screenInfo) {
      message += `📺 <b>Tela:</b> ${screenInfo.width}x${screenInfo.height} (${screenInfo.colorDepth}bit)\n`;
    }

    if (browserInfo) {
      message += `🌍 <b>Idioma:</b> ${browserInfo.language}\n`;
    }

    message += `🌍 <b>User Agent:</b> ${visitorInfo.userAgent.substring(
      0,
      100
    )}...`;

    // Enviar notificação para o Telegram apenas para visitantes legítimos
    /*     await SendTelegramMessage(message, TelegramGroup.FILIPPENETO); */

    console.log("✅ Notificação de visitante legítimo enviada para o Telegram");

    return NextResponse.json({
      success: true,
      message: "Visitor tracked successfully",
    });
  } catch (error) {
    console.error("❌ Erro ao rastrear visitante:", error);
    return NextResponse.json(
      { error: "Error tracking visitor" },
      { status: 500 }
    );
  }
}
