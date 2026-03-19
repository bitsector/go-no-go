export function bindInputs({ onAction }) {
  function handleKeyDown(event) {
    if (event.repeat) return;
    if (event.code === "Space" || event.code === "Enter") {
      onAction(performance.now());
    }
  }
  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}
