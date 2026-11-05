import React from "react";
import { useApp } from "../../context/AppContext";
import { CurrencySwitcher } from "../layout/CurrencySwitcher";
import { calculatePlanPrice, formatCurrencyPrice } from "../../../../shared/pricing";
import { Check, Flame, ShieldCheck, Sparkles, Trophy } from "lucide-react";

export function PricingSection() {
  const {
    lang,
    t,
    currency,
    currencies,
    setCurrencyByCode,
    pricingPlans,
    setSelectedPlanForQuiz,
    setIsQuizModalOpen,
  } = useApp();

  // Quick-access popular currencies bar
  const popularCodes = ["EGP", "USD", "SAR", "AED", "KWD", "QAR"];
  const quickCurrencies = popularCodes
    .map((code) => currencies.find((c) => c.code === code))
    .filter(Boolean);

  return (
    <section
      id="pricing"
      className="py-24 bg-gradient-to-b from-brand-black via-brand-navy to-brand-black border-b-4 border-brand-blue relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-tech-grid-dark opacity-45 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header & Multi-Currency Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 bg-brand-navy/90 border-2 border-brand-blue/50 rounded-3xl p-6 sm:p-8 shadow-card-dark">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-brand-navy text-xs font-black uppercase tracking-wider shadow-sm">
              <Flame className="w-4 h-4 text-brand-blue" />
              <span>{t.pricing.badge}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white leading-tight">
              {t.pricing.title}
            </h2>
            <p className="text-sm sm:text-base text-brand-grey max-w-2xl font-medium">
              {t.pricing.subtitle}
            </p>
          </div>

          <div className="flex flex-col gap-3 shrink-0 bg-brand-grey text-brand-black border-2 border-white p-4 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-black uppercase tracking-wider text-brand-navy">
                {t.pricing.displayIn}
              </span>
              <CurrencySwitcher />
            </div>

            {/* Quick Currency Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-brand-grey-mid">
              {quickCurrencies.map((c) => {
                if (!c) return null;
                const active = c.code === currency.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => setCurrencyByCode(c.code)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all flex items-center gap-1 ${
                      active
                        ? "bg-brand-blue text-white shadow-sm"
                        : "bg-white text-brand-black hover:bg-brand-navy hover:text-white border border-brand-grey-mid"
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span>{c.code}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid — Structured for Clean Readability & High Contrast */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
          {pricingPlans.map((plan, index) => {
            const converted = calculatePlanPrice(plan.priceEgp, currency, plan.overrides);
            const formattedPrice = formatCurrencyPrice(converted, currency, lang);
            const perMonthPrice = Math.round(converted / plan.durationMonths);
            const formattedPerMonth = formatCurrencyPrice(perMonthPrice, currency, lang);

            const isBest = plan.isBestValue;
            // Alternate cleanly between White/Light-Grey cards, Obsidian Black cards, and the Royal Blue Best Value card
            const isLightCard = !isBest && index % 2 === 1;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
                  isBest
                    ? "md:col-span-2 xl:col-span-1 border-4 border-white bg-gradient-to-b from-brand-blue via-brand-royal to-brand-navy text-white shadow-glow-lg"
                    : isLightCard
                    ? "border-2 border-brand-grey-mid bg-white text-brand-black hover:border-brand-blue shadow-card-dark"
                    : "border-2 border-brand-blue/50 bg-brand-black text-white hover:border-brand-blue shadow-card-dark"
                }`}
              >
                {isBest && (
                  <div className="mb-4 -mt-1 flex items-center justify-between gap-2 px-4 py-1.5 rounded-xl bg-white text-brand-black text-xs font-black uppercase tracking-wider shadow-md">
                    <div className="flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-brand-blue shrink-0" />
                      <span>
                        {lang === "ar"
                          ? "الباقة الأكثر طلباً وتوفيراً"
                          : "CHAMPION'S CHOICE • BEST VALUE"}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-brand-blue text-white text-[11px]">
                      {lang === "ar" ? `وفر ${plan.savingPercent}٪` : `SAVE ${plan.savingPercent}%`}
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Title & Savings Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div>
                      <span
                        className={`text-[11px] font-black uppercase tracking-widest block ${
                          isBest
                            ? "text-brand-grey"
                            : isLightCard
                            ? "text-brand-blue"
                            : "text-brand-accent"
                        }`}
                      >
                        {lang === "ar" ? "اشتراك تدريب أونلاين" : "ONLINE COACHING TIER"}
                      </span>
                      <h3
                        className={`text-2xl sm:text-3xl font-black mt-0.5 ${
                          isLightCard ? "text-brand-black" : "text-white"
                        }`}
                      >
                        {lang === "ar" ? plan.labelAr : plan.labelEn}
                      </h3>
                    </div>

                    {plan.savingPercent > 0 && !isBest && (
                      <span
                        className={`px-3 py-1 rounded-xl text-xs font-black shrink-0 ${
                          isLightCard
                            ? "bg-brand-navy text-white"
                            : "bg-brand-grey text-brand-black"
                        }`}
                      >
                        {lang === "ar"
                          ? `وفر ${plan.savingPercent}٪`
                          : `Save ${plan.savingPercent}%`}
                      </span>
                    )}
                  </div>

                  {/* Price Box */}
                  <div
                    className={`my-4 p-4 rounded-2xl ${
                      isBest
                        ? "bg-brand-black/55 border-2 border-white/25"
                        : isLightCard
                        ? "bg-brand-grey border-2 border-brand-grey-mid"
                        : "bg-brand-navy border border-brand-blue/30"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                      <div
                        className={`text-3xl sm:text-4xl font-black tracking-tight ${
                          isLightCard ? "text-brand-blue" : "text-white"
                        }`}
                      >
                        {formattedPrice}
                      </div>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
                          isBest
                            ? "bg-white/15 text-white"
                            : isLightCard
                            ? "bg-white text-brand-black border border-brand-grey-mid"
                            : "bg-brand-black text-brand-grey"
                        }`}
                      >
                        {currency.flag} {currency.code}
                      </span>
                    </div>

                    <div
                      className={`text-xs font-bold mt-1.5 ${
                        isLightCard ? "text-brand-black/75" : "text-brand-grey"
                      }`}
                    >
                      {plan.durationMonths > 1
                        ? lang === "ar"
                          ? `بمعدل ${formattedPerMonth} / شهرياً فقط`
                          : `Equivalent to ${formattedPerMonth} / month`
                        : lang === "ar"
                        ? "تجديد شهري شامل جميع المميزات"
                        : "Full monthly coaching package"}
                    </div>
                  </div>

                  {/* Features List */}
                  <ul
                    className={`space-y-3 my-6 text-xs sm:text-sm font-semibold ${
                      isLightCard ? "text-brand-black/90" : "text-brand-grey"
                    }`}
                  >
                    {(lang === "ar" ? plan.featuresAr : plan.featuresEn).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isBest
                              ? "bg-white text-brand-blue"
                              : isLightCard
                              ? "bg-brand-blue text-white"
                              : "bg-brand-blue/25 text-brand-accent border border-brand-blue/40"
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlanForQuiz(plan);
                    setIsQuizModalOpen(true);
                  }}
                  className={`w-full py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
                    isBest
                      ? "bg-white hover:bg-brand-grey text-brand-black shadow-lg"
                      : isLightCard
                      ? "bg-brand-black hover:bg-brand-blue text-white shadow-md"
                      : "bg-brand-blue hover:bg-white hover:text-brand-black text-white shadow-glow"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>{t.pricing.selectPlan}</span>
                </button>
              </div>
            );
          })}

          {/* 6th Card: Custom / Direct WhatsApp Consultation Card to Complete the 3x2 Grid */}
          <div className="rounded-3xl p-6 sm:p-7 border-2 border-brand-grey-mid bg-brand-grey text-brand-black shadow-card-dark flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-brand-navy text-white text-[11px] font-black uppercase tracking-wider">
                  {lang === "ar" ? "استشارة مجانية" : "DIRECT COACH ACCESS"}
                </span>
                <Sparkles className="w-5 h-5 text-brand-blue" />
              </div>

              <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-2xl border border-brand-grey-mid">
                <img
                  src="/images/coach/image7.jpeg"
                  alt="Coach EL Masry"
                  className="w-14 h-14 rounded-xl object-cover object-top border-2 border-brand-blue shrink-0"
                />
                <div>
                  <h3 className="text-lg font-black text-brand-black">
                    {lang === "ar" ? "محتار أي باقة تناسبك؟" : "Need Help Choosing?"}
                  </h3>
                  <p className="text-xs text-brand-blue font-bold">
                    {lang === "ar" ? "الكابتن المصري يرد عليك شخصياً" : "Ask Captain EL Masry"}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-brand-black/80 font-semibold leading-relaxed">
                {lang === "ar"
                  ? "قم بإجراء اختبار تحديد المستوى في ٦٠ ثانية لنرشح لك البرنامج الأنسب لهدفك، أو تواصل معنا مباشرة عبر واتساب للإجابة على جميع استفساراتك."
                  : "Take our 60-second level assessment quiz to get an instant tier recommendation, or message us on WhatsApp for custom competition prep."}
              </p>
            </div>

            <div className="space-y-2.5 pt-6">
              <button
                type="button"
                onClick={() => setIsQuizModalOpen(true)}
                className="w-full py-3.5 rounded-2xl bg-brand-blue hover:bg-brand-navy text-white font-black text-xs sm:text-sm shadow-glow flex items-center justify-center gap-2 transition-all"
              >
                <Flame className="w-4 h-4" />
                <span>
                  {lang === "ar" ? "اختبر مستواك مجاناً الآن" : "Take Free Level Assessment"}
                </span>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-brand-grey font-semibold">
          {lang === "ar"
            ? `* الأسعار المعروضة بعملة (${currency.nameAr} - ${currency.code}) تقريبية. يتم تأكيد السعر النهائي وطريقة الدفع مباشرة عبر واتساب.`
            : `* Prices shown in ${currency.code} (${currency.nameEn}) are approximate. Final billing is confirmed on WhatsApp.`}
        </p>
      </div>
    </section>
  );
}
