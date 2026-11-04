"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  INITIAL_CURRENCIES,
  INITIAL_PRICING_PLANS,
  INITIAL_SITE_CONFIG,
  INITIAL_EXERCISES,
  INITIAL_QUIZ_CONFIG,
  INITIAL_TRANSFORMATIONS,
  CurrencyItem,
} from "@/lib/seed-data";
import {
  PricingPlanRecord,
  ExerciseRecord,
  TransformationRecord,
} from "@/lib/db";

interface AppContextType {
  lang: "ar" | "en";
  setLang: (lang: "ar" | "en") => void;
  dir: "rtl" | "ltr";
  currency: CurrencyItem;
  setCurrencyByCode: (code: string) => void;
  currencies: CurrencyItem[];
  siteConfig: typeof INITIAL_SITE_CONFIG;
  pricingPlans: PricingPlanRecord[];
  exercises: ExerciseRecord[];
  quizConfig: typeof INITIAL_QUIZ_CONFIG;
  transformations: TransformationRecord[];
  refreshSiteData: () => Promise<void>;
  selectedPlanForQuiz: PricingPlanRecord | null;
  setSelectedPlanForQuiz: (plan: PricingPlanRecord | null) => void;
  isQuizModalOpen: boolean;
  setIsQuizModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Arabic is default as required
  const [lang, setLangState] = useState<"ar" | "en">("ar");
  const [currencies, setCurrencies] = useState<CurrencyItem[]>(INITIAL_CURRENCIES);
  const [currencyCode, setCurrencyCode] = useState<string>("EGP");
  const [siteConfig, setSiteConfig] = useState(INITIAL_SITE_CONFIG);
  const [pricingPlans, setPricingPlans] = useState<PricingPlanRecord[]>(
    INITIAL_PRICING_PLANS.map((p, i) => ({ id: `plan-${i + 1}`, ...p, active: true }))
  );
  const [exercises, setExercises] = useState<ExerciseRecord[]>(
    INITIAL_EXERCISES.map((e, i) => ({
      id: `ex-${i + 1}`,
      ...e,
      level: e.level as "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
    }))
  );
  const [quizConfig, setQuizConfig] = useState(INITIAL_QUIZ_CONFIG);
  const [transformations, setTransformations] = useState<TransformationRecord[]>(
    INITIAL_TRANSFORMATIONS.map((t, i) => ({ id: `tr-${i + 1}`, ...t }))
  );

  const [selectedPlanForQuiz, setSelectedPlanForQuiz] = useState<PricingPlanRecord | null>(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  const refreshSiteData = async () => {
    try {
      const res = await fetch("/api/site", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.siteConfig) setSiteConfig(data.siteConfig);
        if (data.pricingPlans) setPricingPlans(data.pricingPlans);
        if (data.currencies && data.currencies.length > 0) {
          setCurrencies(data.currencies);
          const def = data.currencies.find((c: CurrencyItem) => c.isDefault && c.enabled);
          const savedCurr = localStorage.getItem("elmasry_currency");
          if (!savedCurr && def) {
            setCurrencyCode(def.code);
          }
        }
        if (data.exercises) setExercises(data.exercises);
        if (data.quizConfig) setQuizConfig(data.quizConfig);
        if (data.transformations) setTransformations(data.transformations);
      }
    } catch {
      // Keep initial fallback seed data
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
    INITIAL_CURRENCIES[0];

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        dir: lang === "ar" ? "rtl" : "ltr",
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

