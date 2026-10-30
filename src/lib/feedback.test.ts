import { describe, expect, it } from "vitest";
import { parseFeedback } from "./feedback";

describe("parseFeedback", () => {
  it("올바른 값은 통과", () => {
    expect(parseFeedback({ index: 3, vote: "half" })).toEqual({ index: 3, vote: "half" });
  });
  it("범위 밖 번호, 알 수 없는 응답, 다른 형태는 거부", () => {
    expect(parseFeedback({ index: 8, vote: "yes" })).toBeNull();
    expect(parseFeedback({ index: -1, vote: "yes" })).toBeNull();
    expect(parseFeedback({ index: 1.5, vote: "yes" })).toBeNull();
    expect(parseFeedback({ index: 1, vote: "maybe" })).toBeNull();
    expect(parseFeedback({ index: "1", vote: "yes" })).toBeNull();
    expect(parseFeedback(null)).toBeNull();
    expect(parseFeedback("yes")).toBeNull();
  });
  it("여분의 필드는 버린다", () => {
    expect(parseFeedback({ index: 0, vote: "no", name: "x" })).toEqual({ index: 0, vote: "no" });
  });
});
