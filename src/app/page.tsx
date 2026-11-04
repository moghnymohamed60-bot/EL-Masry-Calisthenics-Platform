"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { CurrencySwitcher } from "@/components/CurrencySwitcher";
import { QuizSubscriptionModal } from "@/components/QuizSubscriptionModal";
import { calculatePlanPrice, formatCurrencyPrice } from "@/lib/currency";
import { ExerciseRecord } from "@/lib/db";
import {
  Trophy,
  Check,
  Flame,
  MessageCircle,
  Play,
  Search,
  Filter,
  ChevronDown,
  Star,
  Award,
  Calendar,
  ArrowUpRight,
  Dumbbell,
  Sparkles,
  CheckCircle2,
  X,
  Instagram,
  Youtube,
  Video,
} from "lucide-react";

export default function HomePage() {
  const {
    lang,
    currency,
    siteConfig,
    pricingPlans,
    exercises,
    transformations,
    setSelectedPlanForQuiz,
    setIsQuizModalOpen,
  } = useApp();

  // Exercise Library Filters
  const [exSearch, setExSearch] = useState("");
  const [exLevel, setExLevel] = useState("ALL");
  const [exMuscle, setExMuscle] = useState("ALL");
  const [exSkill, setExSkill] = useState("ALL");
  const [activeExerciseModal, setActiveExerciseModal] = useState<ExerciseRecord | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const waNumber = (siteConfig.contact?.whatsappNumber || "201099999999").replace(/\D/g, "");
  const directWhatsappLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    lang === "ar"
      ? "مرحباً كابتن المصري! أرغب في الاستفسار عن التدريب الأونلاين."
      : "Hello Coach EL Masry! I would like to inquire about online coaching."
  )}`;

  const filteredExercises = exercises.filter((ex) => {
    const q = exSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      ex.titleAr.toLowerCase().includes(q) ||
      ex.titleEn.toLowerCase().includes(q) ||
      ex.descriptionAr.toLowerCase().includes(q) ||
      ex.descriptionEn.toLowerCase().includes(q);
    const matchesLevel = exLevel === "ALL" || ex.level === exLevel;
    const matchesMuscle = exMuscle === "ALL" || ex.muscleGroup === exMuscle;
    const matchesSkill = exSkill === "ALL" || ex.skill === exSkill;
    return matchesSearch && matchesLevel && matchesMuscle && matchesSkill;
  });

  const levelLabels: Record<string, { ar: string; en: string; badge: string }> = {
    BEGINNER: { ar: "مبتدئ", en: "Beginner", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    INTERMEDIATE: { ar: "متوسط", en: "Intermediate", badge: "bg-brand-blue/20 text-brand-accent border-brand-blue/40" },
    ADVANCED: { ar: "متقدم", en: "Advanced", badge: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  };

  return (
    <div className="min-h-screen bg-brand-black text-white selection:bg-brand-blue selection:text-white">
      <Navbar />
      <QuizSubscriptionModal />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-10 pb-20 lg:py-28 border-b border-white/10">
        {/* Background Glow & Coach Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={siteConfig.hero.heroImageUrl}
            alt="Coach EL Masry Calisthenics"
            className="w-full h-full object-cover opacity-25 scale-105 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/85 to-brand-navy/70" />
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-brand-blue/25 rounded-full blur-[140px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6 text-start">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-blue/50 bg-brand-blue/15 text-brand-accent text-xs sm:text-sm font-bold tracking-wide shadow-glow">
                <Trophy className="w-4 h-4 shrink-0" />
                <span>{lang === "ar" ? siteConfig.hero.badgeAr : siteConfig.hero.badgeEn}</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
                {lang === "ar" ? siteConfig.hero.titleAr : siteConfig.hero.titleEn}
              </h1>

              <p className="text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed">
                {lang === "ar" ? siteConfig.hero.subtitleAr : siteConfig.hero.subtitleEn}
              </p>

              {/* Hero CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const bestPlan = pricingPlans.find((p) => p.isBestValue) || pricingPlans[0];
                    setSelectedPlanForQuiz(bestPlan);
                    setIsQuizModalOpen(true);
                  }}
                  className="px-7 py-4 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-accent hover:brightness-110 text-white font-black text-base sm:text-lg shadow-glow-lg flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5"
                >
                  <Flame className="w-5 h-5" />
                  <span>{lang === "ar" ? siteConfig.hero.ctaPrimaryAr : siteConfig.hero.ctaPrimaryEn}</span>
                </button>

                <a
                  href={directWhatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-emerald-400/60 text-white font-bold text-base flex items-center gap-2.5 transition-all"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  <span>{lang === "ar" ? siteConfig.hero.ctaWhatsappAr : siteConfig.hero.ctaWhatsappEn}</span>
                </a>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
                {siteConfig.about.stats.map((st, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md"
                  >
                    <div className="text-2xl sm:text-3xl font-black text-brand-accent">
                      {lang === "ar" ? st.valueAr : st.valueEn}
                    </div>
                    <div className="text-xs text-white/65 font-medium mt-0.5">
                      {lang === "ar" ? st.labelAr : st.labelEn}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Hero Coach Card & Podium Preview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl border border-white/15 bg-gradient-to-b from-white/10 to-black/60 p-3 shadow-glow-lg">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                  <img
                    src={siteConfig.about.photoUrl}
                    alt="EL Masry Calisthenics Champion"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-brand-accent font-bold uppercase tracking-wider">
                          {lang === "ar" ? "بطل الجمهورية والبطولات الدولية" : "CHAMPION CALISTHENICS COACH"}
                        </span>
                        <h2 className="text-xl font-black text-white">CAPTAIN EL MASRY</h2>
                      </div>
                      <span className="text-3xl">🥇</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] text-white/80">
                      <span className="px-2 py-0.5 rounded-md bg-brand-blue/25 border border-brand-blue/40">
                        🥇 iFlag 1st
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-brand-blue/25 border border-brand-blue/40">
                        🥇 EGYFIT 1st
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-brand-blue/25 border border-brand-blue/40">
                        🥇 Move DB 1st
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT EL MASRY & TIMELINE (2019 -> 2022 -> Competitions) */}
      <section id="about" className="py-20 bg-gradient-to-b from-brand-black to-brand-navy border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue/15 border border-brand-blue/40 text-brand-accent text-xs font-bold">
                <Calendar className="w-3.5 h-3.5" />
                <span>2019 → 2022 → CHAMPIONSHIPS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
                {lang === "ar" ? siteConfig.about.titleAr : siteConfig.about.titleEn}
              </h2>
              <p className="text-lg font-semibold text-brand-accent">
                {lang === "ar" ? siteConfig.about.subtitleAr : siteConfig.about.subtitleEn}
              </p>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                {lang === "ar" ? siteConfig.about.storyAr : siteConfig.about.storyEn}
              </p>

              <div className="pt-2">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-brand-blue text-white font-bold text-sm transition-all"
                >
                  <span>{lang === "ar" ? "استعرض باقات التدريب" : "Explore Coaching Plans"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Visual Timeline Cards */}
            <div className="lg:col-span-6 space-y-4">
              {siteConfig.about.timeline.map((item, idx) => (
                <div
                  key={idx}
                  className="relative p-6 rounded-2xl border border-white/15 bg-brand-card/90 hover:border-brand-blue/60 transition-all shadow-glow"
                >
                  <div className="flex items-start gap-4">
                    <div className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-accent text-white font-black text-sm shrink-0">
                      {item.year}
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-lg font-bold text-white">
                        {lang === "ar" ? item.titleAr : item.titleEn}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                        {lang === "ar" ? item.descAr : item.descEn}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACHIEVEMENTS & TROPHY CABINET */}
      <section id="achievements" className="py-20 bg-brand-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold">
              <Award className="w-4 h-4" />
              <span>{lang === "ar" ? "سجل البطولات والإنجازات الرسمية" : "OFFICIAL CHAMPIONSHIP RECORD"}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black">
              {lang === "ar" ? "إنجازات وبطولات الكابتن المصري" : "CHAMPIONSHIP TROPHY CABINET"}
            </h2>
            <p className="text-sm sm:text-base text-white/70">
              {lang === "ar"
                ? "خبرة حقيقية من منصات التتويج في أقوى بطولات الكاليستنكس منذ عام ٢٠٢٢"
                : "Proven competitive excellence across Egypt's premier calisthenics battles since 2022"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {siteConfig.achievements.map((ach) => (
              <div
                key={ach.id}
                className="group relative p-6 rounded-3xl border border-white/15 bg-gradient-to-b from-[#131B2E] to-[#0B0F1A] hover:border-brand-blue transition-all duration-300 hover:-translate-y-1.5 shadow-glow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl group-hover:scale-110 transition-transform">{ach.medal}</span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-brand-blue/20 text-brand-accent border border-brand-blue/30">
                      {lang === "ar" ? ach.rankAr : ach.rankEn}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white mb-1">
                    {lang === "ar" ? ach.titleAr : ach.titleEn}
                  </h3>
                  <p className="text-xs text-white/60">
                    {lang === "ar" ? ach.categoryAr : ach.categoryEn}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                  <span>{ach.year}</span>
                  <Trophy className="w-4 h-4 text-amber-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TRANSFORMATIONS / RESULTS GALLERY */}
      <section id="transformations" className="py-20 bg-gradient-to-b from-brand-navy to-brand-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue/15 border border-brand-blue/40 text-brand-accent text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === "ar" ? "نتائج حقيقية لمتدربينا" : "REAL ATHLETE TRANSFORMATIONS"}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black">
                {lang === "ar" ? "قصص نجاح وتحولات الأبطال" : "CLIENT TRANSFORMATIONS & SKILLS"}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsQuizModalOpen(true)}
              className="self-start md:self-auto px-5 py-3 rounded-xl bg-brand-blue hover:bg-brand-accent text-white font-bold text-xs sm:text-sm shadow-glow transition-all"
            >
              {lang === "ar" ? "كن قصة النجاح القادمة" : "Start Your Transformation"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {transformations.map((tr) => (
              <div
                key={tr.id}
                className="rounded-3xl border border-white/15 bg-brand-card overflow-hidden flex flex-col justify-between hover:border-brand-blue/60 transition-all"
              >
                <div>
                  <div className="grid grid-cols-2 gap-1 bg-black p-1">
                    <div className="relative aspect-[4/5] rounded-tl-2xl overflow-hidden">
                      <img src={tr.beforePhoto} alt="Before" className="w-full h-full object-cover" loading="lazy" />
                      <span className="absolute bottom-2 start-2 px-2 py-0.5 rounded bg-black/75 text-[10px] font-bold text-white/80">
                        {lang === "ar" ? "قبل" : "BEFORE"}
                      </span>
                    </div>
                    <div className="relative aspect-[4/5] rounded-tr-2xl overflow-hidden">
                      <img src={tr.afterPhoto} alt="After" className="w-full h-full object-cover" loading="lazy" />
                      <span className="absolute bottom-2 start-2 px-2 py-0.5 rounded bg-brand-blue text-[10px] font-bold text-white">
                        {lang === "ar" ? "بعد" : "AFTER"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base text-white">
                        {lang === "ar" ? tr.clientNameAr : tr.clientNameEn}
                      </h3>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-brand-blue/20 text-brand-accent font-bold">
                        {lang === "ar" ? tr.durationAr : tr.durationEn}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                      “{lang === "ar" ? tr.quoteAr : tr.quoteEn}”
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (4 STEPS) */}
      <section id="how-it-works" className="py-20 bg-brand-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black">
              {lang === "ar" ? "كيف تبدأ رحلتك في ٤ خطوات؟" : "HOW ONLINE COACHING WORKS"}
            </h2>
            <p className="text-sm sm:text-base text-white/70">
              {lang === "ar"
                ? "نظام متكامل يضمن لك الالتزام والتطور المستمر أسبوعاً بعد أسبوع"
                : "A seamless 4-step system engineered for maximum strength & skill progression"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.howItWorks.map((item, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.06] to-transparent hover:border-brand-blue transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center text-brand-accent font-black text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {lang === "ar" ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {lang === "ar" ? item.descAr : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRICING SECTION & MULTI-CURRENCY SWITCHER */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-brand-navy via-brand-black to-brand-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue/15 border border-brand-blue/40 text-brand-accent text-xs font-bold">
                <Flame className="w-3.5 h-3.5" />
                <span>{lang === "ar" ? "استثمر في قوتك ومهاراتك" : "CHOOSE YOUR COACHING PLAN"}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black">
                {lang === "ar" ? "باقات الاشتراك والتدريب الأونلاين" : "ONLINE COACHING PLANS"}
              </h2>
              <p className="text-sm sm:text-base text-white/70 max-w-2xl">
                {lang === "ar"
                  ? "جميع الباقات تشمل جدولاً مفصلاً لمستواك، مكتبة الفيديوهات الكاملة، ومتابعة أسبوعية مباشرة على واتساب مع الكابتن المصري."
                  : "Every plan includes direct weekly WhatsApp follow-ups with EL Masry, a personalized workout program, and full Exercise Library video access."}
              </p>
            </div>

            {/* Currency Switcher inside Pricing Section as required */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 bg-white/5 border border-white/10 p-3 rounded-2xl">
              <span className="text-xs font-semibold text-white/70">
                {lang === "ar" ? "عرض الأسعار بعملة:" : "Display prices in:"}
              </span>
              <CurrencySwitcher />
            </div>
          </div>

          {/* 5 Pricing Cards Grid */}
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
                        {lang === "ar" ? `الأكثر توفيراً — وفر ${plan.savingPercent}٪` : `BEST VALUE — SAVE ${plan.savingPercent}%`}
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
                    {lang === "ar" ? "اختر الباقة وابدأ التقييم" : "Select Plan & Take Quiz"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Required Currency Note */}
          <p className="text-center text-xs text-white/55 mt-8">
            {lang === "ar"
              ? `* الأسعار المعروضة بعملة (${currency.nameAr} - ${currency.code}) تقريبية. يتم تأكيد السعر النهائي وطريقة الدفع مباشرة عبر واتساب.`
              : `* Prices shown in ${currency.code} (${currency.nameEn}) are approximate. Final billing is confirmed on WhatsApp.`}
          </p>
        </div>
      </section>

      {/* 7. EXERCISE LIBRARY (SEARCHABLE & FILTERABLE WITH VIDEO MODALS) */}
      <section id="exercises" className="py-20 bg-brand-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue/15 border border-brand-blue/40 text-brand-accent text-xs font-bold">
                <Video className="w-3.5 h-3.5" />
                <span>{lang === "ar" ? "شرح تفصيلي بالتكنيك الصحيح" : "INTERACTIVE EXERCISE LIBRARY"}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black">
                {lang === "ar" ? "مكتبة تمارين ومهارات الكاليستنكس" : "CALISTHENICS EXERCISE LIBRARY"}
              </h2>
            </div>
          </div>

          {/* Search & Filters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8 p-4 rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="relative">
              <Search className="w-4 h-4 text-white/40 absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={exSearch}
                onChange={(e) => setExSearch(e.target.value)}
                placeholder={lang === "ar" ? "ابحث عن تمرين أو مهارة..." : "Search exercise or skill..."}
                className="w-full rounded-xl bg-black/60 border border-white/15 focus:border-brand-blue ps-10 pe-3 py-2.5 text-xs sm:text-sm text-white outline-none"
              />
            </div>

            <select
              value={exLevel}
              onChange={(e) => setExLevel(e.target.value)}
              aria-label={lang === "ar" ? "تصفية حسب المستوى" : "Filter by Level"}
              className="rounded-xl bg-black/60 border border-white/15 focus:border-brand-blue px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none"
            >
              <option value="ALL">{lang === "ar" ? "جميع المستويات" : "All Levels"}</option>
              <option value="BEGINNER">{lang === "ar" ? "مبتدئ (Beginner)" : "Beginner"}</option>
              <option value="INTERMEDIATE">{lang === "ar" ? "متوسط (Intermediate)" : "Intermediate"}</option>
              <option value="ADVANCED">{lang === "ar" ? "متقدم (Advanced)" : "Advanced"}</option>
            </select>

            <select
              value={exMuscle}
              onChange={(e) => setExMuscle(e.target.value)}
              aria-label={lang === "ar" ? "تصفية حسب العضلة" : "Filter by Muscle Group"}
              className="rounded-xl bg-black/60 border border-white/15 focus:border-brand-blue px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none"
            >
              <option value="ALL">{lang === "ar" ? "جميع العضلات" : "All Muscle Groups"}</option>
              <option value="BACK">{lang === "ar" ? "الظهر والسحب (Back)" : "Back & Pulling"}</option>
              <option value="SHOULDERS">{lang === "ar" ? "الأكتاف (Shoulders)" : "Shoulders"}</option>
              <option value="CHEST">{lang === "ar" ? "الصدر والدفع (Chest)" : "Chest & Triceps"}</option>
              <option value="CORE">{lang === "ar" ? "البطن والجذع (Core)" : "Core & Compression"}</option>
              <option value="LEGS">{lang === "ar" ? "الأرجل (Legs)" : "Legs"}</option>
              <option value="FULL_BODY">{lang === "ar" ? "جسم كامل (Full Body)" : "Full Body"}</option>
            </select>

            <select
              value={exSkill}
              onChange={(e) => setExSkill(e.target.value)}
              aria-label={lang === "ar" ? "تصفية حسب المهارة" : "Filter by Skill"}
              className="rounded-xl bg-black/60 border border-white/15 focus:border-brand-blue px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none"
            >
              <option value="ALL">{lang === "ar" ? "جميع المهارات" : "All Skills"}</option>
              <option value="PULL_UPS">{lang === "ar" ? "العقلة (Pull-ups)" : "Pull-ups"}</option>
              <option value="MUSCLE_UP">{lang === "ar" ? "الماصل أب (Muscle-up)" : "Muscle-Up"}</option>
              <option value="PLANCHE">{lang === "ar" ? "البلانش (Planche)" : "Planche"}</option>
              <option value="FRONT_LEVER">{lang === "ar" ? "الفرونت ليفر (Front Lever)" : "Front Lever"}</option>
              <option value="HANDSTAND">{lang === "ar" ? "الهاند ستاند (Handstand)" : "Handstand"}</option>
              <option value="DIPS_PUSHUPS">{lang === "ar" ? "المتوازي والضغط (Dips)" : "Dips & Push-ups"}</option>
              <option value="FUNDAMENTALS">{lang === "ar" ? "الأساسيات (Fundamentals)" : "Fundamentals"}</option>
            </select>
          </div>

          {/* Exercise Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredExercises.map((ex) => {
              const lvl = levelLabels[ex.level] || levelLabels.BEGINNER;
              return (
                <div
                  key={ex.id}
                  onClick={() => setActiveExerciseModal(ex)}
                  className="group cursor-pointer rounded-3xl border border-white/15 bg-brand-card overflow-hidden hover:border-brand-blue transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-video bg-black overflow-hidden">
                      <img
                        src={ex.thumbnailUrl}
                        alt={lang === "ar" ? ex.titleAr : ex.titleEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-brand-blue/90 text-white flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-current ms-0.5" />
                        </div>
                      </div>
                      <span
                        className={`absolute top-3 start-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${lvl.badge}`}
                      >
                        {lang === "ar" ? lvl.ar : lvl.en}
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="text-[11px] text-brand-accent font-bold uppercase tracking-wider">
                        {ex.skill.replace("_", " ")} • {ex.muscleGroup}
                      </div>
                      <h3 className="font-bold text-base text-white group-hover:text-brand-accent transition-colors">
                        {lang === "ar" ? ex.titleAr : ex.titleEn}
                      </h3>
                      <p className="text-xs text-white/65 line-clamp-2 leading-relaxed">
                        {lang === "ar" ? ex.descriptionAr : ex.descriptionEn}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-4 pt-2 flex items-center justify-between text-xs text-brand-accent font-semibold">
                    <span>{lang === "ar" ? "شاهد فيديو الشرح والتكنيك" : "Watch Video & Cues"}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXERCISE VIDEO MODAL */}
      {activeExerciseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl rounded-3xl border border-white/15 bg-[#0D1320] text-white shadow-glow-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h3 className="font-bold text-lg">
                {lang === "ar" ? activeExerciseModal.titleAr : activeExerciseModal.titleEn}
              </h3>
              <button
                type="button"
                onClick={() => setActiveExerciseModal(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10">
                <iframe
                  src={activeExerciseModal.videoUrl}
                  title={activeExerciseModal.titleEn}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                {lang === "ar" ? activeExerciseModal.descriptionAr : activeExerciseModal.descriptionEn}
              </p>
              {((lang === "ar" ? activeExerciseModal.cuesAr : activeExerciseModal.cuesEn) || []).length > 0 && (
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-accent">
                    {lang === "ar" ? "أهم نقاط الأداء الصحيح (Coaching Cues):" : "Key Coaching Cues:"}
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-white/85">
                    {(lang === "ar" ? activeExerciseModal.cuesAr : activeExerciseModal.cuesEn).map((cue, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                        <span>{cue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 8. TESTIMONIALS & FAQ */}
      <section id="faq" className="py-20 bg-gradient-to-b from-brand-navy to-brand-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Testimonials */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <h2 className="text-3xl sm:text-5xl font-black">
                {lang === "ar" ? "آراء أبطال الكابتن المصري" : "WHAT OUR ATHLETES SAY"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {siteConfig.testimonials.map((t) => (
                <div
                  key={t.id}
                  className="p-6 rounded-3xl border border-white/15 bg-brand-card space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      “{lang === "ar" ? t.textAr : t.textEn}”
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10">
                    <div className="font-bold text-sm text-white">
                      {lang === "ar" ? t.nameAr : t.nameEn}
                    </div>
                    <div className="text-xs text-brand-accent font-medium">
                      {lang === "ar" ? t.levelAr : t.levelEn}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-4xl font-black text-center mb-8">
              {lang === "ar" ? "الأسئلة الشائعة (FAQ)" : "FREQUENTLY ASKED QUESTIONS"}
            </h3>
            <div className="space-y-3">
              {siteConfig.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/15 bg-brand-card overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full px-6 py-4 text-start flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-brand-accent transition-colors"
                    >
                      <span>{lang === "ar" ? faq.qAr : faq.qEn}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-brand-accent shrink-0 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-xs sm:text-sm text-white/75 leading-relaxed border-t border-white/5 pt-3">
                        {lang === "ar" ? faq.aAr : faq.aEn}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 9. CONTACT & FOOTER */}
      <footer className="bg-[#060911] pt-16 pb-12 text-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="p-8 sm:p-12 rounded-3xl border border-brand-blue/40 bg-gradient-to-r from-[#0F1B35] via-[#0B1324] to-[#0A0A0A] shadow-glow flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-start">
              <h2 className="text-2xl sm:text-4xl font-black text-white">
                {lang === "ar"
                  ? "هل أنت جاهز لبناء أقوى نسخة من نفسك؟"
                  : "READY TO MASTER YOUR BODYWEIGHT?"}
              </h2>
              <p className="text-sm text-white/75">
                {lang === "ar"
                  ? "ابدأ اختبار تحديد المستوى الآن أو تواصل مباشرة مع الكابتن المصري عبر واتساب."
                  : "Take the 60-second level assessment quiz or message Coach EL Masry directly on WhatsApp."}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsQuizModalOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-accent text-white font-bold text-sm shadow-glow"
              >
                {lang === "ar" ? "ابدأ اختبار المستوى الآن" : "Start Level Quiz"}
              </button>
              <a
                href={directWhatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === "ar" ? "تواصل عبر واتساب" : "WhatsApp Coach"}</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center text-white">
                <Dumbbell className="w-4 h-4" />
              </div>
              <span className="font-bold text-white">EL MASRY CALISTHENICS</span>
              <span>© {new Date().getFullYear()}</span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={siteConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-accent transition-colors flex items-center gap-1"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>
              <a
                href={siteConfig.contact.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-accent transition-colors"
              >
                TikTok
              </a>
              <a
                href={siteConfig.contact.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-accent transition-colors flex items-center gap-1"
              >
                <Youtube className="w-4 h-4" />
                <span>YouTube</span>
              </a>
              <a href="/client" className="hover:text-white">
                {lang === "ar" ? "منطقة المتدرب" : "Client Portal"}
              </a>
              <a href="/admin" className="hover:text-brand-accent">
                {lang === "ar" ? "لوحة الإدارة" : "Admin"}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

