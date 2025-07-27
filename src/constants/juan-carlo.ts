// Informações centralizadas do Juan Carlo

export const JUAN_CARLO = {
  // Informações Pessoais
  personalInfo: {
    fullName: "Juan Carlo",
    firstName: "Juan Carlo",
    age: 25,
    location: "Balneário Camboriú, Santa Catarina, Brasil",
    philosophy: "Crie a sua vida como o jogador principal",
    mantra: "Seja intenso! Curta a jornada!",
    tagline: "Fullstack Developer & AI Solutions Expert",
    subtitle: "Founder x3, Software Developer & AI Engineer",
  },

  // Contato
  contact: {
    email: "juancarlo8800@gmail.com",
    phone: "(41) 998768-9389",
    whatsapp: "5541998768939",
    website: "https://juancarlo.com.br",
  },

  // Redes Sociais
  social: {
    linkedin: "https://www.linkedin.com/in/juancarlodev/",
    github: "https://github.com/JuanCarloDev",
    instagram: "https://www.instagram.com/juanncarllo",
    youtube: "https://www.youtube.com/@juanncarllo",
  },

  // Principais Conquistas
  highlights: [
    {
      metric: "$20M+",
      title: "Revenue Scaled",
      description:
        "Co-founded and scaled an EdTech startup from zero to millions",
    },
    {
      metric: "3+",
      title: "Companies Founded",
      description: "As a technical Co-founder with proven track record",
    },
    {
      metric: "9+",
      title: "Years in Tech",
      description: "Global experience (USA, Japan, Brazil)",
    },
    {
      metric: "R$740k+",
      title: "Revenue Generated",
      description: "First year revenue at Hive Technology",
    },
  ],

  // Experiência Profissional
  experience: [
    {
      title: "Founder, CTO & Fullstack Developer",
      company: "Hive Technology",
      period: "Feb 2024 – Present",
      description:
        "Led a team of 10 professionals delivering fullstack AI solutions for international clients (USA & Japan). Generated R$740,000 in revenue in the first year.",
      achievements: [
        "Led team of 10 professionals in international projects",
        "Generated R$740,000+ in first year revenue",
        "Increased client operational efficiency by 40%",
        "Directed on-site operations in Los Angeles",
      ],
      logo: "/images/hive-logo.png",
    },
    {
      title: "Cofounder, CTO & Fullstack Developer",
      company: "Gonew.co",
      period: "Jun 2018 – Aug 2024",
      description:
        "Led all product engineering, scaling the company from 0 to $20M revenue and 20,000+ users with AI-powered LMS platform.",
      achievements: [
        "Scaled from 0 to $20M revenue and 20,000+ users",
        "Architected LMS platform with AI personalization",
        "Silicon Valley immersion program (2019)",
        "100% platform uptime achievement",
      ],
      logo: "/images/gonew-logo.png",
    },
    {
      title: "Apple Technical Support Specialist",
      company: "Link Informática",
      period: "Jan 2016 – Jan 2018",
      description:
        "Provided expert hardware/software support for Apple devices, achieving high customer satisfaction rates.",
      achievements: [
        "Expert hardware/software support",
        "High customer satisfaction rates",
        "Apple certification maintenance",
      ],
      logo: "/images/apple-logo.png",
    },
  ],

  // Projetos
  projects: [
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
  ],

  // Habilidades Técnicas
  skills: {
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
  },

  // Valores Fundamentais
  values: [
    "Deus - Conexão espiritual profunda",
    "Alegria - Viver com intensidade e gratidão",
    "Amor - Relacionamentos autênticos e profundos",
    "Intensidade - Dar o máximo em tudo que faz",
    "Foco - Concentração total nos objetivos",
    "Coragem - Apostar em si mesmo mesmo quando é difícil",
  ],

  // Meta Tags para SEO
  seo: {
    title: "Juan Carlo - Fullstack Developer & AI Solutions Expert",
    description:
      "Juan Carlo é um Fullstack Developer e CTO com 9+ anos de experiência. Co-fundador que escalou startups de 0 a $20M de receita. Expert em React, Next.js, IA e liderança técnica internacional.",
    keywords: [
      "Juan Carlo",
      "fullstack developer brazil",
      "ai solutions expert",
      "next.js developer",
      "react specialist",
      "cto consultant",
      "startup cofounder",
      "silicon valley experience",
      "balneário camboriú developer",
      "ai automation",
      "sales technology",
      "hive technology",
      "seven sales ai",
    ],
  },
} as const;
