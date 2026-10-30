import { describe, expect, it } from "vitest";
import { temperamentItems } from "@/data/items/temperament";
import { checkQuality } from "./quality";

const fill = (v: number) => Object.fromEntries(temperamentItems.map((i) => [i.id, v]));
const alternate = Object.fromEntries(
  temperamentItems.map((i, k) => [i.id, [2, 4, 3, 5, 1][k % 5]]),
);

describe("checkQuality", () => {
  it("전부 같은 값이면 straight", () => {
    expect(checkQuality(temperamentItems, fill(5))).toEqual(["straight"]);
  });
  it("전부 3이면 middle", () => {
    expect(checkQuality(temperamentItems, fill(3))).toEqual(["middle"]);
  });
  it("골고루 답하면 통과", () => {
    expect(checkQuality(temperamentItems, alternate, 48 * 6000)).toEqual([]);
  });
  it("문항당 2초 미만이면 fast", () => {
    expect(checkQuality(temperamentItems, alternate, 48 * 1200)).toEqual(["fast"]);
  });
  it("시간 정보가 없으면 fast는 판정하지 않는다", () => {
    expect(checkQuality(temperamentItems, alternate)).toEqual([]);
  });
  it("85% 경계: 41/48은 걸리고 40/48은 안 걸린다", () => {
    const mk = (same: number) =>
      Object.fromEntries(temperamentItems.map((i, k) => [i.id, k < same ? 4 : k % 2 ? 1 : 2]));
    expect(checkQuality(temperamentItems, mk(41))).toContain("straight");
    expect(checkQuality(temperamentItems, mk(40))).not.toContain("straight");
  });
});
