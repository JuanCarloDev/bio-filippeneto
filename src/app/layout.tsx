import "@/styles/globals.css";
import { cn } from "@/lib";
import { generateMetadata } from "@/utils";
import { base, heading } from "@/constants";
import { Toaster } from "@/components/ui/sonner";
import { subheading } from "@/constants/fonts";

export const metadata = generateMetadata();

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://juancarlo.com.br/#person",
  name: "Juan Carlo",
  alternateName: "Juan Carlo",
  description:
    "Fullstack Developer and CTO with 9+ years of experience. Co-founder who scaled startups from 0 to $20M revenue. Expert in React, Next.js, AI solutions, and international team leadership.",
  url: "https://juancarlo.com.br",
  image: {
    "@type": "ImageObject",
    url: "https://juancarlo.com.br/images/juan-carlo-profile.jpg",
    width: 800,
    height: 800,
  },
  jobTitle: "Fullstack Developer & AI Solutions Expert",
  worksFor: {
    "@type": "Organization",
    name: "Hive Technology",
    url: "https://hivetechnology.io",
  },
  email: "juancarlo8800@gmail.com",
  telephone: "+55-41-998768-9389",
  sameAs: [
    "https://linkedin.com/in/juancarlodev",
    "https://github.com/JuanCarloDev",
    "https://instagram.com/juanncarllo",
    "https://youtube.com/@juanncarllo",
  ],
  knowsAbout: [
    "React.js",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Artificial Intelligence",
    "Fullstack Development",
    "Startup Scaling",
    "Technical Leadership",
    "AI Solutions",
    "Sales Automation",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Software Developer",
    description:
      "Fullstack Developer specializing in React, Next.js, and AI solutions with experience scaling startups to millions in revenue.",
  },
  founder: [
    {
      "@type": "Organization",
      name: "Hive Technology",
      description: "Software development company specializing in AI solutions",
    },
  ],
  alumniOf: {
    "@type": "Organization",
    name: "Gonew.co",
    description: "EdTech startup scaled from 0 to $20M revenue",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <link rel="canonical" href="https://juancarlo.com.br" />
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
          "min-h-screen bg-background text-foreground antialiased font-heading overflow-x-hidden !scrollbar-hide",
          base.variable,
          heading.variable,
          subheading.variable
        )}
      >
        <Toaster richColors theme="dark" position="top-right" />
        {children}
      </body>
    </html>
  );
}
