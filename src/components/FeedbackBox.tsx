"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { VOTES, VOTE_LABEL, type Vote } from "@/lib/feedback";

const key = (index: number) => `psy:feedback:${index}`;

/**
 * "나와 닮았나요?" 한 번 누르면 캐릭터 번호와 응답만 익명으로 집계에 보낸다.
 * 같은 탭에서 같은 캐릭터에는 한 번만 보낸다.
 */
export function FeedbackBox({ index }: { index: number }) {
  const [state, setState] = useState<"ask" | "sending" | "done" | "error">(() => {
    try {
      return sessionStorage.getItem(key(index)) ? "done" : "ask";
    } catch {
      return "ask";
    }
  });

  const send = async (vote: Vote) => {
    setState("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index, vote }),
      });
      if (!res.ok) throw new Error();
      try {
        sessionStorage.setItem(key(index), vote);
      } catch {}
      setState("done");
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return <p className="font-bold">알려 줘서 고마워요! 더 나은 캐릭터를 만드는 데 쓸게요.</p>;
  }
  return (
    <div>
      <p className="font-display text-[22px] leading-tight">이 캐릭터, 나와 닮았나요?</p>
      <div className="mt-3 flex flex-col gap-2">
        {VOTES.map((v) => (
          <Button key={v} variant="secondary" disabled={state === "sending"} onClick={() => send(v)}>
            {VOTE_LABEL[v]}
          </Button>
        ))}
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-sub">
        누르면 캐릭터 번호와 응답만 익명으로 집계돼요. 이름, 기기 정보, 검사 답은 보내지 않아요.
      </p>
      {state === "error" && (
        <p className="mt-2 text-sm font-bold">지금은 집계가 어려워요. 잠시 뒤에 다시 눌러 주세요.</p>
      )}
    </div>
  );
}
