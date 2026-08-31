"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";

/* ---------- palette ---------- */
const C = {
  ink: "#0a1428",
  soft: "#3d4c68",
  el: "#0a84ff",
  br: "#38bdf8",
  vio: "#8b5cf6",
  vio2: "#a78bfa",
  teal: "#0d9488",
  teal2: "#2dd4bf",
  amber: "#e97e13",
  amber2: "#fbbf24",
  line: "#bcd6fa",
  skin: "#f4c9a0",
  hair: "#233248",
};

/* ---------- stage graphics ---------- */

function GfxUpload() {
  return (
    <svg viewBox="0 0 280 240" className="h-full w-full">
      {/* document */}
      <rect x="56" y="36" width="110" height="148" rx="12" fill="#fff" stroke={C.line} strokeWidth="2.4" className="te-draw" />
      {/* text lines */}
      {[68, 88, 108, 128].map((y, i) => (
        <line key={y} x1="76" y1={y} x2={i % 2 ? 132 : 148} y2={y} stroke={C.line} strokeWidth="5" strokeLinecap="round" className="te-draw" />
      ))}
      {/* profile photo placeholder */}
      <circle cx="111" cy="152" r="12" fill={`${C.el}15`} stroke={C.el} strokeWidth="2" className="te-draw" />
      <circle cx="111" cy="148" r="4.5" fill={C.skin} />
      <path d="M103 162c0-5 3-8 8-8s8 3 8 8" fill="none" stroke={C.el} strokeWidth="2" strokeLinecap="round" className="te-draw" />
      {/* AI parser beam */}
      <g className="te-float">
        <rect x="176" y="54" width="72" height="56" rx="10" fill={`${C.el}0c`} stroke={C.el} strokeWidth="2.4" className="te-draw" />
        <text x="212" y="74" textAnchor="middle" fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="600" fill={C.el}>AI PARSE</text>
        <path d="M192 90h40" stroke={C.br} strokeWidth="3" strokeLinecap="round" className="te-draw" />
        <path d="M192 98h28" stroke={C.br} strokeWidth="3" strokeLinecap="round" className="te-draw" />
      </g>
      {/* scan beam from AI to doc */}
      <path d="M176 82 L166 72" stroke={C.br} strokeWidth="2" strokeDasharray="3 4" className="te-flow-line" />
      <path d="M176 82 L166 92" stroke={C.br} strokeWidth="2" strokeDasharray="3 4" className="te-flow-line" />
      {/* checkmarks appearing */}
      <g className="te-float" style={{ animationDelay: "0.3s" }}>
        <circle cx="156" cy="68" r="8" fill={C.el} />
        <path d="M151 68l3 3 6-7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="te-float" style={{ animationDelay: "0.6s" }}>
        <circle cx="156" cy="88" r="8" fill={C.el} />
        <path d="M151 88l3 3 6-7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* upload arrow */}
      <g className="te-bounce">
        <path d="M111 204 L111 188" stroke={C.el} strokeWidth="4" strokeLinecap="round" className="te-draw" />
        <path d="M103 196 L111 186 L119 196" fill="none" stroke={C.el} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="te-draw" />
      </g>
    </svg>
  );
}

