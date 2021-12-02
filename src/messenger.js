const eventEmitter = (oldEventList) => {
  const events = oldEventList || {};

  const subscribe = (eventName, cb) => {
    // eslint-disable-next-line no-unused-expressions
    (events[eventName] || (events[eventName] = [])).push(cb);

    const unsubscribe = () => {
      if (events[eventName]) {
        // eslint-disable-next-line no-bitwise
        events[eventName].splice(events[eventName].indexOf(cb) >>> 0, 1);
      }
    };

    return { unsubscribe };
  };

  const emit = (eventName, args) => {
    (events[eventName] || []).forEach((fn) => {
      fn(...args);
    });
  };

  return { subscribe, emit };
};

export default eventEmitter;
