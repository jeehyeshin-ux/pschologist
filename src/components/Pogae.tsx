"use client";

import { useId, useMemo } from "react";
import type { Pose } from "@/lib/theme";

const INK = "#17102e";
const PINK = "#ff4fa3";
const BLUE = "#2d5bff";
const VIO = "#6a2be6";
const YEL = "#ffe600";
const W = "#ffffff";

interface PoseDef {
  L: string;
  R: string;
  hL: [number, number];
  hR: [number, number];
  eye: [number, number];
  mouth: "smile" | "open" | "o" | "flat";
  brow?: boolean;
  torch?: boolean;
  happy?: boolean;
  conf?: boolean;
}

const POSES: Record<Pose, PoseDef> = {
  wave: { L: "M50 152 Q28 180 34 204", R: "M192 152 Q230 134 226 84", hL: [34, 204], hR: [226, 84], eye: [0, 0], mouth: "smile" },
  present: { L: "M50 152 Q20 154 8 128", R: "M192 152 Q222 154 234 128", hL: [8, 128], hR: [234, 128], eye: [0, 1], mouth: "open" },
  point: { L: "M50 152 Q30 180 36 204", R: "M192 152 Q228 150 256 144", hL: [36, 204], hR: [256, 144], eye: [4, 0], mouth: "smile" },
  think: { L: "M50 152 Q30 180 36 204", R: "M192 152 Q206 196 150 184", hL: [36, 204], hR: [150, 184], eye: [-4, -4], mouth: "flat", brow: true },
  light: { L: "M50 152 Q30 180 36 204", R: "M192 152 Q226 164 240 140", hL: [36, 204], hR: [240, 140], eye: [5, 0], mouth: "o", torch: true },
  cheer: { L: "M50 152 Q16 124 28 70", R: "M192 152 Q228 124 214 70", hL: [28, 70], hR: [214, 70], eye: [0, 0], mouth: "open", happy: true, conf: true },
};

const POSE_LABEL: Record<Pose, string> = {
  wave: "손을 흔드는",
  present: "두 팔을 펼친",
  point: "가리키는",
  think: "턱을 괴고 생각하는",
  light: "손전등을 든",
  cheer: "만세하는",
};

function limb(d: string, col: string) {
  return `<path d="${d}" fill="none" stroke="${INK}" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`;
}
const hand = (x: number, y: number) =>
  `<circle cx="${x}" cy="${y}" r="11" fill="${W}" stroke="${INK}" stroke-width="4.5"/>`;

function mouth(t: PoseDef["mouth"]) {
  if (t === "smile") return `<path d="M104 166 Q121 186 138 166" fill="none" stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/>`;
  if (t === "open") return `<path d="M102 162 Q121 198 140 162 Z" fill="${INK}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><ellipse cx="121" cy="180" rx="9" ry="5.5" fill="${PINK}"/>`;
  if (t === "o") return `<ellipse cx="121" cy="172" rx="8" ry="10" fill="${INK}"/>`;
  return `<path d="M106 172 Q121 166 136 174" fill="none" stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/>`;
}

function eyes(p: PoseDef) {
  let s = "";
  for (const x of [102, 140]) {
    if (p.happy) {
      s += `<path d="M${x - 13} 134 Q${x} 112 ${x + 13} 134" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`;
      continue;
    }
    s += `<circle cx="${x}" cy="132" r="16" fill="${W}" stroke="${INK}" stroke-width="5"/><circle cx="${x + p.eye[0]}" cy="${132 + p.eye[1]}" r="7.5" fill="${INK}"/><circle cx="${x + p.eye[0] + 2.5}" cy="${132 + p.eye[1] - 2.5}" r="2.4" fill="${W}"/>`;
  }
  if (p.brow) s += `<path d="M124 108 Q142 98 154 110" fill="none" stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/>`;
  return s;
}

