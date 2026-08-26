"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlueprintItem {
  code: string;
  title: string;
  description: string;
}

const BLUEPRINT_ITEMS: BlueprintItem[] = [
  {
    code: "OPS-01",
    title: "MILITARY / SOF / LEO",
    description:
      "Minimum of 4 years honorable active duty service in military special operations, elite law enforcement units, or verified intelligence operations.",
  },
  {
    code: "OPS-02",
    title: "LICENSING CERTIFICATION",
    description:
      "Must maintain active Florida security certifications including Class D, Class G (Armed), and highly preferred CC (Private Investigator) credentials.",
  },
  {
    code: "OPS-03",
    title: "TACTICAL PHYSICALITY",
    description:
      "Must pass rigorous physical fitness standards, stress-response shooting trials, and continuous scenario-based protective operations testing.",
  },
];

export function TacticalRecruitmentBlueprint() {
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
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-24 bg-[#06080D] border-b border-zinc-800/80 relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div
          className={cn(
            "mb-10 sm:mb-14 transition-all duration-700 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          {/* Top Tag: QUALIFICATIONS OVERVIEW */}
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E58518] block mb-2">
            QUALIFICATIONS OVERVIEW
          </span>

          {/* Main Title: TACTICAL RECRUITMENT BLUEPRINT */}
          <h2 className="text-2xl sm:text-4xl lg:text-[2.6rem] font-black uppercase text-white font-sans tracking-tight">
            TACTICAL RECRUITMENT BLUEPRINT
          </h2>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {BLUEPRINT_ITEMS.map((item, index) => (
            <div
              key={item.code}
              style={{
                transitionDelay: `${index * 150 + 150}ms`,
              }}
              className={cn(
                "group relative bg-[#090C13] border border-zinc-800/90 hover:border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-1",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              {/* Subtle Tactical Corner Marks on Hover */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-transparent group-hover:border-[#E58518] transition-colors pointer-events-none" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-transparent group-hover:border-[#E58518] transition-colors pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-transparent group-hover:border-[#E58518] transition-colors pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-transparent group-hover:border-[#E58518] transition-colors pointer-events-none" />

              {/* Top Row: OPS Code & Arrow */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#E58518] tracking-wider uppercase">
                  {item.code}
                </span>
                <ChevronRight className="w-4 h-4 text-[#E58518] group-hover:translate-x-1 transition-transform duration-300" />
              </div>

              {/* Card Title */}
              <h3 className="text-lg sm:text-xl font-bold uppercase text-white font-sans tracking-wide mt-5 group-hover:text-amber-400 transition-colors duration-300">
                {item.title}
              </h3>

              {/* Card Description */}
              <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
