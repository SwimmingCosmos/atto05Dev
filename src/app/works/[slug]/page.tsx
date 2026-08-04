import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowUpRight } from "@/components/SocialIcons";
import { Tag } from "@/components/Tag";
import { getWork, getWorkHtml, getWorks } from "@/lib/content";
import { EMPTY_ROUTE_PARAM } from "@/lib/routes";

const PLACEHOLDER = "/works/placeholder.svg";

export function generateStaticParams() {
  const works = getWorks();
  if (works.length === 0) return [{ slug: EMPTY_ROUTE_PARAM }];
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/works/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return {};

  return {
    title: work.title,
    description: work.summary,
    openGraph: {
      title: work.title,
      description: work.summary,
      images: work.thumbnail !== PLACEHOLDER ? [work.thumbnail] : undefined,
    },
  };
}

export default async function WorkPage({ params }: PageProps<"/works/[slug]">) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const html = await getWorkHtml(work);
  const works = getWorks();
  const index = works.findIndex((w) => w.slug === work.slug);
  const next = works.length > 1 ? works[(index + 1) % works.length] : null;

  // 動画があるページは埋め込みが主役なので、上部の大きな画像は出さない
  const showHeroImage = work.videos.length === 0 && work.thumbnail !== PLACEHOLDER;

  return (
    <article className="mx-auto max-w-3xl px-5 py-10 sm:px-6 sm:py-14">
      <Link
        href="/#works"
        className="inline-flex items-center gap-1.5 text-sm text-faint transition-colors hover:text-accent"
      >
        <span aria-hidden>←</span> 制作物一覧へ戻る
      </Link>

      <header className="mt-5">
        {work.badge && (
          <p className="mb-2">
            <Tag variant="accent">{work.badge}</Tag>
          </p>
        )}
        <h1 className="text-2xl leading-snug font-bold sm:text-3xl">
          {work.title}
        </h1>
        <p className="mt-2 font-mono text-sm text-faint">{work.org}</p>
      </header>

      {showHeroImage && (
        <div className="relative mt-6 aspect-video overflow-hidden rounded-xl border border-line bg-surface-2">
          <Image
            src={work.thumbnail}
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      <dl className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
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
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </MetaRow>
      </dl>

      {work.videos.length > 0 && (
        <div className="mt-8 space-y-5">
          {work.videos.map((video) => (
            <figure key={video.embedUrl}>
              <div className="aspect-video overflow-hidden rounded-xl border border-line bg-surface-2">
                <iframe
                  src={video.embedUrl}
                  title={video.title ?? work.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
              {video.title && (
                <figcaption className="mt-1.5 text-xs text-faint">
                  {video.title}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      {html ? (
        <div
          className="prose-post mt-8"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <p className="mt-8 rounded-xl border border-dashed border-line bg-surface p-6 text-center text-sm text-muted">
          詳細は準備中です。
        </p>
      )}

      {work.gallery.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 font-bold">ギャラリー</h2>
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
                  <figcaption className="mt-1.5 text-xs text-faint">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {work.links.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 font-bold">関連リンク</h2>
          <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
            {work.links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 p-3.5 text-sm transition-colors hover:bg-surface-2"
                >
                  <span className="group-hover:text-accent">{link.label}</span>
                  <ArrowUpRight className="shrink-0 text-faint group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {next && (
        <nav className="mt-14 border-t border-line pt-5">
          <p className="text-xs text-faint">次の制作物</p>
          <Link
            href={`/works/${next.slug}/`}
            className="group mt-1 inline-flex items-center gap-2 font-bold hover:text-accent"
          >
            {next.title}
            <ArrowUpRight className="text-faint group-hover:text-accent" />
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
    <div className={`bg-surface px-4 py-3 ${wide ? "sm:col-span-2" : ""}`}>
      <dt className="text-xs text-faint">{label}</dt>
      <dd className="mt-1 text-sm">{children}</dd>
    </div>
  );
}
