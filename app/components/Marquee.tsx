"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { v } from "./Illustrations";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  items: string[];
  className?: string;
  textClass?: string;
};

// A looping band that speeds up (and flips direction) with your scroll.
export default function Marquee({
  items,
  className = "",
  textClass = "text-4xl md:text-7xl",
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to(trackRef.current, {
          xPercent: -50,
          duration: 32,
          ease: "none",
          repeat: -1,
        });
        let dir = 1;
        let boost = 0;
        const st = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            dir = self.direction;
            boost = Math.min(Math.abs(self.getVelocity()) / 180, 10);
          },
        });
        const tick = () => {
          boost *= 0.93;
          tween.timeScale(dir * (1 + boost));
        };
        gsap.ticker.add(tick);
        return () => {
          gsap.ticker.remove(tick);
          st.kill();
          tween.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const half = [...items, ...items, ...items];

  return (
    <div ref={rootRef} className={`overflow-hidden ${className}`} aria-hidden>
      <div ref={trackRef} className="flex w-max whitespace-nowrap">
        {[0, 1].map((h) => (
          <div key={h} className="flex items-center">
            {half.map((t, i) => (
              <span
                key={i}
                className={`flex items-center gap-6 px-6 font-bold uppercase ${textClass}`}
              >
                {t}
                <svg
                  viewBox="0 0 24 24"
                  className="a-spin size-[0.55em] shrink-0"
                  style={v("8s")}
                  fill="currentColor"
                >
                  <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
