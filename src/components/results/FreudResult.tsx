"use client";

import { RadarChart } from "@/components/charts/RadarChart";
import { Card, Easy } from "@/components/ui";
import {
  defenseExamples,
  freudDefenseInfo,
  freudSources,
  freudStructureInfo,
  psychosexual,
} from "@/data/content/freud";
import type { StoredResult } from "@/lib/types";
import { ResultFrame } from "./Frame";
import { ScaleCard } from "./ScaleCard";

export function FreudResult({ result }: { result: StoredResult }) {
  const s = result.scores;
  return (
    <ResultFrame
      testId="freud"
      result={result}
      lead="프로이트가 상상한 마음의 모습을 빌려, 지금의 나를 가볍게 돌아봐요."
      sources={freudSources}
    >
      <section>
        <h2 className="font-display text-[28px] leading-tight">마음속에 사는 세 친구</h2>
        <p className="mt-1 text-sm text-sub">
          세 친구의 힘이 서로 얼마나 센지 보여 드려요. 균형이 중요하지, 어느 하나가 나쁜 건 아니에요.
        </p>
      </section>
      <Card>
        <RadarChart
          title="마음의 구조 3요소"
          items={[
            { label: "원초아", value: s.id },
            { label: "자아", value: s.ego },
            { label: "초자아", value: s.superego },
          ]}
        />
        <Easy label="세 친구가 누구예요?">
          원초아는 &ldquo;하고 싶어!&rdquo; 하는 막내, 자아는 길을 정리하는 교통경찰, 초자아는 &ldquo;이건 옳아&rdquo; 말해 주는 마음속 선생님이에요. 세 친구가 의논하며 오늘의 나를 움직여요.
        </Easy>
      </Card>
      {freudStructureInfo.map((info, i) => (
        <ScaleCard key={info.key} info={info} score={s[info.key]} delay={i * 80} />
      ))}

      <section className="mt-6">
        <h2 className="font-display text-[28px] leading-tight">마음이 아플 때 켜지는 안전장치</h2>
        <p className="mt-1 text-sm text-sub">
          &lsquo;방어기제&rsquo;라는 어려운 이름이 붙어 있지만, 누구나 쓰는 마음의 안전장치예요. 자주 쓰는 방식을 알면 나를 더 따뜻하게 이해할 수 있어요.
        </p>
      </section>
      {freudDefenseInfo.map((info, i) => (
        <ScaleCard key={info.key} info={info} score={s[info.key]} delay={i * 80} />
      ))}

      <Card>
        <h3 className="font-display text-[24px] leading-tight">{defenseExamples.title}</h3>
        <p className="mt-1 text-sm text-sub">{defenseExamples.easy}</p>
        <dl className="mt-4 space-y-3">
          {defenseExamples.rows.map(([k, v]) => (
            <div key={k}>
              <dt className="font-semibold">{k}</dt>
              <dd className="text-[15px] text-sub">{v}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <Card>
        <h3 className="font-display text-[24px] leading-tight">{psychosexual.title}</h3>
        <Easy>{psychosexual.easy}</Easy>
        <ol className="mt-4 space-y-3">
          {psychosexual.stages.map(([k, v]) => (
            <li key={k}>
              <p className="font-semibold">{k}</p>
              <p className="text-[15px] text-sub">{v}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-sub">{psychosexual.limit}</p>
      </Card>
    </ResultFrame>
  );
}
