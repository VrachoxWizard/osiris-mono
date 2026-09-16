# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

OSIRIS — a bilingual (Croatian/English) marketing site for a Zagreb-based digital studio, built on Next.js App Router. The codebase originated from a commercial template called "MONO"; the README.md still describes that original template (Next 15, framer-motion, next-themes, `Features`/`Pricing`/`Testimonials` sections, `site.config.ts`) and is **stale** — none of that reflects the current app. Trust this file and the code over README.md.

## Commands

```bash
npm run dev      # start dev server (Turbopack)
npm run build    # production build
npm run start    # run a production build
npm run lint     # eslint .
```

There is no test suite configured in this repo.

## Version pins — do not casually bump

Two dependencies are intentionally held back from `latest` because the surrounding tooling doesn't support the newest majors yet. Re-check upstream compatibility before touching either:

- **`typescript@^6.0.3`** — 7.0.x is the new native/Go compiler and `typescript-eslint` doesn't support it yet (`typescript-eslint does not support TS 7.0`). `next build`'s own type-checking works fine on 7.x; this pin exists purely for ESLint.
- **`eslint@^9.39.5`** — 10.x breaks `eslint-plugin-react` (peer dep caps at `^9.7`; hits `context.getFilename is not a function`, an API removed in ESLint 10) and trips a circular-JSON bug in `@eslint/eslintrc`'s `FlatCompat` bridge.

`eslint.config.mjs` imports `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript` **directly** as flat-config arrays rather than going through `FlatCompat` — those exports are already flat-config-shaped, and routing through `FlatCompat` is what triggers the circular-JSON bug above. Also note: `next lint` no longer exists as of Next.js 16 (removed from the CLI entirely); the `lint` script calls `eslint .` directly.

## Bilingual routing architecture

This is the piece that requires reading multiple files to understand. i18n is handled by `next-intl`, configured across:

