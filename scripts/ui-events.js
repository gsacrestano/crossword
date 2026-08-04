import { dispatchGameAction } from './broadcast-communication.js';
import { JOLLY, POINTS_OPERATIONS } from './data.js';
import { playSound } from './sounds-player.js';
/**
 * Primary UI click event handler.
 * Gathers user input if required and dispatches the action to the network/logic layer.
 *
 * @param {Event} event - The DOM Click event.
 * @returns {void}
 */
export function handleUIAction(event) {
  const btnAction = event.currentTarget.dataset.action;
  if (!btnAction) return;

  const payload = {};

  // Gathers team number if the specific action requires it
  if (JOLLY.includes(btnAction) || POINTS_OPERATIONS.includes(btnAction)) {
    const input = prompt('Team number?');

    // If user cancelled or closed the prompt, abort execution cleanly
    if (input === null) return;

    const teamNumber = parseInt(input, 10);
    if (isNaN(teamNumber)) {
      console.warn('Action cancelled: invalid team number.');
      return;
    }

    payload.teamNumber = teamNumber;
  }
  dispatchGameAction(btnAction, payload);
}

/**
 * Event handler for UI buttons that trigger sound effects.
 * It extracts the sound identifier from the button's 'data-sound' attribute.
 *
 * @param {Event} event - The DOM event triggered by the user interaction.
 * @returns {void}
 */

export function handleSoundBtn(event) {
  if (event) playSound(event.currentTarget.dataset.sound);
}
