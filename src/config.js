/** Maximum duration for a GO round (ms). Each round picks a random duration in [ROUND_MIN_RANDOM_DURATION_MS, this]. */
export const GO_ROUND_MAX_DURATION_MS = 1500;

/** Maximum duration for a NO-GO round (ms). Each round picks a random duration in [ROUND_MIN_RANDOM_DURATION_MS, this]. */
export const NO_GO_ROUND_MAX_DURATION_MS = 1500;

/** Minimum random duration for any round (ms). */
export const ROUND_MIN_RANDOM_DURATION_MS = 700;

export const GO_PROBABILITY = 0.3;
export const DEFAULT_STAGE_COUNT = 60;

/** Pause between stages (ball hidden, feedback still visible). */
export const ITI_MS = 250;

/** Ball colours used for Go stages (blue, green, white, yellow, orange). */
export const GO_COLORS = [
  '#3d8ef0', // blue
  '#2ecc71', // green
  '#f0f0f0', // white
  '#f9ca24', // yellow
  '#f0932b', // orange
];

/** Ball colour used for No-Go stages. */
export const NO_GO_COLOR = '#e84343'; // red
