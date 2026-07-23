/**
 * The dimensions of the crossword grid (rows and columns).
 * 
 * @type {[number, number]}
 */
const [row_size, col_size] = [10, 10]

/**
 * Initializes and populates the crossword grid by iterating over the defined dimensions.
 * It dynamically injects each cell into the DOM and displays the first word's clue.
 * 
 * @returns {void}
 */
function createGrid() {

    const containerId = 'crosswordGrid';

    for (var i = 0; i < row_size; i++)
        for (var j = 0; j < col_size; j++) {
            injectCell(i, j, containerId);
            console.log("Injected");
        }

    injectClue(words[0].clue);
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
function injectCell(row, col, container, clueNumber = null,) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.row = row.toString();
    cell.dataset.col = col.toString();

    const spanHTML = clueNumber ? `<span class="cell-number">${clueNumber}</span>` : '';

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

    const clueElement = document.getElementById("current-clue");
    clueElement.innerText = clue

}