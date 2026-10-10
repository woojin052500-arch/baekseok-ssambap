import { backgrounds } from "@/components/Illustrations";
import { isDemo } from "@/lib/site";
import { photoSrc } from "@/lib/photo";
import type { Photo } from "@/lib/types";

/**
 * public/images/ 에 사진이 있으면 사진, 없으면 일러스트 자리표시.
 * TODO: 사장님 실제 사진으로 교체 (business.ts 의 photo.file 이름으로 public/images/ 에 넣기)
 */
export function Picture({ photo, className = "", priority = false, showHint = false }: { photo: Photo; className?: string; priority?: boolean; showHint?: boolean }) {
  const src = photoSrc(photo);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={photo.alt}
          className="absolute inset-0 size-full object-cover"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/illustrations/${photo.illustration}.svg`}
          alt={`${photo.alt} (예시 그림)`}
          className="absolute inset-0 size-full object-cover"
          style={{ background: backgrounds[photo.illustration] }}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      )}
      {!src && isDemo && showHint && (
        <span className="absolute bottom-3 left-3 rounded-full bg-ink/70 px-3 py-1 text-[13px] font-medium text-white backdrop-blur-sm">
          예시 그림 · 가게 사진으로 교체됩니다
        </span>
      )}
    </div>
  );
}