function GfxReverse() {
  return (
    <svg viewBox="0 0 280 240" className="h-full w-full">
      {/* central profile */}
      <circle cx="140" cy="120" r="28" fill={`${C.vio}12`} stroke={C.vio} strokeWidth="2.4" className="te-draw" />
      <circle cx="140" cy="112" r="9" fill={C.skin} />
      <path d="M128 136c0-8 5-13 12-13s12 5 12 13" fill="none" stroke={C.vio} strokeWidth="2.4" strokeLinecap="round" className="te-draw" />
      {/* scanning rings */}
      <circle cx="140" cy="120" r="28" fill="none" stroke={C.vio} strokeWidth="2" className="te-ping" style={{ transformOrigin: "140px 120px" }} />
      <circle cx="140" cy="120" r="28" fill="none" stroke={C.vio2} strokeWidth="1.5" className="te-ping" style={{ transformOrigin: "140px 120px", animationDelay: "0.5s" }} />
      <circle cx="140" cy="120" r="28" fill="none" stroke={C.vio} strokeWidth="1" className="te-ping" style={{ transformOrigin: "140px 120px", animationDelay: "1s" }} />
      {/* pipeline job cards floating around */}
      {[
        { x: 40, y: 50, label: "React Sr.", color: C.el },
        { x: 200, y: 40, label: "DevOps", color: C.teal },
        { x: 220, y: 160, label: "AI/ML", color: C.amber },
        { x: 30, y: 170, label: "Full Stack", color: C.vio },
      ].map((job, i) => (
        <g key={i} className="te-float" style={{ animationDelay: `${i * 0.4}s` }}>
          <rect x={job.x} y={job.y} width="60" height="30" rx="8" fill="#fff" stroke={job.color} strokeWidth="1.6" className="te-draw" />
          <text x={job.x + 30} y={job.y + 18} textAnchor="middle" fontSize="8" fontFamily="'JetBrains Mono', monospace" fontWeight="600" fill={job.color}>{job.label}</text>
          {/* connection line to profile */}
          <line x1={job.x + 30} y1={job.y + 15} x2="140" y2="120" stroke={job.color} strokeWidth="1" strokeDasharray="3 4" opacity="0.4" className="te-flow-line" />
        </g>
      ))}
      {/* lock icon on profile */}
      <g className="te-float" style={{ animationDelay: "0.2s" }}>
        <rect x="132" y="148" width="16" height="12" rx="2" fill={C.vio} />
        <path d="M136 148v-4a4 4 0 018 0v4" fill="none" stroke={C.vio} strokeWidth="2" />
        <circle cx="140" cy="154" r="1.5" fill="#fff" />
      </g>
    </svg>
  );
}

function GfxAcademy() {
  return (
    <svg viewBox="0 0 280 240" className="h-full w-full">
      {/* readiness gauge */}
      <g className="te-float">
        <path d="M80 160 A60 60 0 0 1 200 160" fill="none" stroke={C.line} strokeWidth="8" strokeLinecap="round" className="te-draw" />
        <path d="M80 160 A60 60 0 0 1 180 108" fill="none" stroke={C.teal} strokeWidth="8" strokeLinecap="round" className="te-draw" />
        <text x="140" y="148" textAnchor="middle" fontSize="22" fontFamily="'JetBrains Mono', monospace" fontWeight="800" fill={C.teal}>78%</text>
        <text x="140" y="165" textAnchor="middle" fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="500" fill={C.soft}>READINESS</text>
      </g>
      {/* skill blocks filling up */}
      {["React", "AWS", "System Design"].map((skill, i) => {
        const y = 48 + i * 30;
        const fill = [85, 60, 42][i];
        return (
          <g key={skill} className="te-reveal" style={{ animationDelay: `${i * 0.15}s` }}>
            <text x="48" y={y + 12} fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="500" fill={C.soft}>{skill}</text>
            <rect x="120" y={y} width="120" height="16" rx="4" fill={`${C.teal}15`} />
            <rect x="120" y={y} width={`${fill * 1.2}`} height="16" rx="4" fill={C.teal} className="te-draw" />
            <text x={120 + fill * 1.2 + 6} y={y + 12} fontSize="8" fontFamily="'JetBrains Mono', monospace" fontWeight="600" fill={C.teal}>{fill}%</text>
          </g>
        );
      })}
      {/* graduation cap */}
      <g className="te-float" style={{ animationDelay: "0.5s" }}>
        <polygon points="140,180 110,196 140,212 170,196" fill="none" stroke={C.teal} strokeWidth="2.4" className="te-draw" />
        <line x1="170" y1="196" x2="170" y2="218" stroke={C.teal} strokeWidth="2" className="te-draw" />
        <circle cx="170" cy="220" r="3" fill={C.teal2} />
      </g>
      {/* arrow up unlock */}
      <path d="M228 100 L228 70" stroke={C.teal2} strokeWidth="3" strokeLinecap="round" className="te-bounce" />
      <path d="M222 78 L228 68 L234 78" fill="none" stroke={C.teal2} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="te-bounce" />
      <text x="228" y="116" textAnchor="middle" fontSize="7" fontFamily="'JetBrains Mono', monospace" fontWeight="600" fill={C.teal2}>TIER UP</text>
    </svg>
  );
}

