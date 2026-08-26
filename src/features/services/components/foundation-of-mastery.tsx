"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CredibilityCard {
  number: string;
  category: string;
  title: string;
  description: string;
  iconType: "crosshair" | "fist";
}

const CREDIBILITY_CARDS: CredibilityCard[] = [
  {
    number: "01",
    category: "DEFENSE",
    title: "MILITARY FOUNDATIONS",
    description:
      "U.S. Army Ranger background, Special Operations Team Leader, combat-tested tactical operations.",
    iconType: "crosshair",
  },
  {
    number: "02",
    category: "FIDELITY",
    title: "23+ YEARS PROTECTION EXPERIENCE",
    description:
      "Two decades guarding high-net-worth families, public officials, corporate executives, and church/synagogue institutions.",
    iconType: "crosshair",
  },
  {
    number: "03",
    category: "COMBATIVES",
    title: "MARTIAL ARTS MASTERY",
    description:
      "Sifu-level instructor in Ving Tsun Kung Fu with 30+ years of active martial arts and defensive combatives experience.",
    iconType: "fist",
  },
];

export function FoundationOfMastery() {
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
      className="py-16 sm:py-20 lg:py-28 bg-[#05070A] border-b border-zinc-800/80 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          {/* Pill Badge: • CREDIBILITY STACK */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#121622] border border-[#E58518]/40 text-[#E58518] font-mono text-[10.5px] sm:text-xs font-bold tracking-wider uppercase mb-4 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E58518] animate-pulse" />
            <span>CREDIBILITY STACK</span>
          </div>

          {/* Section Main Title */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-sans tracking-tight leading-tight">
            A FOUNDATION OF MASTERY
          </h2>

          {/* Subtitle Paragraph */}
          <p className="mt-3.5 text-xs sm:text-sm md:text-base text-zinc-400 font-sans leading-relaxed max-w-2xl mx-auto">
            Our capabilities are not theoretical. They are proven across combat zones, urban threat landscapes, and decades of defensive operations.
          </p>
        </div>

        {/* 3-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-xl md:max-w-none mx-auto">
          {CREDIBILITY_CARDS.map((card, index) => {
            const delayClasses = ["delay-150", "delay-300", "delay-450"][index];

            return (
              <div
                key={card.number}
                className={cn(
                  "relative bg-[#090C12] border border-zinc-800/90 hover:border-amber-500/50 rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/60 transition-all duration-500 ease-out transform flex flex-col justify-between group hover:-translate-y-1.5 hover:shadow-amber-500/10",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10",
                  delayClasses
                )}
              >
                <div>
                  {/* Top Bar: Tactical Icon on Left & Label on Right */}
                  <div className="flex items-center justify-between pb-5 border-b border-zinc-800/80">
                    
                    {/* Icon */}
                    <div className="text-[#E58518]">
                      {card.iconType === "crosshair" ? (
                        <div className="w-8 h-8 rounded-full border border-[#E58518] flex items-center justify-center p-1.5">
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
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-8 h-8 flex items-center justify-center">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-7 h-7"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Monospace Code Label */}
                    <span className="font-mono text-xs sm:text-[13px] font-bold tracking-wider text-[#E58518] uppercase">
                      {card.number} // {card.category}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white font-sans mt-5 group-hover:text-amber-400 transition-colors">
                    {card.title}
                  </h3>

                  {/* Card Description */}
                  <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                    {card.description}
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
