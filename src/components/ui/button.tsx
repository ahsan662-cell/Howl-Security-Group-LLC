import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "tactical-outline" | "secondary" | "danger" | "ghost" | "amber-pill";
  size?: "sm" | "md" | "lg" | "xl";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "left",
      isLoading,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090C] disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer";

    const variantStyles = {
      primary:
        "bg-[#D97706] hover:bg-[#E58518] text-white font-bold tracking-wide shadow-md hover:shadow-amber-600/20 active:translate-y-[1px] border border-amber-500/40",
      "tactical-outline":
        "bg-[#11141D]/90 hover:bg-[#181D2A] text-zinc-100 font-mono border border-zinc-700/80 hover:border-zinc-500 shadow-sm active:translate-y-[1px]",
      "amber-pill":
        "bg-[#D97706] hover:bg-[#E58518] text-white font-bold tracking-wide rounded-md shadow-sm border border-amber-400/30",
      secondary:
        "bg-[#1A202C] hover:bg-[#242C3D] text-zinc-200 border border-zinc-700 hover:border-zinc-600",
      danger:
        "bg-red-600 hover:bg-red-700 text-white font-bold shadow-sm border border-red-500/40",
      ghost:
        "bg-transparent hover:bg-zinc-800/60 text-zinc-300 hover:text-white border border-transparent",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 rounded gap-1.5",
      md: "text-sm px-4 py-2.5 rounded gap-2",
      lg: "text-base px-6 py-3 rounded-md gap-2.5 font-semibold",
      xl: "text-base px-8 py-3.5 rounded-md gap-3 font-bold tracking-wider",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
        ) : (
          icon && iconPosition === "left" && <span className="inline-flex shrink-0">{icon}</span>
        )}
        {children}
        {!isLoading && icon && iconPosition === "right" && (
          <span className="inline-flex shrink-0">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
