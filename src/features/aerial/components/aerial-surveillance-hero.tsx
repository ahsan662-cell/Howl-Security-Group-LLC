"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Scan,
  Radio,
  Map,
  Zap,
  Shield,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AerialSurveillanceHeroProps {
  onRequestSurvey?: () => void;
}

const CAPABILITIES = [
  {
    icon: Scan,
    title: "[ THERMAL & NIGHT VISION RECON ]",
    description:
      "Advanced optics for dark perimeter auditing and low-light threat detection.",
  },
  {
    icon: Radio,
    title: "[ REAL-TIME EVENT OVERWATCH ]",
    description:
      "Continuous aerial monitoring for high-net-worth gatherings and large venue perimeters.",
  },
  {
    icon: Map,
    title: "[ PRE-DEPLOYMENT ROUTE SURVEYS ]",
    description:
      "High-definition aerial mapping for executive transit routes and venue entry points.",
  },
  {
    icon: Zap,
    title: "[ RAPID INCIDENT RESPONSE ]",
    description:
      "Instant air dispatch to verify perimeter alarms and investigate suspicious activity without risking ground personnel.",
  },
];

const OPERATION_VECTORS = [
  "Thermal & Night Vision Recon",
  "Real-Time Event Overwatch",
  "Pre-Deployment Route Surveys",
  "Rapid Incident Response",
  "Perimeter Defense & Estate Audit",
];

const TIMEFRAME_OPTIONS = [
  "Immediate Emergency (< 2 Hours)",
  "Within 24 Hours",
  "Scheduled Date / Event",
  "Ongoing Recurring Patrol",
];

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  operationType: string;
  siteLocation: string;
  timeframe: string;
  missionDetails: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  operationType?: string;
  siteLocation?: string;
  timeframe?: string;
  missionDetails?: string;
}

