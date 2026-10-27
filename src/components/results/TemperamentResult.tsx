"use client";

import { RadarChart } from "@/components/charts/RadarChart";
import { Card, Easy } from "@/components/ui";
import {
  TEMPERAMENT_GROUPS,
  temperamentInfo,
  temperamentSources,
} from "@/data/content/temperament";
import type { StoredResult } from "@/lib/types";
import { ResultFrame } from "./Frame";
import { ScaleCard } from "./ScaleCard";

export function TemperamentResult({ result }: { result: StoredResult }) {
  const s = result.scores;
  const byKey = Object.fromEntries(temperamentInfo.map((i) => [i.key, i]));
  const input = result.source === "input";
  return (
    <ResultFrame
      testId="temperament"
      result={result}
      lead="잘하고 못하는 것이 아니라, 마음이 움직이는 모양을 살펴보는 거예요."
      sources={temperamentSources}
    >
      <Card>
        <h2 className="font-display text-[24px] leading-tight">나의 기질 지도</h2>
        <p className="mt-1 text-sm text-sub">
          바깥으로 갈수록 그 마음이 크다는 뜻이에요. 모양이 어떻든 정답은 없어요.
        </p>
        <div className="mt-2">
          <RadarChart
            title="기질 7차원"
            items={temperamentInfo.map((i) => ({ label: i.name, value: s[i.key] }))}
          />
        </div>
        <Easy label="기질이 뭐예요?">
          기질은 어떤 일을 만났을 때 마음이 먼저 반응하는 방식이에요. 겨울 날씨에 어떤 사람은 추위를 더 타고 어떤 사람은 덜 타는 것처럼, 사람마다 타고난 반응의 모양이 달라요.
        </Easy>
      </Card>

      {TEMPERAMENT_GROUPS.map((g) => (
        <section key={g.title} className="mt-4">
          <h2 className="font-display text-[28px] leading-tight">{g.title}</h2>
          <p className="mt-1 text-sm text-sub">{g.easy}</p>
          <div className="mt-4 flex flex-col gap-4">
            {g.keys.map((k, idx) => (
              <ScaleCard
                key={k}
                info={byKey[k]}
                score={s[k]}
                delay={idx * 80}
                hideValue={input}
              />
            ))}
          </div>
        </section>
      ))}
    </ResultFrame>
  );
}
