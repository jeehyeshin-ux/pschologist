import type { Answers, Item, Level, Scores } from "@/lib/types";

/** 응답 한 개를 정방향 기준 1~5점으로 바꾼다. */
export function itemPoint(item: Item, answer: number): number {
  return item.reverse ? 6 - answer : answer;
}

/**
 * 척도별 점수(0~100)를 계산한다. 응답이 하나라도 없거나 1~5 밖이면 null.
 * 문항 데이터와 분리된 순수 함수다.
 */
export function scoreScales(items: Item[], answers: Answers): Scores | null {
  const sums: Record<string, { total: number; n: number }> = {};
  for (const item of items) {
    const a = answers[item.id];
    if (!Number.isInteger(a) || a < 1 || a > 5) return null;
    const s = (sums[item.scale] ??= { total: 0, n: 0 });
    s.total += itemPoint(item, a);
    s.n += 1;
  }
  const scores: Scores = {};
  for (const [scale, { total, n }] of Object.entries(sums)) {
    scores[scale] = Math.round(((total / n - 1) / 4) * 100);
  }
  return scores;
}

/** 0~39 낮음, 40~60 중간, 61~100 높음 (규준 없이 척도 중간 기준). */
export function levelOf(score: number): Level {
  if (score < 40) return "low";
  if (score <= 60) return "mid";
  return "high";
}

export const LEVEL_LABEL: Record<Level, string> = {
  low: "낮은 편",
  mid: "중간",
  high: "높은 편",
};

/** 원형 중 점수가 가장 높은 것(동점이면 모두). */
export function topScales(scores: Scores, keys: readonly string[]): string[] {
  const max = Math.max(...keys.map((k) => scores[k] ?? -1));
  return keys.filter((k) => scores[k] === max);
}
