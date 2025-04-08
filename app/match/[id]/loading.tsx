import { Spinner } from "@heroui/react";

export default async function MatchLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner size="lg" color="primary" label="Loading movie match session" />
    </div>
  );
}
