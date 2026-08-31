"use client";

import GlobeScrollBridge from "@/components/main/GlobeScrollBridge";
import CursorGrid from "@/components/CursorGrid";


// Sub-headline rendered word-by-word so a wave of motion/tint travels across the text
function WaveText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <p className={className}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            marginRight: "0.28em",
            animation: `word-wave 4.5s ease-in-out ${(i * 0.11).toFixed(2)}s infinite`,
          }}
        >
          {word}
        </span>
      ))}
    </p>
  );
}

const PROOF_PILLS = [
  "20+ Years Combined Operational Excellence",
  "Industry Specialist Delivery Engine",
  "30+ Global Clients",
  "98% Client Retention",
  "40+ Hours Reclaimed Per Hire",
];

function StatFloat({
  top,
  left,
  right,
  value,
  label,
  delay,
}: {
  top: string;
  left?: string;
  right?: string;
  value: string;
  label: string;
  delay: string;
}) {
  return (
    <div
      className="hero-stat-card pointer-events-none absolute z-10 hidden rounded-xl border border-[#bcd6fa] bg-white/90 px-4 py-2.5 shadow-[0_8px_30px_-12px_rgba(10,132,255,0.5)] backdrop-blur-md lg:block"
      style={{
        top,
        left,
        right,
        animation: "float-node 7s ease-in-out infinite",
        animationDelay: delay,
      }}
    >
      <div className="font-display text-xl font-bold text-[#0a1428]">{value}</div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-[#3d4c68]">
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <div id="hero-section" className="relative z-10 min-h-full w-full bg-canvas">
      {/* Interactive Cursor Grid Background - soft ambient glow with zero static grid lines */}
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden opacity-100">
        <CursorGrid
          cellSize={64}
          color="#0a84ff"
          radius={160}
          falloff="smooth"
          holdTime={400}
          fadeDuration={700}
          lineWidth={1.2}
          maxOpacity={0.65}
          fillOpacity={0.06}
          gridOpacity={0.02}
          cellRadius={4}
          clickPulse
          pulseSpeed={550}
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col px-6 pt-2 pb-10 lg:px-10">

        {/* Hero body */}
        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          {/* Left: copy */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric shadow-[0_0_8px_2px_rgba(10,132,255,0.6)]" />
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#3d4c68]">
                Enterprise IT &amp; Healthcare Workforce Solutions
              </span>
            </div>

            {/* Headline */}
            <h1 className="mt-7 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-[#0a1428] sm:text-6xl lg:text-7xl">
              Millisecond response,
              <br />
              <span className="bg-gradient-to-r from-electric to-electric-bright bg-clip-text text-transparent">
                from a Human.
              </span>
            </h1>

            {/* Sub-headline with word-wave animation */}
            <WaveText
              className="mt-6 max-w-2xl text-base leading-relaxed text-[#3d4c68] sm:text-lg"
              text="Global IT solutions provider deploying pre-vetted software engineering pods and compliance-ready healthcare specialists. Powered by an in-house delivery engine of industry specialists — niche recruiters, business analysts, software engineers — delivering 7-day deployment sprints."
            />

            {/* CTAs */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#deploy"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#0a1428] px-7 py-3.5 font-display text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(10,20,40,0.6)] transition-all hover:-translate-y-0.5 hover:bg-electric hover:shadow-[0_14px_36px_-8px_rgba(10,132,255,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
              >
                Deploy Talent in 2 to 7 Days
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#tracks"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#9ec0f2] bg-white/60 px-7 py-3.5 font-display text-sm font-semibold text-[#0a1428] backdrop-blur-sm transition-all hover:border-electric hover:text-electric focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
              >
                Explore Tech &amp; Healthcare Tracks
              </a>
            </div>
          </div>

          {/* Right: globe visual anchor & scroll bridge */}
          <div id="hero-globe-anchor" className="relative h-[46vh] min-h-[300px] w-full lg:h-[58vh]">
            <GlobeScrollBridge />

            {/* Modern connector lines from stat cards into the Pepoltek core */}
            <svg
              id="hero-connector-lines"
              className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {[
                [18, 14],
                [84, 3],
                [18, 90],
              ].map(([x, y], i) => (
                <g key={i}>
                  <line
                    x1={x}
                    y1={y}
                    x2="50"
                    y2="50"
                    stroke="#0a84ff"
                    strokeOpacity="0.45"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    vectorEffect="non-scaling-stroke"
                    style={{ animation: "line-dash 2.5s linear infinite" }}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="1.1"
                    fill="#0a84ff"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              ))}
            </svg>

            <StatFloat top="6%" left="0%" value="7-Day" label="Deploy Sprint" delay="0s" />
            <StatFloat
              top="-5%"
              right="-10%"
              value="Compliance-Ready"
              label="Healthcare Specialists"
              delay="2s"
            />
            <StatFloat
              top="82%"
              left="0%"
              value="Vetted Pods"
              label="Eng · BA · Recruit"
              delay="1s"
            />
          </div>
        </div>

        {/* Proof ribbon — pill carousel */}
        <div className="relative -mx-6 overflow-hidden border-t border-[#bcd6fa]/70 pt-5 lg:-mx-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-canvas to-transparent lg:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-canvas to-transparent lg:w-24" />
          <div
            className="flex w-max gap-3 pr-3"
            style={{ animation: "drift-marquee 32s linear infinite" }}
          >
            {[...PROOF_PILLS, ...PROOF_PILLS].map((pill, i) => (
              <span
                key={i}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#bcd6fa] bg-white/80 px-5 py-2 font-mono text-xs font-medium tracking-tight text-[#0a1428] shadow-sm backdrop-blur-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_6px_1px_rgba(10,132,255,0.6)]" />
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
