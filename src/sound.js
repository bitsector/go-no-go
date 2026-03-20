let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

/** Play a harsh buzzer sound for a No-Go commission error. */
export function playBuzz() {
  try {
    const ctx = getAudioCtx();
    if (ctx.state === "suspended") ctx.resume();

    const now      = ctx.currentTime;
    const duration = 0.4;

    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();

    // Square wave at ~120 Hz dropping to ~80 Hz — a classic "wrong answer" buzz.
    osc.type = "square";
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.linearRampToValueAtTime(80, now + duration);

    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.01);
  } catch (_) {
    // Silently ignore if audio is unavailable.
  }
}
