import type { StoredResult } from "@/lib/types";
import { type AxisKey, contributionsOf } from "./axes";

export interface AxisState {
  axis: AxisKey;
  /** 기여 검사가 없으면 null (미정) */
  value: number | null;
  weightSum: number;
  /** 45~55 */
  borderline: boolean;
  /** 총 가중치 1 미만 */
  lowPrecision: boolean;
  high: boolean | null;
}

export interface Classification {
  axes: Record<AxisKey, AxisState>;
  resolved: number;
  /** 세 축이 모두 정해졌을 때의 캐릭터 인덱스 (0~7) */
  index: number | null;
  /** 경계 축을 뒤집었을 때의 이웃 캐릭터 인덱스 */
  neighbors: number[];
}

const BIT: Record<AxisKey, number> = { A: 4, B: 2, C: 1 };

export function classify(results: StoredResult[]): Classification {
  const all = results.flatMap(contributionsOf);
  const axes = {} as Record<AxisKey, AxisState>;
  for (const axis of ["A", "B", "C"] as AxisKey[]) {
    const list = all.filter((c) => c.axis === axis);
    const weightSum = list.reduce((a, c) => a + c.weight, 0);
    const value =
      weightSum > 0
        ? list.reduce((a, c) => a + c.value * c.weight, 0) / weightSum
        : null;
    axes[axis] = {
      axis,
      value,
      weightSum,
      borderline: value !== null && value >= 45 && value <= 55,
      lowPrecision: value !== null && weightSum < 1,
      high: value === null ? null : value >= 50,
    };
  }
  const states = Object.values(axes);
  const resolved = states.filter((s) => s.value !== null).length;
  let index: number | null = null;
  const neighbors: number[] = [];
  if (resolved === 3) {
    index = states.reduce((a, s) => a + (s.high ? BIT[s.axis] : 0), 0);
    for (const s of states) {
      if (s.borderline) neighbors.push(index ^ BIT[s.axis]);
    }
  }
  return { axes, resolved, index, neighbors };
}
