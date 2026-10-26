"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CloudArt,
  CodeArt,
  DbArt,
  GitArt,
  MotionArt,
  OrbitArt,
  ServerArt,
} from "./Illustrations";

gsap.registerPlugin(ScrollTrigger);

const light = "bg-cream text-black";
const dark = "border border-white/20 bg-black text-white";

const groups: {
  title: string;
  items: string[];
  art: ReactNode;
  tone: string;
}[] = [
  {
    title: "Languages",
    items: ["HTML5", "CSS3", "JavaScript", "TypeScript"],
    art: <CodeArt />,
    tone: light,
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS"],
    art: <OrbitArt />,
    tone: dark,
  },
  {
    title: "Motion",
    items: ["GSAP", "Motion.dev"],
    art: <MotionArt />,
    tone: light,
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js"],
    art: <ServerArt />,
    tone: dark,
  },
  {
    title: "Data",
    items: ["MongoDB", "Redis", "BullMQ"],
    art: <DbArt />,
    tone: light,
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Postman"],
    art: <GitArt />,
    tone: dark,
  },
  {
    title: "Deploy",
    items: ["Vercel", "Render", "AWS"],
    art: <CloudArt />,
    tone: light,
  },
];

export default function TechStack() {
  const wrapperRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const list = listRef.current;
      const wrapper = wrapperRef.current;
      if (!list || !wrapper) return;

      const getDistance = () =>
        Math.max(list.scrollWidth - wrapper.clientWidth, 0);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.to(list, { x: () => -getDistance() }, 0).to(
        barRef.current,
        { scaleX: 1 },
        0,
      );

      // Re-measure once fonts have loaded
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    { scope: wrapperRef },
  );

  return (
    <section
      id="stack"
      ref={wrapperRef}
      className="flex h-svh flex-col overflow-hidden bg-black pt-24 text-white md:pt-28"
    >
      <div className="flex items-center justify-between gap-6 px-5 pb-4 md:px-8">
        <h2 className="text-4xl font-bold uppercase md:text-5xl">My Stack</h2>
        <div className="h-1 w-24 overflow-hidden rounded-full bg-white/20 md:w-40">
          <div ref={barRef} className="h-full origin-left scale-x-0 bg-white" />
        </div>
      </div>

      <div className="min-h-0 flex-1 px-5 pb-6 md:px-8">
        <ul
          ref={listRef}
          className="flex h-full w-max gap-4 pr-5 md:gap-5 md:pr-8"
        >
          {groups.map((g) => (
            <li
              key={g.title}
              className={`flex h-full w-[78vw] shrink-0 flex-col justify-between rounded-3xl p-5 sm:w-[56vw] md:w-[30vw] md:p-6 ${g.tone}`}
            >
              <div className="min-h-0 flex-1">{g.art}</div>
              <div className="pt-4">
                <h3 className="text-3xl font-bold md:text-4xl">{g.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-current/30 px-3 py-1 text-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
