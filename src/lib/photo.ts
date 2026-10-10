import fs from "node:fs";
import path from "node:path";
import type { Photo } from "@/lib/types";

const exts = ["webp", "jpg", "jpeg", "png", "avif"];

/** public/images/{file}.{확장자} 가 있으면 그 경로, 없으면 null (빌드 시점에 확인) */
export function photoSrc(photo: Photo): string | null {
  for (const ext of exts) {
    const name = `${photo.file}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", "images", name))) return `/images/${name}`;
  }
  return null;
}
