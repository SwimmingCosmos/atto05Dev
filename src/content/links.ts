import type { LinkItem } from "./types";

export const contactNote =
  "ご連絡の際は、各種SNSのDMにて、お気軽にお声がけください。";

export const socialLinks: (LinkItem & { icon: SocialIcon })[] = [
  {
    label: "X",
    url: "https://x.com/Aizu_AizuAizu",
    note: "日々の制作・進捗",
    icon: "x",
  },
  {
    label: "GitHub",
    url: "https://github.com/SwimmingCosmos",
    note: "ソースコード",
    icon: "github",
  },
  {
    label: "unityroom",
    url: "https://unityroom.com/users/swimmingcosmo",
    note: "個人制作にて公開したゲーム",
    icon: "unityroom",
  },
  {
    label: "Qiita",
    url: "https://qiita.com/atto_seconds",
    note: "技術記事",
    icon: "qiita",
  },
];

export type SocialIcon = "x" | "github" | "unityroom" | "qiita" | "mail";
