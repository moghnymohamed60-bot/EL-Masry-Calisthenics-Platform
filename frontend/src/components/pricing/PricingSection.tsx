import React from "react";
import { useApp } from "../../context/AppContext";
import { CurrencySwitcher } from "../layout/CurrencySwitcher";
import { calculatePlanPrice, formatCurrencyPrice } from "../../../../shared/pricing";
import { Check, Flame } from "lucide-react";

export function PricingSection() {
  const { lang, t, currency, pricingPlans, setSelectedPlanForQuiz, setIsQuizModalOpen } = useApp();

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-brand-navy via-brand-black to-brand-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue/15 border border-brand-blue/40 text-brand-accent text-xs font-bold">
              <Flame className="w-3.5 h-3.5" />
              <span>{t.pricing.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black">{t.pricing.title}</h2>
            <p className="text-sm sm:text-base text-white/70 max-w-2xl">{t.pricing.subtitle}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 bg-white/5 border border-white/10 p-3 rounded-2xl">
            <span className="text-xs font-semibold text-white/70">{t.pricing.displayIn}</span>
            <CurrencySwitcher />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 items-stretch">
          {pricingPlans.map((plan) => {
            const converted = calculatePlanPrice(plan.priceEgp, currency, plan.overrides);
            const formattedPrice = formatCurrencyPrice(converted, currency, lang);
            const perMonthPrice = Math.round(converted / plan.durationMonths);
            const formattedPerMonth = formatCurrencyPrice(perMonthPrice, currency, lang);

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                  plan.isBestValue
                    ? "border-2 border-brand-blue bg-gradient-to-b from-[#162447] via-[#0F172A] to-[#0A0E1A] shadow-glow-lg lg:-translate-y-3"
                    : "border border-white/15 bg-brand-card hover:border-brand-blue/50"
                }`}
              >
                {plan.isBestValue && (
                  <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-brand-blue to-brand-accent text-white text-xs font-black uppercase tracking-wider shadow-glow">
                      {lang === "ar"
                        ? `الأكثر توفيراً — وفر ${plan.savingPercent}٪`
                        : `BEST VALUE — SAVE ${plan.savingPercent}%`}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-black text-white">
                      {lang === "ar" ? plan.labelAr : plan.labelEn}
                    </h3>
                    {plan.savingPercent > 0 && !plan.isBestValue && (
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-[11px] font-bold">
                        {lang === "ar" ? `وفر ${plan.savingPercent}٪` : `Save ${plan.savingPercent}%`}
                      </span>
                    )}
                  </div>

                  <div className="my-4">
                    <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {formattedPrice}
                    </div>
                    <div className="text-xs text-white/50 mt-1">
                      {plan.durationMonths > 1
                        ? lang === "ar"
                          ? `بمعدل ${formattedPerMonth} / شهرياً`
                          : `Approx. ${formattedPerMonth} / month`
                        : lang === "ar"
                        ? "اشتراك شهري شامل"
                        : "Full monthly coaching"}
                    </div>
                  </div>

                  <ul className="space-y-2.5 my-6 border-t border-white/10 pt-5 text-xs sm:text-sm text-white/85">
                    {(lang === "ar" ? plan.featuresAr : plan.featuresEn).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlanForQuiz(plan);
                    setIsQuizModalOpen(true);
                  }}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                    plan.isBestValue
                      ? "bg-gradient-to-r from-brand-blue to-brand-accent text-white shadow-glow hover:brightness-110"
                      : "bg-white/10 hover:bg-brand-blue text-white"
                  }`}
                >
                  {t.pricing.selectPlan}
                </button>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-white/55 mt-8">
          {lang === "ar"
            ? `* الأسعار المعروضة بعملة (${currency.nameAr} - ${currency.code}) تقريبية. يتم تأكيد السعر النهائي وطريقة الدفع مباشرة عبر واتساب.`
            : `* Prices shown in ${currency.code} (${currency.nameEn}) are approximate. Final billing is confirmed on WhatsApp.`}
        </p>
      </div>
    </section>
  );
}

