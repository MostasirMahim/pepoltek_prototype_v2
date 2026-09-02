"use client";

import { useState } from "react";

interface ReverseMatch {
  id: string;
  clientOrg: string;
  sector: "Enterprise IT" | "Healthcare";
  role: string;
  matchScore: number;
  skillOverlap: string[];
  timezoneOverlap: string;
  authRequired: boolean;
  authorized: boolean;
  compensation: string;
  engagement: "C2C" | "W2" | "Direct Hire";
  sprintVelocity: string;
}

const LIVE_CLIENT_PIPELINES: ReverseMatch[] = [
  {
    id: "MATCH-881",
    clientOrg: "Global Tier-1 Investment Bank",
    sector: "Enterprise IT",
    role: "Lead React & Low-Latency Node Architect",
    matchScore: 99,
    skillOverlap: ["Next.js 15", "TypeScript", "WebSocket", "Redis", "Kafka"],
    timezoneOverlap: "6 Hours Live Standup Overlap (UK/US East)",
    authRequired: true,
    authorized: false,
    compensation: "$95 - $110 / hr",
    engagement: "C2C",
    sprintVelocity: "7-Day Sprint Kickoff",
  },
  {
    id: "MATCH-882",
    clientOrg: "CarePulse NHS Foundation Trust",
    sector: "Healthcare",
    role: "Clinical Interoperability & FHIR v4 Lead",
    matchScore: 96,
    skillOverlap: ["Node.js", "FHIR API", "PostgreSQL", "Docker", "GMC Framework"],
    timezoneOverlap: "Full UK Core Hours (8 Hours)",
    authRequired: true,
    authorized: true,
    compensation: "£78 - £90 / hr",
    engagement: "Direct Hire",
    sprintVelocity: "Immediate Deployment",
  },
  {
    id: "MATCH-883",
    clientOrg: "AeroTech Distributed Systems",
    sector: "Enterprise IT",
    role: "Cloud Native Kubernetes SRE",
    matchScore: 94,
    skillOverlap: ["AWS EKS", "Terraform", "Kubernetes", "Datadog"],
    timezoneOverlap: "5 Hours Live Overlap",
    authRequired: true,
    authorized: false,
    compensation: "$88 - $100 / hr",
    engagement: "W2",
    sprintVelocity: "Sprint 2 Integration",
  },
];

export default function CandidateReverseSearchPage() {
  const [matches, setMatches] = useState<ReverseMatch[]>(LIVE_CLIENT_PIPELINES);
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState("Just now");

  const handleAuthorizePitch = (id: string) => {
    setMatches((prev) =>
      prev.map((m) => (m.id === id ? { ...m, authorized: true } : m))
    );
  };

  const handleTriggerRescan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setLastScanned("Just now");
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Header & Privacy Seal */}
      <div className="rounded-2xl border border-electric/30 bg-gradient-to-r from-ink via-[#0d1f3d] to-ink p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-signal/40 bg-signal/10 px-3 py-0.5 text-[11px] font-mono text-signal">
              <span className="h-2 w-2 rounded-full bg-signal animate-pulse" />
              <span>ZERO PUBLIC PROFILE EXPOSURE GUARANTEE</span>
            </div>
            <h1 className="mt-2.5 font-display text-2xl sm:text-3xl font-bold tracking-tight">
              Reverse Job Search Engine
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-300 max-w-2xl">
              Your profile is continuously scanned against live client pod requisitions. Clients only receive your anonymized dossier once you authorize a <strong>One-Click Pitch</strong>.
            </p>
          </div>

          <button
            onClick={handleTriggerRescan}
            disabled={isScanning}
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-electric px-4 py-2.5 font-display text-xs font-semibold text-white shadow-xs transition-all hover:bg-electric-bright disabled:opacity-60 cursor-pointer"
          >
            {isScanning ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Scanning Pipelines...</span>
              </>
            ) : (
              <span>⚡ Re-scan Client Pipelines</span>
            )}
          </button>
        </div>

        {/* Scan Telemetry Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-gray-300">
          <div>
            Scan Engine: <span className="text-electric-bright">AI-HRMS v2.4</span> • Last Evaluated: {lastScanned}
          </div>
          <div className="text-signal">3 High-Probability Matches Active</div>
        </div>
      </div>

      {/* Matched Pipelines Cards */}
      <div className="space-y-4">
        {matches.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-[#bcd6fa] bg-white p-5 sm:p-6 shadow-xs transition-all hover:border-electric hover:shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#bcd6fa]/30 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-electric">{item.id}</span>
                  <span className="rounded-full bg-signal/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-signal">
                    Match {item.matchScore}%
                  </span>
                  <span className="font-mono text-xs text-ink-soft">• {item.engagement}</span>
                </div>
                <h2 className="font-display text-lg font-bold text-ink">{item.role}</h2>
                <div className="text-xs text-ink-soft">
                  Client: <strong className="text-ink">{item.clientOrg}</strong> • Sector: <span className="font-medium text-ink">{item.sector}</span>
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-start md:items-end justify-between gap-1">
                <div className="font-display text-base font-bold text-ink">{item.compensation}</div>
                <div className="font-mono text-[11px] text-electric font-semibold">{item.sprintVelocity}</div>
              </div>
            </div>

            {/* Overlap Details */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-[#bcd6fa]/50 bg-canvas/30 p-3 space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-mist">Verified Skill Overlap</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.skillOverlap.map((s) => (
                    <span
                      key={s}
                      className="rounded-md bg-white border border-[#bcd6fa]/60 px-2 py-0.5 font-mono text-[11px] text-ink font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-[#bcd6fa]/50 bg-canvas/30 p-3 space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-mist">Timezone Synchronization</span>
                <p className="font-medium text-ink mt-0.5">{item.timezoneOverlap}</p>
              </div>
            </div>

            {/* One-Click Pitch Authorization Trigger */}
            <div className="mt-4 pt-3 border-t border-[#bcd6fa]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-[11px] text-ink-soft">
                {item.authorized
                  ? "✓ Pitch Authorized: Your vetted dossier was dispatched to the client hiring panel."
                  : "🔒 Protected: Authorizing this pitch will securely introduce your profile to the hiring lead."}
              </p>

              {item.authorized ? (
                <div className="inline-flex items-center gap-1.5 rounded-xl bg-signal/10 px-4 py-2 font-display text-xs font-bold text-signal">
                  <span>✓ Pitch Dispatched to Panel</span>
                </div>
              ) : (
                <button
                  onClick={() => handleAuthorizePitch(item.id)}
                  className="rounded-xl bg-ink px-4 py-2 font-display text-xs font-semibold text-white hover:bg-electric transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Authorize One-Click Pitch →</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
