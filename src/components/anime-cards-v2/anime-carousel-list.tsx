"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNextPrev,
} from "@/components/ui/carousel";
import { AnimeType } from "@/lib/types";
import { useState } from "react";
import AnimeCardMotion from "../anime-cards/AnimeCardMotion";
import AnimeCard from "./anime-card";

type Props = {
  animeList: AnimeType[];
  isRecentEpisode?: boolean;
};

export default function AnimeCarouselList({
  animeList,
  isRecentEpisode,
}: Props) {
  const [_, setApi] = useState<CarouselApi>();
  return (
    <Carousel
      opts={{
        dragFree: true,
      }}
      setApi={setApi}
      className="w-full"
    >
      <CarouselContent className="-ml-1">
        {animeList.map((anime, index) => (
          <CarouselItem
            key={`${anime.id}-${index}`}
            className="pl-2  basis-[45%] xs:basis-[28%] md:basis-[23%] lg:basis-[19%] xl:basis-[18%]"
          >
            <AnimeCardMotion index={index}>
              <AnimeCard anime={anime} isRecentEpisode={isRecentEpisode} />
            </AnimeCardMotion>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNextPrev className="right-2 -top-10" />
    </Carousel>
  );
}
