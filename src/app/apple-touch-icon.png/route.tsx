import { ImageResponse } from "next/og";
import { business } from "@/content/business";
import { ogFonts } from "@/lib/ogFonts";

export const dynamic = "force-static";

/** 아이콘: 상호 첫 글자 (180×180) → /apple-touch-icon.png */
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
          borderRadius: 0,
          color: "#fff",
          fontSize: 112,
          fontWeight: 800,
          fontFamily: "Pretendard",
        }}
      >
        {business.name.slice(0, 1)}
      </div>
    ),
    { width: 180, height: 180, fonts: await ogFonts() },
  );
}
