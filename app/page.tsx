import type { Metadata } from "next";
import ScrollStack from "./components/ScrollStack";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Tofunmithehuman — Full Stack Developer",
  description:
    "Portfolio of Bolaji Oluwatofunmi. Full Stack Developer building secure web apps with animation-rich frontends (Next.js, React, GSAP) and scalable backends (Express, MongoDB, Redis).",
  openGraph: {
    title: "Tofunmithehuman — Full Stack Developer",
    description:
      "Full Stack Developer building secure, animation-rich web apps.",
    url: "https://tofunmithehuman.com",
  },
};

export default function Home() {
  return (
    <div className="max-w-screen-2xl w-full mx-auto">
      <ScrollStack />
      <Footer />
    </div>
  );
}