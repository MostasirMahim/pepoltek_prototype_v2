"use client";

import { useState } from "react";

interface AuditEvent {
  id: string;
  timestamp: string;
  eventType: string;
  actor: string;
  entity: string;
  entityId: string;
  ipAddress: string;
  status: "SUCCESS" | "FLAGGED" | "BLOCKED";
  details: string;
  priority: "P0" | "P1";
}

const AUDIT_EVENT_STREAM: AuditEvent[] = [
  {
    id: "AUD-99410",
    timestamp: "2026-09-02 11:18:22 UTC",
    eventType: "PITCH_AUTHORIZED",
    actor: "USR-101 (Alex Morgan)",
    entity: "CandidateMatch",
    entityId: "MATCH-881",
    ipAddress: "185.122.45.10",
    status: "SUCCESS",
    details: "Candidate authorized One-Click Pitch to Client: Global Tier-1 Investment Bank",
    priority: "P0",
  },
  {
    id: "AUD-99409",
    timestamp: "2026-09-02 11:12:04 UTC",
    eventType: "AI_PARSING_COMPLETED",
    actor: "SYSTEM (AI Worker Node 4)",
    entity: "ResumeParsedData",
    entityId: "RES-4019",
    ipAddress: "10.0.4.12",
    status: "SUCCESS",
    details: "Extracted 6 tech skills, 8 yrs experience. Soft-yellow indicator flagged for visa document.",
    priority: "P0",
  },
  {
    id: "AUD-99408",
    timestamp: "2026-09-02 10:55:40 UTC",
    eventType: "ESCROW_VAULT_DEPOSIT",
    actor: "USR-103 (Elena Rostova)",
    entity: "EscrowLedger",
    entityId: "TXN-8841",
    ipAddress: "64.233.160.1",
    status: "SUCCESS",
    details: "Funded $48,500.00 for High-Frequency Ledger Pod Sprint #3",
    priority: "P0",
  },
  {
    id: "AUD-99407",
    timestamp: "2026-09-02 10:41:19 UTC",
    eventType: "COMPLIANCE_AUTO_VERIFIED",
    actor: "SYSTEM (GMC Gateway API)",
    entity: "ComplianceRecord",
    entityId: "CMP-901",
    ipAddress: "51.140.22.8",
    status: "SUCCESS",
    details: "Dr. Rachel Higgins full registration & clinical indemnity cleared through 2027.",
    priority: "P0",
  },
  {
    id: "AUD-99406",
    timestamp: "2026-09-02 09:20:15 UTC",
    eventType: "UNAUTHORIZED_ACCESS_ATTEMPT",
    actor: "ANONYMOUS",
    entity: "CandidateProfile",
    entityId: "TAL-501",
    ipAddress: "194.26.29.112",
    status: "BLOCKED",
    details: "Zero Public Exposure Policy enforced: Public scraper blocked at gateway.",
    priority: "P0",
  },
  {
    id: "AUD-99405",
    timestamp: "2026-09-02 08:30:00 UTC",
    eventType: "REFERRAL_BOUNTY_CLEARED",
    actor: "SUPER_ADMIN",
    entity: "ReferralPayout",
    entityId: "REF-302",
    ipAddress: "172.56.21.90",
    status: "SUCCESS",
    details: "$500 bounty cleared for candidate Sarah Lindqvist placement.",
    priority: "P0",
  },
];

export default function AdminAuditLogsPage() {
  const [filterType, setFilterType] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = AUDIT_EVENT_STREAM.filter((item) => {
    const matchesFilter = filterType === "ALL" || item.eventType === filterType || item.status === filterType;
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.details.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Banner & Immutability Badge */}
      <div className="rounded-2xl border border-[#1b2b4d] bg-[#0a1428] p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-signal/40 bg-signal/10 px-3 py-0.5 text-[11px] font-mono text-signal">
              <span className="h-2 w-2 rounded-full bg-signal animate-pulse" />
              <span>APPEND-ONLY IMMUTABLE AUDIT LOG (SOC-2 / HIPAA)</span>
            </div>
            <h1 className="mt-2.5 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              System Audit & Telemetry Ledger
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-400 max-w-2xl">
              Cryptographically verified event trail recording all authentication events, AI parsing and matching decisions, referral payouts, and compliance authorizations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-xl border border-[#1b2b4d] bg-[#060b14] px-4 py-2 font-mono text-xs font-semibold text-gray-300 hover:text-white">
              Verify Hash Tree
            </button>
            <button className="rounded-xl bg-electric px-4 py-2 font-display text-xs font-semibold text-white hover:bg-electric-bright shadow-xs">
              Export Audit CSV
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by log ID, actor, or details..."
            className="w-full rounded-xl border border-[#1b2b4d] bg-[#0a1428] px-3.5 py-2 pl-9 text-xs text-white placeholder-gray-500 focus:border-electric focus:outline-hidden"
          />
          <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="flex flex-wrap gap-2">
          {["ALL", "SUCCESS", "FLAGGED", "BLOCKED"].map((f) => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`rounded-xl px-3.5 py-2 font-display text-xs font-semibold transition-all cursor-pointer ${
                filterType === f
                  ? "bg-electric text-white"
                  : "bg-[#0a1428] border border-[#1b2b4d] text-gray-400 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-2xl border border-[#1b2b4d] bg-[#0a1428] p-6 shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#1b2b4d] font-mono text-gray-400 uppercase text-[11px]">
              <th className="pb-3 font-semibold">Event ID & Timestamp</th>
              <th className="pb-3 font-semibold">Event Type</th>
              <th className="pb-3 font-semibold">Actor & IP</th>
              <th className="pb-3 font-semibold">Entity Target</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1b2b4d]/50">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-[#060b14]/50 transition-colors">
                <td className="py-3.5 pr-2">
                  <div className="font-mono text-xs font-bold text-electric-bright">{log.id}</div>
                  <div className="font-mono text-[10px] text-gray-500">{log.timestamp}</div>
                </td>
                <td className="py-3.5">
                  <span className="rounded-md bg-[#1b2b4d] px-2 py-0.5 font-mono text-[10px] font-bold text-gray-200">
                    {log.eventType}
                  </span>
                </td>
                <td className="py-3.5 font-mono text-gray-300">
                  <div>{log.actor}</div>
                  <div className="text-[10px] text-gray-500">{log.ipAddress}</div>
                </td>
                <td className="py-3.5 font-mono text-gray-400">
                  {log.entity} ({log.entityId})
                </td>
                <td className="py-3.5">
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                      log.status === "SUCCESS"
                        ? "bg-signal/20 text-signal"
                        : log.status === "BLOCKED"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-amber-500/20 text-amber-300"
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
                <td className="py-3.5 text-right text-gray-300 max-w-xs truncate">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
