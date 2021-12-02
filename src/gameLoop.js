import gameboardFactory from './gameboard';
import playerFactory from './player';
import boardDrawer from './drawBoard';

function staticBoardSetup() {
  const board = gameboardFactory();
  board.placeShip({
    row: 0, col: 2, length: 2, isVertical: false,
  });
  board.placeShip({
    row: 3, col: 0, length: 3, isVertical: false,
  });
  board.placeShip({
    row: 4, col: 3, length: 3, isVertical: true,
  });
  board.placeShip({
    row: 2, col: 5, length: 4, isVertical: false,
  });
  board.placeShip({
    row: 6, col: 5, length: 5, isVertical: false,
  });

  return board;
}

function quickBoardSetup() {
  const board = gameboardFactory();
  board.placeShip({
    row: 4, col: 5, length: 2, isVertical: true,
  });

  return board;
}

function promptTargeting() {
  const row = prompt('Select a row');
  const col = prompt('Select a col');
  return Promise.resolve([row, col]);
}

async function runGame() {
  // create player 1
  const player1 = playerFactory();
  // create player 2
  const player2 = playerFactory();
  // create board 1
  const board1 = quickBoardSetup();
  // create board 2
  const board2 = quickBoardSetup();

  // one board container
  const container1 = document.getElementById('board1');
  const container2 = document.getElementById('board2');
  boardDrawer.drawBoard(container1, board1);
  boardDrawer.drawBoard(container2, board2);

  // start loop
  while (!board1.isAllSunk()) {
    // draw board
    boardDrawer.drawBoard(container1, board1);
    // ask human player to choose target
    // eslint-disable-next-line no-await-in-loop
    const action1 = await player1.takeTurn(board2, promptTargeting);
    console.log('Human: ', action1);
    // allow clicking on board
    // once target is selected, end clicking

    // check if AI loses
    if (board2.isAllSunk()) {
      break;
    }
    // don't redraw board
    boardDrawer.drawBoard(container2, board2);
    // AI choose target
    // eslint-disable-next-line no-await-in-loop
    const action2 = await player2.takeTurn(board1, player2.aiTarget);
    console.log('AI: ', action2);
  // check if human loses
  // back to top of loop
  }
  boardDrawer.drawBoard(container1, board1);
  boardDrawer.drawBoard(container2, board2);
  // exit function
  console.log('game over');
}

export default { runGame };
