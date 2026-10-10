// 시안 모드(NEXT_PUBLIC_DEMO !== "false")면 sitemap.xml 을 남기지 않는다
import { rmSync, existsSync } from "node:fs";

const isDemo = process.env.NEXT_PUBLIC_DEMO !== "false";
const file = new URL("../out/sitemap.xml", import.meta.url);
if (isDemo && existsSync(file)) {
  rmSync(file);
  console.log("[postbuild] 시안 모드 → out/sitemap.xml 제거");
}
