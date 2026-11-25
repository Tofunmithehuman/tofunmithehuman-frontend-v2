import { v } from "./Illustrations";

// Small mono label used inside the mockups
const mono = "font-mono uppercase tracking-widest";

/* ---------------- LuraVPN: connection + DataShield ---------------- */

export function LuraMock() {
  return (
    <div className="absolute inset-0 text-white">
      <div
        className={`${mono} absolute left-1/2 top-[19%] -translate-x-1/2 whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[9px] md:text-[11px]`}
      >
        Protected · Frankfurt
      </div>

      <div className="absolute left-1/2 top-[47%] aspect-square w-[27%] -translate-x-1/2 -translate-y-1/2">
        <svg
          viewBox="0 0 120 120"
          className="size-full"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle
            cx="60"
            cy="60"
            r="57"
            strokeDasharray="3 9"
            opacity=".55"
            className="a-spin"
            style={v("26s")}
          />
          <circle cx="60" cy="60" r="44" opacity=".6" className="a-ring" />
          <path
            d="M60 28l24 9v18c0 16-10 27-24 33-14-6-24-17-24-33V37z"
            fill="rgba(255,255,255,.14)"
          />
          <path
            d="M49 59l8 8 15-17"
            strokeWidth="4"
            className="a-draw"
            style={v("3.5s")}
          />
        </svg>
      </div>

      <div className="absolute bottom-[9%] left-[6%] w-[36%] rounded-xl border border-white/15 bg-white/8 p-3 backdrop-blur-sm">
        <p className={`${mono} text-[8px] text-white/60 md:text-[10px]`}>
          DataShield
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15">
          <div
            className="a-type h-full rounded-full bg-cyan-300"
            style={v("4.5s")}
          />
        </div>
        <p className={`${mono} mt-2 text-[8px] md:text-[10px]`}>
          0 breaches found
        </p>
      </div>

      <div className="absolute bottom-[9%] right-[6%] w-[36%] rounded-xl border border-white/15 bg-white/8 p-3 backdrop-blur-sm">
        <p className={`${mono} text-[8px] text-white/60 md:text-[10px]`}>
          Speed
        </p>
        <div className="mt-2 flex h-8 items-end gap-1 md:h-10">
          {Array.from({ length: 9 }, (_, i) => (
            <span
              key={i}
              className="a-bar h-full w-full rounded-sm bg-cyan-300/80"
              style={v(`${1.1 + (i % 3) * 0.3}s`, `${i * 0.12}s`)}
            />
          ))}
        </div>
        <p className={`${mono} mt-2 text-[8px] md:text-[10px]`}>482 Mbps</p>
      </div>
    </div>
  );
}

/* ---------------- Dave Mol: quiet luxury lookbook ---------------- */

