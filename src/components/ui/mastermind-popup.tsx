"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

interface MastermindPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MastermindPopup({
  isOpen,
  onClose,
}: MastermindPopupProps) {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Travar/desbloquear scroll quando popup abrir/fechar
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup: restaurar scroll quando componente for desmontado
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim() || !whatsapp.trim()) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/mastermind-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome: nome.trim(), whatsapp: whatsapp.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
          setNome("");
          setWhatsapp("");
        }, 3000);
      } else {
        alert("Erro ao enviar inscrição. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar inscrição. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      setNome("");
      setWhatsapp("");
      setIsSuccess(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md bg-gradient-to-br from-[#1a1a1a]/90 to-[#2a2a2a]/80 backdrop-blur-[300px] rounded-2xl p-6 border border-[#EE9D99]/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="absolute top-4 right-4 text-[#EE9D99] hover:text-white transition-colors disabled:opacity-50"
            >
              <Icon icon="mdi:close" className="w-6 h-6" />
            </button>

            {!isSuccess ? (
              <>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/[3%] rounded-full flex items-center justify-center">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-[#FFFC82] to-[#f99d9c] text-transparent bg-clip-text mb-2">
                    Mastermind Exclusivo
                  </h2>
                  <p className="text-sm text-[#f5f4ad] max-w-[350px] mx-auto">
                    Grupo seleto para empreendedores que querem escalar com IA,
                    tecnologia, estratégia e networking.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#f5f4ad] mb-2">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-4 py-3 bg-white/[0.05] border border-[#EE9D99]/30 rounded-lg text-white placeholder-[#f5f4ad]/50 focus:outline-none focus:border-[#FFFC82] transition-colors disabled:opacity-50"
                      placeholder="Digite seu nome completo"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#f5f4ad] mb-2">
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-4 py-3 bg-white/[0.05] border border-[#EE9D99]/30 rounded-lg text-white placeholder-[#f5f4ad]/50 focus:outline-none focus:border-[#FFFC82] transition-colors disabled:opacity-50"
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#FFFC82] to-[#ec979b] text-black font-bold py-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Icon
                          icon="mdi:loading"
                          className="w-5 h-5 animate-spin"
                        />
                        Enviando...
                      </div>
                    ) : (
                      "Quero participar!"
                    )}
                  </Button>
                </form>
              </>
            ) : (
              /* Success Message */
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                  <Icon icon="mdi:check" className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Bora!</h3>
                <p className="text-[#f5f4ad]">
                  Sua inscrição foi enviada com sucesso.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
