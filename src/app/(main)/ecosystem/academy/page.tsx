"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/main/PageHero";
import {
  TrendingUp,
  DollarSign,
  Clock,
  Cpu,
  ShieldCheck,
  Users,
  Award,
  Lock,
  Check,
  ArrowRight,
} from "@/components/ui/Icons";

const COURSES = [
  {
    id: "course-01",
    title: "Distributed Systems & RAG Architecture",
    badge: "Tier 1 Architecture",
    category: "Engineering & AI",
    duration: "14-Day Sprint Module",
    level: "Advanced",
    icon: <Cpu size={22} />,
    desc: "Master microservice fault tolerance, vector indexing with pgvector, Kafka partition streaming, and production retrieval-augmented generation pipelines.",
    topics: [
      "Vector embeddings & semantic chunking strategies",
      "Event-driven CQRS architectures with Apache Kafka",
      "Sub-50ms caching topologies with Redis clusters",
      "Docker & Kubernetes deployment manifests",
    ],
    unlockedBadge: "RAG & Distributed Systems Specialist",
    rateUnlock: "+35% Higher Billable Hourly Tier",
  },
  {
    id: "course-02",
    title: "HIPAA & PCI DSS Compliance Vault",
    badge: "Clinical Compliance",
    category: "Healthcare & Security",
    duration: "7-Day Sprint Module",
    level: "Intermediate to Advanced",
    icon: <ShieldCheck size={22} />,
    desc: "Understand protected health information (PHI) tokenization, FHIR v4 interoperability standards, and cryptographic zero-knowledge security models.",
    topics: [
      "PHI boundary isolation & tokenization techniques",
      "FHIR v4.0.1 implementation & HL7 mapping",
      "PCI DSS 4.0 cardholder data environment rules",
      "BAA agreements and audit logging requirements",
    ],
    unlockedBadge: "HIPAA Security Certified Practitioner",
    rateUnlock: "Eligible for Hospital Network Contracts",
  },
  {
    id: "course-03",
    title: "US Enterprise Readiness & Standup Cadence",
    badge: "Executive Etiquette",
    category: "Communication & Agile",
    duration: "5-Day Sprint Module",
    level: "All Seniorities",
    icon: <Users size={22} />,
    desc: "Synchronous collaboration training covering daily agile standups, behavioral interview alignment (BEI), conflict resolution, and async sprint documentation.",
    topics: [
      "Daily standup etiquette and concise blocker communication",
      "Jira, Linear & Notion sprint artifact hygiene",
      "Behavioral event interviewing (BEI) preparation",
      "Overlapping workday time management techniques",
    ],
    unlockedBadge: "US Enterprise Ready Certified",
    rateUnlock: "Unlocks Direct Client Interview Shortlists",
  },
];

const BADGES = [
  { name: "US Enterprise Ready", status: "Active", icon: <Award size={20} />, desc: "Passed synchronous agile standup & communication audit." },
  { name: "Distributed Systems Specialist", status: "Active", icon: <Cpu size={20} />, desc: "Verified microservices and event streaming proficiency." },
  { name: "HIPAA Compliant Practitioner", status: "Locked", icon: <Lock size={20} />, desc: "Requires completion of the HIPAA & PHI Security Vault module." },
  { name: "High-Velocity Pod Lead", status: "Locked", icon: <Lock size={20} />, desc: "Requires 100+ sprint hours logged with a 98%+ client satisfaction score." },
];

