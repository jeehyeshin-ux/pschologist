import type { Scores } from "@/lib/types";

const LEVEL_VALUE = { low: 15, mid: 50, high: 85 } as const;

/** 기질 직접 입력(낮음/중간/높음) → 척도 대표값 */
export function temperamentFromInput(
  input: Record<string, string>,
): Scores {
  const out: Scores = {};
  for (const [k, v] of Object.entries(input)) {
    out[k] = LEVEL_VALUE[v as keyof typeof LEVEL_VALUE];
  }
  return out;
}

/** 4글자 직접 입력 → 방향만 있는 값(70/30). 강도는 알 수 없다. */
export function jungFromLetters(input: Record<string, string>): Scores {
  const poleHigh = { EI: "E", SN: "S", TF: "T", JP: "J" } as const;
  const out: Scores = {};
  for (const k of Object.keys(poleHigh) as (keyof typeof poleHigh)[]) {
    out[k] = input[k] === poleHigh[k] ? 70 : 30;
  }
  return out;
}
