"use client";

import { useState } from "react";
import type { ChoiceStep } from "@/data/tests";
import { BottomBar, Button, Option, ProgressBar, TopBar } from "@/components/ui";

export function ChoiceFlow({
  steps,
  onExit,
  onDone,
}: {
  steps: ChoiceStep[];
  onExit: () => void;
  onDone: (values: Record<string, string>) => void;
}) {
  const [i, setI] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const step = steps[i];
  const chosen = values[step.key];
  const last = i === steps.length - 1;

  return (
    <>
      <TopBar
        onBack={() => (i === 0 ? onExit() : setI(i - 1))}
        right={
          <span className="font-mono text-sm font-medium">
            {i + 1} / {steps.length}
          </span>
        }
      />
      <div className="mt-2">
        <ProgressBar value={i + 1} max={steps.length} />
      </div>
      <div key={step.key} className="reveal flex-1">
        <h1 className="mt-12 font-display text-[clamp(30px,8vw,40px)] leading-[1.12] break-keep">
          {step.title}
        </h1>
        {step.desc ? <p className="mt-3 text-base font-medium">{step.desc}</p> : null}
        <div role="radiogroup" aria-label={step.title} className="mt-8 flex flex-col gap-3">
          {step.options.map((o) => {
            const on = chosen === o.value;
            return (
              <Option key={o.value} on={on} onClick={() => setValues({ ...values, [step.key]: o.value })}>
                {o.label}
                {o.sub ? <span className="ml-2 text-sm font-medium opacity-75">{o.sub}</span> : null}
              </Option>
            );
          })}
        </div>
      </div>
      <BottomBar>
        <Button
          disabled={chosen === undefined}
          onClick={() => (last ? onDone(values) : setI(i + 1))}
        >
          {last ? "결과 보기" : "다음"}
        </Button>
      </BottomBar>
    </>
  );
}
