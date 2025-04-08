import NextImage from "next/image";
import {
  Button,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Movie } from "@/app/lib/definitions";
import { ErrorMessage } from "@/app/components/ErrorMessage";

export default function MatchModal({
  matches,
  isOpen,
  onOpenChange,
  error,
}: {
  matches: Movie[] | undefined;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  error?: { message: string };
}) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
      placement="bottom-center"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="font-heading text-2xl font-normal">
              {error ? "There was an error" : "Congrats, you got a match!"}
            </ModalHeader>
            {error ? (
              <div className="ml-5">
                <ErrorMessage>{error.message}</ErrorMessage>
              </div>
            ) : (
              <ModalBody className="gap-6">
                {matches?.map((match) => (
                  <div className="flex flex-col items-center" key={match.id}>
                    <Link href={match.watch_providers?.link} isExternal>
                      <Image
                        as={NextImage}
                        width={200}
                        height={300}
                        src={
                          process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL +
                          "/original" +
                          match.poster_path
                        }
                        alt={match.title}
                        draggable={false}
                      />
                    </Link>
                    <h2 className="mt-1 text-center font-heading text-lg">
                      {match.title}
                    </h2>
                  </div>
                ))}
              </ModalBody>
            )}
            <ModalFooter>
              <Button color="default" variant="flat" onPress={onClose}>
                Close
              </Button>
              {!error && (
                <Button
                  as={Link}
                  endContent={<FaExternalLinkAlt />}
                  color="primary"
                  href={matches && matches[0].watch_providers?.link}
                  isExternal
                >
                  Watch
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
