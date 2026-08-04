import { animateCellFlip } from './animation.js';
import { WORDS, JOLLY, TEAM_NUM } from './data.js';
import { decreasePoint, increasePoint } from './game-logic.js';
import { playSound } from './sounds-player.js';
import { injectClue } from './ui-generator.js';

/**
 * Handles game actions by routing them to the appropriate functions.
 *
 * @param {Object} message - The action message object containing 'action' and 'payload'.
 * @returns {void}
 */

export function handleAction(message) {
  switch (message.action) {
    case 'add-point-team':
      increaseScore(message.payload.teamNumber);
      break;
    case 'remove-point-team':
      decreaseScore(message.payload.teamNumber);
      break;
    case 'start-timer':
      playSound('countDown');
      startTimer(30);
      break;
    case 'stop-timer':
      stopTimer = true;
      break;
    case 'show-word':
      showNextWord();
      break;
    case 'show-vocals':
    case 'show-start':
    case 'help-public':
    case 'give-answer':
    case 'make-call':
    case 'get-clue':
      handleJolly(message.action, message.payload.teamNumber);
      break;

    default:
      console.log(`Action: ${message.action} not present`);
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
    teamPoints.innerText = increasePoint(teamNumber);
  }
}

/**
 * Decreases the score of the specified team by 1.
 *
 * @param {number} teamNumber - The ID number of the team (e.g., 1 or 2).
 * @returns {void}
 */
function decreaseScore(teamNumber) {
  const teamPoints = document.getElementById('scoreTeam' + teamNumber);
  if (teamPoints) {
    teamPoints.innerText = decreasePoint(teamNumber);
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

  if (stopTimer) {
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
  let current_word = WORDS[current_word_index];

  if (!current_word) {
    return;
  } else {
    showCharacters(current_word, 'all');
  }

  current_word_index++;

  // Reassigning the variable instead of redeclaring it with 'var'
  current_word = WORDS[current_word_index];

  if (current_word !== undefined) {
    injectClue(current_word.clue);
  }
}

/**
 * Reveals characters of the current crossword word on the grid based on the selected mode.
 * Supports revealing all characters or selectively showing only the vowels.
 *
 * @param {Object} current_word - The word object containing text, direction, and startPosition.
 * @param {string} mode - The reveal mode: "all" to show the entire word, "vocals" to show only vowels.
 * @returns {void}
 */
function showCharacters(current_word, mode) {
  if (mode !== 'all' && mode !== 'vocals') {
    console.error(`Invalid mode provided: ${mode}`);
    return;
  }

  const vocals = ['A', 'E', 'I', 'O', 'U'];
  const { row, col } = current_word.startPosition;

  for (let i = 0; i < current_word.text.length; i++) {
    const targetRow = current_word.direction === 'across' ? row : row + i;
    const targetCol = current_word.direction === 'across' ? col + i : col;

    const targetInput = document.querySelector(
      `[data-cell-id="cell-${targetRow}-${targetCol}"]`,
    );

    if (targetInput) {
      const char = current_word.text.charAt(i).toUpperCase();
      if (mode === 'all' || vocals.includes(char)) {
        targetInput.value = char;
      }
      animateCellFlip(targetInput, i);
    }
  }
}

/**
 * Processes the consumption of a joker (jolly) for a specific team.
 * Visually marks the corresponding icon as used in the DOM and executes
 * the associated game logic (e.g., revealing vowels or the starting letter).
 *
 * @param {string} jollyLabel - The specific action label of the jolly (e.g., 'show-vocals', 'show-start').
 * @param {number} teamNumber - The ID number of the team utilizing the joker (e.g., 1 or 2).
 * @returns {void}
 */
function handleJolly(jollyLabel, teamNumber) {
  if (isNaN(teamNumber) || teamNumber > TEAM_NUM) {
    console.error(`Problem with teamNumber is ${teamNumber}`);
    return;
  }

  const indexJolly = JOLLY.indexOf(jollyLabel);
  const containerId = `jollyTeam${teamNumber}`;
  const iconElements = document
    .getElementById(containerId)
    .querySelectorAll('img');

  // Safety check to ensure the icon exists before manipulating its classList
  if (iconElements[indexJolly]) {
    iconElements[indexJolly].classList.add('used');
  }

  let current_word = WORDS[current_word_index];

  if (jollyLabel === 'show-vocals') {
    showCharacters(current_word, 'vocals');
  }

  if (jollyLabel === 'show-start') {
    const { row, col } = current_word.startPosition;
    const targetInput = document.querySelector(
      `[data-cell-id="cell-${row}-${col}"]`,
    );

    if (targetInput) {
      targetInput.value = current_word.text.charAt(0);
    }
  }
}
