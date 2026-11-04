"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { SubscriptionRecord, WeeklyPlanRecord } from "@/lib/db";
import {
  Dumbbell,
  Calendar,
  Play,
  MessageCircle,
  LogOut,
  CheckCircle2,
  Clock,
  Trophy,
  ArrowLeft,
  Globe,
  Shield,
  Video,
} from "lucide-react";

interface ClientUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: "ADMIN" | "CLIENT";
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  goal?: string;
  quizScore?: number;
}

export default function ClientPortalPage() {
  const { lang, setLang, siteConfig, exercises } = useApp();
  const [user, setUser] = useState<ClientUser | null>(null);
  const [subscriptions, setSubscriptions] = useState<SubscriptionRecord[]>([]);
  const [weeklyPlans, setWeeklyPlans] = useState<WeeklyPlanRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Login Form
  const [email, setEmail] = useState("karim@example.com");
  const [password, setPassword] = useState("Client@2026");
  const [authError, setAuthError] = useState("");
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const fetchSession = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user || null);
        setSubscriptions(data.subscriptions || []);
        setWeeklyPlans(data.weeklyPlans || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || "Invalid login credentials");
        return;
      }
      await fetchSession();
    } catch {
      setAuthError("Failed to connect");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "LOGOUT" }),
    });
    setUser(null);
  };

  const waNumber = (siteConfig.contact?.whatsappNumber || "201099999999").replace(/\D/g, "");

  return (
    <div className="min-h-screen bg-brand-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs sm:text-sm text-white/75 hover:text-white bg-white/5 px-3 py-1.5 rounded-xl border border-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === "ar" ? "الرئيسية" : "Back to Home"}</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-sm sm:text-base">
                {lang === "ar" ? "بوابة المتدرب — الكابتن المصري" : "EL MASRY ATHLETE PORTAL"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 text-xs font-bold flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-brand-accent" />
              <span>{lang === "ar" ? "EN" : "عربي"}</span>
            </button>
            {user && (
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-bold flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{lang === "ar" ? "خروج" : "Logout"}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="text-center py-20 text-white/60">
            {lang === "ar" ? "جاري تحميل بيانات المتدرب..." : "Loading Athlete Portal..."}
          </div>
        ) : !user ? (
          <div className="max-w-md mx-auto rounded-3xl border border-white/15 bg-brand-card p-8 shadow-glow space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center mx-auto text-brand-accent">
                <Dumbbell className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-black">
                {lang === "ar" ? "تسجيل دخول المتدرب" : "ATHLETE LOGIN"}
              </h1>
              <p className="text-xs text-white/60">
                {lang === "ar"
                  ? "شاهد جدولك الأسبوعي المخصص، فيديوهات الشرح، وحالة اشتراكك"
                  : "Access your weekly workout schedule, form videos, and subscription status"}
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs text-white/70 mb-1">
                  {lang === "ar" ? "البريد الإلكتروني" : "Email Address"}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-black/50 border border-white/15 focus:border-brand-blue px-3.5 py-2.5 text-sm text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-white/70 mb-1">
                  {lang === "ar" ? "كلمة المرور" : "Password"}
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-black/50 border border-white/15 focus:border-brand-blue px-3.5 py-2.5 text-sm text-white outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-accent text-white font-bold text-sm shadow-glow"
              >
                {lang === "ar" ? "دخول إلى حسابي" : "Sign In to Athlete Area"}
              </button>
            </form>

            {/* Demo Quick Fill Box */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/70 space-y-1">
              <div className="font-bold text-brand-accent">
                {lang === "ar" ? "حساب تجريبي جاهز للمعاينة:" : "Demo Athlete Credentials:"}
              </div>
              <div>Email: <code className="text-white">karim@example.com</code></div>
              <div>Password: <code className="text-white">Client@2026</code></div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Top Athlete Welcome & Subscription Status Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl border border-white/15 bg-gradient-to-br from-[#14203D] to-[#0C1222] shadow-glow flex flex-col justify-between gap-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
                      {lang === "ar" ? "مرحباً بك يا بطل" : "WELCOME BACK, ATHLETE"}
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-black text-white">{user.name}</h1>
                    <p className="text-xs sm:text-sm text-white/70">
                      {lang === "ar" ? "الهدف الحالي:" : "Current Goal:"}{" "}
                      <span className="text-white font-semibold">
                        {user.goal || (lang === "ar" ? "إتقان القوة والمهارات" : "Master Calisthenics Skills")}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-brand-blue/25 border border-brand-blue/50">
                    <Trophy className="w-5 h-5 text-brand-accent" />
                    <div>
                      <div className="text-[10px] text-white/60 uppercase">
                        {lang === "ar" ? "المستوى المصنف" : "Assessed Level"}
                      </div>
                      <div className="text-sm font-black text-white">{user.level}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/10">
                  <a
                    href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                      `مرحباً كابتن المصري، أنا المتدرب ${user.name} (${user.level})، أرسل لك تحديث الأسبوع:`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>
                      {lang === "ar"
                        ? "إرسال متابعة الأسبوع للكابتن عبر واتساب"
                        : "Send Weekly Check-In on WhatsApp"}
                    </span>
                  </a>
                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      className="px-4 py-2.5 rounded-xl bg-brand-blue/20 border border-brand-blue/40 text-brand-accent font-bold text-xs sm:text-sm flex items-center gap-1.5"
                    >
                      <Shield className="w-4 h-4" />
                      <span>{lang === "ar" ? "لوحة الإدارة" : "Admin Dashboard"}</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Subscription Status Card */}
              <div className="p-6 rounded-3xl border border-white/15 bg-brand-card flex flex-col justify-between space-y-4">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-3">
                    {lang === "ar" ? "حالة الاشتراك الحالي" : "SUBSCRIPTION STATUS"}
                  </h2>
                  {subscriptions.length === 0 ? (
                    <p className="text-xs text-white/60">
                      {lang === "ar" ? "لا يوجد اشتراك مسجل حالياً." : "No active subscription found."}
                    </p>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-black text-white">
                          {lang === "ar" ? subscriptions[0].planLabelAr : subscriptions[0].planLabelEn}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            subscriptions[0].status === "ACTIVE" || subscriptions[0].status === "PAID"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          {subscriptions[0].status}
                        </span>
                      </div>
                      <div className="text-xs text-white/70 space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                          <span>
                            {lang === "ar" ? "تاريخ البداية:" : "Start Date:"}{" "}
                            {new Date(subscriptions[0].startDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-brand-accent" />
                          <span>
                            {lang === "ar" ? "تاريخ الانتهاء:" : "End Date:"}{" "}
                            {new Date(subscriptions[0].endDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="pt-3 border-t border-white/10 text-[11px] text-white/50">
                  {lang === "ar"
                    ? "يتم تحديث جدولك التدريبي أسبوعياً بواسطة الكابتن المصري بعد مراجعة فيديوهاتك."
                    : "Your workout schedule is updated weekly by Coach EL Masry after your form check."}
                </div>
              </div>
            </div>

            {/* Structured Weekly Workout Plan */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black">
                {lang === "ar" ? "جدولك التدريبي الأسبوعي المخصص" : "YOUR STRUCTURED WEEKLY TRAINING PLAN"}
              </h2>

              {weeklyPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="rounded-3xl border border-white/15 bg-brand-card p-6 sm:p-8 space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <span className="px-3 py-1 rounded-full bg-brand-blue/20 text-brand-accent text-xs font-bold">
                        {lang === "ar" ? `الأسبوع رقم ${plan.weekNumber}` : `Week #${plan.weekNumber}`} •{" "}
                        {plan.targetLevel}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                        {lang === "ar" ? plan.titleAr : plan.titleEn}
                      </h3>
                    </div>
                  </div>

                  {(lang === "ar" ? plan.notesAr : plan.notesEn) && (
                    <div className="p-4 rounded-2xl bg-brand-blue/10 border border-brand-blue/30 text-xs sm:text-sm text-white/90">
                      <strong className="text-brand-accent">
                        {lang === "ar" ? "توجيهات الكابتن المصري:" : "Coach EL Masry's Notes:"}{" "}
                      </strong>
                      {lang === "ar" ? plan.notesAr : plan.notesEn}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {plan.days.map((day, dIdx) => (
                      <div
                        key={dIdx}
                        className="rounded-2xl border border-white/10 bg-black/40 p-5 space-y-4"
                      >
                        <h4 className="font-bold text-base text-brand-accent border-b border-white/10 pb-2.5">
                          {lang === "ar" ? day.titleAr : day.titleEn}
                        </h4>

                        <div className="space-y-3">
                          {day.exercises.map((ex, eIdx) => (
                            <div
                              key={eIdx}
                              className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="font-bold text-sm text-white">
                                  {lang === "ar" ? ex.titleAr : ex.titleEn}
                                </div>
                                {ex.videoUrl && (
                                  <button
                                    type="button"
                                    onClick={() => setActiveVideoUrl(ex.videoUrl || null)}
                                    className="px-2.5 py-1 rounded-lg bg-brand-blue/20 hover:bg-brand-blue text-brand-accent hover:text-white text-xs font-bold flex items-center gap-1 shrink-0 transition-colors"
                                  >
                                    <Play className="w-3 h-3 fill-current" />
                                    <span>{lang === "ar" ? "فيديو الشرح" : "Watch Video"}</span>
                                  </button>
                                )}
                              </div>

                              <div className="flex flex-wrap gap-2 text-xs text-white/75">
                                <span className="px-2 py-0.5 rounded bg-white/10">
                                  {lang === "ar" ? `${ex.sets} مجموعات` : `${ex.sets} Sets`}
                                </span>
                                <span className="px-2 py-0.5 rounded bg-white/10">
                                  {lang === "ar" ? `العدات: ${ex.reps}` : `Reps: ${ex.reps}`}
                                </span>
                                <span className="px-2 py-0.5 rounded bg-white/10">
                                  {lang === "ar" ? `راحة: ${ex.restSeconds} ثانية` : `Rest: ${ex.restSeconds}s`}
                                </span>
                              </div>

                              {(lang === "ar" ? ex.notesAr : ex.notesEn) && (
                                <p className="text-[11px] text-white/60">
                                  💡 {lang === "ar" ? ex.notesAr : ex.notesEn}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Access to Full Video Exercise Library */}
            <div className="space-y-4 pt-4">
              <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
                <Video className="w-5 h-5 text-brand-accent" />
                <span>
                  {lang === "ar"
                    ? "مكتبة الفيديوهات التعليمية الكاملة"
                    : "FULL EXERCISE VIDEO LIBRARY"}
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {exercises.map((ex) => (
                  <div
                    key={ex.id}
                    onClick={() => setActiveVideoUrl(ex.videoUrl)}
                    className="cursor-pointer p-4 rounded-2xl border border-white/10 bg-brand-card hover:border-brand-blue transition-all flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/20 text-brand-accent flex items-center justify-center shrink-0">
                      <Play className="w-4 h-4 fill-current" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs sm:text-sm text-white truncate">
                        {lang === "ar" ? ex.titleAr : ex.titleEn}
                      </div>
                      <div className="text-[11px] text-white/50">{ex.level}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Video Player Modal */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-3xl rounded-3xl border border-white/15 bg-[#0D1320] overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
              <span className="font-bold text-sm">
                {lang === "ar" ? "فيديو شرح التمرين" : "Exercise Explanation Video"}
              </span>
              <button
                type="button"
                onClick={() => setActiveVideoUrl(null)}
                className="px-3 py-1 rounded-lg bg-white/10 text-xs font-bold"
              >
                {lang === "ar" ? "إغلاق" : "Close"}
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe src={activeVideoUrl} className="w-full h-full" allowFullScreen />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

