"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  EMAIL,
  GITHUB,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "@/app/components/Links";
import Marquee from "./Marquee";
import { ClockMini, v } from "./Illustrations";
import { getLenis } from "./Lenisinstance";

gsap.registerPlugin(ScrollTrigger);

const RESUME =
  "https://drive.google.com/file/d/1HVUo85TCyU_6UcCzmoICPgwBEcrSnHnq/view?usp=sharing";

const heading = "Let's build something solid.";
const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Lagos",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const columns = [
  {
    title: "Navigate",
    items: [
      { label: "About", href: "#about" },
      { label: "Stack", href: "#stack" },
      { label: "Services", href: "#services" },
      { label: "Work", href: "#work" },
      { label: "Experience", href: "#experience" },
    ],
  },
  {
    title: "Connect",
    items: [
      { label: "Email", href: `mailto:${EMAIL}` },
      { label: "GitHub", href: GITHUB },
      { label: PHONE_DISPLAY, href: PHONE_HREF },
    ],
  },
  {
    title: "More",
    items: [{ label: "Resume", href: RESUME }],
  },
];

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  // Live Lagos clock (set after mount to avoid a hydration mismatch)
  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".f-word", {
          yPercent: 110,
          rotate: 4,
          stagger: 0.09,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".f-heading", start: "top 85%" },
        });
        gsap.from(".f-fade", {
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".f-heading", start: "top 70%" },
        });
        // The giant wordmark rises into place as the page ends
        gsap.fromTo(
          ".f-mark",
          { yPercent: 25 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".f-mark",
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: the mailto link still works
    }
  };

  const go = (e: React.MouseEvent, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { duration: 1.6 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      ref={rootRef}
      className="relative z-40 overflow-hidden bg-black text-white"
    >
      <Marquee
        items={["Open to new projects", "Let's talk", "Lagos, Nigeria"]}
        className="border-y border-white/20 py-3"
        textClass="text-3xl md:text-5xl"
      />

      {/* Call to action */}
      <div className="relative mx-auto max-w-screen-2xl px-5 pb-20 pt-16 text-center md:px-8 md:pb-28 md:pt-24">
        <svg
          viewBox="0 0 120 120"
          className="art-float absolute right-6 top-10 hidden size-28 text-white/80 md:block lg:size-36"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M8 56L112 8L84 108L56 72z" />
          <path d="M112 8L56 72M56 72L52 100L72 82" />
          <path
            d="M6 96c14-4 22 4 30 0"
            strokeDasharray="4 6"
            className="art-dash"
          />
        </svg>

        <p className="f-fade mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-1.5 text-sm">
          <span className="size-5 text-white">
            <ClockMini />
          </span>
          Lagos <span className="tabular-nums">{time || "--:--:--"}</span> WAT
        </p>

        <h2
          className="f-heading mx-auto max-w-4xl text-5xl font-bold leading-[1.05] md:text-8xl"
          aria-label={heading}
        >
          {heading.split(" ").map((w, i) => (
            <span
              key={i}
              aria-hidden
              className="mr-[0.25em] inline-block overflow-hidden align-top"
            >
              <span className="f-word inline-block">{w}</span>
            </span>
          ))}
        </h2>

        <div className="f-fade mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-lg font-semibold text-black transition-transform duration-300 hover:scale-[1.03]"
          >
            {EMAIL} <ArrowUpRight />
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 font-semibold transition-colors duration-300 hover:bg-white hover:text-black"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>
      </div>

      {/* Lower block: tagline, link columns and the giant wordmark */}
      <div className="bg-[#171717]">
        <div className="mx-auto max-w-screen-2xl px-5 pt-14 md:px-8 md:pt-20">
          <div className="grid gap-10 md:grid-cols-[1.2fr_2fr] md:gap-16">
            <div>
              <svg
                viewBox="0 0 24 24"
                className="a-spin size-7 text-white"
                style={v("14s")}
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
              </svg>
              <p className="mt-5 max-w-xs text-xl leading-snug md:text-2xl">
                Building the web, one solid product at a time.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {columns.map((col) => (
                <div key={col.title}>
                  <h3 className="text-xs uppercase tracking-widest text-white/40">
                    {col.title}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm">
                    {col.items.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          onClick={(e) => go(e, item.href)}
                          target={
                            item.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            item.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="text-white/80 transition-colors duration-300 hover:text-white"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-14 text-xs text-white/40">
            © 2026 Bolaji Oluwatofunmi · Lagos, Nigeria
          </p>
        </div>

        {/* Stretched to the full width of the screen */}
        <div className="f-mark mt-6 overflow-hidden px-3 pb-3 md:px-5 md:pb-5">
          <svg
            viewBox="0 0 1000 108"
            className="block w-full select-none text-[#8c8c84]"
            aria-hidden
          >
            <text
              x="0"
              y="100"
              fontSize="112"
              fontWeight="800"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              fill="currentColor"
              className="font-logo"
            >
              TOFUNMITHEHUMAN
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}
