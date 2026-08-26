import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "tactical" | "elevated" | "accent";
}

export function Card({ className, variant = "default", children, ...props }: CardProps) {
  const variantStyles = {
    default: "bg-[#11141D] border border-zinc-800 text-zinc-100 rounded-sm",
    tactical:
      "bg-[#0E1119] border border-zinc-800/90 hover:border-zinc-700 text-zinc-100 rounded-sm relative overflow-hidden",
    elevated:
      "bg-[#151A26] border border-zinc-700/80 shadow-lg shadow-black/40 text-zinc-100 rounded-sm",
    accent:
      "bg-[#11141D] border-l-4 border-l-amber-500 border-y border-r border-zinc-800 text-zinc-100 rounded-sm",
  };

  return (
    <div className={cn("p-6 transition-colors", variantStyles[variant], className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col space-y-1.5 pb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg font-bold tracking-tight text-white uppercase font-sans", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-zinc-400 font-sans leading-relaxed", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("pt-0", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center pt-4 border-t border-zinc-800/80", className)} {...props}>
      {children}
    </div>
  );
}
