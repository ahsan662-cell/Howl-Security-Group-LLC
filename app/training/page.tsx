"use client";

import React, { useState } from "react";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { TrainingHero } from "@/features/training/components/training-hero";
import { PrecisionGeometryLineage } from "@/features/training/components/precision-geometry-lineage";
import { TrainingLineageTabs } from "@/features/training/components/training-lineage-tabs";
import { DirectTrainingPathways } from "@/features/training/components/direct-training-pathways";
import { TrainingCurriculum } from "@/features/training/components/training-curriculum";
import { DirectTrainingInquiryForm } from "@/features/training/components/direct-training-inquiry-form";
import { DispatchModal } from "@/features/dispatch/components/dispatch-modal";

export default function TrainingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#07090E] text-zinc-100">
      <Header onRequestCoverage={() => setModalOpen(true)} />

      <main className="flex-grow">
        {/* Authentic Ving Tsun & Executive Combatives Hero */}
        <TrainingHero onScheduleClick={() => setModalOpen(true)} />

        {/* 2-Tab Interactive Lineage & System Geometry Showcase */}
        <TrainingLineageTabs />

        {/* Direct Training Pathways (Private, Group, Free Visit) */}
        <DirectTrainingPathways onOpenModal={() => setModalOpen(true)} />

        {/* Direct Training Inquiry & Registration Form */}
        <DirectTrainingInquiryForm />

        {/* Precision Geometry Over Brute Strength & Direct Lineage Tree */}
        <PrecisionGeometryLineage />
      </main>

      <Footer />
      <DispatchModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
