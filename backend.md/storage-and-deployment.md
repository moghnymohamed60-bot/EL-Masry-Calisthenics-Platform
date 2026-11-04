# Storage Layer, MySQL Schema & Deployment

## MySQL & Prisma ORM (`backend/prisma/schema.prisma`)
The database schema targets **MySQL** (`provider = "mysql"`) and defines:
- `User`: Admin and Client accounts, physical stats, assessed level, and `forcePasswordChange` flag.
- `PricingPlan`: Base prices in EGP, saving percentages, bilingual features, and manual currency price overrides.
- `CurrencyConfig`: 22 supported currencies (USD + 21 Arab currencies), exchange rates, rounding rules, and auto/manual mode flags.
- `Subscription`: Stores the selected currency, exchange rate used, displayed amount, and base EGP amount for historical accuracy.
- `Exercise`, `WeeklyPlan`, `QuizConfig`, `Transformation`, `SiteConfig`.

## Storage Boundary (`backend/src/storage/`)
- `databaseRepository.ts`: Encapsulates all persistence operations so no Prisma or datastore calls leak into routes or services.
- `mediaStorageAdapter.ts`: Replaceable adapter supporting Cloudinary, AWS S3, or external video embeds.

