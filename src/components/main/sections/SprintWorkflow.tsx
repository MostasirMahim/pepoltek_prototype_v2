"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

/* ---------- per-step graphics (each animated) ---------- */

const S = {
  ink: "#0a1428",
  soft: "#3d4c68",
  el: "#0a84ff",
  br: "#38bdf8",
  line: "#bcd6fa",
};

function GfxDiscovery() {
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      <rect x="46" y="30" width="120" height="150" rx="10" fill="#fff" stroke={S.line} strokeWidth="2" className="wf-draw" />
      {[62, 82, 102, 122].map((y, i) => (
        <line key={y} x1="64" y1={y} x2={i % 2 ? 132 : 148} y2={y} stroke={S.line} strokeWidth="4" strokeLinecap="round" className="wf-draw" />
      ))}
      <line x1="64" y1="142" x2="120" y2="142" stroke={S.br} strokeWidth="4" strokeLinecap="round" className="wf-draw" />
      {/* magnifier */}
      <g className="wf-float">
        <circle cx="168" cy="118" r="34" fill="rgba(10,132,255,0.08)" stroke={S.el} strokeWidth="4" className="wf-draw" />
        <line x1="192" y1="142" x2="214" y2="164" stroke={S.el} strokeWidth="6" strokeLinecap="round" className="wf-draw" />
        <path d="M154 118l10 10 18-20" fill="none" stroke={S.br} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="wf-draw" />
      </g>
    </svg>
  );
}

function GfxMapping() {
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      <circle cx="130" cy="112" r="72" fill="rgba(10,132,255,0.06)" stroke={S.line} strokeWidth="2" className="wf-draw" />
      <ellipse cx="130" cy="112" rx="72" ry="26" fill="none" stroke={S.line} strokeWidth="1.6" className="wf-draw" />
      <ellipse cx="130" cy="112" rx="30" ry="72" fill="none" stroke={S.line} strokeWidth="1.6" className="wf-draw" />
      {/* radar sweep */}
      <g style={{ transformOrigin: "130px 112px" }} className="wf-spin">
        <path d="M130 112 L130 40 A72 72 0 0 1 196 96 Z" fill="rgba(56,189,248,0.18)" />
      </g>
      {[[92, 78], [172, 92], [110, 150], [180, 148]].map(([x, y], i) => (
        <g key={i} className="wf-float" style={{ animationDelay: `${i * 0.3}s` }}>
          <circle cx={x} cy={y} r="6" fill={i === 1 ? S.br : S.el} />
          <circle cx={x} cy={y} r="6" fill="none" stroke={S.el} strokeWidth="2" className="wf-ping" style={{ transformOrigin: `${x}px ${y}px` }} />
        </g>
      ))}
    </svg>
  );
}

function GfxVetting() {
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      <rect x="34" y="42" width="150" height="120" rx="10" fill={S.ink} className="wf-draw" />
      <circle cx="48" cy="56" r="3" fill="#ff5f57" />
      <circle cx="60" cy="56" r="3" fill="#febc2e" />
      <circle cx="72" cy="56" r="3" fill="#28c840" />
      {[78, 96, 114, 132].map((y, i) => (
        <line key={y} x1="50" y1={y} x2={[120, 150, 100, 138][i]} y2={y} stroke={i === 3 ? S.br : "#2c4670"} strokeWidth="5" strokeLinecap="round" className="wf-draw" />
      ))}
      {/* shield check */}
      <g className="wf-float">
        <path d="M196 70c-14-10-40-6-40 10 0 24 22 36 40 44 18-8 40-20 40-44 0-16-26-20-40-10z" fill="rgba(10,132,255,0.1)" stroke={S.el} strokeWidth="4" className="wf-draw" />
        <path d="M180 122l10 10 20-24" fill="none" stroke={S.br} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="wf-draw" />
      </g>
    </svg>
  );
}

