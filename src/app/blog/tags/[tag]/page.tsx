import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowUpRight } from "@/components/SocialIcons";
import { Tag } from "@/components/Tag";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/tags/[tag]">): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `${decoded} の記事`,
    description: `「${decoded}」タグが付いた記事の一覧。`,
  };
}

export default async function TagPage({ params }: PageProps<"/blog/tags/[tag]">) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getAllPosts().filter((post) => post.tags.includes(decoded));
  if (posts.length === 0) notFound();

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      <Link
        href="/blog/"
        className="inline-flex items-center gap-1.5 text-sm text-faint transition-colors hover:text-accent"
      >
        <span aria-hidden>←</span> 記事一覧へ戻る
      </Link>

      <header className="mt-6 border-b border-line pb-8">
        <p className="text-xs text-faint">タグ</p>
        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
          {decoded}
          <span className="ml-3 font-mono text-base font-normal text-faint">
            {posts.length}件
          </span>
        </h1>
      </header>

      <ul className="mt-4 divide-y divide-line">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}/`} className="group flex gap-5 py-6">
              <div className="flex-1">
                <time
                  dateTime={post.date}
                  className="font-mono text-xs text-faint"
                >
                  {formatDate(post.date)}
                </time>
                <h2 className="mt-1.5 font-display text-lg leading-snug font-bold transition-colors group-hover:text-accent">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="mt-1.5 text-sm text-muted">
                    {post.description}
                  </p>
                )}
                {post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                )}
              </div>
              <ArrowUpRight className="mt-1 shrink-0 text-faint transition-colors group-hover:text-accent" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
