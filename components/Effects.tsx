"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeInUp, staggerContainer, cardHover } from "@/lib/animations";

export function FadeIn({ children }: { children: ReactNode }) {
  return (
    <motion.div
  variants={fadeInUp}
  initial="hidden"
  animate="show"
>
      {children}
    </motion.div>
  );
}

export function FadeInStagger({ children }: { children: ReactNode }) {
  return (
    <motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="show"
>
      {children}
    </motion.div>
  );
}

export function CardHover({ children }: { children: ReactNode }) {
  return (
    <motion.div variants={cardHover} initial="rest" whileHover="hover" animate="rest">
      {children}
    </motion.div>
  );
}
