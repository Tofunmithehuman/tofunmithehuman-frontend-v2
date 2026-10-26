"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// A light ring + dot that follows the pointer. Over any element marked with
// data-cursor="Label" (the project cards), it turns into a cream bubble with
// that label, e.g. "View". No snapping or wrapping around text and images.
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canUse =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!canUse) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    const bubble = bubbleRef.current;
    const label = labelRef.current;
    if (!ring || !dot || !bubble || !label) return;

    gsap.set([ring, dot], { xPercent: -50, yPercent: -50 });
    gsap.set(bubble, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });

    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "none" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "none" });
    const bubbleX = gsap.quickTo(bubble, "x", {
      duration: 0.35,
      ease: "power3",
    });
    const bubbleY = gsap.quickTo(bubble, "y", {
      duration: 0.35,
      ease: "power3",
    });

    let seen = false;
    let overLabel = false;

    const showBubble = (text: string) => {
      overLabel = true;
      label.textContent = text;
      gsap.to(bubble, {
        scale: 1,
        opacity: 1,
        duration: 0.45,
        ease: "back.out(1.7)",
        overwrite: "auto",
      });
      gsap.to([ring, dot], { opacity: 0, duration: 0.2, overwrite: "auto" });
    };
    const hideBubble = () => {
      overLabel = false;
      gsap.to(bubble, {
        scale: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power3.in",
        overwrite: "auto",
      });
      if (seen)
        gsap.to([ring, dot], { opacity: 1, duration: 0.2, overwrite: "auto" });
    };

    const onMove = (e: MouseEvent) => {
      if (!seen) {
        seen = true;
        gsap.set([ring, dot, bubble], { x: e.clientX, y: e.clientY });
        gsap.to([ring, dot], { opacity: 1, duration: 0.3 });
      }
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
      bubbleX(e.clientX);
      bubbleY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        showBubble(labelled.dataset.cursor || "View");
        return;
      }
      if (overLabel) hideBubble();

      // The ring only grows a little over clickable things.
      const clickable = target?.closest("a, button");
      gsap.to(ring, {
        scale: clickable ? 1.7 : 1,
        duration: 0.3,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onLeave = () => {
      gsap.to([ring, dot], { opacity: 0, duration: 0.2, overwrite: "auto" });
      gsap.to(bubble, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        overwrite: "auto",
      });
      overLabel = false;
    };
    const onEnter = () => {
      if (seen && !overLabel)
        gsap.to([ring, dot], { opacity: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      gsap.killTweensOf([ring, dot, bubble]);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-9999 size-8 rounded-full border-2 border-white opacity-0 mix-blend-difference"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-9999 size-2 rounded-full bg-white opacity-0 mix-blend-difference"
      />
      <div
        ref={bubbleRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-9999 grid size-24 place-items-center rounded-full bg-cream text-black opacity-0 shadow-xl md:size-28"
      >
        <span
          ref={labelRef}
          className="font-mono text-xs font-semibold uppercase tracking-[0.2em]"
        >
          View
        </span>
      </div>
    </>
  );
}
