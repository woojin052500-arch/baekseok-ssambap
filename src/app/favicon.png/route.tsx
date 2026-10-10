import { ImageResponse } from "next/og";
import { business } from "@/content/business";
import { ogFonts } from "@/lib/ogFonts";

export const dynamic = "force-static";

/** 아이콘: 상호 첫 글자 (64×64) → /favicon.png */
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: business.themeColor,
          borderRadius: 14,
          color: "#fff",
          fontSize: 42,
          fontWeight: 800,
          fontFamily: "Pretendard",
        }}
      >
        {business.name.slice(0, 1)}
      </div>
    ),
    { width: 64, height: 64, fonts: await ogFonts() },
  );
}
