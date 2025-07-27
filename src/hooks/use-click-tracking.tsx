import { useCallback } from "react";

interface ClickData {
  type: "link" | "card" | "button";
  title: string;
  url?: string;
  timestamp: string;
  userAgent: string;
  referrer: string;
}

export const useClickTracking = () => {
  const trackClick = useCallback(
    async (
      clickData: Omit<ClickData, "timestamp" | "userAgent" | "referrer">
    ) => {
      try {
        // TEMPORÁRIO: Permitir em desenvolvimento para teste
        console.log("🔧 Modo:", process.env.NODE_ENV);

        const fullClickData: ClickData = {
          ...clickData,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer,
        };

        // Envia para a API de tracking de cliques
        const response = await fetch("/api/track-click", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fullClickData),
        });

        const result = await response.json();
        console.log("🖱️ Resultado da API de clique:", result);

        console.log("🖱️ Clique rastreado com sucesso:", clickData.title);
      } catch (error) {
        console.error("❌ Erro ao rastrear clique:", error);
      }
    },
    []
  );

  return { trackClick };
};
