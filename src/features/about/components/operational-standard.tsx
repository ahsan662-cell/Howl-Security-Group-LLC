"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface OperationalPillar {
  title: string;
  description: string;
}

const OPERATIONAL_PILLARS: OperationalPillar[] = [
  {
    title: "LOW-PROFILE EXECUTIVE PRESENCE",
    description:
      "Seamless blending into high-profile, professional, or social environments without compromising defense posture.",
  },
  {
    title: "ADVANCE ROUTE & LOGISTICS PLANNING",
    description:
      "Deep tactical mapping, multi-layered contingency protocols, and real-time transit intelligence.",
  },
  {
    title: "DIRECT THREAT IDENTIFICATION & DE-ESCALATION",
    description:
      "Rapid profiling, perimeter sensory systems, and rapid target isolation with minimum force escalation.",
  },
];

export function OperationalStandard() {
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
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-32 bg-[#06080D] border-b border-zinc-800/80 overflow-hidden relative"
    >
      {/* Background Central Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          {/* Small Category Tag */}
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E58518] block mb-2 sm:mb-3">
            ELITE FORCE DOCTRINE
          </span>

          {/* Section Main Title */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white font-sans tracking-tight leading-[1.08]">
            THE HOWL OPERATIONAL
            <br />
            STANDARD
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-400 font-sans leading-relaxed max-w-2xl mx-auto">
            Our protocols are forged in military service and refined in complex high-threat civilian environments. We do not compromise on security architecture.
          </p>
        </div>

        {/* Vertical Stacked Cards */}
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5">
          {OPERATIONAL_PILLARS.map((pillar, index) => {
            const delayClasses = ["delay-150", "delay-300", "delay-450"][index];

            return (
              <div
                key={pillar.title}
                className={cn(
                  "relative bg-[#090C12] border border-zinc-800/90 hover:border-amber-500/50 rounded-2xl p-5 sm:p-7 shadow-xl shadow-black/60 transition-all duration-500 ease-out transform flex items-start sm:items-center gap-4 sm:gap-6 group hover:translate-x-1.5 hover:shadow-amber-500/10",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8",
                  delayClasses
                )}
              >
                {/* Left Tactical Target Reticle Box */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#121622] border border-[#E58518]/60 flex items-center justify-center text-[#E58518] shrink-0 group-hover:scale-105 group-hover:border-[#E58518] transition-all duration-300">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </div>

                {/* Content Block */}
                <div className="flex-grow">
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold uppercase text-white font-sans tracking-wide group-hover:text-amber-400 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
