import type { TestId } from "@/lib/types";

export interface TestMeta {
  id: TestId;
  name: string;
  tagline: string;
  minutes: string;
  intro: string;
  hasInput: boolean;
  count: string;
}

export const TESTS: Record<TestId, TestMeta> = {
  temperament: {
    id: "temperament",
    name: "타고난 기질 탐색",
    tagline: "마음이 먼저 움직이는 방식을 살펴봐요",
    minutes: "약 6분",
    count: "48문항",
    intro:
      "기질은 어떤 일 앞에서 마음이 먼저 반응하는 모양이에요. 사람마다 좋아하는 색이 다르듯 반응하는 방식도 달라요. 정답은 없으니 편한 마음으로 떠오르는 대로 골라 주세요.",
    hasInput: true,
  },
  adler: {
    id: "adler",
    name: "출생순위 탐색",
    tagline: "형제 사이의 내 자리 이야기를 들려드려요",
    minutes: "약 1분",
    count: "문항 없음",
    intro:
      "정신과 의사 아들러는 가족 안에서 내가 어떤 자리에 있었는지가 마음에 흔적을 남긴다고 생각했어요. 몇째인지만 알려 주시면 돼요.",
    hasInput: false,
  },
  "jung-type": {
    id: "jung-type",
    name: "융 유형 탐색",
    tagline: "에너지와 판단의 방향을 살펴봐요",
    minutes: "약 4분",
    count: "32문항",
    intro:
      "스위스의 정신과 의사 융은 사람마다 마음을 쓰는 방향이 다르다고 설명했어요. 오른손잡이와 왼손잡이처럼, 더 편한 쪽이 있다는 이야기예요. 나에게 더 편한 쪽이 어디인지 알아봐요.",
    hasInput: true,
  },
  freud: {
    id: "freud",
    name: "마음의 구조 탐색",
    tagline: "마음속 세 친구와 안전장치를 만나 봐요",
    minutes: "약 4분",
    count: "36문항",
    intro:
      "프로이트는 마음이 여러 부분으로 이루어져 있다고 상상했어요. 그 부분들이 서로 의견을 나누며 나를 움직인다는 이야기예요. 옛날 이론이 던진 질문으로 지금의 나를 가볍게 돌아봐요.",
    hasInput: false,
  },
  "jung-analytic": {
    id: "jung-analytic",
    name: "내면의 그림자 탐색",
    tagline: "마음의 옷, 그림자, 내 안의 이야기를 만나 봐요",
    minutes: "약 4분",
    count: "34문항",
    intro:
      "융은 마음 깊은 곳에 아직 만나지 못한 나의 모습이 있다고 보았어요. 그 모습들을 부르는 이름이 조금 어렵지만, 하나씩 쉽게 풀어서 알려 드릴게요.",
    hasInput: false,
  },
};

export interface ChoiceStep {
  key: string;
  title: string;
  desc?: string;
  options: { value: string; label: string; sub?: string }[];
}

const LEVELS = [
  { value: "low", label: "낮은 편" },
  { value: "mid", label: "중간" },
  { value: "high", label: "높은 편" },
];

/** 직접 입력 단계 (한 화면에 하나씩) */
export const TEMPERAMENT_INPUT: ChoiceStep[] = [
  ["NS", "새로움 끌림", "새로운 것에 끌리는 정도"],
  ["HA", "조심성", "위험이나 실수를 미리 살피는 정도"],
  ["RD", "인정 민감성", "다른 사람의 반응에 영향받는 정도"],
  ["PS", "끈기", "보상이 없어도 이어 가는 정도"],
  ["SD", "자기주도", "스스로 방향을 세우는 정도"],
  ["CO", "연대감", "함께하고 돕고 싶은 마음의 정도"],
  ["ST", "의미 감각", "눈에 보이는 것 너머의 의미를 느끼는 정도"],
].map(([key, name, desc]) => ({
  key,
  title: `${name}은 어느 쪽에 가까웠나요?`,
  desc,
  options: LEVELS,
}));

export const JUNG_INPUT: ChoiceStep[] = [
  { key: "EI", title: "첫 번째 글자는 무엇이었나요?", options: [{ value: "E", label: "E", sub: "외향" }, { value: "I", label: "I", sub: "내향" }] },
  { key: "SN", title: "두 번째 글자는 무엇이었나요?", options: [{ value: "S", label: "S", sub: "감각" }, { value: "N", label: "N", sub: "직관" }] },
  { key: "TF", title: "세 번째 글자는 무엇이었나요?", options: [{ value: "T", label: "T", sub: "사고" }, { value: "F", label: "F", sub: "감정" }] },
  { key: "JP", title: "네 번째 글자는 무엇이었나요?", options: [{ value: "J", label: "J", sub: "판단" }, { value: "P", label: "P", sub: "인식" }] },
];

export const LIKERT_LABELS = [
  "전혀 그렇지 않아요",
  "그렇지 않은 편이에요",
  "보통이에요",
  "그런 편이에요",
  "매우 그래요",
];
