"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNextPrev,
} from "@/components/ui/carousel";
import { useState } from "react";
import AnimeCardMotion from "./AnimeCardMotion";
import AnimeEpisodeCard, { AnimeEpisodeCardProps } from "./AnimeEpisodeCard";

type Props = {
  animeList: AnimeEpisodeCardProps[];
};

export default function AnimeEpisodeCarouselList({ animeList }: Props) {
  const [_, setApi] = useState<CarouselApi>();

  return (
    <Carousel
      setApi={setApi}
      opts={{
        dragFree: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-1">
        {animeList.map((anime, index) => (
          <CarouselItem
            key={`${anime.id}-${index}`}
            className="pl-2  basis-[65%] xs:basis-[40%] md:basis-[35%] lg:basis-[28%]"
          >
            <AnimeCardMotion index={index}>
              <AnimeEpisodeCard {...anime} />
            </AnimeCardMotion>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNextPrev className="right-4 -top-10" />
    </Carousel>
  );
}
