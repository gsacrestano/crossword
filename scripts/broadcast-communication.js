import { handleAction } from './game-logic.js';
/**
 * The BroadcastChannel instance used for cross-tab communication.
 *
 * @type {BroadcastChannel}
 */
const sessionChannel = new BroadcastChannel('user_session');

/**
 * Event listener for incoming messages from other tabs.
 * Extracts the action from the message payload and passes it to the local handler.
 *
 * @param {MessageEvent} event - The message event containing the data payload.
 */
sessionChannel.onmessage = (event) => {
  console.log(`Received action: ${event.data.action}`);
  handleAction(event.data);
};

/**
 * Event listener for message deserialization errors.
 * Logs an error if the incoming message cannot be correctly parsed.
 *
 * @param {MessageEvent} event - The error event.
 */
sessionChannel.onmessageerror = (event) => {
  console.error('Failed to deserialize message:', event);
};

/**
 * Dispatches a game action to both local execution and cross-tab broadcasting.
 *
 * @param {string} action - The action identifier (e.g., 'show-vocals', 'add-point-team1').
 * @param {Object} [payload={}] - Additional data object (e.g., { teamNumber: 1 }).
 */
export function dispatchGameAction(action, payload = {}) {
  const message = { action, payload };
  sessionChannel.postMessage(message);
  handleAction(message);
}

/**
 * Cleans up and closes the BroadcastChannel when the window is about to unload
 * to prevent memory leaks and dangling connections.
 */
window.addEventListener('beforeunload', () => {
  sessionChannel.close();
});
