import { business } from "@/content/business";
import { CopyAddress } from "@/components/CopyAddress";
import { ArrowIcon, ClockIcon, NavIcon, PhoneIcon, PinIcon, ReasonGlyph, StarIcon, UsersIcon } from "@/components/Icons";
import { HoursTable, OpenBadge } from "@/components/OpenStatus";
import { Picture } from "@/components/Picture";
import { Reveal } from "@/components/Reveal";
import { days, isDemo, mapLinks, mapOrder, phoneIntl, primaryMapHref, siteUrl, telHref } from "@/lib/site";

const b = business;
const fullAddress = b.address.detail ? `${b.address.road} (${b.address.detail})` : b.address.road;

/* ---------- 공통 버튼 ---------- */
const btn = "inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 font-bold transition active:scale-[.98]";
const btnPrimary = `${btn} bg-ssam text-white shadow-[0_6px_16px_-6px_rgba(44,89,39,.55)] hover:bg-ssam-deep`;
const btnSecondary = `${btn} border-2 border-doenjang/70 bg-paper text-doenjang-deep hover:bg-doenjang-soft`;

function SectionHead({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return (
    <div className="mb-7 md:mb-10">
      <p className="mb-2 text-[15px] font-bold tracking-[0.12em] text-ssam">{eyebrow}</p>
      <h2 id={id} className="text-[1.75rem] font-extrabold leading-tight tracking-tight md:text-4xl">
        {title}
      </h2>
    </div>
  );
}

/* ---------- 구조화 데이터 ---------- */
function JsonLd() {
  // 같은 시간대의 요일끼리 묶기
  const groups = new Map<string, string[]>();
  for (const d of days) {
    for (const [opens, closes] of b.hours[d.key]) {
      const k = `${opens}-${closes}`;
      groups.set(k, [...(groups.get(k) ?? []), d.schema]);
    }
  }
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: b.name,
    description: b.description,
    url: siteUrl,
    image: `${siteUrl}/og.png`,
    telephone: phoneIntl,
    servesCuisine: "Korean",
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address.street,
      addressLocality: b.address.locality,
      addressRegion: b.address.region,
      addressCountry: b.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: b.geo.lat, longitude: b.geo.lng },
    hasMap: mapLinks.google.href,
    openingHoursSpecification: [...groups].map(([k, dayOfWeek]) => {
      const [opens, closes] = k.split("-");
      return { "@type": "OpeningHoursSpecification", dayOfWeek, opens, closes };
    }),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <Reveal />

      {/* 1. 상단바 */}
      <header className="sticky top-0 z-40 border-b border-line/70 bg-hanji/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-ssam text-[17px] font-extrabold text-white" aria-hidden="true">
              {b.name.slice(0, 1)}
            </span>
            <span className="truncate text-xl font-extrabold tracking-tight">{b.name}</span>
          </a>
          <nav className="hidden items-center gap-7 font-medium text-ink-soft md:flex" aria-label="바로가기">
            <a href="#menu" className="hover:text-ink">대표 메뉴</a>
            <a href="#hours" className="hover:text-ink">영업시간</a>
            <a href="#location" className="hover:text-ink">오시는 길</a>
          </nav>
          <a href={telHref} className={`${btnPrimary} h-12 shrink-0 px-4`} aria-label={`전화 걸기 ${b.phone}`}>
            <PhoneIcon />
            <span className="sm:hidden">전화</span>
            <span className="hidden tabular-nums sm:inline">{b.phone}</span>
          </a>
        </div>
      </header>

      <main id="top" className="pb-28 md:pb-0">
        {/* 2. 히어로 */}
        <section aria-labelledby="hero-title" className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-14 pt-8 md:grid-cols-[1.05fr_1fr] md:gap-12 md:px-8 md:pb-20 md:pt-16">
          <div>
            <p className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3.5 py-1.5 text-[15px] font-semibold text-doenjang-deep">
              <PinIcon className="size-4" />
              {b.hero.kicker}
            </p>
            <h1 id="hero-title" className="text-[2.9rem] font-extrabold leading-[1.1] tracking-tight md:text-7xl">
              {b.name}
            </h1>
            <p className="mt-3 text-[1.6rem] font-bold leading-snug tracking-tight text-ssam-deep md:text-4xl">{b.hero.tagline}</p>
            <p className="mt-4 max-w-xl text-ink-soft md:text-lg">{b.hero.lead}</p>

            <div className="mt-5 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
              {b.rating && (
                <span className="inline-flex items-center gap-1.5 text-[15px] text-ink-soft">
                  <StarIcon className="size-4 text-[#e2a23b]" />
                  <strong className="font-bold text-ink">{b.rating.value.toFixed(1)}</strong>
                  <span>
                    {b.rating.source} 리뷰 {b.rating.count}개
                  </span>
                </span>
              )}
              <OpenBadge size="sm" />
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:max-w-md">
              <a href={telHref} className={`${btnPrimary} h-14 text-lg`}>
                <PhoneIcon />
                전화하기
              </a>
              <a href={primaryMapHref} target="_blank" rel="noopener noreferrer" className={`${btnSecondary} h-14 text-lg`}>
                <NavIcon />
                길찾기
              </a>
            </div>
          </div>

          {/* TODO: 사장님 실제 사진으로 교체 → public/images/hero.jpg */}
          <Picture photo={b.hero.photo} priority showHint className="aspect-[4/3] rounded-[28px] shadow-[0_24px_48px_-24px_rgba(92,62,32,.45)] ring-1 ring-black/5" />
        </section>

        {/* 3. 대표 메뉴 */}
        <section aria-labelledby="menu" className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
          <div data-reveal>
            <SectionHead eyebrow="MENU" title="이 집의 대표 메뉴" id="menu" />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {b.menu.map((m) => (
              <li key={m.name} data-reveal className="flex overflow-hidden rounded-3xl border border-line bg-paper shadow-[0_10px_30px_-20px_rgba(92,62,32,.5)] sm:flex-col">
                {/* TODO: 사장님 실제 사진으로 교체 → public/images/{m.photo.file}.jpg */}
                <Picture photo={m.photo} className="w-[7.5rem] shrink-0 sm:aspect-[4/3] sm:w-full" />
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-bold tracking-tight">{m.name}</h3>
                    {m.badge && <span className="rounded-full bg-gochu/10 px-2.5 py-0.5 text-[13px] font-bold text-gochu">{m.badge}</span>}
                  </div>
                  <p className="mt-1.5 flex-1 text-[16px] leading-relaxed text-ink-soft sm:text-base">{m.desc}</p>
                  <p className={`mt-3 text-[15px] font-semibold ${m.price ? "text-ink" : "text-doenjang"}`}>{m.price ?? "가격 확인 중"}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 4. 이 집이 좋은 이유 */}
        <section aria-labelledby="why" className="border-y border-line bg-hanji-2/80">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
            <div data-reveal>
              <SectionHead eyebrow="WHY" title="이 집이 좋은 이유" id="why" />
            </div>
            <ol className="grid gap-4 md:grid-cols-3 md:gap-5">
              {b.reasons.map((r, i) => (
                <li key={r.title} data-reveal className="rounded-3xl bg-paper p-6 ring-1 ring-line md:p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl bg-ssam-soft text-ssam-deep">
                      <ReasonGlyph name={r.icon} />
                    </span>
                    <span className="text-3xl font-extrabold text-line" aria-hidden="true">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold tracking-tight">{r.title}</h3>
                  <p className="mt-2 text-ink-soft">{r.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 5. 이용 팁 */}
        <section aria-labelledby="tips" className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
          <div data-reveal>
            <SectionHead eyebrow="TIP" title="이용 팁" id="tips" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            <div data-reveal className="flex gap-4 rounded-3xl bg-ssam-deep p-6 text-white md:p-7">
              <ClockIcon className="mt-1 size-7 shrink-0 text-[#cfe3bd]" />
              <div>
                <h3 className="text-xl font-bold">{b.tips.title}</h3>
                <p className="mt-1.5 text-white/85">{b.tips.body}</p>
              </div>
            </div>
            <div data-reveal className="flex flex-col gap-4 rounded-3xl border border-line bg-paper p-6 md:p-7 lg:flex-row lg:items-center">
              <div className="flex flex-1 gap-4">
                <UsersIcon className="mt-1 size-7 shrink-0 text-doenjang" />
                <div>
                  <h3 className="text-xl font-bold">단체 문의</h3>
                  <p className="mt-1.5 text-ink-soft">{b.tips.groupCall}</p>
                </div>
              </div>
              <a href={telHref} className={`${btnSecondary} h-12 shrink-0`}>
                <PhoneIcon />
                전화 문의
              </a>
            </div>
          </div>
        </section>

        {/* 6. 영업시간 + 7. 오시는 길 */}
        <div className="mx-auto grid max-w-6xl gap-5 px-4 pb-16 md:grid-cols-2 md:px-8 md:pb-24">
          <section aria-labelledby="hours" data-reveal className="rounded-3xl border border-line bg-paper p-5 md:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="mb-1 text-[15px] font-bold tracking-[0.12em] text-ssam">HOURS</p>
                <h2 id="hours" className="text-[1.75rem] font-extrabold tracking-tight">
                  영업시간
                </h2>
              </div>
              <OpenBadge />
            </div>
            <div className="overflow-hidden rounded-2xl border border-line">
              <HoursTable />
            </div>
            <p className="mt-4 text-[15px] text-ink-soft">한국 시간 기준 · {b.hoursNote}</p>
          </section>

          <section aria-labelledby="location" data-reveal className="flex flex-col rounded-3xl border border-line bg-paper p-5 md:p-8">
            <p className="mb-1 text-[15px] font-bold tracking-[0.12em] text-ssam">LOCATION</p>
            <h2 id="location" className="text-[1.75rem] font-extrabold tracking-tight">
              오시는 길
            </h2>
            <div className="mt-5 flex gap-3 rounded-2xl bg-hanji p-4">
              <PinIcon className="mt-1 size-6 shrink-0 text-gochu" />
              <address className="not-italic">
                <p className="text-lg font-bold leading-snug">{b.address.road}</p>
                {b.address.detail && <p className="mt-1 text-ink-soft">{b.address.detail}</p>}
              </address>
            </div>
            <div className="mt-3">
              <CopyAddress text={b.address.road} />
            </div>
            <p className="mt-6 mb-2.5 font-semibold">지도 앱으로 길찾기</p>
            <div className="grid grid-cols-1 gap-2.5 min-[400px]:grid-cols-3">
              {mapOrder.map((k) => (
                <a
                  key={k}
                  href={mapLinks[k].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btn} h-13 border border-line bg-hanji px-3 text-ink hover:border-ssam hover:bg-ssam-soft`}
                >
                  {mapLinks[k].label}
                  <ArrowIcon className="size-4 text-ink-soft" />
                </a>
              ))}
            </div>
            <a href={telHref} className="mt-auto pt-6 text-ink-soft">
              길을 못 찾으시겠으면 <span className="font-bold text-ssam-deep underline underline-offset-4">{b.phone}</span>로 전화 주세요
            </a>
          </section>
        </div>
      </main>

      {/* 8. 푸터 */}
      <footer className="bg-ink pb-32 pt-12 text-[#e9dfcf] md:pb-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-end md:justify-between md:px-8">
          <div>
            <p className="text-2xl font-extrabold text-white">{b.name}</p>
            <p className="mt-1 text-[15px] text-[#c9bba6]">{b.category}</p>
            <address className="mt-4 space-y-1 not-italic">
              <p>{fullAddress}</p>
              <p>
                전화{" "}
                <a href={telHref} className="font-semibold text-white underline-offset-4 hover:underline">
                  {b.phone}
                </a>
              </p>
            </address>
          </div>
          <div className="text-[15px] text-[#b5a690] md:text-right">
            {b.rating && <p>평점은 {b.rating.source} 지도 기준입니다.</p>}
            <p>
              © {new Date().getFullYear()} {b.name}
              {isDemo && " · 홈페이지 시안"}
            </p>
          </div>
        </div>
      </footer>

      {/* 9. 모바일 하단 고정 바 */}
      <nav
        aria-label="빠른 연결"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-3 pt-2.5 backdrop-blur-md md:hidden"
        style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto grid max-w-md grid-cols-2 gap-2.5">
          <a href={telHref} className={`${btnPrimary} h-14 text-lg`}>
            <PhoneIcon />
            전화
          </a>
          <a href={primaryMapHref} target="_blank" rel="noopener noreferrer" className={`${btnSecondary} h-14 text-lg`}>
            <NavIcon />
            길찾기
          </a>
        </div>
      </nav>

      {/* 시안 배지 */}
      {isDemo && (
        <div
          className="pointer-events-none fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] right-3 z-50 rounded-full bg-ink/75 px-3 py-1.5 text-[13px] font-medium text-white shadow-lg backdrop-blur-sm md:bottom-5 md:right-5"
          aria-hidden="true"
        >
          {b.demoCredit}
        </div>
      )}
    </>
  );
}
