import type { Item } from "@/lib/types";

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * 척도마다 순서를 섞은 뒤 척도끼리 번갈아 배치한다.
 * 시드가 같으면 항상 같은 순서이고, 마지막에 한 척도만 남는 경우를 빼면
 * 같은 척도 문항이 연달아 나오지 않는다.
 */
export function interleave(items: Item[], seed: string): Item[] {
  const groups = new Map<string, Item[]>();
  for (const it of items) {
    const g = groups.get(it.scale) ?? [];
    g.push(it);
    groups.set(it.scale, g);
  }
  const lists = [...groups.entries()].map(([scale, list]) => {
    const rand = mulberry32(hash(`${seed}:${scale}`));
    const a = [...list];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  });
  const out: Item[] = [];
  const longest = Math.max(...lists.map((l) => l.length));
  for (let r = 0; r < longest; r++) {
    for (const l of lists) if (r < l.length) out.push(l[r]);
  }
  return out;
}
