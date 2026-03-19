import { StageType } from "./stages.js";

function formatNumber(value) {
  if (value == null || Number.isNaN(value)) return "–";
  return Math.round(value);
}

export function createRenderer() {
  const cueEl = document.getElementById("cue");
  const hintEl = document.getElementById("hint");
  const progressBar = document.getElementById("progress-bar");
  const summaryEl = document.getElementById("summary");

  const statGoResponses = document.getElementById("stat-go-responses");
  const statGoMisses = document.getElementById("stat-go-misses");
  const statNoGoResponses = document.getElementById("stat-no-go-responses");
  const statNoGoWaits = document.getElementById("stat-no-go-waits");
  const statGoRtMean = document.getElementById("stat-go-rt-mean");
  const statGoRtSd = document.getElementById("stat-go-rt-sd");
  const statNoGoRtMean = document.getElementById("stat-no-go-rt-mean");
  const statNoGoRtSd = document.getElementById("stat-no-go-rt-sd");

  function restartProgress(durationMs) {
    progressBar.classList.remove("is-running");
    // Force reflow so the animation can restart.
    // eslint-disable-next-line no-unused-expressions
    progressBar.offsetWidth;
    progressBar.style.setProperty("--duration", `${durationMs}ms`);
    progressBar.classList.add("is-running");
  }

  function stopProgress() {
    progressBar.classList.remove("is-running");
  }

  function showStage(type, durationMs) {
    cueEl.textContent = type === StageType.GO ? "GO" : "NO GO";
    cueEl.style.color = type === StageType.GO ? "var(--text)" : "var(--danger)";
    hintEl.textContent = type === StageType.GO
      ? "Respond within 3 seconds"
      : "Do not respond for 3 seconds";
    restartProgress(durationMs);
  }

  function showCaptured() {
    hintEl.textContent = "Response recorded";
  }

  function showFixation() {
    stopProgress();
    cueEl.textContent = "+";
    cueEl.style.color = "var(--muted)";
    hintEl.textContent = "";
  }

  function showIdle(message = "Press start to begin") {
    stopProgress();
    cueEl.textContent = "Ready?";
    cueEl.style.color = "var(--text)";
    hintEl.textContent = message;
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
    showFixation,
    showIdle,
    showSummary,
    hideSummary,
    stopProgress,
  };
}
