import React from "react";

interface AnimatedChevronsProps {
  className?: string;
  size?: number;
  count?: 2 | 3;
  variant?: "light" | "dark";
}

export function AnimatedChevrons({
  className = "",
  size = 13,
  count = 3,
  variant = "light",
}: AnimatedChevronsProps) {
  const cls1 = variant === "dark" ? "animate-chevron-dark-1" : "animate-chevron-1";
  const cls2 = variant === "dark" ? "animate-chevron-dark-2" : "animate-chevron-2";
  const cls3 = variant === "dark" ? "animate-chevron-dark-3" : "animate-chevron-3";
  return (
    <span
      className={`inline-flex items-center -space-x-1.5 transition-transform duration-200 group-hover:translate-x-1 ${className}`}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${cls1} shrink-0`}
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${cls2} shrink-0`}
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
      {count === 3 && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${cls3} shrink-0`}
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      )}
    </span>
  );
}
