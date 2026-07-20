/**
 * Generates the grid in the Index html
 */

function createGrid() {

    var col = words[0].length;
    var row = words.length;

    const containerId = 'crosswordGrid';

    for (var i = 0; i < row; i++)
        for (var j = 0; j < col; j++) {
            injectCell(i, j, containerId);
            console.log("Injected");
        }

    injectClue("clues", "across", cluesAcross);
    injectClue("clues", "down", cluesDown);
}


/**
 * Generates and appends a crossword cell dynamically.
 * @param {number} row - The row index.
 * @param {number} col - The column index.
 * @param {string} containerId - The ID of the grid container.
 * @param {string|null} clueNumber - The number to display, or null if empty.
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
    console.log(container)

    document.getElementById(container).appendChild(cell);
}



/**
 * Dynamically creates and injects a single clue column (Across or Down) with its list of items into the DOM.
 * 
 * @param {string} container - The HTML ID of the parent element where the clue column will be appended.
 * @param {string} direction - The title of the column (e.g., "Across" or "Down").
 * @param {Array<Array<string|number>>} clues - An array of arrays, where each sub-array represents a clue:
 *                                               c[0] contains the clue text (string).
 *                                               c[1] contains the clue number (number or string).
 */

function injectClue(container, direction, clues) {

    const clue = document.createElement('div');
    clue.className = 'clue-column';

    const header = document.createElement("h2")
    header.innerText = direction
    clue.appendChild(header)

    const ul = document.createElement("ul")
    ul.className = 'clues-list';
    clue.appendChild(ul)
    for (const c of clues) {
        const li = document.createElement("li")
        li.className = "clue-item"
        li.innerHTML = `<strong> ${c[1]}.</strong> ${c[0]}`
        ul.appendChild(li)
    }

    document.getElementById(container).appendChild(clue)

}
