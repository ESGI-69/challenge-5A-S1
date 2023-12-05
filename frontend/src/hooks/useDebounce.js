import { useEffect, useState } from 'react';

export function useDebounce(value, delay = 300) {
  const [ debouncedValue, setDebouncedValue ] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [ value, delay ]);

  return debouncedValue;
}
