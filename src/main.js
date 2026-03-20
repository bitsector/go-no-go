import {
  STAGE_DURATION_MS,
  GO_PROBABILITY,
  DEFAULT_STAGE_COUNT,
  ITI_MS,
} from "./config.js";
import { generateStages } from "./stages.js";
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

  renderer.showGame();
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
  state.stageTimer = setTimeout(endStage, STAGE_DURATION_MS);
}

function endStage() {
  if (!state.stageActive) return;
  state.stageActive = false;
  clearTimer();

  const stage     = state.stages[state.stageIndex];
  const responded = state.responseTs !== null;
  const rtMs      = responded ? state.responseTs - state.stageStartTs : null;

  state.log.push({ index: stage.index, type: stage.type, responded, rtMs });

  // Hide the ball during the inter-trial interval, then advance.
  renderer.hideBall();
  state.stageTimer = setTimeout(startNextStage, ITI_MS);
}

function handleAction(timestamp) {
  if (!state.running || !state.stageActive) return;
  if (state.responseTs !== null) return; // only first response per stage

  state.responseTs = timestamp;

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
  renderer.showSummary(summary, startSession);
}

startBtn.addEventListener("click", startSession);
renderer.showIdle();
