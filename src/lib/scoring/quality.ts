import type { Answers, Item } from "@/lib/types";

export type QualityFlag = "straight" | "middle" | "fast";

/** 문항당 평균 응답 시간이 이보다 짧으면 읽고 답했다고 보기 어렵다. */
export const MIN_MS_PER_ITEM = 2000;
/** 같은 값이 이 비율 이상이면 한쪽으로 몰린 응답으로 본다. */
export const SAME_RATIO = 0.85;

/**
 * 성의 없는 응답을 걸러 내는 순수 함수. 채점과 분리돼 있다.
 * - straight: 한 가지 값이 85% 이상 (전부 같은 칸 누르기)
 * - middle: '보통이에요'(3)가 85% 이상 (답을 피함)
 * - fast: 문항당 평균 2초 미만 (elapsedMs가 주어진 경우만)
 */
export function checkQuality(
  items: Item[],
  answers: Answers,
  elapsedMs?: number,
): QualityFlag[] {
  const values = items.map((i) => answers[i.id]).filter((v) => Number.isInteger(v));
  const n = values.length;
  if (n === 0) return [];
  const flags: QualityFlag[] = [];
  const counts = [0, 0, 0, 0, 0, 0];
  for (const v of values) counts[v] += 1;
  if (counts[3] / n >= SAME_RATIO) flags.push("middle");
  else if (Math.max(...counts) / n >= SAME_RATIO) flags.push("straight");
  if (elapsedMs !== undefined && elapsedMs / n < MIN_MS_PER_ITEM) flags.push("fast");
  return flags;
}
