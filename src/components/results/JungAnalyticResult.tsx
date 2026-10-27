"use client";

import { RadarChart } from "@/components/charts/RadarChart";
import { Card, Easy } from "@/components/ui";
import { ARCHETYPES } from "@/data/items/jung-analytic";
import {
  analyticInfo,
  analyticSources,
  archetypeInfo,
  archetypeIntro,
} from "@/data/content/jung-analytic";
import { topScales } from "@/lib/scoring";
import type { StoredResult } from "@/lib/types";
import { ResultFrame } from "./Frame";
import { ScaleCard } from "./ScaleCard";

export function JungAnalyticResult({ result }: { result: StoredResult }) {
  const s = result.scores;
  const top = topScales(s, ARCHETYPES);
  const picked = archetypeInfo.filter((a) => top.includes(a.key));
  return (
    <ResultFrame
      testId="jung-analytic"
      result={result}
      lead="아직 만나지 못한 나의 모습을 부드럽게 불러내 보는 시간이에요."
      sources={analyticSources}
    >
      <Card>
        <RadarChart
          title="내면 탐색 3가지"
          items={[
            { label: "마음의 옷", value: s.persona },
            { label: "그림자 마주하기", value: s.shadow },
            { label: "내 안의 다른 면", value: s.other },
          ]}
        />
        <Easy label="무슨 뜻이에요?">
          융은 마음을 하나의 집에 비유하곤 했어요. 사람들에게 보이는 현관(마음의 옷), 평소에 잘 안 가는 지하실(그림자), 아직 열어 보지 않은 방(내 안의 다른 면)이 있다는 이야기예요. 어느 방이 좋고 나쁜 게 아니라, 어떤 방을 자주 쓰는지 가볍게 살펴봐요.
        </Easy>
      </Card>
      {analyticInfo.map((info, i) => (
        <ScaleCard key={info.key} info={info} score={s[info.key]} delay={i * 80} />
      ))}

      <section className="mt-4">
        <h2 className="font-display text-[28px] leading-tight">{archetypeIntro.title}</h2>
        <Easy>{archetypeIntro.easy}</Easy>
      </section>
      {picked.map((a, i) => (
        <Card key={a.key} delay={i * 80}>
          <p className="font-mono text-sm font-medium">지금 나와 가까운 이야기</p>
          <h3 className="mt-1 font-display text-[32px] leading-[1.1]">{a.name}</h3>
          <p className="text-base text-sub">{a.nick}</p>
          <p className="mt-3 text-base leading-relaxed">{a.text}</p>
        </Card>
      ))}
    </ResultFrame>
  );
}
