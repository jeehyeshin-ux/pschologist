"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

/**
 * 이미지 저장과 공유. 이미지와 공유 문구에는 항상 주소가 들어 있다.
 * - 공유: 지원하는 기기에서는 이미지 파일까지 함께 보내고, 아니면 주소를 복사한다.
 */
export function ShareBar({
  url,
  title,
  text,
  imageSrc,
  imageName,
}: {
  url: string;
  title: string;
  text: string;
  imageSrc?: string;
  imageName?: string;
}) {
  const [note, setNote] = useState("");

  const fetchImage = async () => {
    if (!imageSrc) return null;
    const res = await fetch(imageSrc);
    return res.ok ? await res.blob() : null;
  };

  const save = async () => {
    const blob = await fetchImage();
    if (!blob) return setNote("이미지를 불러오지 못했어요.");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = imageName ?? "mind-lab.png";
    a.click();
    URL.revokeObjectURL(a.href);
    setNote("이미지를 저장했어요. 이미지에도 주소가 들어 있어요.");
  };

  const share = async () => {
    const message = `${text}\n${url}`;
    try {
      const blob = await fetchImage();
      const file = blob ? new File([blob], imageName ?? "mind-lab.png", { type: "image/png" }) : null;
      if (file && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ title, text: message, files: [file] });
        return;
      }
      if (navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }
      await navigator.clipboard.writeText(message);
      setNote("주소를 복사했어요. 붙여 넣어서 보내 보세요.");
    } catch (e) {
      // 사용자가 공유 창을 닫은 경우는 알리지 않는다.
      if (!(e instanceof DOMException && e.name === "AbortError")) {
        setNote("공유하지 못했어요. 주소를 직접 복사해 주세요: " + url);
      }
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Button onClick={share}>공유하기</Button>
      {imageSrc && (
        <Button variant="secondary" onClick={save}>
          이미지 저장
        </Button>
      )}
      <p className="min-h-5 text-sm font-medium" aria-live="polite">
        {note}
      </p>
    </div>
  );
}
