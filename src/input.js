export function bindInputs({ onAction }) {
  function handleKeyDown(event) {
    if (event.repeat) return;
    if (event.code === "Space" || event.code === "Enter") {
      onAction(performance.now());
    }
  }

  function handleTouch(event) {
    // Prevent the browser from also firing a click event after touchstart,
    // which would call onAction twice on touch devices.
    event.preventDefault();
    onAction(performance.now());
  }

  function handleClick() {
    onAction(performance.now());
  }

  window.addEventListener("keydown", handleKeyDown);

  const cueEl = document.getElementById("cue");
  if (cueEl) {
    // passive: false is required so that preventDefault() can suppress the
    // synthetic click event that browsers emit after a touchstart sequence.
    cueEl.addEventListener("touchstart", handleTouch, { passive: false });
    cueEl.addEventListener("click", handleClick);
  }

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
    if (cueEl) {
      cueEl.removeEventListener("touchstart", handleTouch);
      cueEl.removeEventListener("click", handleClick);
    }
  };
}
