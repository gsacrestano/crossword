function handleAction(action) {
    switch (action) {
        case 'add-point-team1':
            increaseScore(1)
            break;
        case 'add-point-team1':
            increaseScore(1)
            break;
        case 'start-timer':
            console.log("Handle")
            startTimer(30)
            break;
        case 'stop-timer':
            break;
        case 'stop-timer':
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

async function startTimer(seconds) {

    console.log("Timer")
    var timer = document.getElementById("timer")
    console.log(timer)
    for (let i = 0; i <= seconds; i++) {
        timer.innerText = i.toString();
        await delay(1000);
    }


}