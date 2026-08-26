"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronRight, X, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntelBriefing {
  id: string;
  code: string;
  date: string;
  category: string;
  priority?: string;
  secondaryBadge?: string;
  title: string;
  image: string;
  target: string;
  coord: string;
  summary: string;
  keyFindings: string[];
}

const INTEL_BRIEFINGS: IntelBriefing[] = [
  {
    id: "intel-01",
    code: "INTEL-01",
    date: "2026.08.17",
    category: "VENUE THREAT DEPT",
    priority: "PRIORITY // HIGH",
    title: "ADVANCE SITE PLANNING: HOW PRE-ARRIVAL SURVEYS NEUTRALIZE VENUE THREATS",
    image: "/images/intel/intel-01-toc.png",
    target: "MULTI-FACILITY COMPLIANCE",
    coord: "25.7617° N, 80.1918° W",
    summary:
      "Comprehensive evaluation of pre-arrival perimeter sweeps, ingress/egress bottleneck mapping, and covert surveillance detection before principal arrival.",
    keyFindings: [
      "Physical ingress points surveyed and cross-checked against local threat telemetry.",
      "Surveillance blind spot mitigation and emergency trauma egress corridor established.",
      "Liaison established with local law enforcement and rapid medical evacuation vectors.",
    ],
  },
  {
    id: "intel-02",
    code: "INTEL-02",
    date: "2026.08.17",
    category: "ASSET RECON DEPT",
    secondaryBadge: "ESTATE SECURITY",
    title: "HIGH-NET-WORTH ESTATE SECURITY: MOVING BEYOND STANDARD ALARM SYSTEMS",
    image: "/images/intel/intel-02-estate.png",
    target: "LUXURY PERIMETER PROTOCOLS",
    coord: "26.1224° N, 80.1373° W",
    summary:
      "Modern perimeter intrusion detection systems (PIDS), fiber-optic fence sensors, and proactive physical patrols configured to neutralize residential vulnerabilities.",
    keyFindings: [
      "Multi-layered concentric rings of defense configured from exterior tree line to primary sanctuary.",
      "Active thermal imaging and autonomous radar verification integrated with Florida TOC.",
      "Strict access authorization protocols for domestic and maintenance contractors.",
    ],
  },
  {
    id: "intel-03",
    code: "INTEL-03",
    date: "2026.08.17",
    category: "LOGISTICS & MOBILITY",
    secondaryBadge: "S. FLORIDA METRO",
    title: "EXECUTIVE TRAVEL IN SOUTH FLORIDA: ROUTE PLANNING AND THREAT MITIGATION",
    image: "/images/intel/intel-03-rain-convoy.png",
    target: "EXECUTIVE ESCORT CONVOYS",
    coord: "25.7907° N, 80.1300° W",
    summary:
      "Low-profile motorcade tactics, counter-surveillance route alternation, and adverse weather tactical transit protocols across the Palm Beach and Miami-Dade corridors.",
    keyFindings: [
      "Primary, secondary, and tertiary choke-point avoidance routes actively monitored.",
      "Adverse meteorological contingency and armored traction control specifications.",
      "Encrypted mobile comms network connected directly to Fort Pierce Dispatch Command.",
    ],
  },
];

