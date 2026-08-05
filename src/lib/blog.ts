import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { markdownToHtml, toIsoDate } from "@/lib/markdown";

/** 記事の置き場所。リポジトリ直下の content/blog/*.md */
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  /** 更新日（任意） */
  updated?: string;
  description: string;
  tags: string[];
  /** 一覧・OGP に使うカバー画像（任意）。public/ からのパス */
  cover?: string;
  /** true にすると本番ビルドから除外される（開発中は表示される） */
  draft: boolean;
};

export type Post = PostMeta & {
  /** Markdown から生成した本文 HTML */
  html: string;
};

function isMarkdown(fileName: string) {
  return /\.mdx?$/.test(fileName) && !fileName.startsWith(".");
}

function slugOf(fileName: string) {
  return fileName.replace(/\.mdx?$/, "");
}

function readFileMeta(fileName: string): { meta: PostMeta; body: string } {
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  const slug = slugOf(fileName);

  if (!data.title) {
    throw new Error(`content/blog/${fileName}: front matter に title がありません`);
  }
  if (!data.date) {
    throw new Error(`content/blog/${fileName}: front matter に date がありません`);
  }

  return {
    meta: {
      slug,
      title: String(data.title),
      date: toIsoDate(data.date),
      updated: data.updated ? toIsoDate(data.updated) : undefined,
      description: String(data.description ?? ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      cover: data.cover ? String(data.cover) : undefined,
      draft: Boolean(data.draft),
    },
    body: content,
  };
}

function listFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter(isMarkdown);
}

/** 本番ビルドでは draft: true の記事を隠す */
function visible(meta: PostMeta) {
  return process.env.NODE_ENV === "production" ? !meta.draft : true;
}

/** 新しい順の記事一覧（本文なし） */
export function getAllPosts(): PostMeta[] {
  return listFiles()
    .map((f) => readFileMeta(f).meta)
    .filter(visible)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export async function getPost(slug: string): Promise<Post | null> {
  const fileName = listFiles().find((f) => slugOf(f) === slug);
  if (!fileName) return null;

  const { meta, body } = readFileMeta(fileName);
  if (!visible(meta)) return null;

  return { ...meta, html: await markdownToHtml(body) };
}

/** タグと件数の一覧（多い順） */
export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
