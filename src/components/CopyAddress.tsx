"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/Icons";

export function CopyAddress({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // 오래된 브라우저·http 환경 대비
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-12 items-center gap-2 rounded-xl border border-line bg-paper px-4 font-semibold text-ink transition hover:border-doenjang hover:bg-doenjang-soft"
    >
      {copied ? <CheckIcon className="size-5 text-ssam" /> : <CopyIcon className="size-5 text-doenjang" />}
      <span aria-live="polite">{copied ? "복사했어요" : "주소 복사"}</span>
    </button>
  );
}
