import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { NAV_LINKS } from "@/data/site";
import { ICON_SIZE } from "@/lib/consts";
import { DURATION, EASE_IN_OUT_QUART, EASE_OUT_EXPO } from "@/lib/motion";

const PANEL_ID = "mobile-menu";

const DRAWER_DURATION = 0.7;

const drawerMotion: Variants = {
  closed: {
    x: "-100%",
    transition: {
      duration: DRAWER_DURATION * 0.75,
      ease: EASE_IN_OUT_QUART,
      delay: 0.15,
    },
  },
  open: {
    x: 0,
    transition: { duration: DRAWER_DURATION, ease: EASE_IN_OUT_QUART },
  },
};

const listMotion: Variants = {
  closed: {},
  open: {
    transition: {
      delayChildren: DRAWER_DURATION * 0.6,
      staggerChildren: 0.07,
    },
  },
};

const linkMotion: Variants = {
  closed: {
    y: "110%",
    transition: { duration: DURATION.fast, ease: EASE_IN_OUT_QUART },
  },
  open: {
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
  },
};

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const { style } = document.documentElement;
    const previous = style.overflow;
    style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="relative z-10 -ml-2 grid size-11 place-items-center rounded-pill"
      >
        {open ? (
          <XIcon size={ICON_SIZE} aria-hidden="true" />
        ) : (
          <ListIcon size={ICON_SIZE} aria-hidden="true" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={PANEL_ID}
            initial="closed"
            animate="open"
            exit="closed"
            variants={drawerMotion}
            className="fixed inset-0 h-dvh overflow-hidden bg-surface"
          >
            <nav
              aria-label="Mobile"
              className="section-padding-x flex h-full flex-col justify-center pt-header"
            >
              <motion.ul variants={listMotion} className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href} className="overflow-hidden">
                    <motion.a
                      href={link.href}
                      onClick={close}
                      variants={linkMotion}
                      className="block py-1 text-5xl font-semibold tracking-tight transition-colors duration-200 hover:text-accent"
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </motion.ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
