"use client";

import { SwipeCardRef, SwipeDirection } from "@/app/lib/definitions";
import { Card } from "@nextui-org/react";
import clsx from "clsx";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const MAX_ROTATION = 10;

interface Props {
  zIndex: number;
  isActive: boolean;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  children: React.ReactNode;
}

export default forwardRef<SwipeCardRef, Props>(function SwipeCard(
  { zIndex, isActive, onSwipeLeft, onSwipeRight, children },
  forwardedRef,
) {
  const ref = useRef<HTMLDivElement>(null);
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
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection>();
  const [isSwipeDone, setIsSwipeDone] = useState(false);
  const [shouldHandleSwipe, setShouldHandleSwipe] = useState(true);

  useImperativeHandle(forwardedRef, () => {
    return {
      swipe(direction: SwipeDirection, shouldCallHandler = true) {
        const width = ref.current?.getBoundingClientRect().width || 0;
        setRenderProps((prevState) => ({
          ...prevState,
          width,
        }));
        setSwipeDirection(direction);
        shouldCallHandler || setShouldHandleSwipe(false);
      },
      undoSwipe() {
        if (swipeDirection) {
          setIsSwipeDone(false);
          setSwipeDirection(undefined);
        }
      },
    };
  });

  useEffect(() => {
    if (!isActive) return;
    const currentRef = ref.current;

    const startSwipe = (e: MouseEvent | TouchEvent): void => {
      if (!currentRef) return;

      if (
        e.target instanceof HTMLElement &&
        e.target.closest(".cancel-card-swipe")
      )
        return;

      const { clientX, clientY } =
        "touches" in e ? (e as TouchEvent).touches[0] : (e as MouseEvent);
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
      setShouldHandleSwipe(true);
    };

    currentRef?.addEventListener("mousedown", startSwipe);
    currentRef?.addEventListener("touchstart", startSwipe);
    return () => {
      currentRef?.removeEventListener("mousedown", startSwipe);
      currentRef?.removeEventListener("touchstart", startSwipe);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isSwiping) return;

    const handleSwipeMove = (e: MouseEvent | TouchEvent) => {
      const { clientX, clientY } =
        "touches" in e ? (e as TouchEvent).touches[0] : (e as MouseEvent);
      setPointer({ x: clientX, y: clientY });

      const moveDistance =
        clientX - renderProps.offsetCenterX - renderProps.centerX;
      const maxDistance = renderProps.width / 4;
      let rotation = (moveDistance / maxDistance) * MAX_ROTATION;
      rotation = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, rotation));

      setRenderProps((prevState) => ({ ...prevState, rotation }));

      if (rotation >= MAX_ROTATION) {
        setSwipeDirection("right");
      } else if (rotation <= -MAX_ROTATION) {
        setSwipeDirection("left");
      } else {
        setSwipeDirection(undefined);
      }
    };

    window.addEventListener("mousemove", handleSwipeMove);
    window.addEventListener("touchmove", handleSwipeMove);
    return () => {
      window.removeEventListener("mousemove", handleSwipeMove);
      window.removeEventListener("touchmove", handleSwipeMove);
    };
  }, [
    renderProps.centerX,
    renderProps.offsetCenterX,
    renderProps.width,
    isSwiping,
  ]);

  useEffect(() => {
    const currentRef = ref.current;

    const stopSwipe = () => {
      setIsSwiping(false);
    };

    currentRef?.addEventListener("mouseup", stopSwipe);
    currentRef?.addEventListener("touchend", stopSwipe);
    return () => {
      currentRef?.removeEventListener("mouseup", stopSwipe);
      currentRef?.removeEventListener("touchend", stopSwipe);
    };
  }, []);

  useEffect(() => {
    const currentRef = ref.current;

    const callSwipeAction = () => {
      if (swipeDirection) {
        setIsSwipeDone(true);
      }

      if (!shouldHandleSwipe) {
        return;
      } else if (swipeDirection === "right") {
        onSwipeRight();
      } else if (swipeDirection === "left") {
        onSwipeLeft();
      }
    };

    currentRef?.addEventListener("transitionend", callSwipeAction);
    return () => {
      currentRef?.removeEventListener("transitionend", callSwipeAction);
    };
  }, [onSwipeLeft, onSwipeRight, swipeDirection, shouldHandleSwipe]);

  return (
    <Card
      ref={ref}
      className={clsx(
        "absolute top-0 h-full w-full rounded-none xl:rounded-2xl",
        isSwiping ? "cursor-grabbing" : "cursor-grab",
        !isSwiping && swipeDirection ? "opacity-0" : "opacity-100",
        isSwipeDone ? "invisible" : "visible",
      )}
      style={{
        zIndex: zIndex,
        transitionProperty: isSwiping ? "none" : "transform, opacity",
        transform: isSwiping
          ? `translate(
              ${pointer.x - renderProps.originalX - renderProps.offsetX}px, 
              ${pointer.y - renderProps.originalY - renderProps.offsetY}px
            ) 
            rotate(${renderProps.rotation}deg)`
          : swipeDirection === "right"
            ? `translate(${renderProps.width * 1.2}px, 0) rotate(${MAX_ROTATION}deg)`
            : swipeDirection === "left"
              ? `translate(${-renderProps.width * 1.2}px, 0) rotate(${-MAX_ROTATION}deg)`
              : "translate(0,0) rotate(0deg)",
      }}
    >
      {isSwipeDone || children}
    </Card>
  );
});
