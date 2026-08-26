"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Target, Users, Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PathwayItem {
  icon: React.ElementType;
  title: string;
  description: string;
  meta: string;
  ctaText: string;
  href?: string;
  action?: () => void;
}

interface DirectTrainingPathwaysProps {
  onOpenModal?: () => void;
}

export function DirectTrainingPathways({ onOpenModal }: DirectTrainingPathwaysProps) {
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

  const pathways: PathwayItem[] = [
    {
      icon: Target,
      title: "PRIVATE & EXECUTIVE",
      description:
        "Tailored 1-on-1 instruction customized for executives and security personnel seeking rapid defensive mastery and real-world combatives.",
      meta: "Flexible scheduling • Private studio or on-site",
      ctaText: "Inquire for Private Slot",
      action: onOpenModal,
      href: "/consultation",
    },
    {
      icon: Users,
      title: "TRADITIONAL GROUP",
      description:
        "Dedicated group sessions focusing on traditional forms, drills, Chi Sao, and practical application in a disciplined environment.",
      meta: "All skill levels • Evening & weekend classes",
      ctaText: "View Class Schedule",
      href: "#curriculum",
    },
    {
      icon: Calendar,
      title: "COMPLIMENTARY VISIT",
      description:
        "Tour the space, meet Sifu Gerald Hazellief, experience a 1-on-1 introduction, and see how Ving Tsun fits your goals.",
      meta: "100% Free • No obligation",
      ctaText: "Schedule Free Visit",
      action: onOpenModal,
      href: "/consultation",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="pathways"
      className="py-16 sm:py-20 lg:py-28 bg-[#06080D] border-b border-zinc-800/80 relative overflow-hidden"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          {/* Top Tag: [ TRAINING DISCIPLINES & PRIVATE INSTRUCTION ] */}
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E58518] block mb-3">
            [ TRAINING DISCIPLINES & PRIVATE INSTRUCTION ]
          </span>

          {/* Main Title: DIRECT TRAINING PATHWAYS */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-sans tracking-tight">
            DIRECT TRAINING PATHWAYS
          </h2>
        </div>

        {/* 3 Pathway Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pathways.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                style={{
                  transitionDelay: `${index * 150 + 150}ms`,
                }}
                className={cn(
                  "group relative bg-[#090C13] border border-zinc-800/90 hover:border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-1 flex flex-col justify-between",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                {/* Subtle Tactical Corner Marks on Hover */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-transparent group-hover:border-[#E58518] transition-colors pointer-events-none" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-transparent group-hover:border-[#E58518] transition-colors pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-transparent group-hover:border-[#E58518] transition-colors pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-transparent group-hover:border-[#E58518] transition-colors pointer-events-none" />

                <div>
                  {/* Header Row: Icon + Title */}
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-[#E58518] shrink-0" />
                    <h3 className="text-sm sm:text-base font-bold uppercase text-white font-sans tracking-wide">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer Section */}
                <div className="mt-8 pt-4 border-t border-zinc-800/60">
                  <div className="font-mono text-[11px] text-zinc-500 mb-2">
                    {item.meta}
                  </div>

                  {item.action ? (
                    <button
                      type="button"
                      onClick={item.action}
                      className="font-mono text-xs font-bold text-[#E58518] hover:text-amber-400 inline-flex items-center gap-1.5 transition-colors group-hover:translate-x-0.5 duration-300 cursor-pointer"
                    >
                      <span>{item.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : item.href ? (
                    <Link
                      href={item.href}
                      className="font-mono text-xs font-bold text-[#E58518] hover:text-amber-400 inline-flex items-center gap-1.5 transition-colors group-hover:translate-x-0.5 duration-300"
                    >
                      <span>{item.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <span className="font-mono text-xs font-bold text-[#E58518] inline-flex items-center gap-1.5">
                      <span>{item.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
