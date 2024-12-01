import { Skeleton } from "@nextui-org/react";

export function LoadingSkeleton() {
  return (
    <>
      <div className="my-4 flex items-center">
        <Skeleton className="h-3 w-64 rounded-full" />
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {[...Array(12)].map((e, index) => (
          <div key={index} className="flex w-16 flex-col items-center gap-2">
            <Skeleton className="size-16 rounded-2xl" />
            <Skeleton className="h-2 w-3/4 rounded-full" />
          </div>
        ))}
      </div>
    </>
  );
}
