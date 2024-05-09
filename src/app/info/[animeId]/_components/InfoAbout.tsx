"use client";

import { Icons } from "@/components/ui/Icons";
import { AnimeInfo } from "@/lib/types";
import { Button } from "@nextui-org/button";
import Image from "next/image";

type Props = {
  title: AnimeInfo["title"];
  description: AnimeInfo["description"];
  image: AnimeInfo["image"];
};

export default function InfoAbout({ title, image, description }: Props) {
  const mainTitle = title.english || title.romaji || title.native || "";

  return (
    <section className="relative flex flex-col space-y-10">
      <Button
        variant="solid"
        color="primary"
        startContent={<Icons.playFill className="size-8" />}
        fullWidth
        className="md:ml-auto text-2xl font-medium h-16 md:min-w-60 "
      >
        Watch
      </Button>

      <div className="flex gap-10 mt-10">
        <Image height={300} width={200} alt={mainTitle} src={image} />
        <div className="flex flex-col gap-4">
          <h2>{mainTitle}</h2>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}
