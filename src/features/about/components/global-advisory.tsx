"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AdvisorySpecItem {
  label: string;
  description: string;
}

const ADVISORY_SPECS: AdvisorySpecItem[] = [
  {
    label: "WORLDWIDE CONSULTING:",
    description: "Direct oversight & coordination for international principal travel.",
  },
  {
    label: "VETTED TIER-0 ASSETS:",
    description: "Rapid-deployment operator network for advance operations & secure transport.",
  },
  {
    label: "CRISIS MEDICAL INTEGRATION:",
    description: "TCCC/TECC certified trauma care protocols (MARCH algorithm).",
  },
  {
    label: "EXPEDITED READINESS:",
    description: "Under 4-hour wheels-up deployment standards.",
  },
];

export function GlobalAdvisory() {
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
      {/* Background Ambience & Subtle Emblem Watermark on Right */}
      <div className="absolute top-12 right-12 w-96 h-96 opacity-10 pointer-events-none select-none hidden lg:block">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full stroke-zinc-400 stroke-[0.8] fill-none"
        >
          <circle cx="50" cy="50" r="45" />
          <line x1="50" y1="5" x2="50" y2="95" />
          <line x1="5" y1="50" x2="95" y2="50" />
          <circle cx="50" cy="50" r="28" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading, Accent Line, and Narrative */}
          <div
            className={cn(
              "lg:col-span-6 space-y-6 text-center sm:text-left transition-all duration-1000 ease-out transform max-w-xl mx-auto lg:max-w-none",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8 sm:-translate-x-12"
            )}
          >
            {/* Pill Badge: GLOBAL ADVISORY & CONSULTING */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-[#121622] border border-[#E58518]/40 text-[#E58518] font-mono text-[10.5px] sm:text-xs font-bold tracking-wider uppercase shadow-sm">
                <span>GLOBAL ADVISORY & CONSULTING</span>
              </div>
            </div>

            {/* Main Headline */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-sans tracking-tight leading-[1.12]">
              WIDE-SPECTRUM
              <br />
              COVERAGE & TIER-0
              <br />
              OPERATOR NETWORK
            </h2>

            {/* Orange Horizontal Accent Line */}
            <div className="w-16 h-1 bg-[#E58518] rounded-full mx-auto sm:mx-0" />

            {/* Narrative Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm md:text-base text-zinc-400 font-sans leading-relaxed">
              <p>
                While HOWL Security Group operates primarily as a licensed Florida security agency, our leadership serves as strategic chief security consultants for international and multi-state deployments.
              </p>
              <p>
                Through established relationships with premier global defense groups and an active roster of Tier-0 operators, HOWL seamlessly coordinates worldwide protection, crisis medical response (TCCC/TECC), and advance logistics for high-net-worth principals.
              </p>
            </div>
          </div>

          {/* Right Column: Advisory Specs Card */}
          <div
            className={cn(
              "lg:col-span-6 transition-all duration-1000 delay-150 ease-out transform max-w-xl mx-auto lg:max-w-none w-full",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 sm:translate-x-12"
            )}
          >
            <div className="bg-[#090C12] border border-zinc-800/90 hover:border-amber-500/40 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black/80 transition-all duration-500 group">
              
              {/* Header: ROSTER_SPEC_24.09 & Glowing Pulse Indicator */}
              <div className="flex items-center justify-between pb-6 border-b border-zinc-800/80">
                <span className="font-mono text-xs font-bold text-[#E58518] tracking-widest uppercase">
                  ROSTER_SPEC_24.09
                </span>
                <span className="h-2 w-2 rounded-full bg-[#E58518] shadow-[0_0_8px_#f59e0b] animate-pulse" />
              </div>

              {/* 4 Specifications List */}
              <div className="divide-y divide-zinc-800/80">
                {ADVISORY_SPECS.map((spec, idx) => (
                  <div key={idx} className="py-4 sm:py-5 first:pt-5 last:pb-0 text-left">
                    <span className="font-mono text-[11px] sm:text-xs font-bold text-[#E58518] tracking-wider uppercase block mb-1.5">
                      {spec.label}
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                      {spec.description}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
