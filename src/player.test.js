import playerFactory from './player';
import gameboardFactory from './gameboard';

let player1;
let board1;
let player2;
let targetID;
let targetList;
let targetMock;

describe('testing a mock targeting function', () => {
  beforeAll(() => {
    player1 = playerFactory();
    board1 = gameboardFactory();
    player2 = playerFactory();

    board1.placeShip({
      length: 4,
      row: 2,
      col: 3,
      isVertical: false,
    });

    targetID = 0;
    targetList = [[2, 3], [2, 3], [7, 7], [8, 8]];
    targetMock = () => {
      const nextTarget = targetList[targetID];
      targetID += 1;
      return Promise.resolve(nextTarget);
    };
  });

  it('player can declare an attack', async () => {
    await player2.takeTurn(board1, targetMock);
    expect(board1.getTile(2, 3).hit).toBeTruthy();
    expect(board1.getTile(2, 4).hit).toBeFalsy();
  });

  it('targeting is retried on invalid targets', async () => {
    await player2.takeTurn(board1, targetMock);
    expect(board1.getTile(7, 7).miss).toBeTruthy();
  });

  it('test AI targeting', async () => {
    // last hit was 2,3
    // have AI target neighboring cell left, up, right, down after a hit
    // expect next 4 targeted cells to be [2,2]miss[1,3]miss[2,4]hit[1,4]miss
    const targetFunc = player2.aiTarget;
    await player2.takeTurn(board1, targetFunc);
    expect(board1.getTile(2, 2).miss).toBeTruthy();
    await player2.takeTurn(board1, targetFunc);
    expect(board1.getTile(1, 3).miss).toBeTruthy();
    await player2.takeTurn(board1, targetFunc);
    expect(board1.getTile(2, 4).hit).toBeTruthy();
    await player2.takeTurn(board1, targetFunc);
    expect(board1.getTile(1, 4).miss).toBeTruthy();
  });
});
