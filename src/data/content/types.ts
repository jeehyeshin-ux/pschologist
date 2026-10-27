import type { Level } from "@/lib/types";

export interface ScaleInfo {
  key: string;
  name: string;
  /** 쉬운 풀이와 비유 (초등학생도 이해할 수 있는 수준) */
  easy: string;
  levels: Record<Level, string>;
}
