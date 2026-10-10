/**
 * 사진이 없을 때 쓰는 음식 일러스트. 빌드 때 /illustrations/{이름}.svg 정적 파일로 만들어집니다.
 * 실제 사진이 public/images/ 에 들어오면 자동으로 사진으로 바뀝니다.
 */
import type { Illustration as IllustrationName } from "@/lib/types";

/* ---------- 작은 도우미 ---------- */

/** 항상 같은 결과를 내는 난수 (빌드마다 그림이 바뀌지 않게) */
function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 가장자리가 물결치는 덩어리 모양 (상추·고기·김치 등) */
function blob(cx: number, cy: number, rx: number, ry: number, waves = 8, amp = 0.12, rot = 0, n = 48) {
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * Math.PI * 2;
    const r = 1 + amp * Math.sin(t * waves + rot * 3);
    const x = Math.cos(t) * rx * r;
    const y = Math.sin(t) * ry * r;
    const xr = x * Math.cos(rot) - y * Math.sin(rot);
    const yr = x * Math.sin(rot) + y * Math.cos(rot);
    pts.push(`${(cx + xr).toFixed(1)},${(cy + yr).toFixed(1)}`);
  }
  return `M${pts.join("L")}Z`;
}

const C = {
  dish: "#fbf8f1",
  dishRim: "#e7dccb",
  dishShadow: "rgba(92,62,32,.16)",
  rice: "#fffdf8",
  grain: "#ece2cf",
  pork: "#b14a28",
  porkHi: "#d47344",
  sauce: "#c2412a",
  sauceDeep: "#9c2f1c",
  lettuce: "#79b257",
  lettuceHi: "#a3cf7d",
  vein: "#4f8c38",
  perilla: "#3f7a3a",
  doenjang: "#8a5a2b",
  doenjangHi: "#a8723c",
  egg: "#f1c24f",
  sprout: "#f1e2a4",
  stone: "#3b3633",
  stoneHi: "#59524d",
  onggi: "#7a4a29",
  onggiHi: "#9a6237",
};

function Dish({ cx, cy, r, children, rim = C.dishRim }: { cx: number; cy: number; r: number; children?: React.ReactNode; rim?: string }) {
  return (
    <g>
      <ellipse cx={cx + r * 0.06} cy={cy + r * 0.1} rx={r} ry={r * 0.98} fill={C.dishShadow} />
      <circle cx={cx} cy={cy} r={r} fill={C.dish} stroke={rim} strokeWidth={r * 0.06} />
      <circle cx={cx} cy={cy} r={r * 0.8} fill="none" stroke={rim} strokeWidth={1.2} opacity={0.7} />
      {children}
    </g>
  );
}

function RiceGrains({ cx, cy, r, seed, count = 40, color = C.grain }: { cx: number; cy: number; r: number; seed: number; count?: number; color?: string }) {
  const rand = rng(seed);
  return (
    <g fill={color}>
      {Array.from({ length: count }, (_, i) => {
        const a = rand() * Math.PI * 2;
        const d = Math.sqrt(rand()) * r;
        return (
          <ellipse
            key={i}
            cx={cx + Math.cos(a) * d}
            cy={cy + Math.sin(a) * d}
            rx={r * 0.055}
            ry={r * 0.028}
            transform={`rotate(${Math.round(rand() * 180)} ${cx + Math.cos(a) * d} ${cy + Math.sin(a) * d})`}
          />
        );
      })}
    </g>
  );
}

function PorkPile({ cx, cy, r, seed }: { cx: number; cy: number; r: number; seed: number }) {
  const rand = rng(seed);
  return (
    <g>
      <path d={blob(cx, cy, r * 0.82, r * 0.78, 7, 0.06, 0.3)} fill={C.sauceDeep} />
      {Array.from({ length: 16 }, (_, i) => {
        const a = rand() * Math.PI * 2;
        const d = Math.sqrt(rand()) * r * 0.6;
        const x = cx + Math.cos(a) * d;
        const y = cy + Math.sin(a) * d;
        const s = r * (0.2 + rand() * 0.1);
        return (
          <g key={i}>
            <path d={blob(x, y, s * 1.3, s * 0.75, 5, 0.1, rand() * 3)} fill={i % 3 ? C.pork : C.sauce} />
            <path d={blob(x - s * 0.2, y - s * 0.15, s * 0.6, s * 0.22, 3, 0.1, rand() * 3)} fill={C.porkHi} opacity={0.7} />
          </g>
        );
      })}
      {/* 파·깨 */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = rand() * Math.PI * 2;
        const d = rand() * r * 0.6;
        return <rect key={`g${i}`} x={cx + Math.cos(a) * d} y={cy + Math.sin(a) * d} width={r * 0.09} height={r * 0.05} rx={1} fill="#6fae4e" />;
      })}
      {Array.from({ length: 10 }, (_, i) => {
        const a = rand() * Math.PI * 2;
        const d = rand() * r * 0.65;
        return <ellipse key={`s${i}`} cx={cx + Math.cos(a) * d} cy={cy + Math.sin(a) * d} rx={1.6} ry={1} fill="#f5e8c8" />;
      })}
    </g>
  );
}

