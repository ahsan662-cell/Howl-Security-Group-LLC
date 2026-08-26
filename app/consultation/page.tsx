"use client";

import React, { useState } from "react";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, CheckCircle2, FileText, Lock } from "lucide-react";
import { COMPANY_INFO } from "@/constants/company";

export default function ConsultationPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#07090E] text-zinc-100">
      <Header />

      <main className="flex-grow">
        {/* Page Hero Header */}
        <section className="py-16 sm:py-24 bg-[#090C12] border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Badge variant="bracketed" dot={true}>
              NON-DISCLOSURE GUARANTEED AUDIT
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black uppercase text-white font-sans tracking-tight mt-4">
              ENTERPRISE SECURITY & THREAT AUDIT
            </h1>
            <p className="mt-4 text-sm sm:text-lg text-zinc-300 max-w-3xl font-sans">
              Conduct a thorough, multi-vector vulnerability assessment of your estate, corporate headquarters, maritime facilities, or live event perimeter.
            </p>
          </div>
        </section>

        {/* Form and Scope Section */}
        <section className="py-20 bg-[#07090E] border-b border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {submitted ? (
              <div className="p-8 sm:p-12 bg-[#0C1018] border border-emerald-500/50 rounded space-y-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-400">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-xs text-amber-500 font-bold uppercase tracking-wider">
                    CONSULTATION REQUEST LOGGED
                  </span>
                  <h2 className="text-2xl font-bold uppercase text-white font-sans">
                    AUDIT INTAKE CONFIRMED
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
                    A Senior Security Consultant and former Special Operations leader will contact you within 24 hours to coordinate secure on-site review.
                  </p>
                </div>

                <Button variant="secondary" onClick={() => setSubmitted(false)} className="w-full">
                  Submit Additional Assessment
                </Button>
              </div>
            ) : (
              <div className="p-8 sm:p-10 bg-[#0C1018] border border-zinc-800 rounded space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-zinc-800/80">
                  <div>
                    <span className="font-mono text-xs text-amber-500 font-bold uppercase block">
                      // AUDIT SPECIFICATION FORM
                    </span>
                    <h2 className="text-xl font-bold uppercase text-white font-sans">
                      SECURITY ASSESSMENT INTAKE
                    </h2>
                  </div>
                  <Lock className="h-5 w-5 text-amber-500" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Principal / Executive Name *" required placeholder="Johnathan Vance" />
                    <Input label="Corporation / Asset Entity" placeholder="Vance Holdings LLC" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Direct Phone Line *" type="tel" required placeholder="(772) 555-0100" />
                    <Input label="Secure Email Address *" type="email" required placeholder="jvance@vanceholdings.com" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Facility / Asset Type *"
                      options={[
                        { value: "estate", label: "Luxury Waterfront / Gated Estate" },
                        { value: "corporate", label: "Corporate Headquarters / Office Park" },
                        { value: "marina", label: "Maritime Dock / Yacht Slipway" },
                        { value: "event", label: "Arena / High-Capacity Event Space" },
                        { value: "industrial", label: "Critical Infrastructure / Logistics Hub" },
                      ]}
                    />
                    <Select
                      label="Primary Assessment Focus *"
                      options={[
                        { value: "physical", label: "Physical Boundary & Perimeter Hardening" },
                        { value: "ep", label: "Executive Travel & Threat Counter-Measures" },
                        { value: "electronic", label: "Access Control & Surveillance Integration" },
                        { value: "cqb", label: "Staff Combatives & Active Hostile Training" },
                      ]}
                    />
                  </div>

                  <Input
                    label="Facility Location / Region *"
                    required
                    placeholder="e.g. Palm Beach Island, FL"
                  />

                  <Textarea
                    label="Current Threat Concerns & Vulnerability Overview *"
                    required
                    rows={4}
                    placeholder="Describe previous incidents, identified vulnerabilities, or specific protection requirements..."
                  />

                  <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs font-mono text-zinc-500">
                      * All audit data protected under bilateral non-disclosure agreement.
                    </div>
                    <Button type="submit" variant="primary" isLoading={loading} className="w-full sm:w-auto">
                      Schedule Threat Audit
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
