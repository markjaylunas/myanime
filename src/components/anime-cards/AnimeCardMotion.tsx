"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  index: number;
  isStaggered?: boolean;
};

export default function AnimeCardMotion({
  children,
  index,
  isStaggered = false,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0.5, scale: 0.9 }}
      viewport={{ once: true }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        delay: isStaggered ? (index > 5 ? 0.5 : 0.1 * index) : 0.2,
      }}
    >
      {children}
    </motion.div>
  );
}
