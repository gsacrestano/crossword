/**
 * Defines the total number of teams participating in the crossword game.
 *
 * @constant {number}
 */
export const TEAM_NUM = 2;

/**
 * Define the strictly allowed values for the direction
 * @typedef {"across" | "down"} Direction
 */

/**
 * Define the exact shape of our word object
 * @typedef {Object} CrosswordWord
 * @property {string} id
 * @property {string} text
 * @property {Direction} direction
 * @property {{row: number, col: number}} startPosition
 * @property {string} clue
 */

/**
 * Factory function to create a validated word object
 * @param {string} text
 * @param {Direction} direction - Must be strictly "across" or "down"
 * @param {number} row
 * @param {number} col
 * @param {string} [clue=""] - Optional parameter
 * @returns {CrosswordWord}
 */
function createWord(text, direction, row, col, clue = '') {
  return {
    text,
    direction,
    startPosition: { row, col },
    clue,
  };
}

// Data entry remains clean and is now fully type-checked by the IDE
/** @type {CrosswordWord[]} */
export const WORDS = [
  createWord('WORD', 'across', 0, 0, 'First Clue'),
  createWord('OTHER', 'down', 0, 0, 'Second Clue'),
];

/**
 * Defines the collection of available jokers (jolly) or hints in the game.
 * These string identifiers map to specific game actions and their corresponding UI icons.
 *
 * @constant {string[]}
 */
export const JOLLY = [
  'show-vocals',
  'show-start',
  'help-public',
  'make-call',
  'get-clue',
  'give-answer',
];
