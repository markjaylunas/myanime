"use client";

import { searchAnime } from "@/actions/action";
import { Icons } from "@/components/ui/Icons";
import { AnimeInfo } from "@/lib/types";
import { useDebouncedCallback } from "@mantine/hooks";
import { Input } from "@nextui-org/input";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Image,
  ScrollShadow,
} from "@nextui-org/react";
import NextLink from "next/link";
import { useState } from "react";

export default function QuickSearch() {
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<AnimeInfo[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const handleSearch = useDebouncedCallback(async (term: string) => {
    const res = await searchAnime({ query: term });
    setData(res?.results || []);
    setHasNextPage(res?.hasNextPage || false);
  }, 500);

  return (
    <>
      <Dropdown type="menu" placement="bottom-end">
        <DropdownTrigger>
          <Button
            radius="full"
            className="bg-gradient-to-tr from-rose-500 to-primary text-white shadow-lg"
            size="sm"
            startContent={<Icons.search />}
            variant="shadow"
          >
            Search Anime
          </Button>
        </DropdownTrigger>
        <DropdownMenu classNames={{ base: "w-full" }} aria-label="Search anime">
          <DropdownSection>
            <DropdownItem textValue="Search" isReadOnly>
              <Input
                variant="underlined"
                autoFocus
                placeholder="Type to search..."
                size="sm"
                startContent={<Icons.search />}
                type="search"
                value={query}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setQuery(newValue);
                  handleSearch(newValue);
                }}
              />
            </DropdownItem>
          </DropdownSection>

          <DropdownSection
            as={ScrollShadow}
            className=" max-h-[70dvh] min-h-80 scrollbar-hide"
          >
            {data.map((anime) => (
              <DropdownItem
                as={NextLink}
                href={`/info/${anime.id}/watch/${
                  Boolean(anime.episodeId && anime.episodeNumber)
                    ? `${anime.episodeId}/${anime.episodeNumber}`
                    : `${anime.id}-episode-1/1`
                }`}
                isVirtualized
                classNames={{ wrapper: "max-w-[900px]" }}
                textValue={anime.title}
                key={anime.id}
                description={
                  anime.releaseDate
                    ? anime.releaseDate
                    : "Released: Not Specified"
                }
                startContent={
                  <Image
                    src={anime.image}
                    alt={anime.title}
                    height={300}
                    width={100}
                    className="h-full aspect-2/3 bg-cover"
                    radius="sm"
                  />
                }
                shortcut={anime.subOrDub}
              >
                <span className="line-clamp-4 text-wrap max-w-32">
                  {anime.title}
                </span>
              </DropdownItem>
            ))}
          </DropdownSection>
          <DropdownSection hidden={data.length < 1 || !hasNextPage}>
            <DropdownItem
              as={NextLink}
              variant="shadow"
              href={`/search?query=${query}`}
              className="text-center"
            >
              View all results
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
