import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingContact from "@/components/FloatingContact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AceZen Digital Studio | Creative Engineering & Visual Design",
    template: "%s | AceZen"
  },
  description: "AceZen transcends traditional development. We architect cinematic digital realities, from system kernels to brand films. Specializing in Next.js, 3D WebGL, and High-Fidelity Motion.",
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
    description: "Creative engineering for the digital age. We build digital empires.",
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
    description: "Creative engineering for the digital age.",
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
      <body className={`${geistSans.variable} antialiased`}>
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
              "description": "AceZen architects cinematic digital realities, from system kernels to brand films. Specializing in Next.js, 3D WebGL, and High-Fidelity Motion."
            }),
          }}
        />
        <FloatingContact />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
