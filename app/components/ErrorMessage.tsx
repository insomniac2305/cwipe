import { Chip } from "@nextui-org/react";
import { FaExclamationCircle } from "react-icons/fa";

export function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <Chip
      color="danger"
      variant="flat"
      startContent={<FaExclamationCircle className="text-lg" />}
      size="lg"
    >
      {children}
    </Chip>
  );
}
