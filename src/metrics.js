import { StageType } from "./stages.js";

function mean(arr) {
  if (!arr.length) return null;
  const total = arr.reduce((sum, value) => sum + value, 0);
  return total / arr.length;
}

function standardDeviation(arr) {
  if (arr.length < 2) return null;
  const m = mean(arr);
  const variance = arr.reduce((sum, value) => sum + (value - m) ** 2, 0) / arr.length;
  return Math.sqrt(variance);
}

export function computeSummary(log) {
  const goRts = [];
  const noGoRts = [];
  let goResponses = 0;
  let goMisses = 0;
  let noGoResponses = 0;
  let noGoWaits = 0;

  for (const entry of log) {
    const responded = entry.responded;
    const rt = entry.rtMs;
    const isGo = entry.type === StageType.GO;

    if (isGo) {
      if (responded) {
        goResponses += 1;
        if (rt != null) goRts.push(rt);
      } else {
        goMisses += 1;
      }
    } else {
      if (responded) {
        noGoResponses += 1;
        if (rt != null) noGoRts.push(rt);
      } else {
        noGoWaits += 1;
      }
    }
  }

  return {
    goResponses,
    goMisses,
    noGoResponses,
    noGoWaits,
    goRtMean: mean(goRts),
    goRtSd: standardDeviation(goRts),
    noGoRtMean: mean(noGoRts),
    noGoRtSd: standardDeviation(noGoRts),
  };
}
