import { forwardRef, useImperativeHandle } from "react";
import { vi } from "vitest";

export const mockSwipe = vi.fn();
export const mockUndoSwipe = vi.fn();

export const MockSwipeCard = vi.fn().mockImplementation(function MockSwipeCard(
  { children }: { children: React.ReactNode },
  ref,
) {
  useImperativeHandle(ref, () => {
    return {
      swipe: mockSwipe,
      undoSwipe: mockUndoSwipe,
    };
  });

  return <div>{children}</div>;
});

const SwipeCard = forwardRef(MockSwipeCard);

export default SwipeCard;
