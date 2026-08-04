/**
 * output: "export" では generateStaticParams が空配列だとビルドが落ちる
 * （Next.js の empty-generate-static-params エラー）。
 *
 * 記事やタグや制作物が0件のときは、このダミーを1件だけ返してビルドを通し、
 * ページ側は notFound() で 404 にする。実在しない URL なので誰も踏まない。
 */
export const EMPTY_ROUTE_PARAM = "__none__";
