import { StageType } from "./stages.js";
import { GO_COLORS } from "./config.js";

function formatNumber(value) {
  if (value == null || Number.isNaN(value)) return "–";
  return Math.round(value);
}

function randomGoColor() {
  return GO_COLORS[Math.floor(Math.random() * GO_COLORS.length)];
}

export function createRenderer() {
  const cueEl = document.getElementById("cue");
  const summaryEl = document.getElementById("summary");

  const statGoResponses = document.getElementById("stat-go-responses");
  const statGoMisses = document.getElementById("stat-go-misses");
  const statNoGoResponses = document.getElementById("stat-no-go-responses");
  const statNoGoWaits = document.getElementById("stat-no-go-waits");
  const statGoRtMean = document.getElementById("stat-go-rt-mean");
  const statGoRtSd = document.getElementById("stat-go-rt-sd");
  const statNoGoRtMean = document.getElementById("stat-no-go-rt-mean");
  const statNoGoRtSd = document.getElementById("stat-no-go-rt-sd");

  function setCueColor(color) {
    cueEl.style.backgroundColor = color;
    cueEl.textContent = "";
  }

  function showStage(type) {
    if (type === StageType.GO) {
      setCueColor(randomGoColor());
    } else {
      setCueColor("var(--danger)");
    }
  }

  function showCaptured() {
    // No text shown; keep visual steady.
  }

  function showIdle() {
    setCueColor("var(--cue-neutral)");
  }

  function showSummary(summary) {
    statGoResponses.textContent = summary.goResponses;
    statGoMisses.textContent = summary.goMisses;
    statNoGoResponses.textContent = summary.noGoResponses;
    statNoGoWaits.textContent = summary.noGoWaits;
    statGoRtMean.textContent = formatNumber(summary.goRtMean);
    statGoRtSd.textContent = formatNumber(summary.goRtSd);
    statNoGoRtMean.textContent = formatNumber(summary.noGoRtMean);
    statNoGoRtSd.textContent = formatNumber(summary.noGoRtSd);
    summaryEl.hidden = false;
  }

  function hideSummary() {
    summaryEl.hidden = true;
  }

  return {
    showStage,
    showCaptured,
    showIdle,
    showSummary,
    hideSummary,
  };
}
