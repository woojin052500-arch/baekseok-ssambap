import fs from "node:fs/promises";
import path from "node:path";

/** OG 이미지·아이콘용 한글 폰트 (Pretendard KS X 1001 서브셋, OFL) */
export async function ogFonts() {
  const dir = path.join(process.cwd(), "src", "assets", "fonts");
  const [bold, semi] = await Promise.all([
    fs.readFile(path.join(dir, "Pretendard-ExtraBold.subset.woff")),
    fs.readFile(path.join(dir, "Pretendard-SemiBold.subset.woff")),
  ]);
  return [
    { name: "Pretendard", data: bold, weight: 800 as const, style: "normal" as const },
    { name: "Pretendard", data: semi, weight: 600 as const, style: "normal" as const },
  ];
}
