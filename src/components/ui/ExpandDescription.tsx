"use client";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import HTMLParse from "html-react-parser";
import React, { useState } from "react";
import { Icons } from "./Icons";

type Props = React.HTMLProps<HTMLParagraphElement> & {
  maxChars?: number;
  description: string;
  isHTML?: boolean;
};

export default function ExpandDescription({
  description,
  maxChars = 100,
  className,
  isHTML = false,
  ...props
}: Props) {
  const isTooShort = description.length <= maxChars || description.length < 50;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="flex indent-8 flex-col justify-center items-center gap-2,">
      <p
        className={cn(
          "text-foreground-500 text-justify",
          !isTooShort && !isExpanded ? "line-clamp-3" : "",
          className
        )}
        {...props}
      >
        {isHTML ? HTMLParse(description) : description}
      </p>
      {!isTooShort && (
        <Button
          radius="full"
          isIconOnly
          variant="flat"
          size="sm"
          color="primary"
          className="mt-4 rounded-xl"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <motion.div
            animate={{ rotateX: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Icons.chevronDown />
          </motion.div>
        </Button>
      )}
    </section>
  );
}
