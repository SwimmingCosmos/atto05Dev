import type { CareerEntry } from "./types";

export const career: CareerEntry[] = [
  {
    date: "2025/09/23",
    sortDate: "2025-09-23",
    title:
      "日本デジタルゲーム学会（DiGRA JAPAN）2025年夏季研究発表大会 インタラクティブセッションにて共同発表",
    detail:
      "題目：大学生活への理解と交流を促す新入生向けのすごろく型デジタルゲームの開発",
    link: {
      label: "大会ページ",
      url: "https://digrajapan.org/?page_id=10532",
    },
    highlight: true,
  },
  {
    date: "2025/08/18 〜 2025/08/22",
    sortDate: "2025-08-18",
    title: "株式会社Cygames インターン エンジニアコース（サマー）参加",
    highlight: true,
  },
  {
    date: "2024/04 〜",
    sortDate: "2024-04-01",
    title: "会津大学 コンピュータ理工学部 入学",
  },
  {
    date: "〜 2024/03",
    sortDate: "2024-03-01",
    title: "東京都内 高等学校 卒業",
  },
  {
    date: "2021/04 〜",
    sortDate: "2021-04-01",
    title: "東京都内 高等学校 入学",
  },
];

export const careerSorted = [...career].sort((a, b) =>
  b.sortDate.localeCompare(a.sortDate),
);
