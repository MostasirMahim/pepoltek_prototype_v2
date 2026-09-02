"use client";

import { useState } from "react";

export default function CandidateProfilePage() {
  const [activeTab, setActiveTab] = useState<"skills" | "compliance" | "preferences">("skills");

  const skills = [
    { name: "Next.js 15 / React", level: "Expert", score: "99%", badge: "Verified Pod Lead" },
    { name: "TypeScript & Node.js", level: "Expert", score: "98%", badge: "Verified Architect" },
    { name: "Kubernetes & Docker", level: "Advanced", score: "92%", badge: "Sprint Certified" },
    { name: "GraphQL & WebSockets", level: "Advanced", score: "91%", badge: "Verified" },
    { name: "PostgreSQL & Redis", level: "Expert", score: "96%", badge: "Performance Master" },
    { name: "FHIR / HL7 Interoperability", level: "Intermediate", score: "88%", badge: "Healthcare Ready" },
  ];

  const complianceItems = [
    { name: "Right to Work Verification (UK/Global)", status: "Active & Verified", date: "Valid until Dec 2027" },
    { name: "Enhanced Background & DBS Check", status: "Active & Verified", date: "Issued Aug 2026" },
    { name: "IP Assignment & NDA Agreement", status: "Digitally Signed", date: "Executed on Onboarding" },
    { name: "Data Protection & GDPR Certification", status: "Compliant", date: "Annual Refresh: Completed" },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="rounded-2xl border border-[#bcd6fa] bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-electric to-electric-bright font-display text-2xl font-bold text-white shadow-md">
                AM
              </div>
              <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-signal" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold text-ink">Alex Morgan</h1>
                <span className="rounded-full bg-signal/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-signal">
                  Top 1% Pod Specialist
                </span>
              </div>
              <p className="text-xs sm:text-sm text-ink-soft">
                Senior Full-Stack Architect & High-Velocity Pod Delivery Lead
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs font-mono text-mist">
                <span>📍 London, United Kingdom</span>
                <span>⏱ UTC +0 / +1 Compatible</span>
                <span>💼 $85 to $105 / hr</span>
              </div>
            </div>
          </div>

          <button className="rounded-xl bg-ink px-4 py-2 font-display text-xs font-semibold text-white hover:bg-electric transition-colors cursor-pointer shadow-xs">
            Edit Public Profile
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#bcd6fa]/40 pb-3">
        <button
          onClick={() => setActiveTab("skills")}
          className={`rounded-xl px-4 py-2 font-display text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "skills"
              ? "bg-ink text-white shadow-xs"
              : "bg-white border border-[#bcd6fa]/60 text-ink-soft hover:text-ink"
          }`}
        >
          Verified Skill Matrix
        </button>
        <button
          onClick={() => setActiveTab("compliance")}
          className={`rounded-xl px-4 py-2 font-display text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "compliance"
              ? "bg-ink text-white shadow-xs"
              : "bg-white border border-[#bcd6fa]/60 text-ink-soft hover:text-ink"
          }`}
        >
          Compliance & Badges (4)
        </button>
        <button
          onClick={() => setActiveTab("preferences")}
          className={`rounded-xl px-4 py-2 font-display text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "preferences"
              ? "bg-ink text-white shadow-xs"
              : "bg-white border border-[#bcd6fa]/60 text-ink-soft hover:text-ink"
          }`}
        >
          Deployment Preferences
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "skills" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#bcd6fa] bg-white p-5 shadow-xs flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-sm font-bold text-ink">{skill.name}</h3>
                  <span className="rounded-md bg-electric/10 px-2 py-0.5 font-mono text-[10px] font-bold text-electric">
                    {skill.badge}
                  </span>
                </div>
                <div className="mt-1 text-xs text-ink-soft">
                  Level: <strong className="text-ink">{skill.level}</strong>
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono text-sm font-bold text-signal">{skill.score}</div>
                <div className="text-[10px] font-mono text-mist">Verified Score</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "compliance" && (
        <div className="space-y-3">
          {complianceItems.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#bcd6fa] bg-white p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-signal/10 text-signal font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-ink">{item.name}</h3>
                  <div className="text-xs text-mist font-mono">{item.date}</div>
                </div>
              </div>

              <span className="self-start sm:self-auto rounded-full bg-signal/10 px-3 py-1 font-mono text-xs font-bold text-signal">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {activeTab === "preferences" && (
        <div className="rounded-2xl border border-[#bcd6fa] bg-white p-6 shadow-xs space-y-4">
          <h2 className="font-display text-base font-bold text-ink">Deployment & Pod Constraints</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="rounded-xl border border-[#bcd6fa]/60 bg-canvas/40 p-4">
              <span className="font-mono text-mist uppercase tracking-wider text-[10px]">Work Style</span>
              <p className="mt-1 font-display font-semibold text-ink">100% Remote or Hybrid London</p>
            </div>
            <div className="rounded-xl border border-[#bcd6fa]/60 bg-canvas/40 p-4">
              <span className="font-mono text-mist uppercase tracking-wider text-[10px]">Weekly Pod Capacity</span>
              <p className="mt-1 font-display font-semibold text-ink">40 Hours / Full-Time Sprint</p>
            </div>
            <div className="rounded-xl border border-[#bcd6fa]/60 bg-canvas/40 p-4">
              <span className="font-mono text-mist uppercase tracking-wider text-[10px]">Notice Period</span>
              <p className="mt-1 font-display font-semibold text-ink">Immediate (Within 7-Day Sprint)</p>
            </div>
            <div className="rounded-xl border border-[#bcd6fa]/60 bg-canvas/40 p-4">
              <span className="font-mono text-mist uppercase tracking-wider text-[10px]">Escrow Currency</span>
              <p className="mt-1 font-display font-semibold text-ink">USD ($) or GBP (£)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
