import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center">
      Home
      <Link href="/match">Match</Link>
    </main>
  );
}
