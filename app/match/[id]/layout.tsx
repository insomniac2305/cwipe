import MatchSessionLayout from "@/app/match/[id]/MatchSessionLayout";

export default async function MatchSession({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MatchSessionLayout sideInfo={<div>Aside</div>}>
      {children}
    </MatchSessionLayout>
  );
}
