import type { ReactNode } from "react";

type Variant = "default" | "role" | "tech" | "accent";

const variants: Record<Variant, string> = {
  default: "border-line bg-surface-2 text-muted",
  role: "border-accent/30 bg-accent/10 text-accent",
  tech: "border-line-strong bg-transparent text-muted",
  accent: "border-accent-2/35 bg-accent-2/10 text-accent-2",
};

export function Tag({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs leading-relaxed whitespace-nowrap ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
