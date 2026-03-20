import { StageType } from "./stages.js";
import { GO_COLORS, NO_GO_COLOR } from "./config.js";

function pickGoColor() {
  return GO_COLORS[Math.floor(Math.random() * GO_COLORS.length)];
}

function formatNum(v) {
  if (v == null || Number.isNaN(v)) return "–";
  return Math.round(v);
}

export function createRenderer() {
  const screenIntro   = document.getElementById("screen-intro");
  const screenGame    = document.getElementById("screen-game");
  const screenSummary = document.getElementById("screen-summary");
  const ballEl        = document.getElementById("ball");
  const feedbackEl    = document.getElementById("feedback");
  const statsList     = document.getElementById("stats-list");
  const restartBtn    = document.getElementById("restart-button");

  /** Show exactly one screen; hide the others. */
  function showScreen(active) {
    for (const s of [screenIntro, screenGame, screenSummary]) {
      s.hidden = s !== active;
    }
  }

  /** Clear the RT / error indicator. */
  function clearFeedback() {
    feedbackEl.className = "feedback";
    feedbackEl.textContent = "";
  }

  /** Show the full-screen game canvas. */
  function showGame() {
    showScreen(screenGame);
    ballEl.classList.remove("is-visible");
    clearFeedback();
  }

  /** Colour and reveal the ball for the given stage type. */
  function showStage(type) {
    clearFeedback();
    ballEl.style.backgroundColor =
      type === StageType.GO ? pickGoColor() : NO_GO_COLOR;
    ballEl.classList.add("is-visible");
  }

  /** Hide the ball between stages. */
  function hideBall() {
    ballEl.classList.remove("is-visible");
  }

  /**
   * Show green RT number (Go response) or red ✗ (No-Go commission error)
   * on the right side of the screen.
   */
  function showFeedback(type, rtMs) {
    if (type === StageType.GO) {
      feedbackEl.textContent = String(Math.round(rtMs));
      feedbackEl.className = "feedback feedback--rt";
    } else {
      feedbackEl.textContent = "✗";
      feedbackEl.className = "feedback feedback--error";
    }
  }

  /** Show the intro / start screen. */
  function showIdle() {
    showScreen(screenIntro);
    clearFeedback();
  }

  /** Render the end-of-session summary and wire the replay button. */
  function showSummary(summary, onRestart) {
    showScreen(screenSummary);

    const rows = [
      ["Go responses",    summary.goResponses],
      ["Missed Go",       summary.goMisses],
      ["No-Go errors",    summary.noGoResponses],
      ["No-Go correct",   summary.noGoWaits],
      ["Go RT mean (ms)", formatNum(summary.goRtMean)],
      ["Go RT SD (ms)",   formatNum(summary.goRtSd)],
    ];

    statsList.innerHTML = rows
      .map(([label, val]) =>
        `<div class="stat"><dt>${label}</dt><dd>${val}</dd></div>`)
      .join("");

    restartBtn.onclick = onRestart;
  }

  return { showGame, showStage, hideBall, showFeedback, showIdle, showSummary };
}
