"use client";

import { AnimeData, RecentAnimeEpisodeData } from "@/lib/types";
import { motion } from "framer-motion";
import AnimeCard from "./AnimeCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";

type Props = {
  animeList: AnimeData["results"] | RecentAnimeEpisodeData["results"];
};

export default function AnimeCarouselList({ animeList }: Props) {
  const router = useRouter();
  return (
    <Carousel
      opts={{
        dragFree: true,
        skipSnaps: false,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-1">
        {animeList.map((anime, index) => (
          <CarouselItem
            key={`${anime.id}-${index}`}
            className="pl-1  basis-1/2  2xs:basis-[58%] xs:basis-[40%] 2sm:basis-[37%]  sm:basis-[27%] md:basis-[26%] lg:basis-[21%] "
            onClick={() => router.push(`/info/${anime.id}`)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: index > 5 ? 0.5 : 0.1 * index,
              }}
            >
              <AnimeCard
                id={anime.id}
                title={
                  anime.title.english ||
                  anime.title.romaji ||
                  anime.title.native ||
                  ""
                }
                image={anime.image}
              />
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