export function DaveMock() {
  const arches: [string, string, string, string][] = [
    ["h-[74%]", "bg-[#d8c7ac]", "0s", "art-float"],
    ["h-full", "bg-[#b39a78]", "1s", "art-float-slow"],
    ["h-[62%]", "bg-[#efe4d2]", "2s", "art-float"],
  ];
  return (
    <div className="absolute inset-0 text-[#f3e9da]">
      <p className="font-logo absolute left-1/2 top-[17%] -translate-x-1/2 whitespace-nowrap text-[clamp(1.1rem,3.4vw,2rem)] font-bold tracking-[0.4em]">
        DAVE MOL
      </p>
      <p
        className={`${mono} absolute left-1/2 top-[28%] -translate-x-1/2 whitespace-nowrap text-[8px] text-[#f3e9da]/60 md:text-[10px]`}
      >
        Timeless · Simple · Class
      </p>

      <div className="absolute inset-x-[14%] bottom-0 top-[38%] flex items-end justify-center gap-[4%]">
        {arches.map(([h, bg, dl, motion], i) => (
          <div
            key={i}
            className={`${h} ${bg} ${motion} relative w-[27%] rounded-t-full`}
            style={{ animationDelay: dl }}
          >
            {i === 1 && (
              <svg
                viewBox="0 0 24 24"
                className="a-swing absolute left-1/2 top-[14%] w-[44%] -translate-x-1/2 text-[#2b2118]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M12 8a2.5 2.5 0 1 0-2.5-2.5M12 8v2L3.5 16.5c-1 .8-.5 2 .8 2h15.4c1.3 0 1.8-1.2.8-2L12 10" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Tixwav: ticket + confirmation toast ---------------- */

export function TixMock() {
  return (
    <div className="absolute inset-0 text-white">
      <div className="art-float absolute left-1/2 top-[42%] w-[52%] -translate-x-1/2 -translate-y-1/2 -rotate-6 rounded-2xl bg-[linear-gradient(135deg,#d946ef,#6d1b7b)] p-[4%] shadow-2xl">
        <div className="flex items-start justify-between">
          <span className="font-logo text-[clamp(0.9rem,2.6vw,1.5rem)] font-bold">
            TIXWAV
          </span>
          <span className="h-4 w-6 rounded-sm bg-[linear-gradient(135deg,#f6e3a8,#c9a45c)] md:h-5 md:w-8" />
        </div>
        <div className="mt-3 grid w-[36%] grid-cols-6 gap-0.75">
          {Array.from({ length: 36 }, (_, i) => (
            <span
              key={i}
              className={`aspect-square rounded-[1px] bg-white/90 ${(i * 7) % 4 === 0 ? "a-fade" : ""}`}
              style={v(undefined, `${(i % 9) * 0.15}s`)}
            />
          ))}
        </div>
        <p className={`${mono} mt-3 text-[7px] text-white/80 md:text-[10px]`}>
          Sec A · Row 4 · Seat 12
        </p>
      </div>

      <div
        className="a-pop absolute bottom-[9%] left-1/2 flex w-[58%] -translate-x-1/2 items-center gap-3 rounded-xl border border-white/15 bg-black/35 p-3 backdrop-blur-sm"
        style={v("7s")}
      >
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-fuchsia-500 text-xs md:size-8">
          ✓
        </span>
        <div className="min-w-0">
          <p className="truncate text-[10px] font-semibold md:text-sm">
            Payment confirmed
          </p>
          <p
            className={`${mono} truncate text-[7px] text-white/60 md:text-[10px]`}
          >
            Ticket queued · Email sent
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Genzmummy Store: beauty / skincare e-com ---------------- */

export function GenzMock() {
  return (
    <div className="absolute inset-0 text-white overflow-hidden">
      {/* soft floating orbs */}
      <div
        className="art-float absolute -left-6 top-[18%] size-24 rounded-full bg-rose-400/25 blur-2xl"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="art-float-slow absolute -right-4 top-[35%] size-28 rounded-full bg-fuchsia-400/20 blur-2xl"
        style={{ animationDelay: "1.2s" }}
      />

      <div
        className={`${mono} absolute left-1/2 top-[12%] -translate-x-1/2 whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[8px] md:text-[10px]`}
      >
        New drops · Skin care
      </div>

      <p className="font-logo absolute left-1/2 top-[22%] -translate-x-1/2 whitespace-nowrap text-[clamp(1.05rem,3.2vw,1.85rem)] font-bold tracking-tight">
        GENZMUMMY
      </p>

      {/* product bottles / tubes */}
      <div className="absolute inset-x-[8%] top-[38%] flex items-end justify-center gap-[5%]">
        {/* serum dropper */}
        <div
          className="art-float relative flex w-[22%] flex-col items-center"
          style={{ animationDelay: "0s" }}
        >
          <div className="h-3 w-[55%] rounded-t-full bg-rose-200/90" />
          <div className="h-16 w-[70%] rounded-b-2xl bg-linear-to-b from-rose-300/90 to-rose-500/80 shadow-lg md:h-20">
            <div className="mx-auto mt-2 h-1.5 w-[40%] rounded-full bg-white/40" />
          </div>
          <span className={`${mono} mt-1.5 text-[6px] text-white/70 md:text-[8px]`}>
            Serum
          </span>
        </div>

        {/* hero lotion bottle */}
        <div
          className="art-float-slow relative z-10 flex w-[28%] flex-col items-center"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="h-4 w-[50%] rounded-t-md bg-amber-100/90" />
          <div className="relative h-24 w-full overflow-hidden rounded-2xl bg-linear-to-b from-amber-200/95 to-amber-500/85 shadow-xl md:h-28">
            <div className="absolute inset-x-2 top-3 h-1 rounded-full bg-white/35" />
            <div className="absolute bottom-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full border border-white/40" />
          </div>
          <span className={`${mono} mt-1.5 text-[7px] text-white/80 md:text-[9px]`}>
            Glow Lotion
          </span>
        </div>

        {/* cream jar */}
        <div
          className="art-float relative flex w-[22%] flex-col items-center"
          style={{ animationDelay: "1s" }}
        >
          <div className="h-2.5 w-[80%] rounded-t-lg bg-fuchsia-200/90" />
          <div className="h-14 w-full rounded-b-2xl bg-linear-to-b from-fuchsia-300/90 to-fuchsia-600/80 shadow-lg md:h-16">
            <div className="mx-auto mt-3 size-4 rounded-full border border-white/50" />
          </div>
          <span className={`${mono} mt-1.5 text-[6px] text-white/70 md:text-[8px]`}>
            Night Cream
          </span>
        </div>
      </div>

      {/* bottom cart toast */}
      <div
        className="a-pop absolute bottom-[8%] left-1/2 flex w-[68%] -translate-x-1/2 items-center gap-3 rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 backdrop-blur-sm"
        style={v("6.5s")}
      >
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-rose-400 text-[11px] font-bold text-black md:size-8">
          +
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[10px] font-semibold md:text-sm">
            Added to bag
          </p>
          <p className={`${mono} truncate text-[7px] text-white/55 md:text-[9px]`}>
            Ivory Glow · ₦16,000
          </p>
        </div>
        <span className="rounded-full bg-white/90 px-2.5 py-1 text-[8px] font-semibold text-black md:text-[10px]">
          View
        </span>
      </div>
    </div>
  );
}

/* ---------------- Edenoceans Legacy Foundation ---------------- */

export function EdenLegacyMock() {
  return (
    <div className="absolute inset-0 text-white overflow-hidden">
      {/* deep ocean glow */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-t from-cyan-900/40 to-transparent" />

      <div
        className={`${mono} absolute left-1/2 top-[13%] -translate-x-1/2 whitespace-nowrap rounded-full border border-cyan-300/30 bg-cyan-500/10 px-3 py-1 text-[8px] text-cyan-100/80 md:text-[10px]`}
      >
        Ocean · Legacy · Impact
      </div>

      <p className="font-logo absolute left-1/2 top-[23%] -translate-x-1/2 text-[clamp(0.95rem,2.9vw,1.65rem)] font-bold tracking-[0.18em]">
        EDENOCEANS
      </p>
      <p
        className={`${mono} absolute left-1/2 top-[33%] -translate-x-1/2 text-[7px] text-white/50 md:text-[9px]`}
      >
        Legacy Foundation
      </p>

      {/* orbiting rings + core */}
      <div className="absolute left-1/2 top-[55%] aspect-square w-[38%] -translate-x-1/2 -translate-y-1/2">
        <svg
          viewBox="0 0 120 120"
          className="size-full"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <circle
            cx="60"
            cy="60"
            r="54"
            strokeDasharray="4 10"
            opacity=".4"
            className="a-spin"
            style={v("22s")}
          />
          <circle
            cx="60"
            cy="60"
            r="40"
            strokeDasharray="2 8"
            opacity=".55"
            className="a-spin"
            style={v("14s")}
          />
          <circle cx="60" cy="60" r="22" opacity=".7" className="a-ring" />
          {/* soft core */}
          <circle cx="60" cy="60" r="10" fill="rgba(34,211,238,0.35)" />
        </svg>

        {/* floating particles */}
        {[
          { x: "18%", y: "22%", d: "0s" },
          { x: "72%", y: "28%", d: "0.8s" },
          { x: "25%", y: "68%", d: "1.4s" },
          { x: "70%", y: "65%", d: "2s" },
        ].map((p, i) => (
          <span
            key={i}
            className="art-float absolute size-1.5 rounded-full bg-cyan-300/80"
            style={{ left: p.x, top: p.y, animationDelay: p.d }}
          />
        ))}
      </div>

      <div className="absolute bottom-[9%] left-1/2 flex w-[74%] -translate-x-1/2 items-center justify-between rounded-xl border border-cyan-400/20 bg-cyan-950/40 px-3 py-2.5 backdrop-blur-sm">
        <div>
          <p className={`${mono} text-[7px] text-cyan-200/70 md:text-[9px]`}>
            Active programmes
          </p>
          <p className="mt-0.5 text-[11px] font-semibold md:text-sm">
            Coastal stewardship
          </p>
        </div>
        <div className="flex -space-x-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-6 rounded-full border border-cyan-300/40 bg-cyan-500/30"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Scapes and Kraft Properties ---------------- */

export function ScapesMock() {
  const buildings = [
    { h: "h-[42%]", w: "w-[13%]", delay: "0s", windows: 6 },
    { h: "h-[68%]", w: "w-[16%]", delay: "0.3s", windows: 10 },
    { h: "h-[55%]", w: "w-[14%]", delay: "0.6s", windows: 8 },
    { h: "h-[78%]", w: "w-[18%]", delay: "0.15s", windows: 12 },
    { h: "h-[48%]", w: "w-[13%]", delay: "0.9s", windows: 6 },
  ];

  return (
    <div className="absolute inset-0 text-white overflow-hidden">
      {/* sky gradient wash */}
      <div className="absolute inset-0 bg-linear-to-b from-amber-900/20 via-transparent to-transparent" />

      <p
        className={`${mono} absolute left-1/2 top-[12%] -translate-x-1/2 text-[8px] text-amber-100/60 md:text-[10px]`}
      >
        Real Estate · Construction
      </p>
      <p className="font-logo absolute left-1/2 top-[20%] -translate-x-1/2 whitespace-nowrap text-[clamp(0.9rem,2.7vw,1.5rem)] font-bold tracking-tight">
        SCAPES &amp; KRAFT
      </p>

      {/* skyline */}
      <div className="absolute inset-x-[6%] bottom-[22%] top-[36%] flex items-end justify-center gap-[2.5%]">
        {buildings.map((b, i) => (
          <div
            key={i}
            className={`${b.h} ${b.w} art-float relative overflow-hidden rounded-t-sm bg-linear-to-t from-amber-800/90 to-amber-500/75`}
            style={{ animationDelay: b.delay }}
          >
            {/* windows grid */}
            <div className="absolute inset-x-[18%] top-[12%] grid grid-cols-2 gap-1">
              {Array.from({ length: b.windows }).map((_, wi) => (
                <span
                  key={wi}
                  className={`aspect-square rounded-[1px] bg-amber-200/80 ${(wi * 3) % 5 === 0 ? "a-fade" : "opacity-50"}`}
                  style={v(undefined, `${(wi % 4) * 0.2}s`)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ground / foundation line */}
      <div className="absolute bottom-[18%] left-[5%] right-[5%] h-px bg-linear-to-r from-transparent via-amber-300/50 to-transparent" />

      {/* status card */}
      <div className="absolute bottom-[7%] left-1/2 flex w-[72%] -translate-x-1/2 items-center gap-3 rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 backdrop-blur-sm">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-amber-500/90 text-[10px] font-bold text-black">
          SK
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[10px] font-semibold md:text-sm">
            Lekki Phase 2 · Structure
          </p>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/15">
            <div
              className="a-type h-full rounded-full bg-amber-400"
              style={v("5s")}
            />
          </div>
        </div>
        <span className={`${mono} text-[7px] text-amber-200/70 md:text-[9px]`}>
          72%
        </span>
      </div>
    </div>
  );
}

/* ---------------- AfriNoir Studios ---------------- */

export function AfriNoirMock() {
  return (
    <div className="absolute inset-0 text-white overflow-hidden">
      {/* film grain / vignette feel */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)]" />

      <div
        className={`${mono} absolute left-1/2 top-[11%] -translate-x-1/2 whitespace-nowrap rounded-full border border-orange-400/25 bg-orange-500/10 px-3 py-1 text-[8px] text-orange-100/75 md:text-[10px]`}
      >
        Film · Production · Africa
      </div>

      {/* Title sits clearly above the player */}
      <p className="font-logo absolute left-1/2 top-[20%] z-10 -translate-x-1/2 text-[clamp(1.05rem,3.1vw,1.75rem)] font-bold tracking-[0.2em]">
        AFRINOIR
      </p>

      {/* film strip — lower so it no longer covers the title */}
      <div className="absolute left-1/2 top-[58%] w-[56%] -translate-x-1/2 -translate-y-1/2">
        <div className="relative aspect-16/10 overflow-hidden rounded-lg border border-white/20 bg-black/60 shadow-2xl">
          {/* perforations left */}
          <div className="absolute inset-y-0 left-0 flex w-3 flex-col justify-between py-1.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="mx-auto h-1.5 w-1.5 rounded-[1px] bg-white/25"
              />
            ))}
          </div>
          {/* perforations right */}
          <div className="absolute inset-y-0 right-0 flex w-3 flex-col justify-between py-1.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="mx-auto h-1.5 w-1.5 rounded-[1px] bg-white/25"
              />
            ))}
          </div>

          {/* screen content */}
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-orange-950/90 via-stone-900 to-black">
            <div className="a-pop relative grid size-12 place-items-center rounded-full bg-white/90 text-black shadow-lg md:size-14">
              <svg
                viewBox="0 0 24 24"
                className="size-5 fill-current md:size-6"
                aria-hidden
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <div className="a-type h-full bg-orange-400" style={v("6s")} />
          </div>
        </div>

        {/* clapper accent */}
        <div
          className="a-swing absolute -right-2 -top-3 flex h-7 items-center gap-1 rounded-md border border-white/20 bg-black/70 px-2"
          style={v(undefined, "1.5s")}
        >
          <span className="size-2 rounded-sm bg-orange-400" />
          <span className={`${mono} text-[6px] text-white/70 md:text-[8px]`}>
            TAKE 03
          </span>
        </div>
      </div>

      <p
        className={`${mono} absolute bottom-[9%] left-1/2 -translate-x-1/2 text-[8px] text-white/55 md:text-[10px]`}
      >
        Movie production · Film outsourcing
      </p>
    </div>
  );
}

/* ---------------- EdenOceans Club / main ---------------- */

export function EdenOceansMock() {
  return (
    <div className="absolute inset-0 text-white overflow-hidden">
      {/* soft breathing glow */}
      <div
        className="art-float absolute left-1/2 top-[42%] size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/15 blur-3xl md:size-48"
        style={{ animationDelay: "0s" }}
      />

      <p
        className={`${mono} absolute left-1/2 top-[12%] -translate-x-1/2 text-[8px] text-emerald-100/65 md:text-[10px]`}
      >
        Wellness · Leadership · Women
      </p>
      <p className="font-logo absolute left-1/2 top-[21%] -translate-x-1/2 text-[clamp(1rem,3vw,1.7rem)] font-bold tracking-[0.22em]">
        EDENOCEANS
      </p>

      {/* nested rings + diamond */}
      <div className="absolute left-1/2 top-[52%] aspect-square w-[42%] -translate-x-1/2 -translate-y-1/2">
        <svg
          viewBox="0 0 120 120"
          className="size-full"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          aria-hidden
        >
          <circle
            cx="60"
            cy="60"
            r="56"
            strokeDasharray="3 9"
            opacity=".35"
            className="a-spin"
            style={v("28s")}
          />
          <circle
            cx="60"
            cy="60"
            r="42"
            opacity=".5"
            className="a-ring"
          />
          <circle
            cx="60"
            cy="60"
            r="28"
            strokeDasharray="2 6"
            opacity=".65"
            className="a-spin"
            style={v("16s")}
          />
          {/* diamond / geometric center */}
          <path
            d="M60 42 L74 60 L60 78 L46 60 Z"
            fill="rgba(52,211,153,0.2)"
            stroke="rgba(167,243,208,0.7)"
            strokeWidth="1.5"
            className="a-draw"
            style={v("4s")}
          />
        </svg>
      </div>

      {/* bottom membership strip */}
      <div className="absolute bottom-[9%] left-1/2 flex w-[70%] -translate-x-1/2 flex-col items-center gap-1.5 rounded-xl border border-emerald-400/20 bg-emerald-950/45 px-4 py-2.5 backdrop-blur-sm">
        <p className="text-[11px] font-semibold tracking-wide md:text-sm">
          Signature wellness
        </p>
        <p className={`${mono} text-[7px] text-emerald-200/60 md:text-[9px]`}>
          Reimagined for you · Exclusive
        </p>
      </div>
    </div>
  );
}

/* ---------------- Dr. Olapeju Simoyan ---------------- */

export function DoctorMock() {
  return (
    <div className="absolute inset-0 text-white overflow-hidden">
      <div
        className={`${mono} absolute left-1/2 top-[10%] -translate-x-1/2 whitespace-nowrap rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1 text-[8px] text-violet-100/75 md:text-[10px]`}
      >
        Physician · Author · Musician
      </div>

      <p className="font-logo absolute left-1/2 top-[19%] -translate-x-1/2 whitespace-nowrap text-[clamp(0.8rem,2.3vw,1.3rem)] font-bold tracking-tight">
        DR. OLAPEJU SIMOYAN
      </p>

      {/* stacked story cards that float independently */}
      <div className="absolute left-1/2 top-[48%] w-[78%] -translate-x-1/2 -translate-y-1/2 space-y-2">
        {[
          {
            icon: "✎",
            title: "Stories that heal",
            sub: "10+ books published",
            delay: "0s",
          },
          {
            icon: "♪",
            title: "Music as medicine",
            sub: "TEDx · 13 songs",
            delay: "0.4s",
          },
          {
            icon: "✚",
            title: "20+ years in practice",
            sub: "Addiction & family medicine",
            delay: "0.8s",
          },
        ].map((card, i) => (
          <div
            key={card.title}
            className="art-float flex items-center gap-3 rounded-xl border border-white/12 bg-white/8 px-3 py-2.5 backdrop-blur-sm"
            style={{ animationDelay: card.delay }}
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-violet-500/85 text-sm font-medium">
              {card.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold md:text-sm">
                {card.title}
              </p>
              <p
                className={`${mono} truncate text-[7px] text-white/55 md:text-[9px]`}
              >
                {card.sub}
              </p>
            </div>
            {i === 1 && (
              <div className="hidden items-end gap-0.5 sm:flex">
                {[3, 5, 4, 7, 3, 6, 4].map((h, bi) => (
                  <span
                    key={bi}
                    className="a-bar w-1 rounded-sm bg-violet-300/80"
                    style={{
                      height: `${h * 2}px`,
                      ...v(`${0.9 + (bi % 3) * 0.25}s`, `${bi * 0.1}s`),
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* subtle bottom waveform line */}
      <div className="absolute bottom-[8%] left-[12%] right-[12%] flex h-4 items-end justify-center gap-0.5 opacity-40">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="a-bar w-1 rounded-full bg-violet-300"
            style={{
              height: `${4 + Math.sin(i * 0.7) * 8 + (i % 3) * 2}px`,
              ...v(`${1 + (i % 4) * 0.2}s`, `${i * 0.05}s`),
            }}
          />
        ))}
      </div>
    </div>
  );
}
