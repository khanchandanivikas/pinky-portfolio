import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import waveImage from "./pinky-wave.png";
import { useIntroReady } from "@/components/Intro/IntroProvider";
import {
  DURATION,
  EASE_IN_OUT_QUART,
  EASE_OUT_EXPO,
  INTRO,
} from "@/lib/motion";

const NAME_LINES = ["Pinky", "Lalwani"];
const ROLE = "Full-stack developer and designer";
const DESCRIPTION =
  "I design and build fast websites, web apps and headless Shopify stores, from Figma to production. Open to freelance projects.";

export const Hero = () => {
  const ready = useIntroReady();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const parallax = !reduce;

  const enter = (delay = 0) => ({
    duration: DURATION.base,
    ease: EASE_OUT_EXPO,
    delay,
  });

  return (
    <section
      id="home"
      ref={ref}
      aria-label="Introduction"
      className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-bg pt-header pb-10 md:block md:pb-0"
    >
      <motion.div
        style={parallax ? { y: imageY } : undefined}
        className="relative flex h-[55dvh] justify-center overflow-hidden mix-blend-multiply md:absolute md:overflow-visible md:inset-x-0 md:bottom-0 md:h-[68dvh] xl:h-[80dvh]"
      >
        <motion.img
          src={waveImage}
          alt="3D illustrated portrait of Pinky in a hat and glasses, waving and holding a coffee cup"
          width={1024}
          height={1008}
          loading="eager"
          decoding="async"
          initial={reduce ? { opacity: 0 } : { y: "100%" }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={
            reduce
              ? { duration: DURATION.fast }
              : {
                  delay: INTRO.slideDelay,
                  duration: INTRO.slide,
                  ease: EASE_IN_OUT_QUART,
                }
          }
          className="h-full w-auto max-w-full object-contain object-bottom brightness-[1.02]"
        />
      </motion.div>

      <div className="container-page section-padding-x relative z-10 mt-8 flex flex-col gap-8 md:static md:mt-0"
      >
        <div className="flex flex-col gap-4 md:absolute md:bottom-10 md:left-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : undefined}
            transition={enter(0.2)}
            className="meta-label text-muted"
          >
            {ROLE}
          </motion.p>
          <h1 className="type-display text-[clamp(2.75rem,5vw,6.5rem)]">
            {NAME_LINES.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.04em]">
                <motion.span
                  className="block"
                  initial={reduce ? { opacity: 0 } : { y: "110%" }}
                  animate={ready ? { opacity: 1, y: 0 } : undefined}
                  transition={enter(index * 0.08)}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={enter(0.15)}
          className="max-w-70 md:absolute md:right-8 md:bottom-12"
        >
          <p className="leading-relaxed text-muted">{DESCRIPTION}</p>
        </motion.div>
      </div>
    </section>
  );
};
