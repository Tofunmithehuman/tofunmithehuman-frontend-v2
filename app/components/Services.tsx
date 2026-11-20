"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PipelineArt, UiArt, v } from "./Illustrations";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Live illustrations (these keep updating on their own) ---------- */

const artBox = "h-48 overflow-hidden rounded-xl md:h-52";

type Req = {
  id: number;
  method: string;
  path: string;
  status: number;
  ms: number;
};
const endpoints: [string, string, number][] = [
  ["GET", "/events", 200],
  ["POST", "/tickets", 201],
  ["GET", "/me", 200],
  ["POST", "/payments/confirm", 200],
  ["GET", "/events/:id", 200],
];
const seedRows: Req[] = endpoints
  .slice(0, 4)
  .map(([method, path, status], i) => ({
    id: i,
    method,
    path,
    status,
    ms: 12 + i * 5,
  }));

function ApiLive() {
  const [rows, setRows] = useState<Req[]>(seedRows);
  const counter = useRef(10);

  useEffect(() => {
    const id = setInterval(() => {
      const [method, path, status] =
        endpoints[Math.floor(Math.random() * endpoints.length)];
      const next: Req = {
        id: counter.current++,
        method,
        path,
        status,
        ms: 6 + Math.floor(Math.random() * 34),
      };
      setRows((r) => [next, ...r].slice(0, 4));
    }, 1300);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`${artBox} space-y-1.5 bg-black p-3 text-[11px] text-white`}
    >
      {rows.map((r) => (
        <div
          key={r.id}
          className="row-in flex items-center justify-between rounded-md bg-white/10 px-3 py-2"
        >
          <span>
            <b className="mr-2 font-semibold">{r.method}</b>
            {r.path}
          </span>
          <span className="flex gap-3">
            <span className="text-white/50">{r.ms}ms</span>
            <span className="text-emerald-400">{r.status}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function QueueLive() {
  const [done, setDone] = useState(1284);
  useEffect(() => {
    const id = setInterval(() => setDone((n) => n + 1), 1100);
    return () => clearInterval(id);
  }, []);
  const lanes: [string, number][] = [
    ["email", 0],
    ["ticket", 1.6],
    ["payment", 3.2],
  ];

  return (
    <div className={`${artBox} relative bg-black/5 text-black`}>
      {lanes.map(([job, dl], i) => (
        <div
          key={job}
          className="absolute inset-x-0"
          style={{ top: `${24 + i * 26}%` }}
        >
          <div className="h-px bg-black/20" />
          <span
            className="art-slide absolute -top-3.5 rounded-full bg-black px-3 py-1 text-xs text-white"
            style={{ animationDelay: `${-dl}s` }}
          >
            {job}
          </span>
        </div>
      ))}
      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col items-center rounded-xl border-2 border-black bg-cream px-4 py-3">
        <span className="relative mb-1 flex size-2.5">
          <span className="a-ping absolute inset-0 rounded-full bg-emerald-500" />
          <span className="relative size-2.5 rounded-full bg-emerald-500" />
        </span>
        <span className="text-xs font-semibold">worker</span>
        <span className="text-xl font-bold tabular-nums">{done}</span>
        <span className="text-[10px] text-black/60">jobs done</span>
      </div>
    </div>
  );
}

/* ---------- Stat visuals ---------- */

function BarsViz() {
  return (
    <div className="space-y-2" aria-hidden>
      <div className="h-2.5 w-full rounded-full bg-white/25" />
      <div className="a-shrink h-2.5 w-full rounded-full bg-white" />
    </div>
  );
}

function DotsViz() {
  return (
    <div className="grid grid-cols-10 gap-1.5" aria-hidden>
      {Array.from({ length: 30 }, (_, i) => (
        <span
          key={i}
          className={`size-2 rounded-full bg-black ${(i * 3) % 5 < 3 ? "a-fade" : ""}`}
          style={v(undefined, `${(i % 10) * 0.12}s`)}
        />
      ))}
    </div>
  );
}

function ClockViz() {
  return (
    <svg viewBox="0 0 48 48" className="size-14 text-white" aria-hidden>
      <circle
        cx="24"
        cy="24"
        r="21"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <g
        className="a-spin"
        style={{
          ...v("3s"),
          transformBox: "view-box",
          transformOrigin: "24px 24px",
        }}
      >
        <path
          d="M24 24V9"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
      <circle cx="24" cy="24" r="2.5" fill="currentColor" />
    </svg>
  );
}

/* ---------- Card building blocks ---------- */

function Card({
  className = "",
  dark = false,
  children,
}: {
  className?: string;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`bento-card flex min-h-88 flex-col justify-between gap-6 rounded-2xl p-5 md:p-6 ${
        dark
          ? "border border-white/20 bg-black text-white"
          : "bg-cream text-black"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Feature({
  art,
  title,
  body,
  className,
}: {
  art: ReactNode;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <Card className={className}>
      {art}
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-black/65">{body}</p>
      </div>
    </Card>
  );
}

function Stat({
  value,
  prefix = "",
  suffix = "",
  label,
  viz,
  dark,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  viz: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Card dark={dark} className={className}>
      {viz}
      <div>
        <span
          className="count block text-8xl font-bold leading-none tracking-tighter md:text-8xl"
          data-to={value}
          data-prefix={prefix}
          data-suffix={suffix}
        >
          {prefix}
          {value}
          {suffix}
        </span>
        <p
          className={`mt-3 max-w-xs text-sm leading-relaxed ${
            dark ? "text-white/70" : "text-black/65"
          }`}
        >
          {label}
        </p>
      </div>
    </Card>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      const cards = gsap.utils.toArray<HTMLElement>(".bento-card", root);
      const counts = gsap.utils.toArray<HTMLElement>(".count", root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(cards, { autoAlpha: 0, y: 70, scale: 0.94 });
        ScrollTrigger.batch(cards, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 1,
              stagger: 0.12,
              ease: "power3.out",
            }),
        });

        // Numbers count up when their card arrives
        counts.forEach((el) => {
          const to = Number(el.dataset.to);
          const pre = el.dataset.prefix ?? "";
          const suf = el.dataset.suffix ?? "";
          const o = { n: 0 };
          el.textContent = `${pre}0${suf}`;
          ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            once: true,
            onEnter: () =>
              gsap.to(o, {
                n: to,
                duration: 2.2,
                ease: "power3.out",
                onUpdate: () => {
                  el.textContent = `${pre}${Math.round(o.n)}${suf}`;
                },
              }),
          });
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section id="services" ref={sectionRef} className="bg-black text-white">
      <div className="mx-auto max-w-screen-2xl px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-20">
        <div className="mb-8 md:mb-12 md:flex md:items-end md:justify-between">
          <h2 className="text-4xl font-bold uppercase md:text-5xl">
            What I do
          </h2>
          <p className="mt-3 max-w-md text-white/70 md:mt-0">
            From the button you tap to the queue behind it, I build the whole
            product and keep it fast and secure.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
          <Feature
            className="md:col-span-2"
            art={
              <div className={`${artBox} bg-black/5 text-black`}>
                <UiArt />
              </div>
            }
            title="Animated frontends"
            body="React, Next.js, Tailwind, GSAP and Motion. Component-driven interfaces with transitions that show people what just changed."
          />
          <Stat
            dark
            value={70}
            suffix="%"
            viz={<BarsViz />}
            label="Faster responses after cache warm-up, using Redis caching on Tixwav."
          />
          <Feature
            art={<ApiLive />}
            title="APIs and backends"
            body="Express.js and MongoDB REST APIs, defined early with frontend teams so both sides ship in parallel."
          />

          <Feature
            className="md:col-span-2"
            art={<QueueLive />}
            title="Queues and background jobs"
            body="BullMQ moves slow work, like emails, ticket generation and payment confirmation, off the request so users never wait on it."
          />
          <Stat
            value={60}
            suffix="%"
            viz={<DotsViz />}
            label="Fewer bugs in QA after code reviews focused on security and error handling."
          />
          <Feature
            art={
              <div className={`${artBox} bg-black/5 text-black`}>
                <PipelineArt />
              </div>
            }
            title="Shipped live"
            body="Git, Vercel, Render and AWS: from first commit to a deployed product."
          />

          <Stat
            dark
            className="md:col-span-2"
            value={1}
            prefix="<"
            suffix=" min"
            viz={<ClockViz />}
            label="Visitor approval time at Transcorp Power, down from 5 to 10 minutes, with real-time email alerts."
          />
          <Stat
            value={2}
            viz={<DotsViz />}
            label="MVPs built for early-stage founders at Megadel Africa."
          />
          <Stat
            dark
            value={3}
            viz={<BarsViz />}
            label="Roles shipped since 2024: Tixwav, Megadel Africa and Transcorp Power."
          />
        </div>
      </div>
    </section>
  );
}