export default function AcademyPage() {
  const [readinessScore, setReadinessScore] = useState(72);
  const [selectedCourse, setSelectedCourse] = useState(COURSES[0]);

  return (
    <div className="relative min-h-screen bg-canvas">
      {/* Hero Header */}
      <PageHero
        eyebrow="Talent Upskilling Ecosystem"
        title="Pepoltek Talent Academy"
        highlightedText="for Elite Sprints"
        description="Close skill gaps, elevate your profile readiness index, and earn hard-coded badges. Completion of targeted modules qualifies you for higher-paying gig tiers and direct enterprise client pods."
        stats={[
          {
            value: "Tier 1",
            label: "Elite Rate Unlocks",
            icon: <TrendingUp size={20} />,
          },
          {
            value: "+35%",
            label: "Average Rate Surge",
            icon: <DollarSign size={20} />,
          },
          {
            value: "14 Days",
            label: "Max Module Length",
            icon: <Clock size={20} />,
          },
        ]}
        actions={[
          {
            label: "Calculate Your Real Index",
            href: "/register",
            primary: true,
          },
          {
            label: "Inspect Badge Vault",
            href: "#badge-vault",
          },
        ]}
        proofPills={[
          "RAG & Distributed Architecture",
          "HIPAA & PHI Data Vault",
          "Synchronous Agile Standups",
          "Cryptographic Badges",
        ]}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        {/* Readiness Index Diagnostic Showcase (FR-043) */}
        <div className="rounded-3xl border border-[#bcd6fa] bg-white p-6 sm:p-10 shadow-[0_15px_40px_-15px_rgba(10,20,40,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="font-mono text-xs text-electric uppercase tracking-widest font-semibold">
                Interactive Diagnostic Simulator
              </div>
              <h2 className="font-display text-2xl font-bold text-ink">
                How the Candidate Readiness Index Works
              </h2>
              <p className="text-xs sm:text-sm text-ink-soft font-normal leading-relaxed">
                When you upload your CV, our engine audits your credentials, GitHub repository code quality,
                and compliance certifications. Taking Academy courses raises your score and unlocks higher tier matches.
              </p>

              {/* Score Slider */}
              <div className="pt-2">
                <div className="flex justify-between font-mono text-xs text-ink mb-2">
                  <span>Simulated Profile Readiness:</span>
                  <span className="font-bold text-electric text-sm">{readinessScore}% / 100%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={readinessScore}
                  onChange={(e) => setReadinessScore(Number(e.target.value))}
                  className="w-full accent-electric cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[10px] text-mist mt-1">
                  <span>Tier 3 (Baseline)</span>
                  <span>Tier 2 (Screened)</span>
                  <span className="font-bold text-signal">Tier 1 (Elite Squads)</span>
                </div>
              </div>
            </div>

            {/* Visual Meter */}
            <div className="lg:col-span-5 rounded-2xl border border-[#bcd6fa] bg-canvas/40 p-6 text-center">
              <div className="font-mono text-xs text-ink-soft uppercase tracking-wider">
                Current Eligibility Status
              </div>
              <div className="mt-3 font-display text-4xl sm:text-5xl font-extrabold text-ink">
                {readinessScore >= 85 ? (
                  <span className="text-signal">Tier 1 Elite</span>
                ) : readinessScore >= 65 ? (
                  <span className="text-electric">Tier 2 Ready</span>
                ) : (
                  <span className="text-amber-500">Tier 3 General</span>
                )}
              </div>
              <p className="mt-2 text-xs text-ink-soft font-normal leading-relaxed">
                {readinessScore >= 85
                  ? "Eligible for highest-paying global pods with direct client pitch."
                  : readinessScore >= 65
                  ? "Complete 1 compliance module to unlock Tier 1 rates."
                  : "Complete Enterprise Readiness bootcamp to unlock client panels."}
              </p>
              <Link
                href="/register"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 font-display text-xs font-bold text-white hover:bg-electric transition-colors"
              >
                <span>Calculate Your Real Index</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Courses (FR-044) */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                Targeted Upskilling Curriculum
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-ink-soft font-normal">
                Concise, high-impact modules engineered to pass client screens on day one.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {COURSES.map((course) => {
              const isSelected = selectedCourse.id === course.id;

              return (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className={`group flex flex-col justify-between rounded-3xl border p-6 sm:p-7 transition-all cursor-pointer ${
                    isSelected
                      ? "border-electric bg-white shadow-md ring-2 ring-electric/20"
                      : "border-[#bcd6fa] bg-white/80 hover:bg-white hover:border-electric/50 shadow-xs"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      {/* Prominent Lucide Icon */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-electric/10 text-electric border border-electric/25 shadow-2xs group-hover:scale-105 group-hover:bg-electric group-hover:text-white transition-all">
                        {course.icon}
                      </div>
                      <span className="rounded-md border border-electric/30 bg-electric/10 px-2.5 py-1 font-mono text-[10px] font-bold text-electric uppercase">
                        {course.badge}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-lg font-bold text-ink group-hover:text-electric transition-colors">
                      {course.title}
                    </h3>
                    <div className="font-mono text-xs text-ink-soft mt-0.5">
                      {course.category} • {course.duration}
                    </div>

                    {/* Clean readable Inter text */}
                    <p className="mt-3 text-xs sm:text-sm text-ink-soft font-normal leading-relaxed">
                      {course.desc}
                    </p>

                    <div className="mt-4 rounded-xl border border-signal/30 bg-signal/5 p-3">
                      <div className="font-mono text-[10px] font-bold text-signal uppercase tracking-wider">
                        Unlock Benefit (FR-046)
                      </div>
                      <div className="font-display text-xs font-bold text-ink mt-0.5">
                        {course.rateUnlock}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#bcd6fa]/40 flex items-center justify-between">
                    <span className="font-mono text-xs text-ink-soft">
                      Badge: <strong className="text-ink font-semibold">{course.unlockedBadge}</strong>
                    </span>
                    <span className="font-display text-xs font-bold text-electric flex items-center gap-1">
                      {isSelected ? "Inspecting" : "Select"} →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Course Syllabus Deep Dive */}
        <div className="mt-10 rounded-3xl border border-[#bcd6fa] bg-white p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#bcd6fa]/50 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric/10 text-electric border border-electric/25">
                {selectedCourse.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-canvas px-2.5 py-0.5 font-mono text-xs font-semibold text-ink-soft">
                    {selectedCourse.level}
                  </span>
                  <span className="font-mono text-xs text-electric font-semibold">{selectedCourse.duration}</span>
                </div>
                <h3 className="mt-1 font-display text-2xl font-bold text-ink">
                  {selectedCourse.title} Syllabus
                </h3>
              </div>
            </div>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 font-display text-xs font-bold text-white hover:bg-electric transition-colors"
            >
              <span>Enroll in Module</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-ink font-normal">
            {selectedCourse.topics.map((t, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-[#bcd6fa]/60 bg-canvas/30 px-4 py-3 leading-relaxed"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric text-white font-bold text-[10px]">
                  {i + 1}
                </span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Badge Vault (FR-045) */}
        <div id="badge-vault" className="mt-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
              The Verified Skill Badge Vault
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-ink-soft font-normal">
              Badges are cryptographically stamped onto your profile and visible to hiring managers during reverse matching.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BADGES.map((b) => (
              <div
                key={b.name}
                className={`rounded-2xl border p-5 transition-all ${
                  b.status === "Active"
                    ? "border-signal/40 bg-white shadow-xs"
                    : "border-[#bcd6fa]/60 bg-canvas/40 opacity-75"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                      b.status === "Active"
                        ? "bg-signal/15 text-signal border border-signal/30"
                        : "bg-canvas text-mist border border-[#bcd6fa]"
                    }`}
                  >
                    {b.icon}
                  </div>
                  <span
                    className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                      b.status === "Active"
                        ? "bg-signal/15 text-signal"
                        : "bg-canvas text-mist"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
                <div className="font-display text-sm font-bold text-ink mt-3">{b.name}</div>
                <p className="text-xs text-ink-soft mt-1 font-normal leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
