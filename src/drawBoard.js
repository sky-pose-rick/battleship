// prepare an html element to represent a 10x10 board
function getTileGroup(cell, isOwnBoard) {
  let symbol;
  let category;
  if (!cell.hit && !cell.miss && (!cell.ship || !isOwnBoard)) {
    // no shot yet, no ship or enemy ship that remains hidden
    category = 'cell-empty';
    symbol = 'O';
  } else if (cell.miss) {
    // missed shot
    category = 'cell-miss';
    symbol = '.';
  } else if (cell.hit && cell.ship.isSunk()) {
    // hit and sunk
    category = 'cell-sunk';
    symbol = 'X';
  } else if (cell.hit) {
    // only a hit
    category = 'cell-hit';
    symbol = 'x';
  } else {
    // a ship that belongs to the player
    category = 'cell-ship';
    symbol = 'T';
  }
  return { symbol, category };
}

function createBoardElem(board, isOwnBoard = false, pubsub) {
  const parent = document.createElement('div');
  const table = document.createElement('table');
  parent.appendChild(table);
  const width = board.getWidth();
  const height = board.getHeight();

  for (let row = 0; row < height; row += 1) {
    const tRow = document.createElement('tr');
    table.appendChild(tRow);
    for (let col = 0; col < width; col += 1) {
      const tDiv = document.createElement('td');
      tRow.appendChild(tDiv);
      const button = document.createElement('button');
      tDiv.append(button);
      const group = getTileGroup(board.getTile(row, col), isOwnBoard);
      button.className = group.category;
      button.innerText = group.symbol;
      // add event listener to cell for inputs
      if (!isOwnBoard && pubsub) {
        button.addEventListener('click', () => {
          pubsub.emit('target-select', [row, col]);
        });
      }
    }
  }
  return parent;
}

function drawBoard(container, board, isOwnBoard, pubsub) {
  const boardElem = createBoardElem(board, isOwnBoard, pubsub);
  if (container.firstChild) { container.replaceChild(boardElem, container.firstChild); } else { container.appendChild(boardElem); }
}

export default { createBoardElem, drawBoard };
