import {
  GO_PROBABILITY,
  DEFAULT_STAGE_COUNT,
  GO_TIMEOUT_MS,
} from "./config.js";
import { generateStages, StageType } from "./stages.js";
import { computeSummary } from "./metrics.js";
import { createRenderer } from "./renderer.js";
import { bindInputs } from "./input.js";

const renderer  = createRenderer();
const startBtn  = document.getElementById("start-button");
const screenGame = document.getElementById("screen-game");

const state = {
  running:      false,
  stageActive:  false,
  stageIndex:   -1,
  stages:       [],
  log:          [],
  stageTimer:   null,
  goTimeoutTimer: null,
  stageStartTs: 0,
  responseTs:   null,
};

let unbindInputs = null;

function clearTimer() {
  if (state.stageTimer !== null) {
    clearTimeout(state.stageTimer);
    state.stageTimer = null;
  }
  if (state.goTimeoutTimer !== null) {
    clearTimeout(state.goTimeoutTimer);
    state.goTimeoutTimer = null;
  }
}

function abortSession() {
  clearTimer();
  if (unbindInputs) { unbindInputs(); unbindInputs = null; }
  state.running     = false;
  state.stageActive = false;
  renderer.showIdle();
}

function startSession() {
  clearTimer();
  if (unbindInputs) { unbindInputs(); unbindInputs = null; }

  Object.assign(state, {
    running:     true,
    stageActive: false,
    stageIndex:  -1,
    stages:      generateStages(DEFAULT_STAGE_COUNT, GO_PROBABILITY),
    log:         [],
    responseTs:  null,
  });

  renderer.showGame(abortSession);
  unbindInputs = bindInputs({ touchTarget: screenGame, onAction: handleAction });
  startNextStage();
}

function startNextStage() {
  state.stageIndex += 1;
  if (state.stageIndex >= state.stages.length) {
    finishSession();
    return;
  }

  const stage = state.stages[state.stageIndex];
  state.stageActive  = true;
  state.responseTs   = null;
  state.stageStartTs = performance.now();

  renderer.showStage(stage.type);
  state.stageTimer = setTimeout(endStage, stage.durationMs);

  // Schedule a Go-timeout warning if the player doesn't respond in time.
  if (stage.type === StageType.GO && GO_TIMEOUT_MS !== null && GO_TIMEOUT_MS > 0 && GO_TIMEOUT_MS < stage.durationMs) {
    state.goTimeoutTimer = setTimeout(() => {
      if (state.stageActive && state.responseTs === null) {
        renderer.showMissFeedback();
      }
    }, GO_TIMEOUT_MS);
  }
}

function endStage() {
  if (!state.stageActive) return;
  state.stageActive = false;
  clearTimer();

  const stage     = state.stages[state.stageIndex];
  const responded = state.responseTs !== null;
  const rtMs      = responded ? state.responseTs - state.stageStartTs : null;

  state.log.push({ index: stage.index, type: stage.type, responded, rtMs });

  // Advance to the next stage immediately — no inter-trial gap, no ball hiding.
  startNextStage();
}

function handleAction(timestamp) {
  if (!state.running || !state.stageActive) return;
  if (state.responseTs !== null) return; // only first response per stage

  state.responseTs = timestamp;

  // Cancel the Go-timeout warning since the player responded.
  if (state.goTimeoutTimer !== null) {
    clearTimeout(state.goTimeoutTimer);
    state.goTimeoutTimer = null;
  }

  const stage = state.stages[state.stageIndex];
  const rtMs  = timestamp - state.stageStartTs;
  renderer.showFeedback(stage.type, rtMs);
}

function finishSession() {
  state.running    = false;
  state.stageActive = false;
  clearTimer();
  if (unbindInputs) { unbindInputs(); unbindInputs = null; }

  const summary = computeSummary(state.log);
  renderer.showSummary(summary, startSession, renderer.showIdle);
}

startBtn.addEventListener("click", startSession);
renderer.showIdle();
