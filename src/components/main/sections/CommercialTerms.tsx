"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* ---------- palette (matches Pepoltek tokens) ---------- */
const C = {
  skin: "#f4c9a0",
  skinShade: "#e3b184",
  suit: "#12213c",
  suitLight: "#1c3560",
  shirt: "#eaf2ff",
  tie: "#0a84ff",
  br: "#38bdf8",
  hair: "#233248",
};

/* ---------- specialist figure (used as dynamic watermark background on the right) ---------- */
function SpecialistFigure() {
  return (
    <svg viewBox="0 0 260 300" className="h-full w-full overflow-visible" fill="none" aria-hidden>
      <ellipse cx="120" cy="286" rx="104" ry="14" fill="rgba(3,12,30,0.45)" />
      {/* orbiting country pins bubble */}
      <g className="ct-bubble" style={{ animationDelay: "0.6s" }}>
        <rect x="22" y="40" width="96" height="46" rx="14" fill="#fff" />
        <path d="M92 84l8 16-24-10z" fill="#fff" />
        <circle cx="42" cy="63" r="6" fill={C.tie} />
        <circle cx="62" cy="63" r="6" fill={C.br} />
        <circle cx="82" cy="63" r="6" fill="#16a34a" />
        <text x="102" y="68" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fontSize="12" fill={C.suit}>15+</text>
      </g>
      {/* legs */}
      <path d="M112 210 L102 280" stroke={C.suit} strokeWidth="17" strokeLinecap="round" />
      <path d="M132 210 L146 280" stroke={C.suit} strokeWidth="17" strokeLinecap="round" />
      {/* shoes */}
      <path d="M96 280 q-10 4 -2 10 l16 0 0 -12z" fill={C.hair} />
      <path d="M152 280 q10 4 2 10 l-16 0 0 -12z" fill={C.hair} />
      {/* torso */}
      <path d="M96 214 Q98 150 122 150 Q146 150 148 214 Z" fill={C.suit} />
      <path d="M110 150 Q122 158 134 150 L130 196 Q122 200 114 196 Z" fill={C.shirt} />
      <path d="M122 154 L118 164 L122 194 L126 164 Z" fill={C.tie} />
      <path d="M96 214 Q122 224 148 214 L146 224 Q122 232 98 224 Z" fill={C.suitLight} opacity="0.6" />
      {/* back arm */}
      <path d="M140 168 Q162 176 160 200" stroke={C.suit} strokeWidth="14" strokeLinecap="round" fill="none" />
      {/* presenting arm + floating shield */}
      <g className="ct-present">
        <path d="M104 168 Q78 172 72 150" stroke={C.suit} strokeWidth="14" strokeLinecap="round" fill="none" />
        <circle cx="70" cy="144" r="10" fill={C.skin} />
        {/* shield */}
        <g style={{ transformBox: "fill-box", transformOrigin: "center" } as React.CSSProperties}>
          <path d="M70 96c-16-11-44-6-44 11 0 27 25 40 44 49 19-9 44-22 44-49 0-17-28-22-44-11z" fill="rgba(10,132,255,0.14)" stroke={C.tie} strokeWidth="4" />
          <path d="M52 148l12 12 24-30" stroke={C.br} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      </g>
      {/* head */}
      <g className="ct-nod" style={{ transformBox: "fill-box", transformOrigin: "bottom center", animationDelay: "0.4s" } as React.CSSProperties}>
        <path d="M106 140 Q122 146 138 140 L136 150 Q122 156 108 150 Z" fill={C.skinShade} />
        <circle cx="122" cy="116" r="24" fill={C.skin} />
        <path d="M98 116 A24 24 0 0 1 146 114 Q136 96 122 100 Q108 98 98 116 Z" fill={C.hair} />
        <circle cx="114" cy="116" r="2.6" fill={C.suit} />
        <circle cx="132" cy="116" r="2.6" fill={C.suit} />
        <path d="M114 128 Q122 133 130 128" stroke={C.suit} strokeWidth="2.4" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

/* ---------- engagement models ---------- */
const MODELS = [
  {
    tag: "01",
    name: "Direct Hire & Permanent Placement",
    fee: "15–20% of first-year annual compensation",
    highlight: "Market-entry rate: 12% for your first 3 hires",
    guarantee: "90-Day Placement Replacement Guarantee",
    metric: "12%",
    metricLabel: "entry rate",
  },
  {
    tag: "02",
    name: "IT & Healthcare Staff Augmentation",
    fee: "Transparent hourly / monthly billing per specialist",
    highlight: "10% rate reduction on 6-month squad commitments",
    guarantee: "2-Week Risk-Free Trial — $0 billed if benchmarks fail",
    metric: "2 wk",
    metricLabel: "risk-free trial",
  },
  {
    tag: "03",
    name: "Employer of Record (EOR) & Payroll",
    fee: "Complete payroll, tax withholding & compliance",
    highlight: "One partner across 15+ operating countries",
    guarantee: "Full compliance ownership — zero entity setup",
    metric: "15+",
    metricLabel: "countries",
  },
];

export default function CommercialTerms() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const m = MODELS[active];

  // Auto 3-second sliding rotation (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % MODELS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section id="pricing" className="relative w-full bg-canvas px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        {/* banner shell */}
        <div className="ct-banner relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_100px_-30px_rgba(10,20,40,0.6)] sm:rounded-[2.25rem]">
          {/* animated gradient base */}
          <div className="ct-grad absolute inset-0" />
          {/* dot grid */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1.4px)] [background-size:26px_26px]" />
          {/* glow blobs */}
          <div className="pointer-events-none absolute -left-24 top-1/2 h-[340px] w-[340px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.3),transparent_62%)] blur-2xl" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.35),transparent_60%)] blur-2xl" />
          {/* corner ticks */}
          <div className="pointer-events-none absolute left-5 top-5 h-5 w-5 rounded-tl-lg border-l-2 border-t-2 border-white/30" />
          <div className="pointer-events-none absolute right-5 top-5 h-5 w-5 rounded-tr-lg border-r-2 border-t-2 border-white/30" />
          <div className="pointer-events-none absolute bottom-5 left-5 h-5 w-5 rounded-bl-lg border-b-2 border-l-2 border-white/30" />
          <div className="pointer-events-none absolute bottom-5 right-5 h-5 w-5 rounded-br-lg border-b-2 border-r-2 border-white/30" />

          {/* 2-column flex / grid layout */}
          <div className="relative grid items-center gap-8 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[1.05fr_1.3fr] lg:gap-10 lg:px-12 lg:py-10">
            {/* left column: badge + title + desc + CTAs */}
            <div className="text-left">
              <div className="ct-in inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 font-mono text-[10px] font-500 uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric-bright" />
                Commercial engagement terms
              </div>
              <h2 className="ct-in mt-4 font-display text-2xl font-800 leading-[1.08] tracking-tight text-white sm:text-3xl lg:text-[36px]" style={{ animationDelay: "0.06s" }}>
                Terms engineered to <br />
                <span className="bg-gradient-to-r from-electric-bright to-white bg-clip-text text-transparent">de-risk every hire.</span>
              </h2>
              <p className="ct-in mt-3 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base" style={{ animationDelay: "0.12s" }}>
                Three flexible commercial models, one guarantee-backed promise — pick the engagement structure that fits your roadmap.
              </p>

              {/* CTAs directly on left side */}
              <div className="ct-in mt-7 flex flex-wrap gap-3" style={{ animationDelay: "0.18s" }}>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-display text-sm font-600 text-ink shadow-[0_12px_30px_-8px_rgba(255,255,255,0.5)] transition-all duration-200 hover:-translate-y-0.5"
                >
                  Request commercial proposal
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 py-3 font-display text-sm font-600 text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50"
                >
                  Talk to sales
                </Link>
              </div>
            </div>

            {/* right column: connected tab bar + attached detail card */}
            <div
              className="relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* background watermark SVG figure */}
              <div className="pointer-events-none absolute -right-4 -bottom-8 hidden h-[260px] w-[260px] opacity-15 ct-float sm:block">
                <SpecialistFigure />
              </div>

              {/* connected tabs: sits on top and seamlessly attaches into the card below */}
              <div className="relative z-20 -mb-[1px] flex items-end gap-2 pl-2">
                {MODELS.map((model, i) => {
                  const isActive = active === i;
                  return (
                    <button
                      key={model.tag}
                      onClick={() => setActive(i)}
                      className={`group relative transition-all duration-200 ${
                        isActive
                          ? "rounded-t-xl rounded-b-none border-t border-l border-r border-white/25 bg-white/[0.1] px-4 pb-2 pt-1.5 text-white shadow-[0_-6px_16px_-4px_rgba(56,189,248,0.35)] backdrop-blur-md"
                          : "mb-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/70 hover:border-white/35 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {/* Active glow indicator on top edge */}
                      {isActive && (
                        <span className="absolute inset-x-3 -top-[1.5px] h-[2px] rounded-full bg-gradient-to-r from-electric-bright via-white to-electric-bright shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
                      )}

                      <div className="flex items-center gap-1.5 font-display text-[11.5px] font-semibold">
                        <span
                          className={`font-mono text-[10px] ${
                            isActive ? "font-bold text-electric-bright" : "text-white/50"
                          }`}
                        >
                          {model.tag}
                        </span>
                        <span>{model.name.split(" (")[0].split(" & ")[0]}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* attached detail card: seamlessly connected to active tab */}
              <div
                key={active}
                className="ct-card relative z-10 overflow-hidden rounded-2xl border border-white/20 bg-white/[0.1] p-4 text-left shadow-[0_20px_50px_-20px_rgba(10,20,40,0.6)] backdrop-blur-md sm:p-5"
              >
                {/* shine sweep */}
                <div className="ct-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-electric-bright">
                      Engagement {m.tag}
                    </div>
                    <h3 className="mt-1 font-display text-lg font-700 leading-snug text-white sm:text-xl">
                      {m.name}
                    </h3>
                  </div>
                  <div className="shrink-0 rounded-xl border border-white/20 bg-electric/25 px-3 py-2 text-center shadow-[0_4px_16px_rgba(10,132,255,0.3)] backdrop-blur-sm">
                    <div className="font-display text-2xl font-800 leading-none text-white">{m.metric}</div>
                    <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-white/70">
                      {m.metricLabel}
                    </div>
                  </div>
                </div>

                <div className="relative mt-4 grid gap-2.5 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/50">Fee structure</div>
                    <div className="mt-1 text-[13px] font-500 leading-snug text-white/90">{m.fee}</div>
                  </div>
                  <div className="rounded-xl border border-electric-bright/30 bg-electric/15 p-3">
                    <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-electric-bright">
                      <span className="ct-badge h-1.5 w-1.5 rounded-full bg-signal" /> Risk-free guarantee
                    </div>
                    <div className="mt-1 text-[13px] font-500 leading-snug text-white">{m.guarantee}</div>
                  </div>
                </div>

                <div className="relative mt-3 flex items-center gap-2 text-[12px] text-white/75">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 shrink-0 text-electric-bright"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2l2.4 5 5.6.8-4 3.9 1 5.5L12 20l-5 2.6 1-5.5-4-3.9 5.6-.8z" />
                  </svg>
                  {m.highlight}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ct-grad {
          background: linear-gradient(120deg, #0a1428 0%, #0e2a5c 42%, #0a84ff 100%);
          background-size: 180% 180%;
          animation: ct-grad 14s ease infinite;
        }
        @keyframes ct-grad { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }

        .ct-float { animation: ct-float 5s ease-in-out infinite; }
        @keyframes ct-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

        .ct-bubble { animation: ct-bubble 3.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes ct-bubble { 0%,100% { transform: translateY(0) scale(1); opacity: 0.96; } 50% { transform: translateY(-6px) scale(1.04); opacity: 1; } }

        .ct-nod { animation: ct-nod 3.2s ease-in-out infinite; }
        @keyframes ct-nod { 0%,100% { transform: rotate(-2deg); } 50% { transform: rotate(3deg); } }

        .ct-present { animation: ct-present 3s ease-in-out infinite; transform-box: fill-box; transform-origin: 30% 60%; }
        @keyframes ct-present { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-8px) rotate(-3deg); } }

        .ct-badge { animation: ct-badge 1.6s ease-in-out infinite; }
        @keyframes ct-badge { 0%,100% { opacity: 0.4; box-shadow: 0 0 0 0 rgba(22,163,74,0.6); } 50% { opacity: 1; box-shadow: 0 0 0 4px rgba(22,163,74,0); } }

        .ct-in { animation: ct-in 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes ct-in { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

        .ct-card { position: relative; animation: ct-card 0.45s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes ct-card { from { opacity: 0; transform: translateY(10px) scale(0.985); } to { opacity: 1; transform: translateY(0) scale(1); } }

        .ct-shine { animation: ct-shine 2.8s ease-in-out infinite; }
        @keyframes ct-shine { 0% { left: -33%; } 55%,100% { left: 130%; } }

        @media (prefers-reduced-motion: reduce) {
          .ct-grad, .ct-float, .ct-bubble, .ct-nod, .ct-present, .ct-badge, .ct-shine { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
