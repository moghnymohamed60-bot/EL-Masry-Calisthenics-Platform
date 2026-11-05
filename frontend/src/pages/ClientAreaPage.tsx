import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { authService } from "../services/authService";
import { WeeklyPlanViewer } from "../components/client/WeeklyPlanViewer";
import { Subscription, WeeklyPlan, User } from "../../../shared/types";
import {
  Dumbbell,
  Calendar,
  Play,
  MessageCircle,
  LogOut,
  Clock,
  Trophy,
  ArrowLeft,
  Globe,
  Shield,
  Video,
  CheckCircle2,
} from "lucide-react";

export function ClientAreaPage() {
  const { lang, setLang, siteConfig, exercises } = useApp();
  const [user, setUser] = useState<User | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [weeklyPlans, setWeeklyPlans] = useState<WeeklyPlan[]>([]);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("karim@example.com");
  const [password, setPassword] = useState("Client@2026");
  const [authError, setAuthError] = useState("");
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const fetchSession = async () => {
    setLoading(true);
    try {
      const data = await authService.getSession();
      setUser(data.user || null);
      setSubscriptions(data.subscriptions || []);
      setWeeklyPlans(data.weeklyPlans || []);
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
      await authService.login(email, password);
      await fetchSession();
    } catch (err: unknown) {
      setAuthError(err instanceof Error ? err.message : "Invalid login credentials");
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
  };

  const waNumber = (siteConfig.contact?.whatsappNumber || "201099999999").replace(/\D/g, "");

  return (
    <div className="min-h-screen bg-brand-grey text-brand-black">
      {/* Top Bar: Black & Royal Blue Contrast */}
      <header className="border-b-4 border-brand-blue bg-brand-black text-white sticky top-0 z-30 shadow-card-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 text-xs sm:text-sm font-black text-brand-black bg-white hover:bg-brand-grey px-3.5 py-1.5 rounded-xl transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-brand-blue" />
              <span>{lang === "ar" ? "الرئيسية" : "Back to Home"}</span>
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-blue flex items-center justify-center border border-white/20">
                <Dumbbell className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-sm sm:text-base tracking-wide">
                {lang === "ar" ? "بوابة المتدرب — الكابتن المصري" : "EL MASRY ATHLETE PORTAL"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="px-3 py-1.5 rounded-xl border border-white/20 bg-brand-navy hover:bg-brand-blue text-xs font-black flex items-center gap-1.5 text-white"
            >
              <Globe className="w-3.5 h-3.5 text-brand-accent" />
              <span>{lang === "ar" ? "EN" : "عربي"}</span>
            </button>
            {user && (
              <button
                type="button"
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-xl bg-white text-brand-black hover:bg-brand-grey text-xs font-black flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5 text-brand-blue" />
                <span>{lang === "ar" ? "خروج" : "Logout"}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="text-center py-20 text-brand-black/60 font-bold">
            {lang === "ar" ? "جاري تحميل بيانات المتدرب..." : "Loading Athlete Portal..."}
          </div>
        ) : !user ? (
          /* Split Login Card: Left Coach Poster (Image 6 & Image 7), Right Crisp White Form */
          <div className="max-w-4xl mx-auto rounded-3xl border-4 border-brand-black bg-white shadow-card-light overflow-hidden grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-5 bg-gradient-to-b from-brand-royal via-brand-navy to-brand-black text-white p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-3 relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-brand-blue text-white text-[11px] font-black uppercase tracking-wider">
                  🇪🇬 EG • CALISTHENICS
                </span>
                <h2 className="font-display text-3xl font-black leading-tight">
                  {lang === "ar"
                    ? "تحكم في وزن جسمك واصنع قوتك"
                    : "MASTER YOUR OWN BODY, DEFY GRAVITY"}
                </h2>
                <p className="text-xs text-brand-grey leading-relaxed">
                  {lang === "ar"
                    ? "بوابة المتدربين الرسمية لمتابعة الجداول الأسبوعية وفيديوهات الأداء الصحيح مع الكابتن المصري."
                    : "Official Athlete Portal for weekly programming, video form guides, and direct coach feedback."}
                </p>
              </div>

              <div className="my-4 rounded-2xl overflow-hidden border-2 border-white/30 aspect-[4/5] relative z-10">
                <img
                  src="/images/coach/image6.jpeg"
                  alt="Coach EL Masry"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="text-[11px] font-bold text-brand-grey flex items-center gap-2 relative z-10">
                <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                <span>Muscles From Nothing • 100% Personalized</span>
              </div>
            </div>

            <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center space-y-6 bg-white text-brand-black">
              <div className="space-y-1.5">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue text-white flex items-center justify-center shadow-glow mb-2">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-brand-black">
                  {lang === "ar" ? "تسجيل دخول المتدرب" : "ATHLETE PORTAL LOGIN"}
                </h1>
                <p className="text-xs sm:text-sm text-brand-black/70 font-medium">
                  {lang === "ar"
                    ? "شاهد جدولك الأسبوعي المخصص، فيديوهات الشرح، وحالة اشتراكك"
                    : "Access your weekly workout schedule, form videos, and subscription status"}
                </p>
              </div>

              {authError && (
                <div className="p-3.5 rounded-xl bg-brand-black text-white border-s-4 border-brand-blue text-xs font-bold">
                  {authError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-brand-black mb-1.5">
                    {lang === "ar" ? "البريد الإلكتروني" : "Email Address"}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl bg-brand-grey border-2 border-brand-grey-mid focus:border-brand-blue px-4 py-3 text-sm font-bold text-brand-black outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-brand-black mb-1.5">
                    {lang === "ar" ? "كلمة المرور" : "Password"}
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl bg-brand-grey border-2 border-brand-grey-mid focus:border-brand-blue px-4 py-3 text-sm font-bold text-brand-black outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-brand-blue hover:bg-brand-navy text-white font-black text-sm shadow-glow transition-all"
                >
                  {lang === "ar" ? "دخول إلى حسابي" : "Sign In to Athlete Area"}
                </button>
              </form>

              <div className="p-4 rounded-2xl bg-brand-grey border-2 border-brand-grey-mid text-xs text-brand-black space-y-1 font-medium">
                <div className="font-black text-brand-blue">
                  {lang === "ar" ? "حساب تجريبي جاهز للمعاينة:" : "Demo Athlete Credentials:"}
                </div>
                <div>
                  Email: <code className="font-black text-brand-black">karim@example.com</code>
                </div>
                <div>
                  Password: <code className="font-black text-brand-black">Client@2026</code>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Athlete Banner: Royal Blue & Black with Coach Portrait */}
              <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl border-2 border-brand-blue bg-gradient-to-r from-brand-navy via-brand-royal to-brand-black text-white shadow-card-dark flex flex-col justify-between gap-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src="/images/coach/image7.jpeg"
                      alt="Coach EL Masry"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover object-top border-2 border-white shadow-md shrink-0"
                    />
                    <div className="space-y-1">
                      <span className="text-xs font-black uppercase tracking-wider text-brand-grey">
                        {lang === "ar" ? "مرحباً بك يا بطل" : "WELCOME BACK, ATHLETE"}
                      </span>
                      <h1 className="text-2xl sm:text-4xl font-black text-white">{user.name}</h1>
                      <p className="text-xs sm:text-sm text-brand-grey font-medium">
                        {lang === "ar" ? "الهدف الحالي:" : "Current Goal:"}{" "}
                        <span className="text-white font-black">
                          {user.goal ||
                            (lang === "ar"
                              ? "إتقان القوة والمهارات"
                              : "Master Calisthenics Skills")}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white text-brand-black border-2 border-brand-blue shadow-md">
                    <Trophy className="w-5 h-5 text-brand-blue" />
                    <div>
                      <div className="text-[10px] text-brand-black/60 font-bold uppercase">
                        {lang === "ar" ? "المستوى المصنف" : "Assessed Level"}
                      </div>
                      <div className="text-sm font-black text-brand-black">{user.level}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/15">
                  <a
                    href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                      `مرحباً كابتن المصري، أنا المتدرب ${user.name} (${user.level})، أرسل لك تحديث الأسبوع:`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-white hover:bg-brand-grey text-brand-black font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-brand-blue" />
                    <span>
                      {lang === "ar"
                        ? "إرسال متابعة الأسبوع للكابتن عبر واتساب"
                        : "Send Weekly Check-In on WhatsApp"}
                    </span>
                  </a>
                  {user.role === "ADMIN" && (
                    <Link
                      to="/admin"
                      className="px-4 py-3 rounded-xl bg-brand-blue text-white font-black text-xs sm:text-sm flex items-center gap-1.5"
                    >
                      <Shield className="w-4 h-4" />
                      <span>{lang === "ar" ? "لوحة الإدارة" : "Admin Dashboard"}</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Subscription Status Card: Crisp White & Black */}
              <div className="p-6 rounded-3xl border-2 border-brand-black bg-white text-brand-black shadow-card-light flex flex-col justify-between space-y-4">
                <div>
                  <h2 className="text-xs font-black uppercase tracking-wider text-brand-blue mb-3">
                    {lang === "ar" ? "حالة الاشتراك الحالي" : "SUBSCRIPTION STATUS"}
                  </h2>
                  {subscriptions.length === 0 ? (
                    <p className="text-xs text-brand-black/70 font-semibold">
                      {lang === "ar" ? "لا يوجد اشتراك مسجل حالياً." : "No active subscription found."}
                    </p>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-black text-brand-black">
                          {lang === "ar"
                            ? subscriptions[0].planLabelAr
                            : subscriptions[0].planLabelEn}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-brand-blue text-white">
                          {subscriptions[0].status}
                        </span>
                      </div>
                      <div className="text-xs text-brand-black/80 font-bold space-y-1.5 bg-brand-grey p-3.5 rounded-2xl border border-brand-grey-mid">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-brand-blue" />
                          <span>
                            {lang === "ar" ? "تاريخ البداية:" : "Start Date:"}{" "}
                            {new Date(subscriptions[0].startDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-brand-blue" />
                          <span>
                            {lang === "ar" ? "تاريخ الانتهاء:" : "End Date:"}{" "}
                            {new Date(subscriptions[0].endDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="pt-3 border-t border-brand-grey-mid text-[11px] text-brand-black/70 font-semibold">
                  {lang === "ar"
                    ? "يتم تحديث جدولك التدريبي أسبوعياً بواسطة الكابتن المصري بعد مراجعة فيديوهاتك."
                    : "Your workout schedule is updated weekly by Coach EL Masry after your form check."}
                </div>
              </div>
            </div>

            <WeeklyPlanViewer
              weeklyPlans={weeklyPlans}
              lang={lang}
              onSelectVideo={(url) => setActiveVideoUrl(url)}
            />

            <div className="space-y-4 pt-4">
              <h2 className="text-xl sm:text-2xl font-black text-brand-black flex items-center gap-2">
                <Video className="w-5 h-5 text-brand-blue" />
                <span>
                  {lang === "ar"
                    ? "مكتبة الفيديوهات التعليمية الكاملة"
                    : "FULL EXERCISE VIDEO LIBRARY"}
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {exercises.map((ex, i) => {
                  const isDark = i % 2 === 1;
                  return (
                    <div
                      key={ex.id}
                      onClick={() => setActiveVideoUrl(ex.videoUrl)}
                      className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${
                        isDark
                          ? "bg-brand-black text-white border-brand-navy hover:border-brand-blue"
                          : "bg-white text-brand-black border-brand-grey-mid hover:border-brand-blue"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center shrink-0">
                        <Play className="w-4 h-4 fill-current" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-black text-xs sm:text-sm truncate">
                          {lang === "ar" ? ex.titleAr : ex.titleEn}
                        </div>
                        <div
                          className={`text-[11px] font-bold ${
                            isDark ? "text-brand-grey" : "text-brand-blue"
                          }`}
                        >
                          {ex.level}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-black/85 backdrop-blur-md">
          <div className="w-full max-w-3xl rounded-3xl border-2 border-brand-blue bg-brand-black text-white overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/15 bg-brand-navy">
              <span className="font-black text-sm">
                {lang === "ar" ? "فيديو شرح التمرين" : "Exercise Explanation Video"}
              </span>
              <button
                type="button"
                onClick={() => setActiveVideoUrl(null)}
                className="px-3 py-1 rounded-lg bg-white text-brand-black text-xs font-black"
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
