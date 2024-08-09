"use client";

import { Icons } from "@/components/ui/Icons";
import {
  ASFormatArray,
  ASGenresArray,
  ASSeasonArray,
  ASSortArray,
  ASStatusArray,
} from "@/lib/constants";
import { ASFormat, ASGenres, ASSeason, ASSort, ASStatus } from "@/lib/types";
import { toTitleCase } from "@/lib/utils";
import { useDebouncedCallback } from "@mantine/hooks";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const query = searchParams.get("query")?.toString();
  const year = searchParams.get("year")?.toString();
  const paramSeason = searchParams.get("season")?.toString();
  const paramFormat = searchParams.get("format")?.toString();
  const paramStatus = searchParams.get("status")?.toString();
  const paramGenres = searchParams.get("genres");
  const paramSort = searchParams.get("sort");

  const season: ASSeason | undefined = ASSeasonArray.includes(
    paramSeason as ASSeason
  )
    ? (paramSeason as ASSeason)
    : undefined;

  const format: ASFormat | undefined = ASFormatArray.includes(
    paramFormat as ASFormat
  )
    ? (paramFormat as ASFormat)
    : undefined;

  const status: ASStatus | undefined = ASStatusArray.includes(
    paramStatus as ASStatus
  )
    ? (paramStatus as ASStatus)
    : undefined;

  const genres: ASGenres | undefined = ASGenresArray.includes(
    paramGenres as ASGenres
  )
    ? (paramGenres as ASGenres)
    : undefined;

  const sort: ASSort | undefined = ASSortArray.includes(paramSort as ASSort)
    ? (paramSort as ASSort)
    : undefined;

  const handleSearch = useDebouncedCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  }, 1500);

  return (
    <>
      <Input
        isClearable
        type="text"
        variant="flat"
        color="primary"
        size="lg"
        fullWidth
        defaultValue={query}
        placeholder="Search anime..."
        classNames={{ input: "text-foreground" }}
        startContent={<Icons.search className="size-5" />}
        onClear={() => handleSearch("query", "")}
        onChange={(e) => {
          handleSearch("query", e.target.value);
        }}
      />

      <div className="flex  gap-2 flex-wrap">
        {/* year */}
        <Select
          label="Year"
          size="sm"
          defaultSelectedKeys={year ? [year] : undefined}
          onChange={(e) => {
            handleSearch("year", e.target.value);
          }}
          className="min-w-28 max-w-fit"
        >
          {Array.from({ length: 2024 - 1917 + 1 }, (_, i) => `${2024 - i}`).map(
            (item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            )
          )}
        </Select>

        {/* season */}
        <Select
          label="Season"
          size="sm"
          defaultSelectedKeys={season ? [season] : undefined}
          onChange={(e) => {
            handleSearch("season", e.target.value);
          }}
          className="min-w-28 max-w-fit"
        >
          {ASSeasonArray.map((item) => (
            <SelectItem key={item} value={item}>
              {toTitleCase(item.split("_").join(" "))}
            </SelectItem>
          ))}
        </Select>

        {/* format */}
        <Select
          label="Format"
          size="sm"
          defaultSelectedKeys={format ? [format] : undefined}
          onChange={(e) => {
            handleSearch("format", e.target.value);
          }}
          className="min-w-28 max-w-fit"
        >
          {ASFormatArray.map((item) => (
            <SelectItem key={item} value={item}>
              {toTitleCase(item.split("_").join(" "))}
            </SelectItem>
          ))}
        </Select>

        {/* status */}
        <Select
          label="Status"
          size="sm"
          defaultSelectedKeys={status ? [status] : undefined}
          onChange={(e) => {
            handleSearch("status", e.target.value);
          }}
          className="min-w-28 max-w-fit"
        >
          {ASStatusArray.map((item) => (
            <SelectItem key={item} value={item}>
              {toTitleCase(item.split("_").join(" "))}
            </SelectItem>
          ))}
        </Select>

        {/* genres */}
        <Select
          label="Genres"
          size="sm"
          className="min-w-36 max-w-fit"
          defaultSelectedKeys={genres ? [genres] : undefined}
          onChange={(e) => {
            handleSearch("genres", e.target.value);
          }}
        >
          {ASGenresArray.map((item) => (
            <SelectItem key={item} value={item}>
              {toTitleCase(item.split("_").join(" "))}
            </SelectItem>
          ))}
        </Select>

        {/* sort */}
        <Select
          label="Sort"
          size="sm"
          className="min-w-44 max-w-fit"
          defaultSelectedKeys={sort ? [sort] : undefined}
          onChange={(e) => {
            handleSearch("sort", e.target.value);
          }}
        >
          {ASSortArray.map((item) => (
            <SelectItem key={item} value={item}>
              {toTitleCase(item.split("_").join(" "))}
            </SelectItem>
          ))}
        </Select>
      </div>
    </>
  );
}
