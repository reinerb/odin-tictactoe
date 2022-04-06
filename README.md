# Tic Tac Toe

This came from [the Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe).

The goal was to make a playable tic-tac-toe game. It is viewable [here](https://reinerb.github.io/odin-tictactoe/).

## Interesting learning points

This was my first time employing a HTML `dialog` block. I am not certain why, but the block did not end up displaying as expected. A little CSS and Javascript got it working as expected, though.

```css
dialog {
  margin: auto;
  ...
}

.hidden {
  display: none;
}
```

```javascript
const playerNamesInput = document.querySelector("#player-info");

const initialize = function () {
  ...
  playerNamesInput.classList.remove("hidden");
  playerNamesInput.showModal();
}

const playerNamesFromForm = function () {
  ...
  playerNamesInput.close();
  playerNamesInput.classList.add("hidden");
}
```

## Further development

In future, I'd like to come back to this and look into adding an AI opponent. An implementation of the [minimax algorithm](https://en.wikipedia.org/wiki/Minimax) would make for an interesting project, but I am currently more interested in progressing further in the Odin Project Javascript course.
