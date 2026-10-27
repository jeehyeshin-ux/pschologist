import { LEVEL_LABEL, levelOf } from "@/lib/scoring";

/** 0~100 막대. 망점 채움 + 굵은 윤곽선. 수준은 글자로도 알려 준다. */
export function LevelBar({
  value,
  label,
  hideValue = false,
}: {
  value: number;
  label: string;
  hideValue?: boolean;
}) {
  const level = levelOf(value);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-display text-[22px] leading-tight">{label}</span>
        <span className="shrink-0 font-mono text-sm font-medium">
          {LEVEL_LABEL[level]}
          {hideValue ? "" : ` · ${value}`}
        </span>
      </div>
      <div
        role="img"
        aria-label={`${label} ${LEVEL_LABEL[level]}, ${value}점`}
        className="relative mt-2 h-6 w-full border-[3px] border-ink bg-white"
      >
        <div
          className="halftone absolute inset-y-0 left-0 border-r-[3px] border-ink bg-pink"
          style={{ width: `${Math.max(value, 4)}%` }}
        />
      </div>
    </div>
  );
}

/** 두 극 사이 어디쯤인지 보여 주는 막대. toward: 오른쪽 극에 가까운 정도(0~100) */
export function SpectrumBar({
  left,
  right,
  toward,
  unknown = false,
}: {
  left: string;
  right: string;
  toward: number;
  unknown?: boolean;
}) {
  const nearLeft = toward < 50;
  return (
    <div>
      <div className="flex justify-between gap-3 text-[15px] font-black">
        <span className={nearLeft || unknown === false ? "" : "opacity-60"}>{left}</span>
        <span className={!nearLeft || unknown === false ? "" : "opacity-60"}>{right}</span>
      </div>
      <div
        role="img"
        aria-label={
          unknown
            ? `${nearLeft ? left : right}쪽 (강도는 알 수 없음)`
            : `${left}과 ${right} 사이, ${Math.round(Math.abs(toward - 50) * 2)}% ${toward < 50 ? left : right}쪽`
        }
        className="relative mt-2 h-6 w-full border-[3px] border-ink bg-white"
      >
        <div className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-ink/30" />
        {unknown ? (
          <div
            className={`halftone absolute top-0 h-full w-1/2 bg-violet/60 ${nearLeft ? "left-0" : "right-0"}`}
          />
        ) : (
          <div
            className="absolute top-1/2 size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-ink bg-yellow"
            style={{ left: `${Math.min(Math.max(toward, 6), 94)}%` }}
          />
        )}
      </div>
    </div>
  );
}
