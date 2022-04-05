const mainElement = document.querySelector("main");

// Player object
const Player = (name, symbol) => {
  // All players start with a score of 0
  let score = 0;

  // Retrieve player details
  const getName = () => name;
  const getSymbol = () => symbol;
  const getScore = () => score;

  // Increment the player's score by one
  const incrementScore = () => score++;

  // Creates a text display for player info
  const display = function (parentDiv) {
    let playerDiv = document.createElement("div");
    playerDiv.classList.add("player");

    playerDiv.innerHTML = `<h2>${name} (${symbol})</h2><h3>${score}</h3>`;

    parentDiv.appendChild(playerDiv);
    0;
  };

  return {
    getName,
    getSymbol,
    getScore,
    incrementScore,
    display,
  };
};

// The game board
const gameBoard = (() => {
  // A board is an array with 9 elements
  // An empty space is represented with false
  let board = [false, false, false, false, false, false, false, false, false];

  // Declare our two players
  let playerOne = Player("Player One", "X");
  let playerTwo = Player("Player Two", "O");
  let players = [playerOne, playerTwo];

  let turn = 0;
  let gameOver = false;

  // Updates the cell at the given index with the active player's input
  const update = function (index) {
    if (!board[index] && !gameOver) {
      board[index] = players[turn % 2].getSymbol();
      gameOver = checkWin();
      turn += 1;
    }
  };

  // Logic to check if a player has won
  const checkWin = function () {
    let topRow =
      board[0] &&
      board[1] &&
      board[2] &&
      board[0] === board[1] &&
      board[1] === board[2];
    let middleRow =
      board[3] &&
      board[4] &&
      board[5] &&
      board[3] === board[4] &&
      board[4] === board[5];
    let bottomRow =
      board[6] &&
      board[7] &&
      board[8] &&
      board[6] === board[7] &&
      board[7] === board[8];
    let leftCol =
      board[0] &&
      board[3] &&
      board[6] &&
      board[0] === board[3] &&
      board[3] === board[6];
    let middleCol =
      board[1] &&
      board[4] &&
      board[7] &&
      board[1] === board[4] &&
      board[4] === board[7];
    let rightCol =
      board[2] &&
      board[5] &&
      board[8] &&
      board[2] === board[5] &&
      board[5] === board[8];
    let leftDiag =
      board[0] &&
      board[4] &&
      board[8] &&
      board[0] === board[4] &&
      board[4] === board[8];
    let rightDiag =
      board[2] &&
      board[4] &&
      board[6] &&
      board[2] === board[4] &&
      board[4] === board[6];

    return (
      topRow ||
      middleRow ||
      bottomRow ||
      leftCol ||
      middleCol ||
      rightCol ||
      leftDiag ||
      rightDiag
    );
  };

  return {
    board,
    players,
    turn,
    update,
  };
})();

// Functions for displaying the game
const displayController = (() => {
  const scoreboard = document.querySelector(".scoreboard");
  const grid = document.querySelector(".game-grid");
  const resetButton = document.querySelector(".reset-button");

  // Clears the display
  const clear = function (div) {
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
  };

  const displayGrid = function (div) {
    for (let i = 0; i < gameBoard.board.length; i++) {
      const cell = document.createElement("div");
      cell.classList.add("game-cell");
      cell.textContent = gameBoard.board[i] ? gameBoard.board[i] : "";
      cell.setAttribute("data-index", i);
      cell.addEventListener("click", (e) => {
        gameBoard.update(e.target.getAttribute("data-index"));
        displayController.display();
      });

      div.appendChild(cell);
    }
  };

  const displayScoreboard = function (div) {
    for (let i = 0; i < gameBoard.players.length; i++) {
      gameBoard.players[i].display(div);
    }
  };

  // Displays the game
  const display = function () {
    clear(displayController.grid);
    displayGrid(displayController.grid);

    clear(displayController.scoreboard);
    displayScoreboard(displayController.scoreboard);
  };

  const initialize = function () {
    display();
  };

  return {
    grid,
    scoreboard,
    initialize,
    display,
  };
})();

displayController.initialize();
