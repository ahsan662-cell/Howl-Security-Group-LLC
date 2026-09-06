


"use client";

import React, { useState } from "react";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { CareersHero } from "@/features/contact/components/contact-hero";
import { TacticalRecruitmentBlueprint } from "@/features/contact/components/tactical-recruitment-blueprint";
import { CareersList } from "@/features/contact/components/contact-list";
import { OperativeIntakeForm } from "@/features/contact/components/operative-intake-form";
import { DispatchModal } from "@/features/dispatch/components/dispatch-modal";
import { ConfidentialConsultationPortal } from "@/features/consultation/components/confidential-consultation-portal";
import { ConfidentialDeploymentChannels } from "@/features/contact/components/confidential-deployment-channels";

export default function ContactPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#07090E] text-zinc-100">
      <Header onRequestCoverage={() => setModalOpen(true)} />

      <main className="flex-grow">
        {/* Confidential Consultation & Dispatch Portal Component */}
        <ConfidentialConsultationPortal />

        {/* Confidential Deployment & Immediate Dispatch Channels */}
        <ConfidentialDeploymentChannels/>
      </main>

      <Footer />
      <DispatchModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
