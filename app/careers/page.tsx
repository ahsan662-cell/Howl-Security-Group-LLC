"use client";

import React, { useState } from "react";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { ConfidentialConsultationPortal } from "@/features/consultation/components/confidential-consultation-portal";
import { ConfidentialDeploymentChannels } from "@/features/contact/components/confidential-deployment-channels";
import { DispatchModal } from "@/features/dispatch/components/dispatch-modal";

export default function CareerPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#07090E] text-zinc-100">
      <Header onRequestCoverage={() => setModalOpen(true)} />

      <main className="flex-grow">
        {/* Confidential Consultation & Dispatch Portal Component */}
        <ConfidentialConsultationPortal />

        {/* Confidential Deployment & Immediate Dispatch Channels */}
        <ConfidentialDeploymentChannels />
      </main>

      <Footer />
      <DispatchModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
