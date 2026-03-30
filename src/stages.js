import { STAGE_DURATION_MAX_MS, STAGE_DURATION_MIN_MS } from "./config.js";

export const StageType = {
  GO: "GO",
  NO_GO: "NO_GO",
};

/** Return a random integer between min and max (inclusive). */
function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateStages(count, goProbability) {
  const noGoCount = Math.max(1, Math.round(count * (1 - goProbability)));
  const goCount = Math.max(0, count - noGoCount);

  const types = [
    ...Array(goCount).fill(StageType.GO),
    ...Array(noGoCount).fill(StageType.NO_GO),
  ];

  // Fisher–Yates shuffle for unbiased ordering.
  for (let i = types.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [types[i], types[j]] = [types[j], types[i]];
  }

  return types.map((type, index) => ({
    index,
    type,
    durationMs: randBetween(STAGE_DURATION_MIN_MS, STAGE_DURATION_MAX_MS),
  }));
}
