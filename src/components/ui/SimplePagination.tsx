"use client";

import { Button, ButtonGroup } from "@nextui-org/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  prevDisabled: boolean;
  nextDisabled: boolean;
};

export default function SimplePagination({
  prevDisabled,
  nextDisabled,
}: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const pageQuery = searchParams.get("page")?.toString();
  const defaultPage = parseInt(`${pageQuery}`) || 1;

  const handleNextClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", (defaultPage + 1).toString());
    replace(`${pathname}?${params.toString()}`);
  };
  const handlePrevClick = () => {
    const params = new URLSearchParams(searchParams);
    if (defaultPage !== 1) params.set("page", (defaultPage - 1).toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <ButtonGroup size="lg" fullWidth color="primary" variant="flat">
      <Button disabled={prevDisabled} onClick={handlePrevClick}>
        Prev
      </Button>
      <Button disabled={nextDisabled} onClick={handleNextClick}>
        Next
      </Button>
    </ButtonGroup>
  );
}
