/**
 * 업체 정보 — 이 파일 하나만 바꾸면 다른 업체 시안이 됩니다.
 * 컴포넌트는 업체 정보를 반드시 여기서만 읽습니다.
 *
 * ⚠️ 표시는 사장님께 확인받아야 하는 항목입니다.
 * 지어내지 말 것: 메뉴 가격, 손님 후기 문장, 수상·방송 이력, 원산지.
 *
 * 사진: public/images/ 에 photo.file 과 같은 이름(.jpg/.jpeg/.png/.webp)으로 넣으면
 * 자동으로 사진이 쓰이고, 없으면 일러스트 자리표시가 나옵니다. (예: public/images/hero.jpg)
 */
import type { Business } from "@/lib/types";

export const business: Business = {
  // ⚠️ 구글 등록명. 실제 간판명이 '우렁쌈밥' 계열일 수 있어 확인 후 교체
  name: "백석식당",
  category: "한식 쌈밥·백반",
  /** 브라우저 탭 제목 뒤에 붙는 문구 → "{상호} | {seoSuffix}" */
  seoSuffix: "천안 백석동 쌈밥·솥밥",
  /** 검색결과·링크 미리보기 설명 (한 문장) */
  description:
    "천안 백석동 백석식당 — 제육볶음을 우렁쌈장에 싸 먹는 쌈밥과 누룽지·숭늉까지 나오는 솥밥, 넉넉한 기본 반찬의 동네 한식당입니다.",

  hero: {
    kicker: "천안 백석동 · 쌈밥·백반",
    tagline: "쌈 싸 먹는 집밥 한 상",
    lead: "매콤한 제육볶음을 우렁쌈장에 얹어 한 쌈, 솥밥 누룽지와 숭늉으로 마무리하는 동네 밥집이에요.",
    // TODO: 사장님 실제 사진으로 교체 → public/images/hero.jpg
    photo: { file: "hero", alt: "제육볶음과 쌈채소, 기본 반찬이 차려진 한 상", illustration: "table" },
  },

  address: {
    road: "충남 천안시 서북구 백석4길 31",
    /** 지번·건물명 등 보조 표기 */
    detail: "백석동 882, 천안백석종합상가",
    // JSON-LD용 분해 표기
    region: "충청남도",
    locality: "천안시 서북구",
    street: "백석4길 31",
    country: "KR",
  },
  geo: { lat: 36.8218769, lng: 127.1236038 },
  phone: "041-563-9898",

  // ⚠️ 구글 기준. 리뷰에 '저녁 오픈' 언급 → 브레이크타임이 있을 수 있음
  hours: {
    mon: [["10:00", "21:30"]],
    tue: [["10:00", "21:30"]],
    wed: [["10:00", "21:30"]],
    thu: [["10:00", "21:30"]],
    fri: [["10:00", "21:30"]],
    sat: [["10:00", "21:30"]],
    sun: [["10:00", "21:30"]],
  },
  hoursNote: "명절·임시 휴무는 전화로 확인해 주세요.",

  rating: { source: "구글", value: 4.4, count: 34 },

  maps: {
    /** 구글은 공유 단축 링크를 그대로 사용 (네이버·카카오는 주소·좌표로 자동 생성) */
    googleUrl: "https://maps.app.goo.gl/uENDgp21WtySn8w87",
    /** 상단 [길찾기] 버튼이 여는 지도 — 카카오는 좌표로 바로 길안내가 열립니다 */
    primary: "kakao",
  },

  // 메뉴명은 가칭 — ⚠️ 실제 메뉴명·가격 확인 필요. 가격을 모르면 null → "가격 확인 중"
  menu: [
    {
      name: "제육 우렁쌈밥",
      badge: "대표",
      desc: "매콤한 제육볶음을 우렁쌈장에 얹어 쌈 싸 먹는 이 집 대표 메뉴",
      price: null,
      // TODO: 사장님 실제 사진으로 교체 → public/images/menu-1.jpg
      photo: { file: "menu-1", alt: "제육볶음과 쌈채소", illustration: "ssam" },
    },
    {
      name: "솥밥",
      desc: "솥에 지어 내는 밥. 다 먹고 나면 누룽지와 숭늉까지",
      price: null,
      // TODO: 사장님 실제 사진으로 교체 → public/images/menu-2.jpg
      photo: { file: "menu-2", alt: "솥밥", illustration: "sotbap" },
    },
    {
      name: "닭볶음탕",
      badge: "인기",
      desc: "쌈밥·솥밥과 함께 손님들이 즐겨 찾는 인기 메뉴",
      price: null,
      // TODO: 사장님 실제 사진으로 교체 → public/images/menu-3.jpg
      photo: { file: "menu-3", alt: "닭볶음탕", illustration: "stew" },
    },
    {
      name: "갈치조림",
      badge: "인기",
      desc: "밥 한 공기 뚝딱, 꾸준히 찾는 손님이 많은 조림 메뉴",
      price: null,
      // TODO: 사장님 실제 사진으로 교체 → public/images/menu-4.jpg
      photo: { file: "menu-4", alt: "갈치조림", illustration: "braise" },
    },
  ],

  reasons: [
    {
      icon: "banchan",
      title: "기본 반찬 7가지",
      body: "상에 깔리는 기본 반찬이 7가지 안팎. 양이 넉넉해서 가성비 좋다는 이야기가 많아요.",
    },
    {
      icon: "pot",
      title: "갓 지은 솥밥과 숭늉",
      body: "솥밥을 시키면 마지막에 누룽지와 따뜻한 숭늉까지. 식사의 끝이 든든해요.",
    },
    {
      icon: "hands",
      title: "사장님 부부 손맛",
      body: "사장님 부부가 꾸려 가는 집. 손맛 좋다는 칭찬이 꾸준히 이어지는 곳이에요.",
    },
  ],

  tips: {
    title: "점심엔 웨이팅이 있어요",
    body: "저녁 오픈 직후가 여유로워요.",
    groupCall: "단체 방문은 미리 전화로 문의해 주세요.",
  },

  /** 시안 배지 문구 (NEXT_PUBLIC_DEMO가 false가 아니면 표시) */
  demoCredit: "시안 · Telosix 제작",
  themeColor: "#3d7536",
};

