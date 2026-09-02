"use client";

import { useRef, useEffect } from "react";

type Falloff = "linear" | "smooth" | "sharp";

export interface CursorGridProps {
  cellSize?: number;
  color?: string;
  radius?: number;
  falloff?: Falloff;
  holdTime?: number;
  fadeDuration?: number;
  lineWidth?: number;
  maxOpacity?: number;
  fillOpacity?: number;
  gridOpacity?: number;
  cellRadius?: number;
  clickPulse?: boolean;
  pulseSpeed?: number;
  ambient?: boolean;
  ambientDensity?: number;
  ambientMaxAlpha?: number;
  className?: string;
}

interface GridConfig {
  cellSize: number;
  color: string;
  radius: number;
  falloff: Falloff;
  holdTime: number;
  fadeDuration: number;
  lineWidth: number;
  maxOpacity: number;
  fillOpacity: number;
  gridOpacity: number;
  cellRadius: number;
  clickPulse: boolean;
  pulseSpeed: number;
  ambient: boolean;
  ambientDensity: number;
  ambientMaxAlpha: number;
}

interface Pulse {
  x: number;
  y: number;
  t0: number;
}

interface AmbientCell {
  index: number;
  baseAlpha: number;
  phase: number;
  speed: number;
}

// Flowing circuit data packet
interface CircuitStream {
  points: [number, number][];
  speed: number;
  length: number;
  offset: number;
  color: string;
}

const FALLOFF_CURVES: Record<Falloff, (t: number) => number> = {
  linear: (t) => t,
  smooth: (t) => t * t * (3 - 2 * t),
  sharp: (t) => t * t * t,
};