function Lettuce({ cx, cy, rx, ry, rot, seed, dark = false }: { cx: number; cy: number; rx: number; ry: number; rot: number; seed: number; dark?: boolean }) {
  const base = dark ? C.perilla : C.lettuce;
  const hi = dark ? "#5d9a4f" : C.lettuceHi;
  return (
    <g>
      <path d={blob(cx, cy, rx, ry, dark ? 14 : 11, dark ? 0.04 : 0.09, rot)} fill={base} />
      <path d={blob(cx - rx * 0.1, cy - ry * 0.12, rx * 0.72, ry * 0.6, 9, 0.08, rot + seed)} fill={hi} opacity={0.55} />
      <path
        d={`M${cx - Math.cos(rot) * rx * 0.85},${cy - Math.sin(rot) * rx * 0.85} L${cx + Math.cos(rot) * rx * 0.8},${cy + Math.sin(rot) * rx * 0.8}`}
        stroke={C.vein}
        strokeWidth={2.2}
        strokeLinecap="round"
        opacity={0.8}
      />
    </g>
  );
}

function Ssamjang({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <Dish cx={cx} cy={cy} r={r}>
      <path d={blob(cx, cy, r * 0.66, r * 0.62, 6, 0.08, 1)} fill={C.doenjang} />
      <path d={blob(cx - r * 0.12, cy - r * 0.14, r * 0.3, r * 0.18, 4, 0.1, 0.5)} fill={C.doenjangHi} />
      {/* 우렁이 */}
      <circle cx={cx + r * 0.2} cy={cy + r * 0.12} r={r * 0.13} fill="#5c3b1d" />
      <circle cx={cx - r * 0.25} cy={cy + r * 0.22} r={r * 0.1} fill="#5c3b1d" />
      <circle cx={cx + r * 0.05} cy={cy - r * 0.3} r={r * 0.08} fill="#5c3b1d" />
    </Dish>
  );
}

function Steam({ x, y, s = 1, color = "#ffffff" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g stroke={color} strokeWidth={5 * s} strokeLinecap="round" fill="none" opacity={0.75}>
      <path d={`M${x},${y} c${-10 * s},${-14 * s} ${10 * s},${-22 * s} 0,${-38 * s}`} />
      <path d={`M${x + 22 * s},${y + 6 * s} c${-10 * s},${-14 * s} ${10 * s},${-22 * s} 0,${-38 * s}`} />
      <path d={`M${x - 22 * s},${y + 8 * s} c${-8 * s},${-12 * s} ${8 * s},${-18 * s} 0,${-30 * s}`} />
    </g>
  );
}

/* ---------- 반찬 7가지 ---------- */

