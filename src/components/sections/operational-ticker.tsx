"use client";

import React from "react";
import { COMPANY_INFO } from "@/constants/company";

export function OperationalTicker() {
  const items = COMPANY_INFO.tickerItems;

  return (
    <div className="w-full bg-[#05060A] border-y border-zinc-800/90 py-3.5 overflow-hidden select-none relative z-20">
      {/* Left/Right Edge Fade Overlays for smooth entry/exit */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#05060A] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#05060A] to-transparent z-10" />

      {/* Infinite Scrolling Track */}
      <div className="animate-marquee flex items-center gap-8 sm:gap-12 whitespace-nowrap font-mono text-[11px] sm:text-[12px] font-bold tracking-wider text-zinc-300 uppercase">
        {/* Track Copy 1 */}
        {items.map((item, idx) => (
          <span
            key={`ticker-1-${idx}`}
            className="inline-flex items-center gap-2.5 text-zinc-200 hover:text-amber-400 transition-colors cursor-default shrink-0"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0 shadow-[0_0_6px_#f59e0b]" />
            <span>{item}</span>
          </span>
        ))}

        {/* Track Copy 2 (Seamless loop duplicate) */}
        {items.map((item, idx) => (
          <span
            key={`ticker-2-${idx}`}
            className="inline-flex items-center gap-2.5 text-zinc-200 hover:text-amber-400 transition-colors cursor-default shrink-0"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0 shadow-[0_0_6px_#f59e0b]" />
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
