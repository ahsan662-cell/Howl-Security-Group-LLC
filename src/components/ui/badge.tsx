import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "tactical" | "amber" | "status-green" | "status-red" | "neutral" | "bracketed";
  dot?: boolean;
}

export function Badge({
  className,
  variant = "tactical",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    bracketed:
      "font-mono text-[11px] sm:text-[13px] tracking-wider uppercase text-amber-500 bg-[#0F131C]/90 border border-amber-500/30 px-3 py-1 rounded inline-flex items-center gap-2",
    tactical:
      "font-mono text-xs uppercase tracking-widest text-zinc-300 bg-[#121622] border border-zinc-700/60 px-2.5 py-0.5 rounded",
    amber:
      "font-mono text-xs uppercase tracking-wider text-amber-400 bg-amber-950/40 border border-amber-600/40 px-2.5 py-0.5 rounded",
    "status-green":
      "font-mono text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-500/30 px-2.5 py-0.5 rounded inline-flex items-center gap-1.5",
    "status-red":
      "font-mono text-xs text-red-400 bg-red-950/30 border border-red-500/30 px-2.5 py-0.5 rounded inline-flex items-center gap-1.5",
    neutral:
      "font-mono text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded",
  };

  return (
    <span className={cn(variantStyles[variant], className)} {...props}>
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0",
            variant === "status-green" && "bg-emerald-400 animate-pulse",
            variant === "status-red" && "bg-red-400 animate-pulse",
            (variant === "bracketed" || variant === "amber") && "bg-amber-500",
            (variant === "tactical" || variant === "neutral") && "bg-zinc-400"
          )}
        />
      )}
      {children}
    </span>
  );
}
