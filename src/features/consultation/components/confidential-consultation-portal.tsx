"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Shield,
  ShieldAlert,
  Radio,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FormState {
  fullName: string;
  organization: string;
  email: string;
  serviceRequired: string;
  targetStartDate: string;
  urgencyLevel: string;
  operationsArea: string;
  confidentialMessage: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  serviceRequired?: string;
  targetStartDate?: string;
  urgencyLevel?: string;
  operationsArea?: string;
  confidentialMessage?: string;
}

const SERVICE_OPTIONS = [
  "Armed Guarding (Class-G)",
  "Executive Protection",
  "Unarmed Guarding (Class-D)",
  "Event Security",
  "Threat Assessment",
];

const URGENCY_OPTIONS = [
  "Emergency <24h",
  "Urgent 24-48h",
  "Standard (Within 7 Days)",
  "Scheduled Future Date",
];

export function ConfidentialConsultationPortal() {
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    organization: "",
    email: "",
    serviceRequired: "Armed Guarding (Class-G)",
    targetStartDate: "",
    urgencyLevel: "Emergency <24h",
    operationsArea: "",
    confidentialMessage: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    dispatchId: string;
    message: string;
  } | null>(null);
  const [pingLatency, setPingLatency] = useState(14.2);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Subtle real-time ping fluctuation animation
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.5) * 1.2;
      setPingLatency((prev) => +(Math.max(12.8, Math.min(16.5, prev + delta))).toFixed(1));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const validateField = (name: keyof FormState, value: string): string | undefined => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Full name or officer contact is required.";
        if (value.trim().length < 2) return "Must be at least 2 characters.";
        return undefined;
      case "email":
        if (!value.trim()) return "Direct email address is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
          return "Please enter a valid email address.";
        return undefined;
      case "serviceRequired":
        if (!value.trim()) return "Please select a service requirement.";
        return undefined;
      case "targetStartDate":
        if (!value.trim()) return "Target start date is required.";
        return undefined;
      case "urgencyLevel":
        if (!value.trim()) return "Urgency level is required.";
        return undefined;
      case "operationsArea":
        if (!value.trim()) return "Operations area / jurisdiction is required.";
        return undefined;
      case "confidentialMessage":
        if (!value.trim()) return "Confidential message brief is required.";
        if (value.trim().length < 5) return "Please provide at least 5 characters.";
        return undefined;
      default:
        return undefined;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const errorMsg = validateField(name as keyof FormState, value);
    if (errorMsg) {
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof FormState>).forEach((key) => {
      if (key !== "organization") {
        const errorMsg = validateField(key, formData[key]);
        if (errorMsg) {
          newErrors[key] = errorMsg;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to transmit confidential consultation request.");
      }

      setSubmissionSuccess({
        dispatchId: data.dispatchId,
        message: data.message || "Consultation transmission logged into active dispatch queue.",
      });
    } catch (err: unknown) {
      setServerError(
        err instanceof Error ? err.message : "An unexpected communication error occurred."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      organization: "",
      email: "",
      serviceRequired: "Armed Guarding (Class-G)",
      targetStartDate: "",
      urgencyLevel: "Emergency <24h",
      operationsArea: "",
      confidentialMessage: "",
    });
    setErrors({});
    setSubmissionSuccess(null);
    setServerError(null);
  };

  return (
    <section
      ref={sectionRef}
      id="consultation-portal"
      className="py-12 sm:py-16 lg:py-24 bg-[#07090E] border-b border-zinc-800/80 relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Status Bar: [ CLASSIFIED PORTAL ] SECURE LINK // 256-BIT ENCRYPTION ACTIVE */}
        <div
          className={cn(
            "flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-6 mb-8 sm:mb-10 border-b border-zinc-800/80 font-mono text-[11px] sm:text-xs transition-all duration-700 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          )}
        >
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="text-[#E58518] font-bold">[ CLASSIFIED PORTAL ]</span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-300">SECURE LINK // 256-BIT ENCRYPTION ACTIVE</span>
          </div>

          <div className="flex items-center gap-2 text-white font-bold">
            <span className="h-2 w-2 rounded-full bg-[#E58518] animate-pulse" />
            <span className="tracking-wide">STATUS: READY FOR IMMEDIATE DEPLOYMENT</span>
          </div>
        </div>

        {/* 2-Column Main Portal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column (4 cols): SECURE LOG CONSOLE */}
          <div
            className={cn(
              "lg:col-span-4 bg-[#0A0D15] border border-zinc-800/90 rounded-2xl p-6 sm:p-7 shadow-2xl transition-all duration-1000 ease-out transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            )}
          >
            {/* Header */}
            <div className="border-b border-zinc-800/80 pb-4 mb-6">
              <span className="font-mono text-[11px] font-bold text-[#E58518] uppercase tracking-wider block mb-1">
                [ LIVE TRANSMISSION ]
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white font-sans tracking-tight">
                SECURE LOG CONSOLE
              </h3>
            </div>

            {/* Telemetry Specs */}
            <div className="space-y-3.5 font-mono text-xs pb-6 border-b border-zinc-800/80">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 uppercase">REMOTE NODE</span>
                <span className="text-zinc-200 font-bold">HNW-GATEWAY.SECURE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 uppercase">PING LATENCY</span>
                <span className="text-[#E58518] font-bold flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
                  {pingLatency} MS (SECURE-SSL)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 uppercase">SIGNATURES</span>
                <span className="text-emerald-400 font-bold">MIL-STD-810H VERIFIED</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 uppercase">OP AUTH ID</span>
                <span className="text-zinc-200 font-bold">OP-493-G-ACTIVE</span>
              </div>
            </div>

            {/* Tactical Scanning Grid / Radar Graphic */}
            <div className="py-6 border-b border-zinc-800/80">
              <div className="relative w-full h-48 bg-[#06080E] border border-zinc-800/80 rounded-xl overflow-hidden flex items-center justify-center">
                
                {/* Radar Scanning Grid Label */}
                <div className="absolute top-2.5 left-3 font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                  SCANNING GRID
                </div>

                {/* Radar Grid SVG with animated sweep */}
                <svg className="w-36 h-36" viewBox="0 0 100 100">
                  {/* Concentric Circles */}
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#27272A" strokeWidth="0.8" strokeDasharray="2 3" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="#27272A" strokeWidth="0.8" />
                  <circle cx="50" cy="50" r="15" fill="none" stroke="#3F3F46" strokeWidth="0.8" />
                  
                  {/* Crosshairs */}
                  <line x1="5" y1="50" x2="95" y2="50" stroke="#3F3F46" strokeWidth="0.6" />
                  <line x1="50" y1="5" x2="50" y2="95" stroke="#3F3F46" strokeWidth="0.6" />

                  {/* Target Blips */}
                  <circle cx="68" cy="38" r="2.5" fill="#E58518" className="animate-pulse" />
                  <circle cx="82" cy="62" r="2.5" fill="#E58518" className="animate-pulse" />
                  <circle cx="34" cy="58" r="2" fill="#E58518" opacity="0.6" />

                  {/* Animated Rotating Radar Beam */}
                  <g className="origin-center animate-[spin_4s_linear_infinite]">
                    <line x1="50" y1="50" x2="50" y2="5" stroke="#E58518" strokeWidth="1.5" strokeOpacity="0.8" />
                    <path d="M 50 50 L 50 5 A 45 45 0 0 1 85 20 Z" fill="url(#radarGradient)" />
                  </g>

                  <defs>
                    <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#E58518" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#E58518" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>

                {/* Radar sweep ambient glow */}
                <div className="absolute inset-0 bg-radial from-amber-500/5 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Bottom Terminal Footnote */}
            <p className="mt-5 text-[11px] text-zinc-400 font-sans leading-relaxed">
              All connection links are fully end-to-end encrypted. Submission routes immediately to high-threat tactical operators in selected jurisdictions.
            </p>
          </div>

          {/* Right Column (8 cols): REQUEST CONFIDENTIAL CONSULTATION */}
          <div
            className={cn(
              "lg:col-span-8 bg-[#0A0D15] border border-zinc-800/90 rounded-2xl p-6 sm:p-9 lg:p-10 shadow-2xl transition-all duration-1000 delay-150 ease-out transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}
          >
            {/* Header */}
            <div className="mb-8">
              <span className="font-mono text-[11px] sm:text-xs font-bold text-[#E58518] uppercase tracking-wider block mb-2">
                [ CONFIDENTIAL DISPATCH PORTAL ]
              </span>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white font-sans tracking-tight">
                REQUEST CONFIDENTIAL CONSULTATION
              </h2>

              {/* Orange Underline Accent */}
              <div className="w-20 h-[3px] bg-[#E58518] rounded-full mt-2.5 shadow-[0_0_12px_rgba(229,133,24,0.6)]" />

              <p className="mt-3.5 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                Provide initial baseline parameters below. This data is handled in strict compliance with military-grade privacy guidelines.
              </p>
            </div>

            {submissionSuccess ? (
              /* Success State Screen */
              <div className="space-y-6 text-center py-8 animate-fade-in">
                <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-emerald-950/50 border border-emerald-500/80 text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
                  <CheckCircle2 className="h-9 w-9 sm:h-11 sm:w-11" />
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#E58518] font-bold uppercase tracking-widest px-3 py-1 rounded bg-amber-950/40 border border-amber-500/30 inline-block">
                    TRANSMISSION ID: {submissionSuccess.dispatchId}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-white font-sans mt-2">
                    DISPATCH TRANSMISSION LOGGED
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
                    {submissionSuccess.message} A confirmation receipt has been dispatched to your email.
                  </p>
                </div>

                <div className="p-4 sm:p-5 bg-[#06080D] border border-zinc-800 rounded-xl text-left font-mono text-xs space-y-2.5 max-w-md mx-auto">
                  <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                    <span className="text-zinc-500">Service Vector:</span>
                    <span className="text-zinc-200">{formData.serviceRequired}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                    <span className="text-zinc-500">Urgency Level:</span>
                    <span className="text-amber-400 font-bold">{formData.urgencyLevel}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                    <span className="text-zinc-500">Operations Area:</span>
                    <span className="text-zinc-200">{formData.operationsArea}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Zero-Trace Protocol:</span>
                    <span className="text-emerald-400 font-bold">ACTIVE & LOCKED</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 px-6 py-3 bg-[#E58518] hover:bg-[#F59E0B] text-black font-mono text-xs sm:text-sm font-black uppercase tracking-wider rounded-lg transition-all shadow-lg cursor-pointer"
                >
                  [ TRANSMIT ANOTHER INQUIRY ]
                </button>
              </div>
            ) : (
              /* The Form */
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                
                {serverError && (
                  <div className="p-4 rounded-lg bg-red-950/40 border border-red-500/50 flex items-start gap-3 text-red-200 text-xs sm:text-sm">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <p>{serverError}</p>
                  </div>
                )}

                {/* 2-Col: FULL NAME & SERVICE REQUIRED */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Left: FULL NAME, ORG, EMAIL */}
                  <div className="space-y-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="fullName" className="font-mono text-xs font-bold uppercase text-white tracking-wide">
                        FULL NAME <span className="text-[#E58518]">*</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="E.g., John Doe"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={cn(
                          "w-full px-4 py-3 bg-[#06080E] border rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-all",
                          errors.fullName
                            ? "border-red-500/80 focus:border-red-500"
                            : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30"
                        )}
                      />
                      {errors.fullName && (
                        <p className="font-mono text-[11px] text-red-400 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Organization / Company */}
                    <div className="space-y-1.5">
                      <label htmlFor="organization" className="font-mono text-xs font-bold uppercase text-white tracking-wide">
                        ORGANIZATION / COMPANY
                      </label>
                      <input
                        id="organization"
                        name="organization"
                        type="text"
                        placeholder="Company Name"
                        value={formData.organization}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#06080E] border border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Direct Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="font-mono text-xs font-bold uppercase text-white tracking-wide">
                        DIRECT EMAIL <span className="text-[#E58518]">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@firm-secure.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={cn(
                          "w-full px-4 py-3 bg-[#06080E] border rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-all",
                          errors.email
                            ? "border-red-500/80 focus:border-red-500"
                            : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30"
                        )}
                      />
                      {errors.email && (
                        <p className="font-mono text-[11px] text-red-400 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Right: SERVICE REQUIRED & (DATE + URGENCY) */}
                  <div className="space-y-4">
                    {/* Service Required Custom Dropdown Box */}
                    <div className="space-y-1.5">
                      <label htmlFor="serviceRequired" className="font-mono text-xs font-bold uppercase text-white tracking-wide">
                        SERVICE REQUIRED <span className="text-[#E58518]">*</span>
                      </label>
                      
                      <div className="relative border border-amber-500/80 rounded-lg bg-[#06080E] overflow-hidden shadow-inner">
                        <select
                          id="serviceRequired"
                          name="serviceRequired"
                          value={formData.serviceRequired}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-[#06080E] text-sm text-white font-medium focus:outline-none appearance-none cursor-pointer"
                        >
                          {SERVICE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt} className="bg-[#0C1018] text-zinc-100 py-2">
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E58518] pointer-events-none" />
                      </div>

                      {/* Visual list of options display matching screenshot */}
                      <div className="pt-2 space-y-1 text-xs font-sans text-zinc-400">
                        {SERVICE_OPTIONS.map((opt) => {
                          const isActive = formData.serviceRequired === opt;
                          return (
                            <div
                              key={opt}
                              onClick={() => setFormData((prev) => ({ ...prev, serviceRequired: opt }))}
                              className={cn(
                                "px-3 py-1.5 rounded cursor-pointer transition-colors flex items-center justify-between text-xs",
                                isActive
                                  ? "bg-amber-950/40 text-[#E58518] font-bold border border-amber-500/30"
                                  : "hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-200"
                              )}
                            >
                              <span>{opt}</span>
                              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#E58518]" />}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* TARGET START DATE & URGENCY LEVEL */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {/* Target Start Date */}
                      <div className="space-y-1.5">
                        <label htmlFor="targetStartDate" className="font-mono text-xs font-bold uppercase text-white tracking-wide">
                          TARGET START DATE <span className="text-[#E58518]">*</span>
                        </label>
                        <input
                          id="targetStartDate"
                          name="targetStartDate"
                          type="text"
                          placeholder="YYYY-MM-DD"
                          value={formData.targetStartDate}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={cn(
                            "w-full px-3.5 py-3 bg-[#06080E] border rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-all",
                            errors.targetStartDate
                              ? "border-red-500/80 focus:border-red-500"
                              : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70"
                          )}
                        />
                        {errors.targetStartDate && (
                          <p className="font-mono text-[10px] text-red-400">{errors.targetStartDate}</p>
                        )}
                      </div>

                      {/* Urgency Level */}
                      <div className="space-y-1.5">
                        <label htmlFor="urgencyLevel" className="font-mono text-xs font-bold uppercase text-white tracking-wide">
                          URGENCY LEVEL <span className="text-[#E58518]">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="urgencyLevel"
                            name="urgencyLevel"
                            value={formData.urgencyLevel}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-3 bg-[#06080E] border border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70 rounded-lg text-sm text-zinc-100 appearance-none cursor-pointer focus:outline-none"
                          >
                            {URGENCY_OPTIONS.map((opt) => (
                              <option key={opt} value={opt} className="bg-[#0C1018] text-zinc-100">
                                {opt}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Operations Area */}
                    <div className="space-y-1.5">
                      <label htmlFor="operationsArea" className="font-mono text-xs font-bold uppercase text-white tracking-wide">
                        OPERATIONS AREA <span className="text-[#E58518]">*</span>
                      </label>
                      <input
                        id="operationsArea"
                        name="operationsArea"
                        type="text"
                        placeholder="E.g., West Palm Beach, FL"
                        value={formData.operationsArea}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={cn(
                          "w-full px-4 py-3 bg-[#06080E] border rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-all",
                          errors.operationsArea
                            ? "border-red-500/80 focus:border-red-500"
                            : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70"
                        )}
                      />
                      {errors.operationsArea && (
                        <p className="font-mono text-[10px] text-red-400">{errors.operationsArea}</p>
                      )}
                    </div>
                  </div>

                </div>

                {/* Confidential Message Textarea */}
                <div className="space-y-1.5 pt-2">
                  <label htmlFor="confidentialMessage" className="font-mono text-xs font-bold uppercase text-white tracking-wide">
                    CONFIDENTIAL MESSAGE <span className="text-[#E58518]">*</span>
                  </label>
                  <textarea
                    id="confidentialMessage"
                    name="confidentialMessage"
                    rows={4}
                    placeholder="Describe your security threat vector, timeline, and personnel count..."
                    value={formData.confidentialMessage}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full px-4 py-3 bg-[#06080E] border rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-all resize-y",
                      errors.confidentialMessage
                        ? "border-red-500/80 focus:border-red-500"
                        : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70"
                    )}
                  />
                  {errors.confidentialMessage && (
                    <p className="font-mono text-[11px] text-red-400 mt-1">{errors.confidentialMessage}</p>
                  )}
                </div>

                {/* Privacy Assurance Callout Box */}
                <div className="p-4 sm:p-4.5 rounded-xl bg-[#090C12] border border-[#E58518]/60 flex items-start gap-3.5 text-xs text-zinc-300 font-sans shadow-lg">
                  <ShieldAlert className="w-5 h-5 text-[#E58518] shrink-0 mt-0.5" />
                  <p className="leading-relaxed text-[11.5px] sm:text-xs">
                    <strong className="text-white uppercase font-mono font-bold tracking-wide">
                      PRIVACY ASSURANCE:
                    </strong>{" "}
                    Submission on this portal triggers immediate zero-trace log protocols. We do not sell, store on public clouds, or expose your security brief.
                  </p>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full py-4 rounded-lg font-mono text-xs sm:text-sm font-black uppercase tracking-wider text-black bg-[#E58518] hover:bg-[#F59E0B] transition-all duration-300 shadow-[0_0_25px_rgba(229,133,24,0.3)] hover:shadow-[0_0_35px_rgba(229,133,24,0.5)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed",
                      isSubmitting && "bg-amber-600"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                        <span>[ TRANSMITTING DISPATCH REQUEST... ]</span>
                      </>
                    ) : (
                      <span>[ SUBMIT DISPATCH REQUEST ]</span>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
