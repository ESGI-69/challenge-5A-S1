import { useEffect } from 'react';

export function useClickOutside(ref, handler, mouseEvent = 'click') {
  useEffect(() => {
    const eventHandler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        console.log('clicked outside');
        handler(event);
      }
      console.log('clicked inside or smth');
    };

    document.addEventListener(mouseEvent, eventHandler);

    return () => {
      console.log('removed event listener');
      document.removeEventListener(mouseEvent, eventHandler);
    };
  }, [
    ref,
    handler,
    mouseEvent,
  ]);
}
