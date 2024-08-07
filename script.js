const cells = document.querySelectorAll('[data-cell]');
const statusDisplay = document.querySelector('#status');
const playAgainButton = document.querySelector('#play-again');
const exitButton = document.querySelector('#exit');
const messageOverlay = document.querySelector('#message-overlay');
const messageDisplay = document.querySelector('#message');
const tapSound = document.querySelector('#tap-sound');
const startGameButton = document.querySelector('#start-game');
const frontPage = document.querySelector('#front-page');
const gamePage = document.querySelector('#game');
let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill(null);

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (boardState[cellIndex] !== null || !gameActive) {
        return;
    }

    boardState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    tapSound.play();

    if (checkWin()) {
        displayMessage(`Player ${currentPlayer} Wins!`);
        drawWinLine();
        gameActive = false;
        return;
    }

    if (boardState.every(cell => cell !== null)) {
        displayMessage(`It's a Tie!`);
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin() {
    return winConditions.some(condition => {
        return condition.every(index => {
            return boardState[index] === currentPlayer;
        });
    });
}

function displayMessage(message) {
    messageDisplay.textContent = message;
    messageOverlay.style.display = 'flex';
}

function drawWinLine() {
    winConditions.forEach(condition => {
        if (condition.every(index => boardState[index] === currentPlayer)) {
            condition.forEach(index => {
                cells[index].style.backgroundColor = '#ffeb3b';
            });
        }
    });
}

function resetGame() {
    boardState.fill(null);
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
        cell.style.backgroundColor = '#f1f1f1';
    });
    messageOverlay.style.display = 'none';
}

function startGame() {
    frontPage.style.display = 'none';
    gamePage.style.display = 'flex';
}

function exitGame() {
    resetGame();
    gamePage.style.display = 'none';
    frontPage.style.display = 'flex';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
playAgainButton.addEventListener('click', resetGame);
exitButton.addEventListener('click', exitGame);
startGameButton.addEventListener('click', startGame);

statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
