import { scenes } from "@/components/Illustrations";
import type { Illustration } from "@/lib/types";

export const dynamic = "force-static";

export function generateStaticParams() {
  return Object.keys(scenes).map((name) => ({ name: `${name}.svg` }));
}

/** 일러스트 자리표시를 /illustrations/{이름}.svg 정적 파일로 생성 */
export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const Scene = scenes[name.replace(/\.svg$/, "") as Illustration];
  if (!Scene) return new Response("Not found", { status: 404 });
  // 빌드 시점에만 실행되는 정적 라우트라 서버 렌더러를 직접 사용
  const { renderToStaticMarkup } = await import("react-dom/server.edge");
  // 소수점 1자리로 줄여 파일 크기 절약
  const svg = renderToStaticMarkup(<Scene />).replace(/(\d+\.\d)\d+/g, "$1");
  return new Response(svg, {
    headers: { "Content-Type": "image/svg+xml; charset=utf-8" },
  });
}
