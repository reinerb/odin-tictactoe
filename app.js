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

  // Updates this player's name
  const setName = (n) => (name = n);

  // Updates this player's symbol
  const setSymbol = (s) => (symbol = s);

  // Resets score to 0
  const resetScore = () => (score = 0);

  // Creates a text display for player info in the given div
  const display = function (parentDiv, isActive) {
    let playerDiv = document.createElement("div");
    playerDiv.classList.add("player");
    if (isActive) {
      playerDiv.classList.add("active");
    }

    playerDiv.innerHTML = `<h2>${name} (${symbol})</h2><h3>${score}</h3>`;

    parentDiv.appendChild(playerDiv);
    0;
  };

  return {
    getName,
    setName,
    getSymbol,
    setSymbol,
    getScore,
    incrementScore,
    resetScore,
    display,
  };
};

// The game board
const gameBoard = (() => {
  // A board is an array with 9 elements
  // An empty space is represented with false
  let board = [false, false, false, false, false, false, false, false, false];

  // Declare our two players
  let playerOne = Player("", "X");
  let playerTwo = Player("", "O");
  let players = [playerOne, playerTwo];

  // Turns are zero-indexed to make use of the modulo operator
  let turn = 0;
  let activePlayer = 0;
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
      players[i].display(parentDiv, i === activePlayer);
    }
  };

  // Sets the name of the player at the given index
  const setPlayerName = function (index, name) {
    newName = name === "" ? `Player ${index + 1}` : name;
    players[index].setName(newName);
  };

  // Swaps the symbols of the players
  const swapPlayerSymbols = function () {
    let playerOneSymbol = players[0].getSymbol();
    players[0].setSymbol(players[1].getSymbol());
    players[1].setSymbol(playerOneSymbol);
  };

  // Updates the cell at the given index with the active player's input
  const update = function (index) {
    // Only take actions if the board at the given index is empty
    if (!board[index] && !gameOver) {
      board[index] = players[activePlayer].getSymbol();

      // If there is a winner, end the game
      if (checkWin()) {
        gameOver = true;
        win(activePlayer);
        return;
      }

      // If it's the 9th turn and there is no winner, it's a draw
      if (turn === 8) {
        gameOver = true;
        draw();
        return;
      }
      activePlayer = (activePlayer + 1) % 2;
      turn++;
    }
  };

  // Resets the game state to the initial state
  const resetGame = function () {
    board = [false, false, false, false, false, false, false, false, false];
    gameOver = false;
    turn = 0;
  };

  const fullReset = function () {
    resetGame();
    activePlayer = 0;
    for (let i = 0; i < players.length; i++) {
      players[i].resetScore();
    }
  };

  // Wins the game for the given player
  const win = function (playerIndex) {
    players[playerIndex].incrementScore();
    displayController.showResult(`${players[playerIndex].getName()} wins!`);
    if (players[playerIndex].getSymbol() === "X") {
      swapPlayerSymbols();
    }
    activePlayer = (activePlayer + 1) % 2;
  };

  // Calls the game a draw
  const draw = function () {
    displayController.showResult("It's a draw!");
    swapPlayerSymbols();
    activePlayer = (activePlayer + 1) % 2;
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
    gameOver,
    turn,
    displayBoard,
    displayPlayers,
    swapPlayerSymbols,
    setPlayerName,
    resetGame,
    fullReset,
    update,
  };
})();

// Functions for displaying the game
const displayController = (() => {
  // Main area elements
  const grid = document.querySelector(".game-grid");

  // Sidebar elements
  const scoreboard = document.querySelector(".scoreboard");
  const gameStatus = document.querySelector(".game-win");
  const gameWinner = gameStatus.querySelector(".game-winner");
  const nextGameButton = gameStatus.querySelector(".next-game");
  nextGameButton.setAttribute("onclick", "displayController.resetGame()");
  const newGameButton = document.querySelector(".new-game");
  newGameButton.setAttribute("onclick", "displayController.initialize()");

  // Dialog elements
  const playerNamesInput = document.querySelector("#player-info");
  const playerOneName = playerNamesInput.querySelector("#player-one");
  const playerTwoName = playerNamesInput.querySelector("#player-two");
  const playerNamesSubmit = playerNamesInput.querySelector(
    "#player-names-submit"
  );
  playerNamesSubmit.setAttribute(
    "onclick",
    "displayController.playerNamesFromForm()"
  );

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
    playerNamesInput.classList.remove("hidden");
    playerNamesInput.showModal();
    gameBoard.fullReset();
    display();
  };

  const playerNamesFromForm = function () {
    gameBoard.setPlayerName(0, playerOneName.value);
    gameBoard.setPlayerName(1, playerTwoName.value);
    display();
    playerNamesInput.close();
    playerNamesInput.classList.add("hidden");
  };

  // Displays the results of the game when a player has won
  const showResult = function (result) {
    gameWinner.textContent = result;
    gameStatus.classList.remove("hidden");
  };

  // Resets the game
  const resetGame = function () {
    gameBoard.resetGame();
    gameStatus.classList.add("hidden");
    display();
  };

  return {
    initialize,
    display,
    resetGame,
    showResult,
    playerNamesFromForm,
  };
})();

displayController.initialize();
