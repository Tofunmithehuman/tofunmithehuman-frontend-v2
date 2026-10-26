import type { CSSProperties, ReactNode } from "react";

/** Inline CSS vars used by the keyframes in globals.css */
export const v = (
  d?: string,
  dl?: string,
  extra: Record<string, string> = {},
) =>
  ({
    ...(d ? { "--d": d } : {}),
    ...(dl ? { "--dl": dl } : {}),
    ...extra,
  }) as CSSProperties;

// Everything draws in currentColor, so the parent's text colour themes it.
function S({
  children,
  vb = "0 0 200 160",
}: {
  children: ReactNode;
  vb?: string;
}) {
  return (
    <svg
      viewBox={vb}
      className="h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const dot = { fill: "currentColor", stroke: "none" } as const;

/* ---------------- Tech stack illustrations ---------------- */

export function CodeArt() {
  const widths = [100, 64, 88, 48, 76];
  return (
    <S>
      <rect x="16" y="14" width="168" height="132" rx="10" />
      {[30, 42, 54].map((x) => (
        <circle key={x} cx={x} cy="28" r="3" {...dot} />
      ))}
      {widths.map((w, i) => (
        <rect
          key={i}
          x={i % 2 ? 44 : 30}
          y={46 + i * 19}
          width={w}
          height="7"
          rx="3.5"
          {...dot}
          className="a-type"
          style={v("4s", `${i * 0.45}s`)}
        />
      ))}
      <rect
        x="150"
        y="122"
        width="5"
        height="14"
        {...dot}
        className="a-blink"
        style={v("1s")}
      />
      <text
        x="130"
        y="38"
        fontSize="15"
        fontWeight="700"
        {...dot}
        className="art-float"
      >
        {"</>"}
      </text>
    </S>
  );
}

export function OrbitArt() {
  return (
    <S>
      <g className="a-spin" style={v("14s")}>
        {[0, 60, 120].map((r) => (
          <ellipse
            key={r}
            cx="100"
            cy="80"
            rx="64"
            ry="22"
            transform={`rotate(${r} 100 80)`}
          />
        ))}
        <circle cx="164" cy="80" r="5" {...dot} />
        <circle cx="68" cy="24.5" r="5" {...dot} />
        <circle cx="68" cy="135.5" r="5" {...dot} />
      </g>
      <circle cx="100" cy="80" r="9" {...dot} />
      <circle cx="100" cy="80" r="9" className="a-ping" />
    </S>
  );
}

export function MotionArt() {
  const rails: [number, string, string][] = [
    [40, "linear", "0s"],
    [80, "ease-in-out", "0.3s"],
    [120, "cubic-bezier(.68,-.6,.32,1.6)", "0.6s"],
  ];
  return (
    <S>
      {rails.map(([y, ease, dl]) => (
        <g key={y}>
          <line x1="24" x2="176" y1={y} y2={y} opacity=".25" />
          <circle
            cx="34"
            cy={y}
            r="9"
            {...dot}
            className="a-rail"
            style={v("2.6s", dl, { "--ease": ease, "--x": "132px" })}
          />
        </g>
      ))}
    </S>
  );
}

export function ServerArt() {
  return (
    <S>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="30" y={18 + i * 44} width="124" height="34" rx="6" />
          <circle
            cx="48"
            cy={35 + i * 44}
            r="3.5"
            {...dot}
            className="a-blink"
            style={v("1.4s", `${i * 0.4}s`)}
          />
          <circle
            cx="62"
            cy={35 + i * 44}
            r="3.5"
            {...dot}
            className="a-blink"
            style={v("2.1s", `${i * 0.7}s`)}
          />
          <line
            x1="86"
            x2="140"
            y1={35 + i * 44}
            y2={35 + i * 44}
            opacity=".4"
          />
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx="176"
          cy="140"
          r="4"
          {...dot}
          className="a-rise"
          style={v("2.4s", `${i * 0.8}s`)}
        />
      ))}
    </S>
  );
}

export function DbArt() {
  return (
    <S>
      <path d="M50 38v84a50 16 0 0 0 100 0V38" />
      <ellipse cx="100" cy="38" rx="50" ry="16" />
      <path d="M50 66a50 16 0 0 0 100 0M50 94a50 16 0 0 0 100 0" />
      <ellipse cx="100" cy="38" rx="50" ry="16" className="a-ring" />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx="136"
          cy={80 + i * 28}
          r="3"
          {...dot}
          className="a-blink"
          style={v("1.2s", `${i * 0.35}s`)}
        />
      ))}
      <circle
        cx="100"
        cy="150"
        r="4"
        {...dot}
        className="a-rise"
        style={v("2s")}
      />
    </S>
  );
}

export function GitArt() {
  const commits: [number, number, string][] = [
    [60, 26, "0s"],
    [60, 52, "0.4s"],
    [130, 86, "0.9s"],
    [130, 102, "1.3s"],
    [60, 126, "1.8s"],
    [60, 144, "2.2s"],
  ];
  return (
    <S>
      <path d="M60 20V148" opacity=".35" />
      <path
        d="M60 52C60 72 130 64 130 86V102C130 122 60 112 60 126"
        className="a-draw"
        style={v("3.6s")}
      />
      {commits.map(([x, y, dl]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r="6"
          {...dot}
          className="a-pop"
          style={v("3.6s", dl)}
        />
      ))}
    </S>
  );
}

