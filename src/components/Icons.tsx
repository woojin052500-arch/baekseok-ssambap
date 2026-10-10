import type { ReasonIcon } from "@/lib/types";

type P = { className?: string };
const base = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const PhoneIcon = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

export const NavIcon = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M3 11 22 2l-9 19-2-8-8-2z" />
  </svg>
);

export const PinIcon = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const CopyIcon = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}>
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

export const CheckIcon = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const ClockIcon = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

export const UsersIcon = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
  </svg>
);

export const StarIcon = ({ className = "size-4" }: P) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="currentColor" d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
  </svg>
);

export const ArrowIcon = ({ className = "size-4" }: P) => (
  <svg {...base} className={className}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

/* 이 집이 좋은 이유 아이콘 */
const reasonPaths: Record<ReasonIcon, React.ReactNode> = {
  banchan: (
    <>
      <circle cx="6" cy="7" r="3" />
      <circle cx="12" cy="5.5" r="2.5" />
      <circle cx="18" cy="7" r="3" />
      <circle cx="5.5" cy="15" r="2.5" />
      <circle cx="18.5" cy="15" r="2.5" />
      <circle cx="12" cy="13" r="3.2" />
      <circle cx="12" cy="20" r="2" />
    </>
  ),
  pot: (
    <>
      <path d="M8 3c-1 1 1 2 0 3M12 2c-1 1 1 2 0 3M16 3c-1 1 1 2 0 3" />
      <path d="M3 10h18v2a7 7 0 0 1-7 7h-4a7 7 0 0 1-7-7z" />
      <path d="M1.5 11.5H3M21 11.5h1.5M9 21h6" />
    </>
  ),
  hands: (
    <>
      <path d="M12 21s-7.5-4.6-9.2-9.3A4.8 4.8 0 0 1 12 6.6a4.8 4.8 0 0 1 9.2 5.1C19.5 16.4 12 21 12 21z" />
      <path d="M8.5 12.5c1 1.5 2.2 2 3.5 2s2.5-.5 3.5-2" />
    </>
  ),
};

export const ReasonGlyph = ({ name, className = "size-7" }: P & { name: ReasonIcon }) => (
  <svg {...base} strokeWidth={1.7} className={className}>
    {reasonPaths[name]}
  </svg>
);