- **`src/i18n/routing.ts`** — `defineRouting`: locales `["hr", "en"]`, `defaultLocale: "hr"`, `localePrefix: "as-needed"` (Croatian is served unprefixed at `/`, English lives under `/en`), `localeDetection: false` (next-intl's implicit default is `true`, which silently `Accept-Language`-redirects English-preferring browsers to `/en` on first visit — disabled so `hr` is the *actual* default, not just the URL-prefix default), plus a `pathnames` map that translates URLs per locale, e.g. the internal route `/work` resolves to `/radovi` in Croatian and `/en/work` in English. Adding a new top-level route means adding an entry here.
- **`src/i18n/request.ts`** — loads `messages/<locale>.json` for the active locale.
- **`src/i18n/navigation.ts`** — exports locale-aware `Link`, `redirect`, `usePathname`, `useRouter`, `getPathname` via `createNavigation(routing)`. **Always import `Link`/navigation hooks from here, never from `next/link` or `next/navigation`** — the wrapped versions handle locale prefixing and the translated-pathname substitution automatically.
- **`src/proxy.ts`** — the next-intl locale-negotiation middleware. Named `proxy.ts`, not `middleware.ts`, because Next.js 16 renamed the convention (the `proxy` runtime is nodejs-only, no edge option).
- **`messages/hr.json` / `messages/en.json`** — flat-ish nested translation dictionaries, one namespace per page/section (`Hero`, `Services`, `WorkPage`, `CaseStudy`, `ServicesPage`, `AboutPage`, `ContactPage`, `Footer`, `Nav`, etc.). Consumed via `useTranslations("Namespace")` (client) or `getTranslations({ locale, namespace })` (server/`generateMetadata`). The two files must stay key-for-key parallel — next-intl doesn't enforce this at build time, so a missing/renamed key in one file silently drops that translation at runtime instead of failing the build.
- Every route lives under **`src/app/[locale]/...`** — there is no route segment above `[locale]` with its own `layout.tsx`; `src/app/[locale]/layout.tsx` is the de facto root layout (sets `<html lang>`, fonts, JSON-LD, `NextIntlClientProvider`, `MotionConfig`). `src/app/sitemap.ts` and `src/app/robots.ts` sit outside `[locale]` since they're site-wide, not per-locale.
- Dynamic routes with params need the object form for `Link`/`getPathname`, e.g. `href={{ pathname: "/work/[slug]", params: { slug } }}`. A generic locale switcher can't statically type this (see `src/components/LanguageSwitcher.tsx`'s `@ts-expect-error` — this is next-intl's own documented workaround, not a hack to "fix").
- Each page component calls `setRequestLocale(locale)` after awaiting `params`, and validates the locale with `hasLocale(routing.locales, locale)` before calling `notFound()` — this is what makes static rendering work correctly with next-intl.

## Content model

Case-study/project data is **not** in the translation files — it lives in **`src/content/work.ts`** as a typed `WorkProject[]` array, with bilingual fields inlined per project (`industry: { hr, en }`, `summary: { hr, en }`, etc.) since it's structured data, not UI copy. `getWorkProject(slug)` looks one up. Project screenshots are real (captured from the live client sites), stored in `public/work/`. `src/app/[locale]/work/[slug]/page.tsx`'s `generateStaticParams` cross-products `routing.locales` with `workProjects` to pre-render every project × locale.

## Design system

Tailwind CSS v4 — **there is no `tailwind.config.ts`**; all design tokens (colors, fluid type scale, font stacks) are defined as CSS custom properties inside the `@theme` block in `src/styles/globals.css`, and Tailwind auto-generates utilities from the `--color-*`/`--text-*`/`--font-*` variable names. Add new tokens there, not in a JS config.

Notable tokens: `--color-accent` is the brand purple, deliberately tuned to `#7c68d9` for a 4.5:1 contrast ratio against `--color-background` on small text (an earlier `#6e56cf` failed WCAG AA — don't revert this without re-checking contrast). `--text-display-*` are `clamp()`-based fluid sizes for the oversized editorial headlines.

`src/components/ui/` holds the primitives (`Button`, `Card`, `Badge`, `Input`, `Textarea`, `Select`, `SectionHeader`, `PageHeader`). `PageHeader` is the shared eyebrow/heading/intro block used at the top of every interior page (`/work`, `/services`, `/about`, `/contact`).

## Component conventions

- **`src/features/home/<Section>/`** — one folder per homepage section (`Hero`, `Services`, `Work`, `AboutTeaser`, `Process`, `FinalCta`, `Contact`), each with `index.tsx` plus optional `components/`/`hooks/` subfolders. `Contact`'s section component is also reused directly by the `/contact` page, not just the old homepage slot.
- **`src/layouts/Navbar/` and `src/layouts/Footer/`** — site chrome, rendered once in `[locale]/layout.tsx`, not per-page.
- **`src/components/brand/OsirisWordmark.tsx`** — the only logo mark, and now fully text-only: just `OSIRIS` in `font-extrabold tracking-tighter`, no accent shape at all. Two things were tried and removed here — an `OsirisMark` SVG glyph (Djed-pillar motif) used as a watermark, and later a small purple square after the wordmark — both per explicit direction. Don't reintroduce a decorative logo element without checking that decision still stands.
- **`src/components/FloatingCursor/` and `src/components/NoiseBackground/`** — decorative, self-contained effects. Both check `prefers-reduced-motion` and no-op if it's set; `FloatingCursor`'s rAF loop is stored in a ref rather than a self-referencing `useCallback` specifically to satisfy `react-hooks/immutability` (a self-referencing `useCallback` recursion pattern fails that lint rule even with an empty dependency array — see git history on this file if it needs touching again).
- **`src/components/TextGenerateEffect.tsx`** — word-by-word blur/opacity reveal, used for the Hero headline. The word `<span>`s intentionally have **no hardcoded text color** — they inherit from whatever `className` the caller passes to the wrapping component, which is what makes per-line color overrides (e.g. dimming one headline line) work. Don't add a color back onto the spans directly.
- **`src/components/JsonLd.tsx`** — generic `<script type="application/ld+json">` wrapper; used for the site-wide `ProfessionalService` schema in the root layout and the `Service` schema on `/services`.

## Performance: don't animate opacity on above-the-fold text

Learned the hard way: `PageHeader` and the Hero's badge/description/buttons all used to `animate` from `opacity: 0`. Since these elements are the LCP candidate on every page, that fade made Lighthouse-measured LCP ~1.5s slower than it needed to be (the element counts as "unpainted" until the fade completes). The fix applied throughout: animate `y` (transform) only, never `opacity`, on any element likely to be the largest above-the-fold text block. Section reveals gated by `whileInView` (things below the fold, like `SectionHeader`) are unaffected since they don't run until the user scrolls, so opacity animation there is fine.

## Reduced-motion dev warning

`MotionConfig` in `src/app/[locale]/layout.tsx` sets `reducedMotion={process.env.NODE_ENV === "production" ? "user" : "never"}` instead of a flat `"user"`. Motion (framer-motion) logs a console warning whenever the OS-level Reduced Motion setting is on and `reducedMotion="user"` is suppressing an animation — this is Motion's own documented fix (motion.dev/troubleshooting/reduced-motion-disabled): stay compliant in production, skip it in dev so animations preview normally without the warning.

## Contact form

`src/features/home/Contact/components/ContactForm.tsx` posts to Formspree via `NEXT_PUBLIC_FORMSPREE_ENDPOINT` (see `.env.example`). If that env var is unset, the form does **not** silently pretend to work or fall back to a fake `mailto:` — it surfaces the existing error state. There is no contact email address anywhere in the site (removed per explicit direction); don't reintroduce a placeholder one.

## Known leftover cruft

`src/store/` and `src/services/api.ts` are unused stubs inherited from the original template (no state library, no real API layer wired up anywhere). Don't treat their presence as evidence of an existing state-management or API pattern to follow.
