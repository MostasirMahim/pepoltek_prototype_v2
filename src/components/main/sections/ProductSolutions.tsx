"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProjectOverviewModal } from "./ProjectOverviewModal";
import { ProjectModal } from "./ProjectModal";
import { CardTopRightShape } from "@/components/ui/CardCornerShapes";
import { AnimatedChevrons } from "@/components/ui/AnimatedChevrons";
import { projectsData } from "@/data/projectsData";
import { Project } from "@/types/portfolio";

interface CaseStudyCard {
  id: string;
  projectSlug: string;
  category: "enterprise" | "healthtech" | "saas";
  indexStr: string;
  badge: string;
  title: string;
  type: string;
  endpoint: string;
  status: string;
  image: string;
  description: string;
  techStack: string[];
  impact: string;
  metric: string;
  metricLabel: string;
}

const FILTER_TABS = [
  { id: "all", label: "All Builds" },
  { id: "enterprise", label: "Enterprise Web Apps" },
  { id: "healthtech", label: "Health-Tech & EMR" },
  { id: "saas", label: "SaaS Platforms" },
] as const;

const CASE_STUDIES: CaseStudyCard[] = [
  {
    id: "hrms",
    projectSlug: "pepoltek-hrm",
    category: "saas",
    indexStr: "01",
    badge: "Enterprise HR-Tech",
    title: "AI-HRMS Candidate Screening & Matching Engine",
    type: "Enterprise SaaS & Internal Platform",
    endpoint: "portal.pepoltek.ai / audit",
    status: "Production Live",
    image: "/project_images/pepoltek-hrm.png",
    description:
      "A high-throughput talent intelligence portal translating natural language hiring queries into ranked, pre-vetted developer and clinical shortlists within seconds.",
    techStack: ["Node.js", "React.js", "Python / NLP", "Redis", "AWS Cloud"],
    impact: "Reclaimed 40+ engineering hours per hire while cutting sourcing latency by 90%.",
    metric: "40+ hrs",
    metricLabel: "Reclaimed / Hire",
  },
  {
    id: "healthtech",
    projectSlug: "erp-suite",
    category: "healthtech",
    indexStr: "02",
    badge: "Health-Tech Compliance",
    title: "Compliant Clinical EMR & FHIR Interoperability Hub",
    type: "Healthcare Distributed Infrastructure",
    endpoint: "fhir.pepoltek.health / v4",
    status: "HIPAA Validated",
    image: "/project_images/erp-suite.png",
    description:
      "Secure clinical data bridge synchronizing hospital EHR and EMR records across Epic, Cerner, and remote telehealth rotas with automated BAA and HIPAA clearance.",
    techStack: ["PHP / Laravel", "PostgreSQL", "FHIR v4 / HL7", "Docker", "HIPAA Vault"],
    impact: "Zero compliance failures with 100% data encryption and audit trail validation.",
    metric: "100%",
    metricLabel: "Audit Clearance",
  },
  {
    id: "aggregator",
    projectSlug: "bidyatek",
    category: "enterprise",
    indexStr: "03",
    badge: "Distributed Systems",
    title: "High-Throughput Global Telemetry Aggregator",
    type: "Real-Time Cloud Architecture",
    endpoint: "stream.pepoltek.net / kafka",
    status: "99.99% Uptime",
    image: "/project_images/Autonomous_AI_Software_Engineer1.png",
    description:
      "Low-latency streaming backbone processing millions of synchronous event logs across 4 global regions with zero message drops and strict backpressure safety.",
    techStack: ["Go (Golang)", "Apache Kafka", "Kubernetes", "Redis", "TypeScript"],
    impact: "99.99% system uptime sustained under peak loads with sub-10ms response latency.",
    metric: "99.99%",
    metricLabel: "System Uptime",
  },
  {
    id: "edtech-saas",
    projectSlug: "bidyatek",
    category: "saas",
    indexStr: "04",
    badge: "Cloud-Native EdTech",
    title: "BIDYATek Multi-Tenant Campus Management ERP",
    type: "Scalable Educational Infrastructure",
    endpoint: "app.bidyatek.com / core",
    status: "Cluster Deployed",
    image: "/project_images/bidyatek.png",
    description:
      "Comprehensive multi-tenant campus ERP automating student enrollment, real-time fee ledgers, automated attendance verification, and grade reporting.",
    techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    impact: "Automated 40+ weekly admin hours with zero ledger reconciliation discrepancies.",
    metric: "38%",
    metricLabel: "Efficiency Gain",
  },
];

