import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

export function Logo({ className, size = "md", showTagline = true }: LogoProps) {
  const iconSize = size === "sm" ? 30 : size === "lg" ? 44 : 36;

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 group select-none transition-opacity hover:opacity-95",
        className
      )}
    >
      {/* Tactical Wolf Emblem Badge */}
      <div
        className="relative shrink-0 flex items-center justify-center rounded-sm bg-[#121622] border border-[#D97706]/70 p-1 shadow-[0_0_10px_rgba(217,119,6,0.18)]"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-amber-500 fill-current drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        >
          {/* Diamond outer frame */}
          <polygon
            points="50,5 95,50 50,95 5,50"
            fill="none"
            stroke="#D97706"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Inner tactical geometric wolf silhouette */}
          <path
            d="M50 16 L62 34 L78 34 L66 48 L72 70 L50 58 L28 70 L34 48 L22 34 L38 34 Z"
            fill="#B45309"
            stroke="#F59E0B"
            strokeWidth="1.5"
          />
          <polygon points="50,22 58,38 50,50 42,38" fill="#FBBF24" />
          <polygon points="50,50 56,66 50,60 44,66" fill="#D97706" />
          {/* Eyes */}
          <circle cx="45" cy="40" r="2" fill="#FFFFFF" />
          <circle cx="55" cy="40" r="2" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span
          className={cn(
            "font-sans font-black tracking-wider text-amber-500 uppercase leading-none",
            size === "sm" ? "text-xs" : size === "lg" ? "text-lg" : "text-[13px] sm:text-[15px]"
          )}
        >
          HOWL SECURITY GROUP
        </span>
        {showTagline && (
          <span
            className={cn(
              "font-mono tracking-[0.2em] text-zinc-400 uppercase leading-tight mt-0.5",
              size === "sm" ? "text-[7px]" : size === "lg" ? "text-[10px]" : "text-[8px] sm:text-[8.5px]"
            )}
          >
            VIGILANCE. STRENGTH. UNITY.
          </span>
        )}
      </div>
    </Link>
  );
}
