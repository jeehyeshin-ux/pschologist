import type { Scores, StoredResult, TestId } from "@/lib/types";

export type AxisKey = "A" | "B" | "C";

export interface Contribution {
  testId: TestId;
  axis: AxisKey;
  value: number;
  weight: number;
}

const mean = (...v: number[]) => v.reduce((a, b) => a + b, 0) / v.length;

/** 검사 종류별 기본 가중치 (docs/character.md §2). */
export const TEST_WEIGHT: Record<TestId, number> = {
  temperament: 1,
  "jung-type": 1,
  freud: 0.5,
  "jung-analytic": 0.5,
  adler: 0,
};

/** 직접 입력은 해상도가 낮아 가중치를 절반으로 줄인다. */
export const INPUT_WEIGHT_FACTOR = 0.5;

type Mapper = (s: Scores) => Partial<Record<AxisKey, number>>;

const MAPPERS: Partial<Record<TestId, Mapper>> = {
  temperament: (s) => ({
    A: mean(s.NS, 100 - s.HA),
    B: mean(s.RD, s.CO),
    C: mean(s.ST, s.SD),
  }),
  // EI=E쪽, SN=S쪽, TF=T쪽, JP=J쪽 선호도
  "jung-type": (s) => ({
    A: mean(s.EI, 100 - s.JP),
    B: 100 - s.TF,
    C: mean(100 - s.SN, 100 - s.EI),
  }),
  freud: (s) => ({ A: s.id, B: 100 - s.superego }),
  "jung-analytic": (s) => ({
    B: s.persona,
    C: mean(s.shadow, s.other),
  }),
};

function hasAll(s: Scores, keys: string[]) {
  return keys.every((k) => typeof s[k] === "number");
}

const REQUIRED: Partial<Record<TestId, string[]>> = {
  temperament: ["NS", "HA", "RD", "SD", "CO", "ST"],
  "jung-type": ["EI", "SN", "TF", "JP"],
  freud: ["id", "superego"],
  "jung-analytic": ["persona", "shadow", "other"],
};

export function contributionsOf(result: StoredResult): Contribution[] {
  if (result.unreliable) return [];
  const map = MAPPERS[result.testId];
  const required = REQUIRED[result.testId];
  if (!map || !required || !hasAll(result.scores, required)) return [];
  const base = TEST_WEIGHT[result.testId];
  const weight = result.source === "input" ? base * INPUT_WEIGHT_FACTOR : base;
  if (weight <= 0) return [];
  const mapped = map(result.scores);
  return (Object.keys(mapped) as AxisKey[]).map((axis) => ({
    testId: result.testId,
    axis,
    value: mapped[axis] as number,
    weight,
  }));
}
