export const site = {
  title: "Atto's Portfolio",
  /** ブラウザのタブなどに出る「| のうしろ」 */
  shortTitle: "Atto",
  description:
    "会津大学の学生ゲーム開発者・アト（反町佳暉）のポートフォリオ。Unity を中心に、VR・PC 問わずジャンルに縛られないゲーム制作をしています。",
  /**
   * TODO(atto): 公開先が決まったら実際のドメインに変えてください。
   * OGP 画像や sitemap の絶対 URL に使われます。
   */
  url: "https://example.com",
  locale: "ja_JP",
  /** ヘッダーのナビゲーション */
  nav: [
    { label: "About", href: "/#about" },
    { label: "Works", href: "/#works" },
    { label: "Writing", href: "/#writing" },
    { label: "Career", href: "/#career" },
    { label: "Skills", href: "/#skills" },
    { label: "Blog", href: "/blog/" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;
