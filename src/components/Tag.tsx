import type { ReactNode } from "react";

type Variant = "default" | "role" | "accent";

const variants: Record<Variant, string> = {
  default: "border-line bg-surface-2 text-muted",
  role: "border-transparent bg-accent-weak text-accent",
  accent: "border-accent/40 bg-transparent text-accent",
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
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs leading-relaxed whitespace-nowrap ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
