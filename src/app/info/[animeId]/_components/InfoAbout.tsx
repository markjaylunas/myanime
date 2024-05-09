"use client";

import ExpandDescription from "@/components/ui/ExpandDescription";
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

      <div className="flex flex-col lg:flex-row gap-10 mt-10 mx-auto">
        <ExpandDescription
          className="max-w-xl"
          maxChars={400}
          description={description}
          isHtmlTemplate
        />
        <div className=" h-[300px] w-[200px]">
          <Image
            height={300}
            width={200}
            alt={mainTitle}
            src={image}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
