import { TILE_STATUSES, createBoard, markTile, revealTile, checkWin, checkLose } from "./minesweeper.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = Math.floor(Math.random() * 10) + 10;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardEl = document.querySelector('.board');
const minesLeftText = document.querySelector('[data-mine-count]');
const messageText = document.querySelector('.subtext');
const winCounterEl = document.querySelector('[data-win-count]');
const loseCounterEl = document.querySelector('[data-lose-count]');

// Retrieve win/loss count from localStorage (default to 0 if not set)
let winCount = parseInt(localStorage.getItem('winCount')) || 0;
let loseCount = parseInt(localStorage.getItem('loseCount')) || 0;

// Display initial counters
winCounterEl.textContent = winCount;
loseCounterEl.textContent = loseCount;

board.forEach(row => {
    row.forEach(tile => {
        boardEl.append(tile.element);
        // Left Clicks
        tile.element.addEventListener('click', () => {
            revealTile(board, tile);
            checkGameEnd();
        });
        // Right Clicks
        tile.element.addEventListener('contextmenu', e => {
            e.preventDefault();
            markTile(tile);
            listMinesLeft();
        });
    });
});

boardEl.style.setProperty('--size', BOARD_SIZE);
minesLeftText.textContent = NUMBER_OF_MINES;

function listMinesLeft() {
    const markedTilesCount = board.reduce((count, row) => {
        return count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length;
    }, 0);

    minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount;
}

function checkGameEnd() {
    const win = checkWin(board);
    const lose = checkLose(board);

    if (win || lose) {
        boardEl.addEventListener('click', stopProp, { capture: true });
        boardEl.addEventListener('contextmenu', stopProp, { capture: true });
    }

    if (win) {
        messageText.textContent = "You Win!!";
        winCount++;
        localStorage.setItem('winCount', winCount);
        winCounterEl.textContent = winCount;
    }

    if (lose) {
        messageText.textContent = "You Lose!!";
        loseCount++;
        localStorage.setItem('loseCount', loseCount);
        loseCounterEl.textContent = loseCount;

        board.forEach(row => {
            row.forEach(tile => {
                if (tile.status === TILE_STATUSES.MARKED) markTile(tile);
                if (tile.mine) revealTile(board, tile);
            });
        });
    };
};

// End Game (Stops you from being able to click)
function stopProp(e) {
    e.stopImmediatePropagation();
};


// Select the button
const refreshButton = document.getElementById('button');

// Function to reload the page
function refreshPage() {
    location.reload();
}

// Add event listener to the button
refreshButton.addEventListener('click', refreshPage);
