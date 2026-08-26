"use client";

import React from "react";
import { Shield, Phone, Radio } from "lucide-react";
import { COMPANY_INFO } from "@/constants/company";

interface CtaBannerProps {
  onRequestCoverage: () => void;
}

export function CtaBanner({ onRequestCoverage }: CtaBannerProps) {
  return (
    <section className="bg-[#0A0D15] border-b border-zinc-800 py-20 relative overflow-hidden">
      {/* Tactical Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-amber-500 uppercase tracking-widest bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded">
          <Radio className="h-3.5 w-3.5 animate-pulse" />
          <span>IMMEDIATE OPERATIONAL DEPLOYMENT</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase text-white font-sans tracking-tight">
          SECURE YOUR ASSETS WITH U.S. ARMY RANGER-LED VIGILANCE
        </h2>

        <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto font-sans leading-relaxed">
          Contact our Fort Pierce Tactical Operations Center 24/7. Immediate emergency deployment, executive detail mobilization, or custom threat mitigation consultation across South Florida.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onRequestCoverage}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D97706] hover:bg-[#E58518] text-white font-bold text-sm sm:text-base uppercase tracking-wider px-8 py-3.5 rounded shadow-lg shadow-amber-600/20 border border-amber-400/40 transition-all active:translate-y-[1px] cursor-pointer"
          >
            <span>REQUEST COVERAGE DISPATCH</span>
            <Shield className="h-4 w-4" />
          </button>

          <a
            href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#121622] hover:bg-[#181E2E] text-zinc-100 font-mono text-sm sm:text-base px-6 py-3.5 rounded border border-zinc-700 hover:border-zinc-500 transition-all"
          >
            <Phone className="h-4 w-4 text-amber-500" />
            <span>Direct Line: {COMPANY_INFO.contact.phoneFormatted}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
