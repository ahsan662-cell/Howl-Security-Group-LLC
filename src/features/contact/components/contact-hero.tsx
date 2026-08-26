"use client";

import React, { useEffect, useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface CareersHeroProps {
  className?: string;
}

export function CareersHero({ className }: CareersHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 40 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 60);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className={cn(
        "relative min-h-[75vh] sm:min-h-[82vh] lg:min-h-[88vh] flex flex-col justify-center items-center overflow-hidden bg-[#06080D] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 border-b border-zinc-800/80 select-none",
        className
      )}
      aria-label="Recruitment & Operative Intake Hero"
    >
      {/* Background Layer: Tactical Overhead Layout & Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Dynamic Spotlight that subtly tracks mouse */}
        <div
          className="absolute w-[600px] sm:w-[900px] h-[500px] sm:h-[700px] bg-gradient-to-r from-amber-600/10 via-amber-500/5 to-transparent rounded-full blur-3xl transition-transform duration-1000 ease-out opacity-70"
          style={{
            transform: `translate(${mousePos.x - 50}px, ${mousePos.y - 50}px)`,
          }}
        />

        {/* Tactical Flat-Lay SVG Silhouette Artwork (Overhead Gear Composition) */}
        <img src="/images/proven.webp" alt="" 
        className="w-full h-full object-fill object-top filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"/>

        {/* Dark Grain & Subtle Scanlines Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,8,13,0.85)_80%,rgba(6,8,13,0.98)_100%)] pointer-events-none" />
      </div>

      {/* Main Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center w-full">
        
        {/* Top Header Tag: [ RECRUITMENT & OPERATIVE INTAKE ] */}
        <div
          className={cn(
            "flex flex-col items-center mb-6 sm:mb-8 transition-all duration-700 ease-out transform",
            isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95"
          )}
        >
          <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.22em] text-zinc-300 uppercase">
            <span className="text-zinc-500 font-normal">[</span>
            <span>RECRUITMENT & OPERATIVE INTAKE</span>
            <span className="text-zinc-500 font-normal">]</span>
          </div>

          {/* Distinctive Orange Underline Accent Bar */}
          <div
            className={cn(
              "h-[3px] bg-[#E58518] rounded-full mt-2 sm:mt-2.5 shadow-[0_0_12px_rgba(229,133,24,0.7)] transition-all duration-1000 delay-300 ease-out",
              isLoaded ? "w-14 sm:w-16 opacity-100" : "w-0 opacity-0"
            )}
          />
        </div>

        {/* High-Impact Headline */}
        <h1
          className={cn(
            "text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-black uppercase text-white font-sans tracking-tight leading-[0.98] sm:leading-[1.03] text-center max-w-5xl mx-auto drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)] transition-all duration-800 delay-150 ease-out transform",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <span className="block">JOIN THE PACK.</span>
          <span className="block">STANDARDS WITHOUT</span>
          <span className="block">COMPROMISE.</span>
        </h1>

        {/* Subtitle / Intake Creed */}
        <p
          className={cn(
            "mt-6 sm:mt-8 text-xs sm:text-base md:text-lg text-zinc-300/90 font-sans max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] transition-all duration-800 delay-300 ease-out transform",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          We recruit disciplined personnel with proven backgrounds in military special operations,
          law enforcement, and verified high-level protection. No compromises. No shortcuts.
          <span className="block mt-1 sm:inline sm:mt-0 font-medium text-white"> Only the elite.</span>
        </p>

        {/* Security Protocols In Effect Banner / Card */}
        <div
          className={cn(
            "mt-10 sm:mt-14 lg:mt-16 w-full max-w-3xl mx-auto transition-all duration-900 delay-500 ease-out transform",
            isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.98]"
          )}
        >
          <div className="relative group rounded-xl bg-[#090C13]/90 border border-zinc-800/90 hover:border-amber-500/40 p-4 sm:p-5 md:px-6 md:py-4.5 backdrop-blur-md shadow-2xl transition-all duration-300">
            
            {/* Subtle Corner Brackets for Tactical Tech Aesthetic */}
            <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-zinc-700 group-hover:border-[#E58518] transition-colors pointer-events-none" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-zinc-700 group-hover:border-[#E58518] transition-colors pointer-events-none" />
            <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-zinc-700 group-hover:border-[#E58518] transition-colors pointer-events-none" />
            <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-zinc-700 group-hover:border-[#E58518] transition-colors pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6">
              
              {/* Left Lock Icon & Description */}
              <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 text-left">
                {/* Lock Icon Container */}
                <div className="shrink-0 mt-0.5 sm:mt-0 p-2 sm:p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[#E58518] group-hover:shadow-[0_0_15px_rgba(229,133,24,0.3)] transition-all">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                </div>

                {/* Text Block */}
                <div>
                  <h4 className="text-xs sm:text-[13px] font-bold uppercase text-white font-sans tracking-wide flex items-center gap-2">
                    <span>CLARIFIED SECURITY PROTOCOLS IN EFFECT</span>
                  </h4>
                  <p className="text-[11px] sm:text-xs text-zinc-400 font-sans leading-snug mt-0.5 sm:mt-1">
                    All submitted data is fully encrypted with military-grade AES-256 standard and parsed directly by active command officers.
                  </p>
                </div>
              </div>

              {/* Right Tag: LEVEL-4 SECURE */}
              <div className="shrink-0 self-end sm:self-center font-mono text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#E58518] px-3 py-1 sm:py-1.5 rounded bg-amber-950/30 border border-amber-500/30 shadow-[0_0_12px_rgba(229,133,24,0.15)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E58518] animate-pulse" />
                <span>LEVEL-4 SECURE</span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
