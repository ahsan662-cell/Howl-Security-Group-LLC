import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

export function Logo({ className, size = "md", showTagline = true }: LogoProps) {
  const imageSizeClass =
    size === "sm"
      ? "w-8 h-8"
      : size === "lg"
      ? "w-14 h-14"
      : "w-10 h-10 sm:w-12 sm:h-12";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-3 group select-none transition-opacity hover:opacity-95",
        className
      )}
    >
      {/* Tactical Wolf / Company Emblem */}
      <div
        className={cn(
          "relative shrink-0 rounded-full overflow-hidden border border-amber-500/60 shadow-[0_0_12px_rgba(217,119,6,0.25)] bg-[#121622]",
          imageSizeClass
        )}
      >
        <img
          src="/images/Logo.jpeg"
          alt="HOWL Security Group Logo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col text-left">
        <span
          className={cn(
            "font-sans font-black tracking-wider text-amber-500 uppercase leading-none",
            size === "sm"
              ? "text-xs"
              : size === "lg"
              ? "text-lg"
              : "text-[13px] sm:text-[15px]"
          )}
        >
          HOWL SECURITY GROUP, LLC
        </span>
        {showTagline && (
          <span
            className={cn(
              "font-mono tracking-[0.18em] text-zinc-400 uppercase leading-tight mt-1",
              size === "sm"
                ? "text-[7px]"
                : size === "lg"
                ? "text-[10px]"
                : "text-[8px] sm:text-[9px]"
            )}
          >
            VIGILANCE, SECURITY, UNITY.
          </span>
        )}
      </div>
    </Link>
  );
}
