"use client";

import { upsertWatchStatus } from "@/actions/action";
import { Icons } from "@/components/ui/Icons";
import { AnimeInsert, AnimeUserStatus } from "@/db/schema";
import { DEFAULT_SIGNIN_PATH } from "@/lib/routes";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";

import { Button } from "@nextui-org/button";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

type Status = number;

type Props = {
  animeWatchStatus: AnimeUserStatus | null;
  anime: AnimeInsert;
};

export default function ScoreDropdown({ animeWatchStatus, anime }: Props) {
  const session = useSession();
  const userId = session?.data?.user?.id;
  const params = useParams<{ animeId: string }>();
  const animeId = params.animeId;
  const router = useRouter();

  const [userWatchStatus, setUserWatchStatus] =
    useState<AnimeUserStatus | null>(animeWatchStatus);
  const [isLoading, setIsLoading] = useState(false);

  const labelsMap: Record<string, string> = {
    "0": "0 - Not Rated",
    "1": "1 - Appalling",
    "2": "2 - Horrible",
    "3": "3 - Very Bad",
    "4": "4 - Bad",
    "5": "5 - Average",
    "6": "6 - Fine",
    "7": "7 - Good",
    "8": "8 - Very Good",
    "9": "9 - Great",
    "10": "10 - Masterpiece",
  };

  const selectedOptionValue: number = Array.from(
    userWatchStatus?.score ? [userWatchStatus?.score] : [0]
  )[0] as number;

  const handleSubmit = async (selected: Set<string>) => {
    if (!animeId) return;
    if (!userId) {
      router.push(DEFAULT_SIGNIN_PATH);
      return;
    }
    setIsLoading(true);
    const score = selected.values().next().value as number;
    const upsertData = await upsertWatchStatus({
      animeInsert: anime,
      data: {
        id: userWatchStatus?.id || undefined,
        score,
        animeId,
        userId,
      },
    });
    setUserWatchStatus(upsertData[0]);
    setIsLoading(false);
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          isDisabled={isLoading}
          isIconOnly={selectedOptionValue <= 0}
          className="px-1 bg-gradient-to-tr from-rose-500 to-primary-500 border-small border-white/50 shadow-primary-500/30 text-white"
        >
          {selectedOptionValue >= 1 ? <Icons.startFill /> : <Icons.star />}
          <span className="ml-1">
            {selectedOptionValue > 0 ? selectedOptionValue : ""}
          </span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Watch list options"
        selectedKeys={selectedOptionValue.toString()}
        selectionMode="single"
        onSelectionChange={(selected) => {
          if (selected instanceof Set) {
            handleSubmit(selected as Set<string>);
          }
        }}
        className="max-w-[300px]"
      >
        {Object.keys(labelsMap)
          .slice(1)
          .map((key) => (
            <DropdownItem key={key} color="secondary">
              {labelsMap[key as string]}
            </DropdownItem>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
}
