"use client";

import { motion } from "framer-motion";
import AnimeCard from "./AnimeCard";

import { AnimeInfoList } from "@/lib/types";
import { useRouter } from "next/navigation";

type AnimeListProps = {
  animeList: AnimeInfoList["results"];
};

export default function AnimeList({ animeList }: AnimeListProps) {
  const router = useRouter();
  return (
    <ul className="grid grid-cols-2 2xs:grid-cols-3 xs:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 gap-y-6">
      {animeList.map((anime, index) => (
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
