"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ShieldCheck, Award, Target, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

type TabKey = "system" | "master";

export function TrainingLineageTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("system");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="lineage"
      className="py-16 sm:py-20 lg:py-28 bg-[#06080D] border-b border-zinc-800/80 relative overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tab Bar Navigation */}
        <div
          className={cn(
            "border-b border-zinc-800/80 mb-12 sm:mb-16 transition-all duration-700 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          )}
        >
          <div className="flex items-center gap-6 sm:gap-10 overflow-x-auto no-scrollbar font-mono text-xs sm:text-sm font-bold uppercase tracking-wider pb-px">
            
            {/* Tab 1: 01. THE SYSTEM & GEOMETRY (KUNG FU) */}
            <button
              type="button"
              onClick={() => setActiveTab("system")}
              className={cn(
                "pb-3.5 relative transition-all duration-300 whitespace-nowrap cursor-pointer",
                activeTab === "system"
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <span>01. THE SYSTEM & GEOMETRY (KUNG FU)</span>
              {activeTab === "system" && (
                <div className="absolute bottom-0 inset-x-0 h-[2.5px] bg-[#E58518] shadow-[0_0_12px_rgba(229,133,24,0.7)]" />
              )}
            </button>

            {/* Tab 2: 02. THE MASTER & LINEAGE (SIFU GERALD) */}
            <button
              type="button"
              onClick={() => setActiveTab("master")}
              className={cn(
                "pb-3.5 relative transition-all duration-300 whitespace-nowrap cursor-pointer",
                activeTab === "master"
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <span>02. THE MASTER & LINEAGE (SIFU GERALD)</span>
              {activeTab === "master" && (
                <div className="absolute bottom-0 inset-x-0 h-[2.5px] bg-[#E58518] shadow-[0_0_12px_rgba(229,133,24,0.7)]" />
              )}
            </button>

          </div>
        </div>

        {/* Tab Content Display Area */}
        <div className="relative min-h-[460px]">
          
          {/* TAB 1: THE SYSTEM & GEOMETRY */}
          {activeTab === "system" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center animate-fade-in">
              
              {/* Left Column: Visual Media Card */}
              <div className="lg:col-span-6">
                <div className="relative bg-[#090C12] border border-zinc-800/90 rounded-2xl overflow-hidden shadow-2xl group">
                  
                  {/* Photo with Combatives Stance */}
                  <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] overflow-hidden bg-[#07090E]">
                    <img
                      src="/images/founder-command.png"
                      alt="Sifu Gerald Hazellief Ving Tsun Biomechanics and Structure"
                      className="w-full h-full object-cover object-top filter contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Dark Bottom Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090C12] via-transparent to-transparent pointer-events-none" />

                    {/* Bottom Left Badge: PRECISION OVER BRUTE STRENGTH */}
                    <div className="absolute bottom-4 left-4 z-10">
                      <div className="px-3.5 py-1.5 rounded bg-[#090C13]/90 border border-zinc-800 backdrop-blur-md text-[#E58518] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg">
                        PRECISION OVER BRUTE STRENGTH
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Narrative & Technical Spec */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Top Category Tag */}
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E58518] block">
                  THE SYSTEM & GEOMETRY
                </span>

                {/* Headline */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-black uppercase text-white font-sans tracking-tight leading-[1.12] max-w-xl">
                  THE SCIENCE OF EFFICIENCY AND STRUCTURE
                </h3>

                {/* Subtitle / Paragraph */}
                <p className="text-xs sm:text-sm md:text-base text-zinc-400 font-sans leading-relaxed">
                  Ving Tsun (Wing Chun) is built entirely on mathematical efficiency, centerline geometry, and direct structural physics. Rather than opposing force with force, the system teaches direct geometric deflection, simultaneous combat tactics, and intense tactile reflexes to neutralize threats in fractions of a second.
                </p>

                {/* Spec Box */}
                <div className="bg-[#090C12] border border-zinc-800/90 rounded-xl p-5 sm:p-6 space-y-4 shadow-xl">
                  
                  {/* Row 1: Direct Lineage */}
                  <div className="border-b border-zinc-800/80 pb-3.5 space-y-1">
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#E58518] uppercase tracking-wider block">
                      DIRECT LINEAGE
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white font-sans flex items-center gap-1.5 flex-wrap">
                      <span>Grandmaster Yip Man</span>
                      <span className="text-[#E58518]">→</span>
                      <span>Grandmaster Moy Yat</span>
                      <span className="text-[#E58518]">→</span>
                      <span className="text-[#E58518]">Sifu Gerald Hazellief</span>
                    </p>
                  </div>

                  {/* Row 2: Core Principles */}
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#E58518] uppercase tracking-wider block">
                      CORE PRINCIPLES
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans">
                      Simultaneous Attack & Defense • Tactile Sensitivity • Economy of Motion
                    </p>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 2: THE MASTER & LINEAGE */}
          {activeTab === "master" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center animate-fade-in">
              
              {/* Left Column: Visual Media Card */}
              <div className="lg:col-span-6">
                <div className="relative bg-[#090C12] border border-zinc-800/90 rounded-2xl overflow-hidden shadow-2xl group">
                  
                  {/* Sifu Gerald Black Uniform Combatives Guard Stance */}
                  <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] overflow-hidden bg-[#07090E]">
                    <img
                      src="/images/founder-command.png"
                      alt="Sifu Gerald Hazellief 30+ Years of Mastery"
                      className="w-full h-full object-cover object-center filter contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090C12] via-transparent to-transparent pointer-events-none" />

                    {/* Bottom Left Badge */}
                    <div className="absolute bottom-4 left-4 z-10">
                      <div className="px-3.5 py-1.5 rounded bg-[#090C13]/90 border border-zinc-800 backdrop-blur-md text-[#E58518] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg">
                        SIFU GERALD HAZELLIEF // LEAD INSTRUCTOR
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Narrative & Credentials */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Top Tag: [ EXECUTIVE COMBATIVES DIRECT UNIT ] */}
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E58518] block">
                  [ EXECUTIVE COMBATIVES DIRECT UNIT ]
                </span>

                {/* Headline */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-black uppercase text-white font-sans tracking-tight leading-[1.12] max-w-xl">
                  SIFU GERALD HAZELLIEF — 30+ YEARS OF MASTERY
                </h3>

                {/* Subtitle / Bio Paragraph */}
                <p className="text-xs sm:text-sm md:text-base text-zinc-400 font-sans leading-relaxed">
                  Sifu Gerald Hazellief has dedicated over three decades to the preservation and direct application of traditional Ving Tsun Kung Fu. Trained extensively within the elite Grandmaster Moy Yat lineage, Sifu Gerald has served as a tactical and combatives advisor, training executive protection specialists, high-net-worth professionals, and dedicated martial artists with direct, uncompromising discipline.
                </p>

                {/* 3 Pill Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="px-3.5 py-1.5 rounded-full bg-amber-950/30 border border-amber-500/40 text-[#E58518] font-mono text-[11px] sm:text-xs font-bold tracking-wide">
                    Certified Moy Yat Lineage
                  </div>
                  <div className="px-3.5 py-1.5 rounded-full bg-amber-950/30 border border-amber-500/40 text-[#E58518] font-mono text-[11px] sm:text-xs font-bold tracking-wide">
                    Tactical & Combatives Advisor
                  </div>
                  <div className="px-3.5 py-1.5 rounded-full bg-amber-950/30 border border-amber-500/40 text-[#E58518] font-mono text-[11px] sm:text-xs font-bold tracking-wide">
                    Vero Beach / Lead
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
