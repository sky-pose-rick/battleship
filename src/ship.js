const shipFactory = (length) => {
  const hits = new Array(length).fill(false);

  const getLength = () => length;
  const isSunk = () => hits.every((value) => value);
  const hit = (index) => {
    hits[index] = true;
  };

  return { getLength, isSunk, hit };
};

export default shipFactory;
