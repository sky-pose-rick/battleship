import playerFactory from './player';

let player;
let board;
let targetID;
let targetList;
let targetMock;

it('player owns a board', () => {
  player = playerFactory();
  board = player.getBoard();
  expect(board).toBeTruthy();
});

describe('testing a mock targeting function', () => {
  beforeAll(() => {
    player = playerFactory();
    board = player.getBoard();

    board.placeShip({
      length: 4,
      row: 2,
      col: 3,
      isVertical: false,
    });

    targetID = 0;
    targetList = [[2, 3], [2, 3], [3, 3]];
    targetMock = () => {
      const nextTarget = targetList[targetID];
      targetID += 1;
      return Promise.resolve(nextTarget);
    };
  });

  it('player can declare an attack', () => player.takeTurn(targetMock).then((data) => {
    expect(board.getTile(2, 3).hit).toBeTruthy;
    expect(board.getTile(2, 4).hit).toBeFalsy;
  }));

  it('targeting is retried on invalid targets', () => player.takeTurn(targetMock).then((data) => {
    expect(board.getTile(3, 3).miss).toBeTruthy;
  }));
});
