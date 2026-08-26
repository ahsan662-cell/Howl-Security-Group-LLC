"use client";

import React, { useState } from "react";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { AerialSurveillanceHero } from "@/features/aerial/components/aerial-surveillance-hero";
import { DispatchModal } from "@/features/dispatch/components/dispatch-modal";

export default function AerialSurveillancePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#07090E] text-zinc-100">
      <Header onRequestCoverage={() => setModalOpen(true)} />

      <main className="flex-grow">
        {/* Aerial Reconnaissance & Drone Overwatch Component */}
        <AerialSurveillanceHero onRequestSurvey={() => setModalOpen(true)} />
      </main>

      <Footer />
      <DispatchModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
