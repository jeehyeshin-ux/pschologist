import { notFound } from "next/navigation";
import { TestClient } from "@/components/TestClient";
import { TEST_IDS, type TestId } from "@/lib/types";

export function generateStaticParams() {
  return TEST_IDS.map((id) => ({ id }));
}

export default async function Page({ params }: PageProps<"/test/[id]">) {
  const { id } = await params;
  if (!TEST_IDS.includes(id as TestId)) notFound();
  return <TestClient id={id as TestId} />;
}
