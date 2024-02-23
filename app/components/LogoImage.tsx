import { Image } from "@nextui-org/react";
import NextImage from "next/image";

export function LogoImage({ src, name }: { src: string; name: string }) {
  return (
    <Image
      as={NextImage}
      src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w45${src}`}
      width={45}
      height={45}
      className="object-cover"
      alt={name}
      draggable={false}
    />
  );
}
