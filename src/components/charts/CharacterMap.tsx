import { characters } from "@/data/content/characters";

/**
 * 8개 캐릭터 지도. 열 = 움직임(A)·판단 중심(B) 조합, 행 = 마음의 방향(C).
 * 현재 캐릭터는 채움, 이웃 캐릭터는 윤곽선으로 표시한다.
 */
export function CharacterMap({
  current,
  neighbors,
}: {
  current: number | null;
  neighbors: number[];
}) {
  const cols = [
    { label: "탐색·관계", a: 4, b: 2 },
    { label: "탐색·원칙", a: 4, b: 0 },
    { label: "숙고·관계", a: 0, b: 2 },
    { label: "숙고·원칙", a: 0, b: 0 },
  ];
  const rows = [
    { label: "성찰", c: 1 },
    { label: "현실", c: 0 },
  ];
  const nameOf = (i: number) => characters.find((c) => c.index === i)?.name ?? "";
  return (
    <div role="group" aria-label="8개 캐릭터 지도">
      <div className="grid grid-cols-[2.75rem_repeat(4,1fr)] gap-1.5">
        <div />
        {cols.map((c) => (
          <div key={c.label} className="pb-1 text-center text-[13px] font-black">
            {c.label}
          </div>
        ))}
        {rows.map((r) => (
          <div key={r.label} className="contents">
            <div className="flex items-center text-[13px] font-black">
              {r.label}
            </div>
            {cols.map((c) => {
              const idx = c.a + c.b + r.c;
              const isCur = idx === current;
              const isNb = neighbors.includes(idx);
              return (
                <div
                  key={idx}
                  aria-current={isCur ? "true" : undefined}
                  className={`flex min-h-16 items-center justify-center border-[3px] px-1 text-center text-[13px] font-black leading-tight ${
                    isCur
                      ? "border-ink bg-yellow text-ink shadow-[4px_4px_0_var(--ink)]"
                      : isNb
                        ? "border-ink border-dashed bg-white text-ink"
                        : "border-ink/25 bg-white text-ink/70"
                  }`}
                >
                  {nameOf(idx)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
