export function bindInputs({ buttonEl, onAction }) {
  function handleButtonClick() {
    onAction(performance.now());
  }

  function handleKeyDown(event) {
    if (event.repeat) return;
    if (event.code === "Space" || event.code === "Enter") {
      onAction(performance.now());
    }
  }

  buttonEl.addEventListener("click", handleButtonClick);
  window.addEventListener("keydown", handleKeyDown);

  return () => {
    buttonEl.removeEventListener("click", handleButtonClick);
    window.removeEventListener("keydown", handleKeyDown);
  };
}
