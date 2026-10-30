import type { ReactNode } from "react";

const INK = "#17102e";
const PINK = "#ff4fa3";
const BLUE = "#2d5bff";
const VIO = "#6a2be6";
const YEL = "#ffe600";
const W = "#ffffff";
const SW = 4;

const stroke = { stroke: INK, strokeWidth: SW, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Person({ x, y, body, children }: { x: number; y: number; body: string; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-22" y="22" width="44" height="58" rx="18" fill={body} {...stroke} />
      <circle r="25" fill={W} {...stroke} />
      <circle cx="-9" cy="-2" r="3.2" fill={INK} />
      <circle cx="9" cy="-2" r="3.2" fill={INK} />
      <path d="M-8 9 Q0 17 8 9" fill="none" {...stroke} />
      {children}
    </g>
  );
}

function Star({ x, y, s = 1, fill = YEL }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -10 L3 -3 L10 0 L3 3 L0 10 L-3 3 L-10 0 L-3 -3 Z"
      fill={fill}
      {...stroke}
      strokeWidth={3}
    />
  );
}

const SCENES: Record<number, () => ReactNode> = {
  // 길 위의 이야기꾼
  7: () => (
    <>
      <circle cx="244" cy="66" r="36" fill={PINK} {...stroke} />
      <path d="M0 200 Q80 150 160 190 T320 170 V240 H0 Z" fill={VIO} {...stroke} />
      <path d="M150 240 Q165 205 200 192 T280 178" fill="none" stroke={W} strokeWidth="14" strokeLinecap="round" />
      <Person x={104} y={104} body={PINK}>
        <rect x="-34" y="30" width="16" height="36" rx="6" fill={BLUE} {...stroke} />
      </Person>
      <ellipse cx="190" cy="44" rx="34" ry="22" fill={W} {...stroke} />
      <circle cx="178" cy="44" r="3.5" fill={INK} />
      <circle cx="190" cy="44" r="3.5" fill={INK} />
      <circle cx="202" cy="44" r="3.5" fill={INK} />
      <ellipse cx="38" cy="58" rx="22" ry="15" fill={BLUE} {...stroke} />
      <path d="M270 200 V150" {...stroke} fill="none" />
      <path d="M270 150 H298 L306 158 L298 166 H270 Z" fill={W} {...stroke} />
    </>
  ),
  // 번개 모임 반장
  6: () => (
    <>
      <path d="M190 14 L128 118 H168 L148 214 L226 96 H184 Z" fill={W} {...stroke} />
      <Person x={118} y={104} body={PINK}>
        <path d="M24 38 L64 18 L64 62 Z" fill={BLUE} {...stroke} />
        <rect x="14" y="36" width="14" height="18" rx="4" fill={W} {...stroke} />
      </Person>
      <rect x="244" y="40" width="10" height="10" fill={PINK} {...stroke} strokeWidth={3} transform="rotate(20 249 45)" />
      <rect x="40" y="46" width="10" height="10" fill={BLUE} {...stroke} strokeWidth={3} transform="rotate(-15 45 51)" />
      <rect x="270" y="110" width="10" height="10" fill={VIO} {...stroke} strokeWidth={3} />
      <circle cx="40" cy="120" r="7" fill={YEL} {...stroke} strokeWidth={3} />
      {[70, 160, 250].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="212" r="16" fill={W} {...stroke} />
          <path d={`M${x - 20} 240 Q${x} 212 ${x + 20} 240`} fill={[BLUE, VIO, PINK][i]} {...stroke} />
        </g>
      ))}
      <path d="M226 52 q22 -22 44 -6" fill="none" {...stroke} />
      <text x="262" y="34" fontSize="34" fontWeight="900" fill={INK}>!</text>
    </>
  ),
  // 새벽 3시 가설 수집가
  5: () => (
    <>
      <circle cx="248" cy="56" r="32" fill={W} {...stroke} />
      <circle cx="238" cy="62" r="5" fill="none" {...stroke} strokeWidth={3} />
      <circle cx="258" cy="44" r="3.5" fill="none" {...stroke} strokeWidth={3} />
      <Star x={40} y={46} s={1.2} />
      <Star x={196} y={26} s={0.8} fill={W} />
      <Star x={290} y={130} s={0.9} fill={W} />
      <Person x={124} y={118} body={BLUE}>
        <circle cx="0" cy="-50" r="16" fill={YEL} {...stroke} />
        <path d="M-6 -34 V-28 M6 -34 V-28" {...stroke} fill="none" />
        <path d="M-26 -52 H-34 M26 -52 H34 M-18 -66 L-24 -72 M18 -66 L24 -72" {...stroke} fill="none" strokeWidth={3} />
      </Person>
      <rect x="196" y="150" width="86" height="64" rx="8" fill={W} {...stroke} />
      <path d="M210 170 q10 -12 20 0 t20 0 M210 190 h48 M210 202 h30" fill="none" stroke={PINK} strokeWidth="4" strokeLinecap="round" />
      <path d="M196 150 V214" {...stroke} fill="none" />
    </>
  ),
  // 일단 착공하는 건축가
  4: () => (
    <>
      <rect x="196" y="110" width="84" height="104" fill={W} {...stroke} />
      <path d="M196 144 H280 M196 178 H280 M224 110 V214 M252 110 V214" {...stroke} fill="none" strokeWidth={3} />
      <rect x="252" y="144" width="28" height="34" fill={BLUE} {...stroke} strokeWidth={3} />
      <path d="M212 110 V28 H292 M212 28 L252 110" {...stroke} fill="none" />
      <path d="M284 28 V64" stroke={INK} strokeWidth="3" fill="none" />
      <rect x="276" y="64" width="16" height="12" fill={PINK} {...stroke} strokeWidth={3} />
      <Person x={104} y={118} body={VIO}>
        <path d="M-27 -10 Q-27 -34 0 -34 Q27 -34 27 -10 Z" fill={YEL} {...stroke} />
        <rect x="-32" y="-12" width="64" height="8" rx="4" fill={YEL} {...stroke} />
      </Person>
      <rect x="20" y="196" width="70" height="18" rx="9" fill={W} {...stroke} />
      <path d="M32 205 H78" stroke={BLUE} strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  // 속마음 번역가
  3: () => (
    <>
      <Person x={160} y={126} body={PINK} />
      <rect x="28" y="22" width="92" height="52" rx="22" fill={W} {...stroke} />
      <path d="M96 74 L110 92 L112 74" fill={W} {...stroke} />
      <text x="50" y="58" fontSize="30" fontWeight="900" fill={INK}>괜찮아</text>
      <rect x="200" y="22" width="92" height="52" rx="22" fill={BLUE} {...stroke} />
      <path d="M216 74 L212 92 L232 74" fill={BLUE} {...stroke} />
      <path d="M246 60 C228 46 234 34 246 42 C258 34 264 46 246 60 Z" fill={YEL} {...stroke} strokeWidth={3} />
      <path d="M124 48 H196" stroke={INK} strokeWidth="4" strokeLinecap="round" strokeDasharray="2 10" fill="none" />
      <circle cx="40" cy="160" r="5" fill={VIO} {...stroke} strokeWidth={3} />
      <circle cx="286" cy="170" r="6" fill={YEL} {...stroke} strokeWidth={3} />
    </>
  ),
  // 단골집 주인장
  2: () => (
    <>
      <rect x="20" y="20" width="280" height="38" fill={PINK} {...stroke} />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${20 + i * 56} 20 H${48 + i * 56} V58 H${20 + i * 56} Z`} fill={W} stroke="none" opacity="0.9" />
      ))}
      <rect x="20" y="20" width="280" height="38" fill="none" {...stroke} />
      <path d="M20 58 Q34 82 48 58 T76 58 T104 58 T132 58 T160 58 T188 58 T216 58 T244 58 T272 58 T300 58" fill={PINK} {...stroke} />
      <rect x="20" y="168" width="280" height="46" fill={BLUE} {...stroke} />
      <Person x={110} y={122} body={YEL} />
      <path d="M136 168 H236 V146 Q236 126 186 126 Q136 126 136 146 Z" fill={W} {...stroke} />
      <path d="M170 112 q-8 -14 0 -26 M190 112 q-8 -14 0 -26 M210 112 q-8 -14 0 -26" fill="none" {...stroke} strokeWidth={3} />
      <circle cx="268" cy="104" r="16" fill={PINK} {...stroke} />
      <path d="M268 88 V80" {...stroke} fill="none" />
    </>
  ),
  // 심야 서재 탐정
  1: () => (
    <>
      <path d="M44 14 L120 14 L150 130 L14 130 Z" fill={W} opacity="0.7" />
      <path d="M56 16 H108 L96 -2 H68 Z" fill={VIO} {...stroke} />
      <Person x={168} y={116} body={VIO}>
        <circle cx="-9" cy="-2" r="9" fill="none" {...stroke} strokeWidth={3} />
        <circle cx="9" cy="-2" r="9" fill="none" {...stroke} strokeWidth={3} />
        <path d="M0 -2 H0" {...stroke} />
      </Person>
      <circle cx="248" cy="104" r="26" fill={W} opacity="0.9" {...stroke} />
      <path d="M268 124 L296 152" {...stroke} strokeWidth={9} fill="none" />
      <path d="M238 98 q10 -10 20 0" fill="none" stroke={BLUE} strokeWidth="4" strokeLinecap="round" />
      <rect x="44" y="196" width="130" height="18" rx="4" fill={PINK} {...stroke} />
      <rect x="54" y="176" width="110" height="20" rx="4" fill={BLUE} {...stroke} />
      <rect x="64" y="156" width="90" height="20" rx="4" fill={W} {...stroke} />
    </>
  ),
  // 마감 지킴이 장인
  0: () => (
    <>
      <rect x="150" y="26" width="140" height="104" rx="8" fill={W} {...stroke} />
      <rect x="150" y="26" width="140" height="28" fill={PINK} {...stroke} />
      <path d="M180 76 l14 14 l28 -30" fill="none" stroke={BLUE} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M244 76 h22 M244 98 h22 M178 108 h60" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      {[0, 1, 2].map((r) => (
        <g key={r}>
          {[0, 1, 2, 3].map((c) => (
            <rect
              key={c}
              x={150 + c * 36 + (r % 2 ? -18 : 0)}
              y={150 + r * 22}
              width="36"
              height="22"
              rx="5"
              fill={[VIO, BLUE, YEL, W][(r + c) % 4]}
              {...stroke}
              strokeWidth={3}
            />
          ))}
        </g>
      ))}
      <Person x={76} y={116} body={BLUE}>
        <rect x="26" y="40" width="26" height="8" rx="4" fill={W} {...stroke} strokeWidth={3} transform="rotate(-20 39 44)" />
      </Person>
    </>
  ),
};

/** 캐릭터별 장면 일러스트. 글자 없이 도형으로만 그려서 어떤 화면 크기에서도 선명하다. */
export function CharacterArt({
  index,
  name,
  className,
}: {
  index: number;
  name: string;
  className?: string;
}) {
  const scene = SCENES[index];
  return (
    <svg
      viewBox="0 0 320 240"
      role="img"
      aria-label={`${name} 일러스트`}
      className={className}
    >
      {scene ? scene() : null}
    </svg>
  );
}
