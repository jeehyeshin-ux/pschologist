interface Props {
  items: { label: string; value: number }[];
  title: string;
}

const SIZE = 320;
const C = SIZE / 2;
const R = 100;

function pt(i: number, n: number, r: number): [number, number] {
  const a = (Math.PI * 2 * i) / n - Math.PI / 2;
  return [C + r * Math.cos(a), C + r * Math.sin(a)];
}

/** 의존성 없는 SVG 레이더 차트. 값은 0~100. */
export function RadarChart({ items, title }: Props) {
  const n = items.length;
  const poly = (r: (i: number) => number) =>
    items.map((_, i) => pt(i, n, r(i)).join(",")).join(" ");
  return (
    <figure className="mx-auto w-full max-w-[340px]">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label={`${title}: ${items.map((d) => `${d.label} ${d.value}점`).join(", ")}`}
        className="w-full"
      >
        {[25, 50, 75, 100].map((p) => (
          <polygon
            key={p}
            points={poly(() => (R * p) / 100)}
            fill="none"
            stroke="var(--ink)"
            strokeOpacity={0.25}
            strokeWidth={1.5}
          />
        ))}
        {items.map((_, i) => {
          const [x, y] = pt(i, n, R);
          return (
            <line key={i} x1={C} y1={C} x2={x} y2={y} stroke="var(--ink)" strokeOpacity={0.25} strokeWidth={1.5} />
          );
        })}
        <polygon
          points={poly((i) => (R * items[i].value) / 100)}
          fill="var(--pink)"
          fillOpacity={0.55}
          stroke="var(--ink)"
          strokeWidth={4}
          strokeLinejoin="round"
        />
        {items.map((d, i) => {
          const [x, y] = pt(i, n, (R * d.value) / 100);
          return <circle key={d.label} cx={x} cy={y} r={6} fill="var(--yellow)" stroke="var(--ink)" strokeWidth={3} />;
        })}
        {items.map((d, i) => {
          const [x, y] = pt(i, n, R + 26);
          const anchor = x < C - 8 ? "end" : x > C + 8 ? "start" : "middle";
          return (
            <text
              key={d.label}
              x={x}
              y={y}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize={14}
              fontWeight={800}
              fill="var(--ink)"
            >
              {d.label}
            </text>
          );
        })}
      </svg>
    </figure>
  );
}
