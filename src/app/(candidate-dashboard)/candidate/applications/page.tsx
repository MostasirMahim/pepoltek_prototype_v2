"use client";

import { useState } from "react";

interface Application {
  id: string;
  podName: string;
  client: string;
  sector: "Enterprise IT" | "Healthcare";
  role: string;
  appliedDate: string;
  status: "Screening" | "Sprint Vetting" | "Client Review" | "Pod Offer Ready" | "Live Deployed";
  rate: string;
  location: string;
  techStack: string[];
}

const APPLICATIONS: Application[] = [
  {
    id: "APP-4019",
    podName: "FinTech High-Frequency Ledger Pod",
    client: "Global Capital Markets Ltd",
    sector: "Enterprise IT",
    role: "Lead React / TypeScript Architect",
    appliedDate: "Sep 28, 2026",
    status: "Sprint Vetting",
    rate: "$95/hr",
    location: "Remote (UK/EU Timezone)",
    techStack: ["Next.js 15", "TypeScript", "WebSocket", "Tailwind CSS", "Redis"],
  },
  {
    id: "APP-3982",
    podName: "NHS EHR Clinical Interoperability Pod",
    client: "CarePulse NHS Trust",
    sector: "Healthcare",
    role: "Senior Node.js FHIR / HL7 Integration Lead",
    appliedDate: "Sep 24, 2026",
    status: "Client Review",
    rate: "£78/hr",
    location: "Hybrid London / Remote",
    techStack: ["Node.js", "FHIR API", "PostgreSQL", "Docker", "GMC Compliance"],
  },
  {
    id: "APP-3741",
    podName: "Cloud Migration DevOps Pod",
    client: "AeroTech SaaS Systems",
    sector: "Enterprise IT",
    role: "Infrastructure & Platform Engineer",
    appliedDate: "Sep 20, 2026",
    status: "Pod Offer Ready",
    rate: "$88/hr",
    location: "Remote",
    techStack: ["AWS", "Kubernetes", "Terraform", "CI/CD", "Prometheus"],
  },
  {
    id: "APP-3510",
    podName: "Digital Health Tele-Consultation Pod",
    client: "MedNexus Global",
    sector: "Healthcare",
    role: "Full-Stack WebRTC Specialist",
    appliedDate: "Sep 12, 2026",
    status: "Live Deployed",
    rate: "$92/hr",
    location: "Remote",
    techStack: ["WebRTC", "React", "Node.js", "HIPAA/GDPR"],
  },
];

export default function CandidateApplicationsPage() {
  const [filter, setFilter] = useState<string>("All");

  const filtered = filter === "All"
    ? APPLICATIONS
    : APPLICATIONS.filter((a) => a.status === filter || a.sector === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Pod Application Pipeline</h1>
          <p className="text-xs sm:text-sm text-ink-soft">
            Track your 7-day sprint evaluations, client interview reviews, and active deployment contracts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-mist">Live Pod Placements:</span>
          <span className="rounded-full bg-signal/10 px-3 py-1 font-mono text-xs font-bold text-signal">
            4 Active
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#bcd6fa]/40 pb-3">
        {["All", "Sprint Vetting", "Client Review", "Pod Offer Ready", "Live Deployed", "Enterprise IT", "Healthcare"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`rounded-xl px-3.5 py-1.5 font-display text-xs font-semibold transition-all cursor-pointer ${
              filter === tab
                ? "bg-ink text-white shadow-xs"
                : "bg-white border border-[#bcd6fa]/60 text-ink-soft hover:border-electric hover:text-ink"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Application Cards List */}
      <div className="space-y-4">
        {filtered.map((app) => (
          <div
            key={app.id}
            className="rounded-2xl border border-[#bcd6fa] bg-white p-5 sm:p-6 shadow-xs transition-all hover:border-electric hover:shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#bcd6fa]/30 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-electric">{app.id}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold ${
                      app.sector === "Enterprise IT"
                        ? "bg-blue-50 text-electric border border-blue-200"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    }`}
                  >
                    {app.sector}
                  </span>
                  <span className="font-mono text-[11px] text-mist">Applied: {app.appliedDate}</span>
                </div>
                <h2 className="font-display text-lg font-bold text-ink">{app.podName}</h2>
                <div className="text-xs text-ink-soft">
                  Client: <strong className="text-ink">{app.client}</strong> • Role:{" "}
                  <span className="font-medium text-ink">{app.role}</span>
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-start md:items-end justify-between gap-2">
                <span
                  className={`rounded-xl px-3 py-1 text-xs font-mono font-bold ${
                    app.status === "Live Deployed"
                      ? "bg-signal text-white"
                      : app.status === "Pod Offer Ready"
                      ? "bg-electric text-white"
                      : app.status === "Client Review"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-canvas text-ink border border-[#bcd6fa]"
                  }`}
                >
                  {app.status}
                </span>
                <div className="font-display text-sm font-bold text-ink">
                  {app.rate} <span className="font-mono text-[11px] text-mist font-normal">({app.location})</span>
                </div>
              </div>
            </div>

            {/* Skills & Action footer */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-[11px] text-mist mr-1">Required Tech:</span>
                {app.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg bg-canvas px-2.5 py-1 font-mono text-[11px] font-semibold text-ink-soft border border-[#bcd6fa]/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button className="rounded-xl border border-[#bcd6fa] bg-white px-3.5 py-1.5 font-display text-xs font-semibold text-ink hover:border-electric hover:text-electric transition-colors cursor-pointer">
                  View Pod Brief
                </button>
                <button className="rounded-xl bg-ink px-4 py-1.5 font-display text-xs font-semibold text-white hover:bg-electric transition-colors cursor-pointer shadow-xs">
                  Open Sprint Chat →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
