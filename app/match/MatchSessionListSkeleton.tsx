import { Skeleton } from "@nextui-org/react";

export default function MatchSessionListSkeleton() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <ul className="flex flex-1 flex-col gap-2 self-stretch">
        <Skeleton className="h-[4.5rem] w-full rounded-2xl" />
        <Skeleton className="h-[4.5rem] w-full rounded-2xl opacity-70" />
        <Skeleton className="h-[4.5rem] w-full rounded-2xl opacity-50" />
        <Skeleton className="h-[4.5rem] w-full rounded-2xl opacity-30" />
      </ul>
    </div>
  );
}
