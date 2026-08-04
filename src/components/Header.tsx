"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { site } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // メニューを開いている間は背面をスクロールさせない
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-baseline gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-lg font-bold tracking-tight">
            Atto
          </span>
          <span className="font-mono text-[11px] text-faint transition-colors group-hover:text-accent">
            /portfolio
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 grid h-10 w-10 place-items-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-fg md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
                open ? "top-2 rotate-45" : "top-0.5"
              }`}
            />
            <span
              className={`absolute top-2 left-0 block h-px w-full bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
                open ? "top-2 -rotate-45" : "top-3.5"
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-bg px-5 pb-6 md:hidden">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line/60 py-3.5 text-base text-muted transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
