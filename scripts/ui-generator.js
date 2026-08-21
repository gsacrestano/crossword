import {
  WORDS,
  JOLLY,
  TEAM_NUM,
  STARTING_INDEX,
  ROW_SIZE,
  COL_SIZE,
  POINTS_OPERATIONS,
  TEAM_NAME,
} from './data.js';
import { handleUIAction, handleSoundBtn } from './ui-events.js';
import { highlightWord } from './ui-game-handler.js';

/**
 * Initializes and populates the crossword grid by iterating over the defined dimensions.
 * It dynamically injects each cell into the DOM and displays the first word's clue.
 * It injects each stat's squads box
 *
 * @returns {void}
 */

export function injectComponent() {
  const containerId = 'crosswordGrid';
  const container = document.getElementById(containerId);
  const dashboardId = 'dashboardId';
  container.style.setProperty('--grid-rows', ROW_SIZE);
  container.style.setProperty('--grid-cols', COL_SIZE);

  let activeCellsSet = getActiveCells(WORDS);
  console.log(activeCellsSet);

  for (let i = 0; i < ROW_SIZE; i++)
    for (var j = 0; j < COL_SIZE; j++) {
      let coordinates = `${i},${j}`;
      let clue =
        activeCellsSet.has(coordinates) == false
          ? -1
          : STARTING_INDEX.includes(coordinates)
            ? parseInt(STARTING_INDEX.indexOf(coordinates)) + 1
            : null;

      injectCell(i, j, containerId, clue);
    }

  for (let i = 1; i <= TEAM_NUM; i++) injectSquad(i, dashboardId);

  injectButtons('stats-control-section');
  highlightWord(WORDS[0]);
}

/**
 * Calculates and returns a Set containing the coordinates of all cells
 * that belong to at least one word in the crossword puzzle.
 *
 * @param {Array} wordsArray - The array of word objects (from data.js).
 * @returns {Set<string>} A Set of stringified coordinates (e.g., "13,11").
 */
function getActiveCells(wordsArray) {
  const activeCells = new Set();

  wordsArray.forEach((word) => {
    const { row, col } = word.startPosition;
    const length = word.text.length;

    for (let i = 0; i < length; i++) {
      // Calculate the target row and col based on the word's direction
      const targetRow = word.direction === 'across' ? row : row + i;
      const targetCol = word.direction === 'across' ? col + i : col;

      // Add the stringified coordinate to the Set
      activeCells.add(`${targetRow},${targetCol}`);
    }
  });

  return activeCells;
}

/**
 * Generates and appends a crossword cell dynamically into the specified container.
 *
 * @param {number} row - The row index of the cell.
 * @param {number} col - The column index of the cell.
 * @param {string} container - The DOM ID of the grid container where the cell will be appended.
 * @param {string|number|null} [clueNumber=null] - The number to display inside the cell, or null if empty.
 * @returns {void}
 */
function injectCell(row, col, container, clueNumber = null) {
  const cell = document.createElement('div');
  cell.className = 'cell';

  if (clueNumber != -1) {
    cell.className = 'cell';
    cell.dataset.row = row.toString();
    cell.dataset.col = col.toString();

    const spanHTML = clueNumber
      ? `<span class="cell-number">${clueNumber}</span>`
      : '';

    cell.innerHTML = `
        ${spanHTML}
        <input type="text" 
               class="cell-input" 
               maxlength="1" 
               data-cell-id="cell-${row}-${col}" 
               autocomplete="off" 
               spellcheck="false">
    `;
  } else cell.classList.add('black');

  document.getElementById(container).appendChild(cell);
}

/**
 * Dynamically generates and injects a team scoreboard card into the specified DOM container.
 * The generated card includes the team's identifier, a specific set of available jolly icons,
 * and a score counter initialized to zero.
 *
 * @param {number|string} num - The unique identifier or number of the team (used for IDs and labels).
 * @param {string} container - The DOM element ID of the wrapper where the team card will be appended.
 * @returns {void}
 */
function injectSquad(num, container) {
  const squadName = TEAM_NAME[num] || `Team ${num}`;
  const cell = document.createElement('div');
  cell.className = 'team-card';

  cell.innerHTML = `
        <div class="team-details">
            <span class="team-name">${squadName}</span>
            <div class="team-jolly" id="jollyTeam${num}">
                ${JOLLY.map((j) => {
                  return j == 'reset-jolly'
                    ? ''
                    : `<img src="icon/icon-${j}.png" alt="Jolly ${j} disponibile" class="jolly-icon">`;
                }).join('')}
            </div>
        </div>       
        <div class="team-score">
            <span class="score-label">Score</span>
            <div class="score-value" id="scoreTeam${num}">0</div>
        </div>
    `;

  const containerElement = document.getElementById(container);
  if (containerElement) {
    containerElement.appendChild(cell);
  }
}
/**
 * Injects dynamic buttons into a specified DOM container.
 * Generates a set of point buttons for each team and a set of "jolly" action buttons,
 * then appends them to the DOM efficiently using a DocumentFragment.
 *
 * @param {string} containerId - The ID of the HTML container element where buttons will be appended.
 * @returns {void}
 */
function injectButtons(containerId) {
  const container = document.getElementById(containerId);

  // Check if the container exists
  if (!container) {
    console.error(`Problems with container id: ${containerId}`);
    return;
  }

  const fragment = document.createDocumentFragment();

  // Point operations buttons injections
  POINTS_OPERATIONS.forEach((operations) => {
    const buttonIncrease = document.createElement('button');
    buttonIncrease.className = 'btn';
    buttonIncrease.dataset.action = operations;
    buttonIncrease.textContent = `${operations.replaceAll('-', ' ')}`;
    fragment.appendChild(buttonIncrease);
  });

  const button = document.createElement('button');
  button.className = 'btn';
  button.dataset.action = 'show-clue';
  button.textContent = `show-clue`;
  fragment.appendChild(button);

  // Jolly buttons injections
  JOLLY.forEach((j) => {
    const button = document.createElement('button');
    button.className = 'btn';
    button.dataset.action = j;
    button.textContent = `${j.replace('-', ' ')}`;
    fragment.appendChild(button);
  });

  container.appendChild(fragment);

  const actionButtons = document.querySelectorAll('[data-action]');
  actionButtons.forEach((b) => b.addEventListener('click', handleUIAction));

  const soundsButtons = document.querySelectorAll('[data-sound]');
  soundsButtons.forEach((b) => b.addEventListener('click', handleSoundBtn));
}
