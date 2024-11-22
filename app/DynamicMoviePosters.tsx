"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiHandThumbUp } from "react-icons/hi2";

export function DynamicMoviePosters() {
  return (
    <div className="relative mx-16 my-32">
      <motion.div
        className="relative overflow-hidden rounded-xl"
        initial={{
          x: 0,
          y: 0,
        }}
        whileInView={{
          x: -64,
          y: -128,
          opacity: 1,
        }}
      >
        <Image
          width={300}
          height={500}
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg`}
          alt="The Wild Robot Poster"
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
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg`}
          alt="Gladiator Poster"
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
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg`}
          alt="Interstellar Poster"
        />
      </motion.div>
    </div>
  );
}
