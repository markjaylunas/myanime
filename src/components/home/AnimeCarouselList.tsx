"use client";

import { AnimeInfoList } from "@/lib/types";
import { motion } from "framer-motion";
import AnimeCard from "./AnimeCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";

type Props = {
  animeList: AnimeInfoList["results"];
  isRanked?: boolean;
};

export default function AnimeCarouselList({
  animeList,
  isRanked = false,
}: Props) {
  const router = useRouter();

  return (
    <Carousel
      opts={{
        dragFree: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-1">
        {animeList.map((anime, index) => (
          <CarouselItem
            key={`${anime.id}-${index}`}
            className="pl-2  basis-[45%] 2xs:basis-[38%] xs:basis-[28%] md:basis-[23%] lg:basis-[19%] xl:basis-[18%]"
            onClick={() =>
              router.push(
                `/info/${anime.id}/watch/${
                  anime.episodeId ? anime.episodeId : "default_episode_id"
                }`
              )
            }
          >
            <motion.div
              initial={{ opacity: 0.5, scale: 0.9 }}
              viewport={{ once: true }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: index > 5 ? 0.5 : 0.1 * index,
              }}
            >
              <AnimeCard {...anime} rank={isRanked ? index + 1 : undefined} />
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
