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
import AnimeSpotlightCard from "./anime-spotlight-card";

type Props = {
  animeList: AWAnimeSchema[];
};

export default function AnimeSpotlightCarouselList({ animeList }: Props) {
  const [_, setApi] = useState<CarouselApi>();

  return (
    <Carousel
      setApi={setApi}
      opts={{
        skipSnaps: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-1">
        {animeList.map((anime, index) => (
          <CarouselItem
            key={`${anime.id}-${index}`}
            className="pl-2  basis-[100%]"
          >
            <AnimeCardMotion index={index}>
              <AnimeSpotlightCard {...anime} />
            </AnimeCardMotion>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNextPrev className="right-4 bottom-6" variant="secondary" />
    </Carousel>
  );
}
