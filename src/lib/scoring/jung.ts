import type { Scores } from "@/lib/types";

export type Attitude = "E" | "I";
export type Func = "S" | "N" | "T" | "F";

export interface JungTypeResultData {
  attitude: Attitude;
  attitudeBalanced: boolean;
  perception: Func; // S 또는 N
  judgment: Func; // T 또는 F
  /** 선호가 더 뚜렷한 쪽 기능. 두 기능의 뚜렷함이 같으면 null */
  dominant: Func | null;
}

/**
 * 융의 심리유형: 태도(외향/내향) × 주기능(감각·직관·사고·감정) = 8유형.
 * 점수는 EI=E쪽, SN=S쪽, TF=T쪽 선호도(0~100).
 * 주기능은 지각 기능(S/N)과 판단 기능(T/F) 중 선호가 더 뚜렷한 쪽으로 정한다.
 */
export function jungType(
  s: Scores,
  opts: { knowStrength: boolean } = { knowStrength: true },
): JungTypeResultData {
  const attitude: Attitude = s.EI >= 50 ? "E" : "I";
  const perception: Func = s.SN >= 50 ? "S" : "N";
  const judgment: Func = s.TF >= 50 ? "T" : "F";
  const p = Math.abs(s.SN - 50);
  const j = Math.abs(s.TF - 50);
  const dominant: Func | null =
    !opts.knowStrength || p === j ? null : p > j ? perception : judgment;
  return {
    attitude,
    attitudeBalanced: opts.knowStrength && s.EI >= 45 && s.EI <= 55,
    perception,
    judgment,
    dominant,
  };
}
