# Frontend Components & Architecture

The frontend application resides in `frontend/` and is built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

## Component Hierarchy (`frontend/src/components/`)

- **`layout/`**:
  - `Navbar.tsx`: Sticky header with smooth-scroll navigation, bilingual toggle, `CurrencySwitcher`, and quick links to the Client Area and Admin Dashboard.
  - `CurrencySwitcher.tsx`: Searchable 22-currency dropdown showing flag, currency code, and symbol.
  - `Footer.tsx`: Call-to-action banner, social links (Instagram, TikTok, YouTube), and WhatsApp contact button.
- **`home/`**:
  - `HomeSections.tsx`: Composes the Hero banner, About EL Masry & 2019–2022–Championships timeline, Trophy Cabinet, Client Transformations gallery, How It Works (4 steps), Testimonials, and FAQ accordion.
- **`pricing/`**:
  - `PricingSection.tsx`: Renders the 5 coaching plans (`1`, `2`, `3`, `6`, `12` months), highlights the 12-month Best Value badge (59% savings), and updates prices in real time when the currency changes.
- **`quiz/`**:
  - `QuizSubscriptionModal.tsx`: 3-stage interactive modal (Athlete sign-up → 1-question-per-screen Level Assessment Quiz with progress bar → Level classification result & WhatsApp/Gateway checkout).
- **`exercises/`**:
  - `ExerciseLibrarySection.tsx`: Searchable and filterable exercise grid by Level, Muscle Group, and Skill with embedded video explanation modals.
- **`client/`**:
  - `WeeklyPlanViewer.tsx`: Displays the athlete's assigned weekly training days, sets, reps, rest times, coach notes, and video links.
- **`admin/`**:
  - `OverviewStats.tsx`: Revenue cards (EGP/USD toggle) and athlete level distribution bars.
- **`ui/`**:
  - `Button.tsx`: Reusable themed button component.

