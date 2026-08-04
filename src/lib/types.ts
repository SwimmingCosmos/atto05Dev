/** content/ 以下の YAML・Markdown から読み込むデータの型 */

export type LinkItem = {
  label: string;
  url: string;
  note?: string;
};

export type SocialIconName = "x" | "github" | "unityroom" | "qiita" | "mail";

export type SnsLink = LinkItem & { icon: SocialIconName };

export type Profile = {
  name: string;
  nameEn: string;
  handle: string;
  handleEn: string;
  /** public/ からのパス */
  icon: string;
  from?: string;
  affiliation?: string;
  birthday?: string;
  /** 自己紹介。1要素が1段落 */
  intro: string[];
  circles: { name: string; description: string; url?: string }[];
  contactNote: string;
  sns: SnsLink[];
};

export type Site = {
  title: string;
  shortTitle: string;
  description: string;
  url: string;
};

export type WorkVideo = {
  title?: string;
  /** YouTube / Drive の URL そのまま */
  url: string;
  /** url から導出した埋め込み用 URL */
  embedUrl: string;
  /** url から導出したポスターフレーム */
  thumbnail?: string;
};

export type Work = {
  /** ファイル名から。/works/<slug>/ になる */
  slug: string;
  title: string;
  org: string;
  /** 並び順に使う YYYY-MM-DD */
  date: string;
  period?: string;
  team?: string;
  roles: string[];
  tech: string[];
  summary: string;
  badge?: string;
  /** 外部リンクのみの作品。設定すると詳細ページを作らず、カードから直接この URL へ飛ぶ */
  url?: string;
  /**
   * カードに出す画像。front matter で明示 → 動画のポスター →
   * ギャラリー1枚目 → プレースホルダー の順で決まる
   */
  thumbnail: string;
  videos: WorkVideo[];
  gallery: { src: string; caption?: string }[];
  links: LinkItem[];
  draft: boolean;
  /** Markdown 本文（未変換） */
  body: string;
};

export type Writing = {
  title: string;
  date: string;
  kinds: string[];
  url?: string;
};

export type CareerEntry = {
  date: string;
  sort: string;
  title: string;
  detail?: string;
  link?: LinkItem;
  highlight?: boolean;
};

export type SkillGroup = {
  stars: 1 | 2 | 3;
  means: string;
  items: string[];
};

export type Certification = {
  name: string;
  date: string;
};

export type Skills = {
  groups: SkillGroup[];
  certifications: Certification[];
};
