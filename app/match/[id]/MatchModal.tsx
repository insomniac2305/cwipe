import { Movie } from "@/app/lib/definitions";
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

export default function MatchModal({
  matches,
  isOpen,
  onOpenChange,
}: {
  matches: Movie[] | undefined;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
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
              Congrats, you got a match!
            </ModalHeader>
            <ModalBody>
              {matches?.map((match) => (
                <div className="mb-2 flex flex-col items-center" key={match.id}>
                  <h2 className="mb-2 font-heading text-xl">{match.title}</h2>
                  <Image
                    width={200}
                    src={
                      process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL +
                      "/original" +
                      match.poster_path
                    }
                    alt={match.title}
                    draggable={false}
                  />
                </div>
              ))}
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="flat" onPress={onClose}>
                Keep matching
              </Button>
              <Button color="secondary" variant="flat" onPress={onClose}>
                All matches
              </Button>
              <Button color="primary" onPress={onClose}>
                Watch movie
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
