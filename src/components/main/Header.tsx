"use client";

const NAV_ITEMS = [
  { label: "About Us", href: "#about" },
  { label: "Solutions", href: "#solutions" },
  { label: "Tech & Healthcare", href: "#tech-healthcare" },
  { label: "Looking for Opportunity", href: "#opportunity" },
  { label: "Want Hiring", href: "#hiring" },
];

export default function Header() {
  return (
    <header className="relative z-50 w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 pt-8 pb-4 lg:px-10">
        {/* Left: logo */}
        <a href="/" className="group flex shrink-0 items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0a1428] font-display text-lg font-extrabold text-white shadow-[0_4px_14px_-2px_rgba(10,20,40,0.5)] transition-transform group-hover:scale-105">
            P
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-[#0a1428]">
            Pepoltek<span className="text-electric"> Limited</span>
          </span>
        </a>

        {/* Middle: nav items */}
        <nav className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.14em] text-[#3d4c68] lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="whitespace-nowrap transition-colors hover:text-electric"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: auth buttons */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href="#login"
            className="hidden rounded-full px-4 py-2 font-display text-sm font-semibold text-[#0a1428] transition-colors hover:text-electric sm:inline-flex"
          >
            Log in
          </a>
          <a
            href="#signup"
            className="inline-flex items-center rounded-full bg-[#0a1428] px-5 py-2 font-display text-sm font-semibold text-white shadow-[0_8px_24px_-10px_rgba(10,20,40,0.6)] transition-all hover:-translate-y-0.5 hover:bg-electric hover:shadow-[0_12px_30px_-8px_rgba(10,132,255,0.6)]"
          >
            Sign up
          </a>
        </div>
      </div>
    </header>
  );
}
