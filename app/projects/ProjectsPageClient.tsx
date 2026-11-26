"use client";

import { useRef, type ReactNode } from "react";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Footer from "../components/Footer";
import {
  AfriNoirMock,
  DaveMock,
  DoctorMock,
  EdenLegacyMock,
  EdenOceansMock,
  ScapesMock,
} from "@/app/components/Projectmocks";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  title: string;
  about: string;
  href: string;
  category: string;
  tags: string[];
  gradient: string;
  mock: ReactNode;
};

const moreProjects: Project[] = [
  {
    title: "Edenoceans Legacy Foundation",
    about:
      "A foundation site focused on ocean legacy, community impact and coastal stewardship, presenting programmes and stories with a calm, purpose-driven visual language.",
    href: "https://www.edenoceanslegacyfoundation.com/",
    category: "Foundation · Impact",
    tags: ["Next.js", "Tailwind", "Motion.dev"],
    gradient: "linear-gradient(135deg,#0a3d4a 0%,#0d5c6b 50%,#128a9a 100%)",
    mock: <EdenLegacyMock />,
  },
  {
    title: "Dave Mol",
    about:
      "A luxury fashion brand website built around timeless elegance, simplicity and class, showcasing premium collections in a refined, minimal style.",
    href: "https://dave-mol.vercel.app/",
    category: "Fashion · Website",
    tags: ["React", "Tailwind", "Motion.dev"],
    gradient: "linear-gradient(135deg,#1c1410 0%,#4a3a2c 60%,#6b5440 100%)",
    mock: <DaveMock />,
  },
  {
    title: "Scapes and Kraft Properties",
    about:
      "Real estate construction and development company in Lagos, highlighting property projects, construction services and a professional brand presence.",
    href: "https://scapesandkraft.com/",
    category: "Real Estate · Construction",
    tags: ["Next.js", "Tailwind", "Gsap", "Express", "Mongodb"],
    gradient: "linear-gradient(135deg,#3d2b1f 0%,#6b4c35 55%,#a67c52 100%)",
    mock: <ScapesMock />,
  },
  {
    title: "AfriNoir Studios",
    about:
      "African movie production company and film outsourcing platform, presenting services, projects and a bold cinematic identity.",
    href: "https://www.afrinoirstudios.com/",
    category: "Film · Production",
    tags: ["React", "Tailwind", "Motion.dev"],
    gradient: "linear-gradient(135deg,#1c0a05 0%,#4a1c0f 50%,#8b3a1a 100%)",
    mock: <AfriNoirMock />,
  },
  {
    title: "EdenOceans",
    about:
      "Signature wellness experience reimagined for women — leadership, personal growth and exclusive community, delivered through a refined digital presence.",
    href: "https://www.edenoceans.com/",
    category: "Wellness · Community",
    tags: ["React", "Tailwind", "Express", "MongoDB"],
    gradient: "linear-gradient(135deg,#064e3b 0%,#0f766e 55%,#14b8a6 100%)",
    mock: <EdenOceansMock />,
  },
  {
    title: "Dr. Olapeju Simoyan",
    about:
      "Personal site for a physician, author and musician — books, talks, music and stories that heal, teach and inspire.",
    href: "https://thedoctorwriter.vercel.app/",
    category: "Personal · Author",
    tags: ["Next.js", "Tailwind", "Gsap"],
    gradient: "linear-gradient(135deg,#2e1065 0%,#5b21b6 55%,#7c3aed 100%)",
    mock: <DoctorMock />,
  },
];

export default function ProjectsPageClient() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" }, delay: 0.1 })
          .from(".hero-back", { y: 16, opacity: 0, duration: 0.7 })
          .from(
            ".hero-title",
            { yPercent: 110, duration: 1, ease: "power4.out" },
            0.1,
          )
          .from(".hero-copy", { y: 20, opacity: 0, duration: 0.8 }, 0.3);

        gsap.utils.toArray<HTMLElement>(".proj-item", root).forEach((item) => {
          const q = gsap.utils.selector(item);

          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: item, start: "top 85%" },
          });

          tl.fromTo(
            q(".proj-frame"),
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 1.2,
              ease: "power4.out",
            },
            0,
          )
            .fromTo(
              q(".proj-img"),
              { scale: 1.3 },
              { scale: 1, duration: 1.7 },
              0,
            )
            .from(q(".proj-pill"), { y: -12, opacity: 0, duration: 0.6 }, 0.5)
            .from(
              q(".proj-arrow"),
              {
                scale: 0,
                rotate: -90,
                duration: 0.7,
                ease: "back.out(1.7)",
                clearProps: "transform",
              },
              0.6,
            )
            .from(q(".proj-index"), { x: -12, opacity: 0, duration: 0.6 }, 0.7)
            .from(
              q(".proj-title"),
              { yPercent: 110, duration: 0.9, ease: "power4.out" },
              0.75,
            )
            .from(q(".proj-about"), { y: 20, opacity: 0, duration: 0.8 }, 0.9)
            .from(q(".proj-tags"), { y: 16, opacity: 0, duration: 0.7 }, 1.0);
        });

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

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-screen-2xl px-5 pb-24 pt-28 md:px-8 md:pb-32 md:pt-36">
        <Link
          href="/#work"
          className="hero-back mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-black/50 transition-colors hover:text-black"
        >
          <ArrowLeft size={14} />
          Back to featured
        </Link>

        <h1 className="mb-3 overflow-hidden pb-1 text-4xl font-bold uppercase md:text-5xl">
          <span className="hero-title block">More Projects</span>
        </h1>
        <p className="hero-copy mb-12 max-w-xl text-base text-[#52575c] md:mb-16">
          Additional client work and personal sites — fashion, real estate,
          film, wellness and storytelling.
        </p>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
          {moreProjects.map((project, i) => (
            <article
              key={project.title}
              className={`proj-item ${i % 2 === 1 ? "md:mt-16" : ""}`}
            >
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div
                  data-cursor="View"
                  className="proj-frame relative aspect-4/3 w-full overflow-hidden rounded-3xl"
                  style={{ background: project.gradient }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] bg-size-[22px_22px] opacity-60" />

                  <div className="proj-img absolute inset-0">
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                      {project.mock}
                    </div>
                  </div>

                  <span className="proj-pill absolute left-4 top-4 z-10 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/80 backdrop-blur-sm md:left-5 md:top-5">
                    {project.category}
                  </span>
                  <span className="proj-arrow absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-white text-black transition-transform duration-500 group-hover:rotate-45 md:right-5 md:top-5 md:size-12">
                    <ArrowUpRight size={20} />
                  </span>
                </div>

                <p className="proj-index mt-5 font-mono text-xs tracking-widest text-black/45">
                  0{i + 1} / 0{moreProjects.length}
                </p>
                <h2 className="mt-1 overflow-hidden pb-1.5 text-3xl font-bold tracking-tight md:text-4xl">
                  <span className="proj-title block">{project.title}</span>
                </h2>
              </a>
              <p className="proj-about mt-2 max-w-md text-base leading-relaxed text-[#52575c]">
                {project.about}
              </p>
              <p className="proj-tags mt-4 font-mono text-[11px] uppercase tracking-widest text-black/55">
                {project.tags.join(" · ")}
              </p>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
}