"use client";

import React, { useEffect, useRef, useState } from "react";
import { ShieldCheck, Target, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export function PrecisionGeometryLineage() {
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
      className="py-16 sm:py-24 lg:py-32 bg-[#06080D] border-b border-zinc-800/80 relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[650px] h-[400px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Visual Media Card with Chi Sao / Forearm Cross Combat Stance */}
          <div
            className={cn(
              "lg:col-span-6 transition-all duration-1000 ease-out transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            )}
          >
            <div className="relative bg-[#090C12] border border-zinc-800/90 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl group transition-all duration-500">
              
              {/* Image Container */}
              <div className="relative w-full h-[340px] sm:h-[420px] md:h-[480px] overflow-hidden bg-[#07090E]">
                
                {/* Martial Arts Forearms Cross SVG Graphic & Background */}
                <div className="absolute inset-0 bg-[#070A10] flex items-center justify-center overflow-hidden">
                  <img src="
                  /images/founder-command.png" 
                  alt=""
                  className="object-cover w-full h-full" />
                </div>

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090C12] via-transparent to-transparent pointer-events-none" />

                {/* Bottom Left Badge: ● SIFU GERALD HAZELLIEF (MOY ZHAN WU) */}
                <div className="absolute bottom-4 left-4 z-10">
                  <div className="px-3.5 py-1.5 rounded bg-[#090C13]/90 border border-zinc-800 backdrop-blur-md text-white font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E58518] animate-pulse" />
                    <span>SIFU GERALD HAZELLIEF (MOY ZHAN WU)</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Narrative & Direct Lineage Tree */}
          <div
            className={cn(
              "lg:col-span-6 space-y-6 transition-all duration-1000 delay-150 ease-out transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}
          >
            {/* Top Category Badge */}
            <div className="inline-block px-3 py-1 rounded bg-[#101420] border border-amber-500/30 text-[#E58518] font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              TRADITIONAL LINEAGE & SCIENCE
            </div>

            {/* Main Headline */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black uppercase text-white font-sans tracking-tight leading-[1.08]">
                PRECISION GEOMETRY OVER BRUTE STRENGTH
              </h2>

              {/* Orange Horizontal Accent Line */}
              <div className="w-16 h-[3px] bg-[#E58518] rounded-full mt-3 shadow-[0_0_12px_rgba(229,133,24,0.6)]" />
            </div>

            {/* Description Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm md:text-base text-zinc-400 font-sans leading-relaxed">
              <p>
                Under the guidance of Sifu Gerald Hazellief, training focuses deeply on developing structural power, tactile sensitivity, and precise spatial awareness rather than relying on raw physical force.
              </p>
              <p>
                Whether applied to executive hand-to-hand combatives or traditional martial arts mastery, Ving Tsun conditions the mind and body for instant reaction under high stress.
              </p>
            </div>

            {/* Direct Lineage Tree & Focus Box */}
            <div className="bg-[#090C12] border border-zinc-800/90 rounded-xl p-5 sm:p-6 space-y-4 shadow-xl">
              
              {/* Row 1: Direct Lineage Tree */}
              <div className="border-b border-zinc-800/80 pb-3.5 space-y-1.5">
                <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#E58518] uppercase tracking-wider block">
                  DIRECT LINEAGE TREE:
                </span>
                <p className="text-xs sm:text-sm font-bold text-white font-sans flex items-center gap-1.5 flex-wrap leading-relaxed">
                  <span>Ip Man</span>
                  <span className="text-[#E58518]">→</span>
                  <span>Moy Yat</span>
                  <span className="text-[#E58518]">→</span>
                  <span>Moy Yee Hop</span>
                  <span className="text-[#E58518]">→</span>
                  <span>Moy Thai Shan</span>
                  <span className="text-[#E58518]">→</span>
                  <span className="text-amber-400 font-black">Gerald Hazellief (Moy Zhan Wu)</span>
                </p>
              </div>

              {/* Row 2: Training Focus */}
              <div className="space-y-1">
                <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#E58518] uppercase tracking-wider block">
                  TRAINING FOCUS:
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans">
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
