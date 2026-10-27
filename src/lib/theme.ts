import type { TestId } from "@/lib/types";

export type Tone = "paper" | "pink" | "yellow" | "blue" | "violet" | "ink" | "white";

/** Tailwind 정적 클래스 + 같은 색의 CSS 값(하단 고정 영역 배경용) */
export const TONES: Record<Tone, { cls: string; bg: string }> = {
  paper: { cls: "bg-paper text-ink", bg: "#f2f3f7" },
  white: { cls: "bg-white text-ink", bg: "#ffffff" },
  pink: { cls: "bg-pink text-ink", bg: "#ff4fa3" },
  yellow: { cls: "bg-yellow text-ink", bg: "#ffe600" },
  blue: { cls: "bg-blue text-white", bg: "#2d5bff" },
  violet: { cls: "bg-violet text-white", bg: "#6a2be6" },
  ink: { cls: "bg-ink text-yellow", bg: "#17102e" },
};

export type Pose = "wave" | "present" | "point" | "think" | "light" | "cheer";

export const TEST_THEME: Record<TestId, { tone: Tone; pose: Pose }> = {
  temperament: { tone: "pink", pose: "wave" },
  adler: { tone: "yellow", pose: "present" },
  "jung-type": { tone: "blue", pose: "point" },
  freud: { tone: "violet", pose: "think" },
  "jung-analytic": { tone: "ink", pose: "light" },
};