export default function ProductSolutions() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [overviewProject, setOverviewProject] = useState<Project | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  const displayedStudies =
    activeFilter === "all"
      ? CASE_STUDIES.slice(0, 3)
      : CASE_STUDIES.filter((s) => s.category === activeFilter);

  return (
    <section
      id="case-studies-section"
      className="relative w-full bg-canvas px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      {/* Background Ambience */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(10,132,255,0.08),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(10,132,255,0.06)_1px,transparent_1.4px)] [background-size:24px_24px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-electric/25 bg-electric/[0.08] px-4 py-1 font-mono text-[10.5px] font-semibold tracking-[0.16em] uppercase text-electric shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric shadow-[0_0_6px_rgba(10,132,255,0.6)]" />
            Verified Technical Footprint · Pepoltek Limited
          </div>

          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[40px] leading-[1.12] line-clamp-2 text-balance">
            Systems Built, Deployed &amp; Scaled
          </h2>

          <p className="mt-3.5 text-base sm:text-lg leading-relaxed text-ink-soft max-w-2xl">
            We do not just recruit talent; our in-house engineering team designs, builds, and maintains enterprise-grade platforms. This deep technical foundation guarantees authentic vetting for your open roles.
          </p>

          {/* Interactive Category Filter Toggles */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {FILTER_TABS.map((tab) => {
              const active = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`rounded-xl border px-3.5 py-1.5 font-mono text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                    active
                      ? "border-electric bg-electric text-white shadow-sm shadow-electric/30"
                      : "border-[#bcd6fa]/70 bg-white/80 text-ink-soft hover:border-electric hover:text-electric"
                  }`}
                >
                  [ {tab.label} ]
                </button>
              );
            })}
          </div>
        </div>

        {/* Crafted Technical Case Study Cards */}
        <div className="mt-12 grid grid-cols-1 gap-7 lg:grid-cols-3">
          {displayedStudies.map((study, idx) => {
            const matchingProject =
              projectsData.find((p) => p.slug === study.projectSlug) ||
              projectsData[idx] ||
              projectsData[0];
            const isHovered = hoveredCardId === study.id;

            return (
              <div
                key={study.id}
                role="button"
                tabIndex={0}
                onMouseEnter={() => setHoveredCardId(study.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => setOverviewProject(matchingProject)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOverviewProject(matchingProject);
                  }
                }}
                className="cursor-target group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#bcd6fa]/80 bg-white/95 p-5 sm:p-6 shadow-[0_16px_44px_-20px_rgba(10,132,255,0.16)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-electric hover:shadow-[0_28px_60px_-15px_rgba(10,132,255,0.28)] cursor-pointer"
              >
                {/* Abstract Organic Corner Watermark */}
                <CardTopRightShape
                  variant={idx}
                  active={isHovered}
                  color="#0a84ff"
                  size={110}
                  className="pointer-events-none absolute right-0 top-0 opacity-40 transition-opacity duration-300 group-hover:opacity-75"
                />

                <div className="relative z-10 flex flex-1 flex-col justify-between">
                  <div>
                    {/* Visual Interface Preview Window */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#bcd6fa]/60 bg-[#0a1428] shadow-sm">
                      {/* Window Controls Header */}
                      <div className="flex items-center justify-between border-b border-white/10 bg-[#0a1428]/95 px-3 py-1.5 backdrop-blur-sm">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                          <span className="ml-1.5 font-mono text-[9px] text-white/40 truncate max-w-[140px]">
                            {study.endpoint}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 font-mono text-[8.5px] font-semibold uppercase tracking-wider text-signal">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
                          {study.status}
                        </span>
                      </div>

                      {/* Screenshot Container with Interactive Zoom */}
                      <div className="relative h-[calc(100%-26px)] w-full overflow-hidden bg-slate-950">
                        <img
                          src={study.image}
                          alt={study.title}
                          className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1428]/70 via-transparent to-transparent opacity-40 transition-opacity group-hover:opacity-20" />

                        {/* Hover Reticle Action Badge */}
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#0a1428]/35 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100">
                          <div className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/20 px-3 py-1 font-mono text-[11px] font-bold text-white shadow-lg backdrop-blur-md">
                            <span>Inspect System Brief</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="mt-4 sm:mt-5">
                      <h3 className="font-display text-lg font-bold text-ink leading-snug transition-colors group-hover:text-electric">
                        {study.title}
                      </h3>
                      <span className="mt-1 block font-body text-xs sm:text-[13px] font-medium text-ink-soft/80">
                        {study.type}
                      </span>
                      <p className="mt-2.5 text-[13px] leading-relaxed text-ink-soft line-clamp-3">
                        {study.description}
                      </p>
                    </div>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {study.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-[#bcd6fa]/60 bg-canvas px-2.5 py-0.5 font-mono text-[10.5px] font-medium text-ink transition-colors group-hover:border-electric/40 group-hover:bg-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Footer CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/case-studies"
            className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-ink px-7 py-3.5 font-display text-sm font-bold text-white shadow-[0_8px_22px_-4px_rgba(10,20,40,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-electric hover:shadow-[0_12px_28px_-6px_rgba(10,132,255,0.5)] active:translate-y-0 cursor-pointer"
          >
            <span>Browse All Case Studies</span>
            <AnimatedChevrons size={14} count={3} />
          </Link>
        </div>
      </div>

      {/* Phase 2: Morphing Detail / Overview Modal */}
      {overviewProject && (
        <ProjectOverviewModal
          project={overviewProject}
          index={projectsData.findIndex((p) => p.slug === overviewProject.slug)}
          onClose={() => setOverviewProject(null)}
          onOpenCaseStudy={(proj) => {
            setOverviewProject(null);
            setSelectedCaseStudy(proj);
          }}
        />
      )}

      {/* Phase 3: Full Deep-Dive Case Study Page Modal */}
      {selectedCaseStudy && (
        <ProjectModal
          project={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
        />
      )}
    </section>
  );
}
