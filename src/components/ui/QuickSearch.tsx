"use client";

import { searchAnime } from "@/actions/action";
import { Icons } from "@/components/ui/Icons";
import { AnimeInfo } from "@/lib/types";
import { useDebouncedCallback } from "@mantine/hooks";
import { Input } from "@nextui-org/input";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ScrollShadow,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AnimeCard from "../home/AnimeCard";

export default function QuickSearch() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<AnimeInfo[]>([]);
  const router = useRouter();

  const handleSearch = useDebouncedCallback(async (term: string) => {
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
                  autoFocus
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
                  <ul className="grid grid-cols-2  gap-2 gap-y-3">
                    {data.map((anime) => (
                      <li
                        onClick={() =>
                          router.push(
                            `/info/${anime.id}/watch/${
                              anime.episodeId
                                ? `${anime.episodeId}/${anime.episodeNumber}`
                                : `${anime.id}-episode-1/1`
                            }`
                          )
                        }
                        key={anime.id}
                      >
                        <AnimeCard {...anime} />
                      </li>
                    ))}
                  </ul>
                </ScrollShadow>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
