"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiHandThumbUp } from "react-icons/hi2";
import { DiscoverMovies } from "@/app/lib/definitions";
import fallbackImage1 from "@/public/movie-poster-fallback-1.jpg";
import fallbackImage2 from "@/public/movie-poster-fallback-2.jpg";
import fallbackImage3 from "@/public/movie-poster-fallback-3.jpg";

export function DynamicMoviePosters({
  movies,
}: {
  movies?: DiscoverMovies["results"];
}) {
  const fallbackMovies = [
    {
      poster_path: fallbackImage1,
      title: "Movie 1",
    },
    {
      poster_path: fallbackImage2,
      title: "Movie 2",
    },
    {
      poster_path: fallbackImage3,
      title: "Movie 3",
    },
  ];

  return (
    <div className="relative mx-16 my-32">
      <motion.div
        className="relative overflow-hidden rounded-xl"
        initial={{
          x: 0,
          y: 0,
        }}
        whileInView={{
          x: -32,
          y: -64,
          opacity: 1,
        }}
      >
        <Image
          width={300}
          height={500}
          src={
            movies
              ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original/${movies[0].poster_path}`
              : fallbackMovies[0].poster_path
          }
          alt={`${movies ? movies[0].title : fallbackMovies[0].title} poster`}
        />
      </motion.div>
      <motion.div
        className="absolute left-0 top-0 overflow-hidden rounded-xl"
        initial={{ x: 0, y: 0, rotate: 0 }}
        whileInView={{
          x: 0,
          y: 0,
          rotate: 6,
          opacity: 1,
        }}
      >
        <Image
          width={300}
          height={500}
          src={
            movies
              ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original/${movies[1].poster_path}`
              : fallbackMovies[1].poster_path
          }
          alt={`${movies ? movies[1].title : fallbackMovies[1].title} poster`}
        />
      </motion.div>
      <motion.div
        className="absolute left-0 top-0 overflow-hidden rounded-xl"
        initial={{ x: 0, y: 0, rotate: 0 }}
        whileInView={{
          x: 32,
          y: 64,
          rotate: 12,
          opacity: 1,
        }}
      >
        <motion.div
          className="z-index-10 absolute flex h-full w-full items-center justify-center bg-default-50/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { delay: 0.5 } }}
        >
          <motion.div
            initial={{ rotate: 0, scale: 0.5 }}
            whileInView={{
              scale: 1,
              rotate: [20, -30, 0],
              transition: { delay: 0.5, duration: 0.4 },
            }}
          >
            <HiHandThumbUp className="text-7xl" />
          </motion.div>
        </motion.div>
        <Image
          width={300}
          height={500}
          src={
            movies
              ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original/${movies[2].poster_path}`
              : fallbackMovies[2].poster_path
          }
          alt={`${movies ? movies[2].title : fallbackMovies[2].title} poster`}
        />
      </motion.div>
    </div>
  );
}
