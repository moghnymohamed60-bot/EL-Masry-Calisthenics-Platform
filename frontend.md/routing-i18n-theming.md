# Routing, i18n (RTL/LTR) & Theming

## Client-Side Routing (`frontend/src/pages/`)
Pages are thin route-level screens that compose domain components and invoke `frontend/src/services/*`:
- `/` (`HomePage.tsx`): Full public landing experience.
- `/pricing` (`PricingPage.tsx`): Dedicated multi-currency pricing screen.
- `/exercises` (`ExercisesPage.tsx`): Dedicated searchable exercise library screen.
- `/client` & `/login` (`ClientAreaPage.tsx`): Athlete login and personalized weekly workout portal.
- `/admin` (`AdminDashboardPage.tsx`): Protected 7-tab Admin CMS and analytics dashboard.

## Bilingual Support (Arabic Default RTL & English LTR)
- UI string translations live in `frontend/src/locales/ar.json` and `frontend/src/locales/en.json`.
- Database-backed content (Hero, About, Plans, Exercises, Quiz, FAQs, Testimonials) carries both `*Ar` and `*En` fields.
- Switching language updates `document.documentElement.lang` (`ar` | `en`) and `document.documentElement.dir` (`rtl` | `ltr`), persisting the user's choice in `localStorage`.

## Theme Tokens (`frontend/tailwind.config.ts`)
- **Backgrounds**: `#0A0A0A` (`brand.black`), `#070D19` (`brand.navy`), `#111622` (`brand.card`)
- **Accents & CTAs**: `#1E6BFF` (`brand.blue`), `#2D7BFF` (`brand.accent`)
- **Typography**: `Bebas Neue` (English display headings), `Inter` (English body), `Cairo` (Arabic headings & body).

