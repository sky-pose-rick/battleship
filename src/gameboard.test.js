import gameboardFactory from './gameboard';

let board;

// always start with blank board
beforeEach(() => {
  board = gameboardFactory();
});

it('create a gameboard', () => {
  expect(board.getTile(0, 0)).toEqual({});
});

it('place a ship hozizontally', () => {
  const shipDesc = {
    length: 4,
    row: 2,
    col: 3,
    isVertical: false,
  };
  // length 4, row 2, col 3
  board.placeShip(shipDesc);
  expect(board.getTile(2, 3).ship).toBeTruthy();
  expect(board.getTile(2, 6).ship).toBeTruthy();
});

it('place a ship vertically', () => {
  const shipDesc = {
    length: 2,
    row: 3,
    col: 4,
    isVertical: true,
  };
  // length 4, row 2, col 3
  board.placeShip(shipDesc);
  expect(board.getTile(3, 4).ship).toBeTruthy();
  expect(board.getTile(4, 4).ship).toBeTruthy();
});

it.todo('declare an attack that hits a ship');
it.todo('declare an attack that misses');
it.todo('sink all ships');
