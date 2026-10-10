import { business } from "@/content/business";
import type { DayKey, MapProvider } from "@/lib/types";

/** 환경변수가 없으면 시안 모드 */
export const isDemo = process.env.NEXT_PUBLIC_DEMO !== "false";

/** OG 이미지·sitemap용 절대 주소. 정식 도메인 → Vercel 프로덕션 주소 → 기본값 순 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  "https://baekseok-ssambap.vercel.app"
).replace(/\/$/, "");

export const pageTitle = `${business.name} | ${business.seoSuffix}`;

export const telHref = `tel:${business.phone.replace(/[^\d+]/g, "")}`;
/** 국제 표기 (JSON-LD): 041-563-9898 → +82-41-563-9898 */
export const phoneIntl = `+82-${business.phone.replace(/^0/, "")}`;

export const mapLinks: Record<MapProvider, { label: string; href: string }> = {
  naver: {
    label: "네이버지도",
    href: `https://map.naver.com/p/search/${encodeURIComponent(business.address.road)}`,
  },
  kakao: {
    label: "카카오맵",
    href: `https://map.kakao.com/link/to/${encodeURIComponent(business.name)},${business.geo.lat},${business.geo.lng}`,
  },
  google: {
    label: "구글지도",
    href:
      business.maps.googleUrl ??
      `https://www.google.com/maps/dir/?api=1&destination=${business.geo.lat},${business.geo.lng}`,
  },
};
export const mapOrder: MapProvider[] = ["naver", "kakao", "google"];
export const primaryMapHref = mapLinks[business.maps.primary].href;

export const days: { key: DayKey; label: string; schema: string }[] = [
  { key: "mon", label: "월요일", schema: "Monday" },
  { key: "tue", label: "화요일", schema: "Tuesday" },
  { key: "wed", label: "수요일", schema: "Wednesday" },
  { key: "thu", label: "목요일", schema: "Thursday" },
  { key: "fri", label: "금요일", schema: "Friday" },
  { key: "sat", label: "토요일", schema: "Saturday" },
  { key: "sun", label: "일요일", schema: "Sunday" },
];
