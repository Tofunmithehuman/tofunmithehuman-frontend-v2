"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "./Lenisinstance";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // lerp gives a continuous, buttery glide (lower = smoother/longer)
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
    setLenis(lenis); // the navbar uses this for anchor jumps + menu scroll lock

    lenis.on("scroll", ScrollTrigger.update);

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
}
