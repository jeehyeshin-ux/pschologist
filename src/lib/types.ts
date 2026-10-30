export type TestId =
  | "temperament"
  | "adler"
  | "jung-type"
  | "freud"
  | "jung-analytic";

export const TEST_IDS: TestId[] = [
  "temperament",
  "adler",
  "jung-type",
  "freud",
  "jung-analytic",
];

export interface Item {
  id: string;
  text: string;
  scale: string;
  /** true면 역방향 문항: 점수 = 6 - 응답 */
  reverse: boolean;
  /** 방어기제 이름 등 보조 태그. 채점에 쓰지 않는다. */
  tag?: string;
}

export type Answers = Record<string, number>;
export type Scores = Record<string, number>;

export type AdlerPosition = "only" | "first" | "middle" | "last";

export interface AdlerData {
  position: AdlerPosition;
  siblings: number;
  notes: string[];
}

export interface StoredResult {
  testId: TestId;
  scores: Scores;
  /** test: 문항 응답 / input: 사용자가 이미 아는 결과를 직접 입력 */
  source: "test" | "input";
  at: number;
  adler?: AdlerData;
  /** 응답이 한쪽으로 몰렸거나 너무 빨라서 믿기 어려운 결과. 종합 캐릭터에서는 뺀다. */
  unreliable?: boolean;
}

export type Level = "low" | "mid" | "high";
