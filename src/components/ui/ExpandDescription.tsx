"use client";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Icons } from "./Icons";

type Props = React.HTMLProps<HTMLParagraphElement> & {
  maxChars?: number;
  description: string;
};

export default function ExpandDescription({
  description,
  maxChars = 100,
  ...props
}: Props) {
  const isTooShort = description.length <= maxChars;
  const [isExpanded, setIsExpanded] = useState(false);
  const shortDescription = `${description.slice(0, maxChars)}...`;

  return (
    <section className="flex indent-8 flex-col justify-center items-center gap-2">
      <p {...props}>
        {isTooShort || isExpanded ? description : shortDescription}
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
