import gameboardFactory from './gameboard';
import boardDrawer from './drawBoard';

describe('test creating element for the board', () => {
  // create a board, place a ship and some attacks

  // cannot test DOM methods with document element
  // too much mocking to test objects created entirely by DOM functions
  /* const board = gameboardFactory();
  board.placeShip({
    length: 2,
    row: 6,
    col: 7,
    isVertical: true,
  });

  board.placeShip({
    length: 4,
    row: 2,
    col: 3,
    isVertical: false,
  });

  board.receiveAttack(6, 7);
  board.receiveAttack(7, 7);
  board.receiveAttack(2, 4);
  board.receiveAttack(1, 1);
  board.receiveAttack(3, 3);

  const elem = boardDrawer.createBoardElem(board); */

  it.todo('test that the element is created');
  it.todo('test that correct number of rows/cols exist');
  it.todo('test that content in sub-elements is correct');
});
