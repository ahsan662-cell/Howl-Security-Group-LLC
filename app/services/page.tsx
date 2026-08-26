"use client";

import React, { useState } from "react";
import Script from "next/script";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { ServicesHero } from "@/features/services/components/services-hero";
import { FoundationOfMastery } from "@/features/services/components/foundation-of-mastery";
import { MissionQuote } from "@/features/services/components/mission-quote";
import { CommandingTheFront } from "@/features/services/components/commanding-the-front";
import { DispatchModal } from "@/features/dispatch/components/dispatch-modal";

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "HOWL Security Group - Protection Disciplines & Services",
    "description":
      "Special Operations close protection, high-threat mitigation, armed and unarmed static guarding, and combatives instruction.",
    "itemListElement": [
      {
        "@type": "Service",
        "position": 1,
        "name": "Executive & Dignitary Close Protection",
        "description":
          "U.S. Army Ranger veteran operators configured for low-profile personal security, counter-surveillance, and secure transit.",
        "provider": {
          "@type": "SecurityService",
          "name": "HOWL Security Group LLC",
        },
      },
      {
        "@type": "Service",
        "position": 2,
        "name": "High-Stakes Event Security (BKFC Detail)",
        "description":
          "Arena perimeter containment, athlete protection, and rapid incident de-escalation for large combat sports events.",
        "provider": {
          "@type": "SecurityService",
          "name": "HOWL Security Group LLC",
        },
      },
      {
        "@type": "Service",
        "position": 3,
        "name": "Commercial & Residential Static Guarding",
        "description":
          "Florida Class-G armed deterrence and Class-D access control for high-net-worth estates and corporate facilities.",
        "provider": {
          "@type": "SecurityService",
          "name": "HOWL Security Group LLC",
        },
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#07090E] text-zinc-100 selection:bg-amber-500 selection:text-black">
      {/* Schema.org SEO Structured Data */}
      <Script
        id="services-schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      <Header onRequestCoverage={() => setModalOpen(true)} />

      <main className="flex-grow">
        {/* 1. Tactical Dossier Hero Header */}
        <ServicesHero />

        {/* 2. Credibility Stack: A Foundation of Mastery */}
        <FoundationOfMastery />

        {/* 3. Wolf Psychology Operational Mission Statement Quote */}
        <MissionQuote />

        {/* 4. The Founder: Commanding The Front */}
        <CommandingTheFront />
      </main>

      <Footer />
      <DispatchModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
