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
  CheckCircle2,
  ShieldCheck,
  Dumbbell,
} from "lucide-react";

const CHAMPION_GALLERY = [
  {
    src: "/images/coach/image2.jpeg",
    badgeAr: "المركز الأول 🥇 — جائزة ٢٠,٠٠٠ جنيه",
    badgeEn: "1ST PLACE 🥇 — 20,000 EGP PRIZE",
    titleAr: "بطولة MOVE × D-Bay Beach Competition",
    titleEn: "MOVE × D-Bay Beach Calisthenics Men",
    subtitleAr: "التتويج بالمركز الأول في منافسات الكاليستنكس للرجال على الشاطئ",
    subtitleEn: "Crowned 1st Place Champion in Men's Beach Calisthenics Division",
  },
  {
    src: "/images/coach/image3.jpeg",
    badgeAr: "منصة التتويج 🥈 — جائزة ٢٥,٠٠٠ جنيه",
    badgeEn: "PODIUM FINISH 🥈 — 25,000 EGP PRIZE",
    titleAr: "مهرجان MOVE Summer Festival — Cali Coast",
    titleEn: "MOVE Summer Festival — Strength Men Podium",
    subtitleAr: "منصة تتويج أبطال القوة في الساحل الشمالي وسط أقوى لاعبي مصر",
    subtitleEn: "Official Podium ceremony for Calisthenics Strength Men at Cali Coast",
  },
  {
    src: "/images/coach/image4.jpeg",
    badgeAr: "المركز الثاني 🥈 — كاليستنكس قوة",
    badgeEn: "2ND PLACE 🥈 — CALISTHENICS STRENGTH",
    titleAr: "تكريم الحكام — MOVE × Cali Coast",
    titleEn: "Official Award Handover — Ras El Hekma",
    subtitleAr: "لحظة استلام درع المركز الثاني وجائزة الـ ٢٥,٠٠٠ جنيه في منافسات القوة",
    subtitleEn: "Official trophy & check presentation with competition judges",
  },
  {
    src: "/images/coach/image8.jpeg",
    badgeAr: "قوة انفجارية ⚡ — ماصل أب ومتوازي بالوزن",
    badgeEn: "WEIGHTED POWER ⚡ — STRICT BAR WORK",
    titleAr: "التحكم الكامل والأداء القياسي",
    titleEn: "Weighted Bar Transition & Strict Lockout",
    subtitleAr: "التدريب الفعلي بحزام الأوزان لبناء أقصى قوة سحب ودفع",
    subtitleEn: "High-tension weighted calisthenics conditioning outdoors",
  },
];

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
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const waNumber = (siteConfig.contact?.whatsappNumber || "201099999999").replace(/\D/g, "");
  const directWhatsappLink = `https://wa.me/${waNumber}`;

  return (
    <>
      {/* =====================================================================
          1. HERO SECTION — SPLIT CHECKERBOARD & ROYAL BLUE/BLACK/GREY/WHITE
         ===================================================================== */}
      <section className="relative overflow-hidden bg-brand-black border-b-4 border-brand-blue">
        {/* Background Split Architecture */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-tech-grid-dark opacity-70" />
          <div className="hidden lg:block absolute top-0 bottom-0 end-0 w-[46%] bg-gradient-to-b from-brand-royal via-brand-navy to-brand-black border-s border-brand-blue/30" />
          <div className="absolute -top-32 start-1/4 w-[620px] h-[380px] bg-brand-blue/25 rounded-full blur-[140px]" />
        </div>

        {/* Top Trapezoid Badge — Inspired by Image 5 & 6 */}
        <div className="relative z-10 flex justify-center">
          <div className="clip-banner-top bg-brand-blue px-10 py-1.5 shadow-glow">
            <span className="font-display tracking-[0.25em] text-xs sm:text-sm font-black text-white uppercase">
              EL MASRY CALISTHENICS • MASTER YOUR OWN BODY, DEFY GRAVITY
            </span>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Hero Text & White/Light-Grey Contrast Panel */}
            <div className="lg:col-span-7 space-y-6 text-start">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-brand-grey-mid/30 bg-brand-white text-brand-navy text-xs sm:text-sm font-black tracking-wide shadow-md">
                <Trophy className="w-4 h-4 text-brand-blue shrink-0" />
                <span>{lang === "ar" ? siteConfig.hero.badgeAr : siteConfig.hero.badgeEn}</span>
              </div>

              <div className="space-y-2">
                <div className="text-xs sm:text-sm font-black uppercase tracking-[0.22em] text-brand-grey-mid">
                  {lang === "ar"
                    ? "القوة تُكتسب بالالتزام • قوّة حقيقية من الصفر"
                    : "STRENGTH IS EARNED • AUTHENTIC POWER"}
                </div>
                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]">
                  {lang === "ar" ? siteConfig.hero.titleAr : siteConfig.hero.titleEn}
                </h1>
              </div>

              <p className="text-base sm:text-lg text-brand-grey max-w-2xl leading-relaxed font-medium">
                {lang === "ar" ? siteConfig.hero.subtitleAr : siteConfig.hero.subtitleEn}
              </p>

              {/* High-Contrast Light Grey & White Program Benefits Strip (Inspired by Image 5) */}
              <div className="rounded-2xl bg-brand-grey text-brand-black p-4 sm:p-5 border-s-8 border-brand-blue shadow-card-dark max-w-2xl">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-black uppercase tracking-wider text-brand-royal">
                    {lang === "ar" ? "مميزات برنامج التدريب الأونلاين:" : "ONLINE PROGRAM BENEFITS:"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-navy text-white text-[11px] font-bold">
                    Muscles From Nothing
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs sm:text-sm font-extrabold text-brand-black">
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-brand-grey-mid">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                    <span>{lang === "ar" ? "برامج من المبتدئ للمحترف" : "Beginner to Pro Programs"}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-brand-grey-mid">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                    <span>{lang === "ar" ? "تصحيح الأداء أسبوعياً بالفيديو" : "Weekly Video Feedback"}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-brand-grey-mid">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                    <span>{lang === "ar" ? "لوحة متابعة تطورك" : "Progress Dashboard"}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const bestPlan = pricingPlans.find((p) => p.isBestValue) || pricingPlans[0];
                    setSelectedPlanForQuiz(bestPlan);
                    setIsQuizModalOpen(true);
                  }}
                  className="px-8 py-4 rounded-2xl bg-brand-blue hover:bg-brand-accent text-white font-black text-base sm:text-lg shadow-glow-lg flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 border border-white/20"
                >
                  <Flame className="w-5 h-5" />
                  <span>{lang === "ar" ? siteConfig.hero.ctaPrimaryAr : siteConfig.hero.ctaPrimaryEn}</span>
                </button>

                <a
                  href={directWhatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-2xl bg-white hover:bg-brand-grey text-brand-black font-black text-base flex items-center gap-2.5 transition-all shadow-md"
                >
                  <MessageCircle className="w-5 h-5 text-brand-blue" />
                  <span>{lang === "ar" ? siteConfig.hero.ctaWhatsappAr : siteConfig.hero.ctaWhatsappEn}</span>
                </a>
              </div>

              {/* Stats Grid: Alternating White & Navy/Black Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                {siteConfig.about.stats.map((st, i) => {
                  const isLight = i % 2 === 0;
                  return (
                    <div
                      key={i}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isLight
                          ? "bg-white text-brand-black border-brand-grey-mid shadow-md"
                          : "bg-brand-navy text-white border-brand-blue/40 shadow-glow"
                      }`}
                    >
                      <div
                        className={`text-2xl sm:text-3xl font-black ${
                          isLight ? "text-brand-blue" : "text-white"
                        }`}
                      >
                        {lang === "ar" ? st.valueAr : st.valueEn}
                      </div>
                      <div
                        className={`text-xs font-bold mt-0.5 ${
                          isLight ? "text-brand-black/75" : "text-brand-grey"
                        }`}
                      >
                        {lang === "ar" ? st.labelAr : st.labelEn}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hero Right Visual Collage — Featuring Uploaded PDF Photos (Image 6, Image 1, Image 8, Image 7) */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Main Poster Frame */}
                <div className="relative rounded-3xl border-2 border-brand-grey/40 bg-gradient-to-b from-brand-royal via-brand-navy to-brand-black p-2.5 shadow-glow-lg">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-brand-navy">
                    <img
                      src={siteConfig.hero.heroImageUrl || "/images/coach/image6.jpeg"}
                      alt="EL Masry Master Your Own Body Defy Gravity"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />

                    {/* Bottom White & Blue Champion Tag */}
                    <div className="absolute bottom-3 inset-x-3 p-4 rounded-2xl bg-white/95 backdrop-blur-md text-brand-black border-2 border-brand-blue shadow-xl">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[11px] text-brand-blue font-black uppercase tracking-wider block">
                            {lang === "ar"
                              ? "بطل الكاليستنكس المصري الرسمي"
                              : "OFFICIAL EGYPTIAN CALISTHENICS CHAMPION"}
                          </span>
                          <h2 className="text-lg sm:text-xl font-black text-brand-black leading-tight">
                            CAPTAIN EL MASRY
                          </h2>
                        </div>
                        <div className="px-3 py-1 rounded-xl bg-brand-black text-white font-black text-xs shrink-0">
                          🇪🇬 EG
                        </div>
                      </div>
                      <div className="mt-2.5 flex flex-wrap gap-1.5 text-[11px] font-extrabold">
                        <span className="px-2.5 py-0.5 rounded-md bg-brand-blue text-white">
                          🥇 Move DB 1st
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-brand-navy text-brand-grey">
                          🥇 iFlag 1st
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-brand-grey text-brand-black border border-brand-grey-mid">
                          🥈 Cali Coast 2nd
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Action Thumbnail Top-Start (Image 1 - Dip Lockout) */}
                <div className="hidden sm:block absolute -top-5 -start-6 w-28 h-36 rounded-2xl overflow-hidden border-2 border-white shadow-card-dark bg-brand-black rotate-[-4deg] hover:rotate-0 transition-transform">
                  <img
                    src="/images/coach/image1.jpeg"
                    alt="EL Masry Parallel Bar Lockout"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-brand-blue/90 text-white text-[9px] font-black text-center py-0.5 uppercase">
                    Strict Power
                  </div>
                </div>

                {/* Floating Action Thumbnail Top-End (Image 8 - Weighted Bar) */}
                <div className="hidden sm:block absolute -bottom-5 -end-5 w-32 h-32 rounded-2xl overflow-hidden border-2 border-brand-blue shadow-card-dark bg-brand-black rotate-[3deg] hover:rotate-0 transition-transform">
                  <img
                    src="/images/coach/image8.jpeg"
                    alt="EL Masry Weighted Bar Muscle Up"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-white text-brand-black text-[9px] font-black text-center py-0.5 uppercase">
                    Weighted Skills
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. ABOUT & CHECKERBOARD COLLAGE — LIGHT GREY & WHITE ARCHITECTURAL ZONE
         ===================================================================== */}
      <section
        id="about"
        className="py-20 bg-brand-grey text-brand-black border-b-4 border-brand-navy bg-tech-grid-light"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Visual: Image 5 Poster + Image 7 Portrait + Image 1 */}
            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-3xl overflow-hidden border-4 border-brand-black shadow-card-light bg-white p-2">
                <img
                  src={siteConfig.about.photoUrl || "/images/coach/image5.jpeg"}
                  alt="EL Masry Online Calisthenics Program"
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden border-2 border-brand-navy bg-brand-black relative aspect-[4/3] group">
                  <img
                    src="/images/coach/image7.jpeg"
                    alt="Coach EL Masry Muscles From Nothing"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 inset-x-2 px-2.5 py-1 rounded-lg bg-brand-black/85 text-white text-[11px] font-bold text-center border border-white/15">
                    "Muscles From Nothing"
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border-2 border-brand-blue bg-brand-navy relative aspect-[4/3] group">
                  <img
                    src="/images/coach/image1.jpeg"
                    alt="Coach EL Masry Dip Bars"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 inset-x-2 px-2.5 py-1 rounded-lg bg-brand-blue text-white text-[11px] font-bold text-center">
                    {lang === "ar" ? "تحكم وقوة عضلية صافية" : "Pure Bodyweight Anatomy"}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Story & Timeline */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-navy text-white text-xs font-black tracking-wider uppercase shadow-sm">
                <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                <span>2019 → 2022 → CHAMPIONSHIP PODIUMS</span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-brand-black">
                {lang === "ar" ? siteConfig.about.titleAr : siteConfig.about.titleEn}
              </h2>

              <p className="text-lg font-extrabold text-brand-blue">
                {lang === "ar" ? siteConfig.about.subtitleAr : siteConfig.about.subtitleEn}
              </p>

              <p className="text-sm sm:text-base text-brand-black/80 leading-relaxed font-medium bg-white p-5 rounded-2xl border border-brand-grey-mid shadow-sm">
                {lang === "ar" ? siteConfig.about.storyAr : siteConfig.about.storyEn}
              </p>

              {/* Timeline Cards — Alternating White and Deep Black/Navy */}
              <div className="space-y-3.5">
                {siteConfig.about.timeline.map((item, idx) => {
                  const isDarkCard = idx === 1;
                  return (
                    <div
                      key={idx}
                      className={`relative p-5 rounded-2xl border-2 transition-all ${
                        isDarkCard
                          ? "bg-brand-black text-white border-brand-blue shadow-card-dark"
                          : "bg-white text-brand-black border-brand-grey-mid hover:border-brand-blue shadow-card-light"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="px-3.5 py-1.5 rounded-xl bg-brand-blue text-white font-black text-sm shrink-0 shadow-glow">
                          {item.year}
                        </div>
                        <div className="space-y-1">
                          <h3
                            className={`text-base sm:text-lg font-black ${
                              isDarkCard ? "text-white" : "text-brand-black"
                            }`}
                          >
                            {lang === "ar" ? item.titleAr : item.titleEn}
                          </h3>
                          <p
                            className={`text-xs sm:text-sm leading-relaxed font-medium ${
                              isDarkCard ? "text-brand-grey" : "text-brand-black/75"
                            }`}
                          >
                            {lang === "ar" ? item.descAr : item.descEn}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-black hover:bg-brand-blue text-white font-black text-sm transition-all shadow-md"
                >
                  <span>{lang === "ar" ? "استعرض باقات التدريب" : "Explore Coaching Plans"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsQuizModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-royal text-white font-black text-sm transition-all shadow-glow"
                >
                  <Dumbbell className="w-4 h-4" />
                  <span>{lang === "ar" ? "ابدأ تقييم مستواك" : "Take Level Assessment"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. ACHIEVEMENTS & REAL PODIUM GALLERY — BLACK + ROYAL BLUE + WHITE
         ===================================================================== */}
      <section
        id="achievements"
        className="py-24 bg-gradient-to-b from-brand-black via-brand-navy to-brand-black border-b-4 border-brand-blue relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-tech-grid-dark opacity-40 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/20 border border-brand-blue text-white text-xs font-black tracking-wider uppercase shadow-glow">
              <Award className="w-4 h-4 text-brand-accent" />
              <span>
                {lang === "ar"
                  ? "سجل البطولات الرسمية وصور التتويج الحقيقية"
                  : "OFFICIAL CHAMPIONSHIP RECORD & PODIUM GALLERY"}
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white">
              {lang === "ar"
                ? "إنجازات ومنصات تتويج الكابتن المصري"
                : "CHAMPIONSHIP PODIUMS & TROPHY CABINET"}
            </h2>
            <p className="text-sm sm:text-base text-brand-grey">
              {lang === "ar"
                ? "توثيق حقيقي من أرض البطولات الرسمية في مصر (MOVE Beach Competition، Cali Coast Summer Festival، iFlag، EGYFIT)"
                : "Verified championship victories and podium finishes across Egypt's premier calisthenics competitions."}
            </p>
          </div>

          {/* Real Podium Photo Showcase (Images 2, 3, 4, 8 from the uploaded PDF) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CHAMPION_GALLERY.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedGalleryImg(item.src)}
                className="group cursor-pointer rounded-3xl overflow-hidden border-2 border-brand-grey/25 bg-brand-grey text-brand-black shadow-card-dark hover:border-brand-blue transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
              >
                <div>
                  <div className="relative aspect-[4/5] bg-brand-black overflow-hidden">
                    <img
                      src={item.src}
                      alt={lang === "ar" ? item.titleAr : item.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/85 via-transparent to-transparent" />
                    <div className="absolute top-3 start-3 px-3 py-1 rounded-full bg-brand-blue text-white text-[11px] font-black shadow-glow">
                      {lang === "ar" ? item.badgeAr : item.badgeEn}
                    </div>
                  </div>
                  <div className="p-5 bg-white space-y-1.5">
                    <h3 className="font-black text-base text-brand-black group-hover:text-brand-blue transition-colors">
                      {lang === "ar" ? item.titleAr : item.titleEn}
                    </h3>
                    <p className="text-xs text-brand-black/75 font-medium leading-relaxed">
                      {lang === "ar" ? item.subtitleAr : item.subtitleEn}
                    </p>
                  </div>
                </div>
                <div className="px-5 py-3 bg-brand-grey border-t border-brand-grey-mid flex items-center justify-between text-[11px] font-black text-brand-navy">
                  <span>{lang === "ar" ? "اضغط لتكبير الصورة" : "Click to enlarge photo"}</span>
                  <ArrowUpRight className="w-4 h-4 text-brand-blue" />
                </div>
              </div>
            ))}
          </div>

          {/* 5 Official Championship Record Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {siteConfig.achievements.map((ach, index) => {
              const isHighlighted = index % 2 === 0;
              return (
                <div
                  key={ach.id}
                  className={`group relative p-5 rounded-3xl border-2 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${
                    isHighlighted
                      ? "bg-brand-navy border-brand-blue text-white shadow-glow"
                      : "bg-brand-black border-white/20 text-white hover:border-brand-blue"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl">{ach.medal}</span>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-white text-brand-black">
                        {lang === "ar" ? ach.rankAr : ach.rankEn}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-white mb-1">
                      {lang === "ar" ? ach.titleAr : ach.titleEn}
                    </h3>
                    <p className="text-xs text-brand-grey font-medium">
                      {lang === "ar" ? ach.categoryAr : ach.categoryEn}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-brand-grey font-bold">
                    <span>{ach.year}</span>
                    <Trophy className="w-4 h-4 text-brand-accent" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. TRANSFORMATIONS & ATHLETE RESULTS — CRISP WHITE & LIGHT GREY ZONE
         ===================================================================== */}
      <section
        id="transformations"
        className="py-20 bg-white text-brand-black border-b-4 border-brand-black"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-grey border border-brand-grey-mid text-brand-navy text-xs font-black uppercase">
                <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                <span>{lang === "ar" ? "نتائج حقيقية لمتدربينا" : "REAL ATHLETE TRANSFORMATIONS"}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-black text-brand-black">
                {lang === "ar" ? "قصص نجاح وتحولات الأبطال" : "CLIENT TRANSFORMATIONS & SKILLS"}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsQuizModalOpen(true)}
              className="self-start md:self-auto px-6 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-navy text-white font-black text-xs sm:text-sm shadow-glow transition-all"
            >
              {lang === "ar" ? "كن قصة النجاح القادمة" : "Start Your Transformation"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {transformations.map((tr) => (
              <div
                key={tr.id}
                className="rounded-3xl border-2 border-brand-grey-mid bg-brand-grey overflow-hidden flex flex-col justify-between hover:border-brand-blue transition-all shadow-card-light"
              >
                <div>
                  <div className="grid grid-cols-2 gap-1.5 bg-brand-black p-1.5">
                    <div className="relative aspect-[4/5] rounded-s-2xl overflow-hidden">
                      <img
                        src={tr.beforePhoto}
                        alt="Before"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute bottom-2 start-2 px-2.5 py-0.5 rounded-md bg-brand-black/90 text-[10px] font-black text-brand-grey border border-white/20">
                        {lang === "ar" ? "البداية" : "START"}
                      </span>
                    </div>
                    <div className="relative aspect-[4/5] rounded-e-2xl overflow-hidden">
                      <img
                        src={tr.afterPhoto}
                        alt="After"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute bottom-2 start-2 px-2.5 py-0.5 rounded-md bg-brand-blue text-[10px] font-black text-white shadow-glow">
                        {lang === "ar" ? "النتيجة" : "RESULT"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-2.5 bg-white">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-black text-base text-brand-black">
                        {lang === "ar" ? tr.clientNameAr : tr.clientNameEn}
                      </h3>
                      <span className="text-xs px-3 py-1 rounded-full bg-brand-navy text-white font-bold shrink-0">
                        {lang === "ar" ? tr.durationAr : tr.durationEn}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-brand-black/80 font-medium leading-relaxed">
                      “{lang === "ar" ? tr.quoteAr : tr.quoteEn}”
                    </p>
                  </div>
                </div>
                <div className="px-6 py-3 bg-brand-grey border-t border-brand-grey-mid flex items-center justify-between text-xs font-extrabold text-brand-navy">
                  <span>{tr.levelAchieved} TIER</span>
                  <ShieldCheck className="w-4 h-4 text-brand-blue" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. HOW IT WORKS — ROYAL BLUE & BLACK GEOMETRIC ARCHITECTURE
         ===================================================================== */}
      <section
        id="how-it-works"
        className="py-20 bg-brand-navy text-white border-b-4 border-brand-blue bg-tech-grid-dark"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="px-4 py-1 rounded-full bg-white text-brand-navy text-xs font-black uppercase tracking-wider">
              {lang === "ar" ? "نظام تدريبي احترافي" : "4-STEP COACHING SYSTEM"}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white">
              {lang === "ar" ? "كيف تبدأ رحلتك في ٤ خطوات؟" : "HOW ONLINE COACHING WORKS"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.howItWorks.map((item, idx) => {
              const isWhiteStep = idx % 2 === 1;
              return (
                <div
                  key={idx}
                  className={`relative p-6 rounded-3xl border-2 transition-all ${
                    isWhiteStep
                      ? "bg-brand-grey text-brand-black border-white shadow-card-dark"
                      : "bg-brand-black text-white border-brand-blue/60 shadow-glow"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg mb-4 ${
                      isWhiteStep
                        ? "bg-brand-blue text-white shadow-md"
                        : "bg-white text-brand-black"
                    }`}
                  >
                    {item.step}
                  </div>
                  <h3
                    className={`text-lg font-black mb-2 ${
                      isWhiteStep ? "text-brand-black" : "text-white"
                    }`}
                  >
                    {lang === "ar" ? item.titleAr : item.titleEn}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed font-medium ${
                      isWhiteStep ? "text-brand-black/80" : "text-brand-grey"
                    }`}
                  >
                    {lang === "ar" ? item.descAr : item.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. TESTIMONIALS & FAQ — LIGHT GREY & BLACK CONTRAST SECTION
         ===================================================================== */}
      <section
        id="faq"
        className="py-20 bg-brand-grey text-brand-black border-b-4 border-brand-navy bg-tech-grid-light"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <div>
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-brand-blue text-white text-xs font-black uppercase">
                {lang === "ar" ? "ثقة المتدربين" : "ATHLETE REVIEWS"}
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black text-brand-black">
                {lang === "ar" ? "آراء أبطال الكابتن المصري" : "WHAT OUR ATHLETES SAY"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {siteConfig.testimonials.map((t, idx) => {
                const isCenter = idx === 1;
                return (
                  <div
                    key={t.id}
                    className={`p-6 rounded-3xl border-2 space-y-4 flex flex-col justify-between ${
                      isCenter
                        ? "bg-brand-black text-white border-brand-blue shadow-card-dark"
                        : "bg-white text-brand-black border-brand-grey-mid shadow-card-light"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-1 text-brand-blue">
                        {Array.from({ length: t.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p
                        className={`text-xs sm:text-sm leading-relaxed font-medium ${
                          isCenter ? "text-brand-grey" : "text-brand-black/80"
                        }`}
                      >
                        “{lang === "ar" ? t.textAr : t.textEn}”
                      </p>
                    </div>
                    <div
                      className={`pt-3 border-t ${
                        isCenter ? "border-white/15" : "border-brand-grey-mid"
                      }`}
                    >
                      <div
                        className={`font-black text-sm ${
                          isCenter ? "text-white" : "text-brand-black"
                        }`}
                      >
                        {lang === "ar" ? t.nameAr : t.nameEn}
                      </div>
                      <div className="text-xs text-brand-blue font-bold mt-0.5">
                        {lang === "ar" ? t.levelAr : t.levelEn}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <h3 className="font-display text-2xl sm:text-4xl font-black text-center mb-8 text-brand-black">
              {lang === "ar" ? "الأسئلة الشائعة (FAQ)" : "FREQUENTLY ASKED QUESTIONS"}
            </h3>
            <div className="space-y-3">
              {siteConfig.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border-2 overflow-hidden transition-all ${
                      isOpen
                        ? "border-brand-blue bg-brand-black text-white shadow-card-dark"
                        : "border-brand-grey-mid bg-white text-brand-black"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full px-6 py-4 text-start flex items-center justify-between gap-4 font-black text-sm sm:text-base"
                    >
                      <span>{lang === "ar" ? faq.qAr : faq.qEn}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-brand-blue shrink-0 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-xs sm:text-sm text-brand-grey leading-relaxed border-t border-white/15 pt-3 font-medium">
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

      {/* Lightbox Modal for Championship Photos */}
      {selectedGalleryImg && (
        <div
          onClick={() => setSelectedGalleryImg(null)}
          className="fixed inset-0 z-50 bg-brand-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="max-w-3xl w-full rounded-3xl overflow-hidden border-2 border-brand-blue bg-brand-black p-2 shadow-glow-lg">
            <img
              src={selectedGalleryImg}
              alt="EL Masry Championship"
              className="w-full max-h-[82vh] object-contain rounded-2xl bg-black"
            />
          </div>
        </div>
      )}
    </>
  );
}
