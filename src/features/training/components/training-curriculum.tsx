"use client";

import React, { useEffect, useRef, useState } from "react";
import { Lock, ArrowRight, CheckCircle2, Shield, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function TrainingCurriculum() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceInterest, setServiceInterest] = useState(
    "Executive Protection / Threat Assessment / Private Ving Tsun Lessons / Group Class Visit"
  );
  const [travelScope, setTravelScope] = useState(
    "Florida Regional / National / International Consulting"
  );
  const [operationalBrief, setOperationalBrief] = useState("");

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState<{
    intakeId: string;
    message: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

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
        throw new Error(data.error || "Failed to submit intake transmission.");
      }

      setSubmittedResponse({
        intakeId: data.intakeId,
        message: data.message,
      });
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected network error occurred."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedResponse(null);
    setFullName("");
    setEmail("");
    setPhone("");
    setOperationalBrief("");
  };

  return (
    <section
      id="training"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-[#07090E] border-b border-zinc-800/80 overflow-hidden relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div
          className={cn(
            "text-center mb-12 sm:mb-16 transition-all duration-700 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          {/* Badge: [ SECURE INTAKE PORTAL ] */}
          <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E58518] block mb-3">
            [ SECURE INTAKE PORTAL ]
          </span>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-sans tracking-tight leading-tight">
            BOOK YOUR CONSULTATION OR TRAINING VISIT
          </h2>

          {/* Subtitle */}
          <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-sans max-w-xl mx-auto">
            Select your preferred service path below to schedule your visit or private executive intake.
          </p>
        </div>

        {/* Form Container Card */}
        <div
          className={cn(
            "bg-[#0A0D14] border border-zinc-800/90 rounded-2xl p-6 sm:p-10 shadow-2xl shadow-black/80 transition-all duration-1000 delay-150 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          {submittedResponse ? (
            /* Success Receipt State */
            <div className="py-8 text-center space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-950/60 border border-emerald-500 text-emerald-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div className="space-y-1">
                <span className="font-mono text-xs text-[#E58518] font-bold uppercase tracking-wider block">
                  INTAKE TRANSMISSION RECORDED
                </span>
                <h3 className="text-xl sm:text-2xl font-bold uppercase text-white font-sans">
                  TRANSMISSION ID: {submittedResponse.intakeId}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto font-sans pt-1">
                  Confirmation email dispatched via secure relay. Our command team will review your operational requirements and reach out via your secured phone number.
                </p>
              </div>

              <div className="p-4 bg-[#07090E] border border-zinc-800 rounded-lg text-left font-mono text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                  <span className="text-zinc-500">Applicant:</span>
                  <span className="text-zinc-200">{fullName}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                  <span className="text-zinc-500">Service:</span>
                  <span className="text-amber-400 font-bold truncate max-w-[200px]">{serviceInterest}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Confidentiality Protocol:</span>
                  <span className="text-emerald-400 font-bold">ACTIVE (NDA)</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 bg-[#121622] hover:bg-[#181E2E] text-zinc-200 border border-zinc-700 font-mono text-xs uppercase tracking-wider font-bold px-6 py-3 rounded-lg transition-colors cursor-pointer"
              >
                <span>Submit Another Intake</span>
              </button>
            </div>
          ) : (
            /* Main Intake Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Error Message */}
              {errorMessage && (
                <div className="p-3.5 bg-red-950/40 border border-red-500/50 rounded-lg text-xs font-mono text-red-400 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Row 1: Full Name & Email Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    <span>FULL NAME</span>
                    <span className="text-zinc-500 text-[10px]">SYS.REQ.01</span>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="ENTER LEGAL SURNAME & FIRST NAME"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-md bg-[#07090E] border border-zinc-800 px-4 py-3 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-[#E58518] focus:outline-none transition-colors font-mono"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    <span>EMAIL ADDRESS</span>
                    <span className="text-zinc-500 text-[10px]">SYS.REQ.01</span>
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="SECURE COMMUNICATOR EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md bg-[#07090E] border border-zinc-800 px-4 py-3 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-[#E58518] focus:outline-none transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Row 2: Direct Phone Number */}
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  <span>DIRECT PHONE NUMBER</span>
                  <span className="text-zinc-500 text-[10px]">SYS.REQ.01</span>
                </div>
                <input
                  type="tel"
                  required
                  placeholder="CONTACT NUMBER (VOIP OR SECURED MOBILE PREFERRED)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-md bg-[#07090E] border border-zinc-800 px-4 py-3 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-[#E58518] focus:outline-none transition-colors font-mono"
                />
              </div>

              {/* Row 3: Service Interest Dropdown */}
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  <span>SERVICE INTEREST</span>
                  <span className="text-zinc-500 text-[10px]">SYS.REQ.01</span>
                </div>
                <div className="relative">
                  <select
                    value={serviceInterest}
                    onChange={(e) => setServiceInterest(e.target.value)}
                    className="w-full appearance-none rounded-md bg-[#07090E] border border-zinc-800 px-4 py-3 text-xs sm:text-sm text-zinc-100 focus:border-[#E58518] focus:outline-none transition-colors font-mono cursor-pointer pr-10"
                  >
                    <option value="Executive Protection / Threat Assessment / Private Ving Tsun Lessons / Group Class Visit">
                      Executive Protection / Threat Assessment / Private Ving Tsun Lessons / Group Class Visit
                    </option>
                    <option value="Executive & Dignitary Close Protection">
                      Executive & Dignitary Close Protection
                    </option>
                    <option value="Threat & Vulnerability Assessment Audit">
                      Threat & Vulnerability Assessment Audit
                    </option>
                    <option value="Private Ving Tsun Tactical Combatives (1-on-1)">
                      Private Ving Tsun Tactical Combatives (1-on-1)
                    </option>
                    <option value="Tactical Academy Group Class & Seminar Visit">
                      Tactical Academy Group Class & Seminar Visit
                    </option>
                    <option value="Combat Sports & BKFC Event Detail">
                      Combat Sports & BKFC Event Detail
                    </option>
                    <option value="Commercial & Luxury Estate Patrol">
                      Commercial & Luxury Estate Patrol
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Row 4: Location / Travel Scope Dropdown */}
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  <span>LOCATION / TRAVEL SCOPE</span>
                  <span className="text-zinc-500 text-[10px]">SYS.REQ.01</span>
                </div>
                <div className="relative">
                  <select
                    value={travelScope}
                    onChange={(e) => setTravelScope(e.target.value)}
                    className="w-full appearance-none rounded-md bg-[#07090E] border border-zinc-800 px-4 py-3 text-xs sm:text-sm text-zinc-100 focus:border-[#E58518] focus:outline-none transition-colors font-mono cursor-pointer pr-10"
                  >
                    <option value="Florida Regional / National / International Consulting">
                      Florida Regional / National / International Consulting
                    </option>
                    <option value="Florida Regional (Treasure Coast / Palm Beach / Miami)">
                      Florida Regional (Treasure Coast / Palm Beach / Miami)
                    </option>
                    <option value="National Multi-State Deployment">
                      National Multi-State Deployment
                    </option>
                    <option value="International Consulting & Global Travel">
                      International Consulting & Global Travel
                    </option>
                    <option value="Fort Pierce Tactical Facility On-Site">
                      Fort Pierce Tactical Facility On-Site
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Row 5: Operational Brief / Goals */}
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  <span>OPERATIONAL BRIEF / GOALS</span>
                  <span className="text-zinc-500 text-[10px]">SYS.REQ.01</span>
                </div>
                <textarea
                  rows={4}
                  required
                  placeholder="Please detail requested timeline, parameters, operational objectives, or private training requirements."
                  value={operationalBrief}
                  onChange={(e) => setOperationalBrief(e.target.value)}
                  className="w-full rounded-md bg-[#07090E] border border-zinc-800 px-4 py-3 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-[#E58518] focus:outline-none transition-colors font-mono resize-y"
                />
              </div>

              {/* Confidentiality Notice */}
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-[#E58518] pt-1">
                <Lock className="h-3.5 w-3.5 shrink-0" />
                <span>ESTABLISHED INTAKES ARE HELD UNDER STRICT CONFIDENTIALITY PRIVILEGES.</span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-lg bg-[#E58518] hover:bg-[#F59E0B] text-black font-mono font-bold text-sm sm:text-base uppercase tracking-wider transition-all shadow-lg shadow-amber-600/20 active:translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>PROCESSING INTAKE TRANSMISSION...</span>
                    </>
                  ) : (
                    <>
                      <span>CONFIRM & SUBMIT INTAKE</span>
                      <ArrowRight className="h-5 w-5 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Bottom Legal Disclaimer Strip */}
        <div className="mt-8 text-center font-mono text-[11px] text-zinc-500">
          HOWL Security Group LLC | FL Agency License # B-3800282 | Direct Phone: (772) 940-4114
        </div>

      </div>
    </section>
  );
}
