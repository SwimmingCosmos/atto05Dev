import type { Metadata } from "next";
import Link from "next/link";

import { ArrowUpRight } from "@/components/SocialIcons";
import { Tag } from "@/components/Tag";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Unity・XR・ゲーム制作まわりで学んだことや、制作の記録を書いています。",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      <header className="border-b border-line pb-8">
        <h1 className="font-display text-4xl font-bold tracking-tight">Blog</h1>
        <p className="mt-2 text-muted">
          Unity・XR・ゲーム制作まわりで学んだことや、制作の記録。
        </p>
        {tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {tags.map(({ tag, count }) => (
              <li key={tag}>
                <Link href={`/blog/tags/${encodeURIComponent(tag)}/`}>
                  <Tag>
                    {tag}
                    <span className="ml-1.5 text-faint">{count}</span>
                  </Tag>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </header>

      {posts.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-line bg-surface p-10 text-center text-sm text-muted">
          まだ記事がありません。
          <code className="mx-1 rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs">
            content/blog/
          </code>
          に Markdown ファイルを追加してください。
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-line">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}/`}
                className="group flex gap-5 py-7"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <time
                      dateTime={post.date}
                      className="font-mono text-xs text-faint"
                    >
                      {formatDate(post.date)}
                    </time>
                    <span className="font-mono text-xs text-faint">
                      約{post.readingMinutes}分
                    </span>
                    {post.draft && <Tag variant="accent">下書き</Tag>}
                  </div>
                  <h2 className="mt-1.5 font-display text-xl leading-snug font-bold transition-colors group-hover:text-accent">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="mt-2 text-sm text-muted">
                      {post.description}
                    </p>
                  )}
                  {post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  )}
                </div>
                <ArrowUpRight className="mt-1 shrink-0 text-faint transition-colors group-hover:text-accent" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
