"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import SplitType from "@/lib/split-type";
import { Project } from "@/types/portfolio";

interface ProjectOverviewModalProps {
  project: Project;
  index?: number;
  onClose: () => void;
  onOpenCaseStudy: (project: Project) => void;
}

export const ProjectOverviewModal: React.FC<ProjectOverviewModalProps> = ({
  project,
  index = 0,
  onClose,
  onOpenCaseStudy,
}) => {
  const overlayRef     = useRef<HTMLDivElement | null>(null);
  const wrapperRef     = useRef<HTMLDivElement | null>(null);
  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  const imgRef         = useRef<HTMLImageElement | null>(null);
  const cursorRef      = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const isClosingRef   = useRef(false);

  // ─── mount / scroll-lock ──────────────────────────────────────────────────
  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // ─── animations + SplitType ───────────────────────────────────────────────
  useEffect(() => {
    if (!mounted || !overlayRef.current || !wrapperRef.current || !imgContainerRef.current) return;

    /* ── cursor follower ── */
    let mouseRaf: number | null = null;
    let curX = 0, curY = 0, targetX = 0, targetY = 0;

    const renderCursor = () => {
      curX += (targetX - curX) * 0.15;
      curY += (targetY - curY) * 0.15;
      if (cursorRef.current)
        cursorRef.current.style.transform = `translate3d(${curX}px,${curY}px,0)`;
      mouseRaf = requestAnimationFrame(renderCursor);
    };

    const onMouseMove = (e: MouseEvent) => {
      const r = cursorRef.current?.getBoundingClientRect();
      if (r) {
        targetX = e.clientX - r.width  * 0.5;
        targetY = e.clientY - r.height * 0.5;
        if (!mouseRaf) mouseRaf = requestAnimationFrame(renderCursor);
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    /* ── SplitType - exact same logic as WebProjects ── */
    const titleTopNode    = wrapperRef.current.querySelector<HTMLElement>("[data-text-top] div");
    const titleBottomNode = wrapperRef.current.querySelector<HTMLElement>("[data-text-bottom] div");
    const textLeftNodes   = wrapperRef.current.querySelectorAll<HTMLElement>("[data-text-left] div");
    const textRightNodes  = wrapperRef.current.querySelectorAll<HTMLElement>("[data-text-right] div");

    const reverts: SplitType[] = [];

    let ttSplit: SplitType | null = null;
    let tbSplit: SplitType | null = null;

    if (titleTopNode) {
      ttSplit = new SplitType(titleTopNode, { types: "chars" });
      reverts.push(ttSplit);
      ttSplit.chars?.forEach(ch => {
        const w = document.createElement("div");
        w.classList.add("char-wrap");
        ch.parentNode?.insertBefore(w, ch);
        w.appendChild(ch);
      });
    }

    if (titleBottomNode) {
      tbSplit = new SplitType(titleBottomNode, { types: "chars" });
      reverts.push(tbSplit);
      tbSplit.chars?.forEach(ch => {
        const w = document.createElement("div");
        w.classList.add("char-wrap");
        ch.parentNode?.insertBefore(w, ch);
        w.appendChild(ch);
      });
    }

    const wrapLines = (nodes: NodeListOf<HTMLElement>) =>
      Array.from(nodes, el => {
        const s = new SplitType(el, { types: "lines" });
        reverts.push(s);
        s.lines?.forEach(line => {
          const wrap = document.createElement("div");
          wrap.className = "line-wrap";
          wrap.style.cssText = "display:inline-block;margin-right:0.32em;vertical-align:baseline;overflow:hidden;";
          line.parentNode?.insertBefore(wrap, line);
          wrap.appendChild(line);
        });
        return s;
      });

    const tlSplits = wrapLines(textLeftNodes);
    const trSplits = wrapLines(textRightNodes);

    /* ── OPEN TIMELINE - mirrors WebProjects openDetail exactly ── */
    const tl = gsap.timeline({
      onComplete: () => { cursorRef.current?.classList.add("is-open"); },
    }).addLabel("start", 0);

    // 1. Backdrop fade-in (instant reveal, WebProjects uses visibility toggle)
    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" },
      "start"
    );

    // 2. Image counter-pan settle - matches  tl.to(img, { xPercent: 0, duration: 1.25, ease: "power4.inOut" })
    //    We start slightly offset so it "slides into" the frame, same as the Flip origin offset.
    if (imgRef.current) {
      tl.fromTo(imgRef.current,
        { xPercent: 8, scale: 1.12 },
        { xPercent: 0, scale: 1, duration: 1.25, ease: "power4.inOut" },
        "start"
      );
    }

    // 3. Image container itself morphs into position (simulating Flip.from expanding)
    //    In WebProjects the Flip transitions the node from 32vw card → 48vw wrapper.
    //    We replicate this with a clip-path + scale bloom identical in feel.
    tl.fromTo(imgContainerRef.current,
      { clipPath: "inset(100% 0 0 0)", scale: 0.88 },
      { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1.25, ease: "power4.inOut" },
      "start"
    );

    // 4. Title chars reveal - starts at "start+=1.25" same as WebProjects
    if (ttSplit) {
      tl.fromTo((ttSplit as any)?.elements ?? [],
        { xPercent: 15 },
        { xPercent: 0, duration: 1, ease: "power3.out" },
        "start+=1.25"
      );
    }

    tl.fromTo(
      [...(ttSplit?.chars ?? []), ...(tbSplit?.chars ?? [])],
      { clipPath: "inset(0 100% 0 0)", xPercent: 10 },
      { clipPath: "inset(0 0% 0 0)", xPercent: 0, duration: 0.75, ease: "power3.out" },
      "start+=1.25"
    );

    // 5. Side-text lines cascade - starts at "start+=1.2" same as WebProjects
    tl.fromTo(
      [
        ...tlSplits.flatMap(e => e.lines ?? []),
        ...trSplits.flatMap(e => e.lines ?? []),
      ],
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, stagger: 0.025, duration: 0.6, ease: "power3.out" },
      "start+=1.2"
    );

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (mouseRaf) cancelAnimationFrame(mouseRaf);
      reverts.forEach(s => { try { s.revert(); } catch { /**/ } });
    };
  }, [mounted, project]);

  /* ── CLOSE ─────────────────────────────────────────────────────────────── */
  const handleClose = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    cursorRef.current?.classList.remove("is-open");

    if (!overlayRef.current || !wrapperRef.current) { onClose(); return; }

    const allChars = wrapperRef.current.querySelectorAll<HTMLElement>(".char-wrap");
    const allLines = wrapperRef.current.querySelectorAll<HTMLElement>(".line-wrap");

    const tl = gsap.timeline({ onComplete: onClose }).addLabel("start", 0);

    // Mirror closeDetail from WebProjects - text exits first at "start"
    if (allChars.length)
      tl.fromTo(allChars,
        { clipPath: "inset(0 0% 0 0)", xPercent: 0 },
        { clipPath: "inset(0 100% 0 0)", xPercent: 10, ease: "power3.out", duration: 0.75 },
        "start"
      );

    if (allLines.length)
      tl.to(allLines,
        { yPercent: 100, opacity: 0, stagger: 0.02, duration: 0.75 },
        "start"
      );

    // Image container wipes back out
    if (imgContainerRef.current) {
      tl.to(imgContainerRef.current,
        { clipPath: "inset(0 0 100% 0)", scale: 0.88, duration: 1.1, ease: "power4.inOut" },
        "start+=0.2"
      );
    }

    if (imgRef.current) {
      tl.to(imgRef.current,
        { xPercent: -6, scale: 1.1, duration: 1.1, ease: "power4.inOut" },
        "start+=0.2"
      );
    }

    tl.to(overlayRef.current,
      { opacity: 0, duration: 0.35, ease: "power2.in" },
      "start+=0.8"
    );
  };

  if (!mounted || typeof document === "undefined") return null;

  const isAlt = (index % 2 !== 0);

  return createPortal(
    <div
      ref={overlayRef}
      className="ovm-overlay"
      onClick={e => {
        if ((e.target as HTMLElement).closest(".ovm-csb")) return;
        handleClose();
      }}
      onMouseEnter={() => cursorRef.current?.classList.add("is-visible")}
      onMouseLeave={() => cursorRef.current?.classList.remove("is-visible")}
    >
      {/* ── Custom Cross Cursor (1:1 WebProjects) ── */}
      <div ref={cursorRef} className="ovm-cursor">
        <div className="ovm-cross" />
      </div>

      {/* ── Centre card (same structure as projects-content / projects-content-wrapper) ── */}
      <div
        ref={wrapperRef}
        className={`ovm-wrapper rounded-3xl border border-[#bcd6fa] bg-white/90 shadow-[0_30px_90px_rgba(10,132,255,0.3)] backdrop-blur-md ${isAlt ? "is-alt" : ""}`}
        onClick={e => {
          if ((e.target as HTMLElement).closest(".ovm-csb")) return;
          handleClose();
        }}
      >
        {/* Big display titles - same as projects-title-top/bottom */}
        <div className="ovm-title-top" data-text-top="true">
          <div className="ovm-title-big font-display text-ink">{project.titleTop}</div>
        </div>
        <div className="ovm-title-bottom" data-text-bottom="true">
          <div className="ovm-title-big font-display text-electric">{project.titleBottom}</div>
        </div>

        {/* Image container - mirrors projects-image-container exactly */}
        <div
          ref={imgContainerRef}
          className="ovm-img-container rounded-2xl border border-[#bcd6fa] shadow-[0_20px_45px_-15px_rgba(10,132,255,0.25)]"
        >
          <img
            ref={imgRef}
            src={project.image}
            alt={project.alt || project.title}
            className="ovm-img"
          />
        </div>

        {/* Left spec block - same as projects-text-left */}
        <div className="ovm-text-left" data-text-left="true">
          <div className="ovm-label font-mono text-electric">{project.labelLeft}</div>
          <div className="ovm-para font-sans text-ink-soft">{project.descLeft}</div>
        </div>

        {/* Right spec block + CTA - same as projects-text-right */}
        <div className="ovm-text-right" data-text-right="true">
          <div className="ovm-label font-mono text-electric">{project.labelRight}</div>
          <div className="ovm-para font-sans text-ink-soft">{project.descRight}</div>

          {project.caseStudy && (
            <button
              type="button"
              className="ovm-csb font-display cursor-pointer"
              onClick={e => { e.preventDefault(); e.stopPropagation(); onOpenCaseStudy(project); }}
              onMouseEnter={() => cursorRef.current?.classList.remove("is-visible")}
              onMouseLeave={() => cursorRef.current?.classList.add("is-visible")}
            >
              <span>Case Study Brief</span>
              <svg className="ovm-arrow" viewBox="0 0 24 24" width="18" height="18">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <style jsx global>{`
        /* ── overlay ───────────────────────────────────────────── */
        .ovm-overlay {
          position: fixed;
          inset: 0;
          z-index: 99990;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(238, 244, 253, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          overflow: hidden;
          cursor: pointer;
        }

        /* ── centre card - mirrors .projects-content-wrapper ─── */
        .ovm-wrapper {
          aspect-ratio: 16/10;
          cursor: pointer;
          width: clamp(340px, 48vw, 760px);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── image container - mirrors .projects-image-container ── */
        .ovm-img-container {
          width: 100%;
          height: 100%;
          aspect-ratio: 16/10;
          position: relative;
          overflow: hidden;
          background: #dbe8fc;
          will-change: transform, clip-path;
        }

        /* ── inner image - mirrors .projects-image-container img ── */
        .ovm-img {
          object-fit: cover;
          will-change: transform;
          width: 100%;
          height: 100%;
          display: block;
          position: absolute;
          top: 0;
          left: 0;
        }

        /* ── big display titles - mirrors .projects-title-top/bottom ── */
        .ovm-title-top,
        .ovm-title-bottom {
          z-index: 10;
          pointer-events: none;
          align-items: center;
          width: 100%;
          margin: 0;
          display: flex;
          position: absolute;
        }

        .ovm-title-top {
          justify-content: flex-start;
          bottom: 100%;
          transform: translateY(22%);
        }

        .ovm-title-bottom {
          justify-content: flex-end;
          top: 100%;
          left: 0;
          transform: translateY(-22%);
        }

        .ovm-wrapper.is-alt .ovm-title-top  { justify-content: flex-end;   }
        .ovm-wrapper.is-alt .ovm-title-bottom { justify-content: flex-start; }

        .ovm-title-big {
          letter-spacing: -0.03em;
          text-transform: uppercase;
          white-space: nowrap;
          font-size: clamp(2.2rem, 4.8vw, 4.6rem);
          font-weight: 800;
          line-height: 0.9em;
        }

        /* ── side spec columns - mirrors .projects-text-left/right ── */
        .ovm-text-left,
        .ovm-text-right {
          flex-direction: column;
          width: clamp(160px, 18vw, 260px);
          height: 100%;
          justify-content: center;
          display: flex;
          position: absolute;
          top: 0;
        }

        .ovm-text-left {
          text-align: right;
          align-items: flex-end;
          padding-right: 1.5rem;
          right: 100%;
        }

        .ovm-text-right {
          text-align: left;
          align-items: flex-start;
          padding-left: 1.5rem;
          left: 100%;
        }

        .ovm-label {
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 0.5em;
          font-size: clamp(0.75rem, 0.9vw, 1.1rem);
          font-weight: 800;
          line-height: 1.2;
          overflow: hidden;
        }

        .ovm-para {
          white-space: normal;
          width: 100%;
          font-size: clamp(0.75rem, 0.85vw, 1.05rem);
          font-weight: 500;
          line-height: 1.5;
          display: block;
          overflow: hidden;
        }

        /* ── split helpers (shared with WebProjects) ── */
        .line, .word, .line-wrap, .char-wrap { overflow: hidden; }
        .line-wrap, .char-wrap { display: inline-block; vertical-align: baseline; }
        .line-wrap { margin-right: 0.28em; }

        /* ── custom cross cursor - identical to WebProjects ── */
        .ovm-cursor {
          z-index: 99999;
          pointer-events: none;
          opacity: 0;
          width: 1.1rem;
          height: 1.1rem;
          transition: opacity 0.4s cubic-bezier(0.215,.61,.355,1);
          position: fixed;
          top: 0; left: 0;
        }
        .ovm-cursor.is-visible { opacity: 1; }
        .ovm-cursor.is-open .ovm-cross { transform: rotate(360deg); }

        .ovm-cross {
          backdrop-filter: blur(8px);
          background: rgba(10,132,255,0.25);
          border: 1.2px solid #0a84ff;
          border-radius: 50%;
          width: 100%; height: 100%;
          transition: transform 0.5s cubic-bezier(0.215,.61,.355,1);
          position: absolute;
          transform: rotate(45deg);
        }
        .ovm-cross:before, .ovm-cross:after {
          content: "";
          background: #0a1428;
          width: calc(100% - 0.35rem);
          height: 1.5px;
          position: absolute;
          top: 50%; left: 50%;
        }
        .ovm-cross:after  { transform: translate(-50%,-50%) rotate(-45deg); }
        .ovm-cross:before { transform: translate(-50%,-50%) rotate(45deg);  }

        /* ── case-study button - identical to WebProjects ── */
        .ovm-csb {
          color: #0a1428;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          cursor: pointer;
          z-index: 20;
          background: rgba(10,132,255,0.08);
          border: 1px solid rgba(10,132,255,0.4);
          border-radius: 6px;
          align-items: center;
          gap: 0.6rem;
          width: fit-content;
          margin-top: 1.25rem;
          padding: 0.65rem 1.3rem;
          font-family: var(--font-sora), sans-serif;
          font-size: clamp(0.7rem, 0.75vw, 0.85rem);
          font-weight: 700;
          transition: all 0.3s cubic-bezier(0.25,.46,.45,.94);
          display: inline-flex;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 18px rgba(10,132,255,0.15);
        }
        .ovm-csb:before {
          content: "";
          background: linear-gradient(90deg, transparent, rgba(56,189,248,0.45), transparent);
          width: 100%; height: 100%;
          transition: all 0.6s;
          position: absolute;
          top: 0; left: -100%;
        }
        .ovm-csb:hover:before { left: 100%; }
        .ovm-csb:hover {
          color: #0a84ff;
          background: rgba(10,132,255,0.16);
          border-color: #0a84ff;
          box-shadow: 0 0 24px rgba(10,132,255,0.4);
        }
        .ovm-arrow {
          color: #0a84ff;
          transition: transform 0.3s cubic-bezier(0.25,.46,.45,.94);
        }
        .ovm-csb:hover .ovm-arrow { transform: translate(4px); }
      `}</style>
    </div>,
    document.body
  );
};
