// prepare an html element to represent a 10x10 board
function createTileElem(cell, isOwnBoard) {
  const tDiv = document.createElement('td');
  if (!cell.hit && !cell.miss && (!cell.ship || !isOwnBoard)) {
    // no shot yet, no ship or enemy ship that remains hidden
    tDiv.className = 'cell-empty';
    tDiv.innerText = 'O';
  } else if (cell.miss) {
    // missed shot
    tDiv.className = 'cell-miss';
    tDiv.innerText = '.';
  } else if (cell.hit && cell.ship.isSunk()) {
    // hit and sunk
    tDiv.className = 'cell-sunk';
    tDiv.innerText = 'X';
  } else if (cell.hit) {
    // only a hit
    tDiv.className = 'cell-hit';
    tDiv.innerText = 'x';
  } else {
    // a ship that belongs to the player
    tDiv.className = 'cell-ship';
    tDiv.innerText = 'T';
  }
  return tDiv;
}

function createBoardElem(board, isOwnBoard = false) {
  const parent = document.createElement('div');
  const table = document.createElement('table');
  parent.appendChild(table);
  const width = board.getWidth();
  const height = board.getHeight();

  for (let row = 0; row < height; row += 1) {
    const tRow = document.createElement('tr');
    table.appendChild(tRow);
    for (let col = 0; col < width; col += 1) {
      const tDiv = createTileElem(board.getTile(row, col), isOwnBoard);
      tRow.appendChild(tDiv);
      // add event listener to cell for inputs
    }
  }
  return parent;
}

function drawBoard(container, board, isOwnBoard) {
  console.log('drawing board');
  const boardElem = createBoardElem(board, isOwnBoard);
  if (container.firstChild) { container.replaceChild(boardElem, container.firstChild); } else { container.appendChild(boardElem); }
}

export default { createBoardElem, drawBoard };
