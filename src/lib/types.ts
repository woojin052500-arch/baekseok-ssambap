export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
/** [여는 시간, 닫는 시간] "HH:MM". 브레이크타임이 있으면 구간을 2개로, 휴무일은 빈 배열 */
export type TimeRange = [open: string, close: string];

export type Illustration = "ssam" | "sotbap" | "stew" | "braise" | "table";
export type ReasonIcon = "banchan" | "pot" | "hands";
export type MapProvider = "naver" | "kakao" | "google";

export interface Photo {
  /** public/images/ 안의 파일 이름(확장자 제외). 파일이 없으면 illustration으로 대체 */
  file: string;
  alt: string;
  illustration: Illustration;
}

export interface MenuItem {
  name: string;
  badge?: string;
  desc: string;
  /** 모르면 null → "가격 확인 중" */
  price: string | null;
  photo: Photo;
}

export interface Business {
  name: string;
  category: string;
  seoSuffix: string;
  description: string;
  hero: { kicker: string; tagline: string; lead: string; photo: Photo };
  address: {
    road: string;
    detail?: string;
    region: string;
    locality: string;
    street: string;
    country: string;
  };
  geo: { lat: number; lng: number };
  phone: string;
  hours: Record<DayKey, TimeRange[]>;
  hoursNote?: string;
  rating?: { source: string; value: number; count: number };
  maps: { googleUrl?: string; primary: MapProvider };
  menu: MenuItem[];
  /** 메뉴 아래 안내 문구 */
  menuNote?: string;
  reasons: { icon: ReasonIcon; title: string; body: string }[];
  tips: { title: string; body: string; groupCall: string };
  demoCredit: string;
  /** 테마 색 (브라우저 주소창 색 등) */
  themeColor: string;
}
