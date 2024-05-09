"use client";

import { Icons } from "@/components/ui/Icons";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useEffect } from "react";

export default async function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto flex max-w-lg flex-col items-center justify-center gap-6 p-8">
      <h2 className="mt-10 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        Oops, something went wrong!
      </h2>
      <p>
        We&apos;re sorry for the inconvenience. Please try again, or if the
        problem persists, contact our support team.
      </p>

      <div className="flex justify-center gap-4 ">
        <Button as={Link} href="/" className="flex gap-1">
          <Icons.home /> Get to home page
        </Button>
        <Button variant="solid" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
}
