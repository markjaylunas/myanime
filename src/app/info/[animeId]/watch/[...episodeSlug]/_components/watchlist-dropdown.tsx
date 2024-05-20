"use client";

import { upsertWatchStatus } from "@/actions/action";
import { Icons } from "@/components/ui/Icons";
import { AnimeInsert, AnimeUserStatus, WatchStatus } from "@/db/schema";
import { DEFAULT_SIGNIN_PATH } from "@/lib/routes";
import { cn } from "@/lib/utils";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

type Status = WatchStatus | "null";

type Props = {
  animeWatchStatus: AnimeUserStatus | null;
  anime: AnimeInsert;
};

export default function WatchListDropdown({ animeWatchStatus, anime }: Props) {
  const session = useSession();
  const userId = session?.data?.user?.id;
  const params = useParams<{ animeId: string }>();
  const animeId = params.animeId;
  const router = useRouter();

  const [userWatchStatus, setUserWatchStatus] =
    useState<AnimeUserStatus | null>(animeWatchStatus);
  const [isLoading, setIsLoading] = useState(false);

  const labelsMap: Record<Status, string> = {
    null: "Add to Watchlist",
    WATCHING: "Watching",
    COMPLETED: "Completed",
    ON_HOLD: "On-Hold",
    DROPPED: "Dropped",
    PLAN_TO_WATCH: "Plan to Watch",
  };

  const selectedOptionValue: WatchStatus = Array.from(
    userWatchStatus?.status ? [userWatchStatus?.status] : ["null"]
  )[0] as WatchStatus;

  const isNull = labelsMap[selectedOptionValue] === labelsMap["null"];
  const glow =
    "bg-gradient-to-tr from-rose-500 to-primary-500 border-small border-white/50 shadow-primary-500/30 text-white";

  const handleSubmit = async (selected: Set<string>) => {
    if (!animeId) return;
    if (!userId) {
      router.push(DEFAULT_SIGNIN_PATH);
      return;
    }
    setIsLoading(true);
    const status = selected.values().next().value as WatchStatus;
    const upsertData = await upsertWatchStatus({
      animeInsert: anime,
      data: {
        id: animeWatchStatus?.id || undefined,
        status,
        animeId,
        userId,
      },
    });
    setUserWatchStatus(upsertData[0]);
    setIsLoading(false);
  };

  return (
    <ButtonGroup variant="shadow">
      <Button
        color={isNull ? "primary" : "default"}
        disabled={!isNull}
        isLoading={isLoading}
        onPress={() => {
          const value = new Set(["WATCHING"]);
          isNull ? handleSubmit(value) : null;
        }}
        className={cn(isNull && glow)}
      >
        {labelsMap[selectedOptionValue]}
      </Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger disabled={isNull}>
          <Button
            color={isNull ? "default" : "primary"}
            isDisabled={isNull || isLoading}
            isIconOnly
            className={cn(!isNull && glow)}
          >
            <Icons.chevronRight />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Watch list options"
          selectedKeys={selectedOptionValue}
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
                {labelsMap[key as WatchStatus]}
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}
