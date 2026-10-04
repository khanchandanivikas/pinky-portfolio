# Pinky Lalwani portfolio

One-page portfolio built with Remix (Vite), React 18, Tailwind CSS v4 and Framer Motion.

## Development

```sh
npm install
npm run dev
```

Open http://localhost:5173.

## Checks

```sh
npm run typecheck
npm run lint
npm run build
npm run format:check
```

## Contact form

The form posts to the index route action, which sends mail through [Resend](https://resend.com). Copy `.env.example` to `.env` and fill in:

- `RESEND_API_KEY`: API key from the Resend dashboard.
- `CONTACT_FROM_EMAIL`: sender, for example `Portfolio <hello@your-domain.com>`. The domain must be verified in Resend. Without it the default `onboarding@resend.dev` sender is used, which only delivers to the Resend account owner's address.

Without the key and recipient the form shows a friendly error with the email address instead.

## Structure

- `app/routes/_index.tsx`: page composition, meta and contact action.
- `app/components`: `Intro` (preloader and intro phase context), `Header`, `Hero`, `Skills`, `Projects`, `Contact`, `Form`, `Footer`, `ui`.
- `app/data`: site links, skills and projects content.
- `app/lib`: motion constants, shared contact validation, Resend email sender.
- `DESIGN_SYSTEM.md`: tokens and conventions.
