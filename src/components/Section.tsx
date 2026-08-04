import type { ReactNode } from "react";

type Props = {
  id: string;
  /** 見出し（英語） */
  title: string;
  /** 見出しの下に出る日本語 */
  subtitle: string;
  /** 左に出る通し番号。"01" など */
  index?: string;
  children: ReactNode;
};

export function Section({ id, title, subtitle, index, children }: Props) {
  return (
    <section id={id} className="scroll-mt-24 py-16 sm:py-24">
      <header className="mb-10 flex items-end gap-4 sm:mb-14">
        {index && (
          <span className="font-mono text-sm text-accent/60 tabular-nums">
            {index}
          </span>
        )}
        <div className="flex-1">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-1 text-sm text-muted">{subtitle}</p>
        </div>
        <div
          aria-hidden
          className="mb-2 hidden h-px flex-1 bg-linear-to-r from-line to-transparent sm:block"
        />
      </header>
      {children}
    </section>
  );
}
