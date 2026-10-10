import { ImageResponse } from "next/og";
import { business } from "@/content/business";
import { scenes } from "@/components/Illustrations";
import { ogFonts } from "@/lib/ogFonts";

export const dynamic = "force-static";

/** 카톡·문자 링크 미리보기 이미지 1200×630 (상호 + 한 줄 카피) → /og.png */
export async function GET() {
  // 히어로와 같은 상차림 일러스트를 오른쪽에 배치
  const { renderToStaticMarkup } = await import("react-dom/server.edge");
  const Table = scenes.table;
  const illus = `data:image/svg+xml;base64,${Buffer.from(renderToStaticMarkup(<Table />)).toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#faf6ee", fontFamily: "Pretendard", position: "relative" }}>
        {/* 오른쪽 상차림 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={illus} width={560} height={420} alt="" style={{ position: "absolute", right: 48, top: 105, borderRadius: 36, boxShadow: "0 24px 48px rgba(92,62,32,.3)" }} />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 72px", width: 600 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              fontSize: 30,
              fontWeight: 600,
              color: "#6c4520",
              background: "#f0e3cf",
              padding: "10px 24px",
              borderRadius: 40,
            }}
          >
            {business.hero.kicker}
          </div>
          <div style={{ fontSize: 124, fontWeight: 800, color: "#2a221c", letterSpacing: -4, marginTop: 28, lineHeight: 1.05 }}>{business.name}</div>
          <div style={{ fontSize: 50, fontWeight: 800, color: business.themeColor, marginTop: 18, letterSpacing: -1.5 }}>{business.hero.tagline}</div>
          <div style={{ fontSize: 30, fontWeight: 600, color: "#5d5046", marginTop: 44, display: "flex" }}>
            {business.phone}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: await ogFonts() },
  );
}
