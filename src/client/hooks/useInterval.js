import { useEffect, useRef } from 'react';

export function useInterval(callback, addRow, updatePiecePos, delay) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current(addRow, updatePiecePos);
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
    // eslint-disable-next-line 
  }, [delay]);
}
