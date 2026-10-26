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
