"use client";

import React, { useEffect, useRef, useMemo, useCallback } from "react";
import gsap from "gsap";

interface TargetCursorProps {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  hoverDuration?: number;
  parallaxOn?: boolean;
  color?: string;
}

const getOffsetParent = (element: HTMLElement | null): HTMLElement | null => {
  let parent = element?.parentElement ?? null;
  while (parent && parent !== document.documentElement) {
    const style = getComputedStyle(parent);
    if (
      style.transform !== "none" ||
      style.perspective !== "none" ||
      style.filter !== "none" ||
      style.willChange.includes("transform") ||
      style.willChange.includes("perspective") ||
      style.willChange.includes("filter") ||
      /paint|layout|strict|content/.test(style.contain)
    ) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return null;
};

const getElementOffset = (el: HTMLElement | null): { x: number; y: number } => {
  if (!el) return { x: 0, y: 0 };
  const rect = el.getBoundingClientRect();
  return { x: rect.left + el.clientLeft, y: rect.top + el.clientTop };
};

export const TargetCursor: React.FC<TargetCursorProps> = ({
  targetSelector = "button, a, [role='button'], .cursor-target, .projects-case-study-btn",
  hideDefaultCursor = false,
  hoverDuration = 0.2,
  parallaxOn = true,
  color = "#0a84ff",
}) => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const caretRef = useRef<HTMLDivElement | null>(null);
  const cornersRef = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const offsetParentRef = useRef<HTMLElement | null>(null);
  const isLockedRef = useRef(false);
  const isVisibleRef = useRef(false);
  const targetCornersRef = useRef<{ x: number; y: number }[] | null>(null);
  const tickerFnRef = useRef<(() => void) | null>(null);
  const lockProgressRef = useRef({ current: 0 });

  const isTouchDevice = useMemo(() => {
    if (typeof window === "undefined") return false;
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isMobileWidth = window.innerWidth <= 768;
    const userAgent = navigator.userAgent || "";
    const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent.toLowerCase()
    );
    return (hasTouch && isMobileWidth) || isMobileUA;
  }, []);

  const cornerConfig = useMemo(() => ({ borderWidth: 2, cornerSize: 14 }), []);

  const moveCursor = useCallback((clientX: number, clientY: number) => {
    if (!cursorRef.current) return;
    const offset = getElementOffset(offsetParentRef.current);
    gsap.to(cursorRef.current, {
      x: clientX - offset.x,
      y: clientY - offset.y,
      duration: 0.08,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    if (isTouchDevice || !cursorRef.current) return;
    if (hideDefaultCursor) document.body.classList.add("no-cursor");

    const cursorEl = cursorRef.current;
    cornersRef.current = cursorEl.querySelectorAll(".target-cursor-corner");
    offsetParentRef.current = getOffsetParent(cursorEl);

    const getOffset = () => getElementOffset(offsetParentRef.current);

    let activeTarget: HTMLElement | null = null;
    let leaveHandler: (() => void) | null = null;

    const cleanupTarget = (el: HTMLElement) => {
      if (leaveHandler) el.removeEventListener("mouseleave", leaveHandler);
      leaveHandler = null;
    };

    // Initial positioning off-screen; normal state shows blinking IDE caret, corners hidden
    gsap.set(cursorEl, { xPercent: -50, yPercent: -50, x: -200, y: -200, opacity: 0, rotation: 0 });
    if (caretRef.current) gsap.set(caretRef.current, { opacity: 1 });
    if (cornersRef.current) gsap.set(cornersRef.current, { opacity: 0 });

    tickerFnRef.current = () => {
      if (!targetCornersRef.current || !cursorRef.current || !cornersRef.current) return;
      const progress = lockProgressRef.current.current;
      if (progress === 0) return;

      const cursorX = gsap.getProperty(cursorRef.current, "x") as number;
      const cursorY = gsap.getProperty(cursorRef.current, "y") as number;

      Array.from(cornersRef.current).forEach((corner, idx) => {
        const curX = gsap.getProperty(corner, "x") as number;
        const curY = gsap.getProperty(corner, "y") as number;
        const targetX = targetCornersRef.current![idx].x - cursorX;
        const targetY = targetCornersRef.current![idx].y - cursorY;

        const nextX = curX + (targetX - curX) * progress;
        const nextY = curY + (targetY - curY) * progress;
        const dur = progress >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;

        gsap.to(corner, {
          x: nextX,
          y: nextY,
          duration: dur,
          ease: dur === 0 ? "none" : "power1.out",
          overwrite: "auto",
        });
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        gsap.to(cursorEl, { opacity: 1, duration: 0.25, ease: "power2.out" });
      }
      moveCursor(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleMouseDown = () => {
      if (caretRef.current) gsap.to(caretRef.current, { scaleY: 0.7, duration: 0.15 });
      if (cursorRef.current && isLockedRef.current) gsap.to(cursorRef.current, { scale: 0.95, duration: 0.15 });
    };

    const handleMouseUp = () => {
      if (caretRef.current) gsap.to(caretRef.current, { scaleY: 1, duration: 0.15 });
      if (cursorRef.current && isLockedRef.current) gsap.to(cursorRef.current, { scale: 1, duration: 0.15 });
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      let el = target;
      while (el && el !== document.body) {
        if (el.matches(targetSelector)) break;
        el = el.parentElement;
      }
      const matched = el && el !== document.body ? el : null;

      if (!matched || !cursorRef.current || !cornersRef.current || activeTarget === matched) {
        return;
      }

      if (activeTarget) cleanupTarget(activeTarget);
      activeTarget = matched;

      const corners = Array.from(cornersRef.current);
      corners.forEach((c) => gsap.killTweensOf(c));
      gsap.set(cursorRef.current, { rotation: 0 });

      // Focus effect: Fade out IDE caret, fade in target corners
      if (caretRef.current) {
        gsap.to(caretRef.current, { opacity: 0, duration: 0.15 });
      }
      gsap.to(corners, { opacity: 1, duration: 0.2 });

      const rect = matched.getBoundingClientRect();
      const { borderWidth, cornerSize } = cornerConfig;
      const offset = getOffset();
      const cursorX = gsap.getProperty(cursorRef.current, "x") as number;
      const cursorY = gsap.getProperty(cursorRef.current, "y") as number;

      targetCornersRef.current = [
        { x: rect.left - borderWidth - offset.x, y: rect.top - borderWidth - offset.y },
        { x: rect.right + borderWidth - cornerSize - offset.x, y: rect.top - borderWidth - offset.y },
        {
          x: rect.right + borderWidth - cornerSize - offset.x,
          y: rect.bottom + borderWidth - cornerSize - offset.y,
        },
        { x: rect.left - borderWidth - offset.x, y: rect.bottom + borderWidth - cornerSize - offset.y },
      ];

      isLockedRef.current = true;
      if (tickerFnRef.current) gsap.ticker.add(tickerFnRef.current);
      gsap.to(lockProgressRef.current, { current: 1, duration: hoverDuration, ease: "power2.out" });

      corners.forEach((c, idx) => {
        gsap.to(c, {
          x: targetCornersRef.current![idx].x - cursorX,
          y: targetCornersRef.current![idx].y - cursorY,
          duration: 0.22,
          ease: "power2.out",
        });
      });

      const onMouseLeave = () => {
        if (tickerFnRef.current) gsap.ticker.remove(tickerFnRef.current);
        isLockedRef.current = false;
        targetCornersRef.current = null;
        gsap.set(lockProgressRef.current, { current: 0, overwrite: true });
        activeTarget = null;

        // Reset corners to center and fade out
        if (cornersRef.current) {
          const cornersList = Array.from(cornersRef.current);
          cornersList.forEach((c) => gsap.killTweensOf(c));
          const { cornerSize: s } = cornerConfig;
          const defaultPos = [
            { x: -s * 1.5, y: -s * 1.5 },
            { x: s * 0.5, y: -s * 1.5 },
            { x: s * 0.5, y: s * 0.5 },
            { x: -s * 1.5, y: s * 0.5 },
          ];
          const tl = gsap.timeline();
          cornersList.forEach((c, idx) => {
            tl.to(
              c,
              { x: defaultPos[idx].x, y: defaultPos[idx].y, opacity: 0, duration: 0.22, ease: "power3.out" },
              0
            );
          });
        }

        // Return to normal: Fade in IDE blinking caret
        if (caretRef.current) {
          gsap.to(caretRef.current, { opacity: 1, duration: 0.2, delay: 0.05 });
        }

        cleanupTarget(matched);
      };

      leaveHandler = onMouseLeave;
      matched.addEventListener("mouseleave", onMouseLeave);
    };

    window.addEventListener("mouseover", handleMouseOver);

    const handleResize = () => {
      offsetParentRef.current = getOffsetParent(cursorEl);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (tickerFnRef.current) gsap.ticker.remove(tickerFnRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      if (activeTarget) cleanupTarget(activeTarget);
      document.body.classList.remove("no-cursor");
      isLockedRef.current = false;
      targetCornersRef.current = null;
      lockProgressRef.current.current = 0;
    };
  }, [
    targetSelector,
    moveCursor,
    cornerConfig,
    hideDefaultCursor,
    isTouchDevice,
    hoverDuration,
    parallaxOn,
  ]);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="target-cursor-wrapper"
        aria-hidden="true"
        style={{ "--cursor-color": color } as React.CSSProperties}
      >
        {/* IDE Blinking Cursor (Normal State) */}
        <div ref={caretRef} className="ide-blinking-cursor" />

        {/* 4 Corners (Focus / Lock State on targets) */}
        <div className="target-cursor-corner corner-tl" />
        <div className="target-cursor-corner corner-tr" />
        <div className="target-cursor-corner corner-br" />
        <div className="target-cursor-corner corner-bl" />
      </div>

      <style jsx global>{`
        .target-cursor-wrapper {
          pointer-events: none;
          z-index: 999999;
          width: 0;
          height: 0;
          position: fixed;
          top: 0;
          left: 0;
          transform: translate(-50%, -50%);
        }

        /* IDE Blinking Caret (Active during normal mouse movement) */
        .ide-blinking-cursor {
          width: 2.5px;
          height: 20px;
          background-color: var(--cursor-color, #0a84ff);
          border-radius: 1px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 8px rgba(10, 132, 255, 0.6), 0 0 2px rgba(10, 132, 255, 0.9);
          animation: ideCaretBlink 0.95s steps(1) infinite;
          will-change: opacity, transform;
          pointer-events: none;
        }

        @keyframes ideCaretBlink {
          0%, 49% {
            opacity: 1;
          }
          50%, 100% {
            opacity: 0;
          }
        }

        /* Target Corners (Visible only when hovering over interactive elements) */
        .target-cursor-corner {
          will-change: transform, opacity;
          opacity: 0;
          filter: drop-shadow(0 0 6px var(--cursor-color, #0a84ff));
          border: 2px solid var(--cursor-color, #0a84ff);
          width: 14px;
          height: 14px;
          position: absolute;
          top: 50%;
          left: 50%;
          pointer-events: none;
        }

        .corner-tl {
          border-bottom: none;
          border-right: none;
          transform: translate(-150%, -150%);
        }

        .corner-tr {
          border-bottom: none;
          border-left: none;
          transform: translate(50%, -150%);
        }

        .corner-br {
          border-top: none;
          border-left: none;
          transform: translate(50%, 50%);
        }

        .corner-bl {
          border-top: none;
          border-right: none;
          transform: translate(-150%, 50%);
        }
      `}</style>
    </>
  );
};

export default TargetCursor;
