"use client";

import { searchAnime } from "@/actions/action";
import { Icons } from "@/components/ui/Icons";
import { AnimeInfo } from "@/lib/types";
import { useDebouncedCallback } from "@mantine/hooks";
import { Input } from "@nextui-org/input";
import {
  Button,
  Chip,
  Image,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ScrollShadow,
  useDisclosure,
} from "@nextui-org/react";
import NextLink from "next/link";
import { useState } from "react";

export default function QuickSearch() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<AnimeInfo[]>([]);

  const handleSearch = useDebouncedCallback(async (term: string) => {
    console.log("fetch");
    const res = await searchAnime({ query: term });
    setData(res?.results || []);
  }, 300);

  return (
    <>
      <Button
        fullWidth
        variant="flat"
        color="primary"
        startContent={<Icons.search />}
        onPress={onOpen}
      >
        Quick Search...
      </Button>
      <Modal isOpen={isOpen} placement="top" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Input
                  type="text"
                  variant="underlined"
                  size="lg"
                  placeholder="Search anime..."
                  startContent={<Icons.search className="size-4" />}
                  fullWidth
                  value={query}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setQuery(newValue);
                    handleSearch(newValue);
                  }}
                />
              </ModalHeader>
              <ModalBody>
                <ScrollShadow hideScrollBar className="h-[500px]">
                  <Listbox>
                    {data ? (
                      data.map((anime) => (
                        <ListboxItem
                          key={anime.id}
                          as={NextLink}
                          href={`/info/${anime.id}`}
                          startContent={
                            <div className="max-h-[200px]">
                              <Image
                                alt={anime.image}
                                height={150}
                                src={anime.image}
                                className="w-full h-[150px] object-cover"
                              />
                            </div>
                          }
                        >
                          <p className="text-xl line-clamp-3 text-wrap">
                            {anime.title}
                          </p>
                          <p className="text-secondary-700">
                            {anime.releaseDate}
                          </p>
                          <Chip
                            variant="solid"
                            className="mt-2"
                            color={
                              anime.subOrDub === "dub" ? "secondary" : "primary"
                            }
                          >
                            {anime.subOrDub}
                          </Chip>
                        </ListboxItem>
                      ))
                    ) : (
                      <p>No results found</p>
                    )}
                  </Listbox>
                </ScrollShadow>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
