import { useEffect } from 'react';

export const useEventListener = (target, type, listener, ...rest) => {
  useEffect(() => {
    target.addEventListener(type, listener, ...rest);

    return () => {
      target.removeEventListener(type, listener, ...rest);
    };
  }, [listener, rest, target, type]);
};
