import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

export default function NotFound() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <h1 className="mb-2 font-heading text-7xl">404</h1>
      <h2 className="mb-8 font-heading text-xl text-default-500">
        Page not found
      </h2>
      <Button as={Link} size="lg" color="primary" href="/">
        Return Home
      </Button>
    </div>
  );
}
