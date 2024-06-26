import MatchLayout from "@/app/match/MatchLayout";
import { MatchSessionSidebar } from "@/app/match/MatchSessionSidebar";

export default async function Match({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MatchLayout sidebar={<MatchSessionSidebar />}>{children}</MatchLayout>
  );
}
