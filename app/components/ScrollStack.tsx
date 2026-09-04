"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./HeroSection";
import About from "./AboutSection";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollStack() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    tl.to(heroRef.current, {
      filter: "blur(18px)",
      opacity: 0.6,
      ease: "none",
    });
  });

  return (
    <>
      <div ref={heroRef} className="relative z-0 will-change-[filter]">
        <Hero />
      </div>
      <div className="relative z-10">
        <About />
      </div>
    </>
  );
}
