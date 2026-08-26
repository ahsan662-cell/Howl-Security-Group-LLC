"use client";

import React, { useEffect, useRef, useState } from "react";
import { User, Users, Map, Home, Plane, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface DisciplineItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PROTECTION_DISCIPLINES: DisciplineItem[] = [
  {
    id: "ep",
    title: "EXECUTIVE PROTECTION",
    description:
      "Corporate leadership, public figures, and high-net-worth detail managed under airtight operational security.",
    icon: User,
  },
  {
    id: "event",
    title: "EVENT SECURITY & ESCORT",
    description:
      "Private galas, VIP crowd control, and championship-level BKFC fighter ring-walk and perimeter escort.",
    icon: Users,
  },
  {
    id: "threat",
    title: "THREAT & RISK ASSESSMENT",
    description:
      "Preemptive site vulnerability analysis, physical threat reduction, and proactive operational auditing.",
    icon: Map,
  },
  {
    id: "residential",
    title: "RESIDENTIAL SECURITY",
    description:
      "Discreet estate protection, dynamic access control, and specialized HOA patrol programs for high-end communities.",
    icon: Home,
  },
  {
    id: "travel",
    title: "TRAVEL SECURITY & ADVANCE",
    description:
      "Pre-arrival site survey intelligence, precise route planning, and high-stakes transport protection across the state.",
    icon: Plane,
  },
  {
    id: "privacy",
    title: "PRIVACY MANAGEMENT",
    description:
      "Public digital footprint containment, complete confidentiality strategy, and high-level defense against target identification.",
    icon: Lock,
  },
];

interface ServiceGridProps {
  services?: unknown;
  onRequestCoverage?: () => void;
}

export function ServiceGrid({ onRequestCoverage }: ServiceGridProps) {
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
        threshold: 0.25,
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
      id="services"
      ref={sectionRef}
      className="py-24 sm:py-10 lg:py-32 bg-[#07090E] border-b border-zinc-800/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-16 sm:mb-20 transition-all duration-700 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E58518] block mb-3">
            [ PROFESSIONAL CAPABILITIES ]
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-5xl font-black uppercase text-white font-sans tracking-tight">
            OUR CORE PROTECTION DISCIPLINES
          </h2>
        </div>

        {/* 3x2 Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PROTECTION_DISCIPLINES.map((item, index) => {
            const Icon = item.icon;

            // Stagger animation delays for cards
            const delayClasses = [
              "delay-100",
              "delay-200",
              "delay-300",
              "delay-400",
              "delay-500",
              "delay-600",
            ][index % 6];

            return (
              <div
                key={item.id}
                onClick={onRequestCoverage}
                className={cn(
                  "group relative p-7 sm:p-8 rounded-2xl bg-[#0B0E16] border border-zinc-800/80 hover:border-[#E58518]/50 shadow-xl shadow-black/40 transition-all duration-500 ease-out transform flex flex-col justify-between cursor-pointer select-none",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10",
                  delayClasses,
                  "hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#E58518]/10"
                )}
              >
                <div>
                  {/* Top Bar: Tactical Icon on Left & Amber Dash on Right */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center justify-center p-2.5 rounded-lg bg-[#141824] border border-zinc-800 text-[#E58518] group-hover:border-[#E58518]/40 group-hover:bg-[#E58518]/10 transition-all duration-300">
                      <Icon className="h-5 w-5 stroke-[#E58518]" />
                    </div>

                    {/* Amber Dash Accent */}
                    <span className="w-5 h-[2.5px] rounded-full bg-[#E58518] group-hover:w-7 transition-all duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white font-sans group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                    {item.description}
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