function GfxReferral() {
  return (
    <svg viewBox="0 0 280 240" className="h-full w-full">
      {/* payout ledger */}
      <rect x="60" y="34" width="160" height="120" rx="12" fill="#fff" stroke={C.amber} strokeWidth="2" className="te-draw" />
      <text x="86" y="56" fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="600" fill={C.amber}>PAYOUT LEDGER</text>
      <line x1="72" y1="64" x2="208" y2="64" stroke={C.line} strokeWidth="1.5" />
      {/* ledger rows */}
      {[
        { name: "Ali R.", status: "Placed", payout: "$2,400", color: "#16a34a" },
        { name: "Nora S.", status: "Interview", payout: "Pending", color: C.amber },
        { name: "Dev T.", status: "Submitted", payout: "—", color: C.soft },
      ].map((row, i) => {
        const y = 80 + i * 24;
        return (
          <g key={i} className="te-reveal" style={{ animationDelay: `${i * 0.15}s` }}>
            <text x="78" y={y} fontSize="9" fontFamily="Inter, sans-serif" fontWeight="500" fill={C.ink}>{row.name}</text>
            <text x="130" y={y} fontSize="8" fontFamily="'JetBrains Mono', monospace" fontWeight="500" fill={row.color}>{row.status}</text>
            <text x="198" y={y} textAnchor="end" fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fill={row.color}>{row.payout}</text>
          </g>
        );
      })}
      {/* connection diagram */}
      <g className="te-float">
        <circle cx="100" cy="196" r="14" fill={`${C.amber}15`} stroke={C.amber} strokeWidth="2" className="te-draw" />
        <text x="100" y="200" textAnchor="middle" fontSize="7" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fill={C.amber}>YOU</text>
      </g>
      {/* referral arrows */}
      {[
        { x: 160, y: 180 },
        { x: 180, y: 210 },
      ].map((target, i) => (
        <g key={i}>
          <line x1="114" y1="196" x2={target.x - 14} y2={target.y} stroke={C.amber} strokeWidth="1.5" strokeDasharray="4 3" className="te-flow-line" />
          <circle cx={target.x} cy={target.y} r="12" fill={`${C.amber}15`} stroke={C.amber2} strokeWidth="1.6" className="te-draw" />
          <circle cx={target.x} cy={target.y - 4} r="3.5" fill={C.skin} />
          <path d={`M${target.x - 5} ${target.y + 6}c0-3 2-5 5-5s5 2 5 5`} fill="none" stroke={C.amber2} strokeWidth="1.4" />
        </g>
      ))}
      {/* money symbol floating */}
      <g className="te-bounce" style={{ animationDelay: "0.4s" }}>
        <circle cx="220" cy="186" r="16" fill={C.amber} />
        <text x="220" y="192" textAnchor="middle" fontSize="16" fontFamily="'JetBrains Mono', monospace" fontWeight="800" fill="#fff">$</text>
      </g>
    </svg>
  );
}

/* ---------- data ---------- */

const STAGES = [
  {
    n: "01",
    tag: "INTAKE",
    route: "/career/upload_cv/",
    title: "Upload Your CV",
    headline: "Drop your résumé.",
    headlineAccent: "AI does the rest.",
    body: "Our parser extracts skills, experience, and certifications in seconds. Review, correct, and own your profile — never start from a blank form again.",
    accent: C.el,
    accent2: C.br,
    Gfx: GfxUpload,
    stats: [
      { val: "<30s", label: "Parse time" },
      { val: "96%", label: "Accuracy" },
    ],
  },
  {
    n: "02",
    tag: "DISCOVERY",
    route: "/talents/reverse-search/",
    title: "Reverse Job Search",
    headline: "Pipelines scan",
    headlineAccent: "for you.",
    body: "Your profile silently matches against live client openings. When there's a fit, you authorize the submission — nothing leaves without your consent.",
    accent: C.vio,
    accent2: C.vio2,
    Gfx: GfxReverse,
    stats: [
      { val: "24/7", label: "Live scan" },
      { val: "100%", label: "Your control" },
    ],
  },
  {
    n: "03",
    tag: "ACADEMY",
    route: "/ecosystem/academy/",
    title: "Talent Academy",
    headline: "Close gaps.",
    headlineAccent: "Unlock tiers.",
    body: "Our readiness index pinpoints exactly where you need to grow. Complete targeted micro-courses and watch your match tier climb in real time.",
    accent: C.teal,
    accent2: C.teal2,
    Gfx: GfxAcademy,
    stats: [
      { val: "3x", label: "Faster placement" },
      { val: "Free", label: "For talent" },
    ],
  },
  {
    n: "04",
    tag: "REFERRALS",
    route: "/ecosystem/referrals/",
    title: "Refer & Earn",
    headline: "Refer talent.",
    headlineAccent: "See every dollar.",
    body: "Track each referral from submission to placement on a fully transparent payout ledger. No black boxes — you see the commission the moment it's earned.",
    accent: C.amber,
    accent2: C.amber2,
    Gfx: GfxReferral,
    stats: [
      { val: "$2.4K", label: "Avg. payout" },
      { val: "Live", label: "Ledger" },
    ],
  },
];

