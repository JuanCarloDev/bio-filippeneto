"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Image from "next/image";

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
  const [instagram, setInstagram] = useState("");
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

    if (!nome.trim() || !whatsapp.trim() || !instagram.trim()) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/google-sheets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome.trim(),
          whatsapp: whatsapp.trim(),
          instagram: instagram.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
          setNome("");
          setWhatsapp("");
          setInstagram("");
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
      setInstagram("");
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
            className="relative w-full max-w-md bg-black/[50%] backdrop-blur-2xl rounded-2xl p-6 border border-[#8CDDFA]/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="absolute top-4 right-4 text-[#8CDDFA] hover:text-white transition-colors disabled:opacity-50"
            >
              <Icon icon="mdi:close" className="w-6 h-6" />
            </button>

            {!isSuccess ? (
              <>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="mx-auto mt-10 mb-5 flex items-center justify-center relative">
                    <div className={`max-w-[300px]`}>
                      <Image
                        className={`w-[200px] h-auto`}
                        src="/icons/avozquevendesite.webp"
                        alt="A VOZ QUE VENDE"
                        width={200}
                        height={50}
                      />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-[#E0EBEF] to-[#8CDDFA] text-transparent bg-clip-text mb-2">
                    Mentoria A Voz Que Vende
                  </h2>
                  <p className="text-sm text-[#8CDDFA]/80 max-w-[350px] mx-auto">
                    Transforme sua voz em uma máquina de vendas diária.
                    Destravar sua voz é o primeiro passo para o sucesso!
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#8CDDFA]/80 mb-2">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-4 py-3 bg-white/[0.05] border border-[#8CDDFA]/30 rounded-lg text-white placeholder-[#8CDDFA]/50 focus:outline-none focus:border-[#DCF6FD] transition-colors disabled:opacity-50"
                      placeholder="Digite seu nome completo"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#8CDDFA]/80 mb-2">
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-4 py-3 bg-white/[0.05] border border-[#8CDDFA]/30 rounded-lg text-white placeholder-[#8CDDFA]/50 focus:outline-none focus:border-[#DCF6FD] transition-colors disabled:opacity-50"
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#8CDDFA]/80 mb-2">
                      Instagram
                    </label>
                    <input
                      type="text"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-4 py-3 bg-white/[0.05] border border-[#8CDDFA]/30 rounded-lg text-white placeholder-[#8CDDFA]/50 focus:outline-none focus:border-[#DCF6FD] transition-colors disabled:opacity-50"
                      placeholder="@seuinstagram"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#E0EBEF] to-[#8CDDFA] text-black font-bold py-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
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
                      "Quero destravar minha voz!"
                    )}
                  </Button>
                </form>
              </>
            ) : (
              /* Success Message */
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#E0EBEF] to-[#8CDDFA] rounded-full flex items-center justify-center">
                  <Icon icon="mdi:check" className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Vamos destravar sua voz!
                </h3>
                <p className="text-[#8CDDFA]/80">
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
