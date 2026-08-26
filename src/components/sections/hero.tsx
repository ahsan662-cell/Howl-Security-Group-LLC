"use client";

import React, { useEffect, useState } from "react";
import {
  Shield,
  Phone,
  X,
  Lock,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { COMPANY_INFO } from "@/constants/company";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface HeroProps {
  onRequestCoverage?: () => void;
}

interface ToastNotification {
  type: "success" | "error";
  title: string;
  message: string;
}

export function Hero({ onRequestCoverage }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceInterest, setServiceInterest] = useState("Executive & Dignitary Close Protection");
  const [travelScope, setTravelScope] = useState("Florida Regional (Treasure Coast / Palm Beach / Miami)");
  const [operationalBrief, setOperationalBrief] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast State
  const [toast, setToast] = useState<ToastNotification | null>(null);

  useEffect(() => {
    // Trigger smooth entrance animation on mount
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
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

  const handleOpenModal = () => {
    setModalOpen(true);
    if (onRequestCoverage) {
      onRequestCoverage();
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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
        throw new Error(data.error || "Failed to submit coverage request.");
      }

      // Success Toast
      setToast({
        type: "success",
        title: `COVERAGE INTAKE RECORDED [${data.intakeId}]`,
        message: `Transmission received by Operations Command. Confirmation email dispatched to ${email}.`,
      });

      // Reset & close
      setModalOpen(false);
      setFullName("");
      setEmail("");
      setPhone("");
      setOperationalBrief("");
    } catch (err: unknown) {
      // Error Toast
      setToast({
        type: "error",
        title: "TRANSMISSION FAILED",
        message:
          err instanceof Error
            ? err.message
            : "Network failure. Please dial dispatch directly at (772) 940-4114.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-0 sm:min-h-[85vh] lg:min-h-[96vh] flex flex-col justify-center items-center overflow-hidden bg-[#07090E] px-4 sm:px-6 lg:px-8 pt-12 pb-6 sm:pt-24 sm:pb-20 lg:py-32">
      
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

      {/* Background Founder Photographic Portrait & Responsive Framing */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden flex items-center justify-center pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2000&auto=format&fit=crop"
          alt="Gerald Hazellief - Founder and US Army Ranger Veteran"
          className="relative max-w-4xl lg:max-w-full mx-auto w-full h-full object-cover object-[center_30%] opacity-90 filter grayscale contrast-125 brightness-90 transform sm:scale-100 transition-all duration-1000"
        />

        {/* Targeted Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090E]/80 via-transparent to-[#07090E]/80" />

        {/* Global Dark Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#07090E_90%)] opacity-75" />
      </div>

      {/* Vertical Tactical Watermark on the Right */}
      <div
        className={cn(
          "hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center select-none pointer-events-none opacity-20 rotate-90 origin-right transition-all duration-1000 delay-700 ease-out transform",
          isLoaded ? "opacity-20 translate-x-0" : "opacity-0 translate-x-8"
        )}
      >
        <span className="font-mono text-3xl font-black tracking-[0.35em] text-zinc-400 uppercase whitespace-nowrap">
          HOWL DEFENSE
        </span>
        <span className="font-mono text-[9px] tracking-[0.4em] text-zinc-500 uppercase mt-1 whitespace-nowrap">
          TACTICAL COMMAND CONSOLE V4.22
        </span>
      </div>

      {/* Main Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Top Badge: [ VETERAN-OWNED & OPERATED • US ARMY RANGER LED ] */}
        <div
          className={cn(
            "mb-6 sm:mb-8 transition-all duration-700 ease-out transform",
            isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95"
          )}
        >
          <Badge variant="bracketed" dot={true}>
            VETERAN-OWNED & OPERATED • US ARMY RANGER LED
          </Badge>
        </div>

        {/* Main Display Headline */}
        <h1 className="text-3xl relative z-10 sm:text-5xl md:text-6xl lg:text-7xl font-black font-sans uppercase tracking-tight text-white leading-[1.08] max-w-4xl mx-auto drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
          <span
            className={cn(
              "block transition-all duration-700 delay-150 ease-out transform",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            PREEMPTIVE PROTECTION.
          </span>
          <span
            className={cn(
              "block text-white transition-all duration-700 delay-250 ease-out transform",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            UNCOMPROMISING
          </span>
          <span
            className={cn(
              "block text-white transition-all duration-700 delay-350 ease-out transform",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            VIGILANCE.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={cn(
            "mt-6 sm:mt-8 text-xs sm:text-base md:text-lg text-zinc-100 max-w-2xl mx-auto leading-relaxed font-sans font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] transition-all duration-700 delay-500 ease-out transform",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          Special Operations leadership and martial arts mastery applied to executive protection, high-stakes event security, and commercial threat mitigation across South Florida.
        </p>

        {/* Dual Call to Action Buttons */}
        <div
          className={cn(
            "mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none transition-all duration-700 delay-650 ease-out transform",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          {/* Primary CTA: REQUEST COVERAGE (Opens Interactive Modal) */}
          <button
            onClick={handleOpenModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D97706] hover:bg-[#E58518] text-white font-bold text-sm sm:text-base uppercase tracking-wider px-7 py-3.5 rounded shadow-lg shadow-amber-600/20 border border-amber-400/40 transition-all transform active:translate-y-[1px] hover:scale-[1.02] cursor-pointer"
          >
            <span>REQUEST COVERAGE</span>
            <Shield className="h-4 w-4" />
          </button>

          {/* Secondary CTA: Direct Line Phone Button */}
          <a
            href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0E121B]/90 hover:bg-[#151A26] text-zinc-100 font-mono text-sm sm:text-base px-6 py-3.5 rounded border border-zinc-700/90 hover:border-zinc-500 shadow-md transition-all active:translate-y-[1px] hover:scale-[1.02]"
          >
            <Phone className="h-4 w-4 text-amber-500" />
            <span>Direct Line: {COMPANY_INFO.contact.phoneDisplay}</span>
          </a>
        </div>

      </div>

      {/* Interactive Request Coverage Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in text-left">
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
                REQUEST IMMEDIATE COVERAGE DETAIL
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-1">
                Enter your security requirements to transmit direct dispatch telemetry to Fort Pierce Operations Command.
              </p>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
              {/* Row: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-300 uppercase tracking-wider font-bold">
                    FULL NAME *
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
                    EMAIL ADDRESS *
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

              {/* Row: Phone & Service Interest */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-300 uppercase tracking-wider font-bold">
                    PHONE NUMBER *
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
                    SERVICE FOCUS *
                  </label>
                  <select
                    value={serviceInterest}
                    onChange={(e) => setServiceInterest(e.target.value)}
                    className="w-full rounded-md bg-[#07090E] border border-zinc-800 px-3.5 py-2.5 text-zinc-100 focus:border-[#E58518] focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Executive & Dignitary Close Protection">
                      Executive & Dignitary Close Protection
                    </option>
                    <option value="Armed Security Detail (Class-G)">
                      Armed Security Detail (Class-G)
                    </option>
                    <option value="Unarmed Security Detail (Class-D)">
                      Unarmed Security Detail (Class-D)
                    </option>
                    <option value="Event Security & VIP Escort (BKFC Style)">
                      Event Security & VIP Escort (BKFC Style)
                    </option>
                    <option value="Threat & Vulnerability Assessment">
                      Threat & Vulnerability Assessment
                    </option>
                    <option value="Ving Tsun Tactical Combatives Instruction">
                      Ving Tsun Tactical Combatives Instruction
                    </option>
                  </select>
                </div>
              </div>

              {/* Location Scope */}
              <div className="space-y-1.5">
                <label className="text-zinc-300 uppercase tracking-wider font-bold">
                  DEPLOYMENT VECTOR / LOCATION SCOPE *
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
                  <option value="Palm Beach / Jupiter / Delray Vector">
                    Palm Beach / Jupiter / Delray Vector
                  </option>
                  <option value="Miami-Dade / Broward Sector">
                    Miami-Dade / Broward Sector
                  </option>
                  <option value="National Multi-State Scope">
                    National Multi-State Scope
                  </option>
                  <option value="International Consulting & VIP Escort">
                    International Consulting & VIP Escort
                  </option>
                </select>
              </div>

              {/* Operational Brief Textarea */}
              <div className="space-y-1.5">
                <label className="text-zinc-300 uppercase tracking-wider font-bold">
                  OPERATIONAL BRIEF / MISSION OBJECTIVES *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail site location, timeline, threat level, or specific security parameters..."
                  value={operationalBrief}
                  onChange={(e) => setOperationalBrief(e.target.value)}
                  className="w-full rounded-md bg-[#07090E] border border-zinc-800 px-3.5 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:border-[#E58518] focus:outline-none transition-colors resize-y"
                />
              </div>

              {/* Confidentiality Notice */}
              <div className="flex items-center gap-2 text-[10px] text-[#E58518] pt-1">
                <Lock className="h-3.5 w-3.5 shrink-0" />
                <span>INTAKE TRANSMISSION IS COVERED BY AUTOMATIC NON-DISCLOSURE PRIVILEGE.</span>
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
