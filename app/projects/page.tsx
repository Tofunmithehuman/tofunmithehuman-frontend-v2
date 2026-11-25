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
    tags: ["Next.js", "Tailwind"],
    gradient: "linear-gradient(135deg,#0a3d4a 0%,#0d5c6b 50%,#128a9a 100%)",
    mock: <EdenLegacyMock />,
  },
  {
    title: "Dave Mol",
    about:
      "A luxury fashion brand website built around timeless elegance, simplicity and class, showcasing premium collections in a refined, minimal style.",
    href: "https://dave-mol.vercel.app/",
    category: "Fashion · Website",
    tags: ["Next.js", "GSAP"],
    gradient: "linear-gradient(135deg,#1c1410 0%,#4a3a2c 60%,#6b5440 100%)",
    mock: <DaveMock />,
  },
  {
    title: "Scapes and Kraft Properties",
    about:
      "Real estate construction and development company in Lagos, highlighting property projects, construction services and a professional brand presence.",
    href: "https://scapesandkraft.com/",
    category: "Real Estate · Construction",
    tags: ["Next.js", "Tailwind"],
    gradient: "linear-gradient(135deg,#3d2b1f 0%,#6b4c35 55%,#a67c52 100%)",
    mock: <ScapesMock />,
  },
  {
    title: "AfriNoir Studios",
    about:
      "African movie production company and film outsourcing platform, presenting services, projects and a bold cinematic identity.",
    href: "https://www.afrinoirstudios.com/",
    category: "Film · Production",
    tags: ["Next.js", "Tailwind"],
    gradient: "linear-gradient(135deg,#1c0a05 0%,#4a1c0f 50%,#8b3a1a 100%)",
    mock: <AfriNoirMock />,
  },
  {
    title: "EdenOceans",
    about:
      "Signature wellness experience reimagined for women — leadership, personal growth and exclusive community, delivered through a refined digital presence.",
    href: "https://www.edenoceans.com/",
    category: "Wellness · Community",
    tags: ["Next.js", "Tailwind"],
    gradient: "linear-gradient(135deg,#064e3b 0%,#0f766e 55%,#14b8a6 100%)",
    mock: <EdenOceansMock />,
  },
  {
    title: "Dr. Olapeju Simoyan",
    about:
      "Personal site for a physician, author and musician — books, talks, music and stories that heal, teach and inspire.",
    href: "https://thedoctorwriter.vercel.app/",
    category: "Personal · Author",
    tags: ["Next.js", "Tailwind"],
    gradient: "linear-gradient(135deg,#2e1065 0%,#5b21b6 55%,#7c3aed 100%)",
    mock: <DoctorMock />,
  },
];

export default function ProjectsPage() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils
          .toArray<HTMLElement>(".proj-frame", root)
          .forEach((frame) => {
            gsap.fromTo(
              frame,
              { clipPath: "inset(0 0 100% 0)" },
              {
                clipPath: "inset(0 0 0% 0)",
                duration: 1.1,
                ease: "power4.out",
                scrollTrigger: { trigger: frame, start: "top 90%" },
              },
            );
          });
        gsap.utils.toArray<HTMLElement>(".proj-text", root).forEach((el) => {
          gsap.from(el, {
            y: 24,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 93%" },
          });
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
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-black/50 transition-colors hover:text-black"
        >
          <ArrowLeft size={14} />
          Back to featured
        </Link>

        <h1 className="mb-3 text-4xl font-bold uppercase md:text-5xl">
          More Projects
        </h1>
        <p className="mb-12 max-w-xl text-base text-[#52575c] md:mb-16">
          Additional client work and personal sites — fashion, real estate,
          film, wellness and storytelling.
        </p>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
          {moreProjects.map((project, i) => (
            <article
              key={project.title}
              className={i % 2 === 1 ? "md:mt-16" : ""}
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

                  <div className="absolute inset-0">
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
                  0{i + 1} / 0{moreProjects.length}
                </p>
                <h2 className="proj-text mt-1 text-3xl font-bold tracking-tight md:text-4xl">
                  {project.title}
                </h2>
              </a>
              <p className="proj-text mt-3 max-w-md text-base leading-relaxed text-[#52575c]">
                {project.about}
              </p>
              <p className="proj-text mt-4 font-mono text-[11px] uppercase tracking-widest text-black/55">
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
