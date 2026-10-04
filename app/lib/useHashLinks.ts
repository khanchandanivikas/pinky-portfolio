import { useEffect } from "react";

/**
 * Handles same-page `#id` links in JS. A native hash jump fires popstate,
 * which Remix's ScrollRestoration treats as a back/forward navigation and
 * restores a stale position, so every click after the first goes nowhere.
 * Scrolling here keeps the CSS smooth behaviour and scroll-padding offset.
 */
export const useHashLinks = () => {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const id = link?.hash.slice(1);
      const target = id
        ? document.getElementById(decodeURIComponent(id))
        : null;
      if (!link || !target) return;

      event.preventDefault();
      target.scrollIntoView();

      if (!target.hasAttribute("tabindex"))
        target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });

      history.replaceState(history.state, "", link.hash);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
};
