export const profile = {
  name: "反町 佳暉",
  nameEn: "SORIMACHI Yoshiki",
  handle: "アト",
  handleEn: "Atto",
  /**
   * TODO(atto): Notion の表記が「2025/12/02」になっていて誤記の可能性が高いため、
   * 正しい生年月日を入れてください。null のままだと表示されません。
   * 例: birthday: "2005/12/02"
   */
  birthday: null as string | null,
  from: "東京都",
  affiliation: "会津大学 コンピュータ理工学部 学部3年（2024年4月入学）",
  role: "ゲームプログラマ / XR",
  tagline: "「やって良かった」と思えるゲームをつくる。",

  /** ヒーロー直下に置く短い自己紹介 */
  lead: [
    "Unity をメインに据え、VR・PC などデバイスを問わず、シリアスゲームからポップなものまでジャンルに縛られないゲーム制作を行っています。現在はチーム開発を主軸に活動中です。",
    "プレイする方が「楽しい！」「面白い！」「やって良かった〜！」と思ってくださるプロダクトになるよう心がけて制作しています。別途、システム開発のアルバイトにおよそ1年間従事しています。",
  ],

  circles: [
    {
      name: "Zli",
      description: "技術総合系サークル。運営メンバー。",
      /** TODO(atto): サークルの公式サイトがあれば入れてください */
      url: null as string | null,
    },
    {
      name: "A-PxL",
      description: "XR サークル。2026年度副代表、運営メンバー。",
      /** TODO(atto): 正式な公式サイト URL に差し替えてください */
      url: "https://a-pxl.notion.site/" as string | null,
    },
  ],

  /** 数字で見せる要約。トップのヒーロー下に並ぶ */
  highlights: [
    { value: "Unity", label: "メイン技術" },
    { value: "3", label: "掲載中の制作物" },
    { value: "DiGRA", label: "学会での共同発表" },
    { value: "Cygames", label: "サマーインターン参加" },
  ],
} as const;
