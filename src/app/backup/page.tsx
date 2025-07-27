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

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<"frontend" | "backend" | "ai">(
    "frontend"
  );

  const highlights = [
    {
      icon: "mdi:trophy",
      title: "$20M+ Revenue Scaled",
      description:
        "Co-founded and scaled an EdTech startup from zero to millions",
    },
    {
      icon: "mdi:rocket-launch",
      title: "3+ Companies Founded",
      description: "As a technical Co-founder with proven track record",
    },
    {
      icon: "mdi:briefcase",
      title: "9+ Years in Tech",
      description: "Global experience (USA, Japan, Brazil)",
    },
    {
      icon: "mdi:school",
      title: "Silicon Valley Immersion",
      description: "Exclusive program at Google, Apple, LinkedIn, Airbnb",
    },
  ];

  const experience = [
    {
      title: "Founder, CTO & Fullstack Developer",
      company: "Hive Technology",
      period: "Feb 2024 – Present",
      description:
        "Led a team of 10 professionals delivering fullstack AI solutions for international clients (USA & Japan). Generated R$740,000 in revenue in the first year.",
      logo: "/images/hive-logo.png",
      achievements: [
        "Led team of 10 professionals in international projects",
        "Generated R$740,000+ in first year revenue",
        "Increased client operational efficiency by 40%",
        "Directed on-site operations in Los Angeles",
      ],
    },
    {
      title: "Cofounder, CTO & Fullstack Developer",
      company: "Gonew.co",
      period: "Jun 2018 – Aug 2024",
      description:
        "Led all product engineering, scaling the company from 0 to $20M revenue and 20,000+ users with AI-powered LMS platform.",
      logo: "/images/gonew-logo.png",
      achievements: [
        "Scaled from 0 to $20M revenue and 20,000+ users",
        "Architected LMS platform with AI personalization",
        "Silicon Valley immersion program (2019)",
        "100% platform uptime achievement",
      ],
    },
    {
      title: "Apple Technical Support Specialist",
      company: "Link Informática",
      period: "Jan 2016 – Jan 2018",
      description:
        "Provided expert hardware/software support for Apple devices, achieving high customer satisfaction rates.",
      logo: "/images/apple-logo.png",
      achievements: [
        "Expert hardware/software support",
        "High customer satisfaction rates",
        "Apple certification maintenance",
      ],
    },
  ];

  const projects = [
    {
      name: "SevenSales AI Platform",
      description:
        "AI-powered sales automation platform that autonomously handles lead qualification and sales on Instagram and WhatsApp with humanized AI agents.",
      tech: ["typescript", "nextjs", "openai", "gemini", "meta"],
      link: "https://www.sevensalesai.com/pt",
      image: "/images/seven2.png",
      status: "Active",
    },
    {
      name: "Silicon Valley Immersion",
      description:
        "Exclusive 5-day immersion in Silicon Valley, focusing on AI for business, with innovative tech experiences and visits to leading companies.",
      tech: ["typescript", "nextjs", "react", "tailwindcss"],
      link: "https://siliconvalley.hivetechnology.io/",
      image: "/images/siliconvalley.png",
      status: "Active",
    },
    {
      name: "Huge Event Website",
      description:
        "High-impact landing page for Brazil's huge sales event. Advanced animations, payment integration, and conversion-optimized design.",
      tech: ["typescript", "nextjs", "react", "tailwindcss"],
      link: "https://www.vozquevende.com.br/",
      image: "/images/vozquevende.jpeg",
      status: "Completed",
    },
  ];

  const skills = {
    frontend: [
      { name: "React.js", level: 95, years: "5 years" },
      { name: "Next.js", level: 90, years: "4 years" },
      { name: "TypeScript", level: 85, years: "4 years" },
      { name: "Tailwind CSS", level: 90, years: "3 years" },
      { name: "JavaScript", level: 95, years: "9 years" },
    ],
    backend: [
      { name: "Node.js", level: 85, years: "4 years" },
      { name: "GraphQL", level: 75, years: "2 years" },
      { name: "REST APIs", level: 90, years: "5 years" },
      { name: "PostgreSQL", level: 80, years: "3 years" },
      { name: "MongoDB", level: 75, years: "2 years" },
    ],
    ai: [
      { name: "OpenAI API", level: 85, years: "2 years" },
      { name: "Google Gemini", level: 80, years: "1 year" },
      { name: "LangChain", level: 75, years: "1 year" },
      { name: "Vector Databases", level: 70, years: "1 year" },
      { name: "AI Automation", level: 85, years: "2 years" },
    ],
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/juancarlodev/",
      icon: "mdi:linkedin",
    },
    {
      name: "GitHub",
      url: "https://github.com/JuanCarloDev",
      icon: "mdi:github",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/juanncarllo",
      icon: "mdi:instagram",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@juanncarllo",
      icon: "mdi:youtube",
    },
  ];

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Hero Background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        </div>

        <Wrapper className="relative z-10">
          <Container className="flex flex-col lg:flex-row items-center gap-12">
            {/* Hero Content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge
                  variant="outline"
                  className="mb-4 border-[#ec979b]/30 text-[#f0e0e0]"
                >
                  <span className="inline-flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                    Disponível para projetos
                  </span>
                </Badge>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-[#FFFC82] to-[#ec979b] text-transparent bg-clip-text">
                    Juan Carlo
                  </span>
                  <br />
                  <span className="text-white text-3xl md:text-5xl lg:text-6xl">
                    Gonçalves
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 mb-2">
                  Fullstack Developer & AI Solutions Expert
                </p>

                <p className="text-base md:text-lg text-gray-400 mb-8 max-w-2xl">
                  CTO com 9+ anos de experiência que co-fundou e escalou
                  startups de 0 a $20M de receita. Especialista em React,
                  Next.js, IA e liderança técnica internacional.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#FFFC82] to-[#ec979b] text-black hover:opacity-90"
                  >
                    <Icon icon="mdi:email" className="mr-2" />
                    Vamos conversar
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#ec979b]/30 text-white hover:bg-[#ec979b]/10"
                  >
                    <Icon icon="mdi:download" className="mr-2" />
                    Download CV
                  </Button>
                </div>

                {/* Social Links */}
                <div className="flex justify-center lg:justify-start gap-4">
                  {socialLinks.map((social, index) => (
                    <Link
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-[#ec979b]/30 hover:scale-105">
                        <Icon
                          icon={social.icon}
                          className="w-6 h-6 text-[#f5f4ad] group-hover:text-white"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 flex justify-center lg:justify-end"
            >
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFFC82] to-[#ec979b] rounded-full blur-2xl opacity-20 animate-pulse" />
                <Image
                  src="/images/juan-carlo-profile.jpg"
                  alt="Juan Carlo"
                  fill
                  className="object-cover rounded-full border-4 border-[#ec979b]/30"
                />
              </div>
            </motion.div>
          </Container>
        </Wrapper>
      </section>

      {/* Highlights Section */}
      <section className="py-20">
        <Wrapper>
          <Container delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FFFC82] to-[#ec979b] text-transparent bg-clip-text">
                Principais Conquistas
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Uma trajetória de crescimento, inovação e resultados comprovados
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {highlights.map((highlight, index) => (
                <Container key={index} delay={0.1 + index * 0.1}>
                  <MagicCard className="p-6 text-center h-full">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#FFFC82] to-[#ec979b] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon
                        icon={highlight.icon}
                        className="w-8 h-8 text-black"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {highlight.description}
                    </p>
                  </MagicCard>
                </Container>
              ))}
            </div>
          </Container>
        </Wrapper>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white/[0.02]">
        <Wrapper>
          <Container delay={0.1}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-[#FFFC82] to-[#ec979b] text-transparent bg-clip-text">
                Sobre Mim
              </h2>

              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Sou um{" "}
                  <strong className="text-white">Fullstack Developer</strong> e{" "}
                  <strong className="text-white">CTO</strong> com mais de 9 anos
                  de experiência em tecnologia, especializado em arquitetar
                  aplicações web escaláveis e de alta performance. Tenho um
                  histórico comprovado de impulsionar crescimento significativo
                  de negócios.
                </p>

                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Como <strong className="text-white">co-fundador</strong>,
                  escalei uma startup EdTech do zero para{" "}
                  <strong className="text-[#ec979b]">$20M de receita</strong> e
                  <strong className="text-[#ec979b]"> 20.000+ usuários</strong>.
                  Atualmente lidero a{" "}
                  <strong className="text-white">Hive Technology</strong>, onde
                  desenvolvemos soluções de IA para clientes internacionais nos
                  EUA e Japão.
                </p>

                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Minha filosofia é{" "}
                  <strong className="text-[#FFFC82]">
                    "Criar a vida como o jogador principal"
                  </strong>{" "}
                  - sempre focado em crescimento contínuo, eliminação do ego e
                  visão de longo prazo. Também sou piloto privado certificado,
                  demonstrando minha paixão por desafios técnicos complexos.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                  <Badge variant="secondary" className="px-4 py-2">
                    🧠 Filosofia: Intensidade & Foco
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2">
                    ✈️ Piloto Privado Certificado
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2">
                    🌎 Experiência Internacional
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2">
                    🚀 Silicon Valley Alumni
                  </Badge>
                </div>
              </div>
            </div>
          </Container>
        </Wrapper>
      </section>

      {/* Experience Section */}
      <section className="py-20">
        <Wrapper>
          <Container delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FFFC82] to-[#ec979b] text-transparent bg-clip-text">
                Experiência Profissional
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Uma trajetória de liderança técnica e crescimento exponencial
              </p>
            </div>

            <div className="space-y-8">
              {experience.map((exp, index) => (
                <Container key={index} delay={0.1 + index * 0.1}>
                  <MagicCard className="p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-1">
                              {exp.title}
                            </h3>
                            <p className="text-[#ec979b] text-lg font-semibold mb-2">
                              {exp.company}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {exp.period}
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-300 mb-6">{exp.description}</p>

                        <div className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <Icon
                                icon="mdi:check-circle"
                                className="w-5 h-5 text-[#ec979b] mt-0.5 flex-shrink-0"
                              />
                              <span className="text-gray-300 text-sm">
                                {achievement}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </MagicCard>
                </Container>
              ))}
            </div>
          </Container>
        </Wrapper>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white/[0.02]">
        <Wrapper>
          <Container delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FFFC82] to-[#ec979b] text-transparent bg-clip-text">
                Habilidades Técnicas
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Expertise em tecnologias modernas e soluções de IA
              </p>
            </div>

            {/* Skills Navigation */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-full p-1">
                {Object.keys(skills).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category as any)}
                    className={cn(
                      "px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 capitalize",
                      activeTab === category
                        ? "bg-gradient-to-r from-[#FFFC82] to-[#ec979b] text-black"
                        : "text-gray-400 hover:text-white"
                    )}
                  >
                    {category === "ai" ? "IA & ML" : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Skills Grid */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
              {skills[activeTab].map((skill, index) => (
                <Container key={skill.name} delay={0.1 + index * 0.05}>
                  <MagicCard className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-lg font-semibold text-white">
                        {skill.name}
                      </h4>
                      <span className="text-sm text-gray-400">
                        {skill.years}
                      </span>
                    </div>

                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                      <motion.div
                        className="bg-gradient-to-r from-[#FFFC82] to-[#ec979b] h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Proficiência</span>
                      <span className="text-[#ec979b] font-medium">
                        {skill.level}%
                      </span>
                    </div>
                  </MagicCard>
                </Container>
              ))}
            </motion.div>
          </Container>
        </Wrapper>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <Wrapper>
          <Container delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FFFC82] to-[#ec979b] text-transparent bg-clip-text">
                Projetos em Destaque
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Soluções inovadoras que geram impacto real
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Container key={index} delay={0.1 + index * 0.1}>
                  <MagicCard className="group overflow-hidden h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant={
                            project.status === "Active"
                              ? "default"
                              : "secondary"
                          }
                          className="bg-black/50 backdrop-blur-sm"
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-white mb-3">
                        {project.name}
                      </h3>

                      <p className="text-gray-400 text-sm mb-4 flex-1">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="text-xs border-[#ec979b]/30"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#ec979b] hover:text-[#FFFC82] transition-colors font-medium"
                      >
                        Ver projeto
                        <Icon
                          icon="mdi:arrow-top-right"
                          className="ml-1 w-4 h-4"
                        />
                      </Link>
                    </div>
                  </MagicCard>
                </Container>
              ))}
            </div>
          </Container>
        </Wrapper>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white/[0.02]">
        <Wrapper>
          <Container delay={0.1}>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FFFC82] to-[#ec979b] text-transparent bg-clip-text">
                Vamos Trabalhar Juntos
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Estou sempre aberto a discutir novos projetos, oportunidades
                criativas ou parcerias estratégicas.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <Link href="mailto:juancarlo8800@gmail.com" className="group">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#FFFC82] to-[#ec979b] text-black hover:opacity-90"
                  >
                    <Icon icon="mdi:email" className="mr-2" />
                    juancarlo8800@gmail.com
                  </Button>
                </Link>

                <Link
                  href="https://wa.me/5541998768939"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#ec979b]/30 text-white hover:bg-[#ec979b]/10"
                  >
                    <Icon icon="mdi:whatsapp" className="mr-2" />
                    (41) 99876-8939
                  </Button>
                </Link>
              </div>

              <div className="flex justify-center gap-6">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-[#ec979b]/30 hover:scale-105">
                      <Icon
                        icon={social.icon}
                        className="w-7 h-7 text-[#f5f4ad] group-hover:text-white"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </Wrapper>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <Wrapper>
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-4">
              © 2025 Juan Carlo. Todos os direitos reservados.
            </p>
            <p className="text-gray-500 text-xs">
              Desenvolvido com React, Next.js e muito ☕
            </p>
          </div>
        </Wrapper>
      </footer>
    </main>
  );
};

export default HomePage;
