"use client";

export default function AdminFinancePage() {
  const financialKPIs = [
    { title: "Total Escrow in Vault", value: "$482,900.00", sub: "Covering 48 active pod sprints", badge: "Protected" },
    { title: "Monthly Platform Gross Volume", value: "$1,842,500.00", sub: "+24% YoY growth", badge: "Volume" },
    { title: "Pending Contractor Payouts", value: "$124,300.00", sub: "Scheduled for Friday automated release", badge: "Pending" },
    { title: "Platform Gross Margin", value: "22.4%", sub: "Enterprise SLA & pod markup", badge: "Optimal" },
  ];

  const recentTransactions = [
    { id: "TXN-8841", client: "Apex Health Systems", amount: "+$48,500.00", type: "Sprint Escrow Deposit", status: "Completed", date: "Today" },
    { id: "TXN-8840", client: "Alex Morgan (Pod Lead)", amount: "-$3,800.00", type: "Milestone Payout Release", status: "Completed", date: "Today" },
    { id: "TXN-8839", client: "Global Capital Markets", amount: "+$56,800.00", type: "Monthly Pod Renewal", status: "Completed", date: "Yesterday" },
    { id: "TXN-8838", client: "CarePulse NHS Trust", amount: "+$74,000.00", type: "Clinical Rota Escrow", status: "Completed", date: "Sep 29" },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Escrow & Financial Settlement Hub</h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Monitor enterprise sprint escrow funds, contractor payouts, and automated client billing logs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {financialKPIs.map((kpi, i) => (
          <div key={i} className="rounded-2xl border border-[#1b2b4d] bg-[#0a1428] p-5 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-gray-400 uppercase tracking-wider">{kpi.title}</span>
              <span className="rounded-full bg-signal/20 px-2 py-0.5 font-mono text-[10px] font-bold text-signal">
                {kpi.badge}
              </span>
            </div>
            <div className="font-display text-2xl font-bold text-white">{kpi.value}</div>
            <p className="text-[11px] text-gray-400">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="rounded-2xl border border-[#1b2b4d] bg-[#0a1428] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-white">Recent Escrow & Payout Transactions</h2>
          <button className="rounded-lg bg-electric px-3 py-1 font-display text-xs font-semibold text-white hover:bg-electric-bright">
            Export Financial CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1b2b4d] font-mono text-gray-400 uppercase text-[11px]">
                <th className="pb-3 font-semibold">Transaction ID</th>
                <th className="pb-3 font-semibold">Party / Entity</th>
                <th className="pb-3 font-semibold">Transaction Type</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b2b4d]/50">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#060b14]/50 transition-colors">
                  <td className="py-3.5 font-mono text-xs font-bold text-electric-bright">{tx.id}</td>
                  <td className="py-3.5 font-medium text-white">{tx.client}</td>
                  <td className="py-3.5 text-gray-300 font-mono text-[11px]">{tx.type}</td>
                  <td className="py-3.5 font-mono text-gray-400">{tx.date}</td>
                  <td className="py-3.5">
                    <span className="rounded-full bg-signal/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-signal">
                      {tx.status}
                    </span>
                  </td>
                  <td
                    className={`py-3.5 text-right font-mono font-bold ${
                      tx.amount.startsWith("+") ? "text-signal" : "text-gray-200"
                    }`}
                  >
                    {tx.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
