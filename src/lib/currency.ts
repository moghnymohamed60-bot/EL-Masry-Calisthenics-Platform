import { CurrencyItem } from "./seed-data";

/**
 * Converts regular digits (0-9) to Arabic-Indic numerals (٠-٩) when locale is Arabic
 */
export function toArabicNumerals(input: string | number): string {
  const str = String(input);
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return str.replace(/[0-9]/g, (d) => arabicDigits[parseInt(d, 10)]);
}

/**
 * Calculates the converted and cleanly rounded price for a plan in a given currency.
 * Checks manual fixed price override first, then applies exchange rate & rounding rule.
 */
export function calculatePlanPrice(
  basePriceEgp: number,
  currency: CurrencyItem,
  overrides?: Record<string, number>
): number {
  if (currency.code === "EGP") {
    return basePriceEgp;
  }

  // 1. Check if admin set a manual fixed price override for this currency
  if (overrides && typeof overrides[currency.code] === "number" && overrides[currency.code] > 0) {
    return overrides[currency.code];
  }

  // 2. Convert from EGP using currency's rateFromEgp
  const rawConverted = basePriceEgp * currency.rateFromEgp;

  // 3. Apply admin rounding rule (1, 5, 10, 50)
  // Note: For high-value 3-decimal currencies (KWD, BHD, OMR, JOD) where converted price might be e.g. 12.5,
  // if roundingRule is 1, round to nearest whole or 0.5 for clean display.
  if (currency.decimals === 3 && rawConverted < 50 && currency.roundingRule <= 1) {
    return Math.round(rawConverted * 2) / 2;
  }

  const rule = currency.roundingRule || 1;
  if (rule > 1) {
    return Math.max(rule, Math.round(rawConverted / rule) * rule);
  }

  return Math.round(rawConverted);
}

/**
 * Formats a numeric amount according to currency decimals and language locale (Arabic-Indic numerals for AR)
 */
export function formatCurrencyPrice(
  amount: number,
  currency: CurrencyItem,
  lang: "ar" | "en"
): string {
  const isWhole = amount % 1 === 0;
  const minDecimals = isWhole ? 0 : currency.decimals;
  const maxDecimals = currency.decimals;

  try {
    const locale = lang === "ar" ? "ar-EG-u-nu-arab" : "en-US";
    const formattedNumber = new Intl.NumberFormat(locale, {
      minimumFractionDigits: minDecimals,
      maximumFractionDigits: maxDecimals,
    }).format(amount);

    if (lang === "ar") {
      return `${formattedNumber} ${currency.symbol}`;
    }
    // For English, put symbol before for $, or code after
    if (currency.code === "USD") {
      return `$${formattedNumber}`;
    }
    return `${formattedNumber} ${currency.code}`;
  } catch {
    const fallback = amount.toFixed(minDecimals);
    return lang === "ar"
      ? `${toArabicNumerals(fallback)} ${currency.symbol}`
      : `${fallback} ${currency.code}`;
  }
}

