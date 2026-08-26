"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DispatchRequest, ThreatLevel, DispatchResponse } from "@/types/dispatch";
import { DispatchService } from "@/services/dispatch.service";
import { Shield, CheckCircle2, AlertTriangle, Radio } from "lucide-react";
import { COMPANY_INFO } from "@/constants/company";

interface DispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DispatchModal({ isOpen, onClose }: DispatchModalProps) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<DispatchResponse | null>(null);

  const [formData, setFormData] = useState<DispatchRequest>({
    fullName: "",
    organization: "",
    phone: "",
    email: "",
    threatLevel: "ELEVATED",
    locationArea: "Palm Beach",
    specificAddress: "",
    serviceType: "Executive Protection",
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

  const handleReset = () => {
    setResponse(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="REQUEST TACTICAL COVERAGE & DISPATCH"
      subtitle="Priority intake connected directly to Fort Pierce Operations Command."
      maxWidth="xl"
    >
      {response ? (
        /* Success State */
        <div className="space-y-6 text-center py-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-950/60 border border-emerald-500 text-emerald-400">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <div className="space-y-1">
            <span className="font-mono text-xs text-amber-500 font-bold uppercase tracking-wider">
              DISPATCH ID: {response.dispatchId}
            </span>
            <h3 className="text-xl font-bold uppercase text-white font-sans">
              INCIDENT PROTOCOL ACTIVATED
            </h3>
            <p className="text-xs text-zinc-300 max-w-md mx-auto">{response.message}</p>
          </div>

          <div className="p-4 bg-[#07090E] border border-zinc-800 rounded text-left font-mono text-xs space-y-2">
            <div className="flex justify-between border-b border-zinc-800/80 pb-1.5">
              <span className="text-zinc-500">Vector Status:</span>
              <span className="text-emerald-400 font-bold">{response.status}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800/80 pb-1.5">
              <span className="text-zinc-500">Assigned Unit:</span>
              <span className="text-zinc-200">{response.assignedUnit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Estimated Response Time:</span>
              <span className="text-amber-400 font-bold">{response.estimatedArrival}</span>
            </div>
          </div>

          <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded text-xs text-zinc-300 font-sans">
            For urgent immediate emergency coordination, dial direct:{" "}
            <a
              href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
              className="text-amber-400 font-bold underline"
            >
              {COMPANY_INFO.contact.phoneFormatted}
            </a>
          </div>

          <Button variant="primary" onClick={handleReset} className="w-full">
            Close Console
          </Button>
        </div>
      ) : (
        /* Intake Form */
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name / Officer Contact *"
              required
              placeholder="e.g. Johnathan Vance"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
            <Input
              label="Organization / Estate / Entity"
              placeholder="e.g. Vance Family Office"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Direct Phone Number *"
              type="tel"
              required
              placeholder="(772) 000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <Input
              label="Secure Email Address *"
              type="email"
              required
              placeholder="vance@enterprise.com"
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
                { value: "LOW", label: "Low (General Patrol / Event)" },
                { value: "MODERATE", label: "Moderate (Access Control)" },
                { value: "ELEVATED", label: "Elevated (Specific Risk)" },
                { value: "HIGH", label: "High (Direct Threat)" },
                { value: "CRITICAL_IMMINENT", label: "Critical Imminent Surge" },
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
              label="Timeframe *"
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
            label="Specific Location / Address / Venue *"
            required
            placeholder="e.g. 1400 Ocean Drive, Palm Beach FL"
            value={formData.specificAddress}
            onChange={(e) => setFormData({ ...formData, specificAddress: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Service Scope *"
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              options={[
                { value: "Executive Protection", label: "Executive & VIP Protection" },
                { value: "Event Detail (BKFC Style)", label: "High-Stakes Event / Arena Detail" },
                { value: "Armed Mobile Patrol", label: "Commercial & Estate Armed Patrol" },
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
                  className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-amber-500 focus:ring-amber-500"
                />
                <span>Florida Class G Armed Detail Required</span>
              </label>
            </div>
          </div>

          <Textarea
            label="Incident Description / Threat Briefing *"
            required
            placeholder="Detail nature of request, threats, venue dynamics, or access requirements..."
            rows={3}
            value={formData.incidentSummary}
            onChange={(e) => setFormData({ ...formData, incidentSummary: e.target.value })}
          />

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[11px] font-mono text-zinc-500">
              * Direct encrypted dispatch transmission to Fort Pierce TOC.
            </div>
            <Button
              type="submit"
              variant="primary"
              isLoading={loading}
              className="w-full sm:w-auto"
            >
              Submit Dispatch Vector
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
