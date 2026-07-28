/**
 * Handles game actions by routing them to the appropriate functions.
 *
 * @param {string} action - The action identifier to execute (e.g., 'add-point-team1', 'start-timer').
 * @returns {void}
 */
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
            showNextWord();
            break;
        default:
            console.log(`Action: ${action} not present`);

    }
}


/**
 * Increases the score of the specified team by 1.
 *
 * @param {number} teamNumber - The ID number of the team (e.g., 1 or 2).
 * @returns {void}
 */
function increaseScore(teamNumber) {
    var teamPoints = document.getElementById("scoreTeam" + teamNumber)
    teamPoints.innerText = parseInt(teamPoints.innerText) + 1
}


/**
 * Utility function to create an asynchronous delay.
 *
 * @param {number} ms - The number of milliseconds to wait.
 * @returns {Promise<void>} A promise that resolves after the timeout.
 */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Global flag used to manually stop the ongoing timer.
 * 
 * @type {boolean}
 */
let stopTimer = true;

/**
 * Starts an asynchronous countdown timer on the UI.
 * The timer can be interrupted by setting `stopTimer` to true.
 *
 * @param {number} seconds - The duration of the countdown in seconds.
 * @returns {Promise<void>}
 */
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

/**
 * Tracks the index of the currently active word in the crossword puzzle.
 * 
 * @type {number}
 */
var current_word_index = 0

/**
 * Reveals the characters of the current word directly in the DOM grid,
 * increments the index, and injects the clue for the following word.
 *
 * @returns {void}
 */
function showNextWord() {
    var current_word = words[current_word_index];
    var [row, col] = [current_word.startPosition.row, current_word.startPosition.col]

    if (current_word.direction == "across")
        for (var i = 0; i < current_word.text.length; i++) {
            var targetInput = document.querySelector(`[data-cell-id="cell-${row}-${col + i}"]`);
            targetInput.value = current_word.text.charAt(i)
        }
    else
        for (var i = 0; i < current_word.text.length; i++) {
            var targetInput = document.querySelector(`[data-cell-id="cell-${row + i}-${col}"]`);
            targetInput.value = current_word.text.charAt(i)
        }
    current_word_index++;
    var current_word = words[current_word_index];
    if (current_word != undefined)
        injectClue(current_word.clue)

}

