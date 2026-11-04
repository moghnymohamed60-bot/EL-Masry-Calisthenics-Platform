import { CurrencyConfig } from "../types";

/**
 * Converts Western digits (0-9) to Arabic-Indic numerals (٠-٩)
 */
export function toArabicNumerals(input: string | number): string {
  const str = String(input);
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return str.replace(/[0-9]/g, (d) => arabicDigits[parseInt(d, 10)]);
}

/**
 * Pure currency conversion, override lookup, and clean rounding logic
 */
export function calculatePlanPrice(
  basePriceEgp: number,
  currency: CurrencyConfig,
  overrides?: Record<string, number>
): number {
  if (currency.code === "EGP") {
    return basePriceEgp;
  }

  // 1. Check manual fixed price override per plan per currency
  if (overrides && typeof overrides[currency.code] === "number" && overrides[currency.code] > 0) {
    return overrides[currency.code];
  }

  // 2. Convert from EGP base price
  const rawConverted = basePriceEgp * currency.rateFromEgp;

  // 3. Apply clean rounding rule (1, 5, 10, 50)
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
 * Formats a price with Intl.NumberFormat using currency decimals and Arabic-Indic numerals when in Arabic
 */
export function formatCurrencyPrice(
  amount: number,
  currency: CurrencyConfig,
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
