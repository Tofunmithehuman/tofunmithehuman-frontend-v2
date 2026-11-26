"use client";

import { useRef, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { v } from "./Illustrations";
import { GenzMock, LuraMock, TixMock } from "./Projectmocks";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  title: string;
  about: string;
  href: string;
  category: string; // pill in the card corner
  tags: string[];
  gradient: string; // card background
  mock: ReactNode;
};

const projects: Project[] = [
  {
    title: "LuraVPN",
    about:
      "A VPN and privacy platform with fast, encrypted connections, AI-powered features, malware protection and a data breach scanner called DataShield.",
    href: "https://luravpn.com/",
    category: "VPN · Privacy",
    tags: ["Next.js", "Tailwind", "Redux"],
    gradient: "linear-gradient(135deg,#0c4a5e 0%,#0e2a4d 55%,#141b45 100%)",
    mock: <LuraMock />,
  },
  {
    title: "Genzmummy Store",
    about:
      "A beauty and skincare e-commerce store for Gen Z mothers, curating glow products, lotions and self-care essentials with a clean, modern shopping experience.",
    href: "https://www.genzmummystore.com/",
    category: "Beauty · E-commerce",
    tags: ["React", "Tailwind", "Express", "MongoDB"],
    gradient: "linear-gradient(135deg,#4a1942 0%,#7a2f5c 50%,#c45c8a 100%)",
    mock: <GenzMock />,
  },
  {
    title: "Tixwav",
    about:
      "An event ticketing platform with an animated, component-driven frontend, Redis caching and queued jobs for emails, tickets and payment confirmation.",
    href: "https://www.tixwav.com/",
    category: "Events · Ticketing",
    tags: ["React", "Express", "MongoDB", "Redis", "BullMQ"],
    gradient: "linear-gradient(135deg,#2e0a3f 0%,#5a1470 55%,#8a1f7d 100%)",
    mock: <TixMock />,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Cards wipe in, text rises
        gsap.utils
          .toArray<HTMLElement>(".proj-frame", root)
          .forEach((frame) => {
            gsap.fromTo(
              frame,
              { clipPath: "inset(0 0 100% 0)" },
              {
                clipPath: "inset(0 0 0% 0)",
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: { trigger: frame, start: "top 88%" },
              },
            );
          });
        gsap.utils.toArray<HTMLElement>(".proj-text", root).forEach((el) => {
          gsap.from(el, {
            y: 28,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%" },
          });
        });

        // The mockup inside each card drifts gently as you scroll
        gsap.utils.toArray<HTMLElement>(".proj-img", root).forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
      });

      // Parallel scroll: the offset cards travel at a different speed.
      // Desktop = big move, phones = a gentler one.
      mm.add(
        {
          desktop:
            "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          mobile:
            "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const desktop = !!ctx.conditions?.desktop;
          const [from, to] = desktop ? [90, -70] : [26, -26];
          gsap.utils
            .toArray<HTMLElement>(".proj-offset", root)
            .forEach((el) => {
              gsap.fromTo(
                el,
                { y: from },
                {
                  y: to,
                  ease: "none",
                  scrollTrigger: {
                    trigger: root,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                },
              );
            });
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section id="work" ref={sectionRef} className="bg-white text-black">
      <div className="mx-auto max-w-screen-2xl px-5 pb-20 pt-24 md:px-8 md:pb-32 md:pt-32">
        <h2 className="mb-8 text-4xl font-bold uppercase md:mb-12 md:text-5xl">
          My Projects
        </h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
          {projects.map((project, i) => (
            <article
              key={project.title}
              className={i % 2 === 1 ? "proj-offset md:mt-20" : ""}
            >
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                {/* data-cursor makes the custom cursor turn into a "View" bubble */}
                <div
                  data-cursor="View"
                  className="proj-frame relative aspect-4/3 w-full overflow-hidden rounded-3xl"
                  style={{ background: project.gradient }}
                >
                  {/* faint dot grid */}
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] bg-size-[22px_22px] opacity-60" />

                  <div className="proj-img absolute inset-0">
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                      {project.mock}
                    </div>
                  </div>

                  <span className="absolute left-4 top-4 z-10 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/80 backdrop-blur-sm md:left-5 md:top-5">
                    {project.category}
                  </span>
                  <span className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-white text-black transition-transform duration-500 group-hover:rotate-45 md:right-5 md:top-5 md:size-12">
                    <ArrowUpRight size={20} />
                  </span>
                </div>

                <p className="proj-text mt-5 font-mono text-xs tracking-widest text-black/45">
                  0{i + 1} / 0{projects.length}
                </p>
                <h3 className="proj-text mt-1 text-4xl font-bold tracking-tight md:text-5xl">
                  {project.title}
                </h3>
              </a>
              <p className="proj-text mt-3 max-w-md text-base leading-relaxed text-[#52575c]">
                {project.about}
              </p>
              <p className="proj-text mt-4 font-mono text-[11px] uppercase tracking-widest text-black/55">
                {project.tags.join(" · ")}
              </p>
            </article>
          ))}

          {/* More projects card → /projects */}
          <a
            href="/projects"
            data-cursor="Projects"
            className="proj-offset group relative flex aspect-4/3 flex-col justify-between overflow-hidden rounded-3xl bg-black p-6 text-white md:mt-20"
          >
            <svg
              viewBox="0 0 24 24"
              className="a-spin absolute -right-10 -top-10 size-48 text-white/10"
              style={v("20s")}
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
            </svg>
            <span className="relative grid size-14 place-items-center rounded-full bg-white text-black transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={28} />
            </span>
            <span className="relative text-3xl font-bold leading-tight md:text-4xl">
              More projects
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
