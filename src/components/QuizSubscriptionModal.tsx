"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { calculatePlanPrice, formatCurrencyPrice } from "@/lib/currency";
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Trophy,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  UserCheck,
  CreditCard,
} from "lucide-react";

export function QuizSubscriptionModal() {
  const {
    lang,
    currency,
    pricingPlans,
    quizConfig,
    siteConfig,
    selectedPlanForQuiz,
    setSelectedPlanForQuiz,
    isQuizModalOpen,
    setIsQuizModalOpen,
  } = useApp();

  const activePlan = selectedPlanForQuiz || pricingPlans.find((p) => p.isBestValue) || pricingPlans[0];

  // Step 1: Client Sign-up Details
  // Step 2: 1-Question-Per-Screen Interactive Level Quiz
  // Step 3: Level Assessment Summary & Checkout / WhatsApp Confirmation
  const [step, setStep] = useState<"FORM" | "QUIZ" | "RESULT">("FORM");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  // Client Form State
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [goal, setGoal] = useState("");
  const [injuries, setInjuries] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"WHATSAPP" | "INSTAPAY" | "PAYMOB" | "FAWRY">("WHATSAPP");

  const [submitting, setSubmitting] = useState(false);
  const [submittedSubId, setSubmittedSubId] = useState<string | null>(null);
  const [formError, setFormError] = useState("");

  if (!isQuizModalOpen || !activePlan) return null;

  const questions = quizConfig.questions || [];
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  // Calculate Quiz Score & Classified Level
  const totalScore = Object.values(answers).reduce((acc, pts) => acc + pts, 0);
  const assessedLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" =
    totalScore >= quizConfig.advancedThreshold
      ? "ADVANCED"
      : totalScore >= quizConfig.intermediateThreshold
      ? "INTERMEDIATE"
      : "BEGINNER";

  const levelBadge = {
    BEGINNER: {
      ar: "مبتدئ (Beginner)",
      en: "Beginner Tier",
      descAr:
        "تركيزنا في المرحلة الأولى سيكون على التأسيس السليم، بناء القوة الأساسية في العقلة والمتوازي والضغط، وتقوية المفاصل والأوتار للوصول لأول مهاراتك بأمان.",
      descEn:
        "Your custom program focuses on joint bulletproofing, strict pulling & pushing strength, core compression, and unlocking your first clean milestones.",
      color: "from-emerald-500 to-teal-600",
    },
    INTERMEDIATE: {
      ar: "متوسط (Intermediate)",
      en: "Intermediate Tier",
      descAr:
        "لديك أساس بدني قوي! جدولك سيركز على القوة الانفجارية لإتقان الماصل أب، الهاند ستاند الحر، والبدء في تدرجات الفرونت ليفر والبلانش.",
      descEn:
        "You have a solid foundation! Your weekly protocol targets explosive Muscle-Ups, freestanding Handstand balance, and Tuck/Advanced-Tuck static progressions.",
      color: "from-brand-blue to-brand-accent",
    },
    ADVANCED: {
      ar: "متقدم / بطولات (Advanced)",
      en: "Advanced / Competition Tier",
      descAr:
        "مستوى احترافي! خطتك مصممة بأسلوب أبطال البطولات لإتقان الثبات الكامل (Straddle/Full Planche & Front Lever) وزيادة قوة التحمل العالي.",
      descEn:
        "Elite level! Your periodized plan focuses on competition-grade Straddle/Full Planche, Full Front Lever holds, and high-tension dynamic combinations.",
      color: "from-amber-500 to-orange-600",
    },
  }[assessedLevel];

  const displayedPrice = calculatePlanPrice(activePlan.priceEgp, currency, activePlan.overrides);
  const formattedDisplayedPrice = formatCurrencyPrice(displayedPrice, currency, lang);

  const handleStartQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      setFormError(
        lang === "ar"
          ? "يرجى إدخال الاسم ورقم الواتساب للمتابعة"
          : "Please enter your name and WhatsApp phone number"
      );
      return;
    }
    setFormError("");
    setCurrentQuestionIndex(0);
    setStep("QUIZ");
  };

  const handleSelectOption = (points: number) => {
    const qId = currentQuestion.id;
    const updated = { ...answers, [qId]: points };
    setAnswers(updated);

    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStep("RESULT");
    }
  };

  const handleConfirmSubscription = async (openWhatsAppAfter: boolean) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          clientPhone,
          clientEmail: clientEmail || `${clientPhone.replace(/\D/g, "")}@client.elmasry.com`,
          password: password || "Client@2026",
          age,
          heightCm,
          weightKg,
          goal,
          injuries,
          assessedLevel,
          quizScore: totalScore,
          quizAnswers: answers,
          planId: activePlan.id,
          currencyCode: currency.code,
          exchangeRateUsed: currency.rateFromEgp,
          displayedAmount: displayedPrice,
          paymentMethod,
        }),
      });
      const data = await res.json();
      if (data.subscription?.id) {
        setSubmittedSubId(data.subscription.id);
      }

      if (openWhatsAppAfter) {
        const waNumber = (siteConfig.contact?.whatsappNumber || "201099999999").replace(/\D/g, "");
        const message =
          lang === "ar"
            ? `مرحباً كابتن المصري 💪\nأرغب في تأكيد اشتراكي في التدريب الأونلاين:\n• الاسم: ${clientName}\n• الهاتف: ${clientPhone}\n• الباقة: ${activePlan.labelAr} (${activePlan.labelEn})\n• نتيجة اختبار المستوى: ${levelBadge.ar} (${totalScore} نقطة)\n• الهدف: ${goal || "بناء القوة والمهارات"}\n• المبلغ المعروض: ${displayedPrice} ${currency.code} (السعر الأساسي: ${activePlan.priceEgp} EGP)\n• طريقة الدفع المفضلة: ${paymentMethod}`
            : `Hello Coach EL Masry 💪\nI want to confirm my online coaching subscription:\n• Name: ${clientName}\n• Phone: ${clientPhone}\n• Plan: ${activePlan.labelEn}\n• Assessed Level: ${levelBadge.en} (Score: ${totalScore})\n• Goal: ${goal || "Master bodyweight skills"}\n• Displayed Price: ${displayedPrice} ${currency.code} (Base Price: ${activePlan.priceEgp} EGP)\n• Payment Method: ${paymentMethod}`;

        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setIsQuizModalOpen(false);
    setStep("FORM");
    setSubmittedSubId(null);
    setCurrentQuestionIndex(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/15 bg-[#0D1320] text-white shadow-glow-lg overflow-hidden my-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-brand-accent" />
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                {step === "FORM" &&
                  (lang === "ar" ? "الخطوة ١: بيانات المتدرب واختيار الباقة" : "Step 1: Athlete Details & Plan")}
                {step === "QUIZ" &&
                  (lang === "ar"
                    ? `الخطوة ٢: اختبار تحديد المستوى (${currentQuestionIndex + 1} / ${totalQuestions})`
                    : `Step 2: Level Assessment Quiz (${currentQuestionIndex + 1} / ${totalQuestions})`)}
                {step === "RESULT" &&
                  (lang === "ar" ? "الخطوة ٣: نتيجتك وتأكيد الاشتراك" : "Step 3: Assessment Result & Confirmation")}
              </h3>
              <p className="text-xs text-white/60">
                {lang === "ar" ? `الباقة المختارة: ${activePlan.labelAr}` : `Selected Plan: ${activePlan.labelEn}`}{" "}
                — <span className="text-brand-accent font-bold">{formattedDisplayedPrice}</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 max-h-[82vh] overflow-y-auto">
          {step === "FORM" && (
            <form onSubmit={handleStartQuiz} className="space-y-4">
              {/* Plan Selector Pill Row */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-2">
                  {lang === "ar" ? "اختر مدة الاشتراك:" : "Select Plan Duration:"}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {pricingPlans.map((p) => {
                    const isSelected = p.id === activePlan.id;
                    const price = calculatePlanPrice(p.priceEgp, currency, p.overrides);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPlanForQuiz(p)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          isSelected
                            ? "border-brand-blue bg-brand-blue/20 text-white shadow-glow"
                            : "border-white/10 bg-white/5 text-white/70 hover:border-white/30"
                        }`}
                      >
                        <div className="text-xs font-bold">{lang === "ar" ? p.labelAr : p.labelEn}</div>
                        <div className="text-[11px] text-brand-accent font-semibold mt-0.5">
                          {formatCurrencyPrice(price, currency, lang)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs font-medium">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/70 mb-1">
                    {lang === "ar" ? "الاسم بالكامل *" : "Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={lang === "ar" ? "مثال: محمد أحمد" : "e.g., Mohamed Ahmed"}
                    className="w-full rounded-xl bg-black/50 border border-white/15 focus:border-brand-blue px-3.5 py-2.5 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/70 mb-1">
                    {lang === "ar" ? "رقم الهاتف / واتساب *" : "Phone / WhatsApp *"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+20 10..."
                    className="w-full rounded-xl bg-black/50 border border-white/15 focus:border-brand-blue px-3.5 py-2.5 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/70 mb-1">
                    {lang === "ar" ? "البريد الإلكتروني (لدخول منطقة المتدرب)" : "Email (for Client Area login)"}
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl bg-black/50 border border-white/15 focus:border-brand-blue px-3.5 py-2.5 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/70 mb-1">
                    {lang === "ar" ? "كلمة مرور لحسابك (اختياري)" : "Account Password (Optional)"}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={lang === "ar" ? "الافتراضي: Client@2026" : "Default: Client@2026"}
                    className="w-full rounded-xl bg-black/50 border border-white/15 focus:border-brand-blue px-3.5 py-2.5 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-white/70 mb-1">
                    {lang === "ar" ? "العمر" : "Age"}
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="22"
                    className="w-full rounded-xl bg-black/50 border border-white/15 focus:border-brand-blue px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/70 mb-1">
                    {lang === "ar" ? "الطول (سم)" : "Height (cm)"}
                  </label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    placeholder="176"
                    className="w-full rounded-xl bg-black/50 border border-white/15 focus:border-brand-blue px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/70 mb-1">
                    {lang === "ar" ? "الوزن (كجم)" : "Weight (kg)"}
                  </label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    placeholder="75"
                    className="w-full rounded-xl bg-black/50 border border-white/15 focus:border-brand-blue px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/70 mb-1">
                  {lang === "ar" ? "هدفك الأساسي من التدريب مع الكابتن المصري" : "Primary Training Goal"}
                </label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder={
                    lang === "ar"
                      ? "مثال: إتقان الماصل أب والهاند ستاند وبناء جسم رياضي متناسق"
                      : "e.g., Unlock Muscle-up, Handstand & build athletic muscle"
                  }
                  className="w-full rounded-xl bg-black/50 border border-white/15 focus:border-brand-blue px-3.5 py-2.5 text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-white/70 mb-1">
                  {lang === "ar" ? "هل لديك أي إصابات أو ملاحظات صحية؟" : "Any past injuries or medical notes?"}
                </label>
                <input
                  type="text"
                  value={injuries}
                  onChange={(e) => setInjuries(e.target.value)}
                  placeholder={lang === "ar" ? "لا يوجد / ألم خفيف في الكتف..." : "None / mild wrist soreness..."}
                  className="w-full rounded-xl bg-black/50 border border-white/15 focus:border-brand-blue px-3.5 py-2 text-sm text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-accent hover:brightness-110 text-white font-bold text-sm sm:text-base shadow-glow flex items-center justify-center gap-2 transition-all"
              >
                <span>
                  {lang === "ar"
                    ? "ابدأ اختبار تحديد المستوى الآن (١٠ أسئلة)"
                    : "Start Level Assessment Quiz (10 Questions)"}
                </span>
                {lang === "ar" ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </button>
            </form>
          )}

          {step === "QUIZ" && currentQuestion && (
            <div className="space-y-6">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-xs text-white/60 mb-2">
                  <span>
                    {lang === "ar"
                      ? `السؤال ${currentQuestionIndex + 1} من ${totalQuestions}`
                      : `Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
                  </span>
                  <span>{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%</span>
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-blue to-brand-accent transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Title */}
              <h4 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {lang === "ar" ? currentQuestion.questionAr : currentQuestion.questionEn}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = answers[currentQuestion.id] === opt.points;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(opt.points)}
                      className={`w-full text-start p-4 rounded-2xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? "border-brand-blue bg-brand-blue/25 text-white shadow-glow"
                          : "border-white/15 bg-white/5 hover:bg-white/10 hover:border-brand-blue/50 text-white/90"
                      }`}
                    >
                      <span className="text-sm sm:text-base font-medium">
                        {lang === "ar" ? opt.labelAr : opt.labelEn}
                      </span>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-brand-accent font-bold">
                        +{opt.points}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Footer */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (currentQuestionIndex > 0) {
                      setCurrentQuestionIndex(currentQuestionIndex - 1);
                    } else {
                      setStep("FORM");
                    }
                  }}
                  className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs sm:text-sm text-white/80"
                >
                  {lang === "ar" ? "السابق" : "Back"}
                </button>
                <span className="text-xs text-white/40">
                  {lang === "ar" ? "اختر إجابة للانتقال تلقائياً" : "Select an answer to continue"}
                </span>
              </div>
            </div>
          )}

          {step === "RESULT" && (
            <div className="space-y-6">
              {/* Assessed Level Banner */}
              <div className={`p-6 rounded-2xl bg-gradient-to-br ${levelBadge.color} text-white shadow-glow`}>
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-8 h-8 text-white shrink-0" />
                  <div>
                    <div className="text-xs uppercase tracking-wider font-bold text-white/80">
                      {lang === "ar" ? "نتيجة تقييم المستوى" : "YOUR ASSESSED CALISTHENICS TIER"}
                    </div>
                    <h4 className="text-2xl font-black">
                      {lang === "ar" ? levelBadge.ar : levelBadge.en} ({totalScore}{" "}
                      {lang === "ar" ? "نقطة" : "pts"})
                    </h4>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-white/95 leading-relaxed">
                  {lang === "ar" ? levelBadge.descAr : levelBadge.descEn}
                </p>
              </div>

              {/* Order & Currency Summary */}
              <div className="p-4 rounded-2xl border border-white/15 bg-white/5 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">{lang === "ar" ? "المتدرب:" : "Athlete:"}</span>
                  <span className="font-bold">{clientName} ({clientPhone})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">{lang === "ar" ? "الباقة المختارة:" : "Selected Plan:"}</span>
                  <span className="font-bold">{lang === "ar" ? activePlan.labelAr : activePlan.labelEn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">
                    {lang === "ar" ? `المبلغ بعملة (${currency.code}):` : `Amount in (${currency.code}):`}
                  </span>
                  <span className="font-black text-brand-accent text-base">{formattedDisplayedPrice}</span>
                </div>
                {currency.code !== "EGP" && (
                  <div className="flex justify-between text-xs text-white/50">
                    <span>{lang === "ar" ? "السعر الأساسي بالجنيه المصري:" : "Base Price (EGP):"}</span>
                    <span>{activePlan.priceEgp} EGP</span>
                  </div>
                )}
              </div>

              {/* Payment Gateway Selection */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-2">
                  {lang === "ar" ? "اختر وسيلة الدفع المفضلة:" : "Select Preferred Payment Method:"}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "WHATSAPP", labelAr: "تأكيد عبر واتساب", labelEn: "WhatsApp Direct" },
                    { id: "INSTAPAY", labelAr: "إنستا باي (InstaPay)", labelEn: "InstaPay" },
                    { id: "PAYMOB", labelAr: "بطاقة بنكية (Paymob)", labelEn: "Card (Paymob)" },
                    { id: "FAWRY", labelAr: "فوري (Fawry)", labelEn: "Fawry Pay" },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id as typeof paymentMethod)}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === pm.id
                          ? "border-brand-blue bg-brand-blue/20 text-white"
                          : "border-white/10 bg-white/5 text-white/65 hover:text-white"
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                      <span>{lang === "ar" ? pm.labelAr : pm.labelEn}</span>
                    </button>
                  ))}
                </div>
              </div>

              {submittedSubId ? (
                <div className="p-5 rounded-2xl border border-emerald-500/40 bg-emerald-500/15 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h5 className="font-bold text-base text-white">
                    {lang === "ar"
                      ? "تم تسجيل طلب اشتراكك وإنشاء حسابك بنجاح!"
                      : "Your Subscription & Client Account Are Ready!"}
                  </h5>
                  <p className="text-xs text-white/80">
                    {lang === "ar"
                      ? "يمكنك الآن الدخول إلى منطقة المتدرب لمشاهدة جدولك التدريبي المبدئي وفيديوهات الشرح، ومتابعة تأكيد التفعيل مع الكابتن المصري على واتساب."
                      : "You can now log into the Client Area to view your structured training plan and video guides while finalizing activation on WhatsApp."}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <a
                      href="/client"
                      className="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-accent text-white font-bold text-xs sm:text-sm flex items-center gap-2"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>{lang === "ar" ? "الذهاب لمنطقة المتدرب" : "Go to Client Area"}</span>
                    </a>
                    <button
                      type="button"
                      onClick={resetAndClose}
                      className="px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 text-xs sm:text-sm text-white"
                    >
                      {lang === "ar" ? "إغلاق" : "Close"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => handleConfirmSubscription(true)}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:brightness-110 text-white font-black text-sm sm:text-base shadow-lg flex items-center justify-center gap-2.5 transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>
                      {submitting
                        ? lang === "ar"
                          ? "جاري الحفظ..."
                          : "Saving..."
                        : lang === "ar"
                        ? "تأكيد الاشتراك وإرسال النتيجة عبر واتساب"
                        : "Confirm via WhatsApp & Save Subscription"}
                    </span>
                  </button>

                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => handleConfirmSubscription(false)}
                    className="w-full py-3 rounded-xl border border-brand-blue/50 bg-brand-blue/15 hover:bg-brand-blue/25 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <ShieldCheck className="w-4 h-4 text-brand-accent" />
                    <span>
                      {lang === "ar"
                        ? "حفظ الطلب والدخول لمنطقة المتدرب مباشرة"
                        : "Save Subscription & Open Client Area"}
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

