"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Shield,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  trainingInterest: string;
  preferredDate: string;
  timeWindow: string;
  goals: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  trainingInterest?: string;
  preferredDate?: string;
  timeWindow?: string;
  goals?: string;
}

const LOCATION_OPTIONS = [
  "Vero Beach Studio",
  "Fort Pierce Tactical Facility",
  "On-Site Private Estate",
  "Corporate Facility / South Florida",
];

const PROGRAM_OPTIONS = [
  "Complimentary Introductory Visit & Evaluation",
  "Private 1-on-1 Executive Instruction",
  "Traditional Ving Tsun Group Classes",
  "Law Enforcement & Security CQB Combatives",
  "Corporate Threat & Defense Seminar",
];

const TIME_WINDOWS = [
  "Morning / Afternoon / Evening",
  "Morning (09:00 - 12:00)",
  "Afternoon (12:00 - 17:00)",
  "Evening (17:00 - 20:00)",
  "Flexible / Any Time Window",
];

export function DirectTrainingInquiryForm() {
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    location: "Vero Beach Studio",
    trainingInterest: "Complimentary Introductory Visit & Evaluation",
    preferredDate: "",
    timeWindow: "Morning / Afternoon / Evening",
    goals: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    inquiryId: string;
    message: string;
  } | null>(null);
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

  const validateField = (name: keyof FormState, value: string): string | undefined => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Full name is required.";
        if (value.trim().length < 2) return "Must be at least 2 characters.";
        return undefined;
      case "email":
        if (!value.trim()) return "Email address is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
          return "Please enter a valid email address.";
        return undefined;
      case "phone":
        if (!value.trim()) return "Contact phone number is required.";
        if (value.trim().replace(/\D/g, "").length < 10)
          return "Please enter a valid 10-digit phone number.";
        return undefined;
      case "location":
        if (!value.trim()) return "Preferred location is required.";
        return undefined;
      case "trainingInterest":
        if (!value.trim()) return "Please select a training program.";
        return undefined;
      case "preferredDate":
        if (!value.trim()) return "Preferred appointment date is required.";
        return undefined;
      case "timeWindow":
        if (!value.trim()) return "Preferred time window is required.";
        return undefined;
      case "goals":
        if (!value.trim()) return "Please tell Sifu Gerald briefly about your goals.";
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
      const errorMsg = validateField(key, formData[key]);
      if (errorMsg) {
        newErrors[key] = errorMsg;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/training", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit training inquiry.");
      }

      setSubmissionSuccess({
        inquiryId: data.inquiryId,
        message: data.message || "Training registration logged successfully.",
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
      email: "",
      phone: "",
      location: "Vero Beach Studio",
      trainingInterest: "Complimentary Introductory Visit & Evaluation",
      preferredDate: "",
      timeWindow: "Morning / Afternoon / Evening",
      goals: "",
    });
    setErrors({});
    setSubmissionSuccess(null);
    setServerError(null);
  };

  return (
    <section
      ref={sectionRef}
      id="inquiry-form"
      className="py-16 sm:py-20 lg:py-28 bg-[#05070A] border-b border-zinc-800/80 relative overflow-hidden"
    >
      {/* Background Subtle Spotlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-10 sm:mb-14 transition-all duration-700 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          {/* Top Tag: [ BOOK YOUR APPOINTMENT WITH SIFU GERALD ] */}
          <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#E58518] block mb-3">
            [ BOOK YOUR APPOINTMENT WITH SIFU GERALD ]
          </span>

          {/* Main Title */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-sans tracking-tight leading-tight">
            DIRECT TRAINING INQUIRY & REGISTRATION
          </h2>

          {/* Subtitle */}
          <p className="mt-3.5 text-xs sm:text-sm md:text-base text-zinc-400 font-sans max-w-2xl mx-auto leading-relaxed">
            Select your preferred training path below to schedule your visit or private consultation.
          </p>
        </div>

        {/* Form Card Container */}
        <div
          className={cn(
            "relative bg-[#090C12] border border-zinc-800/90 rounded-2xl p-6 sm:p-9 lg:p-10 shadow-2xl backdrop-blur-sm transition-all duration-1000 delay-150 ease-out transform",
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.99]"
          )}
        >
          {submissionSuccess ? (
            /* Success Transmission Screen */
            <div className="space-y-6 text-center py-6 sm:py-10 animate-fade-in">
              <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-emerald-950/50 border border-emerald-500/80 text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
                <CheckCircle2 className="h-9 w-9 sm:h-11 sm:w-11" />
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs text-[#E58518] font-bold uppercase tracking-widest px-3 py-1 rounded bg-amber-950/40 border border-amber-500/30 inline-block">
                  REGISTRATION ID: {submissionSuccess.inquiryId}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white font-sans mt-2">
                  APPOINTMENT TRANSMISSION LOGGED
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
                  {submissionSuccess.message} A confirmation receipt has been sent to your email.
                </p>
              </div>

              <div className="p-4 sm:p-5 bg-[#06080D] border border-zinc-800 rounded-xl text-left font-mono text-xs space-y-2.5 max-w-md mx-auto">
                <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                  <span className="text-zinc-500">Program:</span>
                  <span className="text-zinc-200">{formData.trainingInterest}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                  <span className="text-zinc-500">Location:</span>
                  <span className="text-[#E58518] font-bold">{formData.location}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                  <span className="text-zinc-500">Requested Window:</span>
                  <span className="text-zinc-200">{formData.preferredDate} ({formData.timeWindow})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Status:</span>
                  <span className="text-emerald-400 font-bold">QUEUED FOR SIFU GERALD REVIEW</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="mt-4 px-6 py-3 bg-[#E58518] hover:bg-[#F59E0B] text-black font-mono text-xs sm:text-sm font-black uppercase tracking-wider rounded-lg transition-all shadow-lg cursor-pointer"
              >
                [ REGISTER ANOTHER APPOINTMENT ]
              </button>
            </div>
          ) : (
            /* Training Inquiry Form */
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              
              {serverError && (
                <div className="p-4 rounded-lg bg-red-950/40 border border-red-500/50 flex items-start gap-3 text-red-200 text-xs sm:text-sm">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p>{serverError}</p>
                </div>
              )}

              {/* Row 1: FULL NAME & EMAIL ADDRESS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="font-mono text-xs font-bold uppercase text-zinc-300 tracking-wide">
                    FULL NAME <span className="text-[#E58518]">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="e.g. John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full px-4 py-3 sm:py-3.5 bg-[#06080E] border rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-all",
                      errors.fullName
                        ? "border-red-500/80 focus:border-red-500"
                        : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30"
                    )}
                  />
                  {errors.fullName && (
                    <p className="font-mono text-[11px] text-red-400 mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="font-mono text-xs font-bold uppercase text-zinc-300 tracking-wide">
                    EMAIL ADDRESS <span className="text-[#E58518]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="e.g. john@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full px-4 py-3 sm:py-3.5 bg-[#06080E] border rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-all",
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

              {/* Row 2: PHONE NUMBER & PREFERRED LOCATION / REGION */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="font-mono text-xs font-bold uppercase text-zinc-300 tracking-wide">
                    PHONE NUMBER <span className="text-[#E58518]">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="e.g. (772) 555-0199"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full px-4 py-3 sm:py-3.5 bg-[#06080E] border rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-all",
                      errors.phone
                        ? "border-red-500/80 focus:border-red-500"
                        : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30"
                    )}
                  />
                  {errors.phone && (
                    <p className="font-mono text-[11px] text-red-400 mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Preferred Location / Region */}
                <div className="space-y-1.5">
                  <label htmlFor="location" className="font-mono text-xs font-bold uppercase text-zinc-300 tracking-wide">
                    PREFERRED LOCATION / REGION <span className="text-[#E58518]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 sm:py-3.5 bg-[#06080E] border border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70 rounded-lg text-sm text-zinc-100 appearance-none cursor-pointer focus:outline-none"
                    >
                      {LOCATION_OPTIONS.map((loc) => (
                        <option key={loc} value={loc} className="bg-[#0C1018] text-zinc-100">
                          {loc}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 3: WHAT WOULD YOU LIKE TO DISCUSS/TRAIN? */}
              <div className="space-y-1.5">
                <label htmlFor="trainingInterest" className="font-mono text-xs font-bold uppercase text-zinc-300 tracking-wide">
                  WHAT WOULD YOU LIKE TO DISCUSS/TRAIN? <span className="text-[#E58518]">*</span>
                </label>
                <div className="relative">
                  <select
                    id="trainingInterest"
                    name="trainingInterest"
                    value={formData.trainingInterest}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 sm:py-3.5 bg-[#06080E] border border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70 rounded-lg text-sm text-zinc-100 appearance-none cursor-pointer focus:outline-none"
                  >
                    {PROGRAM_OPTIONS.map((prog) => (
                      <option key={prog} value={prog} className="bg-[#0C1018] text-zinc-100">
                        {prog}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                </div>
              </div>

              {/* Row 4: PREFERRED DATE & PREFERRED TIME WINDOW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Preferred Date */}
                <div className="space-y-1.5">
                  <label htmlFor="preferredDate" className="font-mono text-xs font-bold uppercase text-zinc-300 tracking-wide">
                    PREFERRED DATE <span className="text-[#E58518]">*</span>
                  </label>
                  <input
                    id="preferredDate"
                    name="preferredDate"
                    type="text"
                    placeholder="Select Date (e.g. YYYY-MM-DD)"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full px-4 py-3 sm:py-3.5 bg-[#06080E] border rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-all",
                      errors.preferredDate
                        ? "border-red-500/80 focus:border-red-500"
                        : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70"
                    )}
                  />
                  {errors.preferredDate && (
                    <p className="font-mono text-[11px] text-red-400 mt-1">{errors.preferredDate}</p>
                  )}
                </div>

                {/* Preferred Time Window */}
                <div className="space-y-1.5">
                  <label htmlFor="timeWindow" className="font-mono text-xs font-bold uppercase text-zinc-300 tracking-wide">
                    PREFERRED TIME WINDOW <span className="text-[#E58518]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="timeWindow"
                      name="timeWindow"
                      value={formData.timeWindow}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 sm:py-3.5 bg-[#06080E] border border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70 rounded-lg text-sm text-zinc-100 appearance-none cursor-pointer focus:outline-none"
                    >
                      {TIME_WINDOWS.map((win) => (
                        <option key={win} value={win} className="bg-[#0C1018] text-zinc-100">
                          {win}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 5: PRIOR EXPERIENCE OR SPECIFIC GOALS */}
              <div className="space-y-1.5">
                <label htmlFor="goals" className="font-mono text-xs font-bold uppercase text-zinc-300 tracking-wide">
                  PRIOR EXPERIENCE OR SPECIFIC GOALS <span className="text-[#E58518]">*</span>
                </label>
                <textarea
                  id="goals"
                  name="goals"
                  rows={4}
                  placeholder="Tell Sifu Gerald briefly about your goals or prior training background..."
                  value={formData.goals}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={cn(
                    "w-full px-4 py-3 bg-[#06080E] border rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-all resize-y",
                    errors.goals
                      ? "border-red-500/80 focus:border-red-500"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70"
                  )}
                />
                {errors.goals && (
                  <p className="font-mono text-[11px] text-red-400 mt-1">{errors.goals}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
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
                      <span>[ CONFIRMING APPOINTMENT TRANSMISSION... ]</span>
                    </>
                  ) : (
                    <span>CONFIRM & SCHEDULE APPOINTMENT</span>
                  )}
                </button>
              </div>

              {/* Footer Trust Badges */}
              <div className="pt-3 flex flex-col items-center gap-2.5 font-mono text-[11px] sm:text-xs text-zinc-400 text-center">
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Shield className="w-3.5 h-3.5 text-[#E58518]" />
                    <span>Confidential & Direct</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Clock className="w-3.5 h-3.5 text-[#E58518]" />
                    <span>Fast 24-Hour Response</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-zinc-500">
                  <MapPin className="w-3.5 h-3.5 text-[#E58518]" />
                  <span>Serving Treasure Coast & Vero Beach (772) 932-8282</span>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
