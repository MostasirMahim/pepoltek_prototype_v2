"use client";

const COMPLIANCE_RECORDS = [
  {
    id: "CMP-901",
    candidate: "Dr. Rachel Higgins",
    type: "GMC Full Registration & NHS Framework Clearance",
    status: "Verified",
    expiry: "Dec 2027",
    auditor: "Automated GMC API Node",
  },
  {
    id: "CMP-902",
    candidate: "Alex Morgan",
    type: "UK Right-to-Work & Enterprise IP Assignment Agreement",
    status: "Verified",
    expiry: "Aug 2028",
    auditor: "Pepoltek Legal Engine",
  },
  {
    id: "CMP-903",
    candidate: "Sarah Lindqvist",
    type: "Enhanced DBS Disclosure & Safeguarding Band 7",
    status: "Verified",
    expiry: "Jul 2027",
    auditor: "UK DBS Gateway",
  },
  {
    id: "CMP-904",
    candidate: "Carlos Mendez",
    type: "SOC-2 Security Background & Non-Compete Clearance",
    status: "Verified",
    expiry: "Oct 2027",
    auditor: "Global Security Check",
  },
];

export default function AdminCompliancePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Compliance & Vetting Audit Center</h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Real-time verification telemetry for NHS clinical registrations, DBS background checks, and IP agreements.
          </p>
        </div>
        <div className="rounded-xl border border-signal/40 bg-signal/10 px-3.5 py-1.5 font-mono text-xs font-bold text-signal">
          99.8% Compliance Rate • 0 Active Violations
        </div>
      </div>

      <div className="rounded-2xl border border-[#1b2b4d] bg-[#0a1428] p-6 shadow-xs space-y-4">
        <h2 className="font-display text-base font-bold text-white">Active Audit Records</h2>
        <div className="space-y-3">
          {COMPLIANCE_RECORDS.map((rec) => (
            <div
              key={rec.id}
              className="rounded-xl border border-[#1b2b4d] bg-[#060b14] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-electric-bright">{rec.id}</span>
                  <span className="font-display font-bold text-white">{rec.candidate}</span>
                </div>
                <p className="text-gray-300 mt-0.5">{rec.type}</p>
                <div className="text-[11px] font-mono text-gray-500 mt-1">
                  Audited by: {rec.auditor} • Expiry: <span className="text-gray-300">{rec.expiry}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="rounded-full bg-signal/20 px-3 py-1 font-mono text-xs font-bold text-signal">
                  ✓ {rec.status}
                </span>
                <button className="rounded-lg border border-[#1b2b4d] bg-[#0a1428] px-3 py-1 font-mono text-[11px] text-gray-300 hover:text-white">
                  Inspect Audit Certificate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
