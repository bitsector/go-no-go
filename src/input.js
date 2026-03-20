/**
 * Binds pointer (touch + mouse) and keyboard inputs to the game action handler.
 * The entire touchTarget element acts as the tap surface during gameplay.
 *
 * @param {{ touchTarget: Element, onAction: (timestamp: number) => void }} opts
 * @returns {() => void} cleanup function
 */
export function bindInputs({ touchTarget, onAction }) {
  function handlePointer(event) {
    // Ignore clicks that originated on interactive children (e.g. buttons).
    if (event.target.closest("button")) return;
    event.preventDefault();
    onAction(performance.now());
  }

  function handleKeyDown(event) {
    if (event.repeat) return;
    if (event.code === "Space" || event.code === "Enter") {
      event.preventDefault();
      onAction(performance.now());
    }
  }

  touchTarget.addEventListener("pointerdown", handlePointer);
  window.addEventListener("keydown", handleKeyDown);

  return function unbind() {
    touchTarget.removeEventListener("pointerdown", handlePointer);
    window.removeEventListener("keydown", handleKeyDown);
  };
}
