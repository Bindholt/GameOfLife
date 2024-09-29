import * as controller from "./controller.js";
function init() {
    console.log("view init");
    attachEventListeners();
}

function attachEventListeners() {
    document.querySelector("#clear").addEventListener("click", controller.clear);
    document.querySelector("#random").addEventListener("click", controller.random);
    document.querySelector("#restart").addEventListener("click", controller.restart);
    document.querySelector("#togglePause").addEventListener("click", controller.togglePause);
}

function renderGrid(grid) {
    const rows = grid.rows();
    const cols = grid.cols();
    const gridContainer = document.querySelector("#grid");
    gridContainer.innerHTML = "";
    gridContainer.style.setProperty("--grid-rows", rows);
    gridContainer.style.setProperty("--grid-cols", cols);

    for (let r = 0; r < rows; r++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.addEventListener("click", () => {controller.toggleCell(r, c)});
            row.appendChild(cell);
        }
        gridContainer.appendChild(row);
    }
}


function updateView(grid, generation) {
    const generationDisplay = document.querySelector("#generation");
    generationDisplay.innerText = generation;
    const gridContainer = document.querySelector("#grid");
    const cells = gridContainer.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
        const {row, col} = grid.rowColFor(index);
        const value = grid.cell(row, col).value;
        (value === 1) ? cell.classList.add("alive") : cell.classList.remove("alive");
    });
}

function togglePauseButton(gameRunning) {
    const button = document.querySelector("#togglePause");
    button.textContent = gameRunning ? "Pause" : "Resume";
}


export {init, renderGrid, updateView, togglePauseButton};
