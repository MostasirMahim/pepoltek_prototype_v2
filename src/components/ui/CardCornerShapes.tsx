"use client";

import React from "react";

export interface CardCornerShapesProps {
  /** The accent color (hex, rgb, or hsl) to tint the shapes */
  color?: string;
  /** Active / hovered state to smoothly increase luminescence */
  active?: boolean;
  /** Variant 0-4 for distinct organic curve patterns per step */
  variant?: number;
  /** Optional custom class name */
  className?: string;
  /** Dimension size in pixels or CSS units (default: 120) */
  size?: number | string;
}

interface CornerPathData {
  trOuter: string;
  trInner: string;
  trContour: string;
  trDot?: { cx: number; cy: number };
  blOuter: string;
  blInner: string;
  blContour: string;
  blDot?: { cx: number; cy: number };
}

/* 5 hand-crafted organic blob geometries mimicking the NOLOK login card abstract curves */
const CORNER_VARIANTS: CornerPathData[] = [
  /* Variant 0: Fluid organic lobes (Discovery & Alignment) */
  {
    trOuter: "M 160 0 L 55 0 C 62 28, 70 48, 52 70 C 32 92, 45 125, 90 138 C 122 148, 142 128, 160 155 Z",
    trInner: "M 160 0 L 90 0 C 96 22, 108 38, 92 56 C 76 72, 98 100, 128 106 C 145 110, 152 95, 160 115 Z",
    trContour: "M 42 0 C 50 36, 60 58, 38 82 C 16 106, 32 142, 85 158",
    trDot: { cx: 68, cy: 74 },
    blOuter: "M 0 160 L 0 55 C 28 62, 48 70, 70 52 C 92 32, 125 45, 138 90 C 148 122, 128 142, 155 160 Z",
    blInner: "M 0 160 L 0 90 C 22 96, 38 108, 56 92 C 72 76, 100 98, 106 128 C 110 145, 95 152, 115 160 Z",
    blContour: "M 0 42 C 36 50, 58 60, 82 38 C 106 16, 142 32, 158 85",
    blDot: { cx: 74, cy: 68 },
  },
  /* Variant 1: Topographic fluid curves (AI Market Mapping) */
  {
    trOuter: "M 160 0 L 40 0 C 50 35, 80 40, 75 75 C 70 110, 115 115, 125 140 C 132 155, 148 152, 160 160 Z",
    trInner: "M 160 0 L 80 0 C 88 25, 110 32, 105 58 C 100 84, 130 92, 142 112 C 150 125, 155 120, 160 130 Z",
    trContour: "M 25 0 C 38 42, 70 48, 62 88 C 55 128, 108 132, 118 160",
    trDot: { cx: 88, cy: 65 },
    blOuter: "M 0 160 L 0 40 C 35 50, 40 80, 75 75 C 110 70, 115 115, 140 125 C 155 132, 152 148, 160 160 Z",
    blInner: "M 0 160 L 0 80 C 25 88, 32 110, 58 105 C 84 100, 92 130, 112 142 C 125 150, 120 155, 130 160 Z",
    blContour: "M 0 25 C 42 38, 48 70, 88 62 C 128 55, 132 108, 160 118",
    blDot: { cx: 65, cy: 88 },
  },
  /* Variant 2: Precision wave contours (Hard-Coded Vetting) */
  {
    trOuter: "M 160 0 L 48 0 C 58 20, 65 50, 42 78 C 20 105, 60 132, 105 136 C 135 139, 148 120, 160 148 Z",
    trInner: "M 160 0 L 85 0 C 92 15, 100 38, 82 58 C 65 78, 95 100, 128 102 C 145 104, 152 90, 160 112 Z",
    trContour: "M 32 0 C 44 24, 52 60, 26 92 C 0 124, 48 152, 98 160",
    trDot: { cx: 72, cy: 85 },
    blOuter: "M 0 160 L 0 48 C 20 58, 50 65, 78 42 C 105 20, 132 60, 136 105 C 139 135, 120 148, 148 160 Z",
    blInner: "M 0 160 L 0 85 C 15 92, 38 100, 58 82 C 78 65, 100 95, 102 128 C 104 145, 90 152, 112 160 Z",
    blContour: "M 0 32 C 24 44, 60 52, 92 26 C 124 0, 152 48, 160 98",
    blDot: { cx: 85, cy: 72 },
  },
  /* Variant 3: Harmonic dual lobes (Panel Orchestration) */
  {
    trOuter: "M 160 0 L 62 0 C 72 32, 54 62, 78 88 C 102 114, 90 140, 140 148 C 150 150, 155 142, 160 152 Z",
    trInner: "M 160 0 L 98 0 C 105 22, 92 45, 108 64 C 125 82, 118 105, 145 112 Z",
    trContour: "M 46 0 C 58 40, 36 76, 65 108 C 94 140, 78 158, 128 160",
    trDot: { cx: 82, cy: 78 },
    blOuter: "M 0 160 L 0 62 C 32 72, 62 54, 88 78 C 114 102, 140 90, 148 140 C 150 150, 142 155, 152 160 Z",
    blInner: "M 0 160 L 0 98 C 22 105, 45 92, 64 108 C 82 125, 105 118, 112 145 Z",
    blContour: "M 0 46 C 40 58, 76 36, 108 65 C 140 94, 158 78, 160 128",
    blDot: { cx: 78, cy: 82 },
  },
  /* Variant 4: Dynamic forward momentum curves (Deploy & Onboard) */
  {
    trOuter: "M 160 0 L 50 0 C 65 25, 60 55, 85 75 C 110 95, 105 130, 145 138 C 152 140, 156 150, 160 158 Z",
    trInner: "M 160 0 L 88 0 C 98 18, 95 40, 112 55 C 130 70, 125 98, 148 105 Z",
    trContour: "M 35 0 C 52 30, 46 68, 75 92 C 104 116, 96 152, 140 160",
    trDot: { cx: 92, cy: 68 },
    blOuter: "M 0 160 L 0 50 C 25 65, 55 60, 75 85 C 95 110, 130 105, 138 145 C 140 152, 150 156, 158 160 Z",
    blInner: "M 0 160 L 0 88 C 18 98, 40 95, 55 112 C 70 130, 98 125, 105 148 Z",
    blContour: "M 0 35 C 30 52, 68 46, 92 75 C 116 104, 152 96, 160 140",
    blDot: { cx: 68, cy: 92 },
  },
];

