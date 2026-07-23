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
    const { action } = event.data;
    console.log(`Received action: ${action}`);
    handleAction(action);
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
 * Handles UI events, extracts the requested action from the element's dataset,
 * broadcasts the action to other connected tabs, and executes it locally.
 *
 * @param {Event} event - The DOM event triggered by the user interaction.
 * @returns {void}
 */
function handleEvent(event) {
    var btnAction = event.currentTarget.dataset.action
    console.log(`Action required: ` + btnAction)
    const message = {
        action: btnAction,
    };
    sessionChannel.postMessage(message);
    console.log('Notification sent to other tabs.');
    handleAction(btnAction);
}

/**
 * Cleans up and closes the BroadcastChannel when the window is about to unload
 * to prevent memory leaks and dangling connections.
 */
// 5. Clean up when the channel is no longer needed (e.g., page unload)
window.addEventListener('beforeunload', () => {
    sessionChannel.close();
});