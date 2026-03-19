import { STAGE_DURATION_MS, GO_PROBABILITY, DEFAULT_STAGE_COUNT } from "./config.js";
import { StageType, generateStages } from "./stages.js";
import { computeSummary } from "./metrics.js";
import { createRenderer } from "./renderer.js";
import { bindInputs } from "./input.js";

const renderer = createRenderer();

const state = {
  running: false,
  stageActive: false,
  stageIndex: -1,
  stages: [],
  log: [],
  stageTimer: null,
  stageStartTs: 0,
  responseTs: null,
};

function clearTimers() {
  if (state.stageTimer) {
    clearTimeout(state.stageTimer);
    state.stageTimer = null;
  }
}

function startSession() {
  if (state.running) return;
  clearTimers();
  state.stages = generateStages(DEFAULT_STAGE_COUNT, GO_PROBABILITY);
  state.log = [];
  state.stageIndex = -1;
  state.stageActive = false;
  state.responseTs = null;
  state.running = true;
  renderer.hideSummary();
  renderer.showIdle();
  startNextStage();
}

function startNextStage() {
  state.stageIndex += 1;
  if (state.stageIndex >= state.stages.length) {
    finishSession();
    return;
  }

  const stage = state.stages[state.stageIndex];
  state.stageActive = true;
  state.responseTs = null;
  state.stageStartTs = performance.now();

  renderer.showStage(stage.type);

  state.stageTimer = setTimeout(() => {
    endStage();
  }, STAGE_DURATION_MS);
}

function endStage() {
  if (!state.stageActive) return;
  state.stageActive = false;
  clearTimers();

  const stage = state.stages[state.stageIndex];
  const responded = state.responseTs != null;
  const rtMs = responded ? state.responseTs - state.stageStartTs : null;

  state.log.push({
    index: stage.index,
    type: stage.type,
    responded,
    rtMs,
  });

  // Move immediately to the next stage to keep a steady cadence.
  startNextStage();
}

function handleAction(timestamp) {
  if (!state.running || !state.stageActive) return;
  if (state.responseTs != null) return; // Only first response per stage

  state.responseTs = timestamp;
  renderer.showCaptured();
}

function finishSession() {
  state.running = false;
  state.stageActive = false;
  clearTimers();

  const summary = computeSummary(state.log);
  renderer.showSummary(summary);
  renderer.showIdle();
}

function init() {
  renderer.showIdle();
  bindInputs({ onAction: handleAction });

  const restartBtn = document.getElementById("btn-restart");
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      startSession();
    });
  }

  startSession();
}

init();
