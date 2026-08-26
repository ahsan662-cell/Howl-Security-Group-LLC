"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ServiceTiersTableProps {
  onRequestCoverage?: () => void;
}

interface SpecItem {
  id: string;
  title: string;
  description: string;
}

const ADVISORY_SPECS: SpecItem[] = [
  {
    id: "spec-1",
    title: "WORLDWIDE CONSULTING:",
    description: "Direct oversight & coordination for international principal travel.",
  },
  {
    id: "spec-2",
    title: "VETTED TIER-0 ASSETS:",
    description: "Rapid-deployment operator network for advance operations & secure transport.",
  },
  {
    id: "spec-3",
    title: "CRISIS MEDICAL INTEGRATION:",
    description: "TCCC/TECC certified trauma care protocols (MARCH algorithm).",
  },
  {
    id: "spec-4",
    title: "EXPEDITED READINESS:",
    description: "Under 4-hour wheels-up deployment standards.",
  },
];

export function ServiceTiersTable({ onRequestCoverage }: ServiceTiersTableProps) {
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
        rootMargin: "0px 0px -30px 0px",
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
      className="py-14 sm:py-20 lg:py-28 bg-[#05070A] border-b border-zinc-800/80 overflow-hidden relative"
    >
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/4 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-xl mx-auto lg:max-w-none">
          
          {/* Left Column: State-Level Precision & Overview (Centered on Mobile, Left-Aligned on Desktop) */}
          <div
            className={cn(
              "lg:col-span-6 space-y-5 sm:space-y-6 text-center lg:text-left transition-all duration-1000 ease-out transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8 sm:-translate-x-12"
            )}
          >
            {/* Pill Badge: • GLOBAL ADVISORY & CONSULTING */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#131620] border border-amber-500/30 text-[#E58518] font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E58518] animate-pulse" />
              <span>GLOBAL ADVISORY & CONSULTING</span>
            </div>

            {/* Main Section Headline */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-sans tracking-tight leading-[1.15]">
              STATE-LEVEL PRECISION.
              <br />
              GLOBAL REACH.
            </h2>

            {/* Orange Horizontal Accent Line (Centered on mobile, left on desktop) */}
            <div
              className={cn(
                "h-1 bg-[#E58518] rounded-full mx-auto lg:mx-0 transition-all duration-700 delay-200 ease-out origin-center lg:origin-left",
                isVisible ? "w-20 sm:w-24 scale-x-100 opacity-100" : "w-0 scale-x-0 opacity-0"
              )}
            />

            {/* Narrative Paragraphs with Staggered Fade */}
            <div className="space-y-4 text-xs sm:text-sm md:text-base text-zinc-300 font-sans leading-relaxed">
              <p
                className={cn(
                  "transition-all duration-700 delay-300 ease-out transform",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                While HOWL Security Group operates primarily as a licensed Florida security agency, our leadership serves as strategic chief security consultants for international and multi-state deployments.
              </p>

              <p
                className={cn(
                  "text-zinc-400 transition-all duration-700 delay-400 ease-out transform",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                Through established relationships with premier global defense groups and an active roster of Tier-0 operators, HOWL seamlessly coordinates worldwide protection, crisis medical response (TCCC/TECC), and advance logistics for high-net-worth principals.
              </p>
            </div>

            {/* Bottom Status Command Link (Centered on Mobile) */}
            <div
              className={cn(
                "pt-3 sm:pt-4 flex items-center justify-center lg:justify-start gap-2.5 font-mono text-[11px] sm:text-xs text-emerald-400 font-bold uppercase tracking-wider transition-all duration-700 delay-500 ease-out transform",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
              <span className="break-words">ACTIVE TACTICAL OPERATIONS COMMAND LINK (A-TOC)</span>
            </div>
          </div>

          {/* Right Column: Advisory Specs Card (Slide-in from Right on all screens) */}
          <div
            className={cn(
              "lg:col-span-6 transition-all duration-1000 delay-150 ease-out transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 sm:translate-x-12"
            )}
          >
            <div className="relative bg-[#090C12] border border-amber-900/30 hover:border-amber-500/40 rounded-2xl p-5 sm:p-7 lg:p-9 shadow-2xl shadow-black/80 transition-colors duration-500 group">
              
              {/* Inner Specs List - Clean separation on mobile */}
              <div className="space-y-4 sm:space-y-6">
                {ADVISORY_SPECS.map((spec, index) => {
                  const isLast = index === ADVISORY_SPECS.length - 1;
                  const delayClasses = [
                    "delay-250",
                    "delay-350",
                    "delay-450",
                    "delay-550",
                  ][index];

                  return (
                    <div
                      key={spec.id}
                      className={cn(
                        "p-4 sm:p-0 rounded-xl bg-[#06080D] sm:bg-transparent border border-zinc-800/80 sm:border-0 transition-all duration-700 ease-out transform text-left",
                        !isLast && "sm:border-b sm:border-zinc-800/80 sm:pb-5 sm:pb-6",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                        delayClasses
                      )}
                    >
                      <h3 className="font-mono text-xs sm:text-[13px] font-bold text-[#E58518] uppercase tracking-wider group-hover:text-amber-400 transition-colors">
                        {spec.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                        {spec.description}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
