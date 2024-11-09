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

  if (!isOnboardingComplete) {
    const searchParams = new URLSearchParams();
    searchParams.append("callbackUrl", "/match");
    redirect(`/onboarding?${searchParams.toString()}`);
  }

  return (
    <MatchLayout sideNav={<MatchSessionSidebar />}>{children}</MatchLayout>
  );
}
