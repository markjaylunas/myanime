"use client";

import { searchAnime } from "@/actions/meta";
import { Icons } from "@/components/ui/Icons";
import { AnimeSearchSchema } from "@/lib/meta-validations";
import { pickTitle } from "@/lib/utils";
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
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function QuickSearch() {
  const pathname = usePathname();
  const server = pathname.startsWith("/s2") ? "s2" : "s1";
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<AnimeSearchSchema[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const handleSearch = useDebouncedCallback(async (term: string) => {
    const res = await searchAnime({ query: term });
    setData(res?.results || []);
    setHasNextPage(res?.hasNextPage || false);
  }, 500);

  return (
    <>
      <Dropdown type="menu" placement="bottom">
        <DropdownTrigger>
          <Button
            aria-label="Search anime"
            radius="full"
            className="bg-gradient-to-tr from-rose-500 to-primary text-white shadow-lg"
            startContent={<Icons.search />}
            variant="shadow"
            isIconOnly
          ></Button>
        </DropdownTrigger>
        <DropdownMenu classNames={{ base: "w-full" }} aria-label="Search anime">
          <DropdownSection>
            <DropdownItem textValue="Search" isReadOnly>
              <Input
                variant="underlined"
                placeholder="Type to search anime..."
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
                href={`/${server}/info/${anime.id}`}
                isVirtualized
                classNames={{ wrapper: "max-w-[900px]" }}
                textValue={pickTitle(anime.title) || anime.id}
                key={anime.id}
                description={
                  anime.releaseDate
                    ? anime.releaseDate
                    : "Released: Not Specified"
                }
                startContent={
                  <Image
                    src={anime.image}
                    alt={pickTitle(anime.title)}
                    height={300}
                    width={100}
                    className="h-full aspect-2/3 bg-cover"
                    radius="sm"
                  />
                }
                shortcut={anime.totalEpisodes ? anime.totalEpisodes : "N/A"}
              >
                <span className="line-clamp-4 text-wrap max-w-32">
                  {pickTitle(anime.title)}
                </span>
              </DropdownItem>
            ))}
          </DropdownSection>
          <DropdownSection hidden={data.length < 1 || !hasNextPage}>
            <DropdownItem
              as={NextLink}
              variant="shadow"
              href={`/${server}/advanced-search?query=${query}`}
              className="text-center"
            >
              Show All results
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
