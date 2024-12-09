const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const emojis = { X: "🦊", O: "🐺" };

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = cell.getAttribute("data-index");

  if (gameState[cellIndex] !== "" || !isGameActive) {
    return;
  }

  gameState[cellIndex] = currentPlayer;
  cell.textContent = emojis[currentPlayer];
  cell.classList.add("taken");

  checkWinner();
}

function checkWinner() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (
      gameState[a] !== "" &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${emojis[currentPlayer]} Player ${currentPlayer} wins! 🎉`;
    isGameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a draw! 🤝";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${emojis[currentPlayer]} Player ${currentPlayer}'s turn`;
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  statusText.textContent = "🦊 Player X turn";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
