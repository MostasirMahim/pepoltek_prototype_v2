"use client";

import React from "react";
import Link from "next/link";

/* ---------- 5 Specialist Pillars ---------- */
const SPECIALIST_PILLARS = [
  {
    num: "01",
    title: "Niche Recruitment Specialists",
    badge: "Sourcing Engine",
    description:
      "Map global talent pipelines, manage active sourcing channels, and screen availability across 4 time zones.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Business Analysts & HR Strategists",
    badge: "Requirements & SLAs",
    description:
      "Translate complex enterprise demands into SDLC tech stack specs, compensation bands, and operational sprint milestones.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "In-House Software Engineers",
    badge: "Technical Audits",
    description:
      "Build internal AI interview systems while conducting hard-coded code, system design, and repository audits.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Medical & Clinical Specialists",
    badge: "Clinical Compliance",
    description:
      "Verify active state medical licenses, FHIR and HIPAA compliance, and clinical facility credentialing readiness.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Psychology & Behavioral Specialists",
    badge: "Behavioral Fits",
    description:
      "Execute Behavioral Event Interviewing (BEI) and psychological frameworks including HEXACO and OCEAN adaptability scales.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a8 8 0 0 0-8 8c0 3.36 2.07 6.23 5 7.42V20a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2.58c2.93-1.19 5-4.06 5-7.42a8 8 0 0 0-8-8z" />
      </svg>
    ),
  },
];

/* ---------- Side-by-Side Dual Tracks Data ---------- */
const TECH_SDLC_ITEMS = [
  {
    category: "AI Interview & Coding Evaluation",
    tags: ["Automated AI Technical Screening", "Interactive Coding Challenges", "Repository Audits", "System Design"],
  },
  {
    category: "Frontend & Application Architecture",
    tags: ["React.js", "Next.js 15", "Vue.js", "TypeScript", "Angular", "Tailwind CSS", "Web Performance"],
  },
  {
    category: "Backend & Distributed Systems",
    tags: ["Go (Golang)", "Node.js", "Python (FastAPI)", "Java / Spring Boot", "PHP / Laravel", ".NET", "Microservices", "Kafka"],
  },
  {
    category: "Cloud, DevOps & Cybersecurity",
    tags: ["AWS", "Kubernetes (K8s)", "Terraform (IaC)", "CI/CD Pipelines", "Zero-Trust Architecture", "SOC 2 Compliance"],
  },
  {
    category: "Engagement Models & Visa Pipelines",
    tags: ["W2 Contract", "Corp-to-Corp (C2C)", "1099 Independent", "OPT / STEM OPT", "H-1B Transfer", "Green Card (PERM)"],
  },
];

const HEALTHCARE_CLINICAL_ITEMS = [
  {
    category: "AI Clinical Screening & Verification",
    tags: ["AI Video Interview Triage", "Clinical Scenario Simulations", "Background Checks", "State License Checks"],
  },
  {
    category: "Clinical Staffing & Facility Rotas",
    tags: ["Registered Nurses (RN)", "Nurse Practitioners (NP)", "Physicians", "Emergency (ED)", "Outpatient (OPD)", "ICU Teams"],
  },
  {
    category: "Health-Tech & EMR / EHR Integration",
    tags: ["Epic Systems", "Cerner", "FHIR v4 / HL7", "Telehealth Platforms", "Clinical Interoperability", "PACS / DICOM"],
  },
  {
    category: "Regulatory & Patient Data Compliance",
    tags: ["HIPAA Title II", "PCI DSS Security", "BAA Clearance", "Clinical Credentialing Audits", "Data Encryption"],
  },
  {
    category: "Clinical Onboarding & Credentialing",
    tags: ["Automated License Verification", "Facility Credentialing Logs", "OIG & SAM Background Exclusions", "SOP Alignment"],
  },
];

