"use client";
import { motion } from "framer-motion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AnimeCardSkeleton from "./AnimeCardSkeleton";

export default function AnimeCardListSkeleton() {
  return (
    <Carousel
      opts={{
        dragFree: true,
        skipSnaps: false,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-1">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-1  basis-1/2  2xs:basis-[58%] xs:basis-[40%] 2sm:basis-[37%]  sm:basis-[27%] md:basis-[26%] lg:basis-[21%] "
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: index > 5 ? 0.5 : 0.1 * index,
                }}
              >
                <AnimeCardSkeleton />
              </motion.div>
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
}
