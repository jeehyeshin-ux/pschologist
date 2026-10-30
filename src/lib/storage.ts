"use client";

import { useEffect, useState } from "react";
import { TEST_IDS, type StoredResult, type TestId } from "@/lib/types";

/**
 * 결과는 서버로 보내지 않고 이 기기 브라우저에만 둔다.
 * - 기본: sessionStorage (탭을 닫으면 사라짐)
 * - 사용자가 저장에 동의하면: localStorage
 */
const PREFIX = "psy:result:";
const CONSENT_KEY = "psy:consent";
const EVENT = "psy:change";

function safe<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

export function hasConsent(): boolean {
  return safe(() => localStorage.getItem(CONSENT_KEY) === "1", false);
}

export function saveResult(result: StoredResult) {
  const json = JSON.stringify(result);
  const key = PREFIX + result.testId;
  safe(() => sessionStorage.setItem(key, json), undefined);
  if (hasConsent()) safe(() => localStorage.setItem(key, json), undefined);
  emit();
}

export function setConsent(on: boolean) {
  safe(() => {
    if (on) {
      localStorage.setItem(CONSENT_KEY, "1");
      for (const id of TEST_IDS) {
        const v = sessionStorage.getItem(PREFIX + id);
        if (v && !localStorage.getItem(PREFIX + id)) {
          localStorage.setItem(PREFIX + id, v);
        }
      }
    } else {
      localStorage.removeItem(CONSENT_KEY);
      for (const id of TEST_IDS) localStorage.removeItem(PREFIX + id);
    }
  }, undefined);
  emit();
}

export function clearAll() {
  safe(() => {
    localStorage.removeItem(CONSENT_KEY);
    for (const id of TEST_IDS) {
      localStorage.removeItem(PREFIX + id);
      sessionStorage.removeItem(PREFIX + id);
    }
  }, undefined);
  emit();
}

function read(id: TestId): StoredResult | null {
  return safe(() => {
    const raw =
      sessionStorage.getItem(PREFIX + id) ?? localStorage.getItem(PREFIX + id);
    return raw ? (JSON.parse(raw) as StoredResult) : null;
  }, null);
}

export function readAll(): StoredResult[] {
  return TEST_IDS.map(read).filter((r): r is StoredResult => r !== null);
}

function emit() {
  window.dispatchEvent(new Event(EVENT));
}

export function useResults() {
  const [state, setState] = useState<{
    ready: boolean;
    results: StoredResult[];
    consent: boolean;
  }>({ ready: false, results: [], consent: false });

  useEffect(() => {
    const update = () =>
      setState({ ready: true, results: readAll(), consent: hasConsent() });
    update();
    window.addEventListener(EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return state;
}

/**
 * 검사 도중 응답을 이 탭(sessionStorage)에만 잠깐 둔다. 새로고침해도 이어서 할 수 있게 하기 위한 것이며,
 * 탭을 닫으면 사라지고 서버로 가지 않는다.
 */
export interface Progress {
  i: number;
  answers: Record<string, number>;
  /** 지금까지 문항을 보고 있던 누적 시간(ms) */
  elapsed: number;
}
const PROGRESS = "psy:progress:";

export function loadProgress(id: TestId): Progress | null {
  return safe(() => {
    const raw = sessionStorage.getItem(PROGRESS + id);
    if (!raw) return null;
    const p = JSON.parse(raw) as Progress;
    return Number.isInteger(p.i) && p.answers && typeof p.answers === "object" ? p : null;
  }, null);
}

export function saveProgress(id: TestId, p: Progress) {
  safe(() => sessionStorage.setItem(PROGRESS + id, JSON.stringify(p)), undefined);
}

export function clearProgress(id: TestId) {
  safe(() => sessionStorage.removeItem(PROGRESS + id), undefined);
}
