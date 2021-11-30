import playerFactory from './player';
import gameboardFactory from './gameboard';

let enemyBoard;
let player;
let targetID;
let targetList;
let targetMock;

describe('testing a mock targeting function', () => {
  beforeAll(() => {
    enemyBoard = gameboardFactory();
    player = playerFactory();

    enemyBoard.placeShip({
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
    await player.takeTurn(enemyBoard, targetMock);
    expect(enemyBoard.getTile(2, 3).hit).toBeTruthy();
    expect(enemyBoard.getTile(2, 4).hit).toBeFalsy();
  });

  it('targeting is retried on invalid targets', async () => {
    await player.takeTurn(enemyBoard, targetMock);
    expect(enemyBoard.getTile(7, 7).miss).toBeTruthy();
  });

  it('test AI targeting', async () => {
    // last hit was 2,3
    // have AI target neighboring cell left, up, right, down after a hit
    // expect next 4 targeted cells to be [2,2]miss[1,3]miss[2,4]hit[1,4]miss
    const targetFunc = player.aiTarget;
    await player.takeTurn(enemyBoard, targetFunc);
    expect(enemyBoard.getTile(2, 2).miss).toBeTruthy();
    await player.takeTurn(enemyBoard, targetFunc);
    expect(enemyBoard.getTile(1, 3).miss).toBeTruthy();
    await player.takeTurn(enemyBoard, targetFunc);
    expect(enemyBoard.getTile(2, 4).hit).toBeTruthy();
    await player.takeTurn(enemyBoard, targetFunc);
    expect(enemyBoard.getTile(1, 4).miss).toBeTruthy();
  });
});
