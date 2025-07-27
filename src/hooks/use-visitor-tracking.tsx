import { useEffect, useRef } from "react";

// Detecção de bots baseada em user agent
const isBotUserAgent = (userAgent: string): boolean => {
  const botPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /parser/i,
    /fetcher/i,
    /monitor/i,
    /headless/i,
    /phantom/i,
    /selenium/i,
    /puppeteer/i,
    /playwright/i,
    /chrome-lighthouse/i,
    /pingdom/i,
    /uptimerobot/i,
    /uptime/i,
    /sitechecker/i,
    /gtmetrix/i,
    /webpagetest/i,
    /ahrefsbot/i,
    /semrushbot/i,
    /mj12bot/i,
    /duckduckbot/i,
    /bingbot/i,
    /googlebot/i,
    /yandexbot/i,
    /facebookexternalhit/i,
    /twitterbot/i,
    /linkedinbot/i,
    /whatsapp/i,
    /telegrambot/i,
    /slackbot/i,
    /discordbot/i,
  ];

  return botPatterns.some((pattern) => pattern.test(userAgent));
};

// Detecção de comportamento humano
const detectHumanBehavior = (): Promise<boolean> => {
  return new Promise((resolve) => {
    let humanBehaviorScore = 0;
    let checks = 0;
    const maxChecks = 4;

    const checkComplete = () => {
      checks++;
      if (checks >= maxChecks) {
        // Considera humano se pontuação >= 2
        resolve(humanBehaviorScore >= 2);
      }
    };

    // Check 1: Mouse movement
    let mouseMoved = false;
    const mouseHandler = () => {
      if (!mouseMoved) {
        mouseMoved = true;
        humanBehaviorScore++;
        document.removeEventListener("mousemove", mouseHandler);
      }
    };
    document.addEventListener("mousemove", mouseHandler);
    setTimeout(() => {
      document.removeEventListener("mousemove", mouseHandler);
      checkComplete();
    }, 3000);

    // Check 2: Scroll behavior
    let scrolled = false;
    const scrollHandler = () => {
      if (!scrolled) {
        scrolled = true;
        humanBehaviorScore++;
        document.removeEventListener("scroll", scrollHandler);
      }
    };
    document.addEventListener("scroll", scrollHandler);
    setTimeout(() => {
      document.removeEventListener("scroll", scrollHandler);
      checkComplete();
    }, 3000);

    // Check 3: Page visibility and focus
    if (!document.hidden && document.hasFocus()) {
      humanBehaviorScore++;
    }
    checkComplete();

    // Check 4: Screen and window properties (bots often have unusual values)
    const hasReasonableScreen =
      window.screen.width > 800 &&
      window.screen.height > 600 &&
      window.outerWidth > 0 &&
      window.outerHeight > 0;

    if (hasReasonableScreen) {
      humanBehaviorScore++;
    }
    checkComplete();
  });
};

export const useVisitorTracking = () => {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Evita múltiplas execuções
    if (hasTracked.current) return;

    const trackVisitor = async () => {
      try {
        // Só executa uma vez por sessão
        hasTracked.current = true;

        // Verificação básica de bot pelo user agent
        const userAgent = navigator.userAgent;
        if (isBotUserAgent(userAgent)) {
          console.log("🤖 Bot detectado pelo User Agent - tracking ignorado");
          return;
        }

        // Verificação de comportamento humano
        const isHuman = await detectHumanBehavior();
        if (!isHuman) {
          console.log("🤖 Comportamento de bot detectado - tracking ignorado");
          return;
        }

        // Verificações adicionais de ambiente
        if (
          typeof window === "undefined" ||
          !window.screen ||
          !navigator.language
        ) {
          console.log("🤖 Ambiente suspeito detectado - tracking ignorado");
          return;
        }

        // Coleta informações básicas do visitante
        const visitorData = {
          userAgent,
          referrer: document.referrer,
          timestamp: new Date().toISOString(),
          // Informações adicionais para análise
          screenInfo: {
            width: window.screen.width,
            height: window.screen.height,
            colorDepth: window.screen.colorDepth,
          },
          browserInfo: {
            language: navigator.language,
            languages: navigator.languages,
            cookieEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack,
            hardwareConcurrency: navigator.hardwareConcurrency,
          },
          windowInfo: {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            outerWidth: window.outerWidth,
            outerHeight: window.outerHeight,
          },
        };

        // Envia para a API de tracking
        await fetch("/api/track-visitor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(visitorData),
        });

        console.log("📊 Visitante humano rastreado com sucesso");
      } catch (error) {
        console.error("❌ Erro ao rastrear visitante:", error);
      }
    };

    // Executa o tracking após um delay maior para permitir detecção de comportamento
    const timeoutId = setTimeout(trackVisitor, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return null; // Hook não retorna nada, apenas executa o tracking
};
