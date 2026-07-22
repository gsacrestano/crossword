function handleAction(action) {
    switch (action) {
        case 'add-point-team1':
            increaseScore(1)
            break;
        case 'add-point-team2':
            increaseScore(2)
            break;
        case 'start-timer':
            startTimer(30)
            break;
        case 'stop-timer':
            stopTimer = true;
            break;
        case 'show-word':
            break;
        default:
            console.log(`Action: ${action} not present`);

    }
}


function increaseScore(teamNumber) {
    var teamPoints = document.getElementById("scoreTeam" + teamNumber)
    teamPoints.innerText = parseInt(teamPoints.innerText) + 1
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let stopTimer = true;

async function startTimer(seconds) {
    stopTimer = false;
    var timer = document.getElementById("timer")

    for (let i = 1; i <= seconds && stopTimer == false; i++) {
        timer.innerText = i.toString();
        await delay(1000);
    }
    await delay(1000);
    timer.innerText = "0"

}