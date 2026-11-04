import assert from "node:assert";
import { calculatePlanPrice, toArabicNumerals, formatCurrencyPrice } from "./index";
import { SUPPORTED_CURRENCIES } from "../constants";

export function runPricingTests() {
  const egp = SUPPORTED_CURRENCIES.find((c) => c.code === "EGP")!;
  const usd = SUPPORTED_CURRENCIES.find((c) => c.code === "USD")!;
  const kwd = SUPPORTED_CURRENCIES.find((c) => c.code === "KWD")!;
  const iqd = SUPPORTED_CURRENCIES.find((c) => c.code === "IQD")!;

  // 1. EGP base price returns unchanged
  assert.strictEqual(calculatePlanPrice(2000, egp), 2000, "EGP should remain 2000");

  // 2. Manual fixed override takes precedence over exchange rate conversion
  assert.strictEqual(
    calculatePlanPrice(2000, usd, { USD: 45 }),
    45,
    "USD manual override should return 45"
  );

  // 3. Automatic conversion + rounding rule (Nearest 5 for USD when no override)
  const convertedUsd = calculatePlanPrice(2000, usd); // 2000 * 0.0204 = 40.8 -> rounds to 40
  assert.strictEqual(convertedUsd % 5, 0, "USD without override should round to nearest 5");

  // 4. 3-decimal currency (KWD)
  const convertedKwd = calculatePlanPrice(2000, kwd);
  assert.ok(convertedKwd > 0, "KWD price should be positive");

  // 5. Nearest 50 rounding rule for IQD
  const convertedIqd = calculatePlanPrice(2000, iqd);
  assert.strictEqual(convertedIqd % 50, 0, "IQD should round to nearest 50");

  // 6. Arabic numerals conversion
  assert.strictEqual(toArabicNumerals(2026), "٢٠٢٦", "Should convert 2026 to ٢٠٢٦");

  // 7. Formatted output includes currency symbol or code
  const formattedEn = formatCurrencyPrice(45, usd, "en");
  assert.strictEqual(formattedEn, "$45", "English USD format should be $45");

  console.log("✅ All shared/pricing unit tests passed!");
}

if (require.main === module) {
  runPricingTests();
}

