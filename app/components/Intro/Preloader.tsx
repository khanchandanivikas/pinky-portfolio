import { clsx } from "clsx";
import { useEffect } from "react";
import {
  animate,
  motion,
  useAnimate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import deskImage from "./pinky-desk.gif";
import { DURATION, EASE_IN_OUT_QUART, INTRO } from "@/lib/motion";
import { useIntro } from "./IntroProvider";
import { OdometerCounter } from "./OdometerCounter";

const COUNT_STEPS = [0, 8, 17, 35, 52, 68, 84, 100];

/**
 * Timeline (motion allowed):
 *   0 to 2.0s     count 0 to 100 on an opaque screen            phase "loading"
 *   2.0s          background turns transparent, page animates in  phase "revealing"
 *   2.25 to 3.1s  desk + counter slide up and out (hero rises)
 *   3.1s          preloader unmounts                              phase "done"
 * Reduced motion: a short count, then a plain fade.
 */
export const Preloader = () => {
  const { phase, setPhase } = useIntro();
  const reduce = useReducedMotion();
  const count = useMotionValue(0);
  const [scope, animateScope] = useAnimate<HTMLDivElement>();
  const revealing = phase === "revealing";

  // Lock scrolling only while counting. Keyed on phase because the component
  // stays mounted (it renders null once done), so an unmount cleanup never runs.
  useEffect(() => {
    if (phase !== "loading") return;
    const { style } = document.documentElement;
    const previous = style.overflow;
    style.overflow = "hidden";
    return () => {
      style.overflow = previous;
    };
  }, [phase]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (reduce) {
        await animate(count, 100, {
          duration: INTRO.countReduced,
          ease: "linear",
        });
      } else {
        const hold = (INTRO.count * 1000) / (COUNT_STEPS.length - 1);
        for (const step of COUNT_STEPS.slice(1)) {
          await new Promise((resolve) => setTimeout(resolve, hold));
          if (cancelled) return;
          count.set(step);
        }
      }
      if (cancelled) return;
      setPhase("revealing");

      await animateScope(
        scope.current,
        reduce ? { opacity: 0 } : { y: "-100vh" },
        reduce
          ? { duration: DURATION.fast }
          : {
              delay: INTRO.slideDelay,
              duration: INTRO.slide,
              ease: EASE_IN_OUT_QUART,
            },
      );
      if (!cancelled) setPhase("done");
    };

    run();
    return () => {
      cancelled = true;
      count.stop();
    };
  }, [animateScope, count, reduce, scope, setPhase]);

  if (phase === "done") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx("fixed inset-0 z-50", revealing && "pointer-events-none")}
      style={{ mixBlendMode: revealing ? "multiply" : "normal" }}
    >
      <span className="sr-only">
        {revealing ? "Loading 100%" : "Loading portfolio"}
      </span>
      {!revealing && <div className="absolute inset-0 bg-bg" />}

      <motion.div
        ref={scope}
        aria-hidden="true"
        className="absolute inset-0 mix-blend-multiply"
      >
        <div className="absolute inset-0 grid place-items-center">
          <img
            src={deskImage}
            alt=""
            width={912}
            height={1136}
            className="w-42 brightness-110 contrast-110 mask-[radial-gradient(ellipse_70%_72%_at_50%_50%,#000_62%,transparent_100%)] md:w-56"
          />
        </div>
        <div className="absolute right-4 bottom-4 text-[clamp(96px,14vw,220px)] text-ink md:right-8 md:bottom-6">
          <OdometerCounter value={count} />
        </div>
      </motion.div>
    </div>
  );
};
