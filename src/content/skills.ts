import type { Certification, SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    level: 3,
    description: "設計・ライブラリ開発および、技術指導が可能",
    items: ["Unity（3D）", "C#"],
  },
  {
    level: 2,
    description: "ドキュメントを見ずにひと通りの実装が可能",
    items: [
      "Unity（xR）",
      "Java",
      "HTML / CSS",
      "UIデザイン",
      "C・C++",
      "VBA（Excel）",
    ],
  },
  {
    level: 1,
    description: "調べながらであれば実装・修正が可能",
    items: ["Shader（HLSL）", "JavaScript", "Go", "Figma", "HSP（マイコン用）"],
  },
];

export const certifications: Certification[] = [
  { name: "基本情報技術者（FE）", date: "2022/05" },
  { name: "Microsoft Office Specialist Word 2019 Expert", date: "2024/02" },
  { name: "Microsoft Office Specialist Excel 2019 Expert", date: "2024/02" },
  {
    name: "Microsoft Office Specialist PowerPoint 2019 Associate",
    date: "2024/02",
  },
];
