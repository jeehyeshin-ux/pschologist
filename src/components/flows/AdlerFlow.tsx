"use client";

import { useState } from "react";
import type { AdlerData, AdlerPosition } from "@/lib/types";
import { adlerNotes } from "@/data/content/adler";
import { BottomBar, Button, Option, ProgressBar, TopBar } from "@/components/ui";

type Step = "count" | "position" | "notes";

export function AdlerFlow({
  onExit,
  onDone,
}: {
  onExit: () => void;
  onDone: (data: AdlerData) => void;
}) {
  const [step, setStep] = useState<Step>("count");
  const [siblings, setSiblings] = useState<number | null>(null);
  const [position, setPosition] = useState<AdlerPosition | null>(null);
  const [notes, setNotes] = useState<string[]>([]);

  const steps: Step[] = siblings === 1 ? ["count", "notes"] : ["count", "position", "notes"];
  const idx = steps.indexOf(step);

  const back = () => {
    if (idx === 0) onExit();
    else setStep(steps[idx - 1]);
  };

  const next = () => {
    if (step === "notes") {
      onDone({
        siblings: siblings ?? 1,
        position: siblings === 1 ? "only" : (position ?? "first"),
        notes,
      });
    } else {
      setStep(steps[idx + 1]);
    }
  };

  const countOptions = [
    [1, "나 혼자예요 (외동)"],
    [2, "2명이에요"],
    [3, "3명이에요"],
    [4, "4명이에요"],
    [5, "5명 이상이에요"],
  ] as const;

  const positionOptions: [AdlerPosition, string][] = [
    ["first", "첫째예요"],
    ...((siblings ?? 0) >= 3 ? ([["middle", "중간이에요"]] as [AdlerPosition, string][]) : []),
    ["last", "막내예요"],
  ];

  const canNext =
    step === "count" ? siblings !== null : step === "position" ? position !== null : true;

  return (
    <>
      <TopBar onBack={back} />
      <div className="mt-2">
        <ProgressBar value={idx + 1} max={steps.length} />
      </div>
      <div key={step} className="reveal flex-1">
        {step === "count" && (
          <>
            <h1 className="mt-12 font-display text-[clamp(30px,8vw,40px)] leading-[1.12] break-keep">
              나를 포함해서 형제자매가 모두 몇 명인가요?
            </h1>
            <div role="radiogroup" aria-label="형제자매 수" className="mt-8 flex flex-col gap-3">
              {countOptions.map(([n, label]) => (
                <Choice
                  key={n}
                  on={siblings === n}
                  onClick={() => {
                    setSiblings(n);
                    if (n === 1) setPosition("only");
                    else if (position === "only") setPosition(null);
                    else if (n === 2 && position === "middle") setPosition(null);
                  }}
                >
                  {label}
                </Choice>
              ))}
            </div>
          </>
        )}
        {step === "position" && (
          <>
            <h1 className="mt-12 font-display text-[clamp(30px,8vw,40px)] leading-[1.12] break-keep">
              그중에서 나는 몇째인가요?
            </h1>
            <div role="radiogroup" aria-label="출생순위" className="mt-8 flex flex-col gap-3">
              {positionOptions.map(([p, label]) => (
                <Choice key={p} on={position === p} onClick={() => setPosition(p)}>
                  {label}
                </Choice>
              ))}
            </div>
          </>
        )}
        {step === "notes" && (
          <>
            <h1 className="mt-12 font-display text-[clamp(30px,8vw,40px)] leading-[1.12] break-keep">
              해당되는 게 있다면 골라 주세요
            </h1>
            <p className="mt-3 text-base font-medium">
              없다면 그대로 넘어가도 괜찮아요. 해석을 조금 더 정확하게 하려는 질문이에요.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              {adlerNotes.map((n) => {
                const on = notes.includes(n.key);
                return (
                  <Option
                    key={n.key}
                    role="checkbox"
                    on={on}
                    onClick={() =>
                      setNotes(on ? notes.filter((k) => k !== n.key) : [...notes, n.key])
                    }
                  >
                    {n.label}
                  </Option>
                );
              })}
            </div>
          </>
        )}
      </div>
      <BottomBar>
        <Button disabled={!canNext} onClick={next}>
          {step === "notes" ? "결과 보기" : "다음"}
        </Button>
      </BottomBar>
    </>
  );
}

function Choice({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Option on={on} onClick={onClick}>
      {children}
    </Option>
  );
}
