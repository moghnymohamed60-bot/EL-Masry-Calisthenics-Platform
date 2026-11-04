import React, { createContext, useContext, useState, useEffect } from "react";
import {
  CurrencyConfig,
  PricingPlan,
  Exercise,
  QuizConfig,
  Transformation,
  SiteContent,
} from "../../../shared/types";
import { SUPPORTED_CURRENCIES, BASE_PRICING_PLANS } from "../../../shared/constants";
import {
  INITIAL_SITE_CONFIG,
  INITIAL_EXERCISES,
  INITIAL_QUIZ_CONFIG,
  INITIAL_TRANSFORMATIONS,
} from "../../../backend/src/data/seedData";
import { siteService } from "../services/siteService";
import arTranslations from "../locales/ar.json";
import enTranslations from "../locales/en.json";

interface AppContextType {
  lang: "ar" | "en";
  setLang: (lang: "ar" | "en") => void;
  dir: "rtl" | "ltr";
  t: typeof arTranslations;
  currency: CurrencyConfig;
  setCurrencyByCode: (code: string) => void;
  currencies: CurrencyConfig[];
  siteConfig: SiteContent;
  pricingPlans: PricingPlan[];
  exercises: Exercise[];
  quizConfig: QuizConfig;
  transformations: Transformation[];
  refreshSiteData: () => Promise<void>;
  selectedPlanForQuiz: PricingPlan | null;
  setSelectedPlanForQuiz: (plan: PricingPlan | null) => void;
  isQuizModalOpen: boolean;
  setIsQuizModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<"ar" | "en">("ar");
  const [currencies, setCurrencies] = useState<CurrencyConfig[]>(SUPPORTED_CURRENCIES);
  const [currencyCode, setCurrencyCode] = useState<string>("EGP");
  const [siteConfig, setSiteConfig] = useState<SiteContent>(INITIAL_SITE_CONFIG);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(BASE_PRICING_PLANS);
  const [exercises, setExercises] = useState<Exercise[]>(INITIAL_EXERCISES);
  const [quizConfig, setQuizConfig] = useState<QuizConfig>(INITIAL_QUIZ_CONFIG);
  const [transformations, setTransformations] = useState<Transformation[]>(INITIAL_TRANSFORMATIONS);

  const [selectedPlanForQuiz, setSelectedPlanForQuiz] = useState<PricingPlan | null>(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  const refreshSiteData = async () => {
    try {
      const data = await siteService.fetchPublicBundle();
      if (data.siteConfig) setSiteConfig(data.siteConfig);
      if (data.pricingPlans) setPricingPlans(data.pricingPlans);
      if (data.currencies && data.currencies.length > 0) {
        setCurrencies(data.currencies);
        const def = data.currencies.find((c: CurrencyConfig) => c.isDefault && c.enabled);
        const savedCurr = localStorage.getItem("elmasry_currency");
        if (!savedCurr && def) {
          setCurrencyCode(def.code);
        }
      }
      if (data.exercises) setExercises(data.exercises);
      if (data.quizConfig) setQuizConfig(data.quizConfig);
      if (data.transformations) setTransformations(data.transformations);
    } catch {
      // Fallback to seeded initial constants
    }
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("elmasry_lang") as "ar" | "en" | null;
    if (savedLang === "ar" || savedLang === "en") {
      setLangState(savedLang);
      document.documentElement.lang = savedLang;
      document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
    } else {
      document.documentElement.lang = "ar";
      document.documentElement.dir = "rtl";
    }

    const savedCurr = localStorage.getItem("elmasry_currency");
    if (savedCurr) {
      setCurrencyCode(savedCurr);
    }

    refreshSiteData();
  }, []);

  const setLang = (newLang: "ar" | "en") => {
    setLangState(newLang);
    localStorage.setItem("elmasry_lang", newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const setCurrencyByCode = (code: string) => {
    setCurrencyCode(code);
    localStorage.setItem("elmasry_currency", code);
  };

  const enabledCurrencies = currencies.filter((c) => c.enabled);
  const activeCurrency =
    enabledCurrencies.find((c) => c.code === currencyCode) ||
    enabledCurrencies.find((c) => c.isDefault) ||
    SUPPORTED_CURRENCIES[0];

  const t = lang === "ar" ? arTranslations : enTranslations;

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        dir: lang === "ar" ? "rtl" : "ltr",
        t,
        currency: activeCurrency,
        setCurrencyByCode,
        currencies: enabledCurrencies,
        siteConfig,
        pricingPlans,
        exercises,
        quizConfig,
        transformations,
        refreshSiteData,
        selectedPlanForQuiz,
        setSelectedPlanForQuiz,
        isQuizModalOpen,
        setIsQuizModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

