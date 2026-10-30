export const VOTES = ["yes", "half", "no"] as const;
export type Vote = (typeof VOTES)[number];

export const VOTE_LABEL: Record<Vote, string> = {
  yes: "딱 나예요",
  half: "반쯤 닮았어요",
  no: "별로 안 닮았어요",
};

/** 서버로 보내기 전에 값을 검증한다. 캐릭터 번호(0~7)와 응답 세 가지 외에는 받지 않는다. */
export function parseFeedback(body: unknown): { index: number; vote: Vote } | null {
  if (typeof body !== "object" || body === null) return null;
  const { index, vote } = body as Record<string, unknown>;
  if (typeof index !== "number" || !Number.isInteger(index) || index < 0 || index > 7) return null;
  if (typeof vote !== "string" || !(VOTES as readonly string[]).includes(vote)) return null;
  return { index, vote: vote as Vote };
}
