import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { parseFeedback } from "@/lib/feedback";

/**
 * 공감도 익명 집계. 저장하는 것은 캐릭터 번호별 응답 횟수뿐이다.
 * IP, 쿠키, 기기 정보, 검사 결과는 저장하지 않는다.
 */
export async function POST(req: Request) {
  const parsed = parseFeedback(await req.json().catch(() => null));
  if (!parsed) return NextResponse.json({ ok: false }, { status: 400 });
  try {
    const redis = Redis.fromEnv();
    await redis.hincrby(`feedback:c${parsed.index}`, parsed.vote, 1);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
