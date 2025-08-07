import "@/styles/globals.css";
import { cn } from "@/lib";
import { generateMetadata } from "@/utils";
import { base, heading } from "@/constants";
import { Toaster } from "@/components/ui/sonner";
import { subheading } from "@/constants/fonts";
import GoogleAnalytics from "@/utils/GoogleAnalytics";
import FacebookPixel from "@/utils/FacebookPixel";

export const metadata = generateMetadata();

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://filippneto.com.br/#person",
  name: "Filippe Neto",
  alternateName: "Filippe Neto",
  description:
    "Líder visionário em marketing e vendas com 17+ anos de experiência. Transformou 1700+ vozes em máquinas de vendas. Mentor, palestrante e especialista em comunicação que converte.",
  url: "https://filippneto.com.br",
  image: {
    "@type": "ImageObject",
    url: "/metaimage.jpg",
    width: 800,
    height: 800,
  },
  jobTitle: "Mentor A Voz Que Vende | Líder em Marketing e Vendas",
  worksFor: {
    "@type": "Organization",
    name: "Labellamafia",
    url: "https://labellamafia.com.br",
  },
  email: "contato@filippneto.com.br",
  telephone: "+55-47-99999-9999",
  sameAs: [
    "https://linkedin.com/in/filippeneto",
    "https://instagram.com/filippeneto.oficial",
    "https://youtube.com/@filippeneto",
  ],
  knowsAbout: [
    "Marketing de Guerrilha",
    "Branding",
    "Comunicação Persuasiva",
    "Estratégia de Vendas",
    "Liderança de Equipes",
    "Transformação Digital",
    "Posicionamento Digital",
    "CRM e Automação",
    "Mentoria Empresarial",
    "Crescimento de Negócios",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Mentor e Líder em Marketing e Vendas",
    description:
      "Líder visionário especializado em transformar comunicação em vendas, com experiência revolucionando empresas e desenvolvendo talentos em marketing e vendas.",
  },
  founder: [
    {
      "@type": "Organization",
      name: "Consig Summit",
      description: "Segundo maior evento financeiro do mundo",
    },
  ],
  alumniOf: {
    "@type": "Organization",
    name: "Fontes Promotora",
    description:
      "Revolucionou e tornou a empresa a maior do país em crédito consignado",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <link rel="canonical" href="https://filippneto.com.br" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta
          name="google-site-verification"
          content={process.env.GOOGLE_SITE_VERIFICATION || ""}
        />
        <meta name="geo.region" content="BR-SC" />
        <meta name="geo.placename" content="Balneário Camboriú" />
        <meta name="geo.position" content="-26.9924;-48.6274" />
        <meta name="ICBM" content="-26.9924, -48.6274" />
      </head>
      <body
        className={cn(
          "bg-black min-h-screen text-foreground antialiased font-heading overflow-x-hidden",
          base.variable,
          heading.variable,
          subheading.variable
        )}
      >
        <Toaster richColors theme="dark" position="top-right" />
        {/*   <GoogleAnalytics />
        <FacebookPixel /> */}
        {children}
      </body>
    </html>
  );
}
