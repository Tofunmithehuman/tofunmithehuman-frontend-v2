import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import ScrollToTop from "./components/ScrollToTop";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import JsonLD from "./components/JsonLd";

const siteUrl = "https://tofunmithehuman.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tofunmithehuman — Full Stack Developer",
    template: "%s · Tofunmithehuman",
  },
  description:
    "Portfolio of Bolaji Oluwatofunmi (Tofunmithehuman), a Full Stack Developer building secure, animation-rich web apps with Next.js, React, Express, MongoDB and Redis.",
  keywords: [
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Lagos",
    "Nigeria",
    "Tofunmithehuman",
    "Bolaji Oluwatofunmi",
    "Web Developer",
    "GSAP",
    "Express.js",
  ],
  authors: [{ name: "Bolaji Oluwatofunmi", url: siteUrl }],
  creator: "Bolaji Oluwatofunmi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Tofunmithehuman",
    title: "Tofunmithehuman — Full Stack Developer",
    description:
      "Full Stack Developer building secure, animation-rich frontends and scalable backends. Based in Lagos, Nigeria.",
    images: [
      {
        url: "/og-banner.png",
        width: 1200,
        height: 630,
        alt: "Tofunmithehuman — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tofunmithehuman — Full Stack Developer",
    description:
      "Full Stack Developer building secure, animation-rich frontends and scalable backends.",
    images: ["/og-banner.png"],
    creator: "@tofunmithehuman",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-black">
        <JsonLD />
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
        <ScrollToTop />
        <CustomCursor />
      </body>
    </html>
  );
}
