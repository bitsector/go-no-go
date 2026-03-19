export function bindInputs({ displayEl, onAction }) {
  function handleClick() {
    onAction(performance.now());
  }

  function handleKeyDown(event) {
    if (event.repeat) return;
    if (event.code === "Space" || event.code === "Enter") {
      onAction(performance.now());
    }
  }

  displayEl.addEventListener("click", handleClick);
  window.addEventListener("keydown", handleKeyDown);

  return () => {
    displayEl.removeEventListener("click", handleClick);
    window.removeEventListener("keydown", handleKeyDown);
  };
}
