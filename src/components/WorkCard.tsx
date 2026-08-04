import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "@/components/SocialIcons";
import { Tag } from "@/components/Tag";
import type { Work } from "@/lib/types";

const CARD_CLASS =
  "group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-line-strong";

export function WorkCard({ work }: { work: Work }) {
  const inner = (
    <>
      <div className="relative aspect-video overflow-hidden border-b border-line bg-surface-2">
        <Image
          src={work.thumbnail}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        {work.badge && (
          <span className="absolute top-2.5 left-2.5 rounded-md border border-line bg-surface/95 px-2 py-0.5 text-xs font-medium text-accent">
            {work.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="font-mono text-xs text-faint">
          {work.org}
          {work.period && <span className="ml-2">{work.period}</span>}
        </p>

        <h3 className="leading-snug font-bold group-hover:text-accent">
          {work.title}
          {work.url && (
            <ArrowUpRight
              size={14}
              className="ml-1 inline-block text-faint group-hover:text-accent"
            />
          )}
        </h3>

        <p className="line-clamp-2 text-sm text-muted">{work.summary}</p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-1.5">
          {work.roles.map((role) => (
            <Tag key={role} variant="role">
              {role}
            </Tag>
          ))}
          {work.tech.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </div>
    </>
  );

  if (work.url) {
    return (
      <a
        href={work.url}
        target="_blank"
        rel="noopener noreferrer"
        className={CARD_CLASS}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={`/works/${work.slug}/`} className={CARD_CLASS}>
      {inner}
    </Link>
  );
}
