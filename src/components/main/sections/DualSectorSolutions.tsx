"use client";

import { useState, type CSSProperties } from "react";

/* ---------- data ---------- */

type Group = { title: string; items: string[] };
type Module = { title: string; body: string };
type Sector = {
  id: string;
  label: string;
  sub: string;
  tag: string;
  acc: string;
  acc2: string;
  emblem: "code" | "health";
  groups: Group[];
  modules: Module[];
};

const SECTORS: Sector[] = [
  {
    id: "tech",
    label: "Technology & SDLC",
    sub: "Capabilities",
    tag: "SDLC",
    acc: "#0a84ff",
    acc2: "#38bdf8",
    emblem: "code",
    groups: [
      { title: "Frontend", items: ["React", "Vue", "Angular", "Next.js"] },
      { title: "Backend", items: ["PHP / Laravel", "Node", "Python", "Java", "Go", ".NET"] },
      { title: "Data & AI", items: ["Data Eng", "AI / ML", "MLOps", "RAG"] },
      { title: "Cloud / DevOps", items: ["AWS / Azure", "Kubernetes", "Cyber"] },
      { title: "US Engagement Models", items: ["W2 Contract", "Corp-to-Corp (C2C)", "1099 Independent", "Direct Hire"] },
      { title: "Visa Pipelines", items: ["OPT / STEM OPT (12–36 mo)", "H-1B (Transfer / Cap-Exempt)", "Green Card (PERM)", "USC", "Nearshore"] },
    ],
    modules: [
      {
        title: "Technical Onboarding & Secure SDLC Bootcamps",
        body: "14-day intensive repository orientation, code quality reviews, and architecture alignment curated by in-house engineers.",
      },
      {
        title: "Enterprise Readiness & Timezone Collaboration",
        body: "Daily standup etiquette, BEI alignment, and synchronous workflow training for global candidates.",
      },
    ],
  },
  {
    id: "health",
    label: "Healthcare & Clinical",
    sub: "Capabilities",
    tag: "CLINICAL",
    acc: "#0d9488",
    acc2: "#2dd4bf",
    emblem: "health",
    groups: [
      { title: "Clinical Staffing", items: ["Physicians", "Registered Nurses (RN / NP)", "Emergency (ED)", "Outpatient (OPD)"] },
      { title: "Non-Clinical & Admin", items: ["Healthcare Administrators", "EMR / EHR Ops Directors", "Medical Billing & Coding"] },
      { title: "Compliance Vault", items: ["HIPAA-Aware Remote Frameworks", "PCI DSS Security", "Clinical Credentialing Audits"] },
    ],
    modules: [
      {
        title: "HIPAA & PCI DSS Regulatory Compliance Upskilling",
        body: "Remote data security protocols, EMR/EHR safety frameworks, and compliance certifications for health-tech engineers and remote clinical specialists.",
      },
      {
        title: "Enterprise Readiness & BEI Alignment",
        body: "Communication protocols and clinical compliance onboarding.",
      },
    ],
  },
];

/* ---------- emblem graphic ---------- */

function Emblem({ kind }: { kind: "code" | "health" }) {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full">
      {/* rotating dashed rings */}
      <circle cx="60" cy="60" r="52" fill="none" stroke="var(--acc)" strokeWidth="1" strokeDasharray="3 5" opacity="0.5" className="ds-spin-slow" style={{ transformOrigin: "60px 60px" }} />
      <circle cx="60" cy="60" r="40" fill="none" stroke="var(--acc2)" strokeWidth="1.2" strokeDasharray="1 7" className="ds-spin-rev" style={{ transformOrigin: "60px 60px" }} />
      <circle cx="60" cy="60" r="30" fill="color-mix(in srgb, var(--acc) 10%, transparent)" />
      <circle cx="60" cy="60" r="30" fill="none" stroke="var(--acc)" strokeWidth="1" className="ds-pulse-ring" style={{ transformOrigin: "60px 60px" }} />
      {/* orbiting node */}
      <g className="ds-spin-slow" style={{ transformOrigin: "60px 60px" }}>
        <circle cx="60" cy="8" r="3" fill="var(--acc2)" />
      </g>
      {/* center glyph */}
      {kind === "code" ? (
        <g stroke="var(--acc)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M50 50l-9 10 9 10" />
          <path d="M70 50l9 10-9 10" />
          <path d="M64 46l-8 28" stroke="var(--acc2)" />
        </g>
      ) : (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M60 44c-6-8-20-5-20 6 0 9 13 16 20 22 7-6 20-13 20-22 0-11-14-14-20-6z" stroke="var(--acc)" strokeWidth="2.4" />
          <path d="M50 62h6l3-6 4 10 3-4h4" stroke="var(--acc2)" strokeWidth="2.2" />
        </g>
      )}
    </svg>
  );
}

