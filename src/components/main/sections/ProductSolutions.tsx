"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData } from "@/data/projectsData";
import { Project } from "@/types/portfolio";

import { ProjectOverviewModal } from "./ProjectOverviewModal";
import { ProjectModal } from "./ProjectModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const solutionCategories = [
  { id: "all", name: "All Solutions" },
  { id: "SaaS Product", name: "SaaS Platforms" },
  { id: "Enterprise Software", name: "Enterprise ERP" },
  { id: "Service", name: "Custom IT" },
  { id: "Corporate Sales & Sourcing Service", name: "B2B Sourcing" },
];

/* ---------- Cyber Polygon Project Card ---------- */
interface ProjectCyberCardProps {
  project: Project;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  onClick: () => void;
  index: number;
}

function ProjectCyberCard({ project, hoveredId, setHoveredId, onClick, index }: ProjectCyberCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!cardRef.current) return;
    const update = () => {
      if (cardRef.current) {
        setDimensions({
          width: cardRef.current.clientWidth,
          height: cardRef.current.clientHeight,
        });
      }
    };
    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, []);

  const w = dimensions.width;
  const h = dimensions.height;
  const cornerCut = Math.max(120, Math.min(160, w * 0.48));

  const clipPathD =
    w && h
      ? `
    M 16 0 
    L ${w - 16} 0 
    A 16 16 0 0 1 ${w} 16 
    L ${w} ${h - 38 - 16} 
    A 16 16 0 0 1 ${w - 16} ${h - 38} 
    L ${w - cornerCut + 16} ${h - 38} 
    A 16 16 0 0 0 ${w - cornerCut} ${h - 38 + 16} 
    L ${w - cornerCut} ${h - 16} 
    A 16 16 0 0 1 ${w - cornerCut - 16} ${h} 
    L 16 ${h} 
    A 16 16 0 0 1 0 ${h - 16} 
    L 0 16 
    A 16 16 0 0 1 16 0 
    Z
  `
          .trim()
          .replace(/\s+/g, " ")
      : "";

  const clipId = `proj-clip-${project.slug}`;
  const isHovered = hoveredId === project.slug;

  return (
    <div
      ref={cardRef}
      className={`skills-card-container group animate-card cursor-target ${isHovered ? "is-active" : ""}`}
      onClick={onClick}
      onMouseEnter={() => setHoveredId(project.slug)}
      onMouseLeave={() => setHoveredId(null)}
      onTouchStart={() => setHoveredId(project.slug)}
      onTouchEnd={() => setHoveredId(null)}
      style={
        {
          aspectRatio: "3 / 3.9",
          ["--card-border-stroke" as string]: `url(#border-grad-${project.slug})`,
          ["--card-border-glow" as string]: `url(#glow-${project.slug})`,
        } as React.CSSProperties
      }
    >
      {w > 0 && h > 0 && (
        <svg className="skills-card-svg" width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
          <defs>
            <filter id={`glow-${project.slug}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#0a84ff" floodOpacity="0.4" />
            </filter>
            <linearGradient id={`border-grad-${project.slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0a84ff" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0066cc" />
            </linearGradient>
            <linearGradient id={`bg-grad-${project.slug}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#f0f6ff" stopOpacity="0.98" />
            </linearGradient>
            <clipPath id={clipId}>
              <path d={clipPathD} />
            </clipPath>
          </defs>
          <path d={clipPathD} fill={`url(#bg-grad-${project.slug})`} className="skills-card-fill" />
          <path d={clipPathD} fill="none" className="skills-card-border-path" />
        </svg>
      )}

      <div className="skills-card-body" style={{ clipPath: `url(#${clipId})` }}>
        <div className="skills-card-cyber-grid" />
        <div className="skills-card-inner-overlay" />
        <div className="skills-card-img-wrap">
          <img src={project.image} alt={project.alt} className="skills-card-img" />
        </div>
        <div className="skills-card-info">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-electric">{project.type}</span>
          <h4 className="font-display text-sm font-extrabold text-ink mt-0.5">{project.title}</h4>
          <p className="skills-card-desc mt-1 line-clamp-3 text-xs text-ink-soft">{project.description}</p>
          <div className="mt-3 flex items-center gap-1.5 font-mono text-[11px] font-semibold text-electric">
            <span>View Brief &amp; Architecture</span>
            <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <div className="skills-card-label" style={{ width: cornerCut, height: 38 }}>
        <span className="skills-card-name">{project.title}</span>
        <span className="skills-card-level font-mono text-[10px] text-electric">#{String(index + 1).padStart(2, "0")}</span>
      </div>
    </div>
  );
}

/* ---------- Main ProductSolutions Section ---------- */
export default function ProductSolutions() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [overviewProject, setOverviewProject] = useState<Project | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === "all"
      ? projectsData
      : projectsData.filter((p) => p.type === activeCategory || (activeCategory === "Service" && p.type.includes("Service")));

  useEffect(() => {
    let ctx: gsap.Context | undefined;
    let ro: ResizeObserver | undefined;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          ".solutions-header-num",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".solutions-section-header",
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        gsap.fromTo(
          ".solutions-header-title",
          { opacity: 0, y: 40, clipPath: "inset(100% 0% 0% 0%)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            ease: "power4.out",
            delay: 0.1,
            scrollTrigger: {
              trigger: ".solutions-section-header",
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        gsap.fromTo(
          ".solutions-filter-bar",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.25,
            scrollTrigger: {
              trigger: ".solutions-section-header",
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          }
        );

        if (sectionRef.current) {
          const cards = sectionRef.current.querySelectorAll(".animate-card");
          gsap.fromTo(
            cards,
            { opacity: 0, y: 40, scale: 0.88, filter: "blur(6px)" },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.8,
              stagger: 0.08,
              ease: "back.out(1.4)",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }, sectionRef);

      if (sectionRef.current) {
        ro = new ResizeObserver(() => {
          ScrollTrigger.refresh();
        });
        ro.observe(sectionRef.current);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
      ro?.disconnect();
    };
  }, []);

  return (
    <section
      id="solutions-catalog"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-canvas py-28 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden text-ink"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-electric/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-electric-bright/5 blur-[140px] rounded-full" />
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(10,132,255,0.08)_1px,transparent_1.4px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-[90rem] mx-auto relative z-10">
        {/* Section Header */}
        <div className="solutions-section-header mb-10 text-center sm:text-left">
          <span className="solutions-header-num inline-flex items-center gap-2 rounded-full border border-electric/25 bg-electric/[0.08] px-4 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-electric backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric" />
            [ 07 ] · SOLUTIONS &amp; SAAS CATALOG
          </span>
          <h2 className="solutions-header-title mt-3 font-display text-3xl font-800 tracking-tight text-ink sm:text-4xl lg:text-5xl">
            ENTERPRISE PLATFORMS <span className="text-electric">&amp; TAILORED ARCHITECTURES</span>
          </h2>
        </div>

        {/* Filter Bar */}
        <div className="solutions-filter-bar mb-14 flex flex-wrap gap-2.5 sm:gap-3">
          {solutionCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-xl border px-4 py-2 font-mono text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? "border-electric bg-electric text-white shadow-[0_4px_16px_rgba(10,132,255,0.35)]"
                  : "border-[#bcd6fa] bg-white/80 text-ink-soft hover:border-electric hover:text-electric backdrop-blur-sm"
              }`}
            >
              [ {cat.name} ]
            </button>
          ))}
        </div>

        {/* 4-Column Cyber Card Grid */}
        <div className="skills-grid pb-16">
          {filteredProjects.map((p, idx) => (
            <div
              key={p.slug}
              className={`skills-col-card ${idx % 2 === 1 ? "sm:translate-y-8" : ""}`}
            >
              <ProjectCyberCard
                project={p}
                index={idx}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
                onClick={() => setOverviewProject(p)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Phase 2: Morphing Detail / Overview Modal (Matches WebProjects) */}
      {overviewProject && (
        <ProjectOverviewModal
          project={overviewProject}
          index={filteredProjects.findIndex((p) => p.slug === overviewProject.slug)}
          onClose={() => setOverviewProject(null)}
          onOpenCaseStudy={(proj) => {
            setOverviewProject(null);
            setSelectedCaseStudy(proj);
          }}
        />
      )}

      {/* Phase 3: Full Deep-Dive Case Study Page Modal */}
      {selectedCaseStudy && (
        <ProjectModal
          project={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
        />
      )}

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
          width: 100%;
        }

        .skills-col-card {
          width: 100%;
          transition: transform 0.4s ease;
        }

        .skills-card-container {
          cursor: pointer;
          width: 100%;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: visible;
        }

        .skills-card-container:hover,
        .skills-card-container.is-active {
          transform: translateY(-8px);
        }

        .skills-card-svg {
          pointer-events: none;
          z-index: 1;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          overflow: visible;
        }

        .skills-card-fill {
          transition: fill 0.3s;
        }

        .skills-card-border-path {
          stroke: #bcd6fa;
          stroke-width: 1.2px;
          filter: none;
          transition: stroke 0.3s, stroke-width 0.3s, filter 0.3s;
        }

        .skills-card-container:hover .skills-card-border-path,
        .skills-card-container.is-active .skills-card-border-path {
          stroke: var(--card-border-stroke);
          stroke-width: 2px;
          filter: var(--card-border-glow);
        }

        .skills-card-body {
          z-index: 2;
          background: transparent;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          display: flex;
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .skills-card-cyber-grid {
          opacity: 0.15;
          z-index: 2;
          background-image: linear-gradient(rgba(10, 132, 255, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10, 132, 255, 0.2) 1px, transparent 1px);
          background-position: 50%;
          background-size: 18px 18px;
          transition: opacity 0.4s;
          position: absolute;
          inset: 0;
        }

        .skills-card-container:hover .skills-card-cyber-grid,
        .skills-card-container.is-active .skills-card-cyber-grid {
          opacity: 0.4;
        }

        .skills-card-inner-overlay {
          z-index: 3;
          background: radial-gradient(circle, rgba(10, 132, 255, 0) 30%, rgba(238, 244, 253, 0.6) 90%);
          transition: background 0.4s;
          position: absolute;
          inset: 0;
        }

        .skills-card-container:hover .skills-card-inner-overlay,
        .skills-card-container.is-active .skills-card-inner-overlay {
          background: radial-gradient(circle, rgba(10, 132, 255, 0.08) 20%, rgba(238, 244, 253, 0.85) 90%);
        }

        .skills-card-img-wrap {
          z-index: 4;
          justify-content: center;
          align-items: center;
          width: 82%;
          height: 65%;
          margin-bottom: 24px;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: flex;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px -8px rgba(10, 132, 255, 0.2);
        }

        .skills-card-img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .skills-card-container:hover .skills-card-img-wrap,
        .skills-card-container.is-active .skills-card-img-wrap {
          transform: scale(1.05);
        }

        .skills-card-info {
          z-index: 5;
          background: linear-gradient(0deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.92) 65%, transparent 100%);
          padding: 24px 18px 44px;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          transform: translateY(101%);
          backdrop-filter: blur(8px);
        }

        .skills-card-container:hover .skills-card-info,
        .skills-card-container.is-active .skills-card-info {
          transform: translateY(0);
        }

        .skills-card-label {
          z-index: 10;
          box-sizing: border-box;
          pointer-events: none;
          justify-content: flex-end;
          align-items: center;
          gap: 8px;
          padding: 0 14px 0 0;
          display: flex;
          position: absolute;
          bottom: 0;
          right: 0;
        }

        .skills-card-name {
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: #0a1428;
          white-space: nowrap;
          font-family: var(--font-sora), sans-serif;
          font-size: 11px;
          font-weight: 800;
          transition: color 0.3s;
        }

        .skills-card-level {
          white-space: nowrap;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 11px;
          font-weight: 700;
          transition: color 0.3s;
        }

        .skills-card-container.is-active .skills-card-name {
          color: #0a84ff;
        }

        @media (max-width: 1100px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }

        @media (max-width: 640px) {
          .skills-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}