export function AerialSurveillanceHero({
  onRequestSurvey,
}: AerialSurveillanceHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    operationType: "Thermal & Night Vision Recon",
    siteLocation: "",
    timeframe: "Within 24 Hours",
    missionDetails: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    surveyId: string;
    message: string;
  } | null>(null);

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
        if (!value.trim()) return "Direct email address is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
          return "Please provide a valid email format.";
        return undefined;
      case "phone":
        if (!value.trim()) return "Contact phone number is required.";
        if (value.trim().replace(/\D/g, "").length < 10)
          return "Please enter a valid 10-digit phone number.";
        return undefined;
      case "operationType":
        if (!value.trim()) return "Operation vector is required.";
        return undefined;
      case "siteLocation":
        if (!value.trim()) return "Target site address or region is required.";
        return undefined;
      case "timeframe":
        if (!value.trim()) return "Deployment timeframe is required.";
        return undefined;
      case "missionDetails":
        if (!value.trim()) return "Please describe the mission objectives.";
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
      const res = await fetch("/api/aerial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to log aerial survey request.");
      }

      setSubmissionSuccess({
        surveyId: data.surveyId,
        message: data.message || "Aerial reconnaissance survey mission logged successfully.",
      });
    } catch (err: unknown) {
      setServerError(
        err instanceof Error ? err.message : "An unexpected flight desk error occurred."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetModal = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      operationType: "Thermal & Night Vision Recon",
      siteLocation: "",
      timeframe: "Within 24 Hours",
      missionDetails: "",
    });
    setErrors({});
    setSubmissionSuccess(null);
    setServerError(null);
    setIsModalOpen(false);
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-28 bg-[#06080D] border-b border-zinc-800/80 relative overflow-hidden"
    >
      {/* Tactical Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d0a_1px,transparent_1px),linear-gradient(to_bottom,#1f293d0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Ambient Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Hero Layout: Left Narrative & Right Tactical Drone Overwatch Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-14 sm:mb-18">
          
          {/* Left Column: Title & Mission Scope */}
          <div
            className={cn(
              "lg:col-span-6 space-y-6 transition-all duration-800 ease-out transform",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            {/* Tag Badge: [ FAA PART 107 CERTIFIED ] */}
            <div className="inline-block px-3.5 py-1.5 rounded bg-[#0A0D15] border border-amber-500/40 text-[#E58518] font-mono text-xs font-bold uppercase tracking-widest shadow-sm">
              [ FAA PART 107 CERTIFIED ]
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white font-sans tracking-tight leading-[1.04]">
                AERIAL RECONNAISSANCE & DRONE OVERWATCH
              </h1>

              {/* Orange Underline Bars */}
              <div className="flex items-center gap-2 mt-4">
                <div className="w-12 h-1 bg-[#E58518] rounded-full shadow-[0_0_10px_rgba(229,133,24,0.6)]" />
                <div className="w-4 h-1 bg-[#E58518]/70 rounded-full" />
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-zinc-300 font-sans leading-relaxed max-w-xl">
              Providing real-time tactical air support, elevated perimeter defense, thermal site surveys, and rapid situational awareness for high-risk operations and estate security.
            </p>
          </div>

          {/* Right Column: Tactical Drone Night Visual with HUD Telemetry */}
          <div
            className={cn(
              "lg:col-span-6 transition-all duration-1000 delay-200 ease-out transform",
              isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-6"
            )}
          >
            <div className="relative bg-[#090C13] border border-zinc-800/90 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl p-2 sm:p-3 group">
              <div className="relative w-full h-[280px] sm:h-[360px] md:h-[400px] rounded-xl overflow-hidden bg-[#06080E] flex items-center justify-center">
                
                {/* SVG Cinematic Drone Overwatch Scene */}
                <svg
                  className="w-full h-full object-cover"
                  viewBox="0 0 700 450"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <radialGradient id="skyGlow" cx="50%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#111827" stopOpacity="0.9" />
                      <stop offset="60%" stopColor="#080C14" stopOpacity="1" />
                      <stop offset="100%" stopColor="#040609" stopOpacity="1" />
                    </radialGradient>
                    <linearGradient id="droneBody" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#27272A" />
                      <stop offset="40%" stopColor="#18181B" />
                      <stop offset="100%" stopColor="#09090B" />
                    </linearGradient>
                    <linearGradient id="lensGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E58518" />
                      <stop offset="100%" stopColor="#9A3412" />
                    </linearGradient>
                  </defs>

                  {/* Dark Night Sky */}
                  <rect width="100%" height="100%" fill="url(#skyGlow)" />

                  {/* City Horizon Lights */}
                  <g opacity="0.3">
                    <circle cx="100" cy="330" r="1.5" fill="#FDE047" />
                    <circle cx="150" cy="335" r="1" fill="#FFFFFF" />
                    <circle cx="220" cy="328" r="1.5" fill="#FDE047" />
                    <circle cx="340" cy="332" r="1.2" fill="#60A5FA" />
                    <circle cx="480" cy="329" r="1.5" fill="#FDE047" />
                    <circle cx="590" cy="334" r="1.2" fill="#FFFFFF" />
                    <circle cx="650" cy="330" r="1.5" fill="#FDE047" />
                  </g>

                  {/* High-Security Estate Silhouette with Ground Illuminations */}
                  <path
                    d="M 120 450 L 160 380 L 220 380 L 240 360 L 300 360 L 320 340 L 380 340 L 400 360 L 460 360 L 480 380 L 540 380 L 580 450 Z"
                    fill="#0A0E17"
                    stroke="#1E293B"
                    strokeWidth="1.5"
                  />
                  {/* Estate Windows Glow */}
                  <rect x="250" y="375" width="8" height="12" fill="#FEF08A" opacity="0.7" />
                  <rect x="270" y="375" width="8" height="12" fill="#FEF08A" opacity="0.7" />
                  <rect x="330" y="355" width="10" height="14" fill="#FEF08A" opacity="0.8" />
                  <rect x="360" y="355" width="10" height="14" fill="#FEF08A" opacity="0.8" />
                  <rect x="420" y="375" width="8" height="12" fill="#FEF08A" opacity="0.7" />
                  <rect x="440" y="375" width="8" height="12" fill="#FEF08A" opacity="0.7" />

                  {/* Estate Perimeter Wall */}
                  <line x1="80" y1="410" x2="620" y2="410" stroke="#334155" strokeWidth="2" />
                  <circle cx="180" cy="410" r="4" fill="#E58518" opacity="0.8" />
                  <circle cx="520" cy="410" r="4" fill="#E58518" opacity="0.8" />

                  {/* Tactical Matrice Drone Flying in Mid-Ground */}
                  <g className="group-hover:translate-y-[-4px] transition-transform duration-700 ease-out origin-center">
                    
                    {/* Drone Arms */}
                    <line x1="220" y1="120" x2="350" y2="160" stroke="#18181B" strokeWidth="12" strokeLinecap="round" />
                    <line x1="480" y1="120" x2="350" y2="160" stroke="#18181B" strokeWidth="12" strokeLinecap="round" />
                    <line x1="240" y1="210" x2="350" y2="160" stroke="#18181B" strokeWidth="10" strokeLinecap="round" />
                    <line x1="460" y1="210" x2="350" y2="160" stroke="#18181B" strokeWidth="10" strokeLinecap="round" />

                    {/* Propeller Rotors & Blurs */}
                    <ellipse cx="220" cy="115" rx="55" ry="5" fill="#3F3F46" opacity="0.5" />
                    <ellipse cx="480" cy="115" rx="55" ry="5" fill="#3F3F46" opacity="0.5" />
                    <ellipse cx="240" cy="210" rx="50" ry="4" fill="#3F3F46" opacity="0.4" />
                    <ellipse cx="460" cy="210" rx="50" ry="4" fill="#3F3F46" opacity="0.4" />

                    {/* Motor Hubs with Amber Nav Lights */}
                    <circle cx="220" cy="115" r="7" fill="#18181B" />
                    <circle cx="220" cy="115" r="3" fill="#E58518" className="animate-pulse" />
                    <circle cx="480" cy="115" r="7" fill="#18181B" />
                    <circle cx="480" cy="115" r="3" fill="#E58518" className="animate-pulse" />
                    
                    <circle cx="240" cy="210" r="6" fill="#18181B" />
                    <circle cx="240" cy="210" r="2.5" fill="#E58518" />
                    <circle cx="460" cy="210" r="6" fill="#18181B" />
                    <circle cx="460" cy="210" r="2.5" fill="#E58518" />

                    {/* Drone Main Fuselage */}
                    <rect x="310" y="130" width="80" height="55" rx="14" fill="url(#droneBody)" stroke="#3F3F46" strokeWidth="2" />
                    
                    {/* Top GPS Puck & Sensor Mast */}
                    <rect x="338" y="118" width="24" height="14" rx="4" fill="#27272A" />

                    {/* 3-Axis Gimbal & Optical Payload */}
                    <circle cx="350" cy="195" r="16" fill="#18181B" stroke="#3F3F46" strokeWidth="1.5" />
                    <circle cx="345" cy="195" r="5" fill="url(#lensGlow)" />
                    <circle cx="356" cy="192" r="3" fill="#60A5FA" opacity="0.8" />
                    <circle cx="356" cy="199" r="2.5" fill="#10B981" opacity="0.8" />
                  </g>

                  {/* HUD Telemetry Overlay */}
                  <g opacity="0.75" className="font-mono text-[10px] fill-zinc-400">
                    {/* Altitude Reticle */}
                    <line x1="160" y1="80" x2="160" y2="180" stroke="#E58518" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                    <line x1="155" y1="130" x2="165" y2="130" stroke="#E58518" strokeWidth="1.5" />
                    <text x="145" y="125" fill="#E58518" fontSize="9" textAnchor="end" fontWeight="bold">ALT</text>
                    <text x="145" y="138" fill="#FFFFFF" fontSize="9" textAnchor="end" fontWeight="bold">120M</text>

                    {/* Center Crosshair HUD */}
                    <circle cx="350" cy="220" r="22" stroke="#E58518" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />
                    <line x1="320" y1="220" x2="335" y2="220" stroke="#E58518" strokeWidth="1" opacity="0.7" />
                    <line x1="365" y1="220" x2="380" y2="220" stroke="#E58518" strokeWidth="1" opacity="0.7" />
                    <line x1="350" y1="190" x2="350" y2="205" stroke="#E58518" strokeWidth="1" opacity="0.7" />
                    <line x1="350" y1="235" x2="350" y2="250" stroke="#E58518" strokeWidth="1" opacity="0.7" />

                    {/* Bottom Right GPS Coordinates */}
                    <text x="660" y="400" fill="#9CA3AF" fontSize="9" textAnchor="end">34.0522° N</text>
                    <text x="660" y="415" fill="#9CA3AF" fontSize="9" textAnchor="end">118.2437° W</text>
                  </g>
                </svg>

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080E] via-transparent to-transparent pointer-events-none" />

                {/* HUD Live Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#06080D]/80 border border-zinc-800 text-[10px] font-mono text-zinc-300 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>OVERWATCH ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-12 sm:mb-16">
          {CAPABILITIES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                style={{
                  transitionDelay: `${index * 120 + 200}ms`,
                }}
                className={cn(
                  "group relative bg-[#090C13] border border-zinc-800/90 hover:border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-1 flex flex-col justify-between",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                {/* Corner Accents */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-transparent group-hover:border-[#E58518] transition-colors pointer-events-none" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-transparent group-hover:border-[#E58518] transition-colors pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-transparent group-hover:border-[#E58518] transition-colors pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-transparent group-hover:border-[#E58518] transition-colors pointer-events-none" />

                <div>
                  {/* Icon Circle */}
                  <div className="w-12 h-12 rounded-full border border-amber-500/40 bg-amber-950/20 flex items-center justify-center mb-4 text-[#E58518] group-hover:scale-110 group-hover:border-[#E58518] transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="font-mono text-xs sm:text-[13px] font-bold text-zinc-100 uppercase tracking-wider leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Action Button */}
        <div
          className={cn(
            "flex justify-center transition-all duration-700 delay-500 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <button
            type="button"
            onClick={() => {
              if (onRequestSurvey) {
                onRequestSurvey();
              } else {
                setIsModalOpen(true);
              }
            }}
            className="group px-8 sm:px-12 py-4 rounded-xl bg-[#090C13] border-2 border-[#E58518] hover:bg-[#E58518] text-[#E58518] hover:text-black font-mono text-xs sm:text-sm font-black uppercase tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(229,133,24,0.25)] hover:shadow-[0_0_35px_rgba(229,133,24,0.6)] flex items-center gap-3 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="text-lg group-hover:rotate-12 transition-transform">🛸</span>
            <span>[ REQUEST AERIAL SURVEY ]</span>
          </button>
        </div>

      </div>

      {/* Dedicated Tactical Aerial Recon & Survey Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-3xl bg-[#0A0D15] border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-zinc-100">
            
            {/* Modal Close Button */}
            <button
              onClick={handleResetModal}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submissionSuccess ? (
              /* Success Transmission Screen */
              <div className="space-y-6 text-center py-6 sm:py-10">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-950/50 border border-emerald-500 text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
                  <CheckCircle2 className="h-9 w-9" />
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#E58518] font-bold uppercase tracking-widest px-3 py-1 rounded bg-amber-950/40 border border-amber-500/30 inline-block">
                    MISSION ID: {submissionSuccess.surveyId}
                  </span>
                  <h3 className="text-2xl font-black uppercase text-white font-sans mt-2">
                    AERIAL MISSION BRIEF LOGGED
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    {submissionSuccess.message} A flight authorization & confirmation receipt has been sent to your email.
                  </p>
                </div>

                <div className="p-4 bg-[#06080D] border border-zinc-800 rounded-xl text-left font-mono text-xs space-y-2.5 max-w-md mx-auto">
                  <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                    <span className="text-zinc-500">Operation Vector:</span>
                    <span className="text-[#E58518] font-bold">{formData.operationType}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                    <span className="text-zinc-500">Target Site:</span>
                    <span className="text-zinc-200">{formData.siteLocation}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                    <span className="text-zinc-500">Timeframe:</span>
                    <span className="text-zinc-200">{formData.timeframe}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Status:</span>
                    <span className="text-emerald-400 font-bold">QUEUED FOR REMOTE PILOT DISPATCH</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleResetModal}
                  className="px-6 py-3 bg-[#E58518] hover:bg-[#F59E0B] text-black font-mono text-xs font-black uppercase tracking-wider rounded-lg transition-all shadow-lg cursor-pointer"
                >
                  [ CLOSE MISSION BRIEF ]
                </button>
              </div>
            ) : (
              /* Flight Request Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="border-b border-zinc-800 pb-4">
                  <span className="font-mono text-xs text-[#E58518] font-bold uppercase tracking-widest block mb-1">
                    // TACTICAL FLIGHT INTAKE DESK
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black uppercase text-white font-sans">
                    REQUEST AERIAL RECON & DRONE OVERWATCH
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                    Fill out target site details for airspace evaluation and FAA Part 107 flight coordination.
                  </p>
                </div>

                {serverError && (
                  <div className="p-4 rounded-lg bg-red-950/40 border border-red-500/50 flex items-start gap-3 text-red-200 text-xs sm:text-sm">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <p>{serverError}</p>
                  </div>
                )}

                {/* Row 1: Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs font-bold uppercase text-zinc-300 tracking-wide">
                      PRINCIPAL / CLIENT NAME <span className="text-[#E58518]">*</span>
                    </label>
                    <input
                      name="fullName"
                      type="text"
                      placeholder="e.g. Marcus Vance"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={cn(
                        "w-full px-3.5 py-3 bg-[#06080E] border rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-all",
                        errors.fullName
                          ? "border-red-500/80 focus:border-red-500"
                          : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70"
                      )}
                    />
                    {errors.fullName && (
                      <p className="font-mono text-[11px] text-red-400">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs font-bold uppercase text-zinc-300 tracking-wide">
                      DIRECT EMAIL <span className="text-[#E58518]">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="e.g. security@estate.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={cn(
                        "w-full px-3.5 py-3 bg-[#06080E] border rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-all",
                        errors.email
                          ? "border-red-500/80 focus:border-red-500"
                          : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70"
                      )}
                    />
                    {errors.email && (
                      <p className="font-mono text-[11px] text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone Number & Organization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs font-bold uppercase text-zinc-300 tracking-wide">
                      CONTACT PHONE <span className="text-[#E58518]">*</span>
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="e.g. (772) 940-4114"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={cn(
                        "w-full px-3.5 py-3 bg-[#06080E] border rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-all",
                        errors.phone
                          ? "border-red-500/80 focus:border-red-500"
                          : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70"
                      )}
                    />
                    {errors.phone && (
                      <p className="font-mono text-[11px] text-red-400">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs font-bold uppercase text-zinc-300 tracking-wide">
                      ORGANIZATION / ENTITY <span className="text-zinc-500">(OPTIONAL)</span>
                    </label>
                    <input
                      name="organization"
                      type="text"
                      placeholder="e.g. Vance Family Office"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-3 bg-[#06080E] border border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70 rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
                    >
                    </input>
                  </div>
                </div>

                {/* Row 3: Operation Vector & Timeframe */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs font-bold uppercase text-zinc-300 tracking-wide">
                      OPERATION VECTOR <span className="text-[#E58518]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="operationType"
                        value={formData.operationType}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-3 bg-[#06080E] border border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70 rounded-lg text-sm text-zinc-100 appearance-none cursor-pointer focus:outline-none"
                      >
                        {OPERATION_VECTORS.map((vec) => (
                          <option key={vec} value={vec} className="bg-[#0C1018] text-zinc-100">
                            {vec}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs font-bold uppercase text-zinc-300 tracking-wide">
                      DEPLOYMENT TIMEFRAME <span className="text-[#E58518]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="timeframe"
                        value={formData.timeframe}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-3 bg-[#06080E] border border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70 rounded-lg text-sm text-zinc-100 appearance-none cursor-pointer focus:outline-none"
                      >
                        {TIMEFRAME_OPTIONS.map((time) => (
                          <option key={time} value={time} className="bg-[#0C1018] text-zinc-100">
                            {time}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Row 4: Target Site / Coordinates */}
                <div className="space-y-1.5">
                  <label className="font-mono text-xs font-bold uppercase text-zinc-300 tracking-wide">
                    TARGET SITE / ADDRESS / REGION <span className="text-[#E58518]">*</span>
                  </label>
                  <input
                    name="siteLocation"
                    type="text"
                    placeholder="e.g. Palm Beach Waterfront Estate or GPS Coordinates"
                    value={formData.siteLocation}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full px-3.5 py-3 bg-[#06080E] border rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-all",
                      errors.siteLocation
                        ? "border-red-500/80 focus:border-red-500"
                        : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70"
                    )}
                  />
                  {errors.siteLocation && (
                    <p className="font-mono text-[11px] text-red-400">{errors.siteLocation}</p>
                  )}
                </div>

                {/* Row 5: Mission Details */}
                <div className="space-y-1.5">
                  <label className="font-mono text-xs font-bold uppercase text-zinc-300 tracking-wide">
                    MISSION OBJECTIVES & SPECIAL PROTOCOLS <span className="text-[#E58518]">*</span>
                  </label>
                  <textarea
                    name="missionDetails"
                    rows={3}
                    placeholder="Provide perimeter boundaries, night thermal requirements, or specific transit route details..."
                    value={formData.missionDetails}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full px-3.5 py-2.5 bg-[#06080E] border rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-all resize-y",
                      errors.missionDetails
                        ? "border-red-500/80 focus:border-red-500"
                        : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500/70"
                    )}
                  />
                  {errors.missionDetails && (
                    <p className="font-mono text-[11px] text-red-400">{errors.missionDetails}</p>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full py-3.5 rounded-lg font-mono text-xs sm:text-sm font-black uppercase tracking-wider text-black bg-[#E58518] hover:bg-[#F59E0B] transition-all duration-300 shadow-[0_0_25px_rgba(229,133,24,0.3)] hover:shadow-[0_0_35px_rgba(229,133,24,0.5)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed",
                      isSubmitting && "bg-amber-600"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                        <span>[ TRANSMITTING FLIGHT AUTHORIZATION BRIEF... ]</span>
                      </>
                    ) : (
                      <span>TRANSMIT AERIAL MISSION BRIEF</span>
                    )}
                  </button>
                </div>

                {/* Footer Security Badges */}
                <div className="pt-2 flex items-center justify-center gap-4 text-zinc-500 font-mono text-[11px]">
                  <div className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-[#E58518]" />
                    <span>FAA Part 107 Compliant</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#E58518]" />
                    <span>Immediate Air Dispatch Feasible</span>
                  </div>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
