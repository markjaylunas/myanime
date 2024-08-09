"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNextPrev,
} from "@/components/ui/carousel";
import { AWAnimeSchema } from "@/lib/aniwatch-validations";
import { useState } from "react";
import AnimeCardMotion from "../anime-cards/AnimeCardMotion";
import AnimeCard from "./anime-card";

type Props = {
  animeList: AWAnimeSchema[];
  query?: string;
};

export default function AnimeCarouselList({ animeList, query }: Props) {
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
              <AnimeCard anime={anime} query={query} />
            </AnimeCardMotion>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNextPrev className="right-2 -top-10" />
    </Carousel>
  );
}
