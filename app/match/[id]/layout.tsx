import MatchSessionLayout from "@/app/match/[id]/MatchSessionLayout";
import { MatchSideInfo } from "@/app/match/[id]/MatchSideInfo";

export default async function MatchSession({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  return (
    <MatchSessionLayout sideInfo={<MatchSideInfo matchSessionId={params.id} />}>
      {children}
    </MatchSessionLayout>
  );
}
