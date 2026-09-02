"use client";

import { useState } from "react";
import {
  Globe,
  Clock,
  DollarSign,
  ShieldCheck,
  CheckCircle,
  Check,
  ArrowRight,
  Code2,
} from "@/components/ui/Icons";
import { CURRENT_TALENT_PROFILE, CandidateProfile } from "@/data/talentDashboardData";

export default function CandidateProfilePage() {
  const [activeTab, setActiveTab] = useState<"skills" | "compliance" | "preferences">("skills");
  const [profile, setProfile] = useState<CandidateProfile>(CURRENT_TALENT_PROFILE);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const complianceItems = [
    { name: "Right to Work Verification (US Citizen / Global)", status: "Active and Verified", date: "Valid until Dec 2027" },
    { name: "Enhanced Background and Security Check", status: "Active and Verified", date: "Completed Aug 2026" },
    { name: "IP Assignment and NDA Agreement", status: "Digitally Executed", date: "On File with Pepoltek Legal" },
    { name: "SOC 2 Type II and HIPAA Data Compliance Certification", status: "Certified", date: "Annual Refresh Complete" },
  ];

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Profile Header Banner */}
      <div className="rounded-3xl border border-[#bcd6fa] bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-electric to-electric-bright font-display text-2xl sm:text-3xl font-extrabold text-white shadow-md">
                AM
              </div>
              <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-3 border-white bg-signal" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                  {profile.fullName}
                </h1>
                <span className="rounded-full bg-signal/15 border border-signal/30 px-2.5 py-0.5 font-mono text-[10px] font-bold text-signal">
                  {profile.vettingTier}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-ink-soft mt-0.5">
                {profile.title}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-mist">
                <span className="flex items-center gap-1.5 text-ink-soft">
                  <Globe size={13} className="text-electric" />
                  <span>{profile.location}</span>
                </span>
                <span className="flex items-center gap-1.5 text-ink-soft">
                  <Clock size={13} className="text-electric" />
                  <span>{profile.timezoneOverlapHours} Hours Live Overlap</span>
                </span>
                <span className="flex items-center gap-1.5 text-ink-soft">
                  <DollarSign size={13} className="text-signal" />
                  <span>{profile.desiredHourlyRate}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="font-mono text-[10.5px] uppercase tracking-wider text-mist">Technical Vetting</div>
            <div className="font-display text-2xl font-extrabold text-electric">
              {profile.technicalVettingScore} <span className="text-xs font-normal text-mist">/ 100</span>
            </div>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="rounded-2xl border border-signal/40 bg-signal/10 p-4 text-xs text-signal flex items-center gap-2.5 shadow-2xs">
          <CheckCircle size={18} />
          <span className="font-semibold">Deployment telemetry preferences updated and synced across active pods.</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#bcd6fa]/40 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("skills")}
          className={`rounded-xl px-4 py-2 font-display text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "skills"
              ? "bg-ink text-white shadow-xs"
              : "bg-white border border-[#bcd6fa]/60 text-ink-soft hover:text-ink"
          }`}
        >
          Verified Skill Matrix ({profile.skills.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("compliance")}
          className={`rounded-xl px-4 py-2 font-display text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "compliance"
              ? "bg-ink text-white shadow-xs"
              : "bg-white border border-[#bcd6fa]/60 text-ink-soft hover:text-ink"
          }`}
        >
          Compliance & Legal Clearances (4)
        </button>
        <button
          type="button"
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
          {profile.skills.map((skill, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#bcd6fa] bg-white p-4.5 shadow-xs flex items-center justify-between hover:border-electric transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-electric/10 text-electric">
                  <Code2 size={18} />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-ink">{skill}</h3>
                  <span className="font-mono text-[10.5px] text-mist">Verified via Live Code Audit</span>
                </div>
              </div>
              <span className="rounded-lg bg-signal/10 border border-signal/20 px-2.5 py-0.5 font-mono text-[11px] font-bold text-signal">
                98% Rank
              </span>
            </div>
          ))}
        </div>
      )}

      {activeTab === "compliance" && (
        <div className="rounded-3xl border border-[#bcd6fa] bg-white p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#bcd6fa]/30 pb-3">
            <div>
              <h2 className="font-display text-base font-bold text-ink">Background and Regulatory Dossier</h2>
              <p className="text-xs text-ink-soft">Verified legal credentials allowing instant zero-risk deployment.</p>
            </div>
            <span className="rounded-full bg-signal/15 px-3 py-1 font-mono text-xs font-bold text-signal">
              Audit Clear
            </span>
          </div>

          <div className="space-y-3">
            {complianceItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#bcd6fa]/60 bg-canvas/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-signal/10 text-signal">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <div className="font-display font-bold text-ink">{item.name}</div>
                    <div className="font-mono text-[10.5px] text-mist">{item.date}</div>
                  </div>
                </div>
                <span className="rounded-full bg-signal/10 text-signal font-mono font-bold text-[10px] px-2.5 py-0.5 self-start sm:self-auto">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "preferences" && (
        <form onSubmit={handleSavePreferences} className="rounded-3xl border border-[#bcd6fa] bg-white p-6 sm:p-8 shadow-xs space-y-5">
          <div className="border-b border-[#bcd6fa]/30 pb-3">
            <h2 className="font-display text-base font-bold text-ink">Target Pod Deployment Preferences</h2>
            <p className="text-xs text-ink-soft">Configure your live standup windows and contract structures.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-mono text-[11px] font-semibold uppercase text-ink-soft mb-1">
                Target Rate Range
              </label>
              <input
                type="text"
                value={profile.desiredHourlyRate}
                onChange={(e) => setProfile({ ...profile, desiredHourlyRate: e.target.value })}
                className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/30 p-2.5 text-sm text-ink focus:border-electric focus:bg-white focus:outline-hidden font-medium"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] font-semibold uppercase text-ink-soft mb-1">
                Preferred Engagement Contract
              </label>
              <input
                type="text"
                value={profile.engagementPreference}
                onChange={(e) => setProfile({ ...profile, engagementPreference: e.target.value })}
                className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/30 p-2.5 text-sm text-ink focus:border-electric focus:bg-white focus:outline-hidden font-medium"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] font-semibold uppercase text-ink-soft mb-1">
                Right-to-Work / Visa Authorization
              </label>
              <input
                type="text"
                value={profile.visaStatus}
                onChange={(e) => setProfile({ ...profile, visaStatus: e.target.value })}
                className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/30 p-2.5 text-sm text-ink focus:border-electric focus:bg-white focus:outline-hidden font-medium"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] font-semibold uppercase text-ink-soft mb-1">
                Location & Base Timezone
              </label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full rounded-xl border border-[#bcd6fa] bg-canvas/30 p-2.5 text-sm text-ink focus:border-electric focus:bg-white focus:outline-hidden font-medium"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#bcd6fa]/40 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-2.5 font-display text-xs font-bold text-white hover:bg-electric transition-colors shadow-xs cursor-pointer"
            >
              <Check size={14} />
              <span>Save Telemetry Preferences</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
