import shipFactory from './ship';

it('create a ship of length 2', () => {
  const ship = shipFactory(2);
  expect(ship.getLength()).toBe(2);
});

it('ship sinks in correct number of hits', () => {
  const ship = shipFactory(4);
  expect(ship.isSunk()).toBe(false);
  ship.hit(0);
  expect(ship.isSunk()).toBe(false);
  ship.hit(3);
  ship.hit(2);
  expect(ship.isSunk()).toBe(false);
  ship.hit(1);
  expect(ship.isSunk()).toBe(true);
});
