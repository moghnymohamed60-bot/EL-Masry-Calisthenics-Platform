# Shared Package: Currency Engine, Quiz Scoring & Zod Schemas

The `shared/` workspace contains pure TypeScript modules shared between `frontend/` and `backend/` without duplication.

## 1. Multi-Currency Pricing Engine (`shared/pricing/index.ts`)
- **`calculatePlanPrice(basePriceEgp, currency, overrides)`**:
  1. Returns `basePriceEgp` directly when `currency.code === "EGP"`.
  2. Checks if the admin configured a manual fixed override for that currency (e.g., `$45 USD` for the 1-Month plan).
  3. Multiplies `basePriceEgp * currency.rateFromEgp` and applies the currency's configurable rounding rule (`Nearest 1`, `Nearest 5`, `Nearest 10`, or `Nearest 50`).
- **`formatCurrencyPrice(amount, currency, lang)`**:
  - Uses `Intl.NumberFormat` with exact currency decimals (`3` decimals for `KWD`, `BHD`, `OMR`, `JOD`, `LYD`, `TND`; `0` decimals for `EGP`, `IQD`, `LBP`, `SYP`, `YER`, `DJF`, `KMF`; `2` decimals for `USD`, `SAR`, `AED`, `QAR`, etc.) and converts digits to Arabic-Indic numerals (`٠-٩`) when `lang === "ar"`.

## 2. Quiz Level Scoring Engine (`shared/quiz/index.ts`)
- **`calculateQuizTotalScore(answers)`**: Sums the point weights across all 10 assessment questions.
- **`classifyAthleteLevel(score, intermediateThreshold, advancedThreshold)`**:
  - `score < 35` → `BEGINNER`
  - `35 <= score < 70` → `INTERMEDIATE`
  - `score >= 70` → `ADVANCED`

## 3. Unit Tests
Run unit tests for both `shared/pricing` and `shared/quiz` from the root workspace:
```bash
npm test
```