function Banchan({ kind, cx, cy, r, seed }: { kind: number; cx: number; cy: number; r: number; seed: number }) {
  const rand = rng(seed);
  const inner = (() => {
    switch (kind) {
      case 0: // 배추김치
        return Array.from({ length: 6 }, (_, i) => (
          <path key={i} d={blob(cx + (rand() - 0.5) * r * 0.7, cy + (rand() - 0.5) * r * 0.7, r * 0.32, r * 0.2, 4, 0.18, rand() * 3)} fill={i % 2 ? C.sauce : "#e0603f"} />
        ));
      case 1: // 시금치나물
        return Array.from({ length: 14 }, (_, i) => {
          const a = rand() * Math.PI;
          const x = cx + (rand() - 0.5) * r * 0.8;
          const y = cy + (rand() - 0.5) * r * 0.8;
          return (
            <line key={i} x1={x - Math.cos(a) * r * 0.3} y1={y - Math.sin(a) * r * 0.3} x2={x + Math.cos(a) * r * 0.3} y2={y + Math.sin(a) * r * 0.3} stroke={i % 3 ? "#3f7d2f" : "#5e9c45"} strokeWidth={r * 0.1} strokeLinecap="round" />
          );
        });
      case 2: // 콩나물
        return Array.from({ length: 12 }, (_, i) => {
          const x = cx + (rand() - 0.5) * r * 0.9;
          const y = cy + (rand() - 0.5) * r * 0.9;
          const a = rand() * Math.PI * 2;
          return (
            <g key={i}>
              <path d={`M${x},${y} q${Math.cos(a) * r * 0.25},${Math.sin(a) * r * 0.1} ${Math.cos(a) * r * 0.45},${Math.sin(a) * r * 0.4}`} stroke={C.sprout} strokeWidth={r * 0.07} fill="none" strokeLinecap="round" />
              <ellipse cx={x} cy={y} rx={r * 0.09} ry={r * 0.07} fill={C.egg} />
            </g>
          );
        });
      case 3: // 계란말이
        return [-1, 0, 1].map((d) => (
          <g key={d}>
            <circle cx={cx + d * r * 0.42} cy={cy + d * r * 0.1} r={r * 0.3} fill={C.egg} stroke="#e3a93a" strokeWidth={2} />
            <path d={`M${cx + d * r * 0.42 - r * 0.15},${cy + d * r * 0.1} a${r * 0.15},${r * 0.15} 0 1 1 ${r * 0.15},${r * 0.15}`} stroke="#df9f2f" strokeWidth={1.5} fill="none" />
            <circle cx={cx + d * r * 0.42 + r * 0.08} cy={cy + d * r * 0.1 - r * 0.05} r={r * 0.04} fill="#7cb35a" />
          </g>
        ));
      case 4: // 어묵볶음
        return Array.from({ length: 7 }, (_, i) => (
          <rect key={i} x={cx - r * 0.5 + rand() * r * 0.5} y={cy - r * 0.5 + rand() * r * 0.75} width={r * 0.52} height={r * 0.16} rx={r * 0.05} fill={i % 2 ? "#c48a4a" : "#b47638"} transform={`rotate(${Math.round(rand() * 90 - 45)} ${cx} ${cy})`} />
        ));
      case 5: // 깍두기
        return Array.from({ length: 7 }, (_, i) => {
          const x = cx + (rand() - 0.5) * r * 0.8;
          const y = cy + (rand() - 0.5) * r * 0.8;
          const s = r * 0.26;
          return <rect key={i} x={x - s / 2} y={y - s / 2} width={s} height={s} rx={s * 0.2} fill={i % 2 ? "#e9784f" : "#d9573a"} transform={`rotate(${Math.round(rand() * 60)} ${x} ${y})`} />;
        });
      default: // 콩자반
        return Array.from({ length: 22 }, (_, i) => {
          const a = rand() * Math.PI * 2;
          const d = Math.sqrt(rand()) * r * 0.6;
          return <ellipse key={i} cx={cx + Math.cos(a) * d} cy={cy + Math.sin(a) * d} rx={r * 0.11} ry={r * 0.085} fill={i % 4 ? "#2b2420" : "#4a3a30"} />;
        });
    }
  })();
  return (
    <Dish cx={cx} cy={cy} r={r}>
      {inner}
    </Dish>
  );
}

/* ---------- 장면들 ---------- */

