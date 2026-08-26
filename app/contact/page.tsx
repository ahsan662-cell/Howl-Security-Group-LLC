


"use client";

import React, { useState } from "react";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { CareersHero } from "@/features/contact/components/contact-hero";
import { TacticalRecruitmentBlueprint } from "@/features/contact/components/tactical-recruitment-blueprint";
import { CareersList } from "@/features/contact/components/contact-list";
import { OperativeIntakeForm } from "@/features/contact/components/operative-intake-form";
import { DispatchModal } from "@/features/dispatch/components/dispatch-modal";

export default function ContactPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#07090E] text-zinc-100">
      <Header onRequestCoverage={() => setModalOpen(true)} />

      <main className="flex-grow">
        {/* Dynamic Recruitment & Operative Intake Hero */}
        <CareersHero />


        {/* Operative Intake & Profile Submission Form */}
        <OperativeIntakeForm />

        {/* Tactical Recruitment Blueprint (OPS-01, OPS-02, OPS-03) */}
        <TacticalRecruitmentBlueprint />
      </main>

      <Footer />
      <DispatchModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
