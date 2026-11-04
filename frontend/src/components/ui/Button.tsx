import React from "react";

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
}) {
  const styles = {
    primary:
      "bg-gradient-to-r from-brand-blue to-brand-accent hover:brightness-110 text-white shadow-glow",
    secondary: "border border-white/15 bg-white/5 hover:bg-white/10 text-white",
    danger: "border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-300",
  }[variant];

  return (
    <button
      className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

