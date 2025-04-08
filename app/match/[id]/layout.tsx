import MatchSessionLayout from "@/app/match/[id]/components/MatchSessionLayout";
import { MatchSideInfo } from "@/app/match/[id]/components/MatchSideInfo";

export default async function MatchSession({
  params,
  children,
}: {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}) {
  const { id } = await params;

  return (
    <MatchSessionLayout sideInfo={<MatchSideInfo matchSessionId={id} />}>
      {children}
    </MatchSessionLayout>
  );
}
