"use client";

import { Icons } from "@/components/ui/Icons";
import { useDebouncedCallback } from "@mantine/hooks";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const defaultQuery = searchParams.get("query")?.toString();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <Input
      isClearable
      type="text"
      variant="flat"
      color="primary"
      size="lg"
      classNames={{ input: "text-foreground" }}
      placeholder="Search anime..."
      defaultValue={defaultQuery}
      startContent={<SearchButton />}
      fullWidth
      onClear={() => handleSearch("")}
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
    />
  );
}

function SearchButton() {
  return (
    <Button variant="light" type="submit" size="sm" isIconOnly>
      <Icons.search className="size-5" />
    </Button>
  );
}
