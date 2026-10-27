import { describe, expect, it } from "vitest";
import { classify } from "./classify";
import type { Scores, StoredResult, TestId } from "@/lib/types";

const r = (
  testId: TestId,
  scores: Scores,
  source: "test" | "input" = "test",
): StoredResult => ({ testId, scores, source, at: 0 });

const temp = (v: Partial<Scores> = {}): Scores => ({
  NS: 50, HA: 50, RD: 50, PS: 50, SD: 50, CO: 50, ST: 50, ...v,
});

describe("classify", () => {
  it("검사가 없으면 모든 축이 미정", () => {
    const c = classify([]);
    expect(c.resolved).toBe(0);
    expect(c.index).toBeNull();
  });

  it("기질 하나로 세 축이 정해진다 (탐색·관계·성찰 = 7)", () => {
    const c = classify([
      r("temperament", temp({ NS: 90, HA: 10, RD: 90, CO: 90, ST: 90, SD: 90 })),
    ]);
    expect(c.resolved).toBe(3);
    expect(c.index).toBe(7);
  });

  it("숙고·원칙·현실 = 0", () => {
    const c = classify([
      r("temperament", temp({ NS: 10, HA: 90, RD: 10, CO: 10, ST: 10, SD: 10 })),
    ]);
    expect(c.index).toBe(0);
  });

  it("마음의 구조만 하면 A·B만 정해지고 정밀도 낮음", () => {
    const c = classify([r("freud", { id: 80, ego: 50, superego: 20 })]);
    expect(c.resolved).toBe(2);
    expect(c.index).toBeNull();
    expect(c.axes.A.lowPrecision).toBe(true);
    expect(c.axes.C.value).toBeNull();
  });

  it("출생순위는 축에 기여하지 않는다", () => {
    const c = classify([
      { testId: "adler", scores: {}, source: "input", at: 0 },
    ]);
    expect(c.resolved).toBe(0);
  });

  it("경계 축은 이웃 캐릭터를 만든다", () => {
    // A = mean(50, 50) = 50 → 경계, 높은 쪽(탐색)
    const c = classify([
      r("temperament", temp({ RD: 90, CO: 90, ST: 90, SD: 90 })),
    ]);
    expect(c.index).toBe(7);
    expect(c.neighbors).toEqual([3]);
  });

  it("검사가 추가되면 가중 평균으로 갱신된다", () => {
    const base = r("temperament", temp({ NS: 100, HA: 0 })); // A = 100
    const before = classify([base]).axes.A.value!;
    const after = classify([base, r("freud", { id: 0, ego: 50, superego: 50 })]).axes.A.value!;
    expect(before).toBe(100);
    // (100*1 + 0*0.5) / 1.5
    expect(after).toBeCloseTo(66.67, 1);
  });

  it("직접 입력은 가중치가 절반", () => {
    const c = classify([
      r("jung-type", { EI: 70, SN: 30, TF: 70, JP: 70 }, "input"),
    ]);
    expect(c.axes.A.weightSum).toBe(0.5);
    expect(c.axes.A.lowPrecision).toBe(true);
  });

  it("필수 척도가 빠진 결과는 무시한다", () => {
    expect(classify([r("temperament", { NS: 50 })]).resolved).toBe(0);
  });
});
