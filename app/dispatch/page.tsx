"use client";

import React, { useState } from "react";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { DispatchModal } from "@/features/dispatch/components/dispatch-modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DispatchRequest, ThreatLevel, DispatchResponse } from "@/types/dispatch";
import { DispatchService } from "@/services/dispatch.service";
import { Radio, ShieldAlert, CheckCircle2, Phone, Clock } from "lucide-react";
import { COMPANY_INFO } from "@/constants/company";

export default function DispatchPage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<DispatchResponse | null>(null);

  const [formData, setFormData] = useState<DispatchRequest>({
    fullName: "",
    organization: "",
    phone: "",
    email: "",
    threatLevel: "HIGH",
    locationArea: "Fort Pierce",
    specificAddress: "",
    serviceType: "Armed Mobile Patrol",
    deploymentTimeframe: "IMMEDIATE (Under 60 Mins)",
    operativesCount: 2,
    armedRequired: true,
    incidentSummary: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await DispatchService.submitDispatchRequest(formData);
      setResponse(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#07090E] text-zinc-100">
      <Header />

      <main className="flex-grow">
        {/* Page Hero Header */}
        <section className="py-16 sm:py-24 bg-[#090C12] border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Badge variant="bracketed" dot={true}>
              PRIORITY OPERATIONAL INTAKE
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black uppercase text-white font-sans tracking-tight mt-4">
              RAPID TACTICAL DISPATCH CONSOLE
            </h1>
            <p className="mt-4 text-sm sm:text-lg text-zinc-300 max-w-3xl font-sans">
              Immediate threat mitigation vectoring. Armed units ready for rapid deployment across Fort Pierce, Palm Beach, and South Florida.
            </p>
          </div>
        </section>

        {/* Dispatch Form Section */}
        <section className="py-20 bg-[#07090E] border-b border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {response ? (
              <div className="p-8 sm:p-12 bg-[#0C1018] border border-emerald-500/50 rounded space-y-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-950/80 border border-emerald-500 text-emerald-400">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-xs text-amber-500 font-bold uppercase tracking-wider">
                    TRANSMISSION RECORDED // ID: {response.dispatchId}
                  </span>
                  <h2 className="text-2xl font-bold uppercase text-white font-sans">
                    TACTICAL DISPATCH ACTIVATED
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">{response.message}</p>
                </div>

                <div className="p-6 bg-[#07090E] border border-zinc-800 rounded text-left font-mono text-xs space-y-3">
                  <div className="flex justify-between border-b border-zinc-800 pb-2">
                    <span className="text-zinc-500">Vector Status:</span>
                    <span className="text-emerald-400 font-bold">{response.status}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800 pb-2">
                    <span className="text-zinc-500">Assigned Unit:</span>
                    <span className="text-zinc-200">{response.assignedUnit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Estimated Arrival:</span>
                    <span className="text-amber-400 font-bold">{response.estimatedArrival}</span>
                  </div>
                </div>

                <div className="p-4 bg-amber-950/30 border border-amber-500/40 rounded text-xs text-zinc-200 font-sans">
                  Direct Line for Emergency Operational Escalation:{" "}
                  <a
                    href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
                    className="text-amber-400 font-bold underline"
                  >
                    {COMPANY_INFO.contact.phoneFormatted}
                  </a>
                </div>

                <Button variant="secondary" onClick={() => setResponse(null)} className="w-full">
                  Create New Dispatch Record
                </Button>
              </div>
            ) : (
              <div className="p-8 sm:p-10 bg-[#0C1018] border border-zinc-800 rounded space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800/80 gap-2">
                  <div>
                    <span className="font-mono text-xs text-amber-500 font-bold uppercase block">
                      // DIRECT DISPATCH TRANSMISSION
                    </span>
                    <h2 className="text-xl font-bold uppercase text-white font-sans">
                      TACTICAL INCIDENT BRIEFING
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>ENCRYPTED LINK ONLINE</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Contact Officer / Full Name *"
                      required
                      placeholder="e.g. Michael Harris"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    <Input
                      label="Organization / Entity / Estate"
                      placeholder="e.g. Harbor Point Marina"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Direct Mobile / Comms Phone *"
                      type="tel"
                      required
                      placeholder="(772) 555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <Input
                      label="Secure Email Address *"
                      type="email"
                      required
                      placeholder="harris@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Select
                      label="Threat Level *"
                      value={formData.threatLevel}
                      onChange={(e) =>
                        setFormData({ ...formData, threatLevel: e.target.value as ThreatLevel })
                      }
                      options={[
                        { value: "LOW", label: "Low (Scheduled Access)" },
                        { value: "MODERATE", label: "Moderate (Elevated Foot Traffic)" },
                        { value: "ELEVATED", label: "Elevated (Potential Breach)" },
                        { value: "HIGH", label: "High (Direct Physical Threat)" },
                        { value: "CRITICAL_IMMINENT", label: "Critical Imminent Emergency" },
                      ]}
                    />
                    <Select
                      label="Deployment Sector *"
                      value={formData.locationArea}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          locationArea: e.target.value as DispatchRequest["locationArea"],
                        })
                      }
                      options={[
                        { value: "Fort Pierce", label: "Fort Pierce / St. Lucie" },
                        { value: "Palm Beach", label: "Palm Beach / Jupiter" },
                        { value: "Treasure Coast", label: "Treasure Coast / Stuart" },
                        { value: "Boca Raton", label: "Boca Raton / Delray" },
                        { value: "Miami-Dade", label: "Miami-Dade / Broward" },
                        { value: "Other South FL", label: "Other South Florida" },
                      ]}
                    />
                    <Select
                      label="Required Timeframe *"
                      value={formData.deploymentTimeframe}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          deploymentTimeframe: e.target.value as DispatchRequest["deploymentTimeframe"],
                        })
                      }
                      options={[
                        { value: "IMMEDIATE (Under 60 Mins)", label: "Immediate (< 60 Mins)" },
                        { value: "TODAY (Within 4 Hours)", label: "Today (Within 4 Hours)" },
                        { value: "SCHEDULED_DATE", label: "Scheduled Future Date" },
                      ]}
                    />
                  </div>

                  <Input
                    label="Exact Venue / Physical Street Address *"
                    required
                    placeholder="e.g. 2100 Seaway Dr, Fort Pierce FL"
                    value={formData.specificAddress}
                    onChange={(e) => setFormData({ ...formData, specificAddress: e.target.value })}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Operational Scope *"
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      options={[
                        { value: "Executive Protection", label: "Executive / Dignitary Close Protection" },
                        { value: "Event Detail (BKFC Style)", label: "Combat Arena / High-Stakes Event" },
                        { value: "Armed Mobile Patrol", label: "Armed Mobile / Static Patrol" },
                        { value: "Emergency Surge Squad", label: "Emergency Tactical Surge Squad" },
                      ]}
                    />
                    <div className="flex items-end pb-1">
                      <label className="flex items-center gap-2 text-xs font-mono text-zinc-300 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={formData.armedRequired}
                          onChange={(e) =>
                            setFormData({ ...formData, armedRequired: e.target.checked })
                          }
                          className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-amber-500"
                        />
                        <span>Require Florida Class G Armed Operators</span>
                      </label>
                    </div>
                  </div>

                  <Textarea
                    label="Incident Description / Tactical Details *"
                    required
                    rows={4}
                    placeholder="Provide relevant details regarding vulnerabilities, crowd size, suspect description, or perimeter parameters..."
                    value={formData.incidentSummary}
                    onChange={(e) => setFormData({ ...formData, incidentSummary: e.target.value })}
                  />

                  <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs font-mono text-zinc-500">
                      * Direct encrypted transmission to Fort Pierce Command Desk.
                    </div>
                    <Button type="submit" variant="primary" isLoading={loading} className="w-full sm:w-auto">
                      Activate Tactical Vector
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
