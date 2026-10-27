import type { Item } from "@/lib/types";

/** [부호, 문장] 목록에서 문항 배열을 만든다. "+" 정방향, "-" 역방향. */
export function build(
  prefix: string,
  scale: string,
  rows: [("+" | "-"), string, string?][],
): Item[] {
  return rows.map(([sign, text, tag], i) => ({
    id: `${prefix}-${scale}-${i + 1}`,
    text,
    scale,
    reverse: sign === "-",
    ...(tag ? { tag } : {}),
  }));
}