/* ---------- capability group (cursor spotlight + lift) ---------- */

function GroupCard({ group, i }: { group: Group; i: number }) {
  const [pos, setPos] = useState({ x: "50%", y: "50%" });
  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: `${e.clientX - r.left}px`, y: `${e.clientY - r.top}px` });
      }}
      className="group/card relative overflow-hidden rounded-xl border border-[#dbe6f5] bg-white/70 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--acc)_45%,transparent)] hover:shadow-[0_18px_36px_-20px_color-mix(in_srgb,var(--acc)_60%,transparent)]"
      style={{ ["--mx" as string]: pos.x, ["--my" as string]: pos.y, animation: "ds-rise .5s ease both", animationDelay: `${i * 60}ms` }}
    >
      {/* cursor spotlight */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 [background:radial-gradient(180px_circle_at_var(--mx)_var(--my),color-mix(in_srgb,var(--acc)_16%,transparent),transparent_70%)]" />
      <div className="relative">
        <div className="mb-2.5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--acc)]" />
          <h4 className="font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-[#3d4c68]">{group.title}</h4>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {group.items.map((it) => (
            <span
              key={it}
              className="rounded-md border border-[color-mix(in_srgb,var(--acc)_22%,transparent)] bg-[color-mix(in_srgb,var(--acc)_7%,transparent)] px-2.5 py-1 text-[12px] font-medium text-[#0a1428] transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--acc)_16%,transparent)] hover:text-[var(--acc)]"
            >
              {it}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- training module (shine sweep) ---------- */

function ModuleCard({ mod, i }: { mod: Module; i: number }) {
  return (
    <div
      className="group/mod relative overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--acc)_25%,transparent)] bg-[color-mix(in_srgb,var(--acc)_6%,transparent)] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-22px_color-mix(in_srgb,var(--acc)_70%,transparent)]"
      style={{ animation: "ds-rise .5s ease both", animationDelay: `${180 + i * 90}ms` }}
    >
      {/* shine */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover/mod:translate-x-full" />
      <div className="relative flex items-start gap-3">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--acc)] font-mono text-[12px] font-bold text-white shadow-[0_6px_14px_-6px_var(--acc)]">
          {i + 1}
        </span>
        <div>
          <h4 className="font-display text-[14.5px] font-bold leading-snug text-[#0a1428] transition-colors duration-200 group-hover/mod:text-[var(--acc)]">
            {mod.title}
          </h4>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[#3d4c68]">{mod.body}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- section ---------- */

export default function DualSectorSolutions() {
  const [active, setActive] = useState(0);
  const sector = SECTORS[active];
  const style = { ["--acc" as string]: sector.acc, ["--acc2" as string]: sector.acc2 } as CSSProperties;

  return (
    <section id="solutions" className="relative w-full overflow-hidden bg-canvas px-5 py-20 sm:px-8 lg:px-12 lg:py-28" style={style}>
      <div className="pointer-events-none absolute left-1/2 top-0 h-[440px] w-[880px] -translate-x-1/2 rounded-full blur-3xl transition-colors duration-500 [background:radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--acc)_14%,transparent),transparent_62%)]" />

      <div className="relative mx-auto max-w-[1240px]">
        {/* header */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--acc)_30%,transparent)] bg-[color-mix(in_srgb,var(--acc)_9%,transparent)] px-4 py-1 font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--acc)] transition-colors duration-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--acc)]" />
            Dual-Sector Solutions
          </div>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-[#0a1428] sm:text-4xl lg:text-[38px]">
            One delivery engine, <span className="text-[var(--acc)] transition-colors duration-300">two regulated worlds</span>
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#3d4c68] sm:text-lg">
            Toggle between our technology and healthcare capability stacks — sourcing tracks, engagement models, and workforce-readiness modules recolor to the sector you deploy into.
          </p>
        </div>

        {/* toggle */}
        <div className="mt-9 flex justify-center">
          <div className="relative grid grid-cols-2 gap-1 rounded-full border border-[#cddcf3] bg-white/80 p-1 shadow-[0_10px_30px_-16px_rgba(10,20,40,0.4)] backdrop-blur-md">
            {/* sliding indicator */}
            <span
              className="absolute inset-y-1 w-[calc(50%-0.25rem)] rounded-full transition-all duration-[400ms] ease-[cubic-bezier(.4,0,.2,1)] [background:linear-gradient(120deg,var(--acc),var(--acc2))]"
              style={{ left: active === 0 ? "0.25rem" : "calc(50% + 0rem)" }}
            />
            {SECTORS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className={`relative z-10 flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-[13px] font-semibold transition-colors duration-300 sm:px-7 sm:text-sm ${
                  active === i ? "text-white" : "text-[#3d4c68] hover:text-[#0a1428]"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${active === i ? "bg-white" : "bg-[#9db4d6]"}`} />
                {s.label}
                <span className="hidden font-mono text-[10px] font-normal opacity-70 sm:inline">{s.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* panel — alternating layout: Tech has modules on left & stack on right; Healthcare has stack on left & modules on right */}
        <div
          key={sector.id}
          className={`mt-10 grid grid-cols-1 gap-6 ${active === 0 ? "lg:grid-cols-[1fr_1.35fr]" : "lg:grid-cols-[1.35fr_1fr]"}`}
          style={{ animation: "ds-fade .45s ease both" }}
        >
          {/* capability groups */}
          <div className={`rounded-2xl border border-[#bcd6fa]/60 bg-white/50 p-5 backdrop-blur-md sm:p-6 ${active === 0 ? "lg:order-2" : "lg:order-1"}`}>
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#6b7a95]">Capability stack</span>
              <span className="rounded-md bg-[var(--acc)] px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-white">{sector.tag}</span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {sector.groups.map((g, i) => (
                <GroupCard key={g.title} group={g} i={i} />
              ))}
            </div>
          </div>

          {/* emblem + training modules */}
          <div className={`flex flex-col gap-6 ${active === 0 ? "lg:order-1" : "lg:order-2"}`}>
            <div className="relative flex items-center gap-5 overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--acc)_25%,transparent)] bg-[linear-gradient(140deg,#0a1428,#111f38)] p-6">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-2xl [background:radial-gradient(circle,color-mix(in_srgb,var(--acc)_45%,transparent),transparent_70%)]" />
              <div className="relative h-24 w-24 shrink-0">
                <Emblem kind={sector.emblem} />
              </div>
              <div className="relative">
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--acc2)]">Workforce readiness</div>
                <div className="mt-1 font-display text-xl font-extrabold text-white">Training & upskilling modules</div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#aebfda]">
                  Curated by in-house {sector.emblem === "code" ? "engineers" : "clinical & compliance leads"} before any profile ships.
                </p>
              </div>
            </div>

            {sector.modules.map((m, i) => (
              <ModuleCard key={m.title} mod={m} i={i} />
            ))}
          </div>
        </div>
      </div>

      {/* scoped animations — no global css */}
      <style>{`
        @keyframes ds-rise { from { opacity:0; transform: translateY(12px); } to { opacity:1; transform:none; } }
        @keyframes ds-fade { from { opacity:0; transform: translateY(8px) scale(.995); } to { opacity:1; transform:none; } }
        .ds-spin-slow { animation: ds-spin 22s linear infinite; }
        .ds-spin-rev { animation: ds-spin 16s linear infinite reverse; }
        @keyframes ds-spin { to { transform: rotate(360deg); } }
        .ds-pulse-ring { animation: ds-pulse 3s ease-in-out infinite; }
        @keyframes ds-pulse { 0%,100% { opacity:.35; transform: scale(1);} 50% { opacity:.9; transform: scale(1.08);} }
      `}</style>
    </section>
  );
}
