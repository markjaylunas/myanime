import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AWAnimeSchema } from "@/lib/aniwatch-validations";
import AnimeCardMotion from "../anime-cards/AnimeCardMotion";
import AnimeCard from "./anime-card";

type Props = {
  animeList: AWAnimeSchema[];
};

export default function AnimeCarouselList({ animeList }: Props) {
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
            className="pl-2  basis-[45%] xs:basis-[28%] md:basis-[23%] lg:basis-[19%] xl:basis-[18%]"
          >
            <AnimeCardMotion index={index}>
              <AnimeCard {...anime} />
            </AnimeCardMotion>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
