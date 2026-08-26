"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function CommandingTheFront() {
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
        threshold: 0.1,
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
      id="founder"
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-28 bg-[#05070A] border-b border-zinc-800/80 overflow-hidden relative"
    >
      {/* Ambient subtle glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          {/* Pill Badge: • THE FOUNDER */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#121622] border border-[#E58518]/40 text-[#E58518] font-mono text-[10.5px] sm:text-xs font-bold tracking-wider uppercase mb-3 sm:mb-4 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E58518] animate-pulse" />
            <span>THE FOUNDER</span>
          </div>

          {/* Section Main Title */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-sans tracking-tight leading-tight">
            COMMANDING THE FRONT
          </h2>

          {/* Subtitle Paragraph */}
          <p className="mt-3 text-xs sm:text-sm md:text-base text-zinc-400 font-sans leading-relaxed max-w-2xl mx-auto">
            Forged in elite military operations, translating battlefield precision into high-tier private protection.
          </p>
        </div>

        {/* 2-Column Dossier Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-xl lg:max-w-none mx-auto">
          
          {/* Left Column: Founder Portrait Card */}
          <div
            className={cn(
              "lg:col-span-5 transition-all duration-1000 ease-out transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8 sm:-translate-x-12"
            )}
          >
            <div className="relative bg-[#090C12] border border-zinc-800/90 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 transition-all duration-500 group">
              
              {/* Portrait Image Container */}
              <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] overflow-hidden bg-[#07090E]">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2000&auto=format&fit=crop"
                  alt="Gerald Hazellief - Founder & Principal Instructor"
                  className="w-full h-full object-cover object-[center_12%] filter grayscale contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Atmospheric Dark Bottom Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/30 to-transparent pointer-events-none" />
              </div>

              {/* Bottom Identity Bar */}
              <div className="p-4 sm:p-5 bg-[#0A0D14] border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold uppercase text-white font-sans tracking-wide">
                    GERALD HAZELLIEF
                  </h3>
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#E58518] uppercase tracking-wider block mt-0.5">
                    FOUNDER & PRINCIPAL INSTRUCTOR
                  </span>
                </div>

                {/* Tactical Target Indicator */}
                <div className="w-7 h-7 rounded-full border border-[#E58518] flex items-center justify-center p-1 text-[#E58518] group-hover:scale-110 transition-transform duration-300">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-full h-full"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="22" y1="12" x2="18" y2="12" />
                    <line x1="6" y1="12" x2="2" y2="12" />
                    <line x1="12" y1="6" x2="12" y2="2" />
                    <line x1="12" y1="22" x2="12" y2="18" />
                  </svg>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Operational Creed, Narrative, and Metrics */}
          <div
            className={cn(
              "lg:col-span-7 space-y-6 text-left transition-all duration-1000 delay-150 ease-out transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 sm:translate-x-12"
            )}
          >
            
            {/* Top Operational Creed Quote */}
            <div>
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-black uppercase text-white font-sans tracking-tight leading-[1.2]">
                &ldquo;WE DO NOT RISE TO THE LEVEL OF OUR EXPECTATIONS. WE FALL TO THE LEVEL OF OUR TRAINING.&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="mt-3 flex items-center gap-2.5 font-mono text-[10.5px] sm:text-xs font-bold uppercase tracking-wider text-[#E58518]">
                <span className="w-5 h-[1.5px] bg-[#E58518] rounded-full" />
                <span>FOUNDER&apos;S OPERATIONAL CREED</span>
              </div>
            </div>

            {/* Narrative Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm md:text-[15px] text-zinc-300 font-sans leading-relaxed">
              <p>
                HOWL Security Group was born from a realization that private security has largely devolved into theatre. After leaving active service with the 75th Ranger Regiment, our founder noticed a critical gap: corporate executives and high-value institutions were paying premium rates for passive guards who lacked the tactical instincts to proactively disrupt threats.
              </p>

              <p className="text-zinc-400">
                By combining elite military special operations methodology with deep defensive combatives and civilian close protection mastery, HOWL delivers an uncompromising shield. We don&apos;t just stand watch; we dynamically analyze and mitigate risks before they materialize.
              </p>
            </div>

            {/* 3 Metric Summary Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              
              {/* Metric 1 */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#090C12] border border-zinc-800/90 hover:border-amber-500/40 transition-colors shadow-md">
                <div className="text-2xl sm:text-3xl font-black text-[#E58518] font-mono tracking-tight">
                  75th
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono font-bold uppercase text-zinc-400 mt-1 tracking-wider">
                  RANGER REGIMENT
                </div>
              </div>

              {/* Metric 2 */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#090C12] border border-zinc-800/90 hover:border-amber-500/40 transition-colors shadow-md">
                <div className="text-2xl sm:text-3xl font-black text-[#E58518] font-mono tracking-tight">
                  30+ YRS
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono font-bold uppercase text-zinc-400 mt-1 tracking-wider">
                  VING TSUN MASTERY
                </div>
              </div>

              {/* Metric 3 */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#090C12] border border-zinc-800/90 hover:border-amber-500/40 transition-colors shadow-md">
                <div className="text-2xl sm:text-3xl font-black text-[#E58518] font-mono tracking-tight">
                  100%
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono font-bold uppercase text-zinc-400 mt-1 tracking-wider">
                  MISSION SUCCESS
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
