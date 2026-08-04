import Image from "next/image";
import Link from "next/link";

import { Tag } from "@/components/Tag";
import { ArrowUpRight } from "@/components/SocialIcons";
import type { Work } from "@/content/types";

export function WorkCard({ work }: { work: Work }) {
  return (
    <Link
      href={`/works/${work.slug}/`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_0_0_1px_rgba(56,214,255,0.12),0_18px_40px_-24px_rgba(0,0,0,0.9)]"
    >
      <div className="relative aspect-16/10 overflow-hidden bg-surface-2">
        <Image
          src={work.thumbnail}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/10 to-transparent" />
        {work.badge && (
          <span className="absolute top-3 left-3 rounded-full border border-accent-2/40 bg-bg/80 px-2.5 py-1 text-[11px] text-accent-2 backdrop-blur-sm">
            {work.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-xs text-faint">
          <span className="font-mono">{work.org}</span>
          {work.period && (
            <>
              <span aria-hidden>·</span>
              <span className="truncate">{work.period}</span>
            </>
          )}
        </div>

        <h3 className="font-display text-lg leading-snug font-bold transition-colors group-hover:text-accent">
          {work.shortTitle ?? work.title}
        </h3>

        <p className="line-clamp-3 text-sm text-muted">{work.summary}</p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {work.roles.map((role) => (
            <Tag key={role} variant="role">
              {role}
            </Tag>
          ))}
          {work.tech.map((tech) => (
            <Tag key={tech} variant="tech">
              {tech}
            </Tag>
          ))}
        </div>

        <span className="mt-1 inline-flex items-center gap-1 text-sm text-faint transition-colors group-hover:text-accent">
          詳しく見る
          <ArrowUpRight />
        </span>
      </div>
    </Link>
  );
}
