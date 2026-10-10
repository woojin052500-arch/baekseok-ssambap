"use client";

import { useEffect, useState } from "react";
import { business } from "@/content/business";
import { days } from "@/lib/site";
import { getOpenStatus, nowInKorea, type OpenStatus } from "@/lib/hours";
import type { DayKey } from "@/lib/types";

/** 정적 페이지라 서버 시간이 아닌 방문 시점(브라우저)에 계산. 1분마다 갱신 */
function useKoreaNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function label(s: OpenStatus) {
  if (s.open) return { text: "영업 중", sub: `${s.until}까지` };
  return { text: "준비 중", sub: s.next ? `${s.next.when} ${s.next.time} 오픈` : "" };
}

export function OpenBadge({ size = "md" }: { size?: "sm" | "md" }) {
  const now = useKoreaNow();
  const pad = size === "sm" ? "px-3 py-1 text-[15px]" : "px-3.5 py-1.5 text-base";
  if (!now) {
    // 계산 전 자리 (레이아웃 흔들림 방지)
    return <span className={`inline-flex items-center rounded-full bg-line/60 ${pad} text-transparent`} aria-hidden="true">준비 중 · 내일 10:00 오픈</span>;
  }
  const s = getOpenStatus(business.hours, now);
  const { text, sub } = label(s);
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full font-semibold ${pad} ${
        s.open ? "bg-ssam-soft text-ssam-deep" : "bg-doenjang-soft text-doenjang-deep"
      }`}
    >
      <span className={`size-2.5 rounded-full ${s.open ? "bg-ssam animate-pulse" : "bg-doenjang"}`} aria-hidden="true" />
      {text}
      {sub && <span className="font-normal">· {sub}</span>}
    </span>
  );
}

export function HoursTable() {
  const now = useKoreaNow();
  const today: DayKey | null = now ? nowInKorea(now).day : null;
  return (
    <table className="w-full border-collapse text-base">
      <caption className="sr-only">요일별 영업시간 (한국 시간)</caption>
      <tbody>
        {days.map((d) => {
          const ranges = business.hours[d.key];
          const isToday = d.key === today;
          return (
            <tr key={d.key} className={`border-b border-line last:border-0 ${isToday ? "bg-ssam-soft/70" : ""}`}>
              <th scope="row" className={`py-3 pl-4 text-left ${isToday ? "font-bold text-ssam-deep" : "font-medium"}`}>
                {d.label}
                {isToday && (
                  <span className="ml-2 rounded-full bg-ssam px-2 py-0.5 text-[13px] font-semibold text-white align-middle">오늘</span>
                )}
              </th>
              <td className={`py-3 pr-4 text-right tabular-nums ${isToday ? "font-bold text-ssam-deep" : ""}`}>
                {ranges.length ? ranges.map(([o, c]) => `${o} – ${c}`).join(", ") : <span className="text-gochu">휴무</span>}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
