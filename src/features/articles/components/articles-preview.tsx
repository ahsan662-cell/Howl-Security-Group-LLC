import React from "react";
import { INTEL_ARTICLES } from "@/constants/mock-data/articles.data";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, ChevronRight, User } from "lucide-react";
import Link from "next/link";

export function ArticlesPreview() {
  return (
    <section id="intel" className="py-20 lg:py-24 bg-[#090C12] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-zinc-800/80 gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-500 block mb-2">
              // SITUATION BRIEFS & THREAT ANALYSIS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-white font-sans tracking-tight">
              TACTICAL FIELD INTELLIGENCE
            </h2>
          </div>
          <Link
            href="/intel"
            className="text-xs font-mono text-amber-400 hover:text-amber-300 uppercase tracking-wider flex items-center gap-1.5 font-bold"
          >
            <span>View All Briefings</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INTEL_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="bg-[#0C0F17] border border-zinc-800 hover:border-zinc-700 p-6 rounded-sm flex flex-col justify-between transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                  <Badge variant="amber">{article.category}</Badge>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white uppercase font-sans group-hover:text-amber-400 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">{article.publishedAt}</span>
                <Link
                  href={`/intel#${article.slug}`}
                  className="text-amber-500 hover:text-amber-400 flex items-center gap-1 font-bold uppercase tracking-wider"
                >
                  <span>Read Brief</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
