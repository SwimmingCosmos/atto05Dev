import type { Writing } from "./types";

/**
 * 執筆・スライド発表。
 * url が null のものは Notion 上で短縮表示されていてフル URL が取得できなかったものです。
 * 元のリンクを開いてアドレスバーの URL を貼ってください。
 */
export const writings: Writing[] = [
  {
    title: "【作成】2026_A-PxL初心者向けプログラミング・Unity勉強会資料",
    date: "2026-04-27",
    kinds: ["執筆", "勉強会"],
    // TODO(atto): a-pxl.notion.site/...da09f7 のフル URL
    url: null,
  },
  {
    title: "Unity6 Render Graph を使って軽量化してみる（LT）",
    date: "2025-10-18",
    kinds: ["執筆", "スライド", "LT"],
    // TODO(atto): docs.google.com/presentation/... のフル URL
    url: null,
  },
  {
    title: "【作成】2025_A-PxL初心者向けGit勉強会資料",
    date: "2025-06-13",
    kinds: ["執筆", "勉強会"],
    // TODO(atto): a-pxl.notion.site/...eee673 のフル URL
    url: null,
  },
  {
    title: "Zli Techbook Vol.7（同人誌）",
    date: "2025-05-31",
    kinds: ["寄稿", "同人誌"],
    // TODO(atto): techbookfest.org/product/...AYmSuC のフル URL
    url: null,
  },
  {
    title:
      "MetaQuest3(3S) の新機能? Passthrough Camera API のご紹介＆触ってみた（LT）",
    date: "2025-05-10",
    kinds: ["LT", "執筆"],
    // TODO(atto): docs.google.com/presentation/... のフル URL
    url: null,
  },
];

export const writingsSorted = [...writings].sort((a, b) =>
  b.date.localeCompare(a.date),
);
