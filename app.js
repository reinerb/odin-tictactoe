const mainElement = document.querySelector("main");

// Player object
const Player = (symbol) => {
  const getSymbol = () => symbol;

  return {
    getSymbol,
  };
};

// The game board
const gameBoard = (() => {
  // A board is an array with 9 elements
  // An empty space is represented with false
  let board = [false, false, false, false, false, false, false, false, false];

  // Declare our two players
  let playerOne = Player("X");
  let playerTwo = Player("O");
  let players = [playerOne, playerTwo];

  let turn = 0;

  // Updates the cell at the given index with the given input
  const update = function (index) {
    if (!board[index]) {
      board[index] = players[turn % 2].getSymbol();
      turn += 1;
    }
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
  // Clears the display
  const clear = function () {
    while (mainElement.firstChild) {
      mainElement.removeChild(mainElement.firstChild);
    }
  };

  // Displays the game
  const display = function () {
    displayController.clear();

    const grid = document.createElement("div");
    grid.classList.add("game-grid");

    const handleClick = function () {
      console.log("this");
    };

    // Add a div for each cell on the grid
    for (let i = 0; i < gameBoard.board.length; i++) {
      const cell = document.createElement("div");
      cell.classList.add("game-cell");
      cell.textContent = gameBoard.board[i] ? gameBoard.board[i] : "";
      cell.setAttribute("data-index", i);
      cell.addEventListener("click", (e) => {
        gameBoard.update(e.target.getAttribute("data-index"));
        displayController.display();
      });

      grid.appendChild(cell);
    }

    mainElement.appendChild(grid);
  };

  return {
    display,
    clear,
  };
})();

displayController.display();
