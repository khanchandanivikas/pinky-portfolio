import type { Variants } from "framer-motion";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT_QUART = [0.76, 0, 0.24, 1] as const;

export const DURATION = {
  fast: 0.3,
  base: 0.8,
} as const;

export const INTRO = {
  count: 2,
  countReduced: 0.6,
  slideDelay: 0.25,
  slide: 0.85,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
  },
};

export const VIEWPORT_ONCE = {
  once: true,
  margin: "0px 0px -10% 0px",
} as const;
