"use client";

import { AdlerResult } from "@/components/results/AdlerResult";
import { FreudResult } from "@/components/results/FreudResult";
import { JungAnalyticResult } from "@/components/results/JungAnalyticResult";
import { JungTypeResult } from "@/components/results/JungTypeResult";
import { TemperamentResult } from "@/components/results/TemperamentResult";
import { LinkButton, Shell, Title, TopBar } from "@/components/ui";
import { TESTS } from "@/data/tests";
import { useResults } from "@/lib/storage";
import type { TestId } from "@/lib/types";

export function ResultClient({ id }: { id: TestId }) {
  const { ready, results } = useResults();
  const result = results.find((r) => r.testId === id);

  if (!ready) {
    return (
      <Shell>
        <p className="mt-24 text-center text-sub">결과를 불러오고 있어요…</p>
      </Shell>
    );
  }
  if (!result) {
    return (
      <Shell>
        <TopBar href="/" label="처음으로" />
        <Title sub="아직 이 검사의 결과가 없어요. 탭을 닫으면 저장하지 않은 결과는 사라져요.">
          결과를 찾지 못했어요
        </Title>
        <div className="flex-1" />
        <div className="mt-8">
          <LinkButton href={`/test/${id}`}>{TESTS[id].name} 하러 가기</LinkButton>
        </div>
      </Shell>
    );
  }
  switch (id) {
    case "temperament":
      return <TemperamentResult result={result} />;
    case "adler":
      return <AdlerResult result={result} />;
    case "jung-type":
      return <JungTypeResult result={result} />;
    case "freud":
      return <FreudResult result={result} />;
    case "jung-analytic":
      return <JungAnalyticResult result={result} />;
  }
}
