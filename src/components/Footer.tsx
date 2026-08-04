import Link from "next/link";

import { SocialGlyph } from "@/components/SocialIcons";
import { socialLinks } from "@/content/links";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-sm font-bold">
            {profile.handleEn}
            <span className="ml-2 font-sans font-normal text-faint">
              {profile.name}
            </span>
          </p>
          <p className="mt-1 text-xs text-faint">
            © {profile.handleEn}. Built with Next.js &amp; TypeScript.
          </p>
        </div>

        <div className="flex items-center gap-1">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="me noopener noreferrer"
              aria-label={link.label}
              className="grid h-10 w-10 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-accent"
            >
              <SocialGlyph icon={link.icon} />
            </a>
          ))}
          <Link
            href="/blog/"
            className="ml-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg"
          >
            Blog
          </Link>
        </div>
      </div>
    </footer>
  );
}
