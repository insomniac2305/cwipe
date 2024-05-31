import MatchLayout from "@/app/match/MatchLayout";
import { MatchSessionList } from "@/app/match/MatchSessionList";

export default async function Match({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MatchLayout sidebar={<MatchSessionList />}>{children}</MatchLayout>;
}
