import { describe, expect, it } from "vitest";
import { characters } from "./characters";

const bits = (n: number) => n.toString(2).split("1").length - 1;

describe("캐릭터 데이터", () => {
  it("0~7이 하나씩 있다", () => {
    expect(characters.map((c) => c.index).sort()).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
  });
  it("이름이 모두 다르다", () => {
    expect(new Set(characters.map((c) => c.name)).size).toBe(8);
  });
  it("강점 3, 약점 3, 장면 3, 어울림 2, 어긋남 2", () => {
    for (const c of characters) {
      expect([c.strengths.length, c.weaknesses.length, c.scenes.length]).toEqual([3, 3, 3]);
      expect([c.match.length, c.clash.length]).toEqual([2, 2]);
    }
  });
  it("어울림은 방향 하나만 다르고, 어긋남은 둘 이상 다르다", () => {
    for (const c of characters) {
      for (const m of c.match) expect(bits(c.index ^ m.index)).toBe(1);
      for (const m of c.clash) expect(bits(c.index ^ m.index)).toBeGreaterThanOrEqual(2);
    }
  });
  it("궁합은 서로 대칭이다", () => {
    for (const c of characters) {
      for (const m of c.match) {
        const other = characters.find((x) => x.index === m.index)!;
        expect(other.match.some((r) => r.index === c.index)).toBe(true);
      }
      for (const m of c.clash) {
        const other = characters.find((x) => x.index === m.index)!;
        expect(other.clash.some((r) => r.index === c.index)).toBe(true);
      }
    }
  });
});
