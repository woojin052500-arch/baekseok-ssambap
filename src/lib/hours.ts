import type { DayKey, TimeRange } from "@/lib/types";

const order: DayKey[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** 한국 시간(UTC+9, 서머타임 없음) 기준 요일·분 */
export function nowInKorea(date = new Date()) {
  const k = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return { day: order[k.getUTCDay()], minutes: k.getUTCHours() * 60 + k.getUTCMinutes() };
}

export type OpenStatus =
  | { open: true; until: string }
  | { open: false; next: { when: "오늘" | "내일" | string; time: string } | null };

export function getOpenStatus(hours: Record<DayKey, TimeRange[]>, date = new Date()): OpenStatus {
  const { day, minutes } = nowInKorea(date);
  const idx = order.indexOf(day);
  const prev = order[(idx + 6) % 7];

  // 전날 자정을 넘겨 영업하는 경우
  for (const [o, c] of hours[prev]) {
    if (toMin(c) < toMin(o) && minutes < toMin(c)) return { open: true, until: c };
  }
  for (const [o, c] of hours[day]) {
    const om = toMin(o);
    const cm = toMin(c);
    if (cm > om ? minutes >= om && minutes < cm : minutes >= om) return { open: true, until: c };
  }
  // 다음 오픈 시각
  const later = hours[day].find(([o]) => toMin(o) > minutes);
  if (later) return { open: false, next: { when: "오늘", time: later[0] } };
  for (let i = 1; i <= 7; i++) {
    const d = order[(idx + i) % 7];
    if (hours[d].length) {
      const labels: Record<DayKey, string> = { sun: "일", mon: "월", tue: "화", wed: "수", thu: "목", fri: "금", sat: "토" };
      return { open: false, next: { when: i === 1 ? "내일" : `${labels[d]}요일`, time: hours[d][0][0] } };
    }
  }
  return { open: false, next: null };
}
