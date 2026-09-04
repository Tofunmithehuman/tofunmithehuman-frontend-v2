import type { Metadata } from "next";
import ScrollStack from "./components/ScrollStack";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Tofunmithehuman — FullStack Developer",
  description: "Portfolio of Bolaji Oluwatofunmi, FullStack Developer.",
};

export default function Home() {
  return (
    <div className="max-w-screen-2xl w-full mx-auto">
      <ScrollStack />
      <Footer />
    </div>
  );
}