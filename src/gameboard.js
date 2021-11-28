import shipFactory from './ship';

const gameboardFactory = () => {
  const boardSize = 10;
  const board = [];

  for (let i = 0; i < boardSize; i += 1) {
    board[i] = new Array(boardSize).fill({});
  }

  const getTile = (row, col) => board[row][col];

  const placeShip = (shipDesc) => {
    const ship = shipFactory(shipDesc.length);
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

  return { getTile, placeShip };
};

export default gameboardFactory;
