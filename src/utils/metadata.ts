import { Metadata } from "next";

interface MetadataProps {
  title?: string;
  description?: string;
  icons?: Metadata["icons"];
  noIndex?: boolean;
  keywords?: string[];
  author?: string;
  twitterHandle?: string;
  type?: "website" | "article" | "profile";
  locale?: string;
  alternates?: Record<string, string>;
  publishedTime?: string;
  modifiedTime?: string;
}

export const generateMetadata = ({
  title = `Filippe Neto - Mentor A Voz Que Vende`,
  description = `Filippe Neto é um líder visionário em marketing e vendas com 17+ anos de experiência. Transformou 1700+ vozes em máquinas de vendas. Mentor, palestrante e especialista em comunicação que converte. Disponível para mentoria e consultoria.`,
  icons = [
    {
      rel: "icon",
      url: "/faviconfilippeneto.png",
      type: "image/png",
    },
    {
      rel: "apple-touch-icon",
      url: "/faviconfilippeneto.png",
      sizes: "180x180",
    },
    {
      rel: "shortcut icon",
      url: "/faviconfilippeneto.png",
    },
  ],
  noIndex = false,
  keywords = [
    "Filippe Neto",
    "mentor vendas brasil",
    "comunicação que vende",
    "marketing de guerrilha",
    "branding expert",
    "palestrante vendas",
    "consultor marketing",
    "liderança vendas",
    "balneário camboriú mentor",
    "a voz que vende",
    "mentoria vendas",
    "pablo marçal",
    "consig summit",
    "labellamafia growth",
    "fontes promotora",
    "transformação digital",
    "estratégia de vendas",
    "comunicação persuasiva",
    "crescimento empresarial",
    "posicionamento digital",
  ],
  author = "Filippe Neto",
  type = "profile",
}: MetadataProps = {}): Metadata => {
  const metadataBase = new URL("https://filippneto.com.br");

  return {
    metadataBase,
    title: {
      template: `%s | Filippe Neto`,
      default: title,
    },
    description,
    keywords,
    authors: [{ name: author }],
    creator: author,
    publisher: "Filippe Neto",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: type,
      locale: "pt_BR",
      url: metadataBase,
      title: title,
      description: description,
      siteName: "Filippe Neto",
      images: [
        {
          url: "/metaimage.jpg",
          width: 1200,
          height: 630,
          alt: "Filippe Neto - Mentor A Voz Que Vende | Líder em Marketing e Vendas",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ["/metaimage.jpg"],
    },
    alternates: {
      canonical: metadataBase,
      languages: {
        "pt-BR": metadataBase,
        "en-US": new URL("/en", metadataBase),
      },
    },
    icons,
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
};
