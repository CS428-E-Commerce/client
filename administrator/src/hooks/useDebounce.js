import { useEffect, useRef } from "react";

const useDebounce = (callback, wait) => {
  const argsRef = useRef();
  const timeout = useRef();

  const cleanup = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  };

  useEffect(() => cleanup, []);

  return (...args) => {
    argsRef.current = args;

    cleanup();

    timeout.current = setTimeout(() => {
      if (argsRef.current) {
        callback(...argsRef.current);
      }
    }, wait);
  };
};

export default useDebounce;
