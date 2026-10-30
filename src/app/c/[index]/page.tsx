import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CharacterArt } from "@/components/CharacterArt";
import { Card, Disclaimer, LinkButton, Shell } from "@/components/ui";
import { characterOf, characters } from "@/data/content/characters";
import { characterUrl } from "@/lib/site";

type Params = { index: string };

const find = (raw: string) => {
  const n = Number(raw);
  return Number.isInteger(n) ? characterOf(n) : undefined;
};

export function generateStaticParams(): Params[] {
  return characters.map((c) => ({ index: String(c.index) }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const c = find((await params).index);
  if (!c) return {};
  const title = `나는 '${c.name}' — 마음 탐색실`;
  const image = `/share/c${c.index}.png`;
  return {
    title,
    description: c.tagline,
    alternates: { canonical: characterUrl(c.index) },
    openGraph: {
      title,
      description: c.tagline,
      url: characterUrl(c.index),
      images: [{ url: image, width: 1200, height: 630, alt: c.name }],
    },
    twitter: { card: "summary_large_image", title, description: c.tagline, images: [image] },
  };
}

export default async function CharacterSharePage({ params }: { params: Promise<Params> }) {
  const c = find((await params).index);
  if (!c) notFound();
  return (
    <Shell>
      <p className="mt-2 font-mono text-sm font-medium">친구가 이 캐릭터에 가깝대요</p>
      <Card className="mt-3" tone="yellow">
        <CharacterArt index={c.index} name={c.name} className="mx-auto w-full max-w-[360px]" />
        <p className="mt-2 font-mono text-sm font-medium">{c.tagline}</p>
        <h1 className="mt-1 font-display text-[clamp(44px,13vw,72px)] leading-[0.98] tracking-[-0.03em] break-keep">
          {c.name}
        </h1>
        <p className="mt-4 text-base leading-relaxed">{c.intro}</p>
      </Card>
      <div className="mt-6 flex flex-col gap-3">
        <LinkButton href="/">나는 어떤 캐릭터일까? 해 보기</LinkButton>
      </div>
      <Disclaimer />
    </Shell>
  );
}
