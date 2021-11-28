import shipFactory from './ship';

const gameboardFactory = () => {
  const boardSize = 10;
  const board = [];
  const ships = [];

  for (let i = 0; i < boardSize; i += 1) {
    board[i] = new Array(boardSize).fill({});
  }

  const getTile = (row, col) => board[row][col];

  const placeShip = (shipDesc) => {
    const ship = shipFactory(shipDesc.length);
    ships.push(ship);
    if (shipDesc.isVertical) {
      for (let i = 0; i < shipDesc.length; i += 1) {
        board[shipDesc.row + i][shipDesc.col] = {
          ship,
          pos: i,
        };
      }
    } else {
      for (let i = 0; i < shipDesc.length; i += 1) {
        board[shipDesc.row][shipDesc.col + i] = {
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

  return {
    getTile, placeShip, receiveAttack, isAllSunk,
  };
};

export default gameboardFactory;
