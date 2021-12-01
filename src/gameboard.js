import shipFactory from './ship';

const gameboardFactory = () => {
  const boardSize = 10;
  const board = [];
  const ships = [];

  for (let i = 0; i < boardSize; i += 1) {
    board[i] = new Array(boardSize).fill({});
  }

  const getTile = (row, col) => board[row][col];

  const placeShip = ({
    row, col, length, isVertical,
  }) => {
    const ship = shipFactory(length);
    ships.push(ship);
    if (isVertical) {
      for (let i = 0; i < length; i += 1) {
        board[row + i][col] = {
          ship,
          pos: i,
        };
      }
    } else {
      for (let i = 0; i < length; i += 1) {
        board[row][col + i] = {
          ship,
          pos: i,
        };
      }
    }
  };

  const receiveAttack = (row, col) => {
    const cell = board[row][col];
    if (cell.ship) {
      cell.hit = true;
      cell.ship.hit(cell.pos);
      return true;
    }
    // create new cell because all empty cells reference same object
    board[row][col] = { miss: true };
    return false;
  };

  const isAllSunk = () => ships.every((ship) => ship.isSunk());

  const isValidTarget = (row, col) => {
    const cell = board[row][col];
    return !(cell.miss || cell.hit);
  };

  return {
    getTile, placeShip, receiveAttack, isAllSunk, isValidTarget,
  };
};

export default gameboardFactory;
