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
