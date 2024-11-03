import { auth } from "@/app/lib/auth";
import MatchLayout from "@/app/match/MatchLayout";
import { MatchSessionSidebar } from "@/app/match/MatchSessionSidebar";
import { verifyOnboardingComplete } from "@/app/onboarding/actions";
import { redirect } from "next/navigation";

export default async function Match({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userId = session?.user?.id;
  const isOnboardingComplete = await verifyOnboardingComplete(userId);
  if (!isOnboardingComplete) redirect("/onboarding");

  return (
    <MatchLayout sidebar={<MatchSessionSidebar />}>{children}</MatchLayout>
  );
}
