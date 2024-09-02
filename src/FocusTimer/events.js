import { controls, soundControls } from "./elements.js";
import * as actions from "./actions.js";
import * as timer from './timer.js'

export function registerControls() {
  controls.addEventListener("click", (event) => {
    const action = event.target.dataset.action;
    if (typeof actions[action] != "function") {
      return;
    }

    actions[action]();
  });
}

export function registerSound() {
  soundControls.addEventListener("click", (event) => {
    const action = event.target.dataset.action;
    if (typeof actions[action] != "function") {
      return;
    }

    actions[action]();
  });
}
