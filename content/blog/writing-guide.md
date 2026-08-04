---
title: このブログの書き方（下書きなので本番では出ません）
date: 2026-08-03
description: "content/blog/ に置く Markdown の書式まとめ。draft: true なので npm run dev のときだけ見えます。"
tags:
  - メモ
draft: true
---

`content/blog/` に `.md` ファイルを置くと記事になります。ファイル名がそのまま URL（`/blog/<ファイル名>/`）です。

## front matter

ファイルの先頭に、`---` で挟んだ設定を書きます。

```yaml
---
title: 記事のタイトル           # 必須
date: 2026-08-04               # 必須。YYYY-MM-DD
updated: 2026-08-10            # 任意。更新日
description: 一覧に出る説明文     # 任意だが書いたほうがいい
tags: [Unity, XR]              # 任意
cover: /blog/xxx/cover.jpg     # 任意。public/ からのパス
draft: true                    # true にすると本番ビルドから除外される
---
```

`draft: true` の記事は `npm run dev` では見えますが、`npm run build` した本番には含まれません。書きかけはこの状態で置いておけます。

## 使える書式

見出しは `##` から使ってください（`#` は記事タイトルとして自動で出ます）。

**太字**、*斜体*、~~打ち消し~~、`インラインコード`、[リンク](https://example.com) が使えます。

- 箇条書き
- も
  - 入れ子にできます

1. 番号付きも
2. 使えます

> 引用はこう書きます。

| 項目 | 内容 |
| --- | --- |
| テーブル | GFM 記法で書けます |
| 横スクロール | 幅が足りないときは自動 |

- [x] チェックリストも使えます
- [ ] 未完了

## コードブロック

言語を指定するとハイライトが付きます。

```csharp
using UnityEngine;

public sealed class Spinner : MonoBehaviour
{
    [SerializeField] private float degreesPerSecond = 90f;

    private void Update()
    {
        transform.Rotate(Vector3.up, degreesPerSecond * Time.deltaTime);
    }
}
```

## 画像

`public/blog/` あたりに置いて、絶対パスで参照します。

```markdown
![代替テキスト](/blog/hello-world/screenshot.png)
```

## 動画の埋め込み

HTML をそのまま書けるので、YouTube はこう埋め込みます（`watch?v=` ではなく `embed/` の URL を使ってください）。

```html
<iframe src="https://www.youtube.com/embed/動画ID" title="タイトル" allowfullscreen></iframe>
```

幅と高さは CSS 側で 16:9 に揃えているので、指定しなくて大丈夫です。
