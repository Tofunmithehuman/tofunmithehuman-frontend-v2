"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portrait from "@/public/images/Tofunmithehuman.jpeg";
import { OrbitMini, v } from "./Illustrations";

gsap.registerPlugin(ScrollTrigger);

const statement =
  "I'm Oluwatofunmi, but people call me tofunmithehuman. I build efficient, scalable software, and I care as much about beautiful UI as I do about powerful backends and a seamless digital experience.";

const chips = [
  { label: "Next.js", pos: "-left-3 top-[16%] md:-left-8", dl: "0s" },
  { label: "Redis", pos: "-right-2 top-[44%] md:-right-8", dl: "1.2s" },
  { label: "GSAP", pos: "left-[6%] bottom-[7%]", dl: "2.4s" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(
        ".reveal-word",
        statementRef.current,
      );
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          if (ctx.conditions?.reduce) {
            gsap.set(words, { opacity: 1 });
            return;
          }

          // Words light up as you scroll through the statement
          gsap.to(words, {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: statementRef.current,
              start: "top 85%",
              end: "bottom 55%",
              scrub: true,
            },
          });

          // Portrait wipes in, then drifts inside its frame
          gsap.fromTo(
            ".about-frame",
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 1.3,
              ease: "power4.out",
              scrollTrigger: { trigger: ".about-frame", start: "top 88%" },
            },
          );
          gsap.fromTo(
            ".about-img",
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: "none",
              scrollTrigger: {
                trigger: ".about-frame",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
          gsap.from(".about-chip", {
            scale: 0,
            opacity: 0,
            stagger: 0.15,
            duration: 0.7,
            ease: "back.out(2)",
            scrollTrigger: { trigger: ".about-frame", start: "top 70%" },
          });
          gsap.from(".about-cta", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statementRef.current,
              start: "bottom 90%",
            },
          });
        },
      );
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="overflow-x-clip bg-white text-black"
    >
      <div className="mx-auto grid max-w-screen-2xl items-center gap-12 px-5 pb-20 pt-28 md:grid-cols-[minmax(0,26rem)_1fr] md:gap-20 md:px-8 md:pb-28 md:pt-36">
        {/* Portrait + badge + floating tech chips */}
        <div className="relative mx-auto w-full max-w-sm md:mx-0">
          <div className="about-frame relative aspect-4/5 -rotate-3 overflow-hidden rounded-2xl bg-black">
            <div className="about-img absolute inset-x-0 top-[-8%] h-[116%]">
              <Image
                src={portrait}
                alt="Tofunmithehuman"
                fill
                sizes="(min-width: 768px) 26rem, 90vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="absolute -right-3 -top-8 size-28 text-black md:-right-10 md:-top-10 md:size-32">
            <svg
              viewBox="0 0 120 120"
              className="a-spin size-full"
              style={v("16s")}
              aria-hidden
            >
              <defs>
                <path
                  id="badge-circle"
                  d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0"
                />
              </defs>
              <circle cx="60" cy="60" r="58" fill="#f6f1e7" />
              <text fontSize="10" fontWeight="700" fill="currentColor">
                <textPath
                  href="#badge-circle"
                  textLength="282"
                  lengthAdjust="spacing"
                >
                  FULLSTACK DEV • LAGOS • OPEN TO WORK •
                </textPath>
              </text>
            </svg>
            <ArrowDownRight className="absolute inset-0 m-auto" size={28} />
          </div>

          {chips.map((c) => (
            <span key={c.label} className={`about-chip absolute ${c.pos}`}>
              <span
                className="art-float block rounded-full bg-black px-4 py-2 text-sm font-semibold text-white shadow-lg"
                style={{ animationDelay: c.dl }}
              >
                {c.label}
              </span>
            </span>
          ))}
        </div>

        {/* Statement */}
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-1.5 text-sm">
            <span className="size-6 text-black">
              <OrbitMini />
            </span>
            Open to new projects · Lagos, Nigeria
          </p>

          <p
            ref={statementRef}
            className="text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl"
            aria-label={statement}
          >
            {statement.split(" ").map((word, i) => (
              <span
                key={i}
                aria-hidden
                className="reveal-word mr-[0.25em] inline-block opacity-20"
              >
                {word}
              </span>
            ))}
          </p>

          <a
            href="https://drive.google.com/file/d/1HVUo85TCyU_6UcCzmoICPgwBEcrSnHnq/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="about-cta mt-10 flex items-center justify-center gap-2 rounded-full bg-black px-8 py-3.5 text-lg font-semibold text-white transition-transform duration-300 hover:scale-[1.03] md:w-fit md:justify-start"
          >
            View Resume <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}
