"use client";

import Link from "next/link";
import { Pogae } from "@/components/Pogae";
import { ShareBar } from "@/components/ShareBar";
import { Button, Disclaimer, LinkButton, Say, Shell } from "@/components/ui";
import { SITE_URL } from "@/lib/site";
import { TESTS } from "@/data/tests";
import { classify } from "@/lib/character/classify";
import { clearAll, useResults } from "@/lib/storage";
import { TEST_THEME, TONES } from "@/lib/theme";
import { TEST_IDS } from "@/lib/types";

export default function Home() {
  const { ready, results, consent } = useResults();
  const done = new Set(results.map((r) => r.testId));
  const c = classify(results);
  const canCharacter = ready && c.resolved > 0;

  return (
    <Shell>
      <div className="flex items-center justify-between pt-1">
        <span className="font-display text-[26px] leading-none">마음 탐색실</span>
        <span className="rotate-2 border-[3px] border-ink bg-yellow px-3 py-0.5 text-[13px] font-black">
          자기이해 · 5가지 렌즈
        </span>
      </div>

      <section className="relative mt-4 overflow-hidden">
        <svg
          className="absolute -right-16 top-2 -z-0 w-[420px] max-w-[110%]"
          viewBox="0 0 640 520"
          aria-hidden="true"
        >
          <defs>
            <clipPath id="hc">
              <circle cx="230" cy="260" r="200" />
            </clipPath>
          </defs>
          <circle cx="230" cy="260" r="200" fill="#ff4fa3" />
          <circle cx="410" cy="260" r="200" fill="#2d5bff" />
          <g clipPath="url(#hc)">
            <circle cx="410" cy="260" r="200" fill="#6a2be6" />
          </g>
        </svg>
        <h1 className="reveal relative font-display text-[clamp(84px,27vw,168px)] leading-[0.84] tracking-[-0.05em]">
          <span className="block">마음을</span>
          <span className="relative block w-fit">
            <span className="text-pink">포개</span>
            <span aria-hidden className="absolute left-0 top-0 translate-x-[0.04em] translate-y-[0.03em] text-blue mix-blend-multiply">
              포개
            </span>
          </span>
          <span className="block">보다</span>
        </h1>
        <div className="absolute bottom-0 right-0 flex w-[58%] max-w-[300px] flex-col items-end">
          <Say className="mr-6 mb-1">겹치면 보여!</Say>
          <Pogae pose="wave" className="w-full" wobble />
        </div>
      </section>

      <p className="relative mt-6 max-w-[32ch] text-[18px] font-bold leading-snug">
        다섯 가지 심리 이야기로 나를 들여다보고, 결과를 겹쳐서 나만의 캐릭터를 만나요. 전부 하면 약 20분, 마음에 드는 것만 골라 해도 괜찮아요. 기질이나 융 유형 탐색 하나만 마쳐도 캐릭터가 나와요.
      </p>

      <ul className="mt-10 flex flex-col gap-5">
        {TEST_IDS.map((id, i) => {
          const t = TESTS[id];
          const theme = TEST_THEME[id];
          const isDone = done.has(id);
          return (
            <li
              key={id}
              className={`reveal relative border-[3px] border-ink p-5 shadow-[6px_6px_0_var(--ink)] ${TONES[theme.tone].cls}`}
              style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
            >
              {isDone && (
                <span className="absolute -top-3 right-4 rotate-6 border-[3px] border-ink bg-pink px-2.5 py-0.5 text-[14px] font-black tracking-wider text-ink">
                  완료
                </span>
              )}
              <h2 className="font-display text-[30px] leading-tight">{t.name}</h2>
              <p className="mt-1 text-[16px] font-medium">{t.tagline}</p>
              <p className="mt-2 font-mono text-[13px] font-medium opacity-85">
                {t.count} · {t.minutes}
              </p>
              <div className="mt-4 flex gap-3">
                {isDone ? (
                  <>
                    <Link
                      href={`/result/${id}`}
                      className="inline-flex min-h-12 flex-1 items-center justify-center border-[3px] border-ink bg-yellow text-[16px] font-black text-ink hover:bg-white"
                    >
                      결과 보기
                    </Link>
                    <Link
                      href={`/test/${id}`}
                      className="inline-flex min-h-12 flex-1 items-center justify-center border-[3px] border-ink bg-white text-[16px] font-black text-ink hover:bg-yellow"
                    >
                      다시 하기
                    </Link>
                  </>
                ) : (
                  <Link
                    href={`/test/${id}`}
                    className="inline-flex min-h-12 w-full items-center justify-center border-[3px] border-ink bg-yellow text-[16px] font-black text-ink hover:bg-white"
                  >
                    시작하기 →
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-10">
        {canCharacter ? (
          <LinkButton href="/character">종합 캐릭터 보기</LinkButton>
        ) : (
          <Button disabled>검사를 하나 마치면 캐릭터를 볼 수 있어요</Button>
        )}
      </div>

      <section className="mt-10">
        <h2 className="font-display text-[24px] leading-tight">친구에게 알려 주기</h2>
        <div className="mt-3">
          <ShareBar
            url={SITE_URL}
            title="마음 탐색실"
            text="다섯 가지 심리 이야기로 나를 들여다보고, 8가지 캐릭터 중 나를 닮은 하나를 만나 봐."
          />
        </div>
      </section>

      <section className="mt-10 border-[3px] border-ink bg-white px-4 py-4 text-sm font-medium leading-relaxed">
        <p className="font-display text-[20px] leading-tight">개인정보는 이렇게 다뤄요</p>
        <p className="mt-1">
          이름이나 연락처를 묻지 않아요. 답과 결과는 이 기기의 브라우저 안에서만 계산하고 서버로 보내지
          않아요. 결과는 동의하신 경우에만 이 기기에 저장해요. 단, 캐릭터 화면에서 "나와 닮았나요?"를 직접
          누르면 캐릭터 번호와 응답만 익명으로 집계돼요.
        </p>
        {ready && (results.length > 0 || consent) && (
          <button
            type="button"
            onClick={() => clearAll()}
            className="mt-3 min-h-11 font-black text-ink underline underline-offset-4"
          >
            저장된 결과 모두 지우기
          </button>
        )}
      </section>

      <Disclaimer />
    </Shell>
  );
}
