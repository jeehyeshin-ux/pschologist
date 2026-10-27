import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { TONES, type Tone } from "@/lib/theme";

export const DISCLAIMER =
  "이 결과는 자기이해를 위한 참고용이며 임상 진단이나 전문 심리평가를 대체하지 않습니다.";

/** 화면 전체 배경색(tone)을 정하고, 하단 고정 영역이 같은 색을 쓰도록 변수로 내려준다. */
export function Shell({
  children,
  tone = "paper",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  const t = TONES[tone];
  return (
    <div className={`min-h-dvh ${t.cls}`} style={{ "--tone-bg": t.bg } as CSSProperties}>
      <main className="mx-auto flex min-h-dvh w-full max-w-[640px] flex-col px-5 pb-10 pt-5">
        {children}
      </main>
    </div>
  );
}

export function TopBar({
  href,
  onBack,
  label = "뒤로",
  right,
}: {
  href?: string;
  onBack?: () => void;
  label?: string;
  right?: ReactNode;
}) {
  const cls =
    "-ml-2 inline-flex min-h-11 items-center gap-1 px-2 text-[15px] font-bold underline-offset-4 hover:underline";
  return (
    <div className="flex items-center justify-between">
      {href ? (
        <Link href={href} className={cls}>
          <span aria-hidden>←</span> {label}
        </Link>
      ) : (
        <button type="button" onClick={onBack} className={cls}>
          <span aria-hidden>←</span> {label}
        </button>
      )}
      {right}
    </div>
  );
}

export function Title({
  children,
  sub,
  size = "md",
}: {
  children: ReactNode;
  sub?: ReactNode;
  size?: "md" | "lg";
}) {
  return (
    <header className="reveal mt-6">
      <h1
        className={`font-display break-keep leading-[1.05] tracking-[-0.02em] ${
          size === "lg" ? "text-[clamp(52px,16vw,96px)] leading-[0.92]" : "text-[clamp(34px,9vw,48px)]"
        }`}
      >
        {children}
      </h1>
      {sub ? <p className="mt-4 text-[17px] font-medium">{sub}</p> : null}
    </header>
  );
}

const BTN =
  "inline-flex min-h-14 w-full items-center justify-center border-[3px] border-ink px-6 text-lg font-black transition duration-150 " +
  "shadow-[6px_6px_0_var(--ink)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_var(--ink)] " +
  "active:translate-x-[6px] active:translate-y-[6px] active:shadow-none " +
  "disabled:cursor-not-allowed disabled:border-ink/30 disabled:bg-white disabled:text-ink/40 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0";

export function Button({
  children,
  onClick,
  disabled,
  variant = "primary",
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
}) {
  const style = variant === "primary" ? "bg-yellow text-ink" : "bg-white text-ink";
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${BTN} ${style}`}>
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const style = variant === "primary" ? "bg-yellow text-ink" : "bg-white text-ink";
  return (
    <Link href={href} className={`${BTN} ${style}`}>
      {children}
    </Link>
  );
}

export function BottomBar({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-0 -mx-5 mt-8 flex flex-col gap-3 bg-[var(--tone-bg)] px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3">
      {children}
    </div>
  );
}

/** 선택지 버튼. 라디오/체크박스 역할은 호출하는 쪽에서 정한다. */
export function Option({
  on,
  onClick,
  role = "radio",
  children,
}: {
  on: boolean;
  onClick: () => void;
  role?: "radio" | "checkbox";
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={on}
      onClick={onClick}
      className={`flex min-h-14 w-full items-center justify-between border-[3px] border-ink px-5 py-2 text-left text-base font-bold transition duration-150 hover:translate-x-1.5 active:scale-[0.99] ${
        on ? "bg-ink text-yellow" : "bg-white text-ink"
      }`}
    >
      <span>{children}</span>
      {on ? (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 12.5l5 5L20 6" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" />
        </svg>
      ) : null}
    </button>
  );
}

const CARD_TONE: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  white: "bg-white text-ink",
  pink: "bg-pink text-ink",
  yellow: "bg-yellow text-ink",
  blue: "bg-blue text-white",
  violet: "bg-violet text-white",
  ink: "bg-ink text-white",
};

export function Card({
  children,
  delay = 0,
  className = "",
  tone = "white",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  tone?: Tone;
}) {
  return (
    <section
      className={`reveal border-[3px] border-ink p-6 ${CARD_TONE[tone]} ${className}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </section>
  );
}

/** 어려운 용어를 풀어 주는 메모. 라벨은 기울어진 스티커로 붙인다. */
export function Easy({
  children,
  label = "쉽게 풀어볼게요",
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="relative mt-6 border-[3px] border-ink bg-white px-4 pb-4 pt-5 text-ink">
      <span className="absolute -top-3.5 left-3 inline-block rotate-[-2deg] border-[3px] border-ink bg-yellow px-2.5 py-0.5 text-[13px] font-black">
        {label}
      </span>
      <p className="text-[15px] leading-relaxed">{children}</p>
    </div>
  );
}

export function Disclaimer() {
  return (
    <p className="mt-8 border-[3px] border-dashed border-ink px-4 py-3 text-sm font-medium leading-relaxed">
      {DISCLAIMER}
    </p>
  );
}

export function Sources({
  refs,
  limits,
}: {
  refs: string[];
  limits: string[];
}) {
  return (
    <Card className="mt-6" tone="white">
      <h2 className="font-display text-[28px] leading-tight">이 이야기의 한계를 알려드려요</h2>
      <p className="mt-1 text-sm text-sub">
        솔직하게 말씀드리는 것이 나를 제대로 이해하는 데 도움이 되기 때문이에요.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px]">
        {limits.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <h3 className="mt-5 text-base font-black">참고한 문헌</h3>
      <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-sub">
        {refs.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </Card>
  );
}

export function ProgressBar({ value, max }: { value: number; max: number }) {
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-label="진행 상황"
      className="h-4 w-full border-[3px] border-ink bg-white"
    >
      <div
        className="h-full bg-ink transition-all duration-300"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );
}

/** 포개의 말풍선 */
export function Say({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative -rotate-1 border-[3px] border-ink bg-white px-3.5 py-2 text-[15px] font-extrabold text-ink shadow-[4px_4px_0_var(--ink)] ${className}`}
    >
      {children}
    </div>
  );
}
