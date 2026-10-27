"use client";

import { Card, Easy } from "@/components/ui";
import { adlerCore, adlerNotes, adlerPositions, adlerSources } from "@/data/content/adler";
import type { StoredResult } from "@/lib/types";
import { ResultFrame } from "./Frame";

export function AdlerResult({ result }: { result: StoredResult }) {
  const data = result.adler;
  if (!data) return null;
  const p = adlerPositions[data.position];
  const notes = adlerNotes.filter((n) => data.notes.includes(n.key));
  return (
    <ResultFrame
      testId="adler"
      result={result}
      lead="형제 사이의 자리에 대한 아들러의 이야기예요. 재미있는 관점으로 가볍게 읽어 주세요."
      sources={adlerSources}
    >
      <Card>
        <p className="font-mono text-sm font-medium">
          {data.siblings === 1 ? "외동" : `${data.siblings >= 5 ? "5명 이상" : `${data.siblings}명`} 중 ${p.label}`}
        </p>
        <h2 className="mt-1 font-display text-[32px] leading-[1.1]">{p.nick}</h2>
        <p className="mt-4 text-base leading-relaxed">{p.story}</p>
        <Easy label="아들러는 누구예요?">
          알프레드 아들러는 오스트리아의 정신과 의사로, 프로이트와 함께 공부하다가 자기만의 길을 걸어간 심리학자예요. 사람은 가족과 사회 안에서 서로 이어져 자란다고 생각했어요.
        </Easy>
      </Card>

      <Card delay={80}>
        <h3 className="font-display text-[24px] leading-tight">이 자리에서 자랄 수 있는 힘</h3>
        <p className="mt-2 text-base leading-relaxed">{p.good}</p>
        <h3 className="mt-5 font-display text-[24px] leading-tight">이 자리에서 어려울 수 있는 점</h3>
        <p className="mt-2 text-base leading-relaxed">{p.hard}</p>
        <h3 className="mt-5 font-display text-[24px] leading-tight">흔한 오해</h3>
        <p className="mt-2 text-base leading-relaxed">{p.misunderstand}</p>
      </Card>

      <Card delay={160}>
        <h3 className="font-display text-[24px] leading-tight">가장 중요한 한 가지</h3>
        <p className="mt-2 text-base leading-relaxed">{adlerCore}</p>
      </Card>

      {notes.length > 0 && (
        <Card delay={240}>
          <h3 className="font-display text-[24px] leading-tight">내 가정에 맞춰 덧붙이면</h3>
          <ul className="mt-2 space-y-2 text-base">
            {notes.map((n) => (
              <li key={n.key}>
                <span className="font-semibold">{n.label}.</span> {n.text}
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card delay={320} tone="yellow">
        <h3 className="font-display text-[24px] leading-tight">꼭 알아 두세요</h3>
        <p className="mt-2 text-base leading-relaxed">
          커다란 연구들에서는 출생순위가 성격에 미치는 영향이 거의 없거나 아주 작다고 나왔어요. 위 내용은 아들러가 세운 관점이지, 확인된 사실이 아니에요. 지금의 나를 규정하는 말이 아니라 가볍게 떠올려 보는 이야기로 읽어 주세요.
        </p>
      </Card>
    </ResultFrame>
  );
}
