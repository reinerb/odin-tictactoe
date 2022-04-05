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

  // Updates this player's symbol
  const setSymbol = (s) => (symbol = s);

  // Creates a text display for player info in the given div
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
    setSymbol,
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

  // Turns are zero-indexed to make use of the modulo operator
  let turn = 0;
  let gameOver = false;

  // Display the game grid
  const displayBoard = function (parentDiv) {
    for (let i = 0; i < board.length; i++) {
      const cell = document.createElement("div");
      cell.classList.add("game-cell");
      cell.textContent = board[i] ? board[i] : "";
      cell.setAttribute("data-index", i);
      cell.addEventListener("click", (e) => {
        gameBoard.update(e.target.getAttribute("data-index"));
        displayController.display();
      });
      parentDiv.appendChild(cell);
    }
  };

  // Display the players
  const displayPlayers = function (parentDiv) {
    for (let i = 0; i < players.length; i++) {
      players[i].display(parentDiv);
    }
  };

  // Swaps the symbols of the players
  const swapPlayerSymbols = function () {
    let playerOneSymbol = players[0].getSymbol();
    players[0].setSymbol(players[1].getSymbol());
    players[1].setSymbol(playerOneSymbol);
  };

  // Updates the cell at the given index with the active player's input
  const update = function (index) {
    // Don't try to
    if (!board[index] && !gameOver) {
      board[index] = players[turn % 2].getSymbol();

      // If there is a winner, end the game
      if (checkWin()) {
        gameOver = true;
        win(turn % 2);
        return;
      }

      // If it's the 9th turn and there is no winner,
      if (turn === 8) {
        gameOver = true;
        draw();
        return;
      }

      turn++;
    }
  };

  const resetGame = function () {
    board = [false, false, false, false, false, false, false, false, false];
    gameOver = false;
    turn = 0;
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
    displayBoard,
    displayPlayers,
    swapPlayerSymbols,
    resetGame,
    update,
  };
})();

// Functions for displaying the game
const displayController = (() => {
  const scoreboard = document.querySelector(".scoreboard");
  const grid = document.querySelector(".game-grid");
  const gameStatus = document.querySelector(".game-win");
  const gameWinner = gameStatus.querySelector(".game-winner");
  const nextGameButton = gameStatus.querySelector(".next-game");

  // Clears the display
  const clear = function (div) {
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
  };

  // Displays the game
  const display = function () {
    clear(grid);
    gameBoard.displayBoard(grid);

    clear(scoreboard);
    gameBoard.displayPlayers(scoreboard);
  };

  const initialize = function () {
    gameStatus.classList.add("hidden");
    display();
  };

  const resetGame = function () {
    gameBoard.resetGame();
    display();
  };

  return {
    initialize,
    display,
    resetGame,
  };
})();

displayController.initialize();
