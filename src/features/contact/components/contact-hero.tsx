"use client";

import React, { useEffect, useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface CareersHeroProps {
  className?: string;
}

export function CareersHero({ className }: CareersHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 40 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 60);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className={cn(
        "relative min-h-[75vh] sm:min-h-[82vh] lg:min-h-[88vh] flex flex-col justify-center items-center overflow-hidden bg-[#06080D] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 border-b border-zinc-800/80 select-none",
        className
      )}
      aria-label="Recruitment & Operative Intake Hero"
    >
      {/* Background Layer: Tactical Overhead Layout & Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Dynamic Spotlight that subtly tracks mouse */}
        <div
          className="absolute w-[600px] sm:w-[900px] h-[500px] sm:h-[700px] bg-gradient-to-r from-amber-600/10 via-amber-500/5 to-transparent rounded-full blur-3xl transition-transform duration-1000 ease-out opacity-70"
          style={{
            transform: `translate(${mousePos.x - 50}px, ${mousePos.y - 50}px)`,
          }}
        />

        {/* Tactical Flat-Lay SVG Silhouette Artwork (Overhead Gear Composition) */}
        <svg
          className="absolute inset-0 w-full h-full object-cover opacity-[0.18] sm:opacity-[0.22] contrast-125"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Tactical Grid Lines */}
          <defs>
            <pattern id="tacticalGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#27272A" strokeWidth="0.5" strokeDasharray="2 4" />
              <circle cx="60" cy="60" r="1" fill="#E58518" opacity="0.3" />
            </pattern>
            <radialGradient id="vignette" cx="50%" cy="45%" r="60%">
              <stop offset="0%" stopColor="#07090E" stopOpacity="0" />
              <stop offset="60%" stopColor="#07090E" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#05070A" stopOpacity="0.98" />
            </radialGradient>
            <linearGradient id="gearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2A2F3D" />
              <stop offset="100%" stopColor="#11141C" />
            </linearGradient>
          </defs>

          {/* Background Grid Pattern */}
          <rect width="100%" height="100%" fill="url(#tacticalGrid)" />

          {/* Tactical Gear Flat-Lay Elements */}
          <g className="tactical-gear-group" stroke="#3F3F46" strokeWidth="1.5">
            {/* Top Center: Ballistic FAST Helmet */}
            <g transform="translate(720, 180)">
              {/* Helmet Shell */}
              <ellipse cx="0" cy="0" rx="110" ry="95" fill="url(#gearGradient)" stroke="#52525B" strokeWidth="2" />
              {/* NVG Shroud Bracket at Top Front */}
              <rect x="-24" y="-70" width="48" height="38" rx="4" fill="#0C0E14" stroke="#E58518" strokeWidth="1.5" />
              <circle cx="0" cy="-51" r="5" fill="#E58518" opacity="0.8" />
              {/* Side ARC Rails */}
              <path d="M -102 -20 Q -90 40 -65 70" fill="none" stroke="#71717A" strokeWidth="4" />
              <path d="M 102 -20 Q 90 40 65 70" fill="none" stroke="#71717A" strokeWidth="4" />
              {/* Velcro & Bungee Retention */}
              <path d="M -40 -15 L 40 -15 M -35 15 L 35 15" stroke="#71717A" strokeWidth="2" strokeDasharray="4 3" />
              <path d="M -50 -50 Q 0 -20 50 -50" fill="none" stroke="#E58518" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            </g>

            {/* Top Right: Dual Tactical Transceivers / Radios */}
            <g transform="translate(930, 210)">
              {/* Radio 1 Body */}
              <rect x="-40" y="-30" width="38" height="85" rx="6" fill="#151922" stroke="#52525B" strokeWidth="2" />
              {/* Antenna */}
              <line x1="-21" y1="-30" x2="-21" y2="-170" stroke="#71717A" strokeWidth="3.5" strokeLinecap="round" />
              {/* Radio Dial & Display */}
              <rect x="-35" y="-18" width="28" height="20" rx="2" fill="#090B10" stroke="#E58518" strokeWidth="0.75" />
              <circle cx="-10" cy="-35" r="4" fill="#71717A" />
              
              {/* Radio 2 Body */}
              <rect x="15" y="-15" width="42" height="95" rx="6" fill="#121620" stroke="#52525B" strokeWidth="2" />
              <line x1="36" y1="-15" x2="42" y2="-210" stroke="#71717A" strokeWidth="3.5" strokeLinecap="round" />
              {/* Keypad & Mic Coil */}
              <rect x="23" y="0" width="26" height="24" rx="2" fill="#090B10" stroke="#3F3F46" />
              <path d="M 0 50 Q 20 80 15 110" fill="none" stroke="#52525B" strokeWidth="2" strokeDasharray="2 3" />
            </g>

            {/* Tactical Eyewear / Goggles (Right) */}
            <g transform="translate(1080, 270)">
              <path d="M -45 -10 Q 0 0 45 -10 Q 55 25 35 35 Q 0 25 -35 35 Q -55 25 -45 -10 Z" fill="#0E121A" stroke="#52525B" strokeWidth="2" />
              <line x1="-50" y1="10" x2="-80" y2="20" stroke="#3F3F46" strokeWidth="4" />
            </g>

            {/* Left Center: Tactical Combat Gloves */}
            <g transform="translate(360, 520)">
              {/* Left Glove */}
              <path d="M -50 -70 C -50 -100 -30 -100 -30 -70 C -30 -110 -10 -110 -10 -70 C -10 -105 10 -105 10 -70 C 10 -95 28 -95 28 -60 C 28 -40 25 10 20 40 C 15 65 -35 65 -45 40 Z" fill="#151922" stroke="#52525B" strokeWidth="2" />
              {/* Knuckle Guard */}
              <rect x="-38" y="-45" width="56" height="18" rx="5" fill="#090B10" stroke="#E58518" strokeWidth="1" />
              
              {/* Right Glove */}
              <path d="M 60 -70 C 60 -100 80 -100 80 -70 C 80 -110 100 -110 100 -70 C 100 -105 120 -105 120 -70 C 120 -95 138 -95 138 -60 C 138 -40 135 10 130 40 C 125 65 75 65 65 40 Z" fill="#151922" stroke="#52525B" strokeWidth="2" />
              <rect x="72" y="-45" width="56" height="18" rx="5" fill="#090B10" stroke="#E58518" strokeWidth="1" />
            </g>

            {/* Center: Tactical Plate Carrier Vest Body */}
            <g transform="translate(720, 560)">
              {/* Main Chest Plate Carrier */}
              <path d="M -120 -130 L 120 -130 L 150 110 L -150 110 Z" rx="16" fill="url(#gearGradient)" stroke="#52525B" strokeWidth="2.5" />
              {/* Molle Webbing Straps */}
              <line x1="-100" y1="-80" x2="100" y2="-80" stroke="#3F3F46" strokeWidth="6" strokeDasharray="18 6" />
              <line x1="-115" y1="-40" x2="115" y2="-40" stroke="#3F3F46" strokeWidth="6" strokeDasharray="18 6" />
              <line x1="-130" y1="0" x2="130" y2="0" stroke="#3F3F46" strokeWidth="6" strokeDasharray="18 6" />
              <line x1="-140" y1="40" x2="140" y2="40" stroke="#3F3F46" strokeWidth="6" strokeDasharray="18 6" />
              <line x1="-145" y1="80" x2="145" y2="80" stroke="#3F3F46" strokeWidth="6" strokeDasharray="18 6" />
              {/* Center Morale Patch Area */}
              <rect x="-50" y="-120" width="100" height="28" rx="4" fill="#080A10" stroke="#E58518" strokeWidth="1.5" />
              <text x="0" y="-102" textAnchor="middle" fill="#E58518" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="2">HOWL SPEC</text>
            </g>

            {/* Bottom Utility Belt & Mag Pouches */}
            <g transform="translate(720, 780)">
              <rect x="-360" y="-15" width="720" height="30" rx="4" fill="#131720" stroke="#52525B" strokeWidth="2" />
              {/* Mag Pouches */}
              <rect x="-240" y="-30" width="35" height="50" rx="3" fill="#0D1017" stroke="#3F3F46" />
              <rect x="-195" y="-30" width="35" height="50" rx="3" fill="#0D1017" stroke="#3F3F46" />
              <rect x="-150" y="-30" width="35" height="50" rx="3" fill="#0D1017" stroke="#3F3F46" />
              <rect x="115" y="-30" width="35" height="50" rx="3" fill="#0D1017" stroke="#3F3F46" />
              <rect x="160" y="-30" width="35" height="50" rx="3" fill="#0D1017" stroke="#3F3F46" />
              <rect x="205" y="-30" width="35" height="50" rx="3" fill="#0D1017" stroke="#3F3F46" />
              {/* Cobra Buckle in Center */}
              <rect x="-25" y="-22" width="50" height="44" rx="4" fill="#1C212D" stroke="#E58518" strokeWidth="2" />
            </g>
          </g>

          {/* Vignette Overlay Gradient */}
          <rect width="100%" height="100%" fill="url(#vignette)" />
        </svg>

        {/* Dark Grain & Subtle Scanlines Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,8,13,0.85)_80%,rgba(6,8,13,0.98)_100%)] pointer-events-none" />
      </div>

      {/* Main Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center w-full">
        
        {/* Top Header Tag: [ RECRUITMENT & OPERATIVE INTAKE ] */}
        <div
          className={cn(
            "flex flex-col items-center mb-6 sm:mb-8 transition-all duration-700 ease-out transform",
            isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95"
          )}
        >
          <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.22em] text-zinc-300 uppercase">
            <span className="text-zinc-500 font-normal">[</span>
            <span>RECRUITMENT & OPERATIVE INTAKE</span>
            <span className="text-zinc-500 font-normal">]</span>
          </div>

          {/* Distinctive Orange Underline Accent Bar */}
          <div
            className={cn(
              "h-[3px] bg-[#E58518] rounded-full mt-2 sm:mt-2.5 shadow-[0_0_12px_rgba(229,133,24,0.7)] transition-all duration-1000 delay-300 ease-out",
              isLoaded ? "w-14 sm:w-16 opacity-100" : "w-0 opacity-0"
            )}
          />
        </div>

        {/* High-Impact Headline */}
        <h1
          className={cn(
            "text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-black uppercase text-white font-sans tracking-tight leading-[0.98] sm:leading-[1.03] text-center max-w-5xl mx-auto drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)] transition-all duration-800 delay-150 ease-out transform",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <span className="block">JOIN THE PACK.</span>
          <span className="block">STANDARDS WITHOUT</span>
          <span className="block">COMPROMISE.</span>
        </h1>

        {/* Subtitle / Intake Creed */}
        <p
          className={cn(
            "mt-6 sm:mt-8 text-xs sm:text-base md:text-lg text-zinc-300/90 font-sans max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] transition-all duration-800 delay-300 ease-out transform",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          We recruit disciplined personnel with proven backgrounds in military special operations,
          law enforcement, and verified high-level protection. No compromises. No shortcuts.
          <span className="block mt-1 sm:inline sm:mt-0 font-medium text-white"> Only the elite.</span>
        </p>

        {/* Security Protocols In Effect Banner / Card */}
        <div
          className={cn(
            "mt-10 sm:mt-14 lg:mt-16 w-full max-w-3xl mx-auto transition-all duration-900 delay-500 ease-out transform",
            isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.98]"
          )}
        >
          <div className="relative group rounded-xl bg-[#090C13]/90 border border-zinc-800/90 hover:border-amber-500/40 p-4 sm:p-5 md:px-6 md:py-4.5 backdrop-blur-md shadow-2xl transition-all duration-300">
            
            {/* Subtle Corner Brackets for Tactical Tech Aesthetic */}
            <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-zinc-700 group-hover:border-[#E58518] transition-colors pointer-events-none" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-zinc-700 group-hover:border-[#E58518] transition-colors pointer-events-none" />
            <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-zinc-700 group-hover:border-[#E58518] transition-colors pointer-events-none" />
            <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-zinc-700 group-hover:border-[#E58518] transition-colors pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6">
              
              {/* Left Lock Icon & Description */}
              <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 text-left">
                {/* Lock Icon Container */}
                <div className="shrink-0 mt-0.5 sm:mt-0 p-2 sm:p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[#E58518] group-hover:shadow-[0_0_15px_rgba(229,133,24,0.3)] transition-all">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                </div>

                {/* Text Block */}
                <div>
                  <h4 className="text-xs sm:text-[13px] font-bold uppercase text-white font-sans tracking-wide flex items-center gap-2">
                    <span>CLARIFIED SECURITY PROTOCOLS IN EFFECT</span>
                  </h4>
                  <p className="text-[11px] sm:text-xs text-zinc-400 font-sans leading-snug mt-0.5 sm:mt-1">
                    All submitted data is fully encrypted with military-grade AES-256 standard and parsed directly by active command officers.
                  </p>
                </div>
              </div>

              {/* Right Tag: LEVEL-4 SECURE */}
              <div className="shrink-0 self-end sm:self-center font-mono text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#E58518] px-3 py-1 sm:py-1.5 rounded bg-amber-950/30 border border-amber-500/30 shadow-[0_0_12px_rgba(229,133,24,0.15)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E58518] animate-pulse" />
                <span>LEVEL-4 SECURE</span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
