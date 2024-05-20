"use client";

import { FetchAllWatchStatusReturnType } from "@/actions/action";
import { Icons } from "@/components/ui/Icons";
import { WatchStatus } from "@/db/schema";
import { toTitleCase } from "@/lib/utils";
import { useDebouncedCallback } from "@mantine/hooks";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Input } from "@nextui-org/input";
import { Pagination } from "@nextui-org/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { User } from "@nextui-org/user";
import moment from "moment";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useCallback, useState } from "react";

type ColumnKey =
  | "animeId"
  | "animeTitle"
  | "animeImage"
  | "status"
  | "isLiked"
  | "score"
  | "updatedAt"
  | "actions";

const columns = [
  { name: "Anime ID", uid: "animeId" },
  { name: "Image", uid: "animeImage" },
  { name: "Title", uid: "animeTitle", sortable: true },
  { name: "Status", uid: "status", sortable: true },
  { name: "Is Liked", uid: "isLiked" },
  { name: "Score", uid: "score", sortable: true },
  { name: "Updated At", uid: "updatedAt", sortable: true },
  { name: "Actions", uid: "actions" },
];

const statusOptions = [
  { name: "Watching", uid: "watching" },
  { name: "Completed", uid: "completed" },
  { name: "On Hold", uid: "on-hold" },
  { name: "Dropped", uid: "dropped" },
  { name: "Plan to Watch", uid: "plan-to-watch" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "animeImage",
  "animeTitle",
  "status",
  "actions",
];
type Anime = {
  id: string;
  animeId: string;
  animeTitle: string;
  animeImage: string;
  status: WatchStatus;
  isLiked: boolean;
  score: number;
  updatedAt: Date;
  actions?: null;
};

type Descriptor = {
  column: ColumnKey;
  direction: "ascending" | "descending";
};

const getStatusColor = (
  status: WatchStatus
):
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | undefined => {
  switch (status) {
    case "WATCHING":
      return "primary";
    case "COMPLETED":
      return "success";
    case "DROPPED":
      return "default";
    case "ON_HOLD":
      return "secondary";
    case "PLAN_TO_WATCH":
      return "warning";
    default:
      return "danger";
  }
};

export default function WatchListTable({
  watchListData,
  filters: { query, status, page, limit },
}: {
  watchListData: {
    watchList: Anime[];
    totalCount: number;
  };
  filters: {
    query: string;
    status: string[];
    page: number;
    limit: number;
  };
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { watchList, totalCount } = watchListData;

  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState<Set<string>>(
    new Set(status)
  );
  const [sortDescriptor, setSortDescriptor] = useState<Descriptor>({
    column: "updatedAt",
    direction: "ascending",
  });

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns.values().next().value === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const pages = Math.ceil(totalCount / limit);

  const renderCell = useCallback(
    ({
      anime,
      columnKey,
    }: {
      anime: FetchAllWatchStatusReturnType["watchList"][0];
      columnKey: ColumnKey | "actions";
    }) => {
      switch (columnKey) {
        case "animeImage":
          return (
            <User
              avatarProps={{ radius: "lg", src: anime.animeImage }}
              name={anime.animeTitle}
              classNames={{ name: "sr-only" }}
            >
              {anime.animeTitle}
            </User>
          );
        case "animeTitle":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize text-wrap">
                {anime.animeTitle}
              </p>

              <p className="text-bold text-small capitalize">
                {anime.isLiked ? "Liked" : ""}
              </p>

              <p className="text-bold text-small capitalize">
                {anime.score ? "Favorite" : ""}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={getStatusColor(anime.status)}
              size="sm"
              variant="flat"
            >
              {toTitleCase(anime.status.split("_").join(" "))}
            </Chip>
          );

        case "animeId":
          return (
            <p className="text-bold text-small text-wrap">{anime.animeId}</p>
          );

        case "score":
          return anime.score ? (
            <div className="flex gap-1">
              <Icons.startFill className="text-primary-500" />
              <p>{anime.score}</p>
            </div>
          ) : (
            <Icons.star className="text-primary-500" />
          );

        case "isLiked":
          return anime.isLiked ? (
            <Icons.heartFill className="text-rose-500" />
          ) : (
            <Icons.heart className="text-rose-500" />
          );

        case "updatedAt":
          return (
            <p className="text-bold text-small text-wrap">
              {moment(anime.updatedAt).format("DD/MM/YYYY HH:mm")}
            </p>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <Icons.verticalDots className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    onPress={() => router.push(`/info/${anime.animeId}`)}
                  >
                    View
                  </DropdownItem>
                  <DropdownItem>Edit</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return null;
      }
    },
    []
  );

  const onSortChange = (descriptor: Descriptor) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", descriptor.column);
    params.set("direction", descriptor.direction);
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const onNextPage = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", (page + 1).toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  const onPreviousPage = () => {
    const params = new URLSearchParams(searchParams);
    if (page !== 1) params.set("page", (page - 1).toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  const onlimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", e.target.value);
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const onSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
      params.set("page", "1");
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const onClear = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const onStatusChange = () => {
    const params = new URLSearchParams(searchParams);
    const statusList = Array.from(statusFilter);
    params.delete("status");
    statusList.forEach((status) => params.append("status", status));
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  }, 700);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by title..."
            startContent={<Icons.search />}
            defaultValue={query}
            onClear={onClear}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
          <div className="flex gap-3">
            <Dropdown onClose={onStatusChange}>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<Icons.chevronDown className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                defaultSelectedKeys={["all"]}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={(value) => {
                  if (value instanceof Set) {
                    setStatusFilter(value as Set<string>);
                  }
                }}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<Icons.chevronDown className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={(value) => {
                  if (value instanceof Set) {
                    setVisibleColumns(value as Set<string>);
                  }
                }}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {totalCount} anime
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              defaultValue={limit}
              onChange={onlimitChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onlimitChange,
    watchList.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={onPageChange}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [watchList.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={(value) => {
        if (typeof value === "object") {
          setSortDescriptor(value as Descriptor);
          onSortChange(value as Descriptor);
        }
      }}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No anime found"} items={watchList}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {renderCell({ anime: item, columnKey: columnKey as ColumnKey })}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