/* ---------- in-view hook ---------- */

function useInView<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, seen };
}

/* ---------- single stage row ---------- */

function StageRow({ stage, index }: { stage: typeof STAGES[number]; index: number }) {
  const { ref, seen } = useInView<HTMLDivElement>(0.25);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
        seen ? "te-visible" : "te-hidden"
      }`}
      style={{ "--ac": stage.accent, "--ac2": stage.accent2 } as CSSProperties}
    >
      {/* text side */}
      <div className={`relative z-10 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
        {/* step number + tag */}
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl font-mono text-sm font-bold text-white shadow-lg"
            style={{ background: `linear-gradient(135deg, ${stage.accent}, ${stage.accent2})` }}
          >
            {stage.n}
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] font-medium tracking-[0.16em] uppercase"
            style={{ background: `${stage.accent}12`, color: stage.accent, border: `1px solid ${stage.accent}30` }}
          >
            <span className="h-1.5 w-1.5 rounded-full te-blink" style={{ background: stage.accent }} />
            {stage.tag}
          </span>
        </div>

        {/* headline */}
        <h3 className="mt-5 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold leading-[1.1] tracking-tight text-[#0a1428]">
          {stage.headline}{" "}
          <span style={{ color: stage.accent }}>{stage.headlineAccent}</span>
        </h3>

        {/* body */}
        <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-[#3d4c68]">{stage.body}</p>

        {/* stats */}
        <div className="mt-5 flex gap-6">
          {stage.stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-xl font-extrabold" style={{ color: stage.accent }}>{s.val}</div>
              <div className="mt-0.5 font-mono text-[9.5px] tracking-[0.1em] uppercase text-[#6b7a95]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={stage.route}
          className="mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 font-display text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: stage.accent, boxShadow: `0 10px 25px -5px ${stage.accent}60` }}
        >
          {stage.title}
          <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      {/* graphic side */}
      <div className={`relative ${isEven ? "lg:order-2" : "lg:order-1"}`}>
        <div className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-[2rem] border bg-white/70 p-4 shadow-xl backdrop-blur-md sm:p-6"
          style={{ borderColor: `${stage.accent}30`, boxShadow: `0 30px 70px -30px ${stage.accent}35` }}
        >
          {/* dot grid */}
          <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-40" style={{ backgroundImage: `radial-gradient(${stage.accent}18 1px, transparent 1.4px)`, backgroundSize: "20px 20px" }} />
          {/* ambient glow */}
          <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-[300px] -translate-x-1/2 rounded-full blur-2xl" style={{ background: `radial-gradient(ellipse at center, ${stage.accent}22, transparent 65%)` }} />
          <stage.Gfx />
        </div>
      </div>
    </div>
  );
}

/* ---------- section ---------- */

