"use client";

import React, { useState } from "react";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { CoverageMatrix } from "@/features/operations/components/coverage-matrix";
import { DispatchModal } from "@/features/dispatch/components/dispatch-modal";
import { Badge } from "@/components/ui/badge";
import { Radio, ShieldAlert, Cpu, CheckCircle } from "lucide-react";
import { COMPANY_INFO } from "@/constants/company";

export default function OperationsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#07090E] text-zinc-100">
      <Header onRequestCoverage={() => setModalOpen(true)} />

      <main className="flex-grow">
        {/* Page Hero Header */}
        <section className="py-16 sm:py-24 bg-[#090C12] border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Badge variant="bracketed" dot={true}>
              FORT PIERCE TACTICAL COMMAND CENTER
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black uppercase text-white font-sans tracking-tight mt-4">
              OPERATIONS, FLEET & DISPATCH TELEMETRY
            </h1>
            <p className="mt-4 text-sm sm:text-lg text-zinc-300 max-w-3xl font-sans">
              Real-time situational awareness, encrypted tactical dispatch, and rapid armed unit vectoring throughout the Treasure Coast and Palm Beach regions.
            </p>
          </div>
        </section>

        {/* Coverage Matrix Component */}
        <CoverageMatrix />

        {/* Operations Protocol Deep Dive */}
        <section className="py-20 bg-[#07090E] border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="border-b border-zinc-800 pb-4">
              <span className="font-mono text-xs text-amber-500 font-bold uppercase">
                // COMMAND & CONTROL INFRASTRUCTURE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold uppercase text-white font-sans mt-1">
                TACTICAL OPERATIONS PROTOCOLS
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-[#0C1018] border border-zinc-800 rounded space-y-3">
                <div className="font-mono text-amber-500 text-xs font-bold">[ SEC-COM-01 ]</div>
                <h3 className="text-lg font-bold uppercase text-white font-sans">
                  Encrypted Digital Comms
                </h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  AES-256 encrypted tactical radio frequencies linking field operators, mobile patrol units, and HQ command in real-time.
                </p>
              </div>

              <div className="p-6 bg-[#0C1018] border border-zinc-800 rounded space-y-3">
                <div className="font-mono text-amber-500 text-xs font-bold">[ SEC-COM-02 ]</div>
                <h3 className="text-lg font-bold uppercase text-white font-sans">
                  GPS Telemetry & Body Cam Feeds
                </h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Every armed detail operates with real-time GPS tracking and live incident recording, guaranteeing total accountability and transparent client reporting.
                </p>
              </div>

              <div className="p-6 bg-[#0C1018] border border-zinc-800 rounded space-y-3">
                <div className="font-mono text-amber-500 text-xs font-bold">[ SEC-COM-03 ]</div>
                <h3 className="text-lg font-bold uppercase text-white font-sans">
                  Direct Law Enforcement Liaison
                </h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Pre-established command lines with local County Sheriff dispatch and municipal police for rapid tactical escalation when required.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <DispatchModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
