"use client";

import { useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void,
  events: string[] = ["mousedown", "touchstart"]
): React.RefObject<T | null> {
  const containerRef = useRef<T>(null);
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const element = containerRef.current;
      if (!element || element.contains(event.target as Node)) {
        return;
      }

      savedHandler.current(event);
    };

    events.forEach((eventName) => {
      document.addEventListener(eventName, handleClickOutside as EventListener);
    });

    return () => {
      events.forEach((eventName) => {
        document.removeEventListener(
          eventName,
          handleClickOutside as EventListener
        );
      });
    };
  }, [events]);

  return containerRef;
}
