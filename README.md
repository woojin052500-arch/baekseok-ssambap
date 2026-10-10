# 동네 가게 원페이지 홈페이지 시안

Next.js(App Router) + Tailwind 정적 사이트. `npm run build` → `out/` 폴더를 아무 정적 호스팅에 올리면 됩니다.

## 새 업체로 바꾸는 법
1. `src/content/business.ts` 의 값(상호·주소·좌표·전화·영업시간·메뉴·문구)을 새 업체로 바꾼다.
2. `public/images/` 의 사진을 지우고, 새 사진을 `hero.jpg`, `menu-1.jpg`…`menu-4.jpg` 이름으로 넣는다 (없으면 일러스트가 자동으로 나옴).
3. `package.json` 의 `name` 을 새 영문 이름으로 바꾼다 (Vercel 주소가 됨).
4. `npm run build` 로 확인 → `npx vercel --prod --yes` 로 배포.
5. 판매 후 Vercel 환경변수 `NEXT_PUBLIC_DEMO=false`(+ 도메인 생기면 `NEXT_PUBLIC_SITE_URL`) 설정 후 재배포.

## 시안 모드
- `NEXT_PUBLIC_DEMO` 가 없거나 `true`: "시안 · Telosix 제작" 배지, `noindex, nofollow`, robots.txt 전체 차단, sitemap 없음.
  - 단, 카톡·페이스북 등 **링크 미리보기 봇**만 robots.txt에서 허용 (막으면 문자·카톡 미리보기가 안 뜸. 검색엔진 아님).
- `false`: 배지 제거, 인덱싱 허용, `sitemap.xml` 생성.

## 구조
- `src/content/business.ts` — 업체 정보 (유일한 데이터 소스)
- `src/app/page.tsx` — 섹션 전체 / `src/app/og.png` — 링크 미리보기 이미지(1200×630) / `favicon.png`, `apple-touch-icon.png` — 상호 첫 글자 아이콘
- `src/components/Illustrations.tsx` — 사진이 없을 때 쓰는 음식 일러스트 (`/illustrations/*.svg` 로 빌드)
- `src/assets/fonts` — OG 이미지용 Pretendard 서브셋 (SIL OFL)
