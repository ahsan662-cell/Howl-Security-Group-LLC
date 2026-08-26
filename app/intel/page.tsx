"use client";

import React, { useState } from "react";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";
import { DispatchModal } from "@/features/dispatch/components/dispatch-modal";
import { INTEL_ARTICLES } from "@/constants/mock-data/articles.data";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, User, CheckCircle2 } from "lucide-react";

export default function IntelPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#07090E] text-zinc-100">
      <Header onRequestCoverage={() => setModalOpen(true)} />

      <main className="flex-grow">
        {/* Page Hero Header */}
        <section className="py-16 sm:py-24 bg-[#090C12] border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Badge variant="bracketed" dot={true}>
              TACTICAL BRIEFINGS & THREAT ASSESSMENTS
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black uppercase text-white font-sans tracking-tight mt-4">
              SITUATION REPORTS & FIELD INTEL
            </h1>
            <p className="mt-4 text-sm sm:text-lg text-zinc-300 max-w-3xl font-sans">
              Operational analysis, close-quarters combatives doctrine, and real-world threat assessments from Howl Security Group commanders.
            </p>
          </div>
        </section>

        {/* Full Articles Section */}
        <section className="py-20 bg-[#07090E] border-b border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {INTEL_ARTICLES.map((article, idx) => (
              <article
                key={article.id}
                id={article.slug}
                className="p-8 bg-[#0C1018] border border-zinc-800 rounded-sm scroll-mt-28 space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-4 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Badge variant="amber">{article.category}</Badge>
                    <span className="text-zinc-500">REF: BRIEF-0{idx + 1}</span>
                  </div>
                  <div className="flex items-center gap-4 text-zinc-400">
                    <span>{article.publishedAt}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold uppercase text-white font-sans leading-tight">
                  {article.title}
                </h2>

                <div className="flex items-center gap-3 text-xs font-mono text-amber-500 bg-[#07090E] p-3 border border-zinc-800 rounded">
                  <User className="h-4 w-4" />
                  <span>AUTHOR: {article.author.name} // {article.author.role}</span>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
                  {article.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>

                {/* Key Tactical Takeaways */}
                <div className="p-5 bg-[#090C12] border-l-4 border-l-amber-500 border-y border-r border-zinc-800 rounded-sm space-y-3">
                  <span className="font-mono text-xs font-bold uppercase text-amber-400 block">
                    // KEY OPERATIONAL TAKEAWAYS:
                  </span>
                  <div className="space-y-2">
                    {article.keyTakeaways.map((takeaway, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                        <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <DispatchModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