export default function TalentEcosystem() {
  return (
    <section id="talent-ecosystem" className="relative w-full overflow-hidden bg-canvas px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      {/* ambient background */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.45] [background-image:linear-gradient(rgba(188,214,250,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(188,214,250,0.18)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative mx-auto max-w-[1240px]">
        {/* header */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/20 bg-[#8b5cf6]/[0.08] px-4 py-1 font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-[#8b5cf6]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8b5cf6] shadow-[0_0_6px_rgba(139,92,246,0.6)]" />
            Talent Ecosystem
          </div>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-[#0a1428] sm:text-4xl lg:text-[42px] lg:leading-[1.08]">
            For Candidates,{" "}
            <span className="bg-gradient-to-r from-[#0a84ff] via-[#8b5cf6] to-[#0d9488] bg-clip-text text-transparent">
              Not Just Clients
            </span>
          </h2>
          <p className="mt-3 max-w-[56ch] text-base leading-relaxed text-[#3d4c68] sm:text-lg">
            A full-cycle platform where your career isn't a transaction — it's a trajectory.
            Upload, get discovered, upskill, and earn.
          </p>
        </div>

        {/* vertical journey rail (decorative) */}
        <div className="pointer-events-none absolute left-1/2 top-[280px] hidden w-px -translate-x-1/2 lg:block" style={{ height: "calc(100% - 400px)" }}>
          <div className="h-full w-full bg-gradient-to-b from-[#0a84ff]/30 via-[#8b5cf6]/30 to-[#e97e13]/30" />
          <div className="absolute inset-0 te-flow-rail" style={{ background: "linear-gradient(to bottom, transparent, #8b5cf6, transparent)", backgroundSize: "1px 120px" }} />
        </div>

        {/* stages */}
        <div className="mt-16 flex flex-col gap-20 lg:gap-28">
          {STAGES.map((s, i) => (
            <StageRow key={s.tag} stage={s} index={i} />
          ))}
        </div>

        {/* bottom CTA */}
        <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/career/upload_cv/"
            className="group inline-flex items-center gap-2 rounded-xl bg-[#8b5cf6] px-7 py-3.5 font-display text-sm font-semibold text-white shadow-[0_10px_25px_-5px_rgba(139,92,246,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#7c3aed] hover:shadow-[0_14px_30px_-5px_rgba(124,58,237,0.5)]"
          >
            Start Your Journey
            <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <Link
            href="/talents/reverse-search/"
            className="inline-flex items-center gap-2 rounded-xl border border-[#bcd6fa] bg-white/80 px-6 py-3.5 font-display text-sm font-semibold text-[#0a1428] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#8b5cf6]/50 hover:bg-white hover:text-[#8b5cf6]"
          >
            Browse Opportunities
          </Link>
        </div>
      </div>

      {/* scoped animations */}
      <style>{`
        /* reveal on scroll */
        .te-hidden { opacity: 0; transform: translateY(40px); }
        .te-visible { opacity: 1; transform: translateY(0); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }

        /* SVG draw */
        .te-draw {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
        }
        .te-visible .te-draw {
          animation: te-stroke 1.2s ease forwards 0.3s;
        }
        @keyframes te-stroke {
          to { stroke-dashoffset: 0; }
        }

        /* floating */
        .te-float {
          animation: te-float-anim 2.8s ease-in-out infinite;
        }
        @keyframes te-float-anim {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        /* bounce */
        .te-bounce {
          animation: te-bounce-anim 1.4s ease-in-out infinite;
        }
        @keyframes te-bounce-anim {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        /* blink */
        .te-blink {
          animation: te-blink-anim 1.8s ease-in-out infinite;
        }
        @keyframes te-blink-anim {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        /* ping rings */
        .te-ping {
          animation: te-ping-ring 2s ease-out infinite;
        }
        @keyframes te-ping-ring {
          0% { r: 28; opacity: 0.8; }
          100% { r: 70; opacity: 0; }
        }

        /* flow dashes */
        .te-flow-line {
          animation: te-flow-dash 2s linear infinite;
        }
        @keyframes te-flow-dash {
          to { stroke-dashoffset: -28; }
        }

        /* vertical rail pulse */
        .te-flow-rail {
          animation: te-rail-flow 2.5s linear infinite;
        }
        @keyframes te-rail-flow {
          from { background-position: 0 0; }
          to { background-position: 0 120px; }
        }

        /* reveal children staggered */
        .te-reveal {
          animation: pt-rise 0.5s ease both;
        }
      `}</style>
    </section>
  );
}
