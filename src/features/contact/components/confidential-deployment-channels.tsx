"use client";

import React, { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChannelItem {
  icon: React.ElementType;
  label: string;
  value: string;
  subtext: string;
  href?: string;
}

const CHANNELS: ChannelItem[] = [
  {
    icon: Phone,
    label: "DIRECT PHONE",
    value: "(772) 940-4114",
    href: "tel:7729404114",
    subtext:
      "Available 24/7/365 for command alerts, emergency transit, and immediate threat deployment.",
  },
  {
    icon: Mail,
    label: "DIRECT EMAIL",
    value: "howlsecuritygroup@gmail.com",
    href: "mailto:howlsecuritygroup@gmail.com",
    subtext:
      "Secure communications intake. Fully encrypted server for initial threat briefs and documentation.",
  },
  {
    icon: MapPin,
    label: "BASE OPERATIONS",
    value: "Fort Pierce, Florida",
    subtext:
      "Serving South Florida & Palm Beach Regional Assets with tactical land, air, and marine transport.",
  },
];

export function ConfidentialDeploymentChannels() {
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

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-28 bg-[#07090E] border-b border-zinc-800/80 relative overflow-hidden"
    >
      {/* Background Central Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div
          className={cn(
            "text-center max-w-4xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-sans tracking-tight">
            CONFIDENTIAL DEPLOYMENT & IMMEDIATE DISPATCH
          </h2>
          <p className="mt-3.5 text-xs sm:text-sm md:text-base text-zinc-400 font-sans max-w-2xl mx-auto leading-relaxed">
            Private intelligence, crisis management, and elite executive protection assets stand ready. Use direct lines below for critical emergencies.
          </p>
        </div>

        {/* 3 Direct Channels Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CHANNELS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                style={{
                  transitionDelay: `${index * 150 + 150}ms`,
                }}
                className={cn(
                  "group relative bg-[#090C13] border border-zinc-800/90 hover:border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-1 flex flex-col justify-between",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                {/* Tactical Corner Highlights */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-transparent group-hover:border-[#E58518] transition-colors pointer-events-none" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-transparent group-hover:border-[#E58518] transition-colors pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-transparent group-hover:border-[#E58518] transition-colors pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-transparent group-hover:border-[#E58518] transition-colors pointer-events-none" />

                <div>
                  {/* Top Row: Icon + Label */}
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-[#E58518] shrink-0" />
                    <span className="font-mono text-xs font-bold text-zinc-300 uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>

                  {/* Value / Channel Contact */}
                  <div className="mt-5">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-lg sm:text-xl md:text-2xl font-black text-white hover:text-[#E58518] font-sans tracking-tight transition-colors block break-words"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-lg sm:text-xl md:text-2xl font-black text-white font-sans tracking-tight block">
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subtext description */}
                <p className="mt-4 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                  {item.subtext}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
