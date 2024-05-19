import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AnimeCardMotion from "./AnimeCardMotion";
import AnimeEpisodeCard, { AnimeEpisodeCardProps } from "./AnimeEpisodeCard";

type Props = {
  animeList: AnimeEpisodeCardProps[];
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
              <AnimeEpisodeCard {...anime} />
            </AnimeCardMotion>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
