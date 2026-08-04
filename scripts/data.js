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
export const [ROW_SIZE, COL_SIZE] = [16, 17];

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
  createWord('ALBERO', 'across', 2, 2, 'Si riconosce dal suo frutto'),
  createWord('SAUL', 'down', 1, 2, 'Il primo re di Israele'),
  createWord('PEA', 'across', 0, 9, 'Trattamento di fine rapporto'),
  createWord('VETRINA', 'across', 11, 10, 'Luogo di interessi'),
  createWord(
    'AMAT',
    'down',
    6,
    0,
    'Il re di questo paese mandò suo figlio Ioram a congratularsi col re Davide per la sconfitta inferta ad Adadezer',
  ),
  createWord('SATANA', 'down', 10, 8, 'L’originale serpente'),
  createWord(
    'GALLO',
    'down',
    4,
    9,
    'Il suo canto era legato a una profezia di Gesù',
  ),
  createWord(
    'STRANO',
    'down',
    5,
    7,
    'Inconsueto, insolito, fuori dell’ordinario',
  ),
  createWord('EUD', 'down', 13, 11, 'Il giudice Mancino'),
  createWord(
    'ABNER',
    'across',
    6,
    0,
    'Gioab lo uccise per vendicare suo fratello Asael',
  ),
  createWord(
    'HOMER',
    'down',
    7,
    5,
    'Misura per aridi e per l’olio pari a dieci bat',
  ),
  createWord(
    'ANETO',
    'down',
    4,
    3,
    'Pianta dai semi aromatici di cui i farisei esigevano la decima',
  ),
  createWord('GELOSO', 'across', 10, 4, 'Non lo è l’amore'),
  createWord(
    'ACACIA',
    'across',
    3,
    11,
    'Il suo legno fu usato per l’arca del patto',
  ),
  createWord(
    'TOSATI',
    'across',
    9,
    11,
    'Non lo erano i centomila montoni che il re di Moab pagò come tribute',
  ),
  createWord('CRONICO', 'down', 3, 12, 'Lo è un male incurabile'),
  createWord('ORTICA', 'down', 6, 16, 'Pianta pungente'),
  createWord('LAMEC', 'down', 4, 2, 'Il primo poligamo'),
  createWord('MARTELLARE', 'across', 13, 7, 'La perdizione di Salomone'),
  createWord('SHAMPO', 'across', 5, 7, 'Lo fece Paolo a Pietro'),
  createWord('ANGOLO', 'across', 8, 0, 'Luogo adatto per il pollo'),
  createWord('ANZIANITA', 'down', 5, 14, 'Status di perseveranza'),
  createWord('ASTA', 'down', 0, 11, 'Assegnazione, valutazione'),
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
];
