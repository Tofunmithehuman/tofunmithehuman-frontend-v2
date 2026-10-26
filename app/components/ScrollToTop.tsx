"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { getLenis } from "./Lenisinstance";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggle, { passive: true });
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.8 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-5 right-5 z-50 rounded-full border-2 border-white bg-black/90 p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-black md:bottom-6 md:right-6 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp size={20} />
    </button>
  );
}
