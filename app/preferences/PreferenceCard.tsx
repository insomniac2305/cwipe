import { Card } from "@nextui-org/react";
import { ReactNode } from "react";

export function PreferenceCard({
  icon,
  title,
  isList,
  children,
}: {
  icon: ReactNode;
  title: string;
  isList?: boolean;
  children: ReactNode;
}) {
  return (
    <Card className="flex flex-row flex-wrap justify-between gap-4 p-4">
      <div className="flex items-center gap-2">
        <div className="text-xl">{icon}</div>
        <p className="font-semibold">{title}</p>
      </div>
      {isList ? (
        <div className="flex flex-wrap gap-2">{children}</div>
      ) : (
        <p className="text-white/70">{children}</p>
      )}
    </Card>
  );
}
