"use client";

import { useState } from "react";
import type { Answers, Item } from "@/lib/types";
import { LIKERT_LABELS } from "@/data/tests";
import { Pogae } from "@/components/Pogae";
import { BottomBar, Button, Option, ProgressBar, Say, TopBar } from "@/components/ui";

export function LikertFlow({
  items,
  onExit,
  onDone,
}: {
  items: Item[];
  onExit: () => void;
  onDone: (answers: Answers) => void;
}) {
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const item = items[i];
  const chosen = answers[item.id];
  const last = i === items.length - 1;

  return (
    <>
      <TopBar
        onBack={() => (i === 0 ? onExit() : setI(i - 1))}
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
          <Say className="mb-4">정답은 없어! 떠오르는 대로.</Say>
        </div>
        <h1 className="mt-4 font-display text-[clamp(28px,7.5vw,38px)] leading-[1.15] tracking-[-0.02em] break-keep">
          {item.text}
        </h1>
        <div role="radiogroup" aria-label="응답" className="mt-6 flex flex-col gap-3">
          {LIKERT_LABELS.map((label, idx) => {
            const v = idx + 1;
            const on = chosen === v;
            return (
              <Option key={v} on={on} onClick={() => setAnswers({ ...answers, [item.id]: v })}>
                {label}
              </Option>
            );
          })}
        </div>
      </div>
      <BottomBar>
        <Button
          disabled={chosen === undefined}
          onClick={() => (last ? onDone(answers) : setI(i + 1))}
        >
          {last ? "결과 보기" : "다음"}
        </Button>
      </BottomBar>
    </>
  );
}
