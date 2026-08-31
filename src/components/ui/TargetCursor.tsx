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
  spinDuration = 2.5,
  hideDefaultCursor = false,
  hoverDuration = 0.2,
  parallaxOn = true,
  color = "#0a84ff",
}) => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cornersRef = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const spinTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
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
    const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    return (hasTouch && isMobileWidth) || isMobileUA;
  }, []);

  const cornerConfig = useMemo(() => ({ borderWidth: 2, cornerSize: 14 }), []);

  const moveCursor = useCallback((clientX: number, clientY: number) => {
    if (!cursorRef.current) return;
    const offset = getElementOffset(offsetParentRef.current);
    gsap.to(cursorRef.current, {
      x: clientX - offset.x,
      y: clientY - offset.y,
      duration: 0.1,
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
    let resumeTimeout: NodeJS.Timeout | null = null;

    const cleanupTarget = (el: HTMLElement) => {
      if (leaveHandler) el.removeEventListener("mouseleave", leaveHandler);
      leaveHandler = null;
    };

    gsap.set(cursorEl, { xPercent: -50, yPercent: -50, x: -200, y: -200, opacity: 0 });

    if (spinTimelineRef.current) spinTimelineRef.current.kill();
    spinTimelineRef.current = gsap
      .timeline({ repeat: -1 })
      .to(cursorEl, { rotation: "+=360", duration: spinDuration, ease: "none" });

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
        gsap.to(cursorEl, { opacity: 1, duration: 0.3, ease: "power2.out" });
      }
      moveCursor(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleMouseDown = () => {
      if (dotRef.current) gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });
      if (cursorRef.current) gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });
    };

    const handleMouseUp = () => {
      if (dotRef.current) gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
      if (cursorRef.current) gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
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
      if (resumeTimeout) clearTimeout(resumeTimeout);
      activeTarget = matched;

      const corners = Array.from(cornersRef.current);
      corners.forEach((c) => gsap.killTweensOf(c));
      gsap.killTweensOf(cursorRef.current, "rotation");
      spinTimelineRef.current?.pause();
      gsap.set(cursorRef.current, { rotation: 0 });

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
          duration: 0.2,
          ease: "power2.out",
        });
      });

      const onMouseLeave = () => {
        if (tickerFnRef.current) gsap.ticker.remove(tickerFnRef.current);
        isLockedRef.current = false;
        targetCornersRef.current = null;
        gsap.set(lockProgressRef.current, { current: 0, overwrite: true });
        activeTarget = null;

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
            tl.to(c, { x: defaultPos[idx].x, y: defaultPos[idx].y, duration: 0.3, ease: "power3.out" }, 0);
          });
        }

        resumeTimeout = setTimeout(() => {
          if (!activeTarget && cursorRef.current && spinTimelineRef.current) {
            const currentRot = ((gsap.getProperty(cursorRef.current, "rotation") as number) || 0) % 360;
            spinTimelineRef.current.kill();
            spinTimelineRef.current = gsap
              .timeline({ repeat: -1 })
              .to(cursorRef.current, { rotation: "+=360", duration: spinDuration, ease: "none" });
            gsap.to(cursorRef.current, {
              rotation: currentRot + 360,
              duration: spinDuration * (1 - currentRot / 360),
              ease: "none",
              onComplete: () => {
                spinTimelineRef.current?.restart();
              },
            });
          }
          resumeTimeout = null;
        }, 50);

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
      spinTimelineRef.current?.kill();
      document.body.classList.remove("no-cursor");
      isLockedRef.current = false;
      targetCornersRef.current = null;
      lockProgressRef.current.current = 0;
    };
  }, [
    targetSelector,
    spinDuration,
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
      <div ref={cursorRef} className="target-cursor-wrapper" aria-hidden="true" style={{ "--cursor-color": color } as React.CSSProperties}>
        <div ref={dotRef} className="target-cursor-dot" />
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

        .target-cursor-dot {
          will-change: transform;
          background: var(--cursor-color, #ff334b);
          border-radius: 50%;
          width: 6px;
          height: 6px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 10px var(--cursor-color, #ff334b), 0 0 20px var(--cursor-color, #ff334b);
        }

        .target-cursor-corner {
          will-change: transform;
          filter: drop-shadow(0 0 6px var(--cursor-color, #ff334b));
          border: 2px solid var(--cursor-color, #ff334b);
          width: 14px;
          height: 14px;
          position: absolute;
          top: 50%;
          left: 50%;
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
