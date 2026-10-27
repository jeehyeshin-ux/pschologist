"use client";

import { SpectrumBar } from "@/components/charts/Bars";
import { Card, Easy } from "@/components/ui";
import {
  jungTypeAxes,
  FUNC_NAME,
  jungTypeBalanced,
  jungTypeNames,
  jungTypeSources,
} from "@/data/content/jung-type";
import { jungType } from "@/lib/scoring/jung";
import type { StoredResult } from "@/lib/types";
import { ResultFrame } from "./Frame";

export function JungTypeResult({ result }: { result: StoredResult }) {
  const s = result.scores;
  const input = result.source === "input";
  const t = jungType(s, { knowStrength: !input });
  const typeInfo = t.dominant ? jungTypeNames[`${t.attitude}${t.dominant}`] : null;
  const rows = jungTypeAxes.map((a) => {
    const v = s[a.key]; // 높을수록 high 극(E,S,T,J)
    const balanced = !input && v >= 45 && v <= 55;
    const pole = v >= 50 ? a.high : a.low;
    return { a, v, balanced, pole };
  });
  return (
    <ResultFrame
      testId="jung-type"
      result={result}
      lead="어느 쪽이 더 편한지를 알아보는 거예요. 오른손잡이·왼손잡이처럼 더 편한 쪽이 있을 뿐이에요."
      sources={jungTypeSources}
    >
      <Card>
        <p className="text-sm text-sub">융의 심리유형으로 보면</p>
        {typeInfo ? (
          <>
            <h2 className="mt-1 font-display text-[40px] leading-[1.05]">{typeInfo.name}</h2>
            <p className="mt-1 text-base text-sub">{typeInfo.easy}</p>
            <p className="mt-4 text-base leading-relaxed">{typeInfo.text}</p>
          </>
        ) : (
          <>
            <h2 className="mt-1 font-display text-[40px] leading-[1.05]">
              {t.attitude === "E" ? "외향" : "내향"} · {FUNC_NAME[t.perception]}/{FUNC_NAME[t.judgment]}
            </h2>
            <p className="mt-3 text-base leading-relaxed">
              {input
                ? "직접 입력해 주신 결과에는 선호의 강도가 없어서, 가장 앞서는 마음의 기능은 정하지 못했어요. 문항에 답하면 더 자세히 알 수 있어요."
                : "받아들이는 방식과 판단하는 방식의 뚜렷함이 비슷해서, 두 가지 모두 나다운 주된 힘이에요."}
            </p>
          </>
        )}
        <Easy label="‘심리유형’이 뭐예요?">
          융은 마음의 에너지가 향하는 방향(외향·내향)과, 가장 앞장서서 쓰는 마음의 도구(감각·직관·사고·감정)를 합쳐서 여덟 가지 모습으로 설명했어요. 손이 둘이어도 더 자주 쓰는 손이 있듯, 마음의 도구도 그렇다는 이야기예요. 사람을 하나의 틀에 가두려는 말이 아니라, 나를 이해하는 하나의 시선이에요.
        </Easy>
      </Card>

      {rows.map(({ a, v, balanced, pole }, idx) => (
        <Card key={a.key} delay={idx * 80}>
          <h2 className="font-display text-[24px] leading-tight">{a.title}</h2>
          <p className="mt-1 text-sm text-sub">{a.question}</p>
          <div className="mt-5">
            <SpectrumBar
              left={a.high.name}
              right={a.low.name}
              toward={100 - v}
              unknown={input}
            />
          </div>
          <p className="mt-4 text-base leading-relaxed">
            {balanced ? jungTypeBalanced : `${pole.easy}. ${pole.text}`}
          </p>
          <Easy>{a.easy}</Easy>
          {a.note && <p className="mt-3 text-sm text-sub">{a.note}</p>}
        </Card>
      ))}
    </ResultFrame>
  );
}