function GfxInterview() {
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      {/* two person cards */}
      {[[46, S.el], [150, S.br]].map(([x, c], i) => (
        <g key={i} className="wf-reveal">
          <rect x={x as number} y="52" width="64" height="90" rx="10" fill="#fff" stroke={S.line} strokeWidth="2" className="wf-draw" />
          <circle cx={(x as number) + 32} cy="82" r="14" fill="rgba(10,132,255,0.12)" stroke={c as string} strokeWidth="3" className="wf-draw" />
          <path d={`M${(x as number) + 12} 128c0-14 9-22 20-22s20 8 20 22`} fill="none" stroke={c as string} strokeWidth="3" className="wf-draw" />
        </g>
      ))}
      {/* handshake arrows */}
      <path d="M118 82c12-8 20-8 30 0" fill="none" stroke={S.el} strokeWidth="3" strokeDasharray="3 4" className="wf-draw" />
      <path d="M148 112c-12 8-20 8-30 0" fill="none" stroke={S.br} strokeWidth="3" strokeDasharray="3 4" className="wf-draw" />
      {/* calendar */}
      <g className="wf-float">
        <rect x="100" y="150" width="60" height="46" rx="6" fill="#fff" stroke={S.el} strokeWidth="3" className="wf-draw" />
        <line x1="100" y1="162" x2="160" y2="162" stroke={S.el} strokeWidth="3" className="wf-draw" />
        <circle cx="130" cy="180" r="6" fill={S.br} />
      </g>
    </svg>
  );
}

function GfxClose() {
  return (
    <svg viewBox="0 0 260 220" className="h-full w-full">
      {/* handshake */}
      <g className="wf-float">
        <path d="M60 96l30-16 24 12 22-10 34 18" fill="none" stroke={S.el} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="wf-draw" />
        <path d="M90 80l6 30M114 92l4 26M136 82l6 28" stroke={S.br} strokeWidth="5" strokeLinecap="round" className="wf-draw" />
      </g>
      {/* 30/60/90 timeline */}
      <line x1="46" y1="164" x2="214" y2="164" stroke={S.line} strokeWidth="3" className="wf-draw" />
      {["30", "60", "90"].map((d, i) => {
        const x = 70 + i * 60;
        return (
          <g key={d} className="wf-reveal">
            <circle cx={x} cy={164} r="12" fill="#fff" stroke={S.el} strokeWidth="3" />
            <circle cx={x} cy={164} r="4" fill={S.el} />
            <text x={x} y="196" textAnchor="middle" fontSize="13" fontFamily="'JetBrains Mono', monospace" fill={S.soft}>{d}</text>
          </g>
        );
      })}
    </svg>
  );
}

