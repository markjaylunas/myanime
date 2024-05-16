"use client";

import ExpandDescription from "@/components/ui/ExpandDescription";
import { Icons } from "@/components/ui/Icons";
import { AnimeInfo } from "@/lib/types";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import NextLink from "next/link";

type Props = {
  title: AnimeInfo["title"];
  description: AnimeInfo["description"];
  image: AnimeInfo["image"];
  watchLink: string | null;
};

export default function InfoAbout({
  title,
  image,
  description,
  watchLink,
}: Props) {
  return (
    <section className="relative flex flex-col space-y-10">
      {watchLink && (
        <Button
          as={NextLink}
          href={watchLink}
          variant="solid"
          color="primary"
          startContent={<Icons.playFill className="size-8" />}
          fullWidth
          className="md:ml-auto text-2xl font-medium h-16 md:min-w-60 "
        >
          Watch
        </Button>
      )}

      <div className="flex flex-col lg:flex-row gap-10 mt-10 mx-auto">
        <ExpandDescription
          className="max-w-xl"
          maxChars={400}
          description={description || ""}
        />
        <div className=" h-[300px] w-[200px]">
          <Image
            height={300}
            width={200}
            alt={title}
            src={image}
            className="object-cover"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
