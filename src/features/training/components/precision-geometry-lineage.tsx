"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface PrecisionGeometryLineageProps {
  className?: string;
}

export function PrecisionGeometryLineage({ className }: PrecisionGeometryLineageProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="precision-geometry"
      className={cn(
        "py-16 sm:py-24 lg:py-32 bg-[#06080D] border-t border-zinc-800/80 relative overflow-hidden",
        className
      )}
      aria-label="Traditional Lineage and Science - Precision Geometry Over Brute Strength"
    >
      {/* Dynamic Background Atmospheric Ambience */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[500px] h-[350px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[250px] bg-orange-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Visual Media Card with Forearm Cross & Sifu Badge */}
          <div
            className={cn(
              "lg:col-span-6 transition-all duration-1000 ease-out transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}
          >
            <div className="relative bg-[#090C12] border border-zinc-800/90 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl shadow-black/90 group transition-all duration-500">
              
              {/* Image Container with Responsive Aspect Ratio */}
              <div className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] lg:h-[540px] overflow-hidden bg-[#07090E]">
                
                {/* Cinematic Martial Arts Crossed Arms / Chi Sao Technique Visual */}
                <img
                  src="/images/hand.jpeg"
                  alt="Ving Tsun Chi Sao Sticky Hands and Precision Biomechanical Geometry"
                  className="w-full h-full object-cover object-center filter contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Atmospheric Dark Edge Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090C12] via-[#090C12]/20 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#090C12]/40 via-transparent to-[#090C12]/40 pointer-events-none" />

                {/* Bottom Left Telemetry Badge: SIFU GERALD HAZELLIEF (MOY ZHAN WU) */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-10">
                  <div className="px-3.5 sm:px-4 py-2 rounded-lg bg-[#090C13]/90 border border-zinc-800/90 backdrop-blur-md text-white font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-2xl flex items-center gap-2.5 group-hover:border-amber-500/50 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-[#E58518] shadow-[0_0_8px_#E58518] animate-pulse shrink-0" />
                    <span className="tracking-widest">SIFU GERALD HAZELLIEF (MOY ZHAN WU)</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Traditional Lineage, Scientific Breakdown & Lineage Tree */}
          <div
            className={cn(
              "lg:col-span-6 space-y-6 transition-all duration-1000 delay-200 ease-out transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            )}
          >
            {/* Top Badge: TRADITIONAL LINEAGE & SCIENCE */}
            <div>
              <div className="inline-block px-3.5 py-1.5 rounded bg-[#101420] border border-amber-500/30 text-[#E58518] font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
                TRADITIONAL LINEAGE & SCIENCE
              </div>
            </div>

            {/* Main Section Headline */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black uppercase text-white font-sans tracking-tight leading-[1.08]">
                PRECISION GEOMETRY OVER BRUTE STRENGTH
              </h2>

              {/* Orange Horizontal Accent Line */}
              <div className="w-16 h-[3px] bg-[#E58518] rounded-full mt-4 shadow-[0_0_12px_rgba(229,133,24,0.6)]" />
            </div>

            {/* Explanatory Body Copy */}
            <div className="space-y-4 text-sm sm:text-[15px] md:text-base text-zinc-400 font-sans leading-relaxed">
              <p>
                Under the guidance of Sifu Gerald Hazellief, training focuses deeply on developing structural power, tactile sensitivity, and precise spatial awareness rather than relying on raw physical force.
              </p>
              <p>
                Whether applied to executive hand-to-hand combatives or traditional martial arts mastery, Ving Tsun conditions the mind and body for instant reaction under high stress.
              </p>
            </div>

            {/* Direct Lineage Tree & Training Focus Card */}
            <div className="bg-[#090C12] border border-zinc-800/90 rounded-xl p-5 sm:p-6 space-y-5 shadow-2xl hover:border-zinc-700/80 transition-colors">
              
              {/* Block 1: Direct Lineage Tree */}
              <div className="border-b border-zinc-800/80 pb-4 space-y-2">
                <span className="font-mono text-[11px] sm:text-xs font-bold text-[#E58518] uppercase tracking-wider block">
                  DIRECT LINEAGE TREE:
                </span>
                <div className="text-xs sm:text-sm font-medium text-white font-sans flex items-center gap-1.5 sm:gap-2 flex-wrap leading-relaxed">
                  <span className="text-zinc-200">Ip Man</span>
                  <span className="text-[#E58518] font-bold text-xs sm:text-sm">➔</span>
                  <span className="text-zinc-200">Moy Yat</span>
                  <span className="text-[#E58518] font-bold text-xs sm:text-sm">➔</span>
                  <span className="text-zinc-200">Moy Yee Hop</span>
                  <span className="text-[#E58518] font-bold text-xs sm:text-sm">➔</span>
                  <span className="text-zinc-200">Moy Thai Shan</span>
                  <span className="text-[#E58518] font-bold text-xs sm:text-sm">➔</span>
                  <span className="text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Gerald Hazellief (Moy Zhan Wu)
                  </span>
                </div>
              </div>

              {/* Block 2: Training Focus */}
              <div className="space-y-1.5">
                <span className="font-mono text-[11px] sm:text-xs font-bold text-[#E58518] uppercase tracking-wider block">
                  TRAINING FOCUS:
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans font-medium">
                  Structural Mechanics • Tactile Sensitivity • Close-Quarters Combatives
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
