export const STAGE_DURATION_MAX_MS = 1500;
export const GO_PROBABILITY = 0.3;
export const DEFAULT_STAGE_COUNT = 60;

/** Pause between stages (ball hidden, feedback still visible). */
export const ITI_MS = 250;

/**
 * Time in ms a player has to respond during a Go stage before the
 * error sound is played.  Set to null or Infinity to disable.
 */
export const GO_TIMEOUT_MS = 1000;

/**
 * Minimum stage duration in ms.  Each round's actual duration is
 * chosen uniformly at random between this value and STAGE_DURATION_MAX_MS.
 */
export const STAGE_DURATION_MIN_MS = 700;

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
