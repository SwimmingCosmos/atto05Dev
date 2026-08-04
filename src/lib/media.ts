/**
 * 動画 URL の正規化。
 * YouTube / Google Drive の URL をそのまま貼れば、
 * 埋め込み用 URL とサムネイル画像を導き出す。
 */

export type ResolvedVideo = {
  /** iframe で使う URL */
  embedUrl: string;
  /** ポスターフレーム（取れないサービスは undefined） */
  thumbnail?: string;
};

/** watch / youtu.be / shorts / live / embed のどの形でも ID を取り出す */
function youtubeId(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, "");
  if (host === "youtu.be") return url.pathname.slice(1).split("/")[0] || null;
  if (host === "youtube.com" || host === "youtube-nocookie.com" || host === "m.youtube.com") {
    if (url.pathname === "/watch") return url.searchParams.get("v");
    const m = url.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/);
    if (m) return m[1];
  }
  return null;
}

/** /file/d/<id>/… と ?id=<id> の両方に対応 */
function driveId(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, "");
  if (host !== "drive.google.com") return null;
  const m = url.pathname.match(/^\/file\/d\/([^/]+)/);
  if (m) return m[1];
  return url.searchParams.get("id");
}

export function resolveVideo(rawUrl: string): ResolvedVideo {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return { embedUrl: rawUrl };
  }

  const yt = youtubeId(url);
  if (yt) {
    return {
      embedUrl: `https://www.youtube-nocookie.com/embed/${yt}`,
      // hqdefault はどの動画にも必ずある。4:3 だが上下の黒帯は
      // 表示側の object-cover で切り落とされる
      thumbnail: `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`,
    };
  }

  const drive = driveId(url);
  if (drive) {
    return {
      embedUrl: `https://drive.google.com/file/d/${drive}/preview`,
      thumbnail: `https://drive.google.com/thumbnail?id=${drive}&sz=w1600`,
    };
  }

  // 知らないサービスはそのまま iframe に入れる
  return { embedUrl: rawUrl };
}
