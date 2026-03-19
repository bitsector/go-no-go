import { StageType } from "./stages.js";

function formatNumber(value) {
  if (value == null || Number.isNaN(value)) return "–";
  return Math.round(value);
}

function randomGoColor() {
  // Avoid the red/orange hue range (330–30°) to distinguish clearly from No-Go
  const hue = Math.floor(40 + Math.random() * 260); // 40° → 300°
  return `hsl(${hue}, 75%, 50%)`;
}

export function createRenderer() {
  const cueEl = document.getElementById("cue");
  const hintEl = document.getElementById("hint");
  const progressBar = document.getElementById("progress-bar");
  const summaryEl = document.getElementById("summary");
  const counterEl = document.getElementById("stage-counter");

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

  function showStage(type, durationMs, stageIndex, total) {
    // Show a colored circle instead of text
    cueEl.textContent = "";
    // Reset to clean state for every new stage (removes is-captured and circle from prev stage)
    cueEl.className = "cue cue--circle";
    cueEl.style.backgroundColor =
      type === StageType.GO ? randomGoColor() : "var(--danger)";
    hintEl.textContent = type === StageType.GO
      ? "Tap or press Space / Enter"
      : "Wait — do not respond";
    // Update the session progress counter
    counterEl.textContent = `Stage ${stageIndex + 1} / ${total}`;
    counterEl.hidden = false;
    restartProgress(durationMs);
  }

  function showCaptured() {
    cueEl.classList.add("is-captured");
    hintEl.textContent = "Response recorded";
  }

  function showIdle(message = "Press start to begin") {
    stopProgress();
    cueEl.textContent = "Ready?";
    cueEl.className = "cue";
    cueEl.style.backgroundColor = "";
    hintEl.textContent = message;
    counterEl.hidden = true;
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
    stopProgress,
  };
}
