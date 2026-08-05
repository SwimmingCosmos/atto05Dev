/** "2025-09-23" → "2025.09.23" */
export function formatDate(iso: string): string {
  return iso.replaceAll("-", ".");
}

/** "2025-09-23" → "2025年9月23日" */
export function formatDateJa(iso: string): string {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${y}年${Number(m)}月${Number(d)}日`;
}

/** URL からホスト名だけ取り出す（表示用） */
export function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** 連絡先カードの補足行。note が無いときに URL から作る */
export function linkAutoNote(url: string): string {
  if (url.startsWith("mailto:")) return url.slice(7);
  try {
    const u = new URL(url);
    const path = u.pathname.replace(/\/$/, "");
    return u.hostname.replace(/^www\./, "") + path;
  } catch {
    return url;
  }
}
