/**
 * サイト全体で使うデータ型の定義。
 * 実際の中身は同じフォルダの profile.ts / works.ts などにあります。
 */

export type LinkItem = {
  label: string;
  url: string;
  /** 一覧に出すときの短い説明（任意） */
  note?: string;
};

export type Work = {
  /** URL に使う識別子。/works/<slug>/ になる */
  slug: string;
  title: string;
  /** タイトルが長い場合の短縮版。カードや一覧で使う */
  shortTitle?: string;
  /** 「日本デジタルゲーム学会にて共同発表」のような見出しバッジ */
  badge?: string;
  /** 依頼元・展示先・主催など */
  org: string;
  /** 「2025年2月初旬〜2025年4月初旬（約2ヶ月）」など */
  period?: string;
  /** 「10人体制」など */
  team?: string;
  /** 並び替え用。新しいものほど後ろの日付にする */
  sortDate: string;
  roles: string[];
  tech: string[];
  /** カードに出す1〜2行の説明 */
  summary: string;
  /** 詳細ページの「概要」。段落ごとに配列で書く */
  overview: string[];
  /** 詳細ページの「ゲーム内容」。段落ごとに配列で書く */
  gameplay: string[];
  /** カードとOGPに使うメイン画像。public/ からのパス */
  thumbnail: string;
  gallery?: { src: string; caption?: string }[];
  /** YouTube なら https://www.youtube.com/embed/<id> の形式で */
  videos?: { title: string; embedUrl: string }[];
  links?: LinkItem[];
};

export type Writing = {
  title: string;
  /** YYYY-MM-DD */
  date: string;
  /** 「執筆」「LT」「同人誌」など */
  kinds: string[];
  /** まだ手元にフルURLが無いものは null にしておくとリンクなしで表示される */
  url: string | null;
};

export type CareerEntry = {
  /** 表示用の期間・日付 */
  date: string;
  /** 並び替え用 YYYY-MM-DD */
  sortDate: string;
  title: string;
  detail?: string;
  link?: LinkItem;
  /** 目立たせたい項目に true */
  highlight?: boolean;
};

export type SkillLevel = 1 | 2 | 3;

export type SkillGroup = {
  level: SkillLevel;
  /** そのレベルが意味するところ */
  description: string;
  items: string[];
};

export type Certification = {
  name: string;
  /** YYYY/MM */
  date: string;
};
