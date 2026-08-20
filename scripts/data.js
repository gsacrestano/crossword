/**
 * Defines the total number of teams participating in the crossword game.
 *
 * @constant {number}
 */
export const TEAM_NUM = 2;

/**
 * The dimensions of the crossword grid (rows and columns).
 *
 * @type {[number, number]}
 */
export const [ROW_SIZE, COL_SIZE] = [15, 16];

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
  createWord('SATANA', 'across', 7, 9, 'L’originale serpente - 6 LETTERE'),
  createWord('SAUL', 'down', 0, 9, 'Il primo re di Israele - 4 LETTERE'),
  createWord('GALLO', 'across', 6, 0, 'Il suo canto era legato a una profezia di Gesù - 5 LETTERE'),
  createWord('EUD', 'down', 3, 12, 'Il giudice mancino - 3 LETTERE'),
  createWord('STRANO', 'across', 13, 2, 'Inconsueto, insolito, fuori dell’ordinario - 6 LETTERE'),
  createWord('ANZIANITA', 'down', 3, 10, 'Non la hanno i pischelli - 9 LETTERE'),
  createWord('VETRINA', 'down', 7, 5, 'La finestra tentatrice della Betel - 7 LETTERE'),
  createWord('GELOSO', 'down', 2, 7, 'Non lo è l’amore - 6 LETTERE'),
  createWord('KIGALI', 'across', 11, 7, 'La capitale di un paese che ci ha tolto forza lavoro - 6 LETTERE'),
  createWord('TOSATI', 'across', 9, 5, 'I pecoroni non lo sono se zompano il taglio capelli - 6 LETTERE'),
  createWord('ALBERO', 'down', 7, 14, 'Si riconosce dal suo frutto - 6 LETTERE'),
  createWord('SHAMPO', 'down', 1, 4, 'Lo fece Paolo a Pietro - 6 LETTERE'),
  createWord('PEA', 'down', 4, 1, 'Trattamento di fine rapporto - 3 LETTERE'),
  createWord('ACACIA', 'down', 7, 12, 'Il suo legno fu usato per l’arca del patto - 6 LETTERE'),
  createWord('MARTELLARE', 'across', 3, 3, 'L’hobby di Salomone - 10 LETTERE'),
  createWord('LAMEC', 'down', 6, 3, 'Il primo poligamo menzionato nella Bibbia - 5 LETTERE'),
  createWord('ANGOLO', 'across', 1, 9, 'Luogo adatto per il pollo - 6 LETTERE'),
  createWord('ASTA', 'across', 1, 3, 'Assegnazione, valutazione - 4 LETTERE'),
];

export const STARTING_INDEX = WORDS.map(
  (m) => `${m.startPosition.row},${m.startPosition.col}`,
);

export const POINTS_OPERATIONS = ['add-point-team', 'remove-point-team'];

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
  'reset-jolly'
];
