import type { ReactNode } from "react";

type Props = {
  id: string;
  /** 日本語の見出し */
  title: string;
  /** 見出しの上に小さく出す英語ラベル */
  en: string;
  children: ReactNode;
};

export function Section({ id, title, en, children }: Props) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line py-12 sm:py-16">
      <header className="mb-8">
        <p className="font-mono text-xs tracking-widest text-faint uppercase">
          {en}
        </p>
        <h2 className="mt-1 text-2xl font-bold">{title}</h2>
      </header>
      {children}
    </section>
  );
}
