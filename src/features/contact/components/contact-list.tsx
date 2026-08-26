import React from "react";
import { CAREER_POSITIONS } from "@/constants/mock-data/careers.data";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, MapPin, DollarSign, ChevronRight, Award } from "lucide-react";
import Link from "next/link";

export function CareersList() {
  return (
    <section id="careers" className="py-20 lg:py-24 bg-[#07090E] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-zinc-800/80 gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-500 block mb-2">
              // RECRUITMENT & OPERATIONAL DEPLOYMENT
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-white font-sans tracking-tight">
              JOIN THE HOWL TACTICAL DETAIL
            </h2>
          </div>
          <Badge variant="bracketed" dot={true}>
            VETERAN & FIRST RESPONDER PREFERRED
          </Badge>
        </div>

        <div className="mb-10 p-6 bg-[#0E121B] border-l-4 border-l-amber-500 border-zinc-800 rounded-sm">
          <h3 className="text-base font-bold uppercase text-white font-sans">
            Our Standard: Uncompromising Discipline & Physical Mastery
          </h3>
          <p className="mt-1 text-sm text-zinc-300 font-sans">
            We are not a run-of-the-mill security guard company. Howl operators undergo background vetting, physical readiness testing, and combatives qualification. Prior military combat arms or tactical law enforcement experience is strongly valued.
          </p>
        </div>

        {/* Positions List */}
        <div className="space-y-4">
          {CAREER_POSITIONS.map((pos) => (
            <div
              key={pos.id}
              className="p-6 bg-[#0C1018] border border-zinc-800 hover:border-zinc-700 rounded-sm transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-amber-500">{pos.code}</span>
                  <Badge variant="tactical">{pos.employmentType}</Badge>
                  <Badge variant="amber">{pos.clearanceLevel}</Badge>
                </div>
                <h4 className="text-lg font-bold text-white uppercase font-sans">
                  {pos.title}
                </h4>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-amber-500" />
                    {pos.location}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <DollarSign className="h-3.5 w-3.5" />
                    {pos.salaryRange}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="#intake-form"
                  className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-[#121622] hover:bg-[#181E2E] text-zinc-200 border border-zinc-700 hover:border-zinc-500 font-mono text-xs uppercase tracking-wider font-bold px-5 py-2.5 rounded transition-colors"
                >
                  <span>Review Requirements & Apply</span>
                  <ChevronRight className="h-4 w-4 text-amber-500" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
