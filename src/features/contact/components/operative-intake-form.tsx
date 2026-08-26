"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  FileCheck,
  X,
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  branch: string;
  licenseNumbers: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  branch?: string;
  licenseNumbers?: string;
  resume?: string;
}

export function OperativeIntakeForm() {
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    branch: "",
    licenseNumbers: "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    applicationId: string;
    message: string;
  } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const validateField = (name: keyof FormState, value: string): string | undefined => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Full legal name is required.";
        if (value.trim().length < 2) return "Name must be at least 2 characters.";
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
      case "branch":
        if (!value.trim()) return "Military / Law Enforcement branch or unit is required.";
        return undefined;
      case "licenseNumbers":
        if (!value.trim())
          return "Florida Security License numbers (or pending status) are required.";
        return undefined;
      default:
        return undefined;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation clear
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errorMsg = validateField(name as keyof FormState, value);
    if (errorMsg) {
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const validateAndSetFile = (file: File) => {
    const allowedExtensions = [".pdf", ".docx", ".doc"];
    const fileExt = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    const MAX_SIZE = 15 * 1024 * 1024; // 15MB

    if (!allowedExtensions.includes(fileExt)) {
      setErrors((prev) => ({
        ...prev,
        resume: "Invalid file format. Please upload PDF or DOCX documents.",
      }));
      return false;
    }

    if (file.size > MAX_SIZE) {
      setErrors((prev) => ({
        ...prev,
        resume: "File size exceeds 15MB limit. Please provide a smaller file.",
      }));
      return false;
    }

    setResumeFile(file);
    setErrors((prev) => ({ ...prev, resume: undefined }));
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      validateAndSetFile(files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const removeFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Validate all fields
    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof FormState>).forEach((key) => {
      const errorMsg = validateField(key, formData[key]);
      if (errorMsg) {
        newErrors[key] = errorMsg;
      }
    });

    if (!resumeFile) {
      newErrors.resume = "Operational CV / Resume file is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("fullName", formData.fullName.trim());
      payload.append("email", formData.email.trim());
      payload.append("phone", formData.phone.trim());
      payload.append("branch", formData.branch.trim());
      payload.append("licenseNumbers", formData.licenseNumbers.trim());
      if (resumeFile) {
        payload.append("resume", resumeFile);
      }

      const res = await fetch("/api/careers", {
        method: "POST",
        body: payload,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit operative profile.");
      }

      setSubmissionSuccess({
        applicationId: data.applicationId,
        message: data.message || "Operative profile transmission logged into vetting sequence.",
      });
    } catch (err: unknown) {
      setServerError(
        err instanceof Error ? err.message : "An unexpected transmission error occurred."
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
      branch: "",
      licenseNumbers: "",
    });
    setResumeFile(null);
    setErrors({});
    setSubmissionSuccess(null);
    setServerError(null);
  };

  return (
    <section
      ref={sectionRef}
      id="intake-form"
      className="py-16 sm:py-24 lg:py-32 bg-[#05070B] border-t border-b border-zinc-800/80 relative overflow-hidden"
    >
      {/* Background Ambience Spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div
          className={cn(
            "text-center mb-10 sm:mb-14 transition-all duration-700 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          {/* Top Tag: [ SECURE INTEL PORTAL ] */}
          <div className="inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#E58518] mb-3">
            <span className="text-zinc-500 font-normal">[</span>
            <span>SECURE INTEL PORTAL</span>
            <span className="text-zinc-500 font-normal">]</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-sans tracking-tight">
            SUBMIT OPERATIVE PROFILE
          </h2>

          {/* Subtitle */}
          <p className="mt-3.5 text-xs sm:text-sm md:text-base text-zinc-400 font-sans max-w-2xl mx-auto leading-relaxed">
            Provide your exact operational background, service history, and license credentials below. Ensure all information is current and fully verifiable.
          </p>
        </div>

        {/* Form Card Container */}
        <div
          className={cn(
            "relative bg-[#090C12] border border-zinc-800/90 rounded-2xl p-6 sm:p-9 lg:p-10 shadow-2xl backdrop-blur-sm transition-all duration-1000 delay-150 ease-out transform",
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.99]"
          )}
        >
          {/* Top Tactical Metadata Bar inside card */}
          <div className="flex items-center justify-between pb-5 sm:pb-6 border-b border-zinc-800/80 mb-6 sm:mb-8 font-mono text-xs">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-zinc-500">SYS-ID:</span>
              <span className="font-bold text-zinc-200">HOWL_INTAKE_V3</span>
            </div>
            <div className="text-[#E58518] font-bold tracking-widest text-[10.5px] sm:text-xs">
              [ ENCRYPTED PORT ]
            </div>
          </div>

          {submissionSuccess ? (
            /* Success Transmission Screen */
            <div className="space-y-6 text-center py-6 sm:py-10 animate-fade-in">
              <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-emerald-950/50 border border-emerald-500/80 text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
                <CheckCircle2 className="h-9 w-9 sm:h-11 sm:w-11" />
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs text-[#E58518] font-bold uppercase tracking-widest px-3 py-1 rounded bg-amber-950/40 border border-amber-500/30 inline-block">
                  DOSSIER ID: {submissionSuccess.applicationId}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white font-sans mt-2">
                  OPERATIVE DOSSIER TRANSMITTED
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
                  {submissionSuccess.message} A confirmation receipt has been sent to your email address.
                </p>
              </div>

              {/* Status Spec Table */}
              <div className="p-4 sm:p-5 bg-[#06080D] border border-zinc-800 rounded-xl text-left font-mono text-xs space-y-2.5 max-w-md mx-auto">
                <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                  <span className="text-zinc-500">Vetting Status:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    QUEUED FOR COMMAND AUDIT
                  </span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                  <span className="text-zinc-500">Candidate Name:</span>
                  <span className="text-zinc-200">{formData.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                  <span className="text-zinc-500">Service Branch:</span>
                  <span className="text-zinc-200">{formData.branch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Security Encryption:</span>
                  <span className="text-[#E58518] font-bold">AES-256 MIL-SPEC</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="mt-4 px-6 py-3 bg-[#E58518] hover:bg-[#F59E0B] text-black font-mono text-xs sm:text-sm font-black uppercase tracking-wider rounded-lg transition-all shadow-lg cursor-pointer"
              >
                [ TRANSMIT ANOTHER PROFILE ]
              </button>
            </div>
          ) : (
            /* Operative Intake Form */
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              
              {/* Server Error Alert */}
              {serverError && (
                <div className="p-4 rounded-lg bg-red-950/40 border border-red-500/50 flex items-start gap-3 text-red-200 text-xs sm:text-sm">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p>{serverError}</p>
                </div>
              )}

              {/* Field 1: FULL NAME */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="fullName" className="font-mono text-xs font-bold uppercase text-white tracking-wide">
                    FULL NAME <span className="text-[#E58518]">*</span>
                  </label>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                    [ SECURE_ENTRY_FIELD ]
                  </span>
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="e.g. Sgt. Marcus Vance"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={cn(
                    "w-full px-4 py-3 sm:py-3.5 bg-[#06080E] border rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-all",
                    errors.fullName
                      ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30"
                  )}
                />
                {errors.fullName && (
                  <p className="font-mono text-[11px] text-red-400 mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Field 2: EMAIL ADDRESS */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="email" className="font-mono text-xs font-bold uppercase text-white tracking-wide">
                    EMAIL ADDRESS <span className="text-[#E58518]">*</span>
                  </label>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                    [ SECURE_ENTRY_FIELD ]
                  </span>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g. m.vance@secureemail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={cn(
                    "w-full px-4 py-3 sm:py-3.5 bg-[#06080E] border rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-all",
                    errors.email
                      ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30"
                  )}
                />
                {errors.email && (
                  <p className="font-mono text-[11px] text-red-400 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Field 3: DIRECT CONTACT PHONE */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="phone" className="font-mono text-xs font-bold uppercase text-white tracking-wide">
                    DIRECT CONTACT PHONE <span className="text-[#E58518]">*</span>
                  </label>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                    [ SECURE_ENTRY_FIELD ]
                  </span>
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="e.g. +1 (305) 555-0199"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={cn(
                    "w-full px-4 py-3 sm:py-3.5 bg-[#06080E] border rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-all",
                    errors.phone
                      ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30"
                  )}
                />
                {errors.phone && (
                  <p className="font-mono text-[11px] text-red-400 mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Field 4: MILITARY / LAW ENFORCEMENT BRANCH */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="branch" className="font-mono text-xs font-bold uppercase text-white tracking-wide">
                    MILITARY / LAW ENFORCEMENT BRANCH <span className="text-[#E58518]">*</span>
                  </label>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                    [ SECURE_ENTRY_FIELD ]
                  </span>
                </div>
                <input
                  id="branch"
                  name="branch"
                  type="text"
                  placeholder="e.g. USMC / 2nd Recon Battalion"
                  value={formData.branch}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={cn(
                    "w-full px-4 py-3 sm:py-3.5 bg-[#06080E] border rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-all",
                    errors.branch
                      ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30"
                  )}
                />
                {errors.branch && (
                  <p className="font-mono text-[11px] text-red-400 mt-1">{errors.branch}</p>
                )}
              </div>

              {/* Field 5: FLORIDA SECURITY LICENSE NUMBERS (D / G / CC) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="licenseNumbers" className="font-mono text-xs font-bold uppercase text-white tracking-wide">
                    FLORIDA SECURITY LICENSE NUMBERS (D / G / CC) <span className="text-[#E58518]">*</span>
                  </label>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                    [ SECURE_ENTRY_FIELD ]
                  </span>
                </div>
                <input
                  id="licenseNumbers"
                  name="licenseNumbers"
                  type="text"
                  placeholder="e.g. D-1234567, G-9876543, CC-4567890"
                  value={formData.licenseNumbers}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={cn(
                    "w-full px-4 py-3 sm:py-3.5 bg-[#06080E] border rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-all",
                    errors.licenseNumbers
                      ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30"
                  )}
                />
                {errors.licenseNumbers && (
                  <p className="font-mono text-[11px] text-red-400 mt-1">{errors.licenseNumbers}</p>
                )}
              </div>

              {/* Field 6: OPERATIONAL CV / RESUME UPLOAD DROP ZONE */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase text-white tracking-wide">
                    OPERATIONAL CV / RESUME
                  </span>
                  <span className="font-mono text-[10.5px] font-bold text-[#E58518] uppercase tracking-wider">
                    REQUIRED
                  </span>
                </div>

                {/* Hidden Real File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.docx,.doc"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {resumeFile ? (
                  /* File Selected Preview State */
                  <div className="p-4 sm:p-5 rounded-xl bg-[#06080E] border border-emerald-500/50 flex items-center justify-between gap-4 transition-all">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 shrink-0">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-mono font-bold text-white truncate">
                          {resumeFile.name}
                        </p>
                        <p className="text-[11px] text-zinc-400 font-mono">
                          {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for encrypted transfer
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={removeFile}
                      aria-label="Remove document"
                      className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  /* Drag & Drop Upload Zone */
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={cn(
                      "group cursor-pointer rounded-xl border border-dashed p-6 sm:p-8 text-center transition-all duration-300 flex flex-col items-center justify-center gap-2.5",
                      isDragOver
                        ? "border-[#E58518] bg-amber-950/20 scale-[1.01]"
                        : errors.resume
                        ? "border-red-500/80 bg-red-950/10 hover:border-red-500"
                        : "border-[#E58518]/70 hover:border-[#E58518] bg-[#06080E]/80 hover:bg-[#080B12]"
                    )}
                  >
                    {/* Orange Upload Arrow Icon */}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#E58518] group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    {/* Bracketed Upload Prompt */}
                    <div className="font-mono text-xs sm:text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">
                      [ Upload CV / Resume (PDF, DOCX) – Secure encrypted transfer ]
                    </div>

                    {/* Disclaimer Subtext */}
                    <div className="text-[11px] sm:text-xs text-zinc-400 font-sans">
                      Maximum file size: 15MB. Encrypted via SSL.
                    </div>
                  </div>
                )}

                {errors.resume && (
                  <p className="font-mono text-[11px] text-red-400 mt-1">{errors.resume}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-3">
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
                      <span>[ TRANSMITTING OPERATIVE PROFILE... ]</span>
                    </>
                  ) : (
                    <span>[ SUBMIT OPERATIVE PROFILE ]</span>
                  )}
                </button>
              </div>

              {/* Bottom Vetting Disclaimer with Lock Icon */}
              <div className="flex items-center justify-center gap-2 text-center text-zinc-400 text-[11px] sm:text-xs pt-1 font-sans">
                <Lock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span>
                  Submission triggers secure vetting sequence. Active background verification is initiated instantly.
                </span>
              </div>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}
