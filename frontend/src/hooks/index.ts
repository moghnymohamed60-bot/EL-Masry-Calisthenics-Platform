import { useApp } from "../context/AppContext";
import { calculatePlanPrice, formatCurrencyPrice } from "../../../shared/pricing";

export function useTranslation() {
  const { lang, setLang, dir, t } = useApp();
  return { lang, setLang, dir, t };
}

export function useCurrency() {
  const { currency, currencies, setCurrencyByCode, lang } = useApp();
  return {
    currency,
    currencies,
    setCurrencyByCode,
    calculatePrice: (baseEgp: number, overrides?: Record<string, number>) =>
      calculatePlanPrice(baseEgp, currency, overrides),
    formatPrice: (amount: number) => formatCurrencyPrice(amount, currency, lang),
  };
}

