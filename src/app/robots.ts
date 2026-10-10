import type { MetadataRoute } from "next";
import { isDemo, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

/** 링크 미리보기 봇 (검색엔진 아님) — 막으면 카톡·문자로 보낸 링크에 미리보기가 안 뜸 */
const previewBots = ["kakaotalk-scrap", "facebookexternalhit", "Twitterbot", "Slackbot-LinkExpanding", "TelegramBot", "Discordbot"];

export default function robots(): MetadataRoute.Robots {
  if (isDemo) {
    return {
      rules: [
        { userAgent: previewBots, allow: "/" },
        { userAgent: "*", disallow: "/" },
      ],
    };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