const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace("#", "");
  const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const num = parseInt(v.slice(0, 6), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

function pseudoRandom(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123;
  return n - Math.floor(n);
}

const CursorGrid = ({
  cellSize = 56,
  color = "#0a84ff",
  radius = 175,
  falloff = "smooth",
  holdTime = 400,
  fadeDuration = 700,
  lineWidth = 1.3,
  maxOpacity = 0.75,
  fillOpacity = 0.08,
  gridOpacity = 0.07,
  cellRadius = 6,
  clickPulse = true,
  pulseSpeed = 600,
  ambient = true,
  ambientDensity = 0.28,
  ambientMaxAlpha = 0.42,
  className = "",
}: CursorGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const propsRef = useRef<GridConfig>({} as GridConfig);
  const wakeRef = useRef<(() => void) | null>(null);

  propsRef.current = {
    cellSize,
    color,
    radius,
    falloff,
    holdTime,
    fadeDuration,
    lineWidth,
    maxOpacity,
    fillOpacity,
    gridOpacity,
    cellRadius,
    clickPulse,
    pulseSpeed,
    ambient,
    ambientDensity,
    ambientMaxAlpha,
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let cols = 0;
    let rows = 0;
    let offX = 0;
    let offY = 0;
    let alphas = new Float32Array(0);
    let touched = new Float64Array(0);
    let ambientMap = new Map<number, AmbientCell>();
    let w = 0;
    let h = 0;
    const pulses: Pulse[] = [];
    const streams: CircuitStream[] = [];
    let raf = 0;
    let running = false;
    let lastFrame = 0;

    const rebuild = () => {
      const p = propsRef.current;
      w = container.offsetWidth;
      h = container.offsetHeight;
      if (w === 0 || h === 0) return;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / p.cellSize) + 1;
      rows = Math.ceil(h / p.cellSize) + 1;
      offX = (w - cols * p.cellSize) / 2;
      offY = (h - rows * p.cellSize) / 2;
      alphas = new Float32Array(cols * rows);
      touched = new Float64Array(cols * rows);

      // Create structured, crafted ambient clusters ONLY on the right side
      ambientMap.clear();
      if (p.ambient) {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const normX = c / cols;
            // Keep left text area 100% clean and free of default background boxes
            if (normX < 0.48) continue;

            const idx = r * cols + c;
            const rand = pseudoRandom(c + 1, r + 1);
            
            // Cluster density on the right side framing the globe
            const normY = r / rows;
            const clusterBias = Math.sin(normY * Math.PI) * 0.15 + (normX > 0.6 ? 0.15 : 0);

            if (rand < p.ambientDensity + clusterBias) {
              const rand2 = pseudoRandom(c + 13.5, r + 7.1);
              const rand3 = pseudoRandom(c + 91.2, r + 43.8);
              ambientMap.set(idx, {
                index: idx,
                baseAlpha: p.ambientMaxAlpha * (0.5 + 0.5 * rand2),
                phase: rand3 * Math.PI * 2,
                speed: 0.7 + 0.8 * rand,
              });
            }
          }
        }
      }

      // Generate flowing architectural circuit paths (right side only)
      streams.length = 0;
      if (w > 200 && h > 200) {
        const step = p.cellSize;
        // Stream 1: Top right across and down
        streams.push({
          points: [
            [offX + step * 10, offY + step * 1],
            [offX + step * 14, offY + step * 1],
            [offX + step * 14, offY + step * 4],
            [offX + step * 18, offY + step * 4],
          ],
          speed: 0.18,
          length: step * 3,
          offset: 0,
          color: "#38bdf8",
        });
        // Stream 2: Right globe outer boundary weave
        streams.push({
          points: [
            [offX + step * 11, offY + step * 3],
            [offX + step * 16, offY + step * 3],
            [offX + step * 16, offY + step * 7],
            [offX + step * 19, offY + step * 7],
          ],
          speed: 0.22,
          length: step * 3.5,
          offset: 0.5,
          color: "#0a84ff",
        });
      }
    };

    const cellCenter = (i: number): [number, number] => {
      const p = propsRef.current;
      const cx = offX + (i % cols) * p.cellSize + p.cellSize / 2;
      const cy = offY + Math.floor(i / cols) * p.cellSize + p.cellSize / 2;
      return [cx, cy];
    };

    const energize = (x: number, y: number, boost?: number) => {
      const p = propsRef.current;
      const r = Math.max(p.radius, 1);
      const ease = FALLOFF_CURVES[p.falloff] ?? FALLOFF_CURVES.linear;
      const now = performance.now();
      const minCol = Math.max(0, Math.floor((x - r - offX) / p.cellSize));
      const maxCol = Math.min(cols - 1, Math.floor((x + r - offX) / p.cellSize));
      const minRow = Math.max(0, Math.floor((y - r - offY) / p.cellSize));
      const maxRow = Math.min(rows - 1, Math.floor((y + r - offY) / p.cellSize));
      for (let cRow = minRow; cRow <= maxRow; cRow++) {
        for (let cCol = minCol; cCol <= maxCol; cCol++) {
          const i = cRow * cols + cCol;
          const [cx, cy] = cellCenter(i);
          const dist = Math.hypot(cx - x, cy - y);
          if (dist > r) continue;
          const level = ease(1 - dist / r) * p.maxOpacity * (boost ?? 1);
          if (level > alphas[i]) {
            alphas[i] = level;
            touched[i] = now;
          } else if (level > 0) {
            touched[i] = now;
          }
        }
      }
    };

    const draw = (now: number) => {
      const p = propsRef.current;
      const dt = Math.min(now - lastFrame, 50);
      lastFrame = now;
      ctx.clearRect(0, 0, w, h);
      const [cr, cg, cb] = hexToRgb(p.color);

      // 1. High-precision background coordinate grid lines
      if (p.gridOpacity > 0) {
        ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${p.gridOpacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let cCol = 0; cCol <= cols; cCol++) {
          const x = Math.round(offX + cCol * p.cellSize) + 0.5;
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
        }
        for (let cRow = 0; cRow <= rows; cRow++) {
          const y = Math.round(offY + cRow * p.cellSize) + 0.5;
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
        }
        ctx.stroke();

        // 2. High-precision intersection micro-crosshairs (+) at vertices
        ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${p.gridOpacity * 3.2})`;
        ctx.lineWidth = 1.2;
        const arm = 3.5;
        ctx.beginPath();
        for (let cCol = 0; cCol <= cols; cCol++) {
          const x = Math.round(offX + cCol * p.cellSize) + 0.5;
          for (let cRow = 0; cRow <= rows; cRow++) {
            const y = Math.round(offY + cRow * p.cellSize) + 0.5;
            ctx.moveTo(x - arm, y);
            ctx.lineTo(x + arm, y);
            ctx.moveTo(x, y - arm);
            ctx.lineTo(x, y + arm);
          }
        }
        ctx.stroke();
      }

      // 3. Flowing circuit stream paths with glowing heads
      for (const st of streams) {
        if (st.points.length < 2) continue;
        ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, 0.12)`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(st.points[0][0], st.points[0][1]);
        for (let i = 1; i < st.points.length; i++) {
          ctx.lineTo(st.points[i][0], st.points[i][1]);
        }
        ctx.stroke();

        // Traveling light packet
        const t = ((now * 0.0003 * st.speed + st.offset) % 1);
        // compute point along polyline
        let totalLen = 0;
        const segmentLens: number[] = [];
        for (let i = 0; i < st.points.length - 1; i++) {
          const segLen = Math.hypot(
            st.points[i + 1][0] - st.points[i][0],
            st.points[i + 1][1] - st.points[i][1]
          );
          segmentLens.push(segLen);
          totalLen += segLen;
        }

        let targetDist = t * totalLen;
        let px = st.points[0][0];
        let py = st.points[0][1];
        for (let i = 0; i < segmentLens.length; i++) {
          if (targetDist <= segmentLens[i]) {
            const segRatio = segmentLens[i] > 0 ? targetDist / segmentLens[i] : 0;
            px = st.points[i][0] + (st.points[i + 1][0] - st.points[i][0]) * segRatio;
            py = st.points[i][1] + (st.points[i + 1][1] - st.points[i][1]) * segRatio;
            break;
          }
          targetDist -= segmentLens[i];
        }

        // Glowing packet beacon
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = st.color;
        ctx.shadowColor = st.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 4. Expanding click pulses
      for (let pi = pulses.length - 1; pi >= 0; pi--) {
        const pulse = pulses[pi];
        const age = (now - pulse.t0) / 1000;
        const ringR = age * p.pulseSpeed;
        if (ringR > Math.hypot(w, h)) {
          pulses.splice(pi, 1);
          continue;
        }
        const band = p.cellSize;
        const minCol = Math.max(0, Math.floor((pulse.x - ringR - band - offX) / p.cellSize));
        const maxCol = Math.min(cols - 1, Math.floor((pulse.x + ringR + band - offX) / p.cellSize));
        const minRow = Math.max(0, Math.floor((pulse.y - ringR - band - offY) / p.cellSize));
        const maxRow = Math.min(rows - 1, Math.floor((pulse.y + ringR + band - offY) / p.cellSize));
        for (let cRow = minRow; cRow <= maxRow; cRow++) {
          for (let cCol = minCol; cCol <= maxCol; cCol++) {
            const i = cRow * cols + cCol;
            const [cx, cy] = cellCenter(i);
            const dist = Math.hypot(cx - pulse.x, cy - pulse.y);
            if (Math.abs(dist - ringR) < band / 2 && p.maxOpacity > alphas[i]) {
              alphas[i] = p.maxOpacity;
              touched[i] = now;
            }
          }
        }
      }

      const fadeStep = dt / Math.max(p.fadeDuration, 16);
      const half = p.cellSize / 2;

      // 5. Render luminous glassmorphic cells
      const totalCells = cols * rows;
      for (let i = 0; i < totalCells; i++) {
        let a = alphas[i];
        if (a > 0 && now - touched[i] > p.holdTime) {
          a = Math.max(0, a - fadeStep);
          alphas[i] = a;
        }

        let ambAlpha = 0;
        const amb = ambientMap.get(i);
        if (amb) {
          const breath = 0.72 + 0.28 * Math.sin(now * 0.0016 * amb.speed + amb.phase);
          ambAlpha = amb.baseAlpha * breath;
        }

        const effectiveAlpha = Math.max(a, ambAlpha);
        if (effectiveAlpha <= 0.01) continue;

        const [cx, cy] = cellCenter(i);
        const gradient = ctx.createRadialGradient(cx, cy, half * 0.05, cx, cy, p.cellSize * 0.95);
        gradient.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${effectiveAlpha * 1.1})`);
        gradient.addColorStop(0.65, `rgba(56, 189, 248, ${effectiveAlpha * 0.85})`);
        gradient.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);

        const x = cx - half + 0.5;
        const y = cy - half + 0.5;
        const s = p.cellSize - 1;

        ctx.beginPath();
        if (p.cellRadius > 0) {
          ctx.roundRect(x, y, s, s, p.cellRadius);
        } else {
          ctx.rect(x, y, s, s);
        }
        if (p.fillOpacity > 0) {
          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${effectiveAlpha * p.fillOpacity * 3.5})`;
          ctx.fill();
        }
        ctx.strokeStyle = gradient;
        ctx.lineWidth = p.lineWidth;
        ctx.stroke();
      }

      // Smooth 60fps continuous animation
      raf = requestAnimationFrame(draw);
    };

    const wake = () => {
      if (running) return;
      running = true;
      lastFrame = performance.now();
      raf = requestAnimationFrame(draw);
    };
    wakeRef.current = wake;

    const toLocal = (e: PointerEvent): [number, number] => {
      const rect = canvas.getBoundingClientRect();
      return [e.clientX - rect.left, e.clientY - rect.top];
    };

    const onPointerMove = (e: PointerEvent) => {
      const [x, y] = toLocal(e);
      if (x >= -60 && x <= w + 60 && y >= -60 && y <= h + 60) {
        energize(x, y);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!propsRef.current.clickPulse) return;
      const [x, y] = toLocal(e);
      if (x >= 0 && x <= w && y >= 0 && y <= h) {
        pulses.push({ x, y, t0: performance.now() });
      }
    };

    const ro = new ResizeObserver(() => {
      rebuild();
    });
    ro.observe(container);
    rebuild();
    wake();

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cellSize]);

  useEffect(() => {
    wakeRef.current?.();
  }, [gridOpacity, color, lineWidth, maxOpacity, fillOpacity, cellRadius, ambient, ambientDensity, ambientMaxAlpha]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="block h-full w-full pointer-events-none" />
    </div>
  );
};

export default CursorGrid;
