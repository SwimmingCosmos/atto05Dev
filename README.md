# Atto's Portfolio

アト（反町 佳暉）のポートフォリオサイトです。Next.js（App Router）+ TypeScript + Tailwind CSS 製で、ブログも付いています。
静的サイトとして書き出すので、Vercel / Netlify / Cloudflare Pages / GitHub Pages のどこにでも置けます。

設計と実装には [Claude Code](https://claude.com/claude-code) を使っています。

## 動かす

```bash
npm install
npm run dev
```

http://localhost:3000 を開いてください。

本番用のビルド：

```bash
npm run build
```

`out/` に静的ファイル一式が出ます。そのまま配信できます。

## 中身の編集

表示される中身はすべて `content/` にあります。コードを触る必要はありません。

| 編集する場所 | 何が変わるか | 形式 |
| --- | --- | --- |
| `content/profile.yaml` | 名前、アイコン、自己紹介、サークル、SNS | YAML |
| `content/works/*.md` | 制作物（1ファイル = 1作品） | Markdown |
| `content/writings.yaml` | 執筆・スライド発表 | YAML |
| `content/career.yaml` | 経歴 | YAML |
| `content/skills.yaml` | スキルと資格 | YAML |
| `content/blog/*.md` | ブログ記事（1ファイル = 1記事） | Markdown |
| `content/site.yaml` | サイト名、説明、公開 URL | YAML |

各 YAML の先頭に記入例をコメントで書いてあります。1項目コピーして書き換えれば増やせます。

まだ埋まっていない箇所は `TODO` で検索すると全部出ます：

```bash
grep -rn "TODO" content/
```

### 制作物を足す

`content/works/_template.md` をコピーして `作品名.md` で保存し、front matter を埋めるだけです。ファイル名がそのまま URL になります（`haniwa-dance.md` → `/works/haniwa-dance/`）。本文は Markdown で自由に書けます。

`draft: true` の間は `npm run dev` でだけ見えます。公開するときに `false` にしてください。

詳細ページを作るほどの情報がないものは、front matter に `url:` を書くと、カードから直接そのページへ飛ぶ外部リンクとして載せられます。unityroom で公開済みのゲームなどに便利です。

### サムネイルは動画から自動で作られる

`videos:` に YouTube か Google Drive の URL をそのまま貼ると、

- 一覧カードのサムネイル（動画のポスターフレーム）
- 詳細ページの埋め込みプレイヤー

の両方が自動で用意されます。`thumbnail:` を自分で書くのは、別の画像を使いたいときだけです。

```yaml
videos:
  - title: プレイ映像
    url: https://www.youtube.com/watch?v=XXXXXXXXXXX
```

注意点：

- Google Drive の動画は「リンクを知っている全員」に共有しておいてください
- ポスターフレームは YouTube / Drive 側が決めた代表画像です。1コマ目を厳密に使いたい場合は、その画像を切り出して `public/works/` に置き、`thumbnail:` で指定してください
- 自前の画像は横長（16:9、1280px 以上）がきれいに出ます

### ブログ記事を足す

`content/blog/` に `.md` ファイルを置くだけで追加できます。書式の一覧は `content/blog/writing-guide.md`（下書き記事なので dev でだけ見えます）にあります。

```markdown
---
title: 記事のタイトル
date: 2026-08-04
description: 一覧に出る説明文
tags: [Unity, XR]
draft: false
---

本文をここに。
```

公開記事が0件でもビルドは通ります。

## 公開する（Cloudflare）

このリポジトリは静的サイトとして書き出すので、アダプタ（opennextjs-cloudflare や next-on-pages）は使いません。

Cloudflare の Git 連携（Workers）でデプロイする場合、ダッシュボードの設定は次のとおりです。

| 設定 | 値 |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |

成果物の場所は `wrangler.toml` の `[assets] directory = "./out"` から読まれるため、ダッシュボード側での指定は不要です。

補足です。

- `npx opennextjs-cloudflare build` が失敗する場合は、Build command が上記になっているか確認してください。Next.js プリセットのままだとアダプタが走ってしまいます
- 旧来の Cloudflare Pages プロジェクトとして接続している場合は、`wrangler.toml` の `[assets]` ブロックを削除して `pages_build_output_dir = "out"` に置き換え、ダッシュボードの Build output directory に `out` を指定してください

ほかのホスティング（Vercel / Netlify / GitHub Pages）でも `out/` を配信すれば動きます。GitHub Pages でサブパス（`https://<ユーザー名>.github.io/<リポジトリ名>/`）に置く場合だけ、`next.config.ts` に `basePath: "/<リポジトリ名>"` を足してください。

公開する URL を変えるときは、`content/site.yaml` の `url` も合わせて変えてください。OGP と `sitemap.xml` に使われます。

### 独自ドメイン（atto05.dev）で公開する

デプロイ直後の URL は `https://<プロジェクト名>.<アカウント名>.workers.dev` になっています。独自ドメインに切り替える手順は次のとおりです。

1. Cloudflare ダッシュボードで atto05.dev をアカウントに追加してください（未取得の場合は Domain Registration から取得できます）
2. `wrangler.toml` の `routes` のコメントを外して push してください。次のデプロイでカスタムドメインが自動設定されます。ダッシュボードから設定する場合は、Workers のプロジェクト → Settings → Domains & Routes → Add → Custom Domain でも同じことができます
3. 表示を確認できたら、`wrangler.toml` の `workers_dev = false` のコメントも外すと、workers.dev 側の URL を閉じられます

### メール（@atto05.dev）で連絡を受け取る

Cloudflare の Email Routing を使うと、独自ドメイン宛のメールを普段使っているアドレスに転送できます。サーバーは不要で、無料で使えます。

1. ダッシュボードで atto05.dev のゾーンを開き、Email → Email Routing を有効化してください（必要な MX / TXT レコードは自動で追加されます）
2. Destination addresses に転送先のアドレスを追加し、届いた確認メールを承認してください
3. Custom addresses で `contact@atto05.dev` のような受信用アドレスを作り、転送先に紐付けてください
4. `content/profile.yaml` の Mail の項目のコメントを外すと、サイトの連絡先にメールが並びます

Email Routing は受信専用です。`contact@atto05.dev` を差出人にして送信もしたい場合は、Gmail の「他のメールアドレスからメールを送信」に SMTP 設定を追加する方法が手軽です。

## 構成

```
content/          ★ 編集するのはここ
  site.yaml         サイト設定
  profile.yaml      プロフィール
  works/            制作物（_template.md をコピーして追加）
  writings.yaml     執筆・発表
  career.yaml       経歴
  skills.yaml       スキル・資格
  blog/             ブログ記事
public/
  profile/          アイコン画像
  works/            制作物の画像
src/
  app/              ページ（App Router）
  components/       UI パーツ
  lib/              content/ の読み込み、Markdown 変換、動画 URL の解決
```

注意：`.gitignore` は `AGENTS.md` と `CLAUDE.md`（`next dev` が自動生成）だけを除外しています。`*.md` で一括除外すると `content/` の記事がコミットされなくなるため、個別指定のままにしてください。
