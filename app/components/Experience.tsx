"use client";

import { useRef, useState, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ApiMini, CheckMini, TicketMini } from "./Illustrations";

gsap.registerPlugin(ScrollTrigger);

const roles: {
  role: string;
  company: string;
  period: string;
  points: string[];
  tags: string[];
  bg: string;
  icon: ReactNode;
}[] = [
  {
    role: "Full Stack Developer",
    company: "Tixwav",
    period: "Sep 2025 – Present",
    points: [
      "Built an event ticketing platform with Vite/React, Redux, Tailwind CSS and Motion, using reusable components for a consistent, animated UI.",
      "Built the backend with Express.js and MongoDB, using Redis for caching and sessions and BullMQ for queued emails, ticket generation and payment confirmation.",
      "Cut response times by 70% after cache warm-up.",
    ],
    tags: ["React", "Redux", "Express", "MongoDB", "Redis", "BullMQ"],
    bg: "bg-cream",
    icon: <TicketMini />,
  },
  {
    role: "Backend Developer",
    company: "Megadel Africa",
    period: "Oct 2024 – Dec 2024",
    points: [
      "Built backend systems and REST APIs for two MVPs for early-stage founders, prioritising fast, production-ready delivery.",
      "Defined APIs early with frontend teams so both sides could be built in parallel.",
      "Reviewed code for security and error handling, reducing bugs in QA by 60%.",
    ],
    tags: ["Express", "MongoDB", "REST APIs"],
    bg: "bg-[#ebe4d4]",
    icon: <ApiMini />,
  },
  {
    role: "Full Stack Developer Intern",
    company: "Transcorp Power Plc",
    period: "Jan 2024 – Sep 2024",
    points: [
      "Built a visitor management MVP where staff approve entry requests directly, cutting approval time from 5–10 minutes to under one.",
      "Next.js frontend and Express.js backend, with real-time email alerts the moment a visitor requests entry.",
      "Owned it end to end, from designing the approval flow to deployment across the IT department.",
    ],
    tags: ["Next.js", "Express"],
    bg: "bg-[#ddd5c2]",
    icon: <CheckMini />,
  },
];

const STEP = 16; // px each following card sticks lower, so edges peek out
const baseTop = () =>
  typeof window !== "undefined" && window.innerWidth >= 768 ? 96 : 76;

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);

  useGSAP(
    () => {
      const root = sectionRef.current;
      const mm = gsap.matchMedia();

      // No breakpoint condition: the stacking runs on phones and desktops alike.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".exp-card", root);

        cards.forEach((card, i) => {
          // Bullets type in as each card arrives
          gsap.from(card.querySelectorAll(".exp-point"), {
            y: 18,
            opacity: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 78%" },
          });

          // Tracks which role is in focus (drives the counter)
          ScrollTrigger.create({
            trigger: card,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: (self) => self.isActive && setCurrent(i),
          });

          // The card underneath shrinks as the next one slides over it
          if (i < cards.length - 1) {
            gsap.to(card, {
              scale: 0.94,
              transformOrigin: "center top",
              ease: "none",
              scrollTrigger: {
                trigger: cards[i + 1],
                start: "top bottom",
                end: () => `top ${baseTop() + (i + 1) * STEP}px`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
          }
        });

        // Progress line fills as you move through the roles
        gsap.fromTo(
          ".exp-progress",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".exp-cards",
              start: "top 60%",
              end: "bottom 80%",
              scrub: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section id="experience" ref={sectionRef} className="bg-black text-white">
      <div className="mx-auto max-w-screen-2xl px-5 pb-20 pt-16 md:grid md:grid-cols-[1fr_1.6fr] md:gap-12 md:px-8 md:pb-32 md:pt-24">
        <div className="mb-8 h-fit md:sticky md:top-28 md:mb-0">
          <h2 className="text-4xl font-bold uppercase md:text-5xl">
            Experience
          </h2>
          <p className="mt-3 max-w-sm text-white/70">
            Three roles, one habit: ship something solid, then make it faster.
          </p>

          <div className="mt-10 hidden items-stretch gap-5 md:flex">
            <div className="relative w-0.5 bg-white/20">
              <div className="exp-progress absolute inset-0 origin-top bg-white" />
            </div>
            <div>
              <p className="text-7xl font-bold leading-none tabular-nums">
                0{current + 1}
                <span className="text-3xl text-white/40">
                  {" "}
                  / 0{roles.length}
                </span>
              </p>
              <ul className="mt-5 space-y-1.5">
                {roles.map((r, i) => (
                  <li
                    key={r.company}
                    className={`transition-all duration-500 ${
                      i === current
                        ? "translate-x-2 text-white"
                        : "text-white/35"
                    }`}
                  >
                    {r.company}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="exp-cards [--exp-top:76px] md:[--exp-top:96px]">
          {roles.map((r, i) => (
            <article
              key={r.company}
              className={`exp-card sticky rounded-2xl p-5 text-black md:p-8 ${r.bg} ${
                i < roles.length - 1 ? "mb-[14vh] md:mb-[18vh]" : ""
              }`}
              style={{ top: `calc(var(--exp-top) + ${i * STEP}px)` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold md:text-3xl">
                    {r.company}
                  </h3>
                  <p className="font-medium text-black/70">{r.role}</p>
                  <p className="mt-1 text-sm text-black/55">{r.period}</p>
                </div>
                <div className="size-16 shrink-0 text-black md:size-20">
                  {r.icon}
                </div>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-black/80 md:text-base">
                {r.points.map((p) => (
                  <li key={p} className="exp-point">
                    {p}
                  </li>
                ))}
              </ul>
              <ul className="mt-5 flex flex-wrap gap-2">
                {r.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-black/25 px-3 py-1 text-xs"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
