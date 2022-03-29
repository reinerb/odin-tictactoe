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
  let gameOver = false;

  // Updates the cell at the given index with the given input
  const update = function (index) {
    if (!board[index] && !gameOver) {
      board[index] = players[turn % 2].getSymbol();
      console.log(checkWin());
      turn += 1;
    }
  };

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
