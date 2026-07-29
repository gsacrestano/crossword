/* global words, injectClue */

/**
 * Handles game actions by routing them to the appropriate functions.
 *
 * @param {string} action - The action identifier to execute (e.g., 'add-point-team1', 'start-timer').
 * @returns {void}
 */
// eslint-disable-next-line no-unused-vars
function handleAction(action) {
  switch (action) {
    case 'add-point-team1':
      increaseScore(1);
      break;
    case 'add-point-team2':
      increaseScore(2);
      break;
    case 'start-timer':
      startTimer(30);
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
  const teamPoints = document.getElementById('scoreTeam' + teamNumber);
  if (teamPoints) {
    teamPoints.innerText = parseInt(teamPoints.innerText) + 1;
  }
}

/**
 * Utility function to create an asynchronous delay.
 *
 * @param {number} ms - The number of milliseconds to wait.
 * @returns {Promise<void>} A promise that resolves after the timeout.
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
  const timer = document.getElementById('timer');

  if (!timer) return;

  for (let i = seconds; i > 0 && stopTimer === false; i--) {
    timer.innerText = i.toString();
    await delay(1000);
  }

  if (!stopTimer) {
    await delay(1000);
    timer.innerText = '0';
  }
}

/**
 * Tracks the index of the currently active word in the crossword puzzle.
 *
 * @type {number}
 */
let current_word_index = 0;

/**
 * Reveals the characters of the current word directly in the DOM grid,
 * increments the index, and injects the clue for the following word.
 *
 * @returns {void}
 */
function showNextWord() {
  let current_word = words[current_word_index];

  // Safety check in case we reached the end of the words array
  if (!current_word) return;

  const [row, col] = [
    current_word.startPosition.row,
    current_word.startPosition.col,
  ];

  if (current_word.direction === 'across') {
    // Using 'let' restricts 'i' to this loop block
    for (let i = 0; i < current_word.text.length; i++) {
      // Using 'const' restricts 'targetInput' to this loop iteration
      const targetInput = document.querySelector(
        `[data-cell-id="cell-${row}-${col + i}"]`,
      );
      if (targetInput) targetInput.value = current_word.text.charAt(i);
    }
  } else {
    // We can safely reuse 'i' here because it's a separate block
    for (let i = 0; i < current_word.text.length; i++) {
      const targetInput = document.querySelector(
        `[data-cell-id="cell-${row + i}-${col}"]`,
      );
      if (targetInput) targetInput.value = current_word.text.charAt(i);
    }
  }

  current_word_index++;

  // Reassigning the variable instead of redeclaring it with 'var'
  current_word = words[current_word_index];

  if (current_word !== undefined) {
    injectClue(current_word.clue);
  }
}
