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
      {/* Volumetric Radiant Light Aurora Layer (Right Globe Area) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Deep blue atmospheric aura behind globe on the right */}
        <div className="absolute right-[-5%] top-[10%] h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.18)_0%,rgba(56,189,248,0.08)_45%,transparent_70%)] blur-3xl" />
      </div>

      {/* Interactive Cyber Matrix Grid Background */}
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden opacity-100">
        <CursorGrid
          cellSize={56}
          color="#0a84ff"
          radius={180}
          falloff="smooth"
          holdTime={400}
          fadeDuration={700}
          lineWidth={1.25}
          maxOpacity={0.78}
          fillOpacity={0.07}
          gridOpacity={0.05}
          cellRadius={6}
          clickPulse
          pulseSpeed={600}
          ambient={true}
          ambientDensity={0.26}
          ambientMaxAlpha={0.4}
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 mx-auto flex max-w-7xl 2xl:max-w-[1360px] flex-col px-6 pt-0 pb-8 lg:px-10 xl:px-12">

        {/* Hero body */}
        <div className="grid flex-1 items-center gap-8 pt-2 pb-6 sm:pt-3 sm:pb-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 xl:gap-14 lg:pt-3 lg:pb-10">
          {/* Left: copy */}
          <div className="max-w-[640px] xl:max-w-[680px]">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric shadow-[0_0_8px_2px_rgba(10,132,255,0.6)]" />
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#3d4c68]">
                Enterprise IT &amp; Healthcare Workforce Solutions
              </span>
            </div>

            {/* Headline */}
            <h1 className="mt-4 sm:mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-[#0a1428] sm:text-[48px] lg:text-[54px] xl:text-[58px]">
              <span className="block">Millisecond Response,</span>
              <span className="relative inline-flex items-baseline whitespace-nowrap">
                <span className="bg-gradient-to-r from-electric to-electric-bright bg-clip-text text-transparent">
                  From a Human
                </span>
                {/* Hand-written Highlighting Pen Curve */}
                <svg
                  className="pointer-events-none absolute -bottom-2.5 left-0 w-full overflow-visible sm:-bottom-3"
                  viewBox="0 0 340 18"
                  fill="none"
                >
                  {/* Single hand-drawn highlighting curve with black-blue mixture */}
                  <path
                    d="M 3 13 C 50 3, 120 17, 190 6.5 C 245 -2, 290 14, 337 4.5"
                    stroke="url(#hero-pen-underline)"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="hero-pen-underline" x1="0" y1="0" x2="340" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#0a1428" />
                      <stop offset="55%" stopColor="#0a84ff" />
                      <stop offset="100%" stopColor="#38bdf8" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* 3 Animated Typing Dots locked directly with 'From a Human' */}
                <span className="inline-flex items-baseline gap-1 sm:gap-1.5 ml-2" aria-hidden="true">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-electric-bright hero-typing-dot-1 sm:h-2 sm:w-2" />
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-electric-bright hero-typing-dot-2 sm:h-2 sm:w-2" />
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-electric-bright hero-typing-dot-3 sm:h-2 sm:w-2" />
                </span>
              </span>
            </h1>

            {/* Sub-headline with word-wave animation */}
            <WaveText
              className="mt-6 max-w-2xl text-base leading-relaxed text-[#3d4c68] sm:text-lg"
              text="Global IT solutions provider deploying pre-vetted software engineering pods and compliance-ready healthcare specialists. Powered by an in-house delivery engine of industry specialists — niche recruiters, business analysts, software engineers — delivering 7-day deployment sprints."
            />

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <a
                href="#deploy"
                className="group inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-[#0a1428] px-6 py-3.5 font-display text-sm font-semibold text-white shadow-[0_8px_20px_-4px_rgba(10,20,40,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-electric hover:shadow-[0_12px_28px_-6px_rgba(10,132,255,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
              >
                Deploy Talent in 2 to 7 Days
              </a>
              <a
                href="#tracks"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-[#bcd6fa] bg-white/80 px-6 py-3.5 font-display text-sm font-semibold text-[#0a1428] shadow-[0_4px_14px_-2px_rgba(10,20,40,0.04)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-electric/50 hover:bg-white hover:text-electric focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
              >
                Explore Tech &amp; Healthcare Tracks
              </a>
            </div>
          </div>

          {/* Right: globe visual anchor & scroll bridge */}
          <div id="hero-globe-anchor" className="relative h-[380px] sm:h-[420px] lg:h-[460px] w-full">
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
                [80, 14],
                [18, 80],
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

            <StatFloat top="6%" left="2%" value="7-Day" label="Deploy Sprint" delay="0s" />
            <StatFloat
              top="6%"
              right="2%"
              value="Compliance-Ready"
              label="Healthcare Specialists"
              delay="2s"
            />
            <StatFloat
              top="74%"
              left="4%"
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

      {/* scoped typing animation */}
      <style>{`
        @keyframes heroTypingDot {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.35;
          }
          30% {
            transform: translateY(-8px);
            opacity: 1;
            box-shadow: 0 0 12px rgba(56, 189, 248, 0.85);
          }
        }
        .hero-typing-dot-1 {
          animation: heroTypingDot 1.4s ease-in-out infinite;
          animation-delay: 0s;
        }
        .hero-typing-dot-2 {
          animation: heroTypingDot 1.4s ease-in-out infinite;
          animation-delay: 0.2s;
        }
        .hero-typing-dot-3 {
          animation: heroTypingDot 1.4s ease-in-out infinite;
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}
