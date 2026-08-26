"use client";

import React, { useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function FounderBio() {
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
      id="founder"
      ref={sectionRef}
      className="py-14 sm:py-20 lg:py-28 bg-[#05070A] border-b border-zinc-800/80 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Tactical Visual Card with Exact Uploaded Shield & Founder Graphic */}
          <div
            className={cn(
              "lg:col-span-6 flex justify-center w-full max-w-xl mx-auto lg:max-w-none transition-all duration-1000 ease-out transform",
              isVisible
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 -translate-x-8 sm:-translate-x-12 scale-95"
            )}
          >
            <div className="relative w-full bg-[#090C12] border border-zinc-800/90 hover:border-amber-500/40 rounded-2xl p-2 sm:p-3 overflow-hidden shadow-2xl shadow-black/80 transition-all duration-500 group">
              <div className="relative w-full overflow-hidden rounded-xl bg-[#05070A] border border-zinc-800/60">
                <img
                  src="/images/founder-command.png"
                  alt="HOWL Security Group - Founder Gerald Hazellief and Tactical Command Shield"
                  className="w-full h-auto object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Direct Command Structure & Pillars with Staggered Entrance */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-center lg:text-left max-w-xl mx-auto lg:max-w-none">
            
            {/* Tag / Badge: [ DIRECT COMMAND STRUCTURE ] */}
            <div
              className={cn(
                "transition-all duration-700 ease-out transform",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
            >
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E58518]">
                [ DIRECT COMMAND STRUCTURE ]
              </span>
            </div>

            {/* Main Headline */}
            <h2
              className={cn(
                "text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white font-sans tracking-tight leading-[1.15] transition-all duration-700 delay-150 ease-out transform",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              )}
            >
              DIRECT SPECIAL
              <br />
              OPERATIONS COMMAND.
              <br />
              ZERO THIRD-PARTY
              <br />
              SUBCONTRACTORS.
            </h2>

            {/* Description Body Text */}
            <p
              className={cn(
                "text-xs sm:text-sm lg:text-base text-zinc-300 font-sans leading-relaxed transition-all duration-700 delay-300 ease-out transform",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              )}
            >
              Every detail is planned, briefed, and executed under the direct oversight of founder Gerald Hazellief—combining combat leadership, two decades of high-net-worth protection, and martial arts mastery. We do not farm out your safety to part-time contractors.
            </p>

            {/* Divider */}
            <div
              className={cn(
                "pt-2 transition-all duration-700 delay-350 ease-out transform",
                isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 origin-left"
              )}
            >
              <div className="h-[1px] w-full bg-zinc-800" />
            </div>

            {/* 3 Value Pillars with Tactical Shield Icons (Staggered Animation) */}
            <div className="space-y-3.5 sm:space-y-4 pt-1 sm:pt-2 text-left">
              
              {/* Pillar 1 */}
              <div
                className={cn(
                  "p-3 sm:p-0 rounded-xl bg-[#090C12] sm:bg-transparent border border-zinc-800/60 sm:border-0 flex items-start gap-3.5 transition-all duration-700 delay-400 ease-out transform",
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-6"
                )}
              >
                <div className="mt-0.5 shrink-0 text-[#E58518]">
                  <ShieldCheck className="h-5 w-5 fill-[#E58518]/20 stroke-[#E58518]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-sans">
                    Elite Provenance
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-0.5 leading-snug">
                    Former US Army Ranger / Special Operations tactical standards.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div
                className={cn(
                  "p-3 sm:p-0 rounded-xl bg-[#090C12] sm:bg-transparent border border-zinc-800/60 sm:border-0 flex items-start gap-3.5 transition-all duration-700 delay-500 ease-out transform",
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-6"
                )}
              >
                <div className="mt-0.5 shrink-0 text-[#E58518]">
                  <ShieldCheck className="h-5 w-5 fill-[#E58518]/20 stroke-[#E58518]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-sans">
                    Elite Hand-to-Hand
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-0.5 leading-snug">
                    Direct combatives and martial arts mastery for absolute close-quarters control.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div
                className={cn(
                  "p-3 sm:p-0 rounded-xl bg-[#090C12] sm:bg-transparent border border-zinc-800/60 sm:border-0 flex items-start gap-3.5 transition-all duration-700 delay-600 ease-out transform",
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-6"
                )}
              >
                <div className="mt-0.5 shrink-0 text-[#E58518]">
                  <ShieldCheck className="h-5 w-5 fill-[#E58518]/20 stroke-[#E58518]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-sans">
                    Complete Discretion
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-0.5 leading-snug">
                    Absolute privacy protocols for public figures and corporate leaders.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
