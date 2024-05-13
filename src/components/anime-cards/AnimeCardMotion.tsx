"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  index: number;
  isStaggered?: boolean;
};

export default function AnimeCardMotion({ children, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0.6, scale: 0.99, y: 10 }}
      viewport={{ once: true }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        delay: 0.2,
      }}
    >
      {children}
    </motion.div>
  );
}
