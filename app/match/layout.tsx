import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import { verifyOnboardingComplete } from "@/app/onboarding/lib/actions";
import MatchLayout from "@/app/match/components/MatchLayout";
import { MatchSideNav } from "@/app/match/components/MatchSideNav";

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

  return <MatchLayout sideNav={<MatchSideNav />}>{children}</MatchLayout>;
}
