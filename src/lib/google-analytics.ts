// Tipos para o Google Analytics
interface GtagConfig {
  page_location?: string;
  page_title?: string;
  page_path?: string;
  send_page_view?: boolean;
  custom_map?: Record<string, string>;
  [key: string]: string | number | boolean | undefined | Record<string, string>;
}

interface GtagEvent {
  event_category?: string;
  event_label?: string;
  value?: number;
  transaction_id?: string;
  currency?: string;
  engagement_time_msec?: number;
  session_id?: string;
  user_engagement?: boolean;
  [key: string]: string | number | boolean | undefined;
}

interface Gtag {
  (command: "config", targetId: string, config?: GtagConfig): void;
  (command: "event", eventName: string, parameters?: GtagEvent): void;
  (command: "set", parameters: Record<string, any>): void;
  (command: string, ...args: unknown[]): void;
}

declare global {
  interface Window {
    gtag: Gtag;
  }
}

export const GA_TRACKING_ID = "G-FDMB2GD8YH";

// Função para rastrear page views
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_location: url,
      send_page_view: true,
    });
  }
};

// Função para rastrear eventos personalizados
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
  additionalParams?: Record<string, any>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
      ...additionalParams,
    });
  }
};

// === EVENTOS DE NEGÓCIO ===
export const trackLead = (value?: number) => {
  trackEvent("generate_lead", "engagement", "strategy_session", value);
};

export const trackPurchase = (value: number, currency = "USD") => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "purchase", {
      transaction_id: Date.now().toString(),
      value: value,
      currency: currency,
    });
  }
};

export const trackContact = () => {
  trackEvent("contact", "engagement", "contact_form");
};

export const trackSchedule = (value?: number) => {
  trackEvent("schedule", "conversion", "strategy_session", value);
};

export const trackCalendlyClick = () => {
  trackEvent("click", "engagement", "calendly_button");
};

export const trackStrategySessionInterest = () => {
  trackEvent("view_item", "engagement", "strategy_session_page");
};

// === EVENTOS COMPORTAMENTAIS ===

// Tracking de scroll detalhado
export const trackScrollDepth = (percentage: number, pageName: string) => {
  trackEvent(
    "scroll",
    "page_scroll",
    `${pageName}_${percentage}%`,
    percentage,
    {
      scroll_depth: percentage,
      engagement_time_msec: Date.now(),
    }
  );
};

// Tracking de tempo na página
export const trackTimeOnPage = (seconds: number, pageName: string) => {
  trackEvent(
    "user_engagement",
    "time_on_page",
    `${pageName}_${seconds}s`,
    seconds,
    {
      engagement_time_msec: seconds * 1000,
      user_engagement: true,
    }
  );
};

// Tracking de cliques detalhados
export const trackClickDetailed = (
  element: string,
  text: string,
  pageName: string,
  position?: { x: number; y: number }
) => {
  trackEvent("click", `${element}_click`, `${pageName}_${text}`, 1, {
    click_text: text,
    click_element: element,
    click_x: position?.x,
    click_y: position?.y,
  });
};

// Tracking de interações com formulários
export const trackFormInteraction = (
  fieldName: string,
  action: string,
  pageName: string
) => {
  trackEvent("form", `form_${action}`, `${pageName}_${fieldName}`, 1, {
    form_field: fieldName,
    form_action: action,
  });
};

// Tracking de engajamento geral
export const trackEngagement = (
  type: string,
  details: string,
  value?: number
) => {
  trackEvent("user_engagement", type, details, value, {
    user_engagement: true,
    engagement_time_msec: Date.now(),
  });
};

// Tracking de primeira interação
export const trackFirstInteraction = (
  type: string,
  timeSeconds: number,
  pageName: string
) => {
  trackEvent(
    "user_engagement",
    "first_interaction",
    `${pageName}_${type}`,
    timeSeconds,
    {
      interaction_type: type,
      time_to_interaction: timeSeconds,
      user_engagement: true,
    }
  );
};

