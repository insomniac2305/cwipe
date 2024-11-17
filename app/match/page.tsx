import { PiCardsThreeFill } from "react-icons/pi";

export default async function Match() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <PiCardsThreeFill className="text-5xl" />
      <p className="text-center text-2xl">
        Select a match session <br />
        or start a new one
      </p>
    </div>
  );
}
