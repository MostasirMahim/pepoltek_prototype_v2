"use client";

const ALL_PODS = [
  {
    id: "POD-842",
    name: "Web3 High-Frequency Ledger Pod",
    client: "Global Capital Markets",
    lead: "Alex Morgan",
    headcount: "4 Specialists",
    slaScore: "99.9%",
    stage: "Active Sprint 3",
    sector: "Enterprise IT",
    status: "Healthy",
  },
  {
    id: "POD-719",
    name: "CarePulse Emergency ICU Specialist Rota",
    client: "CarePulse NHS Trust",
    lead: "Dr. Rachel Higgins",
    headcount: "6 Specialists",
    slaScore: "100%",
    stage: "Live On-Site",
    sector: "Healthcare",
    status: "Healthy",
  },
  {
    id: "POD-904",
    name: "Cloud Native Kubernetes Migration Pod",
    client: "AeroTech SaaS",
    lead: "Devon Reed",
    headcount: "3 Platform Devs",
    slaScore: "98.5%",
    stage: "Sprint Assembly",
    sector: "Enterprise IT",
    status: "Healthy",
  },
  {
    id: "POD-611",
    name: "AI Patient Triage Pipeline Pod",
    client: "MedNexus Global",
    lead: "Dr. Ethan Wright",
    headcount: "4 Engineers",
    slaScore: "99.4%",
    stage: "Sprint 1 Kickoff",
    sector: "Dual Sector",
    status: "Healthy",
  },
];

export default function AdminPodsManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Global Pod Allocation & SLA Engine</h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Monitor all 48 active pods, client SLAs, sprint delivery velocity, and specialist re-allocations.
          </p>
        </div>
        <button className="rounded-xl bg-electric px-4 py-2 font-display text-xs font-semibold text-white hover:bg-electric-bright transition-colors shadow-xs">
          + Provision New Pod
        </button>
      </div>

      <div className="rounded-2xl border border-[#1b2b4d] bg-[#0a1428] p-6 shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#1b2b4d] font-mono text-gray-400 uppercase text-[11px]">
              <th className="pb-3 font-semibold">Pod Identifier</th>
              <th className="pb-3 font-semibold">Client Organization</th>
              <th className="pb-3 font-semibold">Assigned Lead</th>
              <th className="pb-3 font-semibold">Size</th>
              <th className="pb-3 font-semibold">SLA Health</th>
              <th className="pb-3 font-semibold">Sector</th>
              <th className="pb-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1b2b4d]/50">
            {ALL_PODS.map((pod) => (
              <tr key={pod.id} className="hover:bg-[#060b14]/50 transition-colors">
                <td className="py-3.5 pr-3">
                  <div className="font-mono text-xs font-bold text-electric-bright">{pod.id}</div>
                  <div className="font-display font-semibold text-white">{pod.name}</div>
                </td>
                <td className="py-3.5 font-medium text-gray-300">{pod.client}</td>
                <td className="py-3.5 text-white font-medium">{pod.lead}</td>
                <td className="py-3.5 font-mono text-gray-400">{pod.headcount}</td>
                <td className="py-3.5">
                  <span className="rounded-full bg-signal/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-signal">
                    {pod.slaScore} SLA
                  </span>
                </td>
                <td className="py-3.5 font-mono text-gray-300">{pod.sector}</td>
                <td className="py-3.5 text-right">
                  <button className="rounded-lg border border-[#1b2b4d] bg-[#060b14] px-2.5 py-1 font-mono text-[11px] text-gray-300 hover:text-white">
                    Re-allocate Specialists
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
