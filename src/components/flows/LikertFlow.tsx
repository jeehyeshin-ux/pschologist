"use client";

import { useEffect, useRef, useState } from "react";
import type { Answers, Item, TestId } from "@/lib/types";
import { LIKERT_LABELS } from "@/data/tests";
import { sayFor } from "@/data/kicks";
import { clearProgress, loadProgress, saveProgress } from "@/lib/storage";
import { Pogae } from "@/components/Pogae";
import { BottomBar, Button, Option, ProgressBar, Say, TopBar } from "@/components/ui";

/** 답을 고른 뒤 다음 문항으로 넘어가기 전 잠깐 보여 주는 시간 */
const ADVANCE_MS = 320;

export function LikertFlow({
  testId,
  items,
  onExit,
  onDone,
}: {
  testId: TestId;
  items: Item[];
  onExit: () => void;
  onDone: (answers: Answers, elapsedMs: number) => void;
}) {
  const [saved] = useState(() => loadProgress(testId));
  const [i, setI] = useState(() => Math.min(saved?.i ?? 0, items.length - 1));
  const [answers, setAnswers] = useState<Answers>(() => saved?.answers ?? {});
  const elapsed = useRef(saved?.elapsed ?? 0);
  const shownAt = useRef(Date.now());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const item = items[i];
  const chosen = answers[item.id];
  const last = i === items.length - 1;

  // 화면에 머문 시간을 문항을 넘길 때마다 더한다.
  const bank = () => {
    const now = Date.now();
    elapsed.current += now - shownAt.current;
    shownAt.current = now;
  };

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const go = (next: number, nextAnswers: Answers) => {
    bank();
    setI(next);
    saveProgress(testId, { i: next, answers: nextAnswers, elapsed: elapsed.current });
  };

  const pick = (v: number) => {
    const next = { ...answers, [item.id]: v };
    setAnswers(next);
    saveProgress(testId, { i, answers: next, elapsed: elapsed.current });
    if (last) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => go(i + 1, next), ADVANCE_MS);
  };

  const finish = () => {
    bank();
    clearProgress(testId);
    onDone(answers, elapsed.current);
  };

  const back = () => {
    if (timer.current) clearTimeout(timer.current);
    if (i === 0) onExit();
    else go(i - 1, answers);
  };

  return (
    <>
      <TopBar
        onBack={back}
        right={
          <span className="font-mono text-sm font-medium" aria-live="polite">
            {i + 1} / {items.length}
          </span>
        }
      />
      <div className="mt-2">
        <ProgressBar value={i + 1} max={items.length} />
      </div>
      <div key={item.id} className="reveal flex-1">
        <div className="mt-6 flex items-end gap-2">
          <Pogae pose="wave" className="w-24 shrink-0" />
          <Say className="mb-4">{sayFor(i, items.length)}</Say>
        </div>
        <h1 className="mt-4 font-display text-[clamp(28px,7.5vw,38px)] leading-[1.15] tracking-[-0.02em] break-keep">
          {item.text}
        </h1>
        <div role="radiogroup" aria-label="응답" className="mt-6 flex flex-col gap-3">
          {LIKERT_LABELS.map((label, idx) => {
            const v = idx + 1;
            return (
              <Option key={v} on={chosen === v} onClick={() => pick(v)}>
                {label}
              </Option>
            );
          })}
        </div>
      </div>
      <BottomBar>
        <Button
          disabled={chosen === undefined}
          onClick={() => {
            if (timer.current) clearTimeout(timer.current);
            if (last) finish();
            else go(i + 1, answers);
          }}
        >
          {last ? "결과 보기" : "다음"}
        </Button>
      </BottomBar>
    </>
  );
}