function build(pose: Pose, id: string): string {
  const p = POSES[pose];
  const A = `<ellipse cx="104" cy="142" rx="62" ry="80" transform="rotate(-7 104 142)"/>`;
  const B = `<ellipse cx="140" cy="142" rx="62" ry="80" transform="rotate(7 140 142)"/>`;
  let s = `<svg viewBox="-24 0 316 276" width="100%" aria-hidden="true" focusable="false">`;
  s += `<defs><clipPath id="${id}a">${A}</clipPath><clipPath id="${id}b">${A}${B}</clipPath><clipPath id="${id}r"><rect x="-30" y="176" width="340" height="120"/></clipPath><pattern id="${id}h" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1.5" fill="${INK}" opacity=".34"/></pattern></defs>`;
  if (p.conf) {
    const cf: [number, number, string][] = [[-6, 30, YEL], [250, 40, PINK], [266, 110, BLUE], [-10, 110, PINK], [240, 12, YEL], [8, 6, BLUE]];
    cf.forEach((c, i) => {
      s += i % 2
        ? `<rect x="${c[0]}" y="${c[1]}" width="11" height="11" fill="${c[2]}" stroke="${INK}" stroke-width="3" transform="rotate(${i * 25} ${c[0]} ${c[1]})"/>`
        : `<circle cx="${c[0]}" cy="${c[1]}" r="7" fill="${c[2]}" stroke="${INK}" stroke-width="3"/>`;
    });
  }
  s += limb("M96 214 L94 242", PINK) + limb("M146 214 L148 242", BLUE);
  s += `<ellipse cx="86" cy="248" rx="19" ry="9" fill="${W}" stroke="${INK}" stroke-width="4.5"/><ellipse cx="156" cy="248" rx="19" ry="9" fill="${W}" stroke="${INK}" stroke-width="4.5"/>`;
  s += `<path d="M121 64 Q108 40 124 28 Q142 20 140 40" fill="none" stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/><circle cx="140" cy="40" r="9" fill="${YEL}" stroke="${INK}" stroke-width="4.5"/>`;
  s += `<g fill="${INK}" stroke="${INK}" stroke-width="9" stroke-linejoin="round">${A}${B}</g>`;
  s += `<g fill="${PINK}">${A}</g><g fill="${BLUE}">${B}</g><g clip-path="url(#${id}a)" fill="${VIO}">${B}</g>`;
  s += `<g clip-path="url(#${id}r)"><g clip-path="url(#${id}b)"><rect x="0" y="0" width="300" height="300" fill="url(#${id}h)"/></g></g>`;
  s += eyes(p) + mouth(p.mouth);
  s += limb(p.L, PINK) + limb(p.R, BLUE) + hand(p.hL[0], p.hL[1]) + hand(p.hR[0], p.hR[1]);
  if (p.torch) {
    s += `<polygon points="244,134 300,82 304,166" fill="${YEL}" opacity=".9"/><g transform="rotate(-38 240 140)"><rect x="236" y="130" width="34" height="20" fill="${YEL}" stroke="${INK}" stroke-width="4.5"/><rect x="226" y="126" width="14" height="28" fill="${W}" stroke="${INK}" stroke-width="4.5"/></g>` + hand(p.hR[0], p.hR[1]);
  }
  if (pose === "think") {
    s += `<text x="206" y="74" style="font-family:var(--font-display)" font-size="64" fill="${INK}" stroke="${W}" stroke-width="2" paint-order="stroke">?</text>`;
  }
  return s + "</svg>";
}

/** 캐릭터 '포개'. 장식이 아니라 설명 역할이므로 대체 텍스트를 붙인다. */
export function Pogae({
  pose = "wave",
  className = "",
  wobble = false,
  label,
}: {
  pose?: Pose;
  className?: string;
  wobble?: boolean;
  label?: string;
}) {
  const raw = useId();
  const id = "pg" + raw.replace(/[^a-zA-Z0-9]/g, "");
  const html = useMemo(() => build(pose, id), [pose, id]);
  return (
    <div
      role="img"
      aria-label={label ?? `캐릭터 포개, ${POSE_LABEL[pose]} 모습`}
      className={`${wobble ? "wob" : ""} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
