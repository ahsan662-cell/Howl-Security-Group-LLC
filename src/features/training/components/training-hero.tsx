"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Shield, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrainingHeroProps {
  onScheduleClick?: () => void;
}

const LINEAGE_BADGES = [
  "GRANDMASTER MOY YAT LINEAGE",
  "UNALTERED VING TSUN SYSTEM",
  "30+ YEARS SIFU EXPERIENCE",
  "TACTICAL EXECUTIVE ADVISEMENT",
];

export function TrainingHero({ onScheduleClick }: TrainingHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 60);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col bg-[#05070A] border-b border-zinc-800/80 overflow-hidden">
      <section
        ref={sectionRef}
        className="relative min-h-[75vh] sm:min-h-[82vh] lg:min-h-[88vh] flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 select-none"
      >
        {/* Background Layer: High-Impact Cinematic Founder & Combatives Dojo Backdrop */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Background Image */}
          <img
            src="/images/h.jpeg"
            alt="Sifu Gerald Hazellief - Ving Tsun & Tactical Combatives"
            className="w-full h-full object-fill object-[center_10%] filter transition-transform duration-1000 ease-out"
          />

          {/* Dark Radial & Gradient Vignettes */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-[#05070A]/60 to-[#05070A]/80" /> */}
          {/* <div className="absolute inset-0 bg-radial from-transparent via-[#05070A]/50 to-[#05070A]/95" /> */}
          
          {/* Center Amber Ambient Glow */}
          {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" /> */}
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
          
          {/* Main Display Headline */}
          <h1
            className={cn(
              "text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-black uppercase text-white font-sans tracking-tight leading-[1.02] sm:leading-[1.05] drop-shadow-[0_8px_32px_rgba(0,0,0,0.98)] transition-all duration-800 ease-out transform",
              isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.98]"
            )}
          >
            <span className="block">AUTHENTIC VING TSUN</span>
            <span className="block">& EXECUTIVE COMBATIVES</span>
          </h1>

          {/* Subtitle / Lineage Statement */}
          <p
            className={cn(
              "mt-6 sm:mt-8 text-xs sm:text-base md:text-lg text-zinc-200/90 font-sans max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] transition-all duration-800 delay-200 ease-out transform",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            Discover the pure, unaltered art of <strong className="text-white font-semibold">Ving Tsun</strong> and train under 30+ year master Sifu Gerald Hazellief. Special Operations standards combined with complete tactical combat efficiency.
          </p>

          {/* Call-to-Action Buttons */}
          <div
            className={cn(
              "mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-md sm:max-w-none transition-all duration-800 delay-350 ease-out transform",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            {/* Primary Orange Button: SCHEDULE CONSULTATION / VISIT */}
            {onScheduleClick ? (
              <button
                type="button"
                onClick={onScheduleClick}
                className="w-full sm:w-auto px-7 sm:px-9 py-4 rounded-lg bg-[#E58518] hover:bg-[#F59E0B] text-black font-mono text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(229,133,24,0.35)] hover:shadow-[0_0_35px_rgba(229,133,24,0.55)] cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                SCHEDULE CONSULTATION / VISIT
              </button>
            ) : (
              <Link
                href="/consultation"
                className="w-full sm:w-auto px-7 sm:px-9 py-4 rounded-lg bg-[#E58518] hover:bg-[#F59E0B] text-black font-mono text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(229,133,24,0.35)] hover:shadow-[0_0_35px_rgba(229,133,24,0.55)] inline-flex items-center justify-center hover:scale-[1.02] active:scale-[0.98]"
              >
                SCHEDULE CONSULTATION / VISIT
              </Link>
            )}

            {/* Secondary Ghost Button: PRIVATE & EXECUTIVE INSTRUCTION */}
            <a
              href="#curriculum"
              className="w-full sm:w-auto px-7 sm:px-9 py-4 rounded-lg bg-[#0C1018]/80 hover:bg-[#121622] text-zinc-100 border border-zinc-700/90 hover:border-zinc-500 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 backdrop-blur-sm inline-flex items-center justify-center"
            >
              PRIVATE & EXECUTIVE INSTRUCTION
            </a>
          </div>

        </div>
      </section>

      {/* Bottom Lineage Ticker Strip */}
      <div
        className={cn(
          "w-full bg-[#05070B] border-t border-zinc-800/80 py-4 px-4 overflow-hidden transition-all duration-700 delay-500 ease-out",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2 font-mono text-[10.5px] sm:text-xs text-zinc-400 font-bold uppercase tracking-widest text-center">
          {LINEAGE_BADGES.map((badge, idx) => (
            <React.Fragment key={badge}>
              <span className="hover:text-zinc-200 transition-colors">{badge}</span>
              {idx < LINEAGE_BADGES.length - 1 && (
                <span className="text-[#E58518] font-black hidden sm:inline">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
