import { notFound } from "next/navigation";
import { ResultClient } from "@/components/ResultClient";
import { TEST_IDS, type TestId } from "@/lib/types";

export function generateStaticParams() {
  return TEST_IDS.map((id) => ({ id }));
}

export default async function Page({ params }: PageProps<"/result/[id]">) {
  const { id } = await params;
  if (!TEST_IDS.includes(id as TestId)) notFound();
  return <ResultClient id={id as TestId} />;
}
