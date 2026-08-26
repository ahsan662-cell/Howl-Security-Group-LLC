"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function MissionQuote() {
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
        threshold: 0.12,
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
      className="py-20 sm:py-28 lg:py-36 bg-[#06080D] border-b border-zinc-800/80 overflow-hidden relative"
    >
      {/* Background Ambience & Watermark Quote Mark */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Subtle Central Amber Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-600/10 rounded-full blur-3xl opacity-50" />

        {/* Faint Big Quotation Mark on Top-Left */}
        <div className="absolute top-6 left-8 sm:left-16 lg:left-24 text-zinc-800/30 text-8xl sm:text-9xl font-serif font-black select-none pointer-events-none">
          “
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 text-center">
        
        {/* Top Vertical Orange Dash Accent */}
        <div
          className={cn(
            "w-1.5 h-7 sm:h-8 bg-[#E58518] rounded-full mx-auto mb-8 sm:mb-10 transition-all duration-700 ease-out transform",
            isVisible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
          )}
        />

        {/* Main Quote Statement */}
        <blockquote
          className={cn(
            "text-lg sm:text-2xl md:text-3xl lg:text-[34px] font-black uppercase text-white font-sans tracking-tight text-center leading-[1.32] max-w-4xl mx-auto drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] transition-all duration-1000 delay-150 ease-out transform",
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-98"
          )}
        >
          &ldquo;AT HOWL SECURITY GROUP, OUR MISSION IS TO PROVIDE DISCIPLINED, PROFESSIONAL, AND ADAPTIVE SECURITY SOLUTIONS... INSPIRED BY THE PSYCHOLOGY OF THE WOLF—WHETHER OPERATING WITH THE COORDINATED STRENGTH OF THE PACK OR THE FOCUSED PRECISION OF THE LONE WOLF—WE REMAIN VIGILANT, STRATEGIC, AND COMMITTED TO PROTECTING OUR CLIENTS.&rdquo;
        </blockquote>

        {/* Bottom Attribution Line */}
        <div
          className={cn(
            "mt-8 sm:mt-12 inline-flex items-center justify-center gap-3 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#E58518] transition-all duration-700 delay-350 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <span className="w-6 h-[1.5px] bg-[#E58518] rounded-full" />
          <span>HOWL SECURITY GROUP OPERATIONAL MISSION STATEMENT</span>
        </div>

      </div>
    </section>
  );
}
