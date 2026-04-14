// Pure utility functions: fraction parsing, GCD, clamping, bool arrays, factor pairs.

import { FQFraction, FQRectDims } from "./types";

export function clampInt(value: unknown, min: number, max: number, fallback: number): number {
  let n = parseInt(String(value), 10);
  if (!Number.isFinite(n)) n = fallback;
  if (!Number.isFinite(n)) n = min;
  if (n < min) n = min;
  if (n > max) n = max;
  return n | 0;
}

export function gcd(a: number, b: number): number {
  a = Math.abs(a | 0);
  b = Math.abs(b | 0);
  while (b) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a || 1;
}

function fractionFromDecimalString(str: string): { num: number; den: number } {
  const s = String(str == null ? "" : str).trim().replace(",", ".");
  if (!s) return { num: 0, den: 1 };

  if (/e/i.test(s)) {
    const x = Number(s);
    if (!Number.isFinite(x)) return { num: 0, den: 1 };
    const fixed = x.toFixed(12).replace(/0+$/, "").replace(/\.$/, "");
    return fractionFromDecimalString(fixed);
  }

  if (!/^[-+]?\d*(?:\.\d+)?$/.test(s)) {
    return { num: 0, den: 1 };
  }

  const sign = s.startsWith("-") ? -1 : 1;
  const unsigned = s.replace(/^[-+]/, "");
  const parts = unsigned.split(".");
  const intPart = parts[0] || "0";
  const fracPart = parts[1] || "";

  if (!fracPart) {
    return { num: sign * parseInt(intPart, 10), den: 1 };
  }

  const den = Math.pow(10, fracPart.length);
  const num = sign * (parseInt(intPart, 10) * den + parseInt(fracPart, 10));
  return { num, den };
}

export function parseFraction(raw: unknown): FQFraction {
  let num = 0;
  let den = 1;
  const original = raw;

  if (raw && typeof raw === "object" && Number.isFinite((raw as any).num) && Number.isFinite((raw as any).den)) {
    num = (raw as any).num;
    den = (raw as any).den;
  } else if (typeof raw === "number") {
    const f = fractionFromDecimalString(String(raw));
    num = f.num;
    den = f.den;
  } else {
    const s0 = String(raw == null ? "" : raw).trim();
    const s = s0.replace(/^\((.*)\)$/, "$1").trim();

    if (s.includes("/")) {
      const m = s.match(/^\s*([-+]?\d+)\s*\/\s*([-+]?\d+)\s*$/);
      if (m) {
        num = parseInt(m[1], 10);
        den = parseInt(m[2], 10);
      } else {
        const f = fractionFromDecimalString(s);
        num = f.num;
        den = f.den;
      }
    } else {
      const f = fractionFromDecimalString(s);
      num = f.num;
      den = f.den;
    }
  }

  if (!Number.isFinite(num)) num = 0;
  if (!Number.isFinite(den) || den === 0) den = 1;
  if (den < 0) { num = -num; den = -den; }

  const g = gcd(num, den);
  num = num / g;
  den = den / g;

  if (num < 0) num = 0;
  if (num > den) num = den;

  return { num, den, value: den ? num / den : 0, raw: original };
}

export function bestFactorPair(n: number): FQRectDims {
  n = Math.max(1, n | 0);
  let bestA = 1;
  let bestB = n;
  let bestDiff = Math.abs(bestB - bestA);

  for (let a = 1; a * a <= n; a++) {
    if (n % a !== 0) continue;
    const b = n / a;
    const diff = Math.abs(b - a);
    if (diff < bestDiff) {
      bestA = a;
      bestB = b;
      bestDiff = diff;
    }
  }

  return { cols: Math.min(bestA, bestB), rows: Math.max(bestA, bestB) };
}

export function boolArray(length: number, source: boolean[] | null): boolean[] {
  const n = Math.max(1, length | 0);
  const out: boolean[] = Array(n).fill(false);
  if (Array.isArray(source)) {
    for (let i = 0; i < Math.min(n, source.length); i++) out[i] = !!source[i];
  }
  return out;
}

