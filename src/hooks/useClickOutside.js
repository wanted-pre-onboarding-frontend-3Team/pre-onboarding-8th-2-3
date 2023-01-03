import { useCallback, useEffect, useRef } from 'react';

export const useClickOutSide = (ref, callback) => {
  const _callback = useRef(callback);
  _callback.current = callback;

  const clickEventHandler = useCallback(
    (e) => {
      const target = ref.current;

      if (target) {
        const isContain = target.contains(e.target);
        const isMatched = target === e.target;

        _callback.current(isContain, isMatched);
      }
    },
    [ref],
  );

  useEffect(() => {
    document.addEventListener('click', clickEventHandler);

    return () => {
      document.removeEventListener('click', clickEventHandler);
    };
  }, [clickEventHandler]);
};
