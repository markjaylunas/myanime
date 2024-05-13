import { AnimeInfoList } from "@/lib/types";
import AnimeCard from "./AnimeCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AnimeCardMotion from "./AnimeCardMotion";

type Props = {
  animeList: AnimeInfoList["results"];
  isRanked?: boolean;
};

export default function AnimeCarouselList({
  animeList,
  isRanked = false,
}: Props) {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
        {animeList.map((anime, index) => (
          <CarouselItem
            key={`${anime.id}-${index}`}
            className="pl-2  basis-[45%] xs:basis-[28%] md:basis-[23%] lg:basis-[19%] xl:basis-[18%]"
          >
            <AnimeCardMotion index={index}>
              <AnimeCard {...anime} rank={isRanked ? index + 1 : undefined} />
            </AnimeCardMotion>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
