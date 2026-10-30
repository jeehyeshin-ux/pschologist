"use client";

import type { ReactNode } from "react";
import { Pogae } from "@/components/Pogae";
import {
  Button,
  Card,
  Disclaimer,
  LinkButton,
  Shell,
  Sources,
  TopBar,
} from "@/components/ui";
import { setConsent, useResults } from "@/lib/storage";
import { TESTS } from "@/data/tests";
import { TEST_THEME } from "@/lib/theme";
import { TEST_IDS, type StoredResult, type TestId } from "@/lib/types";

export function SavePanel() {
  const { consent } = useResults();
  return (
    <Card className="mt-6">
      <h2 className="font-display text-[26px] leading-tight">
        {consent ? "이 기기에 저장되어 있어요" : "결과를 이 기기에 저장해 둘까요?"}
      </h2>
      <p className="mt-2 text-[15px] text-sub">
        {consent
          ? "저장된 결과는 이 브라우저에만 있고 서버로 보내지 않아요. 언제든 지울 수 있어요."
          : "저장하면 다음에 다시 와도 결과를 볼 수 있어요. 저장하지 않으면 이 탭을 닫을 때 사라져요. 어느 쪽이든 서버로는 보내지 않아요."}
      </p>
      <div className="mt-4">
        <Button variant="secondary" onClick={() => setConsent(!consent)}>
          {consent ? "저장 해제하고 지우기" : "저장할게요"}
        </Button>
      </div>
    </Card>
  );
}

export function ResultFrame({
  testId,
  result,
  lead,
  children,
  sources,
}: {
  testId: TestId;
  result: StoredResult;
  lead: string;
  children: ReactNode;
  sources: { refs: string[]; limits: string[] };
}) {
  const meta = TESTS[testId];
  const theme = TEST_THEME[testId];
  const { results } = useResults();
  const doneIds = new Set(results.map((r) => r.testId));
  const remaining = TEST_IDS.filter((t) => !doneIds.has(t));
  return (
    <Shell>
      <TopBar href="/" label="처음으로" />
      <Card tone={theme.tone} className="relative mt-6 overflow-hidden !p-0">
        <div className="flex items-end justify-between gap-2 pl-6 pt-6">
          <div className="pb-6">
            <p className="font-mono text-sm font-medium opacity-80">결과</p>
            <h1 className="mt-1 font-display text-[clamp(34px,9vw,52px)] leading-[1] tracking-[-0.02em] break-keep">
              {meta.name}
            </h1>
          </div>
          <Pogae pose={theme.pose} className="w-36 shrink-0 translate-y-2 sm:w-44" wobble />
        </div>
        <p className="border-t-[3px] border-ink bg-white px-6 py-4 text-[16px] font-medium text-ink">{lead}</p>
      </Card>
      {result.source === "input" && testId !== "adler" && (
        <p className="mt-4 border-[3px] border-dashed border-ink px-4 py-3 text-sm font-medium">
          직접 입력해 주신 결과예요. 입력값은 구간(또는 방향)만 알 수 있어서 자세한 정도는 보여 드리지 못해요.
        </p>
      )}
      {result.unreliable && (
        <p className="mt-4 border-[3px] border-dashed border-ink px-4 py-3 text-sm font-medium">
          답이 한쪽으로 몰려 있거나 아주 빠르게 이어져서, 이 결과는 참고만 해 주세요. 종합 캐릭터를 정할 때는
          쓰지 않아요.
        </p>
      )}
      <div className="mt-8 flex flex-col gap-4">{children}</div>
      <Sources {...sources} />
      <SavePanel />
      <Disclaimer />
      <div className="mt-8 flex flex-col gap-3">
        <LinkButton href="/character">종합 캐릭터 보기</LinkButton>
        {remaining.length > 0 && (
          <LinkButton href="/" variant="secondary">
            다른 검사도 해볼까요? ({remaining.length}개 남았어요)
          </LinkButton>
        )}
        <LinkButton href={`/test/${testId}`} variant="secondary">
          이 검사 다시 하기
        </LinkButton>
      </div>
    </Shell>
  );
}
