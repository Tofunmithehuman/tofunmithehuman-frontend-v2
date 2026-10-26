import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import ScrollToTop from "./components/ScrollToTop";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";

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
  title: "Oluwatofunmi | Full Stack Developer Portfolio",
  description:
    "Portfolio of Bolaji Oluwatofunmi, a Full Stack Developer building secure web apps with animation-rich frontends and scalable backends.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-black">
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
        <ScrollToTop />
        <CustomCursor />
      </body>
    </html>
  );
}
