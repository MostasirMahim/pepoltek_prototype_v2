"use client";

import { useState } from "react";

const COURSES = [
  {
    id: "ACAD-101",
    title: "Distributed Systems & RAG Architecture",
    category: "Software Tech",
    duration: "6 Modules (4.5 Hours)",
    progress: "100%",
    status: "Completed",
    badge: "RAG Pod Lead Badge",
    unlocks: "Tier 1 $100+/hr Pod Requisitions",
  },
  {
    id: "ACAD-102",
    title: "HIPAA & PCI DSS Compliance for Engineers & Clinicians",
    category: "Compliance & Security",
    duration: "4 Modules (3.0 Hours)",
    progress: "60%",
    status: "In Progress",
    badge: "HIPAA Certified Pod Specialist",
    unlocks: "NHS & HealthTech EHR Pod Matching",
  },
  {
    id: "ACAD-103",
    title: "US Enterprise Sprints & High-Velocity Standups",
    category: "Agile & Culture",
    duration: "3 Modules (2.0 Hours)",
    progress: "0%",
    status: "Available",
    badge: "US Enterprise Sprint Ready",
    unlocks: "Silicon Valley & NYC Direct Client Panels",
  },
];

const BADGES = [
  { name: "Verified Next.js 15 Architect", status: "Active", icon: "💎", level: "Tier 1" },
  { name: "RAG Pod Delivery Lead", status: "Active", icon: "⚡", level: "Tier 1" },
  { name: "HIPAA Healthcare Specialist", status: "In Progress (60%)", icon: "🛡", level: "Tier 2" },
  { name: "US Enterprise Sprint Ready", status: "Locked", icon: "🔒", level: "Tier 2" },
];

export default function CandidateAcademyPage() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header & Readiness Index */}
      <div className="rounded-2xl border border-[#bcd6fa] bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-3 py-0.5 text-[11px] font-mono font-semibold text-electric uppercase tracking-widest">
              <span>Talent Upskilling Ecosystem</span>
            </div>
            <h1 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              Pepoltek Talent Academy
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-ink-soft max-w-2xl">
              Upskill through enterprise-accredited modules to unlock higher compensation tiers, specialized clinical rotas, and high-velocity engineering pods.
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-electric/30 bg-canvas p-4">
            <div className="text-right">
              <div className="font-mono text-[10px] uppercase tracking-wider text-mist">Readiness Index</div>
              <div className="font-display text-2xl font-bold text-electric">92%</div>
            </div>
            <div className="h-10 w-px bg-[#bcd6fa]" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-mist">Tier Status</div>
              <div className="font-display text-xs font-bold text-signal">Pod Lead Ready</div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="rounded-2xl border border-[#bcd6fa] bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-ink">Earned & Locked Skill Badges</h2>
          <span className="font-mono text-xs text-electric font-semibold">2 Active • 2 In-Flight</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {BADGES.map((b, idx) => (
            <div
              key={idx}
              className={`rounded-xl border p-4 space-y-2 ${
                b.status === "Active"
                  ? "border-signal/30 bg-signal/5"
                  : b.status.includes("In Progress")
                  ? "border-electric/30 bg-electric/5"
                  : "border-[#bcd6fa]/50 bg-canvas/30 opacity-75"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">{b.icon}</span>
                <span className="font-mono text-[10px] font-bold text-mist">{b.level}</span>
              </div>
              <h3 className="font-display text-xs font-bold text-ink">{b.name}</h3>
              <div className="font-mono text-[11px] font-semibold text-ink-soft">{b.status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Academy Courses List */}
      <div className="space-y-4">
        <h2 className="font-display text-lg font-bold text-ink">Enterprise Training Modules</h2>

        <div className="space-y-3.5">
          {COURSES.map((course) => (
            <div
              key={course.id}
              className="rounded-2xl border border-[#bcd6fa] bg-white p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-electric transition-all"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-electric">{course.id}</span>
                  <span className="rounded-md bg-canvas border border-[#bcd6fa]/50 px-2 py-0.5 font-mono text-[10px] text-ink-soft">
                    {course.category}
                  </span>
                  <span className="font-mono text-xs text-mist">{course.duration}</span>
                </div>
                <h3 className="font-display text-base font-bold text-ink">{course.title}</h3>
                <div className="text-xs text-ink-soft">
                  Unlocks: <strong className="text-electric">{course.unlocks}</strong>
                </div>

                {/* Progress Bar */}
                <div className="pt-2 flex items-center gap-3">
                  <div className="h-1.5 w-48 rounded-full bg-canvas overflow-hidden border border-[#bcd6fa]/40">
                    <div
                      className="h-full rounded-full bg-electric"
                      style={{ width: course.progress }}
                    />
                  </div>
                  <span className="font-mono text-[11px] text-mist">{course.progress} Completed</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {course.status === "Completed" ? (
                  <button className="rounded-xl border border-[#bcd6fa] bg-canvas/40 px-4 py-2 font-display text-xs font-semibold text-ink hover:bg-canvas">
                    Review Badge Certificate
                  </button>
                ) : (
                  <button className="rounded-xl bg-ink px-4 py-2 font-display text-xs font-semibold text-white hover:bg-electric transition-colors shadow-xs">
                    {course.status === "In Progress" ? "Continue Module →" : "Enroll & Start →"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
