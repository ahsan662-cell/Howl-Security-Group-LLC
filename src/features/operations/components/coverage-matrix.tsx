"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Crosshair,
  X,
  Lock,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CoverageMatrixProps {
  onRequestCoverage?: (detailType?: "armed" | "unarmed") => void;
}

interface ToastNotification {
  type: "success" | "error";
  title: string;
  message: string;
}

export function CoverageMatrix({ onRequestCoverage }: CoverageMatrixProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Modal & Form State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<"armed" | "unarmed">("armed");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travelScope, setTravelScope] = useState("Florida Regional (Treasure Coast / Palm Beach / Miami)");
  const [operationalBrief, setOperationalBrief] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState<ToastNotification | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Auto-dismiss toast after 5 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleOpenModal = (type: "armed" | "unarmed") => {
    setSelectedType(type);
    setModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceInterest =
      selectedType === "armed"
        ? "Armed Security Detail (Class-G) - High-Threat Protection"
        : "Unarmed Security Detail (Class-D) - Access Control & Patrol";

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          serviceInterest,
          travelScope,
          operationalBrief,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to transmit intake request.");
      }

      // Trigger Success Toast
      setToast({
        type: "success",
        title: `INTAKE TRANSMISSION RECORDED [${data.intakeId}]`,
        message: `Transmission received by Operations Command. Confirmation email dispatched to ${email}.`,
      });

      // Close modal and reset inputs
      setModalOpen(false);
      setFullName("");
      setEmail("");
      setPhone("");
      setOperationalBrief("");
    } catch (err: unknown) {
      // Trigger Error Toast
      setToast({
        type: "error",
        title: "TRANSMISSION FAILED",
        message:
          err instanceof Error
            ? err.message
            : "Network error occurred. Please call (772) 940-4114 directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="operations"
      ref={sectionRef}
      className="py-14 sm:py-20 lg:py-28 bg-[#06080D] border-b border-zinc-800/80 overflow-hidden relative"
    >
      {/* Toast Notification Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 animate-fade-in pointer-events-auto">
          <div
            className={cn(
              "p-4 rounded-xl border shadow-2xl backdrop-blur-md flex items-start gap-3 transition-all",
              toast.type === "success"
                ? "bg-[#09110E]/95 border-emerald-500/80 text-zinc-100 shadow-emerald-950/40"
                : "bg-[#180A0A]/95 border-red-500/80 text-zinc-100 shadow-red-950/40"
            )}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-grow text-xs font-sans">
              <span
                className={cn(
                  "font-mono font-bold block uppercase tracking-wider",
                  toast.type === "success" ? "text-emerald-400" : "text-red-400"
                )}
              >
                {toast.title}
              </span>
              <p className="text-zinc-300 mt-1 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Telemetry Metadata (Centered on Mobile, Left-Aligned on Desktop) */}
        <div
          className={cn(
            "space-y-4 mb-10 sm:mb-14 lg:mb-16 transition-all duration-700 ease-out transform text-center sm:text-left",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          {/* Top Bar: Pill Badge on Left & Agency ID on Right */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#11141D] border border-amber-500/30 text-[#E58518] font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E58518] animate-pulse" />
              <span>LICENSED GUARDING & PATROL</span>
            </div>

            <div className="flex items-center gap-2.5 font-mono text-[11px] sm:text-xs text-zinc-400">
              <span>AGENCY ID: FL-D/G-8820</span>
              <span className="text-zinc-600">|</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10b981]" />
                ACTIVE
              </span>
            </div>
          </div>

          {/* Section Titles */}
          <div className="pt-1">
            <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#E58518] block mb-1.5">
              STATIC & PATROL GUARD SERVICES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black uppercase text-white font-sans tracking-tight leading-[1.18] max-w-4xl mx-auto sm:mx-0">
              COMMERCIAL & RESIDENTIAL STATIC SECURITY
            </h2>
          </div>
        </div>

        {/* 2-Card Grid - Centered on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-xl mx-auto lg:max-w-none">
          
          {/* Left Card: ARMED SECURITY DETAIL (CLASS-G) */}
          <div
            className={cn(
              "relative w-full bg-[#090C12] border border-amber-600/60 hover:border-amber-500 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black/80 flex flex-col justify-between transition-all duration-700 ease-out transform group hover:-translate-y-1.5 hover:shadow-amber-600/10",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8 sm:-translate-x-12"
            )}
          >
            <div>
              {/* Badge Tag */}
              <div className="inline-block px-3 py-1 rounded bg-red-950/40 border border-red-500/50 text-red-400 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3.5">
                HIGH-THREAT PROTECTION
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold uppercase text-white font-sans tracking-tight leading-snug">
                ARMED SECURITY DETAIL (CLASS-G)
              </h3>

              {/* Description */}
              <p className="mt-2.5 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                Highly trained operators certified under Florida Chapter 493. Configured for tactical deterrence, asset safeguarding, and rapid-response situational control.
              </p>

              {/* Bullet Points */}
              <div className="mt-6 sm:mt-8 space-y-3.5 font-sans text-xs sm:text-sm text-zinc-200">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 text-[#E58518]">
                    <Crosshair className="h-4 w-4 stroke-[#E58518]" />
                  </div>
                  <span className="leading-snug">High-value construction & material preservation</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 text-[#E58518]">
                    <Crosshair className="h-4 w-4 stroke-[#E58518]" />
                  </div>
                  <span className="leading-snug">Financial institution vault & asset protection</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 text-[#E58518]">
                    <Crosshair className="h-4 w-4 stroke-[#E58518]" />
                  </div>
                  <span className="leading-snug">Critical energy & communication infrastructure</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 text-[#E58518]">
                    <Crosshair className="h-4 w-4 stroke-[#E58518]" />
                  </div>
                  <span className="leading-snug">Active threat response & physical deterrence protocols</span>
                </div>
              </div>
            </div>

            {/* Action Button: Opens Armed Request Modal */}
            <div className="mt-8 sm:mt-10 pt-4 border-t border-zinc-800/80">
              <button
                onClick={() => handleOpenModal("armed")}
                className="w-full py-4 px-4 rounded-lg bg-[#0F131C] hover:bg-[#E58518] text-[#E58518] hover:text-black border border-[#E58518]/70 hover:border-[#E58518] font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 active:translate-y-[1px] shadow-lg shadow-black/60 cursor-pointer text-center min-h-[48px] flex items-center justify-center gap-2"
              >
                <span>[ REQUEST ARMED DETAIL ]</span>
              </button>
            </div>
          </div>

          {/* Right Card: UNARMED SECURITY DETAIL (CLASS-D) */}
          <div
            className={cn(
              "relative w-full bg-[#090C12] border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black/80 flex flex-col justify-between transition-all duration-700 delay-150 ease-out transform group hover:-translate-y-1.5",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 sm:translate-x-12"
            )}
          >
            <div>
              {/* Badge Tag */}
              <div className="inline-block px-3 py-1 rounded bg-amber-950/40 border border-amber-500/40 text-amber-400 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3.5">
                ACCESS CONTROL & PATROL
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold uppercase text-white font-sans tracking-tight leading-snug">
                UNARMED SECURITY DETAIL (CLASS-D)
              </h3>

              {/* Description */}
              <p className="mt-2.5 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                Professional officers focused on surveillance, perimeter verification, and strict access protocols. Ideal for corporate headquarters and public relations interfaces.
              </p>

              {/* Bullet Points */}
              <div className="mt-6 sm:mt-8 space-y-3.5 font-sans text-xs sm:text-sm text-zinc-300">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 text-zinc-400">
                    <Crosshair className="h-4 w-4 stroke-zinc-400" />
                  </div>
                  <span className="leading-snug">Executive office concierges & reception logistics</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 text-zinc-400">
                    <Crosshair className="h-4 w-4 stroke-zinc-400" />
                  </div>
                  <span className="leading-snug">Gated residential access verification control</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 text-zinc-400">
                    <Crosshair className="h-4 w-4 stroke-zinc-400" />
                  </div>
                  <span className="leading-snug">Corporate reception & visitor logging management</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 text-zinc-400">
                    <Crosshair className="h-4 w-4 stroke-zinc-400" />
                  </div>
                  <span className="leading-snug">Scheduled perimeter foot patrols & sensor checkpoints</span>
                </div>
              </div>
            </div>

            {/* Action Button: Opens Unarmed Request Modal */}
            <div className="mt-8 sm:mt-10 pt-4 border-t border-zinc-800/80">
              <button
                onClick={() => handleOpenModal("unarmed")}
                className="w-full py-4 px-4 rounded-lg bg-[#0F131C] hover:bg-[#E58518] text-[#E58518] hover:text-black border border-[#E58518]/70 hover:border-[#E58518] font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 active:translate-y-[1px] shadow-lg shadow-black/60 cursor-pointer text-center min-h-[48px] flex items-center justify-center gap-2"
              >
                <span>[ REQUEST UNARMED DETAIL ]</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Metadata Bar */}
        <div
          className={cn(
            "mt-12 sm:mt-16 pt-5 sm:pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 font-mono text-[11px] sm:text-xs text-zinc-500 text-center sm:text-left transition-all duration-700 delay-300 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <span>OVERLAND TACTICAL SECURE SYSTEMS</span>
          <span>SYS_REF: FL_GRID_493_D_G</span>
        </div>

      </div>

      {/* Interactive Request Detail Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#0A0D14] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Modal Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-[#141824] text-zinc-400 hover:text-white transition-colors cursor-pointer border border-zinc-800"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E58518] block mb-1">
                [ TACTICAL INTAKE DISPATCH ]
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white font-sans">
                {selectedType === "armed"
                  ? "REQUEST ARMED DETAIL (CLASS-G)"
                  : "REQUEST UNARMED DETAIL (CLASS-D)"}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-1">
                Enter your detail parameters to initiate deployment transmission.
              </p>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
              {/* Row: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-300 uppercase tracking-wider font-bold">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="LEGAL SURNAME & FIRST NAME"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-md bg-[#07090E] border border-zinc-800 px-3.5 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:border-[#E58518] focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-zinc-300 uppercase tracking-wider font-bold">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="SECURE EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md bg-[#07090E] border border-zinc-800 px-3.5 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:border-[#E58518] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row: Phone & Location Scope */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-300 uppercase tracking-wider font-bold">
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="CONTACT PHONE NUMBER"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-md bg-[#07090E] border border-zinc-800 px-3.5 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:border-[#E58518] focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-zinc-300 uppercase tracking-wider font-bold">
                    DEPLOYMENT SCOPE
                  </label>
                  <select
                    value={travelScope}
                    onChange={(e) => setTravelScope(e.target.value)}
                    className="w-full rounded-md bg-[#07090E] border border-zinc-800 px-3.5 py-2.5 text-zinc-100 focus:border-[#E58518] focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Florida Regional (Treasure Coast / Palm Beach / Miami)">
                      Florida Regional (Treasure Coast / Palm Beach / Miami)
                    </option>
                    <option value="Fort Pierce Tactical TOC Area">
                      Fort Pierce Tactical TOC Area
                    </option>
                    <option value="Palm Beach / Broward County Sector">
                      Palm Beach / Broward County Sector
                    </option>
                    <option value="Miami-Dade Operational Vector">
                      Miami-Dade Operational Vector
                    </option>
                    <option value="National Multi-State Scope">
                      National Multi-State Scope
                    </option>
                  </select>
                </div>
              </div>

              {/* Operational Brief Textarea */}
              <div className="space-y-1.5">
                <label className="text-zinc-300 uppercase tracking-wider font-bold">
                  OPERATIONAL BRIEF / MISSION REQUIREMENTS
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail site location, timeline, threat level, or special escort parameters..."
                  value={operationalBrief}
                  onChange={(e) => setOperationalBrief(e.target.value)}
                  className="w-full rounded-md bg-[#07090E] border border-zinc-800 px-3.5 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:border-[#E58518] focus:outline-none transition-colors resize-y"
                />
              </div>

              {/* NDA Privilege Disclaimer */}
              <div className="flex items-center gap-2 text-[10px] text-[#E58518] pt-1">
                <Lock className="h-3.5 w-3.5 shrink-0" />
                <span>INTAKE IS COVERED BY AUTOMATIC NON-DISCLOSURE PRIVILEGE.</span>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-lg bg-[#E58518] hover:bg-[#F59E0B] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-600/20 active:translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>TRANSMITTING INTAKE...</span>
                    </>
                  ) : (
                    <>
                      <span>CONFIRM & TRANSMIT INTAKE</span>
                      <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </section>
  );
}
