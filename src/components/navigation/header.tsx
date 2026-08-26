"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { COMPANY_INFO } from "@/constants/company";
import { MAIN_NAV_ITEMS } from "@/constants/navigation";
import { Phone, Menu, X, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onRequestCoverage?: () => void;
}

export function Header({ onRequestCoverage }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080A0F]/95 backdrop-blur-md border-b border-zinc-800/80">
      {/* Main Navigation Bar */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 h-16 sm:h-22 flex items-center justify-between gap-8">
        {/* Brand Logo */}
        <div className="shrink-0">
          <Logo size="md" showTagline={true} />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-10">
          {MAIN_NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href)) ||
              (item.href === "/services" && pathname.startsWith("/services"));

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative py-2 text-[12px] lg:text-[13px] font-bold uppercase tracking-wider transition-colors font-sans select-none whitespace-nowrap",
                  isActive
                    ? "text-amber-500 font-extrabold"
                    : "text-zinc-300 hover:text-white"
                )}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action: Amber Status Dot + Direct Call Button */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_#f59e0b]"
              title="Tactical Status: Operational"
            />
          </div>

          <a
            href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
            className="inline-flex items-center justify-center gap-2 bg-[#D97706] hover:bg-[#E58518] text-white text-xs sm:text-[13px] font-bold tracking-wide px-4 py-2.5 rounded shadow-sm border border-amber-400/40 transition-all active:translate-y-[1px] whitespace-nowrap"
          >
            <Phone className="h-3.5 w-3.5 fill-white" />
            <span>{COMPANY_INFO.contact.phoneFormatted}</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
            className="p-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white transition-colors"
            aria-label="Call emergency dispatch"
          >
            <Phone className="h-4 w-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-300 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <span
                className={cn(
                  "absolute h-0.5 w-5 bg-zinc-300 transition-all duration-300",
                  mobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
                )}
              />
              <span
                className={cn(
                  "absolute h-0.5 w-5 bg-zinc-300 transition-all duration-300",
                  mobileMenuOpen ? "opacity-0 scale-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "absolute h-0.5 w-5 bg-zinc-300 transition-all duration-300",
                  mobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Animated Mobile Drawer Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-[#090C12] border-b border-zinc-800/90",
          mobileMenuOpen ? "max-h-[500px] opacity-100 py-4 px-5" : "max-h-0 opacity-0 py-0 px-5 pointer-events-none"
        )}
      >
        {/* Telemetry Status Bar */}
        <div
          className={cn(
            "p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs font-mono text-emerald-400 flex items-center gap-2 transition-all duration-500 transform",
            mobileMenuOpen ? "translate-y-0 opacity-100 delay-100" : "-translate-y-3 opacity-0"
          )}
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
          <span>24/7 TACTICAL DISPATCH ACTIVE</span>
        </div>

        {/* Staggered Navigation Items */}
        <div className="grid grid-cols-1 gap-1.5 my-3.5">
          {MAIN_NAV_ITEMS.map((item, idx) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href)) ||
              (item.href === "/services" && pathname.startsWith("/services"));

            const delayClasses = [
              "delay-150",
              "delay-200",
              "delay-250",
              "delay-300",
              "delay-350",
              "delay-400",
            ][idx % 6];

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-3.5 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 transform flex items-center justify-between",
                  isActive
                    ? "bg-[#141824] text-amber-400 border-l-2 border-amber-500"
                    : "text-zinc-300 hover:bg-[#121622] hover:text-white",
                  mobileMenuOpen
                    ? cn("translate-x-0 opacity-100", delayClasses)
                    : "-translate-x-4 opacity-0"
                )}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div
          className={cn(
            "pt-3 border-t border-zinc-800/80 space-y-2.5 transition-all duration-500 transform",
            mobileMenuOpen ? "translate-y-0 opacity-100 delay-300" : "translate-y-3 opacity-0"
          )}
        >
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onRequestCoverage?.();
            }}
            className="w-full py-3 bg-[#111622] hover:bg-[#182030] text-[#E58518] hover:text-amber-300 border border-amber-500/30 rounded-lg font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 font-bold transition-colors cursor-pointer"
          >
            <ShieldAlert className="h-4 w-4" />
            <span>Request Coverage Dispatch</span>
          </button>
          <a
            href={`tel:${COMPANY_INFO.contact.phoneRaw}`}
            className="w-full py-3 bg-[#D97706] hover:bg-[#E58518] text-white rounded-lg font-bold text-sm tracking-wider flex items-center justify-center gap-2 transition-colors active:translate-y-[1px]"
          >
            <Phone className="h-4 w-4 fill-white" />
            <span>Direct Line: {COMPANY_INFO.contact.phoneFormatted}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
