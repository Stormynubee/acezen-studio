import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingContact from "@/components/FloatingContact";
import CustomCursor from "@/components/CustomCursor";
import NeuralNexus from "@/components/NeuralNexus";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AtmosphereProvider } from "@/components/AtmosphereContext";

export const metadata: Metadata = {

  title: {
    default: "AceZen Digital Studio — Web, Brand & Motion Design",
    template: "%s | AceZen"
  },
  description: "Six-person creative engineering studio. We design and build websites, brands, and motion for teams who care how their product looks. Next.js, React, video production.",
  keywords: ["Digital Studio", "Web Design", "Next.js Developer", "3D WebGL", "Creative Agency", "Video Editing", "Motion Graphics", "React Developer", "System Architecture", "AceZen"],
  authors: [{ name: "Hansraj Tiwari", url: "https://acezen.in" }, { name: "Sayli Changan" }],
  creator: "Hansraj Tiwari",
  publisher: "AceZen Digital Studio",
  metadataBase: new URL("https://acezen.in"),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "AceZen Digital Studio",
    description: "We build custom hardware, clean web apps, and visual brands that actually stand out. 6 real human beings, zero corporate fluff. Based in India, shipping worldwide.",
    url: "https://acezen.in",
    siteName: "AceZen",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AceZen Digital Studio Cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AceZen Digital Studio",
    description: "We build custom hardware, clean web apps, and visual brands that actually stand out. 6 real human beings, zero corporate fluff.",
    creator: "@acezen_studio",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://api.web3forms.com" />
      </head>
      <body className="antialiased cinematic-grain bg-black text-white selection:bg-white/10 selection:text-white">
        <AtmosphereProvider>
          <NeuralNexus />
          {/* Cinematic Atmosphere — extremely subtle global light leaks */}
          <div className="fixed inset-0 pointer-events-none z-[1]" aria-hidden>
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/5 blur-[120px] rounded-full" />
          </div>
          
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "AceZen Digital Studio",
                "url": "https://acezen.in",
                "logo": "https://acezen.in/logo.png",
                "sameAs": [
                  "https://www.linkedin.com/in/hansrajtiwari/",
                  "https://github.com/Stormynubee",
                  "https://twitter.com/acezen_studio"
                ],
                "founder": {
                  "@type": "Person",
                  "name": "Hansraj Tiwari",
                  "jobTitle": "System Architect & Founder",
                  "url": "https://hansraj-dev.vercel.app/"
                },
                "description": "AceZen is a six-person creative engineering studio specializing in web development, brand design, and video production. Built with Next.js, React, and Framer Motion."
              }),
            }}
          />
          <CustomCursor />
          <FloatingContact />
          <SmoothScroll>
            <div className="relative z-[2]">
              {children}
            </div>
          </SmoothScroll>
          <SpeedInsights />
        </AtmosphereProvider>
      </body>
    </html>
  );
}