export function CloudArt() {
  return (
    <S>
      <path
        d="M52 104a22 22 0 0 1 4-43a34 34 0 0 1 66-6a26 26 0 0 1 14 49z"
        className="art-float-slow"
      />
      {[78, 100, 122].map((x, i) => (
        <path
          key={x}
          d={`M${x} 142V114m-6 8l6-8l6 8`}
          className="a-rise"
          style={v("2.2s", `${i * 0.6}s`)}
        />
      ))}
    </S>
  );
}

/* ---------------- Services illustrations ---------------- */

export function UiArt() {
  return (
    <S vb="0 0 320 190">
      <rect x="8" y="8" width="304" height="174" rx="12" />
      {[22, 34, 46].map((x) => (
        <circle key={x} cx={x} cy="22" r="3" {...dot} />
      ))}
      {[20, 117, 214].map((x, i) => (
        <rect
          key={x}
          x={x}
          y="44"
          width="86"
          height="60"
          rx="8"
          {...(i === 1 ? dot : {})}
          className="a-pop"
          style={v("5s", `${i * 0.5}s`)}
        />
      ))}
      {[20, 117, 214].map((x, i) => (
        <rect
          key={x}
          x={x}
          y="116"
          width={60 - i * 10}
          height="7"
          rx="3.5"
          {...dot}
          className="a-type"
          style={v("5s", `${i * 0.5 + 0.4}s`)}
        />
      ))}
      <rect
        x="20"
        y="140"
        width="64"
        height="26"
        rx="13"
        className="a-blink"
        style={v("2.4s")}
      />
      <path className="a-cursor" d="M0 0l12 28 4-11 11-4z" {...dot} />
    </S>
  );
}

export function PipelineArt() {
  const nodes: [string, number][] = [
    ["Git", 36],
    ["Vercel", 112],
    ["Render", 188],
    ["AWS", 264],
  ];
  return (
    <S vb="0 0 300 120">
      <path
        d="M36 60H264"
        strokeDasharray="6 6"
        className="art-dash"
        opacity=".5"
      />
      {nodes.map(([label, x], i) => (
        <g key={label}>
          <circle cx={x} cy="60" r="23" {...dot} />
          <text
            x={x}
            y="63.5"
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="600"
            style={{ fill: "var(--ink-inv, #fff)" }}
            stroke="none"
          >
            {label}
          </text>
          <circle
            cx={x}
            cy="60"
            r="23"
            className="a-ring"
            style={v(undefined, `${i * 0.5}s`)}
          />
        </g>
      ))}
      <circle
        cx="36"
        cy="60"
        r="5"
        {...dot}
        className="a-rail"
        style={v("3.4s", "0s", { "--x": "228px", "--ease": "linear" })}
        stroke="none"
      />
    </S>
  );
}

/* ---------------- Small role icons (Experience) ---------------- */

export function TicketMini() {
  return (
    <S vb="0 0 100 100">
      <g className="art-float">
        <path d="M14 30h72v14a6 6 0 0 0 0 12v14H14V56a6 6 0 0 0 0-12z" />
        <path d="M62 30v40" strokeDasharray="4 5" />
        <path d="M28 46h22M28 56h14" opacity=".5" />
      </g>
    </S>
  );
}

export function ApiMini() {
  return (
    <S vb="0 0 100 100">
      <text
        x="50"
        y="60"
        fontSize="44"
        fontWeight="700"
        textAnchor="middle"
        {...dot}
      >
        {"{ }"}
      </text>
      {[34, 50, 66].map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy="78"
          r="3"
          {...dot}
          className="a-blink"
          style={v("1.2s", `${i * 0.25}s`)}
        />
      ))}
    </S>
  );
}

export function CheckMini() {
  return (
    <S vb="0 0 100 100">
      <circle cx="50" cy="50" r="30" />
      <circle cx="50" cy="50" r="30" className="a-ring" />
      <path
        d="M36 51l10 10 19-21"
        strokeWidth="5"
        className="a-draw"
        style={v("3s")}
      />
    </S>
  );
}

/* ---------------- Tiny inline icons ---------------- */

// Planet with a dot orbiting it (used on the About status pill)
export function OrbitMini() {
  return (
    <S vb="0 0 24 24">
      <circle cx="12" cy="12" r="3" {...dot} />
      <circle cx="12" cy="12" r="10" opacity=".3" />
      <g
        className="a-spin"
        style={{
          ...v("4s"),
          transformBox: "view-box",
          transformOrigin: "12px 12px",
        }}
      >
        <circle cx="22" cy="12" r="2" {...dot} />
      </g>
    </S>
  );
}

// Ticking clock (used next to the Lagos time in the footer)
export function ClockMini() {
  const pivot = {
    transformBox: "view-box",
    transformOrigin: "12px 12px",
  } as const;
  return (
    <S vb="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <g className="a-spin" style={{ ...v("6s"), ...pivot }}>
        <path d="M12 12V4.5" />
      </g>
      <g className="a-spin" style={{ ...v("72s"), ...pivot }}>
        <path d="M12 12h5" />
      </g>
      <circle cx="12" cy="12" r="1.3" {...dot} />
    </S>
  );
}
