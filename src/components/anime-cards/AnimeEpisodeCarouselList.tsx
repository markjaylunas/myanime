import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { EpisodeProgress } from "@/db/schema";
import AnimeCardMotion from "./AnimeCardMotion";
import AnimeEpisodeCard from "./AnimeEpisodeCard";

type Props = {
  animeList: EpisodeProgress[];
};

export default function AnimeEpisodeCarouselList({ animeList }: Props) {
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
            className="pl-2  basis-[65%] xs:basis-[40%] md:basis-[35%] lg:basis-[28%]"
          >
            <AnimeCardMotion index={index}>
              <AnimeEpisodeCard anime={anime} />
            </AnimeCardMotion>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
