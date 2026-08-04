import type { Work } from "./types";

/**
 * 制作物。配列の並びはそのまま表示順ではなく、sortDate の降順で並びます。
 *
 * 画像は public/works/ に置いて "/works/xxx.svg" のように指定します。
 * いまはプレースホルダー画像が入っているので、スクリーンショットに差し替えてください。
 */
export const works: Work[] = [
  {
    slug: "shinadaman",
    title: "『しなだマンの中テレ占拠！』中テレテクノロジーラボ supported by 福島コンピューターシステム株式会社",
    shortTitle: "しなだマンの中テレ占拠！",
    org: "福島中央テレビ",
    period: "2025年10月〜2025年12月（約2ヶ月）",
    sortDate: "2025-12-01",
    roles: ["UIデザイン", "プログラマ"],
    tech: ["Unity", "アニメーション（DOTween）", "電子工作"],
    summary:
      "福島中央テレビ主催「中テレ祭り2025」で展示した、サークル A-PxL 開発の体験型ゲーム。",
    overview: [
      "A-PxL（所属するサークル）にて開発した、福島中央テレビが主催するイベント「中テレ祭り2025」での展示作品です。",
    ],
    gameplay: [
      // TODO(atto): Notion のカード内にある「ゲーム内容」の本文をここに貼ってください。
    ],
    thumbnail: "/works/shinadaman.svg",
    gallery: [
      // TODO(atto): 展示風景やプレイ画面のスクリーンショットを追加してください。
      // { src: "/works/shinadaman-01.jpg", caption: "展示ブースの様子" },
    ],
    videos: [
      // TODO(atto): プレイ映像があれば YouTube の embed URL を入れてください。
      // { title: "プレイ映像", embedUrl: "https://www.youtube.com/embed/XXXXXXXXXXX" },
    ],
    links: [
      // TODO(atto): 中テレ祭り / 中テレテクノロジーラボ の公式ページ URL があれば追加してください。
    ],
  },
  {
    slug: "digra-sugoroku",
    title: "大学生活への理解と交流を促す新入生向けのすごろく型デジタルゲームの開発",
    badge: "日本デジタルゲーム学会にて共同発表",
    org: "会津大学",
    period: "2025年2月初旬〜2025年4月初旬（約2ヶ月）",
    team: "10人体制",
    sortDate: "2025-04-01",
    roles: ["プログラマ", "UIデザイン"],
    tech: ["Unity", "アニメーション（DOTween）", "電子工作"],
    summary:
      "新入生オリエンテーション向けに10人体制で制作したすごろく型ゲーム。DiGRA JAPAN 2025年夏季研究発表大会で共同発表。",
    overview: [
      "会津大学では例年、新入生を対象としたオリエンテーションを開催しています。",
      "例年、その枠組みにおいて、新入生同士の交流を促すためのイベントや企画が立案されており、今回はその一環として、新入生向けのゲームを10人体制で制作しました。",
    ],
    gameplay: [
      // TODO(atto): Notion のカード内にある「ゲーム内容」の本文をここに貼ってください。
    ],
    thumbnail: "/works/digra-sugoroku.svg",
    gallery: [],
    videos: [],
    links: [
      {
        label: "日本デジタルゲーム学会 2025年夏季研究発表大会",
        url: "https://digrajapan.org/?page_id=10532",
      },
    ],
  },
  {
    slug: "haniwa-dance",
    title: "ハニワダンスゲーム",
    org: "福島県立博物館",
    // TODO(atto): 開発期間が分かれば入れてください。
    period: undefined,
    sortDate: "2025-01-01",
    roles: ["ディレクター", "プログラマ", "サウンド"],
    tech: ["Unity", "電子工作"],
    summary:
      "福島県立博物館向けに制作したダンスゲーム。ディレクション・実装・サウンドを担当。AR 版もあり。",
    overview: [
      // TODO(atto): Notion のカード内にある「概要」の本文をここに貼ってください。
    ],
    gameplay: [
      // TODO(atto): Notion のカード内にある「ゲーム内容」の本文をここに貼ってください。
    ],
    thumbnail: "/works/haniwa-dance.svg",
    gallery: [],
    videos: [
      // TODO(atto): Notion にあった「AR版プレイ映像」の URL を入れてください。
      // { title: "AR版プレイ映像", embedUrl: "https://www.youtube.com/embed/XXXXXXXXXXX" },
    ],
    links: [],
  },
];

export const worksSorted = [...works].sort((a, b) =>
  b.sortDate.localeCompare(a.sortDate),
);

export function getWork(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}
