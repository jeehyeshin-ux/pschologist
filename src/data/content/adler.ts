import type { AdlerPosition } from "@/lib/types";

export interface PositionInfo {
  label: string;
  nick: string;
  story: string;
  good: string;
  hard: string;
  misunderstand: string;
}

export const adlerPositions: Record<AdlerPosition, PositionInfo> = {
  only: {
    label: "외동",
    nick: "집안의 단 한 명",
    story:
      "형제자매 없이 어른들의 관심을 한 몸에 받고 자라는 자리예요. 아들러는 이 자리에서 어른들과 편안하게 지내는 힘이 자란다고 보았어요.",
    good: "어른과 대화가 편하고, 혼자서도 잘 지내며, 집중해서 무언가를 해내는 힘이 자랄 수 있다고 해요.",
    hard: "또래와 나누고 양보하는 경험이 적을 수 있어서, 친구들과의 협력을 따로 익힐 기회가 필요하다고 해요.",
    misunderstand: "'외동은 이기적이다'라는 말이 있지만, 연구에서 이를 뒷받침하는 근거는 찾기 어려워요.",
  },
  first: {
    label: "첫째",
    nick: "먼저 걸어간 사람",
    story:
      "한동안 혼자 사랑을 받다가 동생이 생기는 자리예요. 아들러는 이때 '내 자리를 지키고 싶다'는 마음과 '내가 동생을 이끌어야 한다'는 책임감이 함께 자란다고 보았어요.",
    good: "책임감 있고, 질서와 규칙을 소중히 여기며, 앞장서는 힘이 자랄 수 있다고 해요.",
    hard: "기대를 크게 받아 부담을 느끼거나, 내 자리를 잃을까 불안할 수 있다고 해요.",
    misunderstand: "'첫째는 무조건 똑똑하고 모범적이다'는 오해예요. 같은 첫째라도 가정마다 전혀 달라요.",
  },
  middle: {
    label: "중간",
    nick: "사이에서 길을 찾는 사람",
    story:
      "위에는 앞선 형제가, 아래에는 어린 형제가 있는 자리예요. 아들러는 이 자리에서 협상하고 균형을 잡는 힘이 자란다고 보았어요.",
    good: "사람 사이를 잇고 조율하는 힘, 자기만의 길을 찾는 독립심이 자랄 수 있다고 해요.",
    hard: "관심이 위아래로 흩어져서 '나는 어디에 있지?' 하고 느끼는 때가 있을 수 있다고 해요.",
    misunderstand: "'중간은 소외되고 외롭다'는 말은 과장이에요. 많은 중간 형제는 오히려 균형 잡힌 관계를 잘 만들어요.",
  },
  last: {
    label: "막내",
    nick: "뒤에서 따라오는 사람",
    story:
      "언제나 가족 중 가장 어린 자리예요. 아들러는 이 자리에서 앞선 형제들을 따라잡으려는 마음과 보살핌을 받는 편안함이 함께 자란다고 보았어요.",
    good: "사람들과 쉽게 친해지는 매력, 새로운 길을 시도하는 용기가 자랄 수 있다고 해요.",
    hard: "누군가 해 주는 것에 익숙해져서 스스로 결정하는 연습이 더 필요할 수 있다고 해요.",
    misunderstand: "'막내는 철이 없다'는 말은 고정관념이에요. 막내여서가 아니라 자라 온 환경이 만든 모습인 경우가 많아요.",
  },
};

export const adlerCore =
  "아들러가 가장 강조한 건 '몇째냐'보다 '그 자리를 내가 어떻게 받아들였느냐'예요. 같은 첫째라도 \"동생 때문에 사랑을 뺏겼다\"고 느낀 아이와 \"동생을 돌봐 주니 뿌듯하다\"고 느낀 아이는 다르게 자라요.";

export const adlerNotes: { key: string; label: string; text: string }[] = [
  { key: "step", label: "재혼 가정이에요", text: "새 가족이 생기면서 나의 자리가 바뀌었을 수 있어요. 지금의 자리와 처음의 자리가 다르게 느껴지면 둘 다 읽어 보세요." },
  { key: "adopt", label: "입양 가정이에요", text: "가정에 들어온 시기와 느낌이 자리의 의미를 크게 좌우할 수 있어요." },
  { key: "twin", label: "쌍둥이가 있어요", text: "쌍둥이는 '같은 시기에 태어난 둘'이라서, 일반적인 순서 이야기가 그대로 맞지 않을 수 있어요." },
  { key: "gap", label: "형제와 나이 차이가 7년 이상 커요", text: "나이 차이가 크면 사실상 '외동처럼' 혹은 '두 번째 가족처럼' 자랐을 수 있어요." },
];

export const adlerSources = {
  refs: [
    "Adler, A. (1927). Menschenkenntnis (영: Understanding Human Nature). / Adler, A. (1931). What Life Should Mean to You. (출생순위에 대한 아들러의 서술)",
    "Rohrer, J. M., Egloff, B., & Schmukle, S. C. (2015). Examining the effects of birth order on personality. PNAS, 112(46), 14224–14229. (미국·영국·독일 약 2만 명 자료)",
  ],
  limits: [
    "큰 규모의 연구에서는 출생순위가 성격에 미치는 영향이 거의 없거나 아주 작게 나타났어요. 위의 이야기는 아들러의 관점이자 가설이에요. 확인된 사실로 받아들이지 말아 주세요.",
    "집단의 평균에서 조금 차이가 있더라도, 한 사람에게 그대로 맞는다는 뜻은 아니에요.",
    "형제 수, 나이 차이, 성별, 가족 환경에 따라 자리의 의미는 크게 달라져요.",
  ],
};
