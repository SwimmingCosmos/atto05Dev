import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { load as loadYamlText } from "js-yaml";

import { markdownToHtml, toIsoDate } from "@/lib/markdown";
import { resolveVideo } from "@/lib/media";
import type {
  CareerEntry,
  Profile,
  Site,
  Skills,
  Work,
  Writing,
} from "@/lib/types";

const CONTENT_DIR = path.join(process.cwd(), "content");

function loadYaml<T>(fileName: string): T {
  const filePath = path.join(CONTENT_DIR, fileName);
  try {
    return loadYamlText(fs.readFileSync(filePath, "utf8")) as T;
  } catch (error) {
    throw new Error(
      `content/${fileName} が読めません。YAML の書式（インデント、コロンの後の空白）を確認してください。\n${String(error)}`,
    );
  }
}

/* ---------- サイト設定・プロフィール ---------- */

export function getSite(): Site {
  return loadYaml<Site>("site.yaml");
}

export function getProfile(): Profile {
  const raw = loadYaml<Profile>("profile.yaml");
  return {
    ...raw,
    birthday: raw.birthday ? String(raw.birthday) : undefined,
    intro: raw.intro ?? [],
    circles: raw.circles ?? [],
    sns: raw.sns ?? [],
  };
}

/* ---------- 制作物 ---------- */

const WORKS_DIR = path.join(CONTENT_DIR, "works");

/** 本番ビルドでは draft: true を隠す（ブログと同じ挙動） */
function visibleDraft(draft: boolean) {
  return process.env.NODE_ENV === "production" ? !draft : true;
}

export function getWorks(): Work[] {
  if (!fs.existsSync(WORKS_DIR)) return [];

  return fs
    .readdirSync(WORKS_DIR)
    .filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_") && !f.startsWith("."))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(WORKS_DIR, fileName), "utf8");
      const { data, content } = matter(raw);

      if (!data.title) {
        throw new Error(`content/works/${fileName}: title がありません`);
      }

      const videos = (Array.isArray(data.videos) ? data.videos : [])
        .filter((v: { url?: string }) => v?.url)
        .map((v: { title?: string; url: string }) => ({
          title: v.title,
          url: v.url,
          ...resolveVideo(v.url),
        }));

      const gallery = (Array.isArray(data.gallery) ? data.gallery : []).filter(
        (g: { src?: string }) => g?.src,
      );

      // サムネイルの優先順位：明示指定 → 動画のポスター → ギャラリー1枚目 → プレースホルダー
      const thumbnail: string =
        data.thumbnail ||
        videos.find((v) => v.thumbnail)?.thumbnail ||
        gallery[0]?.src ||
        "/works/placeholder.svg";

      return {
        slug,
        title: String(data.title),
        org: String(data.org ?? ""),
        date: data.date ? toIsoDate(data.date) : "1970-01-01",
        period: data.period ? String(data.period) : undefined,
        team: data.team ? String(data.team) : undefined,
        roles: Array.isArray(data.roles) ? data.roles.map(String) : [],
        tech: Array.isArray(data.tech) ? data.tech.map(String) : [],
        summary: String(data.summary ?? ""),
        badge: data.badge ? String(data.badge) : undefined,
        url: data.url ? String(data.url) : undefined,
        thumbnail,
        videos,
        gallery,
        links: Array.isArray(data.links)
          ? data.links.filter((l: { url?: string }) => l?.url)
          : [],
        draft: Boolean(data.draft),
        body: content,
      } satisfies Work;
    })
    .filter((w) => visibleDraft(w.draft))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getWork(slug: string): Work | undefined {
  return getWorks().find((w) => w.slug === slug);
}

export async function getWorkHtml(work: Work): Promise<string> {
  // コメントだけの本文（TODO メモ）は空扱いにする
  const stripped = work.body.replace(/<!--[\s\S]*?-->/g, "").trim();
  const meaningful = stripped.replace(/^##\s.*$/gm, "").trim();
  if (!meaningful) return "";
  return markdownToHtml(work.body);
}

/* ---------- 執筆・経歴・スキル ---------- */

export function getWritings(): Writing[] {
  const raw = loadYaml<Writing[]>("writings.yaml") ?? [];
  return raw
    .map((w) => ({
      title: String(w.title),
      date: toIsoDate(w.date),
      kinds: Array.isArray(w.kinds) ? w.kinds.map(String) : [],
      url: w.url ? String(w.url) : undefined,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getCareer(): CareerEntry[] {
  const raw = loadYaml<CareerEntry[]>("career.yaml") ?? [];
  return raw
    .map((c) => ({ ...c, sort: toIsoDate(c.sort) }))
    .sort((a, b) => b.sort.localeCompare(a.sort));
}

export function getSkills(): Skills {
  const raw = loadYaml<Skills>("skills.yaml");
  return {
    groups: raw.groups ?? [],
    certifications: raw.certifications ?? [],
  };
}
