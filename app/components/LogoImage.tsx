import NextImage from "next/image";
import { Image } from "@heroui/image";

export function LogoImage({ src, name }: { src: string; name: string }) {
  return (
    <Image
      as={NextImage}
      src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original${src}`}
      width={45}
      height={45}
      className="object-cover"
      alt={name}
      draggable={false}
    />
  );
}
