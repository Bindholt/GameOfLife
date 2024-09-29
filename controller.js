import Grid from "./model.js";
import * as view from "./view.js";
window.addEventListener("load", init);

let ROWS = 44;
let COLS = 105;
let grid;
let generation = 0;
let gameRunning = true;
let interval;

function init() {
    console.log("controller init");
    view.init();
    createGrid();
    interval = setInterval(nextGeneration, 100);
    
}

function createGrid() {
    grid = new Grid(ROWS, COLS);
    view.renderGrid(grid);
    view.updateView(grid, generation);

    window.grid = grid;
    window.nextGeneration = nextGeneration;
    window.countNeighbours = countNeighbours;
    window.gameRunning = gameRunning;
    window.addSpaceShip = addSpaceShip;
}

function restart() {
    generation = 0;
    createGrid();
}

function clear() {
    grid.clear();
    generation = 0;
    pause();
    view.updateView(grid, generation);
    
}

function random() {
    for(let r = 0; r < ROWS; r++) {
        for(let c = 0; c < COLS; c++) {
            if(Math.random() < 0.01) {
                grid.set(r, c, 1);
            } 
        }
    }
    view.updateView(grid, generation);
}

function nextGeneration() {
    const nextGrid = new Grid(ROWS, COLS);
    for(let r = 0; r < ROWS; r++) {
        for(let c = 0; c < COLS; c++) {
            let alive;
            const neighbours = countNeighbours(r, c);
            if(neighbours < 2) alive = 0;
            if(neighbours == 2) alive = grid.cell(r,c).value;
            if(neighbours == 3) alive = 1;
            if(neighbours > 3) alive = 0;
            
            nextGrid.set(r,c,alive);
        }
    }
    grid = nextGrid;
    generation++;
    view.updateView(grid, generation);
}

function countNeighbours(row, col) {
    const neighbourValues = grid.neighbourValues(row, col);
    let count = 0;
    for(const value of neighbourValues) {
        count += value;
    }
    return count;
}

function toggleCell(row, col) {
    if(gameRunning) return;
    const cell = grid.cell(row, col);
    const value = cell.value === 1 ? 0 : 1;
    grid.set(row, col, value);
    view.updateView(grid, generation);
}

function togglePause() {
    if(gameRunning) {
        pause();
    } else {
        resume();
    }
}

function pause() {
    clearInterval(interval);
    gameRunning = false;
    view.togglePauseButton(gameRunning);
    
}

function resume() {
    interval = setInterval(nextGeneration, 100);
    gameRunning = true;
    view.togglePauseButton(gameRunning);   
}

function addSpaceShip() {
    const randomInitialCell = Math.floor(Math.random() * (ROWS * COLS));

    const {row, col} = grid.rowColFor(randomInitialCell);

    grid.set(row, col, 1);
    grid.set(row, col + 1, 1);
    grid.set(row, col + 2, 1);
    grid.set(row + 1, col + 2, 1);
    grid.set(row + 2, col + 1, 1);
    view.updateView(grid, generation);
}


export {createGrid, restart, clear, random, togglePause, toggleCell};