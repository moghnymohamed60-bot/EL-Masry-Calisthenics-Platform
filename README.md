# EL Masry Calisthenics — Monorepo Platform

Production-ready, bilingual (Arabic RTL default & English LTR) online calisthenics coaching website, level-assessment quiz, multi-currency pricing engine, athlete portal, and no-code Admin CMS built for Egyptian Calisthenics Champion **EL Masry**.

---

## 1. Technology Stack

- **Frontend (`frontend/`)**: React, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router DOM, React Helmet Async
- **Backend (`backend/`)**: Node.js, Express, TypeScript, Jose (JWT), bcryptjs
- **Database (`backend/prisma/`)**: MySQL with Prisma ORM, accessed strictly through `backend/src/storage/`
- **Validation & Shared Logic (`shared/`)**: Zod schemas, pure currency conversion & rounding engine, pure quiz level-scoring engine, and TypeScript contracts
- **Workspace**: npm workspaces at the repository root (`frontend`, `backend`, `shared`)

---

## 2. Monorepo Structure

```text
el-masry-calisthenics/
├── frontend/                          # React + Vite + Tailwind CSS + Framer Motion application
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/                # Navbar, Footer, CurrencySwitcher
│   │   │   ├── home/                  # Hero, About, Achievements, Transformations, How-it-works, Testimonials, FAQ
│   │   │   ├── pricing/               # PricingSection (multi-currency plan cards)
│   │   │   ├── quiz/                  # QuizSubscriptionModal (1-question-per-screen quiz & checkout)
│   │   │   ├── exercises/             # ExerciseLibrarySection (searchable/filterable grid & video modal)
│   │   │   ├── client/                # WeeklyPlanViewer
│   │   │   ├── admin/                 # OverviewStats
│   │   │   └── ui/                    # Button
│   │   ├── pages/                     # HomePage, PricingPage, ExercisesPage, ClientAreaPage, admin/AdminDashboardPage
│   │   ├── services/                  # Browser API services (siteService, authService, subscriptionService, weeklyPlanService, currencyService)
│   │   ├── context/                   # AppContext (AR/EN RTL/LTR, Currency, Site CMS state)
│   │   ├── hooks/                     # useTranslation, useCurrency
│   │   ├── locales/                   # ar.json and en.json translation files
│   │   ├── App.tsx                    # Root application composition and routes
│   │   └── main.tsx                   # Browser entry point
│   ├── public/                        # robots.txt, sitemap.xml
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── vite.config.ts
│
├── backend/                           # Node.js + Express + TypeScript API server
│   ├── src/
│   │   ├── data/                      # seedData.ts (default admin, exercises, quiz, 22 currencies)
│   │   ├── middleware/                # JWT auth, role check, rate limiting, Zod validation, error handler
│   │   ├── routes/                    # HTTP endpoints (/api/auth, /api/site, /api/subscriptions, /api/weekly-plans, /api/currencies/sync, etc.)
│   │   ├── services/                  # Business logic (authService, subscriptionService, weeklyPlanService, currencyExchangeService, cmsContentService)
│   │   ├── storage/                   # Data-access boundary (databaseRepository.ts + mediaStorageAdapter.ts)
│   │   ├── app.ts                     # Express configuration and route registration
│   │   └── server.ts                  # HTTP process entry point
│   ├── prisma/                        # schema.prisma (MySQL) and seed.ts
│   ├── package.json
│   └── tsconfig.json
│
├── shared/                            # Pure logic & contracts shared by frontend and backend
│   ├── constants/                     # Base EGP plan prices, 22 supported currencies, quiz thresholds
│   ├── pricing/                       # Pure currency conversion, rounding & overrides + unit tests
│   ├── quiz/                          # Pure level-scoring logic + unit tests
│   ├── schemas/                       # Zod runtime validation schemas
│   └── types/                         # Shared TypeScript interfaces
│
├── frontend.md/                       # Frontend documentation
│   ├── components.md
│   └── routing-i18n-theming.md
├── backend.md/                        # Backend documentation
│   ├── api-and-auth.md
│   └── storage-and-deployment.md
├── random.md/                         # Shared, quiz scoring & currency documentation
│   └── shared-pricing-and-quiz.md
├── README.md
├── .env.example
├── .gitignore
└── package.json
```

---

## 3. Documentation Links

- **Frontend Documentation**:
  - [Components & Hierarchy](./frontend.md/components.md)
  - [Routing, Bilingual i18n (RTL/LTR) & Theming](./frontend.md/routing-i18n-theming.md)
- **Backend Documentation**:
  - [API Reference, Middleware & Auth](./backend.md/api-and-auth.md)
  - [Storage Layer, MySQL Prisma Schema & Deployment](./backend.md/storage-and-deployment.md)
- **Shared Logic & Data Documentation**:
  - [Currency Engine, Quiz Scoring & Unit Tests](./random.md/shared-pricing-and-quiz.md)

---

## 4. Setup & Workspace Commands

1. **Install all workspace dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```

3. **Run database migrations & seed initial data:**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

4. **Start both Frontend (Vite on `:3000`) and Backend (Express on `:4000`) together:**
   ```bash
   npm run dev
   ```

5. **Run unit tests (`shared/pricing` & `shared/quiz`) and type-check all workspaces:**
   ```bash
   npm test
   npm run lint
   ```