// Tracking de saída da página
export const trackPageExit = (
  pageName: string,
  timeSpent: number,
  scrollDepth: number,
  clicks: number
) => {
  trackEvent("user_engagement", "page_exit", pageName, timeSpent, {
    time_on_page: timeSpent,
    max_scroll_depth: scrollDepth,
    total_clicks: clicks,
    engagement_time_msec: timeSpent * 1000,
  });
};

// Tracking de sessão resumida
export const trackSessionSummary = (
  pageName: string,
  timeSpent: number,
  scrollDepth: number,
  clicks: number
) => {
  trackEvent(
    "user_engagement",
    "session_summary",
    `${pageName}_time:${timeSpent}_scroll:${scrollDepth}_clicks:${clicks}`,
    timeSpent,
    {
      session_duration: timeSpent,
      max_scroll_percentage: scrollDepth,
      total_clicks: clicks,
      page_name: pageName,
      engagement_score: calculateEngagementScore(
        timeSpent,
        scrollDepth,
        clicks
      ),
    }
  );
};

// Função auxiliar para calcular score de engajamento
const calculateEngagementScore = (
  timeSpent: number,
  scrollDepth: number,
  clicks: number
): number => {
  let score = 0;

  // Pontos por tempo (max 40 pontos)
  score += Math.min(timeSpent / 3, 40); // 1 ponto a cada 3 segundos, max 40

  // Pontos por scroll (max 30 pontos)
  score += Math.min(scrollDepth * 0.3, 30); // 0.3 pontos por % de scroll

  // Pontos por cliques (max 30 pontos)
  score += Math.min(clicks * 5, 30); // 5 pontos por clique, max 30

  return Math.round(score);
};

// === EVENTOS DE CONVERSÃO ===

// Tracking de conversões específicas
export const trackConversion = (
  type: string,
  value?: number,
  pageName?: string,
  additionalData?: Record<string, any>
) => {
  trackEvent("conversion", "goal_completion", `${pageName}_${type}`, value, {
    conversion_type: type,
    page_source: pageName,
    ...additionalData,
  });
};

// Tracking de CTA clicks
export const trackCTAClick = (
  ctaName: string,
  pageName: string,
  value?: number
) => {
  trackEvent("click", "cta_click", `${pageName}_${ctaName}`, value, {
    cta_name: ctaName,
    page_source: pageName,
  });
};

// Tracking de downloads
export const trackDownload = (
  fileName: string,
  fileType: string,
  pageName: string
) => {
  trackEvent("download", "file_download", `${pageName}_${fileName}`, 1, {
    file_name: fileName,
    file_type: fileType,
    page_source: pageName,
  });
};

// === EVENTOS DE NAVEGAÇÃO ===

// Tracking de navegação interna
export const trackInternalNavigation = (fromPage: string, toPage: string) => {
  trackEvent("navigation", "internal_link", `${fromPage}_to_${toPage}`, 1, {
    source_page: fromPage,
    destination_page: toPage,
  });
};

// Tracking de saída externa
export const trackExternalLink = (url: string, pageName: string) => {
  trackEvent("click", "external_link", url, 1, {
    external_url: url,
    source_page: pageName,
  });
};

// === EVENTOS DE PERFORMANCE ===

// Tracking de performance da página
export const trackPagePerformance = (loadTime: number, pageName: string) => {
  trackEvent("performance", "page_load_time", pageName, loadTime, {
    load_time_ms: loadTime,
    page_name: pageName,
  });
};

// Tracking de erros JavaScript
export const trackJSError = (error: string, pageName: string) => {
  trackEvent("error", "javascript_error", `${pageName}_${error}`, 1, {
    error_message: error,
    page_source: pageName,
  });
};

// === CONFIGURAÇÕES AVANÇADAS ===

// Configurar parâmetros customizados do usuário
export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("set", {
      user_properties: properties,
    });
  }
};

// Configurar ID de sessão customizado
export const setSessionId = (sessionId: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("set", {
      session_id: sessionId,
    });
  }
};

// Debug do Google Analytics
export const enableGADebug = () => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      debug_mode: true,
    });
  }
};
