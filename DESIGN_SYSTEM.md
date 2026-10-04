# Design system

Tokens live in `app/tailwind.css` (`@theme`). Motion constants live in `app/lib/motion.ts`. Light theme only.

## Color

| Token | Value | Use |
| --- | --- | --- |
| `bg` | `#f3f3f1` | Page background |
| `panel` | `#fafaf8` | Cards, menus, success panel |
| `surface` | `#ffffff` | Form inputs |
| `ink` | `#121212` | Text, primary buttons |
| `muted` | `#5f5f5a` | Secondary text (about 5.8:1 on `bg`) |
| `line` | `#dcdcd6` | Hairline borders |
| `accent` | `#1f2a5c` | Focus rings, link hover, selection, field focus. Use sparingly |
| `danger` | `#a3262a` | Form errors only |
| `online` | `#22c55e` | Availability dot on the header "Work with me" button only |

## Type

- Geist Variable for everything; Geist Mono only for tiny meta (tech tags, project counter).
- Display (`type-display`): weight 800, uppercase, tight tracking, `leading-[0.9]`.
- Counter numerals: weight 200, `tabular-nums`.
- Nav and meta (`meta-label`): 12px, uppercase, wide tracking, weight 500.
- Body: 16px, `leading-relaxed`, max about 65ch.

## Shape

- Interactive elements (buttons, chips, inputs): `rounded-pill`. Textarea: `rounded-field` (20px).
- Cards and panels: `rounded-card` (24px). Screenshots inside cards: `rounded-media` (16px).
- Card shadow: `shadow-card` (soft, navy tinted).

## Components

- `.btn` + `.btn-primary` (black pill) or `.btn-outline`. Hover lifts 1px, active scales to 0.98.
- `.chip` for skill pills, `.text-link` for inline links, `.field` for inputs.
- `container-page`: max width 90rem, centered. Pair it with `section-padding-x` for the gutter (16px on mobile, 32px from `md`, `--section-padding-x`).
- `section-gap`: vertical margin on every section after the hero (96px on mobile, 144px from `md`, `--section-gap`). Margins collapse, so neighbouring sections sit exactly one gap apart. Don't add `py-*` to sections for spacing.
- Icons: Phosphor, regular weight, `ICON_SIZE` (20px) from `components/ui/icons.tsx`, always `aria-hidden` with a labelled parent.
- Minimum touch target 44px (`min-h-11` / `size-11`).

## Layering

`z-40` header, `z-50` preloader and skip link. Content stays at `z-10` or below.

## Motion

- Eases: `EASE_OUT_EXPO` (entrances, reveals), `EASE_IN_OUT_QUART` (preloader slide-out, hero rise). CSS mirrors: `ease-out-expo`, `ease-in-out-quart`.
- Animate only `transform` and `opacity`. Scroll effects use `useScroll`/`whileInView`, never scroll listeners.
- Every animated component checks `useReducedMotion()`: reduced means opacity only or instant, a shorter preloader, and a vertical project list instead of the sticky stack.
- Section headings reveal once: fade plus 24px rise (`SectionHeading`).

## Images

The character renders sit on white. Render them with `mix-blend-multiply` on the outermost transformed wrapper (blending does not cross stacking contexts), inside a parent that paints `bg`. The desk image also uses a radial `mask-image` and a slight brightness/contrast lift so its grey backdrop disappears.

## Copy

No em or en dashes, no emoji, no scroll cues, no section numbers, no decorative dots, at most one eyebrow label on the page.
