"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AnimeCardSkeleton from "./AnimeCardSkeleton";

export default function AnimeCarouselListSkeleton() {
  return (
    <Carousel
      opts={{
        dragFree: true,
        skipSnaps: false,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-1">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-2  basis-[45%] xs:basis-[28%] md:basis-[23%] lg:basis-[19%] xl:basis-[18%]"
            >
              <AnimeCardSkeleton />
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
}
