"use client";

import React, { useState } from "react";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { Hero } from "@/components/sections/hero";
import { OperationalTicker } from "@/components/sections/operational-ticker";
import { FounderBio } from "@/features/founder/components/founder-bio";
import { ServiceGrid } from "@/features/services/components/service-grid";
import { ServiceTiersTable } from "@/features/services/components/service-tiers-table";
import { TrainingCurriculum } from "@/features/training/components/training-curriculum";
import { CoverageMatrix } from "@/features/operations/components/coverage-matrix";
import { ClassifiedBriefings } from "@/features/about/components/classified-briefings";
import { SERVICES_DATA } from "@/constants/mock-data/services.data";

export default function HomePage() {
  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#07090E] text-zinc-100 selection:bg-amber-500 selection:text-black">
      {/* Tactical Header */}
      <Header onRequestCoverage={() => setDispatchModalOpen(true)} />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onRequestCoverage={() => setDispatchModalOpen(true)} />

        {/* Operational Credential Ticker Bar */}
        <OperationalTicker />

        {/* Founder & Ethos Section */}
        <FounderBio />

        {/* Core Services Section */}
        <ServiceGrid
          services={SERVICES_DATA}
          onRequestCoverage={() => setDispatchModalOpen(true)}
        />

        {/* Service Tiers Matrix */}
        <ServiceTiersTable onRequestCoverage={() => setDispatchModalOpen(true)} />

        {/* Ving Tsun Combatives Academy */}
        <TrainingCurriculum />

        {/* Commercial & Residential Static Security */}
        <CoverageMatrix onRequestCoverage={() => setDispatchModalOpen(true)} />

        {/* Classified Briefings Board // Direct Access Level 4 */}
        <ClassifiedBriefings />
      </main>

      {/* Structured Tactical Footer */}
      <Footer />
    </div>
  );
}
