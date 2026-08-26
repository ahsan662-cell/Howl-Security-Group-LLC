"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ServicesHero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[65vh] sm:min-h-[72vh] lg:min-h-[78vh] flex flex-col justify-center items-center overflow-hidden bg-[#07090E] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 border-b border-zinc-800/80">
      
      {/* Background Ambience & Concentric Tactical Radar Ring Graphic */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center">
        {/* Subtle Central Amber Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-3xl opacity-60" />

        {/* Faint Tactical Radar Circles on the Right */}
        <div className="absolute right-[-100px] sm:right-[-50px] lg:right-10 top-1/2 -translate-y-1/2 w-[480px] h-[480px] sm:w-[600px] sm:h-[600px] opacity-[0.07] border border-amber-500 rounded-full flex items-center justify-center pointer-events-none">
          <div className="w-3/4 h-3/4 border border-dashed border-amber-400 rounded-full flex items-center justify-center">
            <div className="w-1/2 h-1/2 border border-amber-500 rounded-full" />
          </div>
        </div>

        {/* Faint Horizontal/Vertical Grid Line Guides */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d0a_1px,transparent_1px),linear-gradient(to_bottom,#1f293d0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Pill Badge: • TACTICAL DOSSIER // EST. 2001 */}
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-md bg-[#121622] border border-[#E58518]/40 text-[#E58518] font-mono text-[10.5px] sm:text-xs font-bold tracking-wider uppercase mb-6 sm:mb-8 shadow-sm transition-all duration-700 ease-out transform",
            isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#E58518] animate-pulse" />
          <span>TACTICAL DOSSIER // EST. 2001</span>
        </div>

        {/* Display Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-white font-sans tracking-tight leading-[1.08] max-w-4xl mx-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
          <span
            className={cn(
              "block transition-all duration-700 delay-150 ease-out transform",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            ROOTED IN SPECIAL
          </span>
          <span
            className={cn(
              "block text-white transition-all duration-700 delay-250 ease-out transform",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            OPERATIONS.
          </span>
          <span
            className={cn(
              "block text-[#E58518] transition-all duration-700 delay-350 ease-out transform",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            DRIVEN BY DISCIPLINE.
          </span>
        </h1>

        {/* Subtitle Paragraph */}
        <p
          className={cn(
            "mt-6 sm:mt-8 text-xs sm:text-base md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed font-sans font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-all duration-700 delay-500 ease-out transform",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          The story, combat background, and philosophy behind HOWL Security Group.
          <br className="hidden sm:inline" />
          {" "}Engineered for ultimate executive protection and critical asset defense.
        </p>

        {/* 3-Metric Tactical Telemetry Spec Box */}
        <div
          className={cn(
            "mt-8 sm:mt-12 w-full max-w-lg mx-auto bg-[#0B0E16]/90 border border-zinc-800 hover:border-zinc-700 rounded-xl p-3 sm:p-4 shadow-xl backdrop-blur-sm transition-all duration-700 delay-650 ease-out transform",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <div className="grid grid-cols-3 divide-x divide-zinc-800/80 text-center font-mono">
            {/* Metric 1 */}
            <div className="px-2">
              <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider block">
                ORIGIN CODE
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#E58518] mt-0.5 block truncate">
                USA_RGR.75
              </span>
            </div>

            {/* Metric 2 */}
            <div className="px-2">
              <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider block">
                STANDARDS
              </span>
              <span className="text-xs sm:text-sm font-bold text-zinc-200 mt-0.5 block truncate">
                MIL-SPEC.99
              </span>
            </div>

            {/* Metric 3 */}
            <div className="px-2">
              <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wider block">
                DISCIPLINE
              </span>
              <span className="text-xs sm:text-sm font-bold text-zinc-200 mt-0.5 block truncate">
                ABS_ZERO_FAIL
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
