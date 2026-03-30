import { StageType } from "./stages.js";
import { GO_COLORS, NO_GO_COLOR } from "./config.js";
import { playBuzz } from "./sound.js";

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
  const homeBtn       = document.getElementById("home-button");
  const exitBtn       = document.getElementById("exit-button");

  // ── DVD-logo bounce animation ──────────────────────────────

  let rafId       = null;
  let bx = 0, by = 0, vx = 0, vy = 0, lastFrameTs = 0;

  function bounceTick(ts) {
    const dt    = Math.min(ts - lastFrameTs, 50); // cap to prevent big jump after tab switch
    lastFrameTs = ts;

    const ballW = ballEl.offsetWidth;
    const ballH = ballEl.offsetHeight;
    const sw    = screenGame.clientWidth;
    const sh    = screenGame.clientHeight;

    bx += vx * dt / 1000;
    by += vy * dt / 1000;

    if (bx <= 0)          { bx = 0;          vx =  Math.abs(vx); }
    if (bx + ballW >= sw) { bx = sw - ballW;  vx = -Math.abs(vx); }
    if (by <= 0)          { by = 0;           vy =  Math.abs(vy); }
    if (by + ballH >= sh) { by = sh - ballH;  vy = -Math.abs(vy); }

    ballEl.style.left = Math.round(bx) + "px";
    ballEl.style.top  = Math.round(by) + "px";

    rafId = requestAnimationFrame(bounceTick);
  }

  function startBounce() {
    stopBounce();

    const ballW = ballEl.offsetWidth  || 200;
    const ballH = ballEl.offsetHeight || 200;
    const sw    = screenGame.clientWidth  || window.innerWidth;
    const sh    = screenGame.clientHeight || window.innerHeight;

    // Random starting position that keeps the ball fully on screen.
    bx = Math.max(0, Math.random() * (sw - ballW));
    by = Math.max(0, Math.random() * (sh - ballH));

    // DVD-screensaver style: equal speed on both axes, random direction per axis.
    // Using a fixed per-axis speed avoids the near-vertical / near-horizontal
    // degenerate cases that arise when sampling an angle centred on 90°.
    const speed = 140 + Math.random() * 60; // 140–200 px/s per axis
    vx = speed * (Math.random() < 0.5 ? 1 : -1);
    vy = speed * (Math.random() < 0.5 ? 1 : -1);

    ballEl.style.left = Math.round(bx) + "px";
    ballEl.style.top  = Math.round(by) + "px";

    lastFrameTs = performance.now();
    rafId = requestAnimationFrame(bounceTick);
  }

  function stopBounce() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  // ── Screens ────────────────────────────────────────────────

  function showScreen(active) {
    for (const s of [screenIntro, screenGame, screenSummary]) {
      s.hidden = s !== active;
    }
  }

  function clearFeedback() {
    feedbackEl.className = "feedback";
    feedbackEl.textContent = "";
  }

  function showGame(onExit) {
    showScreen(screenGame);
    ballEl.classList.remove("is-visible");
    clearFeedback();
    exitBtn.onclick = () => {
      if (typeof onExit === "function") onExit();
    };
    startBounce();
  }

  function showStage(type) {
    clearFeedback();
    ballEl.style.backgroundColor =
      type === StageType.GO ? pickGoColor() : NO_GO_COLOR;
    ballEl.classList.add("is-visible");
  }

  /** Hide the ball (used when returning to the start screen). */
  function hideBall() {
    ballEl.classList.remove("is-visible");
  }

  function showFeedback(type, rtMs) {
    if (type === StageType.GO) {
      feedbackEl.textContent = String(Math.round(rtMs));
      feedbackEl.className = "feedback feedback--rt";
    } else {
      feedbackEl.textContent = "✗";
      feedbackEl.className = "feedback feedback--error";
      playBuzz();
    }
  }

  /** Visual + audio cue when the player fails to respond during a Go stage. */
  function showMissFeedback() {
    feedbackEl.textContent = "✗";
    feedbackEl.className = "feedback feedback--error";
    playBuzz();
  }

  function showIdle() {
    stopBounce();
    showScreen(screenIntro);
    clearFeedback();
  }

  function showSummary(summary, onRestart, onHome) {
    stopBounce();
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
    homeBtn.onclick = () => {
      if (typeof onHome === "function") onHome();
    };
  }

  return { showGame, showStage, hideBall, showFeedback, showMissFeedback, showIdle, showSummary };
}
