import {
  GO_ROUND_MAX_DURATION_MS,
  NO_GO_ROUND_MAX_DURATION_MS,
  ROUND_MIN_RANDOM_DURATION_MS,
  GO_PROBABILITY,
  DEFAULT_STAGE_COUNT,
  MISS_FREEZE_MS,
} from "./config.js";
import { generateStages, StageType } from "./stages.js";
import { computeSummary } from "./metrics.js";
import { createRenderer } from "./renderer.js";
import { bindInputs } from "./input.js";
import { playBuzz } from "./sound.js";

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
  stageStartTs: 0,
  responseTs:   null,
};

let unbindInputs = null;

function clearTimer() {
  if (state.stageTimer !== null) {
    clearTimeout(state.stageTimer);
    state.stageTimer = null;
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

  const maxMs = stage.type === StageType.GO
    ? GO_ROUND_MAX_DURATION_MS
    : NO_GO_ROUND_MAX_DURATION_MS;
  const durationMs = Math.floor(ROUND_MIN_RANDOM_DURATION_MS
    + Math.random() * (maxMs - ROUND_MIN_RANDOM_DURATION_MS));
  state.stageTimer = setTimeout(endStage, durationMs);
}

function endStage() {
  if (!state.stageActive) return;
  state.stageActive = false;
  clearTimer();

  const stage     = state.stages[state.stageIndex];
  const responded = state.responseTs !== null;
  const rtMs      = responded ? state.responseTs - state.stageStartTs : null;

  state.log.push({ index: stage.index, type: stage.type, responded, rtMs });

  // GO round ended without a click → missed response: buzz + freeze 1 s.
  if (stage.type === StageType.GO && !responded) {
    playBuzz();
    renderer.showMissFeedback();
    state.stageTimer = setTimeout(startNextStage, MISS_FREEZE_MS);
    return;
  }

  // Advance to the next stage immediately — no inter-trial gap, no ball hiding.
  startNextStage();
}

function handleAction(timestamp) {
  if (!state.running || !state.stageActive) return;

  const stage = state.stages[state.stageIndex];

  if (stage.type === StageType.NO_GO) {
    // NO-GO: every click is an error — play buzz immediately.
    playBuzz();
    if (state.responseTs === null) {
      // Record first response only.
      state.responseTs = timestamp;
      const rtMs = timestamp - state.stageStartTs;
      renderer.showFeedback(stage.type, rtMs);
    }
    return;
  }

  // GO: correct response — no error sound.
  if (state.responseTs !== null) return; // only first response per stage
  state.responseTs = timestamp;
  const rtMs = timestamp - state.stageStartTs;
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
