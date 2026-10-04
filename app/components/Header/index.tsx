import { clsx } from "clsx";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { BOOK_CALL_HREF, NAV_LINKS } from "@/data/site";
import { useIntroReady } from "@/components/Intro/IntroProvider";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";
import { MobileMenu } from "./MobileMenu";
import { Link } from "@remix-run/react";

const SCROLLED_OFFSET = 16;

export const Header = () => {
  const ready = useIntroReady();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) =>
    setScrolled(y > SCROLLED_OFFSET),
  );

  return (
    <>
      <a
        href="#main-content"
        className="btn btn-primary fixed top-3 left-3 z-50 -translate-y-24 focus:translate-y-0"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: DURATION.base, ease: EASE_OUT_EXPO }}
        className="fixed inset-x-0 top-0 z-40"
      >
        <div
          aria-hidden="true"
          className={clsx(
            "absolute inset-0 border-b border-line bg-bg/80 backdrop-blur-md transition-opacity duration-300",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        />
        <div className="container-page section-padding-x relative flex h-header items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
          <MobileMenu />
          <nav aria-label="Primary" className="hidden md:col-start-2 md:block">
            <ul className="meta-label flex items-center">
              {NAV_LINKS.map((link, index) => (
                <li key={link.href} className="flex items-center">
                  {index > 0 && (
                    <span aria-hidden="true" className="px-1 text-muted">
                      /
                    </span>
                  )}
                  <Link
                    to={link.href}
                    className="inline-flex min-h-11 items-center px-2 transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            to={BOOK_CALL_HREF}
            className="btn btn-primary relative z-10 md:col-start-3 md:justify-self-end"
          >
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-pill bg-online opacity-75 motion-reduce:animate-none" />
              <span className="relative size-2 rounded-pill bg-online" />
            </span>
            Work with me
          </Link>
        </div>
      </motion.header>
    </>
  );
};