export function ClassifiedBriefings() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeModalBrief, setActiveModalBrief] = useState<IntelBriefing | null>(null);

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
      className="py-14 sm:py-20 lg:py-28 bg-[#06080D] border-b border-zinc-800/80 overflow-hidden relative font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Telemetry Header Bar */}
        <div
          className={cn(
            "flex flex-col sm:flex-row items-center justify-between gap-3 pb-6 sm:pb-8 border-b border-zinc-800/80 font-mono text-[11px] sm:text-xs transition-all duration-700 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          )}
        >
          <div className="text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E58518] animate-pulse" />
            <span>[ CLASSIFIED BRIEFINGS BOARD // ACCESS LEVEL: DIRECT / LEVEL 4 ]</span>
          </div>

          <div className="text-zinc-400">
            <span>UPDATED: 2026.08.17 06:00 Zulu</span>
          </div>
        </div>

        {/* 3 Horizontal Briefing Cards */}
        <div className="mt-8 space-y-6 sm:space-y-8">
          {INTEL_BRIEFINGS.map((brief, index) => {
            const delayClasses = ["delay-150", "delay-300", "delay-450"][index];

            return (
              <div
                key={brief.id}
                onClick={() => setActiveModalBrief(brief)}
                className={cn(
                  "relative bg-[#090C12] border border-zinc-800/90 hover:border-amber-500/50 rounded-xl p-4 sm:p-5 lg:p-6 shadow-2xl transition-all duration-500 ease-out transform flex flex-col md:flex-row items-stretch gap-5 sm:gap-6 group hover:-translate-y-1 cursor-pointer",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8",
                  delayClasses
                )}
              >
                {/* Left Thumbnail Image */}
                <div className="w-full md:w-72 lg:w-80 h-48 sm:h-52 md:h-auto shrink-0 rounded-lg overflow-hidden relative bg-[#07090E] border border-zinc-800/70">
                  <img
                    src={brief.image}
                    alt={brief.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090C12]/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Right Content */}
                <div className="flex-grow flex flex-col justify-between py-1">
                  <div>
                    {/* Header Row: Code & Category Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                      <span className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider">
                        [ {brief.code} // {brief.date} ]
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-400 font-mono text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wider">
                          {brief.category}
                        </span>

                        {brief.priority && (
                          <span className="px-2.5 py-0.5 rounded bg-amber-950/40 border border-amber-500/50 text-[#E58518] font-mono text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wider">
                            {brief.priority}
                          </span>
                        )}

                        {brief.secondaryBadge && (
                          <span className="px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-400 font-mono text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wider">
                            {brief.secondaryBadge}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Briefing Title */}
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold uppercase text-white font-sans tracking-wide mt-3 sm:mt-4 leading-snug group-hover:text-amber-400 transition-colors">
                      {brief.title}
                    </h3>
                  </div>

                  {/* Bottom Target & Access Action Row */}
                  <div className="mt-5 sm:mt-6 pt-3.5 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-[10.5px] sm:text-xs">
                    <div className="text-zinc-500">
                      <span>TARGET: {brief.target} // COORD: {brief.coord}</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-[#E58518] font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform self-end sm:self-auto">
                      <span>ACCESS DOCUMENT</span>
                      <ChevronRight className="h-4 w-4 stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Confidentiality Telemetry Bar */}
        <div
          className={cn(
            "mt-10 sm:mt-14 pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10.5px] sm:text-xs text-zinc-500 text-center sm:text-left transition-all duration-700 delay-500 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <span>CONFIDENTIALITY DISCLOSURE: DISTRIBUTION TO AUTHORIZED PERSONS ONLY.</span>
          <div className="flex items-center gap-2">
            <span>TERM: ID-00-11 // REF</span>
            <span className="text-[#E58518] font-bold">HSG © 2026</span>
          </div>
        </div>

      </div>

      {/* Interactive Classified Briefing Reader Modal */}
      {activeModalBrief && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in text-left">
          <div className="relative w-full max-w-3xl bg-[#090C12] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto font-sans">
            
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveModalBrief(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-[#141824] text-zinc-400 hover:text-white transition-colors cursor-pointer border border-zinc-800"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 font-mono text-xs text-[#E58518] font-bold uppercase tracking-wider mb-1.5">
                <Lock className="h-3.5 w-3.5" />
                <span>[ CLASSIFIED BRIEFING // {activeModalBrief.code} ]</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                {activeModalBrief.title}
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-400">
                <span>Date: {activeModalBrief.date}</span>
                <span>•</span>
                <span>Category: {activeModalBrief.category}</span>
                <span>•</span>
                <span>Coord: {activeModalBrief.coord}</span>
              </div>
            </div>

            {/* Image Preview */}
            <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden mb-6 border border-zinc-800 relative">
              <img
                src={activeModalBrief.image}
                alt={activeModalBrief.title}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Summary */}
            <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <div className="p-4 bg-[#07090E] border border-zinc-800 rounded-lg">
                <span className="font-mono text-xs text-[#E58518] font-bold uppercase tracking-wider block mb-1">
                  // EXECUTIVE OPERATIONAL SUMMARY:
                </span>
                <p>{activeModalBrief.summary}</p>
              </div>

              {/* Key Findings */}
              <div className="space-y-2 pt-2">
                <span className="font-mono text-xs text-zinc-400 font-bold uppercase tracking-wider block">
                  TACTICAL EVALUATION & PROTOCOLS:
                </span>
                <ul className="space-y-2">
                  {activeModalBrief.keyFindings.map((finding, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-zinc-300">
                      <span className="text-[#E58518] font-mono font-bold mt-0.5">0{idx + 1}.</span>
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer Action */}
            <div className="mt-8 pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
              <span className="text-zinc-500">AUTHENTICATED BY HOWL OPERATIONS COMMAND</span>
              <button
                onClick={() => setActiveModalBrief(null)}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#E58518] hover:bg-[#F59E0B] text-black font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Close Document
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
