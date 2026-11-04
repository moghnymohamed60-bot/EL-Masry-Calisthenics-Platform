import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Trophy,
  Flame,
  MessageCircle,
  Calendar,
  ArrowUpRight,
  Award,
  Sparkles,
  Star,
  ChevronDown,
} from "lucide-react";

export function HomeSections() {
  const {
    lang,
    siteConfig,
    pricingPlans,
    transformations,
    setSelectedPlanForQuiz,
    setIsQuizModalOpen,
  } = useApp();

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const waNumber = (siteConfig.contact?.whatsappNumber || "201099999999").replace(/\D/g, "");
  const directWhatsappLink = `https://wa.me/${waNumber}`;

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-10 pb-20 lg:py-28 border-b border-white/10">
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

      {/* 2. ABOUT & TIMELINE */}
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

      {/* 3. ACHIEVEMENTS TROPHY CABINET */}
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

      {/* 4. TRANSFORMATIONS */}
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

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-brand-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black">
              {lang === "ar" ? "كيف تبدأ رحلتك في ٤ خطوات؟" : "HOW ONLINE COACHING WORKS"}
            </h2>
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

      {/* 8. TESTIMONIALS & FAQ */}
      <section id="faq" className="py-20 bg-gradient-to-b from-brand-navy to-brand-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
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
    </>
  );
}

