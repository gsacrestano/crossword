import { TEAM_NUM, WORDS } from './data.js';

/**
 * Array storing the current points for each team.
 *
 * @type {number[]}
 */
const teamsPoint = new Array(TEAM_NUM);
teamsPoint.fill(0);

/**
 * Tracks the index of the currently active word in the crossword puzzle.
 *
 * @type {number}
 */
let current_word_index = 0;

/**
 * Retrieves the current points for a specified team.
 *
 * @param {number|string} teamNumber - The identifier of the team.
 * @returns {number|undefined} The current points of the team, or undefined if the input is invalid.
 */
export function getPoints(teamNumber) {
  let num = parseInt(teamNumber, 10) - 1;
  if (isNaN(num) || num > TEAM_NUM) return;
  return teamsPoint[num];
}

/**
 * Increases the points of a specified team by 1.
 *
 * @param {number|string} teamNumber - The identifier of the team.
 * @returns {number|undefined} The updated points of the team, or undefined if the input is invalid.
 */
export function increasePoint(teamNumber) {
  let num = parseInt(teamNumber, 10) - 1;
  if (isNaN(num) || num >= TEAM_NUM) return;
  teamsPoint[num] = teamsPoint[num] + 2;

  return teamsPoint[num];
}

/**
 * Decreases the points of a specified team by 1.
 * Ensures the score does not drop below 0.
 *
 * @param {number|string} teamNumber - The identifier of the team.
 * @returns {number|undefined} The updated points of the team, or undefined if the input is invalid.
 */
export function decreasePoint(teamNumber) {
  let num = parseInt(teamNumber, 10) - 1;
  if (isNaN(num) || num >= TEAM_NUM) return;
  if (teamsPoint[num] > 0) teamsPoint[num] = teamsPoint[num] - 1;
  return teamsPoint[num];
}

/**
 * Increments the global index tracking the currently active word in the crossword puzzle.
 *
 * @returns {void}
 */
export function nextWord() {
  if (current_word_index < WORDS.length) current_word_index++;
}

/**
 * Retrieves the word object corresponding to the current active index from the WORDS collection.
 *
 * @returns {CrosswordWord|undefined} The current crossword word object, or undefined if the index is out of bounds.
 */
export function getCurrentWord() {
  let index =
    current_word_index == WORDS.length
      ? current_word_index - 1
      : current_word_index;
  return WORDS[index];
}