export function CardTopRightShape({
  color = "#0a84ff",
  active = false,
  variant = 0,
  size = 120,
  className = "",
}: Omit<CardCornerShapesProps, "className"> & { className?: string }) {
  const v = CORNER_VARIANTS[Math.abs(variant) % CORNER_VARIANTS.length];
  const outerOpacity = active ? 0.055 : 0.03;
  const innerOpacity = active ? 0.09 : 0.05;
  const contourOpacity = active ? 0.22 : 0.12;

  return (
    <div
      className={`pointer-events-none absolute right-0 top-0 z-0 select-none overflow-hidden transition-all duration-500 ${className}`}
      style={{
        width: typeof size === "number" ? `${size}px` : size,
        height: typeof size === "number" ? `${size}px` : size,
        transform: active ? "scale(1.06)" : "scale(1)",
        transformOrigin: "top right",
      }}
    >
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        {/* Outer soft organic lobe */}
        <path
          d={v.trOuter}
          fill={color}
          style={{
            fillOpacity: outerOpacity,
            transition: "fill-opacity 0.4s ease",
          }}
        />
        {/* Inner secondary fluid contour */}
        <path
          d={v.trInner}
          fill={color}
          style={{
            fillOpacity: innerOpacity,
            transition: "fill-opacity 0.4s ease",
          }}
        />
        {/* Delicate organic accent contour line */}
        <path
          d={v.trContour}
          stroke={color}
          strokeWidth="1.2"
          strokeDasharray="3 3"
          fill="none"
          style={{
            strokeOpacity: contourOpacity,
            transition: "stroke-opacity 0.4s ease",
          }}
        />
        {/* Micro focal accent dot */}
        {v.trDot && (
          <circle
            cx={v.trDot.cx}
            cy={v.trDot.cy}
            r="2"
            fill={color}
            style={{
              fillOpacity: active ? 0.45 : 0.2,
              transition: "fill-opacity 0.4s ease",
            }}
          />
        )}
      </svg>
    </div>
  );
}

export function CardBottomLeftShape({
  color = "#0a84ff",
  active = false,
  variant = 0,
  size = 120,
  className = "",
}: Omit<CardCornerShapesProps, "className"> & { className?: string }) {
  const v = CORNER_VARIANTS[Math.abs(variant) % CORNER_VARIANTS.length];
  const outerOpacity = active ? 0.055 : 0.03;
  const innerOpacity = active ? 0.09 : 0.05;
  const contourOpacity = active ? 0.22 : 0.12;

  return (
    <div
      className={`pointer-events-none absolute bottom-0 left-0 z-0 select-none overflow-hidden transition-all duration-500 ${className}`}
      style={{
        width: typeof size === "number" ? `${size}px` : size,
        height: typeof size === "number" ? `${size}px` : size,
        transform: active ? "scale(1.06)" : "scale(1)",
        transformOrigin: "bottom left",
      }}
    >
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        {/* Outer soft organic lobe */}
        <path
          d={v.blOuter}
          fill={color}
          style={{
            fillOpacity: outerOpacity,
            transition: "fill-opacity 0.4s ease",
          }}
        />
        {/* Inner secondary fluid contour */}
        <path
          d={v.blInner}
          fill={color}
          style={{
            fillOpacity: innerOpacity,
            transition: "fill-opacity 0.4s ease",
          }}
        />
        {/* Delicate organic accent contour line */}
        <path
          d={v.blContour}
          stroke={color}
          strokeWidth="1.2"
          strokeDasharray="3 3"
          fill="none"
          style={{
            strokeOpacity: contourOpacity,
            transition: "stroke-opacity 0.4s ease",
          }}
        />
        {/* Micro focal accent dot */}
        {v.blDot && (
          <circle
            cx={v.blDot.cx}
            cy={v.blDot.cy}
            r="2"
            fill={color}
            style={{
              fillOpacity: active ? 0.45 : 0.2,
              transition: "fill-opacity 0.4s ease",
            }}
          />
        )}
      </svg>
    </div>
  );
}

/**
 * CardCornerShapes
 * Mounts both Top-Right and Bottom-Left abstract organic SVG shapes inside a card.
 * Clips seamlessly within cards styled with `overflow-hidden`.
 */
export default function CardCornerShapes({
  color = "#0a84ff",
  active = false,
  variant = 0,
  size = 125,
  className = "",
}: CardCornerShapesProps) {
  return (
    <>
      <CardTopRightShape
        color={color}
        active={active}
        variant={variant}
        size={size}
        className={className}
      />
      <CardBottomLeftShape
        color={color}
        active={active}
        variant={variant}
        size={size}
        className={className}
      />
    </>
  );
}
