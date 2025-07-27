// Tipos para o Facebook Pixel
interface FacebookPixelEvent {
  [key: string]: string | number | boolean | undefined;
}

interface FacebookPixel {
  (command: "track", eventName: string, parameters?: FacebookPixelEvent): void;
  (command: "init", pixelId: string): void;
  (command: string, ...args: unknown[]): void;
}

declare global {
  interface Window {
    fbq: FacebookPixel;
  }
}

export const FB_PIXEL_ID = "730046229459230";

export const pageview = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  }
};

// Eventos personalizados comuns
export const trackEvent = (
  eventName: string,
  parameters?: FacebookPixelEvent
) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, parameters);
  }
};

// Eventos específicos para seu negócio
export const trackLead = (value?: number) => {
  trackEvent("Lead", { value, currency: "USD" });
};

export const trackPurchase = (value: number, currency = "USD") => {
  trackEvent("Purchase", { value, currency });
};

export const trackContact = () => {
  trackEvent("Contact");
};

export const trackSchedule = (value?: number) => {
  trackEvent("Schedule", { value, currency: "USD" });
};

export const trackViewContent = (contentName?: string) => {
  trackEvent("ViewContent", { content_name: contentName });
};

export const trackCompleteRegistration = () => {
  trackEvent("CompleteRegistration");
};

// Evento customizado para sessão de estratégia
export const trackStrategySessionInterest = () => {
  trackEvent("StrategySessionInterest");
};

export const trackCalendlyClick = () => {
  trackEvent("CalendlyClick");
};
