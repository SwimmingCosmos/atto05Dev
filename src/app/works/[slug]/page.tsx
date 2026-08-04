import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowUpRight } from "@/components/SocialIcons";
import { Tag } from "@/components/Tag";
import { getWork, works, worksSorted } from "@/content/works";

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/works/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return {};

  return {
    title: work.shortTitle ?? work.title,
    description: work.summary,
    openGraph: {
      title: work.shortTitle ?? work.title,
      description: work.summary,
      images: [work.thumbnail],
    },
  };
}

export default async function WorkPage({ params }: PageProps<"/works/[slug]">) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const index = worksSorted.findIndex((w) => w.slug === work.slug);
  const next = worksSorted[(index + 1) % worksSorted.length];

  return (
    <article className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      <Link
        href="/#works"
        className="inline-flex items-center gap-1.5 text-sm text-faint transition-colors hover:text-accent"
      >
        <span aria-hidden>←</span> 制作物一覧へ戻る
      </Link>

      <header className="mt-6">
        {work.badge && (
          <p className="mb-3 inline-block rounded-full border border-accent-2/40 bg-accent-2/10 px-3 py-1 text-xs text-accent-2">
            {work.badge}
          </p>
        )}
        <h1 className="font-display text-3xl leading-tight font-bold sm:text-4xl">
          {work.shortTitle ?? work.title}
        </h1>
        {work.shortTitle && work.shortTitle !== work.title && (
          <p className="mt-3 text-sm text-muted">{work.title}</p>
        )}
      </header>

      <div className="relative mt-8 aspect-16/9 overflow-hidden rounded-2xl border border-line bg-surface-2">
        <Image
          src={work.thumbnail}
          alt=""
          fill
          priority
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover"
        />
      </div>

      <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
        <MetaRow label="依頼元・展示先">{work.org}</MetaRow>
        {work.period && <MetaRow label="期間">{work.period}</MetaRow>}
        {work.team && <MetaRow label="体制">{work.team}</MetaRow>}
        <MetaRow label="担当">
          <div className="flex flex-wrap gap-1.5">
            {work.roles.map((role) => (
              <Tag key={role} variant="role">
                {role}
              </Tag>
            ))}
          </div>
        </MetaRow>
        <MetaRow label="使用技術" wide>
          <div className="flex flex-wrap gap-1.5">
            {work.tech.map((tech) => (
              <Tag key={tech} variant="tech">
                {tech}
              </Tag>
            ))}
          </div>
        </MetaRow>
      </dl>

      {work.overview.length > 0 && (
        <Block title="概要">
          {work.overview.map((paragraph) => (
            <p key={paragraph} className="text-muted">
              {paragraph}
            </p>
          ))}
        </Block>
      )}

      {work.gameplay.length > 0 && (
        <Block title="ゲーム内容">
          {work.gameplay.map((paragraph) => (
            <p key={paragraph} className="text-muted">
              {paragraph}
            </p>
          ))}
        </Block>
      )}

      {work.overview.length === 0 && work.gameplay.length === 0 && (
        <p className="mt-12 rounded-xl border border-dashed border-line bg-surface p-8 text-center text-sm text-muted">
          詳細は準備中です。
        </p>
      )}

      {work.videos && work.videos.length > 0 && (
        <Block title="映像">
          {work.videos.map((video) => (
            <figure key={video.embedUrl}>
              <div className="aspect-video overflow-hidden rounded-xl border border-line">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
              <figcaption className="mt-2 text-xs text-faint">
                {video.title}
              </figcaption>
            </figure>
          ))}
        </Block>
      )}

      {work.gallery && work.gallery.length > 0 && (
        <Block title="ギャラリー">
          <div className="grid gap-4 sm:grid-cols-2">
            {work.gallery.map((image) => (
              <figure key={image.src}>
                <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-line bg-surface-2">
                  <Image
                    src={image.src}
                    alt={image.caption ?? ""}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                {image.caption && (
                  <figcaption className="mt-2 text-xs text-faint">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </Block>
      )}

      {work.links && work.links.length > 0 && (
        <Block title="関連リンク">
          <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
            {work.links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 p-4 text-sm transition-colors hover:bg-surface-2"
                >
                  <span className="transition-colors group-hover:text-accent">
                    {link.label}
                  </span>
                  <ArrowUpRight className="shrink-0 text-faint transition-colors group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </Block>
      )}

      {next && next.slug !== work.slug && (
        <nav className="mt-16 border-t border-line pt-6">
          <p className="text-xs text-faint">次の制作物</p>
          <Link
            href={`/works/${next.slug}/`}
            className="group mt-1 inline-flex items-center gap-2 font-display text-lg font-bold transition-colors hover:text-accent"
          >
            {next.shortTitle ?? next.title}
            <ArrowUpRight className="text-faint transition-colors group-hover:text-accent" />
          </Link>
        </nav>
      )}
    </article>
  );
}

function MetaRow({
  label,
  children,
  wide,
}: {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={`bg-surface px-4 py-3.5 ${wide ? "sm:col-span-2" : ""}`}>
      <dt className="text-xs text-faint">{label}</dt>
      <dd className="mt-1.5 text-sm">{children}</dd>
    </div>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 border-b border-line pb-2 font-display text-xl font-bold">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
