# EL Masry Calisthenics — Online Coaching Platform & Admin CMS

A production-ready, bilingual (Arabic RTL default & English LTR) full-stack web application and no-code Admin Dashboard built for Egyptian Calisthenics Champion **EL Masry**.

---

## 1. Architecture & Folder Structure

```text
EL-Masry-Calisthenics-/
├── prisma/
│   ├── schema.prisma           # Prisma ORM Schema (User, SiteConfig, PricingPlan, CurrencyConfig, Exercise, QuizConfig, Subscription, WeeklyPlan, Transformation)
│   ├── seed.ts                 # Database seed script (22 currencies, 5 plans, 8 exercises, 10-question quiz, default admin & demo athletes)
│   └── database.json           # Auto-seeded persistent JSON/SQLite datastore
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/route.ts             # JWT + bcrypt authentication, rate-limiting & forced first-login password change
│   │   │   ├── site/route.ts             # Public & Admin CMS API for all site sections, plans, exercises, quiz & currencies
│   │   │   ├── subscriptions/route.ts    # Subscription creation, status management, +30d extension & deletion
│   │   │   ├── weekly-plans/route.ts     # Structured Weekly Workout Plan builder & management API
│   │   │   └── currencies/sync/route.ts  # Daily automatic exchange rate sync with cached fallback
│   │   ├── admin/page.tsx      # Protected Admin Dashboard (7 tabs: Analytics, Subscriptions, Weekly Plans, Exercises, Currencies, CMS, Quiz)
│   │   ├── client/page.tsx     # Protected Athlete Portal (Weekly workout schedule, exercise videos, subscription status, WhatsApp check-in)
│   │   ├── layout.tsx          # Root Bilingual Layout with Cairo, Bebas Neue & Inter fonts + JSON-LD Schema.org markup
│   │   ├── page.tsx            # Public Website (Hero, About & Timeline, Trophy Cabinet, Transformations, How It Works, Multi-Currency Pricing, Exercise Library, Testimonials, FAQ, Footer)
│   │   └── sitemap.ts          # Dynamic XML Sitemap
│   ├── components/
│   │   ├── Navbar.tsx                  # Sticky responsive header with Language Switcher & Currency Switcher
│   │   ├── CurrencySwitcher.tsx        # Searchable 22-currency dropdown with flags, symbols & códigos
│   │   └── QuizSubscriptionModal.tsx   # 3-Step Sign-up + 1-Question-Per-Screen Level Assessment Quiz + WhatsApp/Gateway Checkout
│   ├── context/
│   │   └── AppContext.tsx      # Global state for RTL/LTR language, currency selection, and live CMS synchronization
│   └── lib/
│       ├── auth.ts             # Jose JWT verification, HTTP-only cookies & login rate limiter
│       ├── currency.ts         # Multi-currency price conversion, rounding rules (1/5/10/50), manual overrides & Arabic-Indic numeral formatting
│       ├── db.ts               # Transactional persistence engine with automatic seeding
│       └── seed-data.ts        # Complete bilingual seed data
├── .env.example                # Environment variables template
├── tailwind.config.js          # Custom athletic dark theme (#0A0A0A, #1E6BFF, #2D7BFF)
└── package.json
```

---

## 2. Quick Setup & Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

3. **Seed the database (Optional — auto-seeds on first launch):**
   ```bash
   npm run db:seed
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 3. Default Login Credentials

### Admin Dashboard (`/admin`)
- **Email:** `admin@elmasry.com`
- **Temporary Password:** `ElMasry@2026`
- *Note:* On your very first login, the system enforces a mandatory password update for security.

### Athlete / Client Portal (`/client`)
- **Email:** `karim@example.com`
- **Password:** `Client@2026`

---

## 4. Admin User Guide (For Coach EL Masry)

1. **Managing Subscriptions & Clients (`Subscriptions & Clients` Tab):**
   - View every client who completed the Level Assessment Quiz and requested a plan.
   - Search by name, phone, or goal, and filter by status (`PENDING`, `PAID`, `ACTIVE`, `EXPIRED`) or assessed level (`BEGINNER`, `INTERMEDIATE`, `ADVANCED`).
   - Change any subscription's status with one click once payment is confirmed on WhatsApp/InstaPay, extend a client's subscription by `+30d`, or export the entire table to **CSV / Excel**.

2. **Creating Weekly Training Plans (`Weekly Workout Plans` Tab):**
   - Build structured weekly training schedules by week number and target level (`BEGINNER`, `INTERMEDIATE`, `ADVANCED`).
   - Add training days, exercises, sets, reps, rest times, coaching notes, and explanation video links.
   - Clients immediately see their updated weekly workout plan when they log into `/client`.

3. **Managing Currencies & Pricing (`Currencies & Pricing` Tab):**
   - Edit the base EGP price for any of the 5 plans (1, 2, 3, 6, 12 months).
   - Set clean **Fixed Price Overrides** per plan for key currencies (e.g., `$45 USD` or `165 SAR` instead of raw converted decimals).
   - Toggle any of the **22 supported currencies** (USD + 21 Arab currencies), switch between **Automatic API Sync** and **Manual Fixed Rate**, and customize rounding rules (`Nearest 1, 5, 10, or 50`).

4. **Editing the Exercise Library (`Exercise Library` Tab):**
   - Add new calisthenics skills and exercises with Arabic & English titles, descriptions, level tags, muscle groups, thumbnails, and YouTube/Vimeo explanation videos.

5. **Editing Website Content (`Website CMS & Media` & `Quiz & Scoring` Tabs):**
   - Edit the Hero headlines, About story, WhatsApp number, social media links, and Quiz questions/scoring thresholds in both Arabic and English with instant live updates.