function GfxSuccess() {
  return (
    <svg viewBox="0 0 260 240" className="h-full w-full">
      {/* confetti */}
      {[[40, 40, S.br], [220, 60, S.el], [56, 180, S.el], [210, 190, S.br], [130, 24, S.el]].map(([x, y, c], i) => (
        <rect key={i} x={x as number} y={y as number} width="8" height="8" rx="2" fill={c as string} className="wf-float" style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${i * 0.25}s` }} />
      ))}
      {/* badge */}
      <g className="wf-float">
        <circle cx="130" cy="118" r="60" fill="rgba(10,132,255,0.08)" stroke={S.el} strokeWidth="4" className="wf-draw" />
        <circle cx="130" cy="118" r="46" fill="none" stroke={S.br} strokeWidth="2" strokeDasharray="4 6" className="wf-spin" style={{ transformOrigin: "130px 118px" }} />
        <path d="M104 118l16 16 34-40" fill="none" stroke={S.el} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" className="wf-draw" />
      </g>
      {/* ribbon */}
      <path d="M110 168l-10 40 30-18 30 18-10-40" fill="rgba(56,189,248,0.25)" stroke={S.el} strokeWidth="3" className="wf-draw" />
    </svg>
  );
}

/* ---------- data ---------- */

const STEPS = [
  { n: "01", title: "Technical & Compliance Discovery", body: "Stack analysis, clinical mapping, culture alignment, and success profiling.", Gfx: GfxDiscovery },
  { n: "02", title: "Market Mapping", body: "Instant candidate screening and passive sourcing via proprietary talent intelligence.", Gfx: GfxMapping },
  { n: "03", title: "Hard-Coded Vetting (In-House Specialists’ Review)", body: "Code validation, system design review, BEI/HEXACO/OCEAN behavioral assessment.", Gfx: GfxVetting },
  { n: "04", title: "Interview Orchestration", body: "Frictionless panel scheduling, structured briefings, and feedback loops.", Gfx: GfxInterview },
  { n: "05", title: "Close & Integration", body: "Offer negotiation, resignation coaching, and 30/60/90-day onboarding check-ins.", Gfx: GfxClose },
];

const PANEL_COUNT = STEPS.length + 2; // overview + 5 + success

/* candidate cartoon — runs while scrolling, sits to analyse when stopped */
function CandidateFigure({ pose }: { pose: "run" | "sit" }) {
  const skin = "#f4c9a0";
  const suit = "#12213c";
  const shirt = "#eaf2ff";
  const tie = "#0a84ff";
  const hair = "#233248";
  const legStyle = { transformBox: "fill-box", transformOrigin: "top center" } as const;
  return (
    <svg viewBox="0 0 44 62" className="h-full w-full overflow-visible" fill="none">
      {pose === "run" ? (
        <g className="wf-runner">
          {/* legs (swing) */}
          <path d="M22 38 L15 54" stroke={suit} strokeWidth="5" strokeLinecap="round" className="wf-leg-a" style={legStyle} />
          <path d="M22 38 L29 53" stroke={suit} strokeWidth="5" strokeLinecap="round" className="wf-leg-b" style={legStyle} />
          {/* torso */}
          <path d="M14 22 Q22 18 30 22 L28 40 Q22 43 16 40 Z" fill={suit} />
          <path d="M19 22 L22 25 L25 22 Z" fill={shirt} />
          <path d="M22 24 L20.4 28 L22 35 L23.6 28 Z" fill={tie} />
          {/* arms (swing) */}
          <path d="M15 25 L9 31" stroke={suit} strokeWidth="4" strokeLinecap="round" className="wf-arm-a" style={legStyle} />
          <path d="M29 25 L35 30" stroke={suit} strokeWidth="4" strokeLinecap="round" className="wf-arm-b" style={legStyle} />
          {/* head */}
          <circle cx="22" cy="13" r="6.5" fill={skin} />
          <path d="M15.5 13 A6.5 6.5 0 0 1 28.5 13 Q22 8 15.5 13 Z" fill={hair} />
          <circle cx="24.6" cy="13" r="1" fill={suit} />
        </g>
      ) : (
        <g className="wf-sitter">
          {/* laptop */}
          <rect x="9" y="47" width="26" height="3" rx="1.5" fill={tie} />
          <rect x="12" y="35" width="20" height="12.5" rx="1.5" fill="#cfe0f7" stroke={tie} strokeWidth="1.4" />
          <line x1="16" y1="39" x2="28" y2="39" stroke={tie} strokeWidth="1" strokeLinecap="round" />
          <line x1="16" y1="42" x2="24" y2="42" stroke={tie} strokeWidth="1" strokeLinecap="round" />
          {/* shins */}
          <path d="M18 44 L18 55" stroke={suit} strokeWidth="5" strokeLinecap="round" />
          <path d="M26 44 L26 55" stroke={suit} strokeWidth="5" strokeLinecap="round" />
          {/* thighs */}
          <path d="M22 39 L16 44 M22 39 L28 44" stroke={suit} strokeWidth="5" strokeLinecap="round" />
          {/* torso */}
          <path d="M15 22 Q22 18 29 22 L27 40 Q22 42 17 40 Z" fill={suit} />
          <path d="M19 22 L22 25 L25 22 Z" fill={shirt} />
          <path d="M22 24 L20.6 28 L22 34 L23.4 28 Z" fill={tie} />
          {/* arms to keyboard */}
          <path d="M16 26 L21 34" stroke={suit} strokeWidth="4" strokeLinecap="round" className="wf-type" style={legStyle} />
          <path d="M28 26 L23 34" stroke={suit} strokeWidth="4" strokeLinecap="round" className="wf-type wf-type-2" style={legStyle} />
          {/* head (nod) */}
          <g className="wf-nod" style={{ transformBox: "fill-box", transformOrigin: "bottom center" }}>
            <circle cx="22" cy="13" r="6.5" fill={skin} />
            <path d="M15.5 13 A6.5 6.5 0 0 1 28.5 13 Q22 8 15.5 13 Z" fill={hair} />
            <circle cx="22" cy="13" r="1" fill={suit} />
          </g>
        </g>
      )}
    </svg>
  );
}

/* overview hero visual — orchestration hub */
function OverviewVisual() {
  const nodes = [
    { a: -90, l: "01" },
    { a: -18, l: "02" },
    { a: 54, l: "03" },
    { a: 126, l: "04" },
    { a: 198, l: "05" },
  ];
  const R = 78;
  const cx = 150;
  const cy = 150;
  return (
    <svg viewBox="0 0 300 300" className="h-full w-full">
      <defs>
        <radialGradient id="ov-core" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0a84ff" />
        </radialGradient>
      </defs>
      {/* orbit ring */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#bcd6fa" strokeWidth="1.5" strokeDasharray="2 6" className="wf-spin" style={{ transformOrigin: `${cx}px ${cy}px` }} />
      <circle cx={cx} cy={cy} r={R + 22} fill="none" stroke="#bcd6fa" strokeWidth="1" opacity="0.5" />
      {/* spokes + step nodes */}
      {nodes.map((n) => {
        const rad = (n.a * Math.PI) / 180;
        const x = cx + R * Math.cos(rad);
        const y = cy + R * Math.sin(rad);
        return (
          <g key={n.l}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke="#9ec1f0" strokeWidth="1.2" strokeDasharray="3 3" />
            <circle cx={x} cy={y} r="18" fill="#fff" stroke="#0a84ff" strokeWidth="2" />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="13" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fill="#0a84ff">
              {n.l}
            </text>
            <circle cx={x} cy={y} r="18" fill="none" stroke="#38bdf8" strokeWidth="2" className="wf-ping" style={{ transformOrigin: `${x}px ${y}px` }} />
          </g>
        );
      })}
      {/* core with candidate */}
      <circle cx={cx} cy={cy} r="34" fill="url(#ov-core)" />
      <circle cx={cx} cy={cy} r="42" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 6" className="wf-spin" style={{ transformOrigin: `${cx}px ${cy}px` }} />
      <g transform={`translate(${cx - 22} ${cy - 30})`}>
        <circle cx="22" cy="13" r="6.5" fill="#f4c9a0" />
        <path d="M15.5 13 A6.5 6.5 0 0 1 28.5 13 Q22 8 15.5 13 Z" fill="#233248" />
        <path d="M12 40 Q22 30 32 40 L30 46 Q22 49 14 46 Z" fill="#fff" />
        <path d="M22 30 L20 34 L22 40 L24 34 Z" fill="#0a84ff" />
      </g>
    </svg>
  );
}

/* ---------- component ---------- */

export default function SprintWorkflow() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const movingRef = useRef(false);
  const lastScrollTimeRef = useRef<number>(Date.now());
  const isAutoScrollingRef = useRef<boolean>(false);
  const [active, setActive] = useState(0);
  const [moving, setMoving] = useState(false);

  useGSAP(
    () => {
      const track = trackRef.current!;
      const distance = () => track.scrollWidth - window.innerWidth;

      const setAvatar = gsap.quickSetter(avatarRef.current!, "x", "px");
      const railW = () => (railRef.current?.offsetWidth ?? 0);

      const setMove = (m: boolean) => {
        if (movingRef.current !== m) {
          movingRef.current = m;
          setMoving(m);
        }
      };

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          id: "sprint-st",
          trigger: pinRef.current!,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (PANEL_COUNT - 1),
            duration: { min: 0.2, max: 0.6 },
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            setAvatar(self.progress * railW());
            const curr = Math.min(PANEL_COUNT - 1, Math.round(self.progress * (PANEL_COUNT - 1)));
            setActive(curr);
            setMove(Math.abs(self.getVelocity()) > 12);
            if (!isAutoScrollingRef.current) {
              lastScrollTimeRef.current = Date.now();
            }
          },
          onSnapComplete: () => {
            setMove(false);
            isAutoScrollingRef.current = false;
          },
          onScrubComplete: () => {
            setMove(false);
            isAutoScrollingRef.current = false;
          },
        },
      });

      // per-panel reveals + svg draw, driven by the horizontal tween
      gsap.utils.toArray<HTMLElement>(".wf-panel").forEach((panel) => {
        const reveals = panel.querySelectorAll(".wf-reveal");
        if (reveals.length) {
          gsap.from(reveals, {
            y: 44,
            opacity: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 78%", toggleActions: "play none none reverse" },
          });
        }
        panel.querySelectorAll<SVGGeometryElement>(".wf-draw").forEach((el) => {
          let len = 0;
          try { len = el.getTotalLength(); } catch { len = 0; }
          if (!len) return;
          gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(el, {
            strokeDashoffset: 0,
            duration: 1,
            ease: "power1.inOut",
            scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 72%", toggleActions: "play none none reverse" },
          });
        });
      });

      // graphic parallax — depth as panels slide past
      gsap.utils.toArray<HTMLElement>(".wf-gfx").forEach((g) => {
        gsap.fromTo(
          g,
          { xPercent: 14 },
          {
            xPercent: -14,
            ease: "none",
            scrollTrigger: { trigger: g, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          }
        );
      });

      // idle float / spin (not scroll-bound)
      gsap.to(".wf-float", { y: -8, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.15 });
      gsap.to(".wf-spin", { rotation: 360, transformOrigin: "center", duration: 8, ease: "none", repeat: -1 });
      gsap.fromTo(".wf-ping", { scale: 1, opacity: 0.8 }, { scale: 2.6, opacity: 0, duration: 1.8, ease: "power1.out", repeat: -1, stagger: 0.2 });

      // Auto-slide step-by-step when visitor stops scrolling inside pinned section
      const autoInterval = setInterval(() => {
        const st = ScrollTrigger.getById("sprint-st");
        if (!st || !st.isActive) return;
        const now = Date.now();
        if (now - lastScrollTimeRef.current >= 3400) {
          const currentStep = Math.min(PANEL_COUNT - 1, Math.round(st.progress * (PANEL_COUNT - 1)));
          const nextStep = (currentStep + 1) % PANEL_COUNT;
          const targetScroll = st.start + (nextStep / (PANEL_COUNT - 1)) * (st.end - st.start);
          isAutoScrollingRef.current = true;
          lastScrollTimeRef.current = now;
          window.scrollTo({
            top: targetScroll,
            behavior: "smooth",
          });
        }
      }, 1000);

      const id = setTimeout(() => ScrollTrigger.refresh(), 300);
      return () => {
        clearTimeout(id);
        clearInterval(autoInterval);
      };
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="relative w-full bg-canvas">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        {/* ambient */}
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(10,132,255,0.1)_1px,transparent_1.4px)] [background-size:26px_26px]" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.14),transparent_62%)] blur-2xl" />

        {/* fixed section label */}
        <div className="pointer-events-none absolute left-5 top-6 z-20 sm:left-10 sm:top-9">
          <div className="inline-flex items-center gap-2 rounded-full border border-electric/20 bg-electric/[0.08] px-4 py-1 font-mono text-[10px] font-500 tracking-[0.14em] uppercase text-electric backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric" />
            5-Step Execution Workflow · 7-Day Sprint
          </div>
        </div>

        {/* horizontal track */}
        <div ref={trackRef} className="flex h-full will-change-transform">
          {/* overview panel */}
          <div className="wf-panel flex h-full w-screen shrink-0 items-center px-6 sm:px-16 lg:px-24">
            <div className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="max-w-xl">
                <div className="wf-reveal font-mono text-[11px] tracking-[0.2em] uppercase text-[#6b7a95]">Operational engine</div>
                <h2 className="wf-reveal mt-3 font-display text-4xl font-800 leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[56px]">
                  One candidate,<br />
                  <span className="text-electric">five orchestrated steps.</span>
                </h2>
                <p className="wf-reveal mt-5 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
                  Follow a single hire travel our 7-day sprint — from discovery to a fully onboarded specialist. Keep scrolling to move the journey forward.
                </p>
                <div className="wf-reveal mt-8 flex flex-wrap gap-2">
                  {STEPS.map((s) => (
                    <span key={s.n} className="rounded-full border border-[#cddcf3] bg-white/70 px-3 py-1.5 font-mono text-[11px] font-500 text-ink-soft backdrop-blur-sm">
                      <span className="text-electric">{s.n}</span> · {s.title.split(" (")[0]}
                    </span>
                  ))}
                </div>
                <div className="wf-reveal mt-8 flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-electric">
                  Scroll to begin
                  <span className="inline-block animate-[wfnudge_1.4s_ease-in-out_infinite]">→</span>
                </div>
              </div>
              {/* right-side visual */}
              <div className="wf-reveal relative mx-auto hidden aspect-square w-full max-w-[440px] rounded-[2rem] border border-[#bcd6fa]/60 bg-white/60 p-6 shadow-[0_40px_90px_-40px_rgba(10,132,255,0.5)] backdrop-blur-md lg:block">
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-50 [background-image:radial-gradient(rgba(10,132,255,0.1)_1px,transparent_1.4px)] [background-size:22px_22px]" />
                <OverviewVisual />
              </div>
            </div>
          </div>

          {/* step panels */}
          {STEPS.map((step, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={step.n} className="wf-panel relative flex h-full w-screen shrink-0 items-center px-6 sm:px-16 lg:px-24">
                <div className={`relative grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  {/* text */}
                  <div className="relative">
                    {/* watermark number — anchored to the text column so it always aligns */}
                    <span className="pointer-events-none absolute -left-2 top-1/2 -z-10 -translate-y-1/2 select-none font-display text-[30vw] font-800 leading-none text-electric/[0.06] lg:-left-6 lg:text-[13rem]">
                      {step.n}
                    </span>
                    <div className="wf-reveal flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric font-display text-lg font-800 text-white shadow-[0_10px_24px_-8px_rgba(10,132,255,0.7)]">
                        {step.n}
                      </span>
                      <span className="h-px w-14 bg-gradient-to-r from-electric to-transparent" />
                      <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#6b7a95]">Step {step.n} / 05</span>
                    </div>
                    <h3 className="wf-reveal mt-5 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-800 leading-tight tracking-tight text-ink">
                      {step.title}
                    </h3>
                    <p className="wf-reveal mt-4 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
                      {step.body}
                    </p>
                  </div>
                  {/* graphic */}
                  <div className="wf-reveal wf-gfx relative mx-auto aspect-[13/11] w-full max-w-[420px] rounded-3xl border border-[#bcd6fa]/60 bg-white/70 p-6 shadow-[0_30px_70px_-34px_rgba(10,132,255,0.4)] backdrop-blur-md">
                    <step.Gfx />
                  </div>
                </div>
              </div>
            );
          })}

          {/* success panel */}
          <div className="wf-panel relative flex h-full w-screen shrink-0 items-center px-6 sm:px-16 lg:px-24">
            <div className="relative grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2">
              {/* text */}
              <div className="relative">
                <div className="wf-reveal inline-flex items-center gap-2 rounded-full border border-electric/25 bg-electric/[0.08] px-4 py-1 font-mono text-[11px] font-600 tracking-[0.16em] uppercase text-electric">
                  <span className="h-1.5 w-1.5 rounded-full bg-electric" /> Onboarded
                </div>
                <h3 className="wf-reveal mt-5 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-800 leading-tight tracking-tight text-ink">
                  Deployed, retained, <br />
                  <span className="text-electric">productive.</span>
                </h3>
                <p className="wf-reveal mt-4 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
                  Seven days from brief to a fully integrated specialist — vetted in-house, compliance-ready, and supported through the 30/60/90-day ramp.
                </p>
                <div className="wf-reveal mt-7 flex flex-wrap gap-3">
                  <a href="#" className="group inline-flex items-center gap-2 rounded-xl bg-electric px-7 py-3.5 font-display text-sm font-600 text-white shadow-[0_10px_25px_-5px_rgba(10,132,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-electric-bright hover:shadow-[0_14px_30px_-5px_rgba(56,189,248,0.5)]">
                    Start a 7-day sprint
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </a>
                  <a href="#" className="inline-flex items-center gap-2 rounded-xl border border-[#bcd6fa] bg-white/80 px-6 py-3.5 font-display text-sm font-600 text-ink backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-electric/50 hover:text-electric">
                    See the vetting rubric
                  </a>
                </div>
              </div>

              {/* graphic */}
              <div className="wf-reveal wf-gfx relative mx-auto aspect-[13/11] w-full max-w-[420px] rounded-3xl border border-[#bcd6fa]/60 bg-white/70 p-6 shadow-[0_30px_70px_-34px_rgba(10,132,255,0.4)] backdrop-blur-md">
                <GfxSuccess />
              </div>
            </div>
          </div>
        </div>

        {/* progress HUD with traveling candidate */}
        <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-6 sm:px-10 sm:pb-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 flex items-center justify-between font-mono text-[10px] tracking-[0.14em] uppercase text-[#6b7a95]">
              <span className="inline-flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${moving ? "bg-electric-bright" : "bg-signal"}`} />
                Candidate journey · {moving ? "in transit" : "in analysis"}
              </span>
              <span className="text-electric">{Math.round((active / (PANEL_COUNT - 1)) * 100)}% complete</span>
            </div>
            <div ref={railRef} className="relative h-1.5 w-full rounded-full bg-[#d6e3f7]">
              {/* fill */}
              <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-electric to-electric-bright transition-[width] duration-150" style={{ width: `${(active / (PANEL_COUNT - 1)) * 100}%` }} />
              {/* milestone nodes + labels */}
              {Array.from({ length: PANEL_COUNT }).map((_, i) => {
                const label = i === 0 ? "Brief" : i === PANEL_COUNT - 1 ? "Live" : `Day ${i === 1 ? "1" : i === 2 ? "2" : i === 3 ? "4" : "6"}`;
                const done = i <= active;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      const st = ScrollTrigger.getById("sprint-st");
                      if (st) {
                        const targetScroll = st.start + (i / (PANEL_COUNT - 1)) * (st.end - st.start);
                        isAutoScrollingRef.current = true;
                        lastScrollTimeRef.current = Date.now();
                        window.scrollTo({ top: targetScroll, behavior: "smooth" });
                      }
                    }}
                    className="group absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
                    style={{ left: `${(i / (PANEL_COUNT - 1)) * 100}%` }}
                    aria-label={`Jump to ${label}`}
                  >
                    <span className={`block h-3 w-3 rounded-full border-2 transition-all duration-200 group-hover:scale-125 ${done ? "border-electric bg-electric" : "border-[#b9cdec] bg-white group-hover:border-electric"}`} />
                    <span className={`absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] tracking-[0.1em] uppercase transition-colors duration-200 ${i === active ? "text-electric font-semibold" : "text-[#9aabc6] group-hover:text-electric"}`}>
                      {label}
                    </span>
                  </button>
                );
              })}
              {/* stoppage pulse at the active node when analysing */}
              {!moving && (
                <span
                  className="wf-stop pointer-events-none absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-electric"
                  style={{ left: `${(active / (PANEL_COUNT - 1)) * 100}%` }}
                />
              )}
              {/* traveling candidate — runs in transit, sits to analyse */}
              <div ref={avatarRef} className="absolute bottom-1/2 left-0">
                <div className="-translate-x-1/2 translate-y-[3px]">
                  <div className={`h-[54px] w-[38px] origin-bottom drop-shadow-[0_6px_10px_rgba(10,132,255,0.35)] ${moving ? "wf-bob" : ""}`}>
                    <CandidateFigure pose={moving ? "run" : "sit"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wfnudge { 0%,100% { transform: translateX(0);} 50% { transform: translateX(5px);} }

        /* traveling runner bob */
        .wf-bob { animation: wf-bob 0.5s ease-in-out infinite; }
        @keyframes wf-bob { 0%,100% { transform: translateY(0) rotate(-1.5deg);} 50% { transform: translateY(-3px) rotate(1.5deg);} }

        /* runner limb swings */
        .wf-leg-a { animation: wf-swingA 0.42s ease-in-out infinite; }
        .wf-leg-b { animation: wf-swingB 0.42s ease-in-out infinite; }
        .wf-arm-a { animation: wf-swingB 0.42s ease-in-out infinite; }
        .wf-arm-b { animation: wf-swingA 0.42s ease-in-out infinite; }
        @keyframes wf-swingA { 0%,100% { transform: rotate(24deg);} 50% { transform: rotate(-24deg);} }
        @keyframes wf-swingB { 0%,100% { transform: rotate(-24deg);} 50% { transform: rotate(24deg);} }

        /* seated analyst — nod + typing */
        .wf-nod { animation: wf-nod 2.4s ease-in-out infinite; }
        @keyframes wf-nod { 0%,100% { transform: rotate(0deg);} 50% { transform: rotate(6deg);} }
        .wf-type { animation: wf-type 0.5s ease-in-out infinite; }
        .wf-type-2 { animation-delay: 0.25s; }
        @keyframes wf-type { 0%,100% { transform: rotate(0deg);} 50% { transform: rotate(-8deg);} }

        /* node stoppage pulse */
        .wf-stop { animation: wf-stop 1.4s ease-out infinite; }
        @keyframes wf-stop { 0% { transform: translate(-50%,-50%) scale(1); opacity: 0.9;} 100% { transform: translate(-50%,-50%) scale(3.4); opacity: 0;} }
      `}</style>
    </section>
  );
}
