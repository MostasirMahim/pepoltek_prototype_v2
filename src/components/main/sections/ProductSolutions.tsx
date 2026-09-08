"use client";

import React, { useState } from "react";
import Link from "next/link";

interface CaseStudyCard {
  id: string;
  badge: string;
  title: string;
  type: string;
  description: string;
  techStack: string[];
  impact: string;
  metric: string;
  metricLabel: string;
  link: string;
}

const CASE_STUDIES: CaseStudyCard[] = [
  {
    id: "hrms",
    badge: "Enterprise HR-Tech",
    title: "AI-HRMS Candidate Screening & Matching Engine",
    type: "Enterprise SaaS & Internal Platform",
    description:
      "A high-throughput talent intelligence portal translating natural language hiring queries into ranked, pre-vetted developer and clinical shortlists within seconds.",
    techStack: ["Node.js", "React.js", "Python / NLP", "Redis", "AWS Cloud"],
    impact: "Reclaimed 40+ engineering hours per hire while cutting sourcing latency by 90%.",
    metric: "40+ hrs",
    metricLabel: "Reclaimed / Hire",
    link: "/case-studies",
  },
  {
    id: "healthtech",
    badge: "Health-Tech Compliance",
    title: "Compliant Clinical EMR & FHIR Interoperability Hub",
    type: "Healthcare Distributed Infrastructure",
    description:
      "Secure clinical data bridge synchronizing hospital EHR and EMR records across Epic, Cerner, and remote telehealth rotas with automated BAA and HIPAA clearance.",
    techStack: ["PHP / Laravel", "PostgreSQL", "FHIR v4 / HL7", "Docker", "HIPAA Vault"],
    impact: "Zero compliance failures with 100% data encryption and audit trail validation.",
    metric: "100%",
    metricLabel: "Audit Clearance",
    link: "/case-studies",
  },
  {
    id: "aggregator",
    badge: "Distributed Systems",
    title: "High-Throughput Global Telemetry Aggregator",
    type: "Real-Time Cloud Architecture",
    description:
      "Low-latency streaming backbone processing millions of synchronous event logs across 4 global regions with zero message drops and strict backpressure safety.",
    techStack: ["Go (Golang)", "Apache Kafka", "Kubernetes", "Redis", "TypeScript"],
    impact: "99.99% system uptime sustained under peak loads with sub-10ms response latency.",
    metric: "99.99%",
    metricLabel: "System Uptime",
    link: "/case-studies",
  },
];

export default function ProductSolutions() {
  const [filter, setFilter] = useState("all");

  return (
    <section
      id="case-studies-section"
      className="relative w-full bg-canvas px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      {/* Background Ambience */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(10,132,255,0.08),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-electric/25 bg-electric/[0.08] px-4 py-1 font-mono text-[10.5px] font-semibold tracking-[0.16em] uppercase text-electric shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric shadow-[0_0_6px_rgba(10,132,255,0.6)]" />
            Verified Technical Footprint · Pepoltek Limited
          </div>

          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[40px] leading-[1.12]">
            Systems Built, Deployed &amp; Scaled
          </h2>

          <p className="mt-3.5 text-base sm:text-lg leading-relaxed text-ink-soft max-w-2xl">
            We don&apos;t just recruit talent; our in-house engineering team designs, builds, and maintains enterprise-grade platforms. This deep technical foundation guarantees authentic vetting for your open roles.
          </p>
        </div>

        {/* 3-Card Streamlined Horizontal Showcase Grid */}
        <div className="mt-14 grid grid-cols-1 gap-7 lg:grid-cols-3">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-[#bcd6fa]/80 bg-white/90 p-7 shadow-[0_20px_50px_-20px_rgba(10,132,255,0.16)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-electric hover:shadow-[0_28px_60px_-15px_rgba(10,132,255,0.28)]"
            >
              <div>
                {/* Top Badge & Metric Callout */}
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-md border border-electric/30 bg-electric/10 px-3 py-1 font-mono text-[10.5px] font-bold text-electric uppercase tracking-wider">
                    {study.badge}
                  </span>

                  <div className="rounded-xl border border-[#bcd6fa]/60 bg-canvas px-3 py-1.5 text-center">
                    <span className="font-display text-lg font-extrabold text-ink leading-none">
                      {study.metric}
                    </span>
                    <span className="block font-mono text-[8.5px] uppercase tracking-wider text-mist mt-0.5">
                      {study.metricLabel}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="mt-4 font-display text-xl font-bold text-ink group-hover:text-electric transition-colors leading-snug">
                  {study.title}
                </h3>
                <span className="mt-1 block font-mono text-xs text-mist">
                  {study.type}
                </span>

                <p className="mt-3.5 text-sm leading-relaxed text-ink-soft">
                  {study.description}
                </p>

                {/* Tech Stack Chips */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {study.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-[#bcd6fa]/60 bg-white px-2.5 py-1 font-mono text-[11px] font-medium text-ink transition-colors group-hover:border-electric/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact & Case Study Link */}
              <div className="mt-7 border-t border-[#bcd6fa]/50 pt-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-signal">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{study.impact}</span>
                </div>

                <Link
                  href={study.link}
                  className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-bold text-electric hover:text-ink transition-colors"
                >
                  <span>View Case Study &amp; Architecture Brief</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Section Footer CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 font-display text-sm font-bold text-electric hover:text-ink transition-colors group"
          >
            <span>Browse Full Technical Portfolio &amp; Case Studies</span>
            <span className="transition-transform group-hover:translate-x-1.5">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
