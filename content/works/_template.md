---
# このファイルをコピーして「作品名.md」で保存すると、制作物が1件増える。
# ファイル名がそのまま URL になる（例: haniwa-dance.md → /works/haniwa-dance/）。
# 「_」で始まるファイルは無視されるので、このテンプレートは表示されない。

title: 作品のタイトル
org: 依頼元・展示先（例：福島県立博物館）
date: 2026-01-01 # 並び順に使う。新しいほど上に出る
period: 2026年1月〜3月（約2ヶ月） # 省略OK
team: 10人体制 # 省略OK
roles: [プログラマ, UIデザイン]
tech: [Unity, "C#"]
summary: 一覧カードに出る1〜2行の説明。
badge: 学会発表 # カードの左上に出す短いラベル。省略OK

# --- サムネイル ---
# thumbnail を書かなくても、videos → gallery の順で自動的にサムネイルを作る。
# YouTube はポスターフレーム、Google Drive は先頭のプレビュー画像が使われる。
# 自分で画像を用意する場合だけ public/works/ に置いてパスを書く。
thumbnail: # /works/sakuhin.jpg

# 動画。YouTube / Google Drive の URL をそのまま貼ればいい（埋め込み用に自動変換される）
# Drive は「リンクを知っている全員」に共有しておくこと
videos:
  # - title: プレイ映像
  #   url: https://www.youtube.com/watch?v=XXXXXXXXXXX

# スクリーンショット。public/works/ に置く
gallery:
  # - src: /works/sakuhin-01.jpg
  #   caption: 展示の様子

# 関連リンク
links:
  # - label: 公式ページ
  #   url: https://…

draft: true # 書きかけの間は true。false にすると公開される
---

## 概要

ここに Markdown で本文を書く。見出し、画像、箇条書き、コードブロックが使える。

## ゲーム内容

セクションの区切りや名前は自由。
