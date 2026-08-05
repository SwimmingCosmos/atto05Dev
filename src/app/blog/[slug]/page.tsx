import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Tag } from "@/components/Tag";
import { getAllPosts, getPost } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { EMPTY_ROUTE_PARAM } from "@/lib/routes";

export function generateStaticParams() {
  const posts = getAllPosts();
  if (posts.length === 0) return [{ slug: EMPTY_ROUTE_PARAM }];
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated,
      tags: post.tags,
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const all = getAllPosts();
  const index = all.findIndex((p) => p.slug === post.slug);
  const newer = index > 0 ? all[index - 1] : null;
  const older = index < all.length - 1 ? all[index + 1] : null;

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <Link
        href="/blog/"
        className="inline-flex items-center gap-1.5 text-sm text-faint transition-colors hover:text-accent"
      >
        <span aria-hidden>←</span> 記事一覧へ戻る
      </Link>

      <header className="mt-6 border-b border-line pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <time dateTime={post.date} className="font-mono text-xs text-faint">
            {formatDate(post.date)}
          </time>
          {post.updated && (
            <span className="font-mono text-xs text-faint">
              （更新 {formatDate(post.updated)}）
            </span>
          )}
          {post.draft && <Tag variant="accent">下書き</Tag>}
        </div>

        <h1 className="mt-3 text-3xl leading-tight font-bold sm:text-4xl">
          {post.title}
        </h1>

        {post.description && (
          <p className="mt-3 text-muted">{post.description}</p>
        )}

        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/blog/tags/${encodeURIComponent(tag)}/`}>
                <Tag>{tag}</Tag>
              </Link>
            ))}
          </div>
        )}
      </header>

      {post.cover && (
        <div className="relative mt-8 aspect-16/9 overflow-hidden rounded-xl border border-line bg-surface-2">
          <Image
            src={post.cover}
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      {/* 本文は自分で書いた Markdown を build 時に HTML 化したもの */}
      <div
        className="prose-post mt-10"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <nav className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
        {older ? (
          <Link
            href={`/blog/${older.slug}/`}
            className="group rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong"
          >
            <p className="text-xs text-faint">← 前の記事</p>
            <p className="mt-1 leading-snug font-medium transition-colors group-hover:text-accent">
              {older.title}
            </p>
          </Link>
        ) : (
          <span />
        )}
        {newer && (
          <Link
            href={`/blog/${newer.slug}/`}
            className="group rounded-xl border border-line bg-surface p-4 text-right transition-colors hover:border-line-strong"
          >
            <p className="text-xs text-faint">次の記事 →</p>
            <p className="mt-1 leading-snug font-medium transition-colors group-hover:text-accent">
              {newer.title}
            </p>
          </Link>
        )}
      </nav>
    </div>
  );
}
