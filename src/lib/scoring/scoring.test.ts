import { describe, expect, it } from "vitest";
import { interleave } from "@/lib/order";
import { freudItems } from "@/data/items/freud";
import { jungAnalyticItems } from "@/data/items/jung-analytic";
import { jungTypeItems } from "@/data/items/jung-type";
import { temperamentItems } from "@/data/items/temperament";
import { levelOf, scoreScales, topScales } from "./index";
import type { Answers, Item } from "@/lib/types";

const fill = (items: Item[], v: number): Answers =>
  Object.fromEntries(items.map((i) => [i.id, v]));

describe("문항 데이터", () => {
  it("문항 수가 설계 문서와 같다", () => {
    expect(temperamentItems).toHaveLength(48);
    expect(jungTypeItems).toHaveLength(32);
    expect(freudItems).toHaveLength(36);
    expect(jungAnalyticItems).toHaveLength(34);
  });
  it("id가 유일하다", () => {
    const all = [
      ...temperamentItems,
      ...jungTypeItems,
      ...freudItems,
      ...jungAnalyticItems,
    ];
    expect(new Set(all.map((i) => i.id)).size).toBe(all.length);
  });
  it("척도마다 역방향 문항이 있다", () => {
    for (const items of [temperamentItems, jungTypeItems, freudItems, jungAnalyticItems]) {
      const scales = new Set(items.map((i) => i.scale));
      for (const s of scales) {
        expect(items.some((i) => i.scale === s && i.reverse)).toBe(true);
      }
    }
  });
});

describe("scoreScales", () => {
  it("전부 3이면 모든 척도가 50", () => {
    const s = scoreScales(temperamentItems, fill(temperamentItems, 3))!;
    expect(Object.values(s).every((v) => v === 50)).toBe(true);
  });
  it("전부 5이면 정/역방향 비율에 따라 계산된다", () => {
    const s = scoreScales(jungTypeItems, fill(jungTypeItems, 5))!;
    // 척도당 정방향 4, 역방향 4 → (4*5 + 4*1)/8 = 3 → 50
    expect(s.EI).toBe(50);
  });
  it("정방향만 5, 역방향은 1이면 100", () => {
    const answers = Object.fromEntries(
      temperamentItems.map((i) => [i.id, i.reverse ? 1 : 5]),
    );
    const s = scoreScales(temperamentItems, answers)!;
    expect(Object.values(s).every((v) => v === 100)).toBe(true);
  });
  it("반대로 답하면 0", () => {
    const answers = Object.fromEntries(
      temperamentItems.map((i) => [i.id, i.reverse ? 5 : 1]),
    );
    const s = scoreScales(temperamentItems, answers)!;
    expect(Object.values(s).every((v) => v === 0)).toBe(true);
  });
  it("누락이나 범위 밖 응답이면 null", () => {
    const a = fill(freudItems, 3);
    delete a[freudItems[0].id];
    expect(scoreScales(freudItems, a)).toBeNull();
    expect(scoreScales(freudItems, { ...fill(freudItems, 3), [freudItems[0].id]: 6 })).toBeNull();
  });
});

describe("levelOf", () => {
  it("경계값", () => {
    expect(levelOf(39)).toBe("low");
    expect(levelOf(40)).toBe("mid");
    expect(levelOf(60)).toBe("mid");
    expect(levelOf(61)).toBe("high");
  });
});

describe("topScales", () => {
  it("동점이면 모두 돌려준다", () => {
    expect(topScales({ a: 80, b: 80, c: 10 }, ["a", "b", "c"])).toEqual(["a", "b"]);
  });
});

describe("interleave", () => {
  it("같은 시드면 같은 순서, 문항 집합은 보존", () => {
    const a = interleave(temperamentItems, "t");
    const b = interleave(temperamentItems, "t");
    expect(a.map((i) => i.id)).toEqual(b.map((i) => i.id));
    expect(a).toHaveLength(temperamentItems.length);
  });
  it("같은 척도가 연달아 나오지 않는다", () => {
    for (const items of [temperamentItems, jungTypeItems, freudItems, jungAnalyticItems]) {
      const o = interleave(items, "x");
      for (let i = 1; i < o.length; i++) {
        expect(o[i].scale).not.toBe(o[i - 1].scale);
      }
    }
  });
});

import { jungType } from "./jung";

describe("jungType", () => {
  it("선호가 더 뚜렷한 기능이 주기능", () => {
    const t = jungType({ EI: 20, SN: 30, TF: 90, JP: 50 });
    expect(t).toMatchObject({ attitude: "I", perception: "N", judgment: "T", dominant: "T" });
  });
  it("뚜렷함이 같으면 주기능 없음", () => {
    expect(jungType({ EI: 70, SN: 70, TF: 30, JP: 50 }).dominant).toBeNull();
  });
  it("직접 입력은 주기능을 정하지 않는다", () => {
    expect(jungType({ EI: 70, SN: 30, TF: 70, JP: 70 }, { knowStrength: false }).dominant).toBeNull();
  });
});
