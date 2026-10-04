import { clsx } from "clsx";
import { motion } from "framer-motion";
import { VIEWPORT_ONCE, fadeUp } from "@/lib/motion";

type SectionHeadingProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
};

export const SectionHeading = ({
  id,
  children,
  className,
}: SectionHeadingProps) => {
  return (
    <motion.h2
      id={id}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className={clsx("type-display text-[clamp(2.5rem,6vw,5rem)]", className)}
    >
      {children}
    </motion.h2>
  );
};
