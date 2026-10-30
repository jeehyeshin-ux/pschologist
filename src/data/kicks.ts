/** 문항 사이에 끼우는 가벼운 한마디. 문항 문장 자체는 건드리지 않는다. */
export const DEFAULT_SAY = "정답은 없어요. 떠오르는 대로요.";

export const KICKS = [
  "너무 오래 고민하지 않아도 돼요. 첫 느낌이 대체로 정직해요.",
  "방금 '어, 좀 찔리는데?' 했다면 잘 가고 있는 거예요.",
  "솔직하게 답해도 점수는 안 깎여요. 애초에 합격선이 없거든요.",
  "5번만 연타하고 싶은 마음, 이해해요. 그래도 문장은 한 번 읽어 줘요.",
  "어제의 나와 오늘의 나가 다르다면, 지금 이 순간의 나로 답해 줘요.",
  "답이 애매하면 '보통이에요'가 맞는 날도 있어요.",
  "고민이 길어진다면 그만큼 나한테 중요한 문장이라는 뜻이에요.",
  "이 문장, 사실 저도 좀 찔려요.",
  "목 한 번 돌려 볼까요? 결과는 도망가지 않아요.",
  "남은 문항은 아직 있어요. 하지만 분명히 줄어들고 있어요.",
];

export const HALF_SAY = "벌써 절반이에요! 물 한 모금 마시고 와도 괜찮아요.";
export const LAST_SAY = "마지막이에요. 결과 버튼이 기다리고 있어요.";

/** 5문항마다 한 번씩 한마디를 바꾼다. 같은 위치에서는 항상 같은 말이 나온다. */
export function sayFor(index: number, total: number): string {
  if (index === total - 1) return LAST_SAY;
  if (index === Math.floor(total / 2)) return HALF_SAY;
  if (index % 5 === 4) return KICKS[Math.floor(index / 5) % KICKS.length];
  return DEFAULT_SAY;
}
