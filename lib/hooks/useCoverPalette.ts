"use client";

import { useEffect, useState } from "react";

export type CoverPalette = {
  dark: string;
  base: string;
  accent: string;
  textOnDark: string;
  ready: boolean;
};

const FALLBACK: CoverPalette = {
  dark: "#1a1a2e",
  base: "#3d2645",
  accent: "#feb0c1",
  textOnDark: "#ffd6e0",
  ready: false,
};

function extractPalette(img: HTMLImageElement): CoverPalette {
  const canvas = document.createElement("canvas");
  const SIZE = 48;
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return FALLBACK;

  ctx.drawImage(img, 0, 0, SIZE, SIZE);

  let data: Uint8ClampedArray;
  try {
    data = ctx.getImageData(0, 0, SIZE, SIZE).data;
  } catch {
    return FALLBACK;
  }

  type Sample = { r: number; g: number; b: number; h: number; s: number; l: number };
  const samples: Sample[] = [];

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (a < 200) continue;

    const { h, s, l } = rgbToHsl(r, g, b);
    samples.push({ r, g, b, h, s, l });
  }

  if (samples.length === 0) return FALLBACK;

  const BUCKETS = 12;
  const buckets: { count: number; r: number; g: number; b: number; s: number; l: number }[] =
    Array.from({ length: BUCKETS }, () => ({ count: 0, r: 0, g: 0, b: 0, s: 0, l: 0 }));

  for (const sm of samples) {
    const idx = Math.floor((sm.h / 360) * BUCKETS) % BUCKETS;
    const bk = buckets[idx];
    bk.count++;
    bk.r += sm.r;
    bk.g += sm.g;
    bk.b += sm.b;
    bk.s += sm.s;
    bk.l += sm.l;
  }

  const populated = buckets
    .filter((b) => b.count > 0)
    .map((b) => ({
      count: b.count,
      r: Math.round(b.r / b.count),
      g: Math.round(b.g / b.count),
      b: Math.round(b.b / b.count),
      s: b.s / b.count,
      l: b.l / b.count,
    }));

  const minCount = samples.length * 0.02;
  const accentCandidate =
    populated
      .filter((b) => b.count >= minCount)
      .sort((a, b) => {
        const scoreA = a.s * (1 - Math.abs(a.l - 0.5));
        const scoreB = b.s * (1 - Math.abs(b.l - 0.5));
        return scoreB - scoreA;
      })[0] ?? populated[0];

  const darkCandidate = [...populated].sort((a, b) => a.l - b.l)[0];

  const totalCount = populated.reduce((s, b) => s + b.count, 0);
  const avg = populated.reduce(
    (acc, b) => ({
      r: acc.r + (b.r * b.count) / totalCount,
      g: acc.g + (b.g * b.count) / totalCount,
      b: acc.b + (b.b * b.count) / totalCount,
    }),
    { r: 0, g: 0, b: 0 }
  );

  const dark = adjustLightness(darkCandidate.r, darkCandidate.g, darkCandidate.b, 0.16);
  const base = adjustLightness(avg.r, avg.g, avg.b, 0.30);
  const accent = adjustSaturationLightness(accentCandidate.r, accentCandidate.g, accentCandidate.b, 0.62, 0.58);
  const textOnDark = adjustSaturationLightness(accentCandidate.r, accentCandidate.g, accentCandidate.b, 0.55, 0.82);

  return { dark, base, accent, textOnDark, ready: true };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      default:
        h = ((r - g) / d + 4) * 60;
    }
  }
  return { h, s, l };
}

function hslToHex(h: number, s: number, l: number) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toHex = (v: number) =>
    Math.round((v + m) * 255).toString(16).padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function adjustLightness(r: number, g: number, b: number, targetL: number) {
  const { h, s } = rgbToHsl(r, g, b);
  return hslToHex(h, Math.max(s, 0.25), targetL);
}

function adjustSaturationLightness(r: number, g: number, b: number, targetS: number, targetL: number) {
  const { h } = rgbToHsl(r, g, b);
  return hslToHex(h, targetS, targetL);
}

export function useCoverPalette(coverUrl: string): CoverPalette {
  const [palette, setPalette] = useState<CoverPalette>(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    setPalette(FALLBACK);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (cancelled) return;
      const result = extractPalette(img);
      setPalette(result);
    };
    img.onerror = () => {
      if (cancelled) return;
      setPalette(FALLBACK);
    };
    img.src = coverUrl;

    return () => {
      cancelled = true;
    };
  }, [coverUrl]);

  return palette;
}