import { LevelBar } from "@/components/charts/Bars";
import { Card, Easy } from "@/components/ui";
import type { ScaleInfo } from "@/data/content/types";
import { levelOf } from "@/lib/scoring";

export function ScaleCard({
  info,
  score,
  delay = 0,
  hideValue = false,
  showEasy = true,
}: {
  info: ScaleInfo;
  score: number;
  delay?: number;
  hideValue?: boolean;
  showEasy?: boolean;
}) {
  return (
    <Card delay={delay}>
      <LevelBar value={score} label={info.name} hideValue={hideValue} />
      <p className="mt-4 text-base leading-relaxed">{info.levels[levelOf(score)]}</p>
      {showEasy && <Easy>{info.easy}</Easy>}
    </Card>
  );
}
