"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AdlerFlow } from "@/components/flows/AdlerFlow";
import { ChoiceFlow } from "@/components/flows/ChoiceFlow";
import { LikertFlow } from "@/components/flows/LikertFlow";
import { Pogae } from "@/components/Pogae";
import { BottomBar, Button, Card, Option, Say, Shell, Title, TopBar } from "@/components/ui";
import { freudItems } from "@/data/items/freud";
import { jungAnalyticItems } from "@/data/items/jung-analytic";
import { jungTypeItems } from "@/data/items/jung-type";
import { temperamentItems } from "@/data/items/temperament";
import { JUNG_INPUT, TEMPERAMENT_INPUT, TESTS } from "@/data/tests";
import { jungFromLetters, temperamentFromInput } from "@/lib/build-result";
import { interleave } from "@/lib/order";
import { scoreScales } from "@/lib/scoring";
import { saveResult } from "@/lib/storage";
import { TEST_THEME } from "@/lib/theme";
import type { Item, TestId } from "@/lib/types";

const ITEMS: Partial<Record<TestId, Item[]>> = {
  temperament: temperamentItems,
  "jung-type": jungTypeItems,
  freud: freudItems,
  "jung-analytic": jungAnalyticItems,
};

type Stage = "intro" | "mode" | "likert" | "input";

export function TestClient({ id }: { id: TestId }) {
  const router = useRouter();
  const meta = TESTS[id];
  const tone = TEST_THEME[id].tone;
  const [stage, setStage] = useState<Stage>("intro");
  const [mode, setMode] = useState<"test" | "input">("test");
  const ordered = useMemo(() => {
    const items = ITEMS[id];
    return items ? interleave(items, id) : [];
  }, [id]);

  const finish = () => router.push(`/result/${id}`);

  if (id === "adler") {
    if (stage === "intro") {
      return <Intro id={id} onStart={() => setStage("likert")} />;
    }
    return (
      <Shell tone={tone}>
        <AdlerFlow
          onExit={() => setStage("intro")}
          onDone={(adler) => {
            saveResult({ testId: id, scores: {}, source: "input", at: Date.now(), adler });
            finish();
          }}
        />
      </Shell>
    );
  }

  if (stage === "intro") {
    return <Intro id={id} onStart={() => setStage(meta.hasInput ? "mode" : "likert")} />;
  }

  if (stage === "mode") {
    const knownLabel =
      id === "temperament"
        ? "이미 기질·성격 검사 결과를 알고 있어요"
        : "이미 MBTI® 결과(네 글자)를 알고 있어요";
    return (
      <Shell tone={tone}>
        <TopBar onBack={() => setStage("intro")} />
        <Title sub="이미 알고 있다면 바로 입력할 수도 있어요.">
          어떻게 진행해 볼까요?
        </Title>
        <div role="radiogroup" aria-label="진행 방식" className="reveal mt-10 flex flex-col gap-3">
          {(
            [
              ["test", "문항에 답하며 알아볼게요", `${meta.count} · ${meta.minutes}`],
              ["input", knownLabel, "결과를 직접 입력해요"],
            ] as const
          ).map(([v, t, sub]) => (
            <Option key={v} on={mode === v} onClick={() => setMode(v)}>
              <span className="block text-base font-black">{t}</span>
              <span className="block text-sm font-medium opacity-80">{sub}</span>
            </Option>
          ))}
        </div>
        {mode === "input" && id === "jung-type" && (
          <p className="mt-4 text-sm font-medium leading-relaxed">
            MBTI®는 해당 권리자의 등록상표예요. 이 서비스는 권리자와 제휴하거나 승인을 받은 서비스가
            아니며, 사용자가 이미 아는 결과를 입력받는 용도로만 언급해요.
          </p>
        )}
        {mode === "input" && id === "temperament" && (
          <p className="mt-4 text-sm font-medium leading-relaxed">
            외부 검사의 점수 체계와 이 서비스의 척도는 달라요. 낮음/중간/높음 구간만 받아서 사용해요.
          </p>
        )}
        <BottomBar>
          <Button onClick={() => setStage(mode === "test" ? "likert" : "input")}>다음</Button>
        </BottomBar>
      </Shell>
    );
  }

  if (stage === "input") {
    const steps = id === "temperament" ? TEMPERAMENT_INPUT : JUNG_INPUT;
    return (
      <Shell tone={tone}>
        <ChoiceFlow
          steps={steps}
          onExit={() => setStage("mode")}
          onDone={(values) => {
            const scores =
              id === "temperament" ? temperamentFromInput(values) : jungFromLetters(values);
            saveResult({ testId: id, scores, source: "input", at: Date.now() });
            finish();
          }}
        />
      </Shell>
    );
  }

  return (
    <Shell tone={tone}>
      <LikertFlow
        items={ordered}
        onExit={() => setStage(meta.hasInput ? "mode" : "intro")}
        onDone={(answers) => {
          const scores = scoreScales(ordered, answers);
          if (!scores) return;
          saveResult({ testId: id, scores, source: "test", at: Date.now() });
          finish();
        }}
      />
    </Shell>
  );
}

function Intro({ id, onStart }: { id: TestId; onStart: () => void }) {
  const meta = TESTS[id];
  const theme = TEST_THEME[id];
  return (
    <Shell tone={theme.tone}>
      <TopBar href="/" label="처음으로" />
      <div className="mt-2 flex items-end gap-1">
        <Pogae pose={theme.pose} className="w-40 shrink-0" wobble />
        <Say className="mb-10">같이 알아보자!</Say>
      </div>
      <Title sub={meta.tagline}>{meta.name}</Title>
      <Card className="mt-8" delay={100}>
        <p className="text-base leading-relaxed text-ink">{meta.intro}</p>
        <p className="mt-4 font-mono text-sm font-medium text-ink">
          {meta.count} · {meta.minutes}
        </p>
      </Card>
      <p
        className="reveal mt-4 text-sm font-medium leading-relaxed"
        style={{ "--d": "200ms" } as React.CSSProperties}
      >
        이 검사는 자기이해를 위한 참고용이에요. 답은 이 기기 안에서만 계산되고 서버로 보내지지 않아요.
      </p>
      <div className="flex-1" />
      <BottomBar>
        <Button onClick={onStart}>시작할게요</Button>
      </BottomBar>
    </Shell>
  );
}
