"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./HeroSection";
import About from "./AboutSection";
import TechStack from "@/app/components/Techstack";
import Services from "./Services";
import Marquee from "./Marquee";
import Projects from "./Projects";
import Experience from "./Experience";

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

    // Blur reduced from 18px to 12px: a lighter filter keeps scrolling smooth.
    tl.to(heroRef.current, {
      filter: "blur(12px)",
      opacity: 0.6,
      ease: "none",
    });
  });

  return (
    <>
      <div id="top" ref={heroRef} className="relative z-0">
        <Hero />
      </div>
      <div className="relative z-10">
        <About />
      </div>
      <div className="relative z-20">
        <TechStack />
        <Services />
      </div>

      {/* Tilted band that speeds up as you scroll, overlapping both sections */}
      <div className="pointer-events-none relative z-35 -my-8 overflow-x-clip">
        <Marquee
          items={["Frontend", "Backend", "Animation", "APIs", "Queues"]}
          className="-rotate-2 scale-x-110 bg-cream py-4 text-black"
          textClass="text-4xl md:text-6xl"
        />
      </div>

      <div className="relative z-30">
        <Projects />
      </div>
      <div className="relative z-40">
        <Experience />
      </div>
    </>
  );
}
