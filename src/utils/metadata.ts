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
  title = `Juan Carlo / AI Expert`,
  description = `Juan Carlo é um Fullstack Developer e CTO com 9+ anos de experiência. Co-fundador que escalou startups de 0 a $20M de receita. Expert em React, Next.js, AI solutions, e liderança técnica internacional. Disponível para consulting e mentorship.`,
  icons = [
    {
      rel: "icon",
      url: "/faviconjuan.png",
      type: "image/png",
    },
    {
      rel: "apple-touch-icon",
      url: "/faviconjuan.png",
      sizes: "180x180",
    },
    {
      rel: "shortcut icon",
      url: "/faviconjuan.png",
    },
  ],
  noIndex = false,
  keywords = [
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
    "edtech experience",
    "international clients",
    "revenue growth",
    "technical leadership",
    "typescript expert",
    "node.js developer",
    "mentorship technology",
    "seven sales ai",
    "hive technology",
  ],
  author = "Juan Carlo ",
  type = "profile",
}: MetadataProps = {}): Metadata => {
  const metadataBase = new URL("https://juancarlo.com.br");

  return {
    metadataBase,
    title: {
      template: `%s | Juan Carlo`,
      default: title,
    },
    description,
    keywords,
    authors: [{ name: author }],
    creator: author,
    publisher: "Juan Carlo",
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
      siteName: "Juan Carlo",
      images: [
        {
          url: "/metaimage.jpg",
          width: 1200,
          height: 630,
          alt: "Juan Carlo - Fullstack Developer & AI Solutions Expert",
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
