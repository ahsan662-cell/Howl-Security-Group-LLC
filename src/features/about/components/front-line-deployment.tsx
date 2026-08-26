"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Crosshair, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export function FrontLineDeployment() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-32 bg-[#06080D] border-b border-zinc-800/80 overflow-hidden relative"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20 transition-all duration-700 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          {/* Top Tag: — PROVEN OPERATIONS SHOWCASE — */}
          <div className="inline-flex items-center justify-center gap-2 font-mono text-[10.5px] sm:text-xs font-bold uppercase tracking-widest text-[#E58518] mb-3">
            <span className="w-4 h-[1.5px] bg-[#E58518]" />
            <span>PROVEN OPERATIONS SHOWCASE</span>
            <span className="w-4 h-[1.5px] bg-[#E58518]" />
          </div>

          {/* Section Main Title with Tactical Edge Markers */}
          <div className="relative flex items-center justify-center">
            <span className="hidden sm:inline absolute left-0 text-amber-500 font-mono text-xl opacity-60">
              ⊢
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white font-sans tracking-tight leading-[1.08]">
              FRONT LINE
              <br className="sm:hidden" />
              {" "}DEPLOYMENT
            </h2>
            <span className="hidden sm:inline absolute right-0 text-amber-500 font-mono text-xl opacity-60">
              ⊣
            </span>
          </div>

          {/* Subtitle */}
          <p className="mt-3.5 text-xs sm:text-sm md:text-base text-zinc-400 font-sans leading-relaxed max-w-2xl mx-auto">
            Elite high-threat mitigation and tactical asset protection under any operational parameter. Veteran-planned. Flawlessly executed.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Tactical Media Showcase */}
          <div
            className={cn(
              "lg:col-span-6 space-y-4 sm:space-y-5 transition-all duration-1000 ease-out transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8 sm:-translate-x-12"
            )}
          >
            {/* Main Featured Assignment Card */}
            <div className="relative bg-[#090C12] border border-zinc-800/90 rounded-xl overflow-hidden shadow-2xl group">
              {/* Tactical Orange Corner Brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#E58518] z-20 pointer-events-none" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#E58518] z-20 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#E58518] z-20 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#E58518] z-20 pointer-events-none" />

              {/* Photo Area */}
              <div className="relative w-full h-[280px] sm:h-[340px] md:h-[380px] overflow-hidden bg-[#07090E]">
                <img
                  src="/images/operations/op-executive-detail.png"
                  alt="High-Profile Close Protection Vector"
                  className="w-full h-full object-cover object-center filter grayscale contrast-115 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090C12] via-[#090C12]/40 to-transparent pointer-events-none" />

                {/* Bottom Overlay Telemetry Bar */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-end justify-between gap-2 z-10">
                  <div>
                    <span className="font-mono text-[9px] sm:text-[10px] text-[#E58518] font-bold uppercase tracking-wider block">
                      TACTICAL DETAIL DESIGNATOR: HOWL-DELTA-01
                    </span>
                    <h3 className="text-sm sm:text-base md:text-lg font-black uppercase text-white font-sans tracking-wide mt-0.5">
                      HIGH-PROFILE ASSIGNMENT // ACTIVE AREA
                    </h3>
                  </div>

                  <div className="inline-block self-start sm:self-auto px-2.5 py-0.5 bg-[#E58518] text-black font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-wider rounded">
                    CLASSIFIED VECTOR
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 2 Smaller Media Cards Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              
              {/* Bottom Left: Armored Escort Vehicle */}
              <div className="relative bg-[#090C12] border border-zinc-800/90 rounded-xl overflow-hidden shadow-xl group">
                <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-[#E58518] z-20 pointer-events-none" />
                <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-[#E58518] z-20 pointer-events-none" />
                <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-[#E58518] z-20 pointer-events-none" />
                <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-[#E58518] z-20 pointer-events-none" />

                <div className="relative w-full h-32 sm:h-44 md:h-48 overflow-hidden bg-[#07090E]">
                  <img
                    src="/images/operations/op-escort-vehicle.png"
                    alt="Tactical Escort Vehicle Formation"
                    className="w-full h-full object-cover object-center filter contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090C12]/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Bottom Right: Tactical Comms & Plate Carrier Vest */}
              <div className="relative bg-[#090C12] border border-zinc-800/90 rounded-xl overflow-hidden shadow-xl group">
                <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-[#E58518] z-20 pointer-events-none" />
                <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-[#E58518] z-20 pointer-events-none" />
                <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-[#E58518] z-20 pointer-events-none" />
                <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-[#E58518] z-20 pointer-events-none" />

                <div className="relative w-full h-32 sm:h-44 md:h-48 overflow-hidden bg-[#07090E]">
                  <img
                    src="/images/operations/op-tactical-vest.png"
                    alt="Tactical Rig and Radio Comms Suite"
                    className="w-full h-full object-cover object-center filter contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090C12]/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Operational Record Cards & Dual Metrics */}
          <div
            className={cn(
              "lg:col-span-6 space-y-4 sm:space-y-5 transition-all duration-1000 delay-150 ease-out transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 sm:translate-x-12"
            )}
          >
            {/* Card 1: OP_RECORD // 01 (Combat Sports Security) */}
            <div className="relative bg-[#090C12] border border-zinc-800/90 hover:border-amber-500/40 rounded-xl p-5 sm:p-7 shadow-xl transition-all duration-300 group">
              {/* Corner marks */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-zinc-700 group-hover:border-[#E58518] transition-colors pointer-events-none" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-zinc-700 group-hover:border-[#E58518] transition-colors pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-zinc-700 group-hover:border-[#E58518] transition-colors pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-zinc-700 group-hover:border-[#E58518] transition-colors pointer-events-none" />

              {/* Header Row */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#E58518] uppercase tracking-wider">
                  OP_RECORD // 01
                </span>
                <span className="px-2.5 py-0.5 rounded bg-amber-950/40 border border-amber-500/50 text-[#E58518] font-mono text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wider">
                  ACTIVE DETAIL
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg lg:text-xl font-bold uppercase text-white font-sans tracking-wide mt-3 group-hover:text-amber-400 transition-colors">
                HIGH-STAKES COMBAT SPORTS SECURITY
              </h3>

              {/* Description */}
              <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                Private detail for Bare Knuckle Fighting Championship (BKFC) fighters, escorting talent through dense crowds to and from the ring under maximum pressure conditions.
              </p>

              {/* Footer Capability Tag */}
              <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-zinc-400 font-mono text-[10px] sm:text-xs">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Target className="h-3.5 w-3.5 text-[#E58518]" />
                  <span>CROWD CONTROL // THREAT INTERCEPT</span>
                </div>
                <ArrowRight className="h-4 w-4 text-[#E58518] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: OP_RECORD // 02 (Commercial & Property Detail) */}
            <div className="relative bg-[#090C12] border border-zinc-800/90 hover:border-amber-500/40 rounded-xl p-5 sm:p-7 shadow-xl transition-all duration-300 group">
              {/* Corner marks */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-zinc-700 group-hover:border-[#E58518] transition-colors pointer-events-none" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-zinc-700 group-hover:border-[#E58518] transition-colors pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-zinc-700 group-hover:border-[#E58518] transition-colors pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-zinc-700 group-hover:border-[#E58518] transition-colors pointer-events-none" />

              {/* Header Row */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#E58518] uppercase tracking-wider">
                  OP_RECORD // 02
                </span>
                <span className="px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-400 font-mono text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wider">
                  ARCHIVED DEPLOYMENT
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg lg:text-xl font-bold uppercase text-white font-sans tracking-wide mt-3 group-hover:text-amber-400 transition-colors">
                COMMERCIAL & PROPERTY DETAIL
              </h3>

              {/* Description */}
              <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                Ongoing static and mobile security details for high-profile commercial partners, securing corporate environments, and neutralizing external infrastructure liabilities.
              </p>

              {/* Footer Capability Tag */}
              <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-zinc-400 font-mono text-[10px] sm:text-xs">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Target className="h-3.5 w-3.5 text-[#E58518]" />
                  <span>INFRASTRUCTURE SECURITY // MOBILE DETAIL</span>
                </div>
                <ArrowRight className="h-4 w-4 text-[#E58518] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: Dual Telemetry Metric Card */}
            <div className="relative bg-[#090C12] border border-zinc-800/90 rounded-xl p-5 sm:p-6 shadow-xl">
              {/* Corner marks */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-zinc-700 pointer-events-none" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-zinc-700 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-zinc-700 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-zinc-700 pointer-events-none" />

              <div className="grid grid-cols-2 divide-x divide-zinc-800/80">
                {/* Metric 1 */}
                <div className="pr-4 sm:pr-6">
                  <span className="font-mono text-[9px] sm:text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">
                    MISSION_SUCCESS_RATE
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
                    100.00%
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="pl-4 sm:pl-6">
                  <span className="font-mono text-[9px] sm:text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">
                    COMBAT_VET_STAFF
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-[#E58518] font-mono mt-1">
                    95% +
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
