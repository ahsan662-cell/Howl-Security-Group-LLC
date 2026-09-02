"use client";

import React, { useState } from "react";
import Script from "next/script";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { FrontLineDeployment } from "@/features/about/components/front-line-deployment";
import { CommandingTheFront } from "@/features/services/components/commanding-the-front";
import { OperationalStandard } from "@/features/about/components/operational-standard";
import { CoverageMatrix } from "@/features/operations/components/coverage-matrix";
import { ClassifiedBriefings } from "@/features/about/components/classified-briefings";
import { GlobalAdvisory } from "@/features/about/components/global-advisory";
import { DispatchModal } from "@/features/dispatch/components/dispatch-modal";

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);

  // Schema.org Structured Data for AboutPage & Security Service Entity
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://howlsecuritygroup.com/about#webpage",
        "url": "https://howlsecuritygroup.com/about",
        "name": "About HOWL Security Group & Leadership",
        "description":
          "Overview of HOWL Security Group, operational standards, combat sports security, and tactical leadership under founder Gerald Hazellief.",
        "inLanguage": "en-US",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://howlsecuritygroup.com/#website",
          "url": "https://howlsecuritygroup.com",
          "name": "HOWL Security Group",
        },
      },
      {
        "@type": "SecurityService",
        "@id": "https://howlsecuritygroup.com/#organization",
        "name": "HOWL Security Group LLC",
        "url": "https://howlsecuritygroup.com",
        "logo": "https://howlsecuritygroup.com/images/founder-command.png",
        "image": "https://howlsecuritygroup.com/images/founder-command.png",
        "description":
          "Elite Florida security agency specializing in executive protection, armed and unarmed static guarding, VIP escort, and crisis response.",
        "telephone": "+1-772-940-4114",
        "email": "operations@howlsecurity.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Fort Pierce",
          "addressRegion": "FL",
          "postalCode": "34950",
          "addressCountry": "US",
        },
        "areaServed": [
          "Treasure Coast",
          "Palm Beach County",
          "Miami-Dade County",
          "Broward County",
          "State of Florida",
          "Worldwide",
        ],
        "founder": {
          "@type": "Person",
          "name": "Gerald Hazellief",
          "jobTitle": "Founder & Principal Instructor",
          "description":
            "US Army 75th Ranger Regiment Veteran, Executive Protection Specialist, and Ving Tsun Kung Fu Master.",
        },
        "license": "Florida State License # B-3800282",
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#07090E] text-zinc-100 selection:bg-amber-500 selection:text-black">
      {/* Schema.org SEO Structured Data Injection */}
      <Script
        id="about-schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Navigation Header */}
      <Header onRequestCoverage={() => setModalOpen(true)} />

      <main className="flex-grow">
        {/* 1. Front Line Deployment Operations Showcase */}
        <FrontLineDeployment />

        {/* 2. The Founder: Commanding The Front */}
        <CommandingTheFront />

        {/* 3. Elite Force Doctrine: The HOWL Operational Standard */}
        <OperationalStandard />

        {/* 3. Commercial & Residential Static Security Detail */}
        <CoverageMatrix onRequestCoverage={() => setModalOpen(true)} />

        {/* 4. Tactical Field Intel & Classified Briefings */}
        <ClassifiedBriefings />

        {/* 5. Global Advisory & Consulting: Wide-Spectrum Coverage & Tier-0 Network */}
        <GlobalAdvisory />
      </main>

      {/* Structured Tactical Footer */}
      <Footer />

      {/* Coverage Intake Dispatch Modal */}
      <DispatchModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}