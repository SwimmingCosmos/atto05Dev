import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-5 py-28 text-center sm:px-8">
      <p className="font-mono text-6xl font-bold text-accent/30">404</p>
      <h1 className="mt-4 text-2xl font-bold">
        ページが見つかりませんでした
      </h1>
      <p className="mt-2 text-muted">
        URL が変わったか、まだ公開されていないページかもしれません。
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-bg transition-opacity hover:opacity-85"
        >
          トップへ戻る
        </Link>
        <Link
          href="/blog/"
          className="rounded-lg border border-line-strong px-5 py-2.5 text-sm font-bold transition-colors hover:border-accent/50 hover:text-accent"
        >
          ブログを見る
        </Link>
      </div>
    </div>
  );
}
