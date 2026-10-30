"use client";

import { useMemo } from "react";
import { CharacterMap } from "@/components/charts/CharacterMap";
import { SpectrumBar } from "@/components/charts/Bars";
import { CharacterArt } from "@/components/CharacterArt";
import { Card, Disclaimer, Easy, LinkButton, Shell, Title, TopBar } from "@/components/ui";
import { adlerPositions } from "@/data/content/adler";
import { archetypeInfo } from "@/data/content/jung-analytic";
import { axisInfo, characterOf, characters } from "@/data/content/characters";
import { ARCHETYPES } from "@/data/items/jung-analytic";
import { TESTS } from "@/data/tests";
import { classify } from "@/lib/character/classify";
import { topScales } from "@/lib/scoring";
import { useResults } from "@/lib/storage";
import { TEST_IDS } from "@/lib/types";

export default function CharacterPage() {
  const { ready, results } = useResults();
  const c = useMemo(() => classify(results), [results]);
  const done = new Set(results.map((r) => r.testId));
  const remaining = TEST_IDS.filter((t) => !done.has(t));
  const character = c.index !== null ? characters.find((x) => x.index === c.index) : null;
  const adler = results.find((r) => r.testId === "adler")?.adler;
  const analytic = results.find((r) => r.testId === "jung-analytic");
  const archetypes = analytic
    ? archetypeInfo.filter((a) => topScales(analytic.scores, ARCHETYPES).includes(a.key))
    : [];
  const lowPrecision = Object.values(c.axes).some((a) => a.lowPrecision);

  if (!ready) {
    return (
      <Shell>
        <p className="mt-24 text-center text-sub">불러오고 있어요…</p>
      </Shell>
    );
  }

  return (
    <Shell>
      <TopBar href="/" label="처음으로" />
      <Title
        sub={
          character
            ? "지금까지 해 주신 검사를 모아서 그려 본 나의 모습이에요."
            : "검사를 하나 이상 마치면 나의 캐릭터가 만들어져요."
        }
      >
        {character ? "나는 이 캐릭터에 가까워요" : "종합 캐릭터"}
      </Title>

      {c.resolved === 0 && (
        <Card className="mt-8">
          <p className="text-base">
            아직 캐릭터를 그릴 재료가 부족해요. <b>타고난 기질 탐색</b>이나 <b>융 유형 탐색</b>을
            마치면 바로 만나볼 수 있어요. 마음의 구조 탐색이나 내면의 그림자 탐색만으로는 일부 방향만
            알 수 있어요.
          </p>
        </Card>
      )}

      {character && (
        <>
          <Card className="mt-8" tone="yellow">
            <CharacterArt index={character.index} name={character.name} className="mx-auto w-full max-w-[360px]" />
            <p className="mt-2 font-mono text-sm font-medium">{character.tagline}</p>
            <h2 className="mt-1 font-display text-[clamp(56px,16vw,84px)] leading-[0.95] tracking-[-0.03em]">{character.name}</h2>
            <p className="mt-4 text-base leading-relaxed">{character.intro}</p>
            <h3 className="mt-6 font-display text-[24px] leading-tight">이런 적 있죠?</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {character.scenes.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <h3 className="mt-5 font-display text-[24px] leading-tight">이런 힘이 있어요</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {character.strengths.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <h3 className="mt-5 font-display text-[24px] leading-tight">이런 약점도 있어요</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {character.weaknesses.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="mt-4 border-[3px] border-ink bg-white px-4 py-3 font-bold">
              한 줄 처방 · {character.tip}
            </p>
            <h3 className="mt-5 font-display text-[24px] leading-tight">잘 맞는 곳</h3>
            <p className="mt-2">{character.place}</p>
          </Card>
          {lowPrecision && (
            <p className="mt-3 text-sm text-sub">
              지금은 일부 검사의 비중이 작아서 아직 정밀도가 낮아요. 검사를 더 하면 더 또렷해져요.
            </p>
          )}
        </>
      )}

      {character && (
        <Card className="mt-4" delay={50}>
          <h2 className="font-display text-[24px] leading-tight">나와 어울리는 유형, 어긋나기 쉬운 유형</h2>
          <p className="mt-1 text-sm text-sub">
            재미로 보는 이야기예요. 연구로 확인된 궁합이 아니라, 세 방향이 겹치고 다른 정도로 이 서비스가 정리한 거예요.
          </p>
          {(
            [
              ["어울려요", character.match],
              ["리듬이 달라서 맞추는 데 힘이 들어요", character.clash],
            ] as const
          ).map(([label, list]) => (
            <div key={label} className="mt-4">
              <p className="font-display text-[20px] leading-tight">{label}</p>
              <ul className="mt-2 space-y-3">
                {list.map((m) => {
                  const other = characterOf(m.index);
                  if (!other) return null;
                  return (
                    <li key={m.index} className="flex items-start gap-3">
                      <CharacterArt
                        index={other.index}
                        name={other.name}
                        className="w-20 shrink-0 border-[3px] border-ink bg-white"
                      />
                      <div>
                        <p className="font-black">{other.name}</p>
                        <p className="text-[15px] leading-relaxed">{m.why}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </Card>
      )}

      {c.resolved > 0 && (
        <Card className="mt-4" delay={100}>
          <h2 className="font-display text-[24px] leading-tight">세 가지 방향</h2>
          <Easy>
            결과를 세 가지 방향으로 모았어요. 막대 위의 점이 어느 쪽에 가까운지 보여 줘요. 가운데 가까우면 두 쪽을 오가는 균형 잡힌 모습이에요.
          </Easy>
          <div className="mt-5 space-y-6">
            {(["A", "B", "C"] as const).map((k) => {
              const st = c.axes[k];
              const info = axisInfo[k];
              return (
                <div key={k}>
                  <p className="font-semibold">{info.title}</p>
                  <p className="mb-3 text-sm text-sub">{info.easy}</p>
                  {st.value === null ? (
                    <p className="border-[3px] border-dashed border-ink bg-white px-4 py-3 text-sm font-medium text-ink">
                      아직 알 수 없어요. 더 많은 검사를 하면 알려 드릴게요.
                    </p>
                  ) : (
                    <>
                      <SpectrumBar left={info.low} right={info.high} toward={st.value} />
                      {st.borderline && (
                        <p className="mt-2 text-sm text-sub">
                          가운데에 가까워서 두 쪽 모두 나다운 모습이에요.
                        </p>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {c.resolved === 3 && (
        <Card className="mt-4" delay={200}>
          <h2 className="font-display text-[24px] leading-tight">캐릭터 지도</h2>
          <p className="mb-4 mt-1 text-sm text-sub">
            채워진 칸이 나, 테두리가 있는 칸은 가운데에 가까워서 함께 닮은 이웃 캐릭터예요.
          </p>
          <CharacterMap current={c.index} neighbors={c.neighbors} />
        </Card>
      )}

      {(adler || archetypes.length > 0) && (
        <Card className="mt-4" delay={300}>
          <h2 className="font-display text-[24px] leading-tight">캐릭터 곁의 이야기</h2>
          <p className="mt-1 text-sm text-sub">
            아래는 캐릭터를 정하는 데에는 쓰지 않았어요. 곁에서 함께 읽어 보는 이야기예요.
          </p>
          {adler && (
            <div className="mt-4">
              <p className="font-semibold">배경 이야기 · {adlerPositions[adler.position].label}</p>
              <p className="text-[15px] text-sub">
                {adlerPositions[adler.position].nick}. 출생순위의 영향은 연구에서 거의 확인되지 않아서
                캐릭터에는 반영하지 않았어요.
              </p>
            </div>
          )}
          {archetypes.map((a) => (
            <div key={a.key} className="mt-4">
              <p className="font-semibold">곁에 있는 이야기 · {a.name}</p>
              <p className="text-[15px] text-sub">{a.nick}</p>
            </div>
          ))}
        </Card>
      )}

      <Card className="mt-4" delay={400}>
        <h2 className="font-display text-[24px] leading-tight">이 캐릭터는 어떻게 만들었나요?</h2>
        <p className="mt-2 text-[15px] leading-relaxed">
          검사 결과를 세 방향(움직임·판단의 중심·마음의 방향)으로 모아서, 모두 {characters.length}가지 중 가까운
          캐릭터를 골라요. 어떤 검사는 다른 검사보다 비중을 낮췄어요(마음의 구조·그림자 탐색은 절반).
          검사 사이의 연결은 이 서비스가 이야기를 만들기 위해 세운 가정이고, 심리학적으로 확인된
          분류가 아니에요. 재미있는 요약본으로 가볍게 봐 주세요. 진짜 내용은 각 검사의 결과 화면에 있어요.
        </p>
        <p className="mt-3 text-sm text-sub">
          다섯 검사를 모두 마쳤을 때 이론상 나올 수 있는 결과 조합은 약 110억 가지이고, 이를 8가지로 묶었어요.
        </p>
      </Card>

      <section className="mt-6">
        <h2 className="font-display text-[24px] leading-tight">검사 현황</h2>
        <ul className="mt-2 space-y-2">
          {TEST_IDS.map((id) => (
            <li key={id} className="flex items-center justify-between text-base">
              <span>{TESTS[id].name}</span>
              <span className={done.has(id) ? "font-black" : "text-sub"}>
                {done.has(id) ? "완료" : "아직이에요"}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <Disclaimer />
      <div className="mt-8 flex flex-col gap-3">
        {remaining.length > 0 && (
          <LinkButton href={`/test/${remaining[0]}`}>
            {TESTS[remaining[0]].name} 이어서 하기
          </LinkButton>
        )}
        <LinkButton href="/" variant="secondary">
          처음으로
        </LinkButton>
      </div>
    </Shell>
  );
}
