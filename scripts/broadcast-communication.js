const sessionChannel = new BroadcastChannel('user_session');

sessionChannel.onmessage = (event) => {
    const { action } = event.data;
    console.log(`Received action: ${action}`);
    handleAction(action);
};

sessionChannel.onmessageerror = (event) => {
    console.error('Failed to deserialize message:', event);
};

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

window.addEventListener('beforeunload', () => {
    sessionChannel.close();
});