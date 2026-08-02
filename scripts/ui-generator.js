/* global words, jolly, handleEvent */
/**
 * The dimensions of the crossword grid (rows and columns).
 *
 * @type {[number, number]}
 */
const [row_size, col_size] = [15, 15];

/**
 * Defines the total number of teams participating in the crossword game.
 *
 * @constant {number}
 */
const team_num = 2;

/**
 * Initializes and populates the crossword grid by iterating over the defined dimensions.
 * It dynamically injects each cell into the DOM and displays the first word's clue.
 * It injects each stat's squads box
 *
 * @returns {void}
 */
// eslint-disable-next-line no-unused-vars
function injectComponent() {
  const containerId = 'crosswordGrid';
  const container = document.getElementById(containerId);
  const dashboardId = 'dashboardId';
  container.style.setProperty('--grid-rows', row_size);
  container.style.setProperty('--grid-cols', col_size);

  let indexWords = 0;
  let indexClue = 0;
  for (let i = 0; i < row_size; i++)
    for (var j = 0; j < col_size; j++) {
      if (indexWords < words.length && words[indexWords].direction == 'down')
        indexWords++;
      if (
        indexWords < words.length &&
        words[indexWords].startPosition.row == i &&
        words[indexWords].startPosition.col == j &&
        words[indexWords].direction == 'across'
      ) {
        injectCell(i, j, containerId, ++indexClue);
        indexWords++;
      } else injectCell(i, j, containerId);
    }

  for (let i = 1; i <= team_num; i++) injectSquad(i, dashboardId);

  injectClue(words[0].clue);

  injectButtons('stats-control-section');
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

  document.getElementById(container).appendChild(cell);
}

/**
 * Dynamically updates the current clue element in the DOM with the provided text.
 *
 * @param {string} clue - The text of the clue to display.
 * @returns {void}
 */
function injectClue(clue) {
  const clueElement = document.getElementById('current-clue');
  clueElement.innerText = clue;
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
  const cell = document.createElement('div');
  cell.className = 'team-card';

  cell.innerHTML = `
        <div class="team-details">
            <span class="team-name">Squadra ${num}</span>
            <div class="team-jolly" id="jollyTeam${num}">
                ${jolly.map((j) => `<img src="icon/icon-${j}.png" alt="Jolly ${j} disponibile" class="jolly-icon">`).join('')}
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
 * @requires global:team_num - The total number of teams (expected to be a number).
 * @requires global:jolly - An array of strings representing jolly actions.
 * @requires global:handleEvent - The callback function attached to the click event of the generated buttons.
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

  // Points buttons
  for (let i = 1; i <= team_num; i++) {
    const button = document.createElement('button');
    button.className = 'btn';
    button.dataset.action = `add-point-team${i}`;
    button.textContent = `+1 Punti squadra ${i}`;
    button.addEventListener('click', handleEvent);
    fragment.appendChild(button);
  }

  // Jolly button injections
  jolly.forEach((j) => {
    const button = document.createElement('button');
    button.className = 'btn';
    button.dataset.action = j;
    button.textContent = `${j.replace('-', ' ')}`;
    button.addEventListener('click', handleEvent);
    fragment.appendChild(button);
  });

  container.appendChild(fragment);
}
