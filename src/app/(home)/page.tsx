"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Wrapper from "@/components/global/wrapper";
import Container from "@/components/global/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MagicCard } from "@/components/ui/magic-card";
import { cn } from "@/lib/cn";
import { useVisitorTracking } from "@/hooks/use-visitor-tracking";
import { useClickTracking } from "@/hooks/use-click-tracking";
import Particles from "@/components/ui/particles";
import MastermindPopup from "@/components/ui/mastermind-popup";

const LinktreePage = () => {
  const [activeSection, setActiveSection] = useState<"vendas" | "mastermind">(
    "vendas"
  );
  const [isMastermindPopupOpen, setIsMastermindPopupOpen] = useState(false);

  // Hook de tracking de visitantes
  useVisitorTracking();

  // Hook de tracking de cliques
  const { trackClick } = useClickTracking();

  const vendasItems = [
    {
      title: "Seven Sales AI",
      description: "Venda mais com IA",
      href: "https://sevensales.hivetechnology.io/pt?tag=009",
      image: "/links/seven.png",
    },
    {
      title: "Hive Technology",
      description: "Soluções tecnológicas inovadoras",
      href: "https://hivetechnology.io",
      image: "/links/hive.png",
    },
    {
      title: "Bio Links",
      description: "Todos os meus links em um só lugar",
      href: "https://wa.me/5541998769389?text=Ol%C3%A1%20Juan!%20Como%20fa%C3%A7o%20para%20ter%20um%20link%20na%20BIO%20desse%3F",
      image: "/links/bio.png",
    },
  ];

  const educacaoItems = [
    {
      title: "Dynamis",
      description: "Plataforma educacional para jovens",
      href: "https://dynamis-website-phi.vercel.app/",
      image: "/links/dynamis.png",
    },
  ];

  const mastermindItems = [
    {
      title: "Mastermind Exclusivo",
      description: "Grupo seleto para empreendedores que querem escalar com IA",
      href: "#",
      icon: "🧠",
      badge: "Exclusive",
      badgeVariant: "default" as const,
      image: undefined,
    },
    {
      title: "Mentoria 1:1",
      description: "Sessões individuais de alta performance",
      href: "/mentoria",
      icon: "⚡",
      badge: "VIP",
      badgeVariant: "secondary" as const,
      image: undefined,
    },
    {
      title: "Acesso Vitalício",
      description: "Conteúdos e updates permanentes da comunidade",
      href: "/acesso",
      icon: "🔑",
      badge: "Lifetime",
      badgeVariant: "outline" as const,
      image: undefined,
    },
  ];

  const currentItems = vendasItems;

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/juanncarllo",
      icon: "mdi:instagram",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/juancarlodev/",
      icon: "mdi:linkedin",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@juanncarllo",
      icon: "mdi:youtube",
    },
    /*  {
      name: "Email",
      url: "mailto:juan@example.com",
      icon: "mdi:email",
    }, */
  ];

  const handleLinkClick = (
    linkName: string,
    url: string,
    type: "link" | "card" | "button" = "link"
  ) => {
    // Tracking de cliques
    trackClick({
      type,
      title: linkName,
      url,
    });
    console.log(`Clicked: ${linkName} -> ${url}`);
  };

  const handleMastermindClick = () => {
    setIsMastermindPopupOpen(true);
    trackClick({
      type: "button",
      title: "Mastermind Exclusivo",
      url: "/mastermind",
    });
  };

  return (
    <main className="flex flex-col min-h-screen bg-black">
      {/* Hero Section with Banner */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full lg:-mt-16">
        <section className="relative h-[50vh] md:h-[70vh] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            {/* Desktop Banner */}
            <Image
              src="/images/bannerdesk.png"
              alt="Banner Desktop"
              fill
              className="hidden md:block object-cover max-w-[1400px] max-h-[600px] mx-auto object-top z-10"
              priority
            />
            {/* Mobile Banner */}
            <Image
              src="/images/bannermobile.png"
              alt="Banner Mobile"
              fill
              className="block md:hidden object-cover object-top z-10"
              priority
            />

            {/* Gradient Overlays - mantendo na posição exata */}
            <div className="absolute inset-0 z-20 bg-gradient-to-r max-w-[1400px] max-h-[600px] mx-auto from-black via-transparent to-black opacity-50 lg:opacity-100" />

            <div className="absolute inset-0 z-20 bg-gradient-to-b  max-w-[1400px] max-h-[600px] from-transparent from-30% via-transparent via-20% to-black to-100% " />
          </div>
        </section>
      </div>

      {/* Content Section - Agora usando overlapping responsivo */}
      <Wrapper className="relative z-30">
        <div className={` h-[13rem] lg:h-[270px]`}></div>
        <div className="text-center pb-6">
          {/* Animated Badge */}
          <Container className="relative block overflow-hidden mb-2">
            <button className="group relative grid overflow-hidden bg-white/[0.1] rounded-full px-[5px] py-[0.6px] border border-[#ec979b2a] transition-colors duration-200 mx-auto text-[5px]">
              <span>
                <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,#ec979b_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%] " />
              </span>
              <span className="backdrop backdrop-blur-md bg-[#3a25260b] absolute inset-[1px] rounded-full transition-colors duration-200 group-hover:bg-neutral-900" />
              <span className="z-10 py-0.5 text-[14px] text-[#f0e0e0] flex items-center">
                <span className="px-2 py-[0.5px] h-[18px] tracking-wide flex items-center justify-center rounded-full bg-gradient-to-r from-[#FFFC82] to-[#ec979b] text-[9px] mr-2 text-black font-bold">
                  <span className="text-black font-extrabold font-sans">
                    AI
                  </span>
                </span>
                Estrategista Digital & AI Expert
              </span>
            </button>
          </Container>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-10"
          >
            <h1 className="text-3xl md:text-2xl lg:text-4xl font-bold mb-1 bg-gradient-to-r from-[#FFFC82] to-[#f99d9c] text-transparent bg-clip-text font-sans">
              Juan Carlo
            </h1>
            <p className="text-base md:text-lg font-bold bg-gradient-to-r from-[#fffedb] to-[#fac1c4] text-transparent bg-clip-text max-w-2xl mx-auto mb-3">
              Founder x3, Software Developer & AI Engineer
            </p>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-8">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    handleLinkClick(social.name, social.url, "link")
                  }
                  className="group relative"
                >
                  <div className="w-9 h-9 rounded-full bg-white/[2%] backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-[#ED9A9A]/30 hover:scale-105">
                    <Icon
                      icon={social.icon}
                      className="w-5 h-5 text-[#f5f4ad]"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Menu de Seleção */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className=""
          >
            <div className="flex gap-2 justify-center w-full">
              <div className="inline-flex bg-white/[0.01] backdrop-blur-md border border-[#EE9D99]/30 rounded-2xl md:rounded-full p-1.5 mb-6 w-full max-w-2xl gap-2">
                <button
                  onClick={() => setActiveSection("vendas")}
                  className={cn(
                    "px-6 py-3 rounded-xl md:rounded-full text-[12px] md:text-sm  leading-tight font-bold transition-all duration-200 w-full",
                    activeSection === "vendas"
                      ? "bg-gradient-to-r from-[#FFFC82] to-[#ec979b] text-black shadow-lg"
                      : "bg-gradient-to-r from-[#fffeaf] to-[#f4a7ab] text-transparent bg-clip-text hover:text-white hover:bg-white/5"
                  )}
                >
                  Produtos e Serviços, <br className={`block md:hidden`} /> IA e
                  Tecnologia
                </button>
                <button
                  onClick={handleMastermindClick}
                  className={cn(
                    "px-6 py-3 relative rounded-xl md:rounded-full overflow-hidden text-[12px] md:text-sm leading-tight font-bold transition-all duration-200 w-full hover:scale-105",
                    activeSection === "mastermind"
                      ? "bg-gradient-to-r from-[#FFFC82] to-[#ec979b] text-black shadow-lg"
                      : "bg-gradient-to-r from-[#fffeaf] to-[#f4a7ab] text-transparent bg-clip-text hover:text-white hover:bg-white/5"
                  )}
                >
                  Mastermind <br className={`block md:hidden`} /> Exclusivo
                  <Particles
                    refresh
                    ease={80}
                    quantity={30}
                    staticity={3}
                    color="#ED9C9A"
                    className="hidden lg:block absolute inset-0 z-0"
                  />
                  <Particles
                    refresh
                    ease={80}
                    quantity={10}
                    staticity={3}
                    color="#ED9C9A"
                    className="block lg:hidden absolute inset-0 z-0"
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Menu Cards */}
          <div className="relative">
            {" "}
            <motion.div
              key={activeSection} // Força re-render com animação quando muda a seção
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-1 gap-6 max-w-2xl mx-auto mb-6"
            >
              {(activeSection === "vendas" ? vendasItems : mastermindItems).map(
                (item, index) => (
                  <div
                    key={item.title}
                    onClick={() => {
                      if (item.title === "Mastermind Exclusivo") {
                        handleMastermindClick();
                      } else {
                        handleLinkClick(item.title, item.href, "card");
                        window.open(item.href, "_blank");
                      }
                    }}
                    className="block cursor-pointer"
                  >
                    <Container
                      delay={0.1 + index * 0.1}
                      className={cn(
                        "relative flex flex-col max-w-[1480px] h-auto w-full p-[2px] rounded-2xl lg:rounded-2xl bg-gradient-to-r from-[#FFFB82]/20 to-[#EE9D99]/20 hover:border-border/100 cursor-pointer transition-colors aspect-[1480/690]"
                      )}
                    >
                      <MagicCard
                        gradientFrom="#FEF883"
                        gradientTo="#FEA9AA"
                        className="p-1 relative lg:rounded-3xl z-10"
                        gradientColor="#FEA9AA10"
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-fill absolute top-0 left-0 rounded-lg lg:rounded-xl z-10"
                          />
                        )}
                      </MagicCard>
                    </Container>
                  </div>
                )
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              <Particles
                refresh
                ease={80}
                staticity={3}
                quantity={40}
                color="#ED9C9A"
                className="hidden lg:block absolute inset-0 z-0"
              />
              <Particles
                refresh
                ease={80}
                staticity={3}
                quantity={50}
                color="#ED9C9A"
                className="block lg:hidden absolute inset-0 z-0"
              />
            </motion.div>
          </div>

          {/* Seção Educação para jovens */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 mb-8"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-[#FFFC82] to-[#f99d9c] text-transparent bg-clip-text text-center">
              Educação para jovens
            </h2>

            <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
              {educacaoItems.map((item, index) => (
                <Link
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleLinkClick(item.title, item.href, "card")}
                  className="block"
                >
                  <Container
                    delay={0.1 + index * 0.1}
                    className={cn(
                      "relative flex flex-col max-w-[1480px] h-auto w-full p-[2px] rounded-2xl lg:rounded-2xl bg-gradient-to-r from-[#FFFB82]/20 to-[#EE9D99]/20 hover:border-border/100 cursor-pointer transition-colors aspect-[1480/690]"
                    )}
                  >
                    <MagicCard
                      gradientFrom="#FEF883"
                      gradientTo="#FEA9AA"
                      className="p-1 relative lg:rounded-3xl z-10"
                      gradientColor="#FEA9AA10"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-fill absolute top-0 left-0 rounded-lg lg:rounded-xl z-10"
                        />
                      )}
                    </MagicCard>
                  </Container>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </Wrapper>

      <div className="relative page-bottom mt-auto">
        <p className="text-center font-sans mb-3 font-semibold text-xs text-[#EFA997] py-4 md:py-6">
          Juan Carlo © 2026 - All Right Reserved
        </p>
      </div>

      {/* Mastermind Popup */}
      <MastermindPopup
        isOpen={isMastermindPopupOpen}
        onClose={() => setIsMastermindPopupOpen(false)}
      />
    </main>
  );
};

export default LinktreePage;
