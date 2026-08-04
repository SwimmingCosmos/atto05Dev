import Link from "next/link";

import { SocialGlyph } from "@/components/SocialIcons";
import { getProfile } from "@/lib/content";

export function Footer() {
  const profile = getProfile();

  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-4xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-muted">
          © {profile.handleEn}（{profile.name}）
        </p>

        <div className="flex items-center gap-1">
          {profile.sns.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="me noopener noreferrer"
              aria-label={link.label}
              className="grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg"
            >
              <SocialGlyph icon={link.icon} className="h-4.5 w-4.5" />
            </a>
          ))}
          <Link
            href="/blog/"
            className="ml-1 rounded-lg px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg"
          >
            ブログ
          </Link>
        </div>
      </div>
    </footer>
  );
}
