"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

const MAX_ROTATION = 10;

export default function SwipeCard({
  isActive,
  handleSwipeLeft,
  handleSwipeRight,
  children,
}: {
  isActive: boolean;
  handleSwipeLeft: () => void;
  handleSwipeRight: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [renderProps, setRenderProps] = useState({
    width: 0,
    centerX: 0,
    originalX: 0,
    originalY: 0,
    offsetX: 0,
    offsetY: 0,
    offsetCenterX: 0,
    rotation: 0,
  });
  const [pointer, setPointer] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!isActive) return;
    const currentRef = ref.current;

    const startSwipe = (e: MouseEvent | TouchEvent): void => {
      const { clientX, clientY } = "touches" in e ? (e as TouchEvent).touches[0] : (e as MouseEvent);
      if (currentRef) {
        const rect = ref.current?.getBoundingClientRect();

        setRenderProps((prevState) => ({
          ...prevState,
          width: rect.width,
          centerX: rect.width / 2 + rect.left,
          originalX: rect.left,
          originalY: rect.top,
          offsetX: clientX - rect.left,
          offsetY: clientY - rect.top,
          offsetCenterX: clientX - (rect.width / 2 + rect.left),
          rotation: 0,
        }));

        setPointer({
          x: clientX,
          y: clientY,
        });

        setIsSwiping(true);
      }
    };

    currentRef?.addEventListener("mousedown", startSwipe);
    currentRef?.addEventListener("touchstart", startSwipe);
    return () => {
      currentRef?.removeEventListener("mousedown", startSwipe);
      currentRef?.removeEventListener("touchstart", startSwipe);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive || !isSwiping) return;

    const handleSwipeMove = (e: MouseEvent | TouchEvent) => {
      const { clientX, clientY } = "touches" in e ? (e as TouchEvent).touches[0] : (e as MouseEvent);
      setPointer({ x: clientX, y: clientY });

      const moveDistance = clientX - renderProps.offsetCenterX - renderProps.centerX;
      const maxDistance = renderProps.width / 4;
      let rotation = (moveDistance / maxDistance) * MAX_ROTATION;
      rotation = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, rotation));

      setRenderProps((prevState) => ({ ...prevState, rotation }));
    };

    window.addEventListener("mousemove", handleSwipeMove);
    window.addEventListener("touchmove", handleSwipeMove);
    return () => {
      window.removeEventListener("mousemove", handleSwipeMove);
      window.removeEventListener("touchmove", handleSwipeMove);
    };
  }, [isActive, renderProps.centerX, renderProps.offsetCenterX, renderProps.width, isSwiping]);

  useEffect(() => {
    if (!isActive) return;

    const currentRef = ref.current;
    let timeoutID: NodeJS.Timeout | undefined;

    const evaluateSwipe = () => {
      if (renderProps.rotation >= MAX_ROTATION) {
        handleSwipeRight();
      } else if (renderProps.rotation <= -MAX_ROTATION) {
        handleSwipeLeft();
      }
    };

    const stopSwipe = () => {
      setIsSwiping(false);
      timeoutID = setTimeout(evaluateSwipe, 150);
    };

    currentRef?.addEventListener("mouseup", stopSwipe);
    currentRef?.addEventListener("touchend", stopSwipe);
    return () => {
      currentRef?.removeEventListener("mouseup", stopSwipe);
      currentRef?.removeEventListener("touchend", stopSwipe);
      clearTimeout(timeoutID);
    };
  }, [isActive, renderProps.rotation, handleSwipeLeft, handleSwipeRight]);

  return (
    <article
      ref={ref}
      className={clsx(
        "relative h-full w-full select-none touch-none",
        isSwiping ? "shadow-lg cursor-grabbing transition-none" : "cursor-grab transition-transform"
      )}
      style={{
        transform: isSwiping
          ? `translate(
              ${pointer.x - renderProps.originalX - renderProps.offsetX}px, 
              ${pointer.y - renderProps.originalY - renderProps.offsetY}px
            ) 
            rotate(${renderProps.rotation}deg)`
          : renderProps.rotation >= MAX_ROTATION
          ? `translate(${renderProps.width * 1.2}px, 0) rotate(${MAX_ROTATION}deg)`
          : renderProps.rotation <= -MAX_ROTATION
          ? `translate(${-renderProps.width * 1.2}px, 0) rotate(${-MAX_ROTATION}deg)`
          : "translate(0,0) rotate(0deg)",
      }}
    >
      {children}
    </article>
  );
}
