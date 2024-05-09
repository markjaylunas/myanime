"use client";

import { motion } from "framer-motion";
import AnimeCard, { AnimeCardProps } from "./AnimeCard";

import { useRouter } from "next/navigation";

type AnimeListProps = {
  list: AnimeCardProps[];
};

export default function AnimeList({ list }: AnimeListProps) {
  const router = useRouter();
  return (
    <ul className="grid grid-cols-2 xs:grid-cols-3 2sm:grid-cols-3  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
      {list.map((anime, index) => (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: index > 5 ? 0.5 : 0.1 * index,
          }}
          key={`${anime.id}-${index}`}
          onClick={() => router.push(`/info/${anime.id}`)}
          className="w-fit"
        >
          <AnimeCard {...anime} />
        </motion.div>
      ))}
    </ul>
  );
}
