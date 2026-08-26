"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <footer
      id="site-footer"
      ref={footerRef}
      role="contentinfo"
      aria-label="Site Footer and Company Information"
      itemScope
      itemType="https://schema.org/SecurityService"
      className="bg-[#05060A] border-t border-zinc-800/80 text-zinc-400 font-sans overflow-hidden"
    >
      {/* Hidden SEO Schema.org structured metadata */}
      <meta itemProp="name" content="HOWL Security Group" />
      <meta
        itemProp="description"
        content="Specialized Ving Tsun Kung Fu and tactical combatives engineered by US Army Ranger combat veterans combined with discreet executive protection and commercial threat mitigation in South Florida."
      />
      <meta itemProp="areaServed" content="Fort Pierce, Palm Beach, Port St. Lucie, Miami, South Florida" />
      <meta itemProp="telephone" content="+17729404114" />
      <meta itemProp="email" content="operations@howlsecurity.com" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 pt-12 sm:pt-16 pb-8 sm:pb-12">
        
        {/* Main 5-Column Responsive Grid */}
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 pb-12 sm:pb-16 transition-all duration-1000 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          
          {/* Column 1: Brand, Identity & Narrative (Spans 4 cols on Desktop) */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-4 space-y-4">
            {/* Brand Logo Header */}
            <div>
              <Logo size="lg" showTagline={true} />
            </div>

            {/* Narrative Description */}
            <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed max-w-sm font-sans pt-1">
              Specialized Ving Tsun Kung Fu and tactical combatives engineered by Special Operations veterans and elite combatives masters—combined with discreet executive protection and advanced threat mitigation for public figures, executives, and dedicated practitioners.
            </p>
            <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-sans">
              Absolute privacy. Elite vigilance. South Florida protection.
            </p>
          </div>

          {/* Column 2: PRACTICE */}
          <nav aria-label="Practice and Lineage Links" className="space-y-4 lg:col-span-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#E58518]">
              PRACTICE
            </h3>
            <ul role="list" className="space-y-2.5 text-xs sm:text-[13px] font-sans">
              <li>
                <Link
                  href="/training"
                  title="The Ving Tsun System Overview"
                  className="text-zinc-300 hover:text-white transition-colors block py-0.5"
                >
                  The Ving Tsun System
                </Link>
              </li>
              <li>
                <Link
                  href="/#founder"
                  title="Sifu Gerald Hazellief Biography"
                  className="text-zinc-300 hover:text-white transition-colors block py-0.5"
                >
                  Sifu Gerald Hazellief
                </Link>
              </li>
              <li>
                <Link
                  href="/#founder"
                  title="Ving Tsun Lineage & History"
                  className="text-zinc-300 hover:text-white transition-colors block py-0.5"
                >
                  Lineage & History
                </Link>
              </li>
            </ul>
          </nav>

          {/* Column 3: PROGRAMS */}
          <nav aria-label="Training Programs Links" className="space-y-4 lg:col-span-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#E58518]">
              PROGRAMS
            </h3>
            <ul role="list" className="space-y-2.5 text-xs sm:text-[13px] font-sans">
              <li>
                <Link
                  href="/training"
                  title="Private 1-on-1 Combatives Instruction"
                  className="text-zinc-300 hover:text-white transition-colors block py-0.5"
                >
                  Private Instruction
                </Link>
              </li>
              <li>
                <Link
                  href="/training"
                  title="Traditional Group Martial Arts Classes"
                  className="text-zinc-300 hover:text-white transition-colors block py-0.5"
                >
                  Traditional Group Classes
                </Link>
              </li>
              <li>
                <Link
                  href="/training"
                  title="Tactical Close Quarter Combatives"
                  className="text-zinc-300 hover:text-white transition-colors block py-0.5"
                >
                  Tactical Combatives
                </Link>
              </li>
            </ul>
          </nav>

          {/* Column 4: OPERATIONAL REGIONS */}
          <section aria-label="Operational Service Regions" className="space-y-4 lg:col-span-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#E58518]">
              OPERATIONAL REGIONS
            </h3>
            <ul role="list" className="space-y-2.5 text-xs sm:text-[13px] font-sans text-zinc-300">
              <li className="hover:text-white transition-colors cursor-default py-0.5">
                Fort Pierce
              </li>
              <li className="hover:text-white transition-colors cursor-default py-0.5">
                Palm Beach
              </li>
              <li className="hover:text-white transition-colors cursor-default py-0.5">
                Miami Detail
              </li>
              <li className="hover:text-white transition-colors cursor-default py-0.5">
                Fort Lauderdale
              </li>
            </ul>
          </section>

          {/* Column 5: COMMUNICATIONS */}
          <address className="space-y-4 lg:col-span-2 not-italic">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#E58518]">
              COMMUNICATIONS
            </h3>
            <div className="space-y-2.5 text-xs sm:text-[13px] font-sans">
              <div>
                <a
                  href="tel:+17729404114"
                  itemProp="telephone"
                  title="Direct Phone Contact for HOWL Security Group"
                  aria-label="Call HOWL Security Direct Line at (772) 940-4114"
                  className="font-bold text-white hover:text-[#E58518] transition-colors block py-0.5 focus:outline-none focus:underline"
                >
                  Direct Line: (772) 940-4114
                </a>
              </div>
              <div>
                <a
                  href="mailto:operations@howlsecurity.com"
                  itemProp="email"
                  title="Email HOWL Security Operations"
                  aria-label="Email HOWL Security Operations at operations@howlsecurity.com"
                  className="text-zinc-300 hover:text-white transition-colors block break-words py-0.5 focus:outline-none focus:underline"
                >
                  operations@howlsecurity.com
                </a>
              </div>
            </div>
          </address>

        </div>

        {/* Bottom Legal & Compliance Bar */}
        <div
          className={cn(
            "pt-6 sm:pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs font-sans text-zinc-500 text-center sm:text-left transition-all duration-700 delay-200 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <div>
            © {new Date().getFullYear()} HOWL Security Group. All rights reserved. • US Army Ranger Veteran Owned & Operated.
          </div>
          <div className="font-mono text-zinc-400">
            LIC # EP-FL-772094
          </div>
        </div>

      </div>
    </footer>
  );
}