export default function SpecialistDeliveryTracks() {
  return (
    <section
      id="specialist-tracks"
      className="relative w-full bg-canvas px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28"
    >
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(10,132,255,0.08),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-electric/25 bg-electric/[0.08] px-4 py-1 font-mono text-[10.5px] font-semibold tracking-[0.16em] uppercase text-electric shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric shadow-[0_0_6px_rgba(10,132,255,0.6)]" />
            Specialist RPO Execution Team
          </div>

          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[40px] leading-[1.12]">
            Enterprise RPO Powered by AI Interviewing and Domain Specialists
          </h2>

          <p className="mt-3.5 text-base sm:text-lg leading-relaxed text-ink-soft max-w-2xl">
            Move beyond generalist recruiters. Pepoltek deploys in-house software engineers, medical professionals, business analysts, and psychology specialists to hand-vet every candidate.
          </p>
        </div>

        {/* 5-Pillar Specialist Delivery Pod Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {SPECIALIST_PILLARS.map((pillar) => (
            <div
              key={pillar.num}
              className="group relative flex flex-col justify-between rounded-2xl border border-[#bcd6fa]/70 bg-white/80 p-5 shadow-[0_12px_28px_-10px_rgba(10,132,255,0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-electric hover:shadow-[0_20px_40px_-12px_rgba(10,132,255,0.25)]"
            >
              {/* Top Accent Ring & Number */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-electric/10 text-electric transition-colors duration-200 group-hover:bg-electric group-hover:text-white">
                    {pillar.icon}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-mist">
                    {pillar.num}
                  </span>
                </div>

                <div className="mt-4">
                  <span className="inline-block font-mono text-[9.5px] font-bold uppercase tracking-wider text-electric">
                    {pillar.badge}
                  </span>
                  <h3 className="mt-1 font-display text-[15px] font-bold leading-snug text-ink group-hover:text-electric transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-ink-soft">
                    {pillar.description}
                  </p>
                </div>
              </div>

              {/* Verified Status Dot */}
              <div className="mt-5 flex items-center gap-1.5 border-t border-[#bcd6fa]/40 pt-3">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                <span className="font-mono text-[9px] uppercase tracking-wider text-mist">
                  100% Specialist Audited
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Simultaneous Dual Specialization Tracks (Side-by-Side Grid, Zero Hidden Tabs) */}
        <div className="mt-16 sm:mt-20">
          <div className="mb-6 flex flex-col items-center text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-electric">
                Dual Specialization Tracks
              </span>
              <h3 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-ink">
                Simultaneous SDLC &amp; Clinical Coverage
              </h3>
            </div>
            <p className="mt-2 sm:mt-0 font-mono text-xs text-mist max-w-sm text-center sm:text-right">
              Both tracks evaluate simultaneously with equal enterprise rigor. Zero generalist screening.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* TRACK 1: TECHNOLOGY & SDLC RPO */}
            <div className="rounded-3xl border border-electric/30 bg-white/85 p-6 sm:p-8 shadow-[0_24px_50px_-20px_rgba(10,132,255,0.18)] backdrop-blur-md transition-all hover:border-electric/50">
              <div className="flex items-center justify-between border-b border-[#bcd6fa]/50 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-electric/10 text-electric">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-electric">
                      Track 01
                    </span>
                    <h4 className="font-display text-xl font-extrabold text-ink">
                      Technology &amp; SDLC RPO
                    </h4>
                  </div>
                </div>
                <span className="rounded-full border border-electric/30 bg-electric/10 px-3 py-1 font-mono text-[10px] font-bold text-electric">
                  Engineers &amp; BAs
                </span>
              </div>

              <div className="mt-6 space-y-5">
                {TECH_SDLC_ITEMS.map((item) => (
                  <div key={item.category}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-electric" />
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0a1428]">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-[#bcd6fa] bg-white px-2.5 py-1 font-sans text-xs font-medium text-ink-soft transition-colors hover:border-electric hover:text-electric"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TRACK 2: HEALTHCARE & CLINICAL RPO */}
            <div className="rounded-3xl border border-teal-500/30 bg-white/85 p-6 sm:p-8 shadow-[0_24px_50px_-20px_rgba(13,148,136,0.18)] backdrop-blur-md transition-all hover:border-teal-500/50">
              <div className="flex items-center justify-between border-b border-[#bcd6fa]/50 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-teal-600">
                      Track 02
                    </span>
                    <h4 className="font-display text-xl font-extrabold text-ink">
                      Healthcare &amp; Clinical RPO
                    </h4>
                  </div>
                </div>
                <span className="rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 font-mono text-[10px] font-bold text-teal-600">
                  Medical Specialists &amp; Ops
                </span>
              </div>

              <div className="mt-6 space-y-5">
                {HEALTHCARE_CLINICAL_ITEMS.map((item) => (
                  <div key={item.category}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0a1428]">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-[#bcd6fa] bg-white px-2.5 py-1 font-sans text-xs font-medium text-ink-soft transition-colors hover:border-teal-500 hover:text-teal-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scaled Leadership Metrics & Executive Trust Strip */}
        <div className="mt-12 rounded-2xl border border-[#bcd6fa]/80 bg-white/90 p-6 sm:p-8 shadow-[0_12px_30px_-10px_rgba(10,20,40,0.06)] backdrop-blur-md">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:divide-x md:divide-[#bcd6fa]/60">
            <div className="flex flex-col items-center text-center">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-electric">
                1,000+
              </span>
              <span className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
                Employees Scaled
              </span>
            </div>
            <div className="flex flex-col items-center text-center md:pl-6">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-electric">
                $10M+
              </span>
              <span className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
                Annual Revenue Driven
              </span>
            </div>
            <div className="flex flex-col items-center text-center md:pl-6">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-electric">
                98%
              </span>
              <span className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
                Founding Team Retention
              </span>
            </div>
            <div className="flex flex-col items-center text-center md:pl-6">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-electric">
                100%
              </span>
              <span className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
                Specialist Hand-Vetted
              </span>
            </div>
          </div>
        </div>

        {/* Section Action Strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#calculator-section"
            className="group inline-flex items-center gap-2 rounded-xl bg-electric px-7 py-3.5 font-display text-sm font-semibold text-white shadow-[0_10px_25px_-5px_rgba(10,132,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-electric-bright"
          >
            Configure Your RPO Squad
            <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-xl border border-[#bcd6fa] bg-white/80 px-6 py-3.5 font-display text-sm font-semibold text-[#0a1428] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-electric/50 hover:bg-white hover:text-electric"
          >
            Read Specialist Vetting Rubric
          </Link>
        </div>
      </div>
    </section>
  );
}