/** 히어로: 위에서 내려다본 한 상 */
function TableScene() {
  const banchan: [number, number, number][] = [
    [92, 92, 0],
    [205, 62, 1],
    [508, 78, 2],
    [548, 196, 3],
    [520, 330, 4],
    [76, 230, 5],
    [96, 372, 6],
  ];
  return (
    <svg viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="tray" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6cfa8" />
          <stop offset="1" stopColor="#d6b98b" />
        </linearGradient>
      </defs>
      <rect width="640" height="480" fill="url(#tray)" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M0,${30 + i * 55} C160,${20 + i * 55} 420,${48 + i * 55} 640,${28 + i * 55}`} stroke="#c9a676" strokeWidth={2} fill="none" opacity={0.45} />
      ))}
      {banchan.map(([x, y, k]) => (
        <Banchan key={k} kind={k} cx={x} cy={y} r={44} seed={k * 17 + 3} />
      ))}
      {/* 쌈채소 */}
      <Lettuce cx={352} cy={92} rx={92} ry={56} rot={-0.25} seed={1} />
      <Lettuce cx={312} cy={120} rx={70} ry={44} rot={0.35} seed={2} dark />
      <Lettuce cx={408} cy={130} rx={78} ry={48} rot={0.15} seed={3} />
      {/* 제육 */}
      <Dish cx={316} cy={262} r={112}>
        <PorkPile cx={316} cy={262} r={96} seed={7} />
      </Dish>
      {/* 우렁쌈장 */}
      <Ssamjang cx={452} cy={410} r={46} />
      {/* 밥 */}
      <Dish cx={210} cy={402} r={58}>
        <circle cx={210} cy={402} r={46} fill={C.rice} />
        <RiceGrains cx={210} cy={402} r={42} seed={11} />
      </Dish>
      {/* 수저 */}
      <g transform="rotate(-8 600 420)">
        <rect x={586} y={300} width={9} height={170} rx={4} fill="#b9b2a8" />
        <ellipse cx={590} cy={300} rx={18} ry={26} fill="#cfc8bd" />
        <rect x={606} y={290} width={6} height={180} rx={3} fill="#b9b2a8" />
        <rect x={617} y={290} width={6} height={180} rx={3} fill="#a9a196" />
      </g>
    </svg>
  );
}

function SsamScene() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <Lettuce cx={210} cy={170} rx={150} ry={96} rot={-0.12} seed={4} />
      <Lettuce cx={190} cy={160} rx={110} ry={70} rot={0.2} seed={5} dark />
      <ellipse cx={196} cy={154} rx={56} ry={36} fill={C.rice} />
      <RiceGrains cx={196} cy={154} r={34} seed={21} count={24} />
      <PorkPile cx={214} cy={150} r={70} seed={9} />
      <path d={blob(250, 112, 26, 18, 5, 0.12, 0.4)} fill={C.doenjang} />
      <path d={blob(244, 106, 11, 6, 3, 0.1, 0.4)} fill={C.doenjangHi} />
      <circle cx={258} cy={116} r={5} fill="#5c3b1d" />
    </svg>
  );
}

function SotbapScene() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* 숭늉 */}
      <ellipse cx={322} cy={206} rx={52} ry={50} fill={C.dishShadow} />
      <circle cx={316} cy={200} r={50} fill={C.dish} stroke={C.dishRim} strokeWidth={3} />
      <circle cx={316} cy={200} r={38} fill="#e9d6ae" />
      <circle cx={316} cy={200} r={38} fill="none" stroke="#d8bf8f" strokeWidth={3} />
      <RiceGrains cx={316} cy={200} r={26} seed={31} count={10} color="#f6ecd6" />
      <Steam x={316} y={130} s={0.7} />
      {/* 돌솥 */}
      <ellipse cx={178} cy={164} rx={120} ry={118} fill="rgba(40,30,25,.22)" />
      <circle cx={170} cy={154} r={116} fill={C.stone} />
      <circle cx={170} cy={154} r={116} fill="none" stroke={C.stoneHi} strokeWidth={6} />
      <rect x={30} y={140} width={30} height={28} rx={8} fill={C.stone} />
      <rect x={280} y={140} width={30} height={28} rx={8} fill={C.stone} />
      <circle cx={170} cy={154} r={92} fill="#c48b4a" />
      <circle cx={170} cy={154} r={84} fill={C.rice} />
      <RiceGrains cx={170} cy={154} r={80} seed={33} count={70} />
      <Steam x={170} y={90} s={1} />
    </svg>
  );
}

function StewScene() {
  const rand = rng(41);
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx={208} cy={162} rx={160} ry={130} fill="rgba(60,30,15,.2)" />
      <rect x={18} y={136} width={40} height={28} rx={10} fill={C.onggi} />
      <rect x={342} y={136} width={40} height={28} rx={10} fill={C.onggi} />
      <ellipse cx={200} cy={150} rx={154} ry={126} fill={C.onggi} />
      <ellipse cx={200} cy={150} rx={154} ry={126} fill="none" stroke={C.onggiHi} strokeWidth={6} />
      <ellipse cx={200} cy={150} rx={132} ry={106} fill={C.sauce} />
      <ellipse cx={170} cy={120} rx={60} ry={30} fill="#d9583a" opacity={0.6} />
      {/* 닭 */}
      {[
        [150, 140, 0.4],
        [236, 118, -0.3],
        [214, 190, 0.9],
        [120, 198, -0.6],
        [282, 170, 0.2],
      ].map(([x, y, r], i) => (
        <g key={i}>
          <path d={blob(x, y, 34, 22, 5, 0.1, r)} fill="#c97c45" />
          <path d={blob(x - 6, y - 5, 16, 8, 3, 0.1, r)} fill="#e0a067" opacity={0.8} />
        </g>
      ))}
      {/* 감자·당근 */}
      {[
        [190, 150],
        [262, 214],
        [98, 160],
      ].map(([x, y], i) => (
        <path key={`p${i}`} d={blob(x, y, 20, 16, 4, 0.1, i)} fill="#f0c766" />
      ))}
      {[
        [176, 208],
        [300, 132],
        [140, 96],
      ].map(([x, y], i) => (
        <path key={`c${i}`} d={blob(x, y, 14, 9, 3, 0.08, i * 2)} fill="#ec8a3c" />
      ))}
      {/* 대파 */}
      {Array.from({ length: 12 }, (_, i) => (
        <circle key={`g${i}`} cx={90 + rand() * 220} cy={70 + rand() * 160} r={6} fill="none" stroke="#6fae4e" strokeWidth={4} />
      ))}
      <Steam x={200} y={60} s={0.9} />
    </svg>
  );
}

function BraiseScene() {
  const rand = rng(51);
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="galchi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9eef2" />
          <stop offset="0.5" stopColor="#b8c2cb" />
          <stop offset="1" stopColor="#d6dde3" />
        </linearGradient>
      </defs>
      <ellipse cx={208} cy={162} rx={176} ry={118} fill="rgba(60,30,15,.2)" />
      <ellipse cx={200} cy={152} rx={176} ry={116} fill={C.stone} />
      <ellipse cx={200} cy={152} rx={176} ry={116} fill="none" stroke={C.stoneHi} strokeWidth={5} />
      <ellipse cx={200} cy={152} rx={154} ry={96} fill={C.sauceDeep} />
      <ellipse cx={180} cy={130} rx={90} ry={40} fill={C.sauce} opacity={0.75} />
      {/* 무 */}
      {[
        [126, 178, -12],
        [268, 104, 8],
        [232, 196, 20],
      ].map(([x, y, r], i) => (
        <rect key={`m${i}`} x={x - 30} y={y - 22} width={60} height={44} rx={8} fill="#e8b98a" stroke="#c98a55" strokeWidth={3} transform={`rotate(${r} ${x} ${y})`} />
      ))}
      {/* 갈치 토막 */}
      {[
        [140, 120, -18],
        [206, 146, 6],
        [276, 170, -8],
        [190, 92, 14],
      ].map(([x, y, r], i) => (
        <g key={`f${i}`} transform={`rotate(${r} ${x} ${y})`}>
          <rect x={x - 38} y={y - 15} width={76} height={30} rx={8} fill="url(#galchi)" />
          <rect x={x - 38} y={y - 2} width={76} height={4} fill="#9aa5ae" opacity={0.7} />
          <rect x={x - 38} y={y - 15} width={76} height={30} rx={8} fill={C.sauce} opacity={0.28} />
        </g>
      ))}
      {/* 고추·파 */}
      {Array.from({ length: 10 }, (_, i) => (
        <ellipse key={`c${i}`} cx={70 + rand() * 260} cy={78 + rand() * 150} rx={7} ry={5} fill={i % 2 ? "#4d9a3a" : "#d8341e"} stroke={i % 2 ? "#2f6a22" : "#9c2214"} strokeWidth={2} />
      ))}
      <Steam x={200} y={58} s={0.8} />
    </svg>
  );
}

export const backgrounds: Record<IllustrationName, string> = {
  table: "linear-gradient(135deg,#e6cfa8,#d6b98b)",
  ssam: "radial-gradient(120% 90% at 30% 20%,#f4f1df 0%,#e3ecd2 60%,#d3e3bf 100%)",
  sotbap: "radial-gradient(120% 90% at 30% 20%,#f8efe0 0%,#eedfc6 60%,#e3cfae 100%)",
  stew: "radial-gradient(120% 90% at 30% 20%,#fbeee3 0%,#f3dccb 60%,#ebcab2 100%)",
  braise: "radial-gradient(120% 90% at 30% 20%,#f6efe6 0%,#ecdccc 60%,#e2cbb6 100%)",
};

export const scenes: Record<IllustrationName, () => React.JSX.Element> = {
  table: TableScene,
  ssam: SsamScene,
  sotbap: SotbapScene,
  stew: StewScene,
  braise: BraiseScene,
};
