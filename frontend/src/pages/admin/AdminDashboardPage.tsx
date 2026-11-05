import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { authService } from "../../services/authService";
import { siteService } from "../../services/siteService";
import { subscriptionService } from "../../services/subscriptionService";
import { weeklyPlanService } from "../../services/weeklyPlanService";
import { currencyService } from "../../services/currencyService";
import { OverviewStats } from "../../components/admin/OverviewStats";
import {
  Subscription,
  WeeklyPlan,
  PricingPlan,
  Exercise,
  Transformation,
  CurrencyConfig,
  User,
} from "../../../../shared/types";
import {
  Shield,
  Users,
  TrendingUp,
  Search,
  Download,
  Plus,
  Trash2,
  Save,
  RefreshCw,
  LogOut,
  ArrowLeft,
  Globe,
  CheckCircle2,
  Calendar,
  Dumbbell,
  FileText,
  HelpCircle,
  Coins,
  KeyRound,
} from "lucide-react";

export function AdminDashboardPage() {
  const {
    lang,
    setLang,
    siteConfig,
    pricingPlans,
    currencies,
    exercises,
    quizConfig,
    transformations,
    refreshSiteData,
  } = useApp();

  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "OVERVIEW" | "SUBSCRIPTIONS" | "PLANS" | "EXERCISES" | "CURRENCIES" | "CMS" | "QUIZ"
  >("OVERVIEW");

  const [loginEmail, setLoginEmail] = useState("admin@elmasry.com");
  const [loginPassword, setLoginPassword] = useState("ElMasry@2026");
  const [loginError, setLoginError] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdError, setPwdError] = useState("");

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [weeklyPlans, setWeeklyPlans] = useState<WeeklyPlan[]>([]);
  const [revenueCurrency, setRevenueCurrency] = useState<"EGP" | "USD">("EGP");
  const [saveBanner, setSaveBanner] = useState("");

  const [subSearch, setSubSearch] = useState("");
  const [subStatusFilter, setSubStatusFilter] = useState("ALL");
  const [subLevelFilter, setSubLevelFilter] = useState("ALL");

  const [editSiteConfig, setEditSiteConfig] = useState(siteConfig);
  const [editPricingPlans, setEditPricingPlans] = useState<PricingPlan[]>(pricingPlans);
  const [editCurrencies, setEditCurrencies] = useState<CurrencyConfig[]>(currencies);
  const [editExercises, setEditExercises] = useState<Exercise[]>(exercises);
  const [editQuizConfig, setEditQuizConfig] = useState(quizConfig);
  const [editTransformations, setEditTransformations] =
    useState<Transformation[]>(transformations);

  const [newExTitleAr, setNewExTitleAr] = useState("");
  const [newExTitleEn, setNewExTitleEn] = useState("");
  const [newExDescAr, setNewExDescAr] = useState("");
  const [newExDescEn, setNewExDescEn] = useState("");
  const [newExLevel, setNewExLevel] = useState<"BEGINNER" | "INTERMEDIATE" | "ADVANCED">("BEGINNER");
  const [newExMuscle, setNewExMuscle] = useState("BACK");
  const [newExSkill, setNewExSkill] = useState("PULL_UPS");
  const [newExVideo, setNewExVideo] = useState("https://www.youtube.com/embed/eGo4IYlbE5g");
  const [newExThumb, setNewExThumb] = useState("/images/coach/image1.jpeg");

  const [wpTitleAr, setWpTitleAr] = useState("");
  const [wpTitleEn, setWpTitleEn] = useState("");
  const [wpWeekNumber, setWpWeekNumber] = useState(1);
  const [wpTargetLevel, setWpTargetLevel] = useState<"BEGINNER" | "INTERMEDIATE" | "ADVANCED">("BEGINNER");
  const [wpNotesAr, setWpNotesAr] = useState("");
  const [wpNotesEn, setWpNotesEn] = useState("");
  const [wpDays, setWpDays] = useState([
    {
      dayNumber: 1,
      titleAr: "اليوم الأول: قوة السحب والبطن",
      titleEn: "Day 1: Pulling & Core Strength",
      exercises: [
        {
          titleAr: "العقلة القياسية (Strict Pull-ups)",
          titleEn: "Strict Pull-ups",
          sets: 4,
          reps: "8-10",
          restSeconds: 90,
          notesAr: "تحكم كامل في النزول",
          notesEn: "Control 2s eccentric",
          videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g",
        },
      ],
    },
  ]);

  const showSavedToast = (msg: string) => {
    setSaveBanner(msg);
    setTimeout(() => setSaveBanner(""), 3500);
  };

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const authData = await authService.getSession();
      if (authData.user && authData.user.role === "ADMIN") {
        setAdminUser(authData.user);
        const [subData, siteData] = await Promise.all([
          subscriptionService.getAll(),
          siteService.fetchPublicBundle(),
        ]);
        setSubscriptions(subData.subscriptions || []);
        setWeeklyPlans(subData.weeklyPlans || []);
        setEditSiteConfig(siteData.siteConfig);
        setEditPricingPlans(siteData.pricingPlans);
        setEditCurrencies(siteData.currencies);
        setEditExercises(siteData.exercises);
        setEditQuizConfig(siteData.quizConfig);
        setEditTransformations(siteData.transformations);
      } else {
        setAdminUser(null);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const data = await authService.login(loginEmail, loginPassword);
      if (data.user?.role !== "ADMIN") {
        setLoginError("This account does not have Admin privileges.");
        return;
      }
      await loadAdminData();
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : "Invalid admin credentials");
    }
  };

  const handleForcePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError("");
    if (newPassword.length < 6) {
      setPwdError("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdError("Passwords do not match");
      return;
    }
    try {
      await authService.changePassword(newPassword);
      showSavedToast(lang === "ar" ? "تم تحديث كلمة المرور بنجاح!" : "Admin password updated!");
      await loadAdminData();
    } catch {
      setPwdError("Failed to update password");
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    setAdminUser(null);
  };

  const handleSaveSiteData = async (payload: Record<string, unknown>, message: string) => {
    await siteService.updateSiteBundle(payload);
    await refreshSiteData();
    showSavedToast(message);
  };

  const handleUpdateSubscription = async (id: string, updates: Record<string, unknown>) => {
    const data = await subscriptionService.update(id, updates);
    setSubscriptions((prev) => prev.map((s) => (s.id === id ? data.subscription : s)));
    showSavedToast(lang === "ar" ? "تم تحديث حالة الاشتراك" : "Subscription updated");
  };

  const handleDeleteSubscription = async (id: string) => {
    await subscriptionService.remove(id);
    setSubscriptions((prev) => prev.filter((s) => s.id !== id));
    showSavedToast(lang === "ar" ? "تم حذف الاشتراك" : "Subscription deleted");
  };

  const handleExportCsv = () => {
    window.open("/api/subscriptions/export/csv", "_blank");
  };

  const handleSyncExchangeRates = async () => {
    const data = await currencyService.syncLiveRates();
    setEditCurrencies(data.currencies);
    await refreshSiteData();
    showSavedToast(
      lang === "ar" ? "تم تحديث أسعار الصرف بنجاح!" : "Exchange rates synced & cached!"
    );
  };

  const handleCreateWeeklyPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await weeklyPlanService.save({
      titleAr: wpTitleAr || "جدول تدريبي أسبوعي جديد",
      titleEn: wpTitleEn || "New Structured Weekly Plan",
      weekNumber: wpWeekNumber,
      targetLevel: wpTargetLevel,
      notesAr: wpNotesAr,
      notesEn: wpNotesEn,
      days: wpDays,
    });
    setWeeklyPlans((prev) => [data.weeklyPlan, ...prev]);
    setWpTitleAr("");
    setWpTitleEn("");
    showSavedToast(lang === "ar" ? "تم إنشاء الجدول الأسبوعي بنجاح!" : "Weekly plan published!");
  };

  const handleAddExercise = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEx: Exercise = {
      id: `ex-${Date.now()}`,
      slug: newExTitleEn.toLowerCase().replace(/[^a-z0-9]+/g, "-") || `ex-${Date.now()}`,
      titleAr: newExTitleAr,
      titleEn: newExTitleEn,
      descriptionAr: newExDescAr,
      descriptionEn: newExDescEn,
      level: newExLevel,
      muscleGroup: newExMuscle,
      skill: newExSkill,
      videoUrl: newExVideo,
      thumbnailUrl: newExThumb,
      photos: [newExThumb],
      cuesAr: ["حافظ على الأداء الصحيح والتحكم الكامل"],
      cuesEn: ["Maintain strict form and full range of motion"],
      featured: true,
    };
    const updated = [newEx, ...editExercises];
    setEditExercises(updated);
    await handleSaveSiteData(
      { exercises: updated },
      lang === "ar" ? "تمت إضافة التمرين للمكتبة!" : "Exercise added to library!"
    );
    setNewExTitleAr("");
    setNewExTitleEn("");
    setNewExDescAr("");
    setNewExDescEn("");
  };

  const filteredSubs = subscriptions.filter((s) => {
    const q = subSearch.trim().toLowerCase();
    const matchQ =
      !q ||
      s.clientName.toLowerCase().includes(q) ||
      s.clientPhone.toLowerCase().includes(q) ||
      s.clientEmail.toLowerCase().includes(q) ||
      (s.goal || "").toLowerCase().includes(q);
    const matchStatus = subStatusFilter === "ALL" || s.status === subStatusFilter;
    const matchLevel = subLevelFilter === "ALL" || s.assessedLevel === subLevelFilter;
    return matchQ && matchStatus && matchLevel;
  });

  const usdRate = editCurrencies.find((c) => c.code === "USD")?.rateFromEgp || 0.0204;
  const totalRevenueEgp = subscriptions
    .filter((s) => s.status === "ACTIVE" || s.status === "PAID")
    .reduce((acc, s) => acc + s.basePriceEgp, 0);
  const displayedRevenue =
    revenueCurrency === "EGP"
      ? `${totalRevenueEgp.toLocaleString()} EGP`
      : `$${Math.round(totalRevenueEgp * usdRate).toLocaleString()} USD`;

  return (
    <div className="min-h-screen bg-brand-black text-white">
      <header className="sticky top-0 z-30 border-b-4 border-brand-blue bg-brand-black/95 backdrop-blur-xl shadow-card-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-brand-grey text-brand-black text-xs font-black flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-brand-blue" />
              <span>{lang === "ar" ? "عرض الموقع" : "Live Site"}</span>
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-blue flex items-center justify-center border border-white/20">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-sm sm:text-base tracking-wide">
                {lang === "ar" ? "لوحة تحكم الكابتن المصري" : "EL MASRY ADMIN DASHBOARD"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {saveBanner && (
              <div className="px-3.5 py-1.5 rounded-xl bg-white text-brand-black border-2 border-brand-blue text-xs font-black flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                <span>{saveBanner}</span>
              </div>
            )}

            <button
              type="button"
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="px-3 py-1.5 rounded-xl border border-white/20 bg-brand-navy hover:bg-brand-blue text-xs font-black flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-brand-accent" />
              <span>{lang === "ar" ? "EN" : "عربي"}</span>
            </button>

            {adminUser && (
              <button
                type="button"
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-xl bg-brand-grey text-brand-black hover:bg-white text-xs font-black flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5 text-brand-blue" />
                <span>{lang === "ar" ? "خروج" : "Logout"}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-20 text-white/60">Loading Admin Panel...</div>
        ) : !adminUser ? (
          <div className="max-w-md mx-auto rounded-3xl border border-white/15 bg-brand-card p-8 shadow-glow space-y-6 my-8">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center mx-auto text-brand-accent">
                <Shield className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-black">
                {lang === "ar" ? "تسجيل دخول الإدارة" : "ADMIN DASHBOARD LOGIN"}
              </h1>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs text-white/70 mb-1">
                  {lang === "ar" ? "البريد الإلكتروني للإدارة" : "Admin Email"}
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
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
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full rounded-xl bg-black/50 border border-white/15 focus:border-brand-blue px-3.5 py-2.5 text-sm text-white outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-accent text-white font-bold text-sm shadow-glow"
              >
                {lang === "ar" ? "دخول لوحة التحكم" : "Sign In to Admin Panel"}
              </button>
            </form>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/70 space-y-1">
              <div className="font-bold text-brand-accent">
                {lang === "ar" ? "بيانات الدخول الافتراضية:" : "Default Seeded Admin Account:"}
              </div>
              <div>
                Email: <code className="text-white">admin@elmasry.com</code>
              </div>
              <div>
                Password: <code className="text-white">ElMasry@2026</code>
              </div>
            </div>
          </div>
        ) : adminUser.forcePasswordChange ? (
          <div className="max-w-md mx-auto rounded-3xl border border-amber-500/40 bg-brand-card p-8 shadow-glow space-y-6 my-8">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black">
                {lang === "ar"
                  ? "تغيير كلمة المرور الافتراضية (تسجيل الدخول الأول)"
                  : "Security Requirement: Change Default Password"}
              </h2>
            </div>

            {pwdError && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs">
                {pwdError}
              </div>
            )}

            <form onSubmit={handleForcePasswordChange} className="space-y-4">
              <div>
                <label className="block text-xs text-white/70 mb-1">
                  {lang === "ar" ? "كلمة المرور الجديدة" : "New Password"}
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-xl bg-black/50 border border-white/15 focus:border-brand-blue px-3.5 py-2.5 text-sm text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-white/70 mb-1">
                  {lang === "ar" ? "تأكيد كلمة المرور الجديدة" : "Confirm New Password"}
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl bg-black/50 border border-white/15 focus:border-brand-blue px-3.5 py-2.5 text-sm text-white outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-accent text-white font-bold text-sm shadow-glow"
              >
                {lang === "ar" ? "حفظ كلمة المرور والمتابعة" : "Save New Password & Continue"}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-wrap gap-2 p-2.5 rounded-2xl bg-brand-grey border-2 border-white shadow-card-dark">
              {[
                { id: "OVERVIEW", labelAr: "نظرة عامة والإحصائيات", labelEn: "Overview & Analytics", icon: TrendingUp },
                { id: "SUBSCRIPTIONS", labelAr: "الاشتراكات والمتدربين", labelEn: "Subscriptions & Clients", icon: Users },
                { id: "PLANS", labelAr: "الجداول التدريبية الأسبوعية", labelEn: "Weekly Workout Plans", icon: Calendar },
                { id: "EXERCISES", labelAr: "مكتبة التمارين والفيديوهات", labelEn: "Exercise Library", icon: Dumbbell },
                { id: "CURRENCIES", labelAr: "إدارة العملات والأسعار", labelEn: "Currencies & Pricing", icon: Coins },
                { id: "CMS", labelAr: "تعديل محتوى الموقع (CMS)", labelEn: "Website CMS & Media", icon: FileText },
                { id: "QUIZ", labelAr: "أسئلة ونقاط اختبار المستوى", labelEn: "Quiz & Scoring", icon: HelpCircle },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all ${
                      active
                        ? "bg-brand-blue text-white shadow-glow"
                        : "text-brand-black hover:bg-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{lang === "ar" ? tab.labelAr : tab.labelEn}</span>
                  </button>
                );
              })}
            </div>

            {activeTab === "OVERVIEW" && (
              <OverviewStats
                subscriptions={subscriptions}
                exercisesCount={editExercises.length}
                weeklyPlansCount={weeklyPlans.length}
                revenueCurrency={revenueCurrency}
                setRevenueCurrency={setRevenueCurrency}
                displayedRevenue={displayedRevenue}
                lang={lang}
              />
            )}

            {activeTab === "SUBSCRIPTIONS" && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3 flex-1">
                    <div className="relative min-w-[240px]">
                      <Search className="w-4 h-4 text-white/40 absolute start-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={subSearch}
                        onChange={(e) => setSubSearch(e.target.value)}
                        placeholder={
                          lang === "ar"
                            ? "ابحث بالاسم أو الهاتف أو الهدف..."
                            : "Search name, phone, email..."
                        }
                        className="w-full rounded-xl bg-brand-card border border-white/15 ps-10 pe-3 py-2 text-xs sm:text-sm text-white outline-none"
                      />
                    </div>

                    <select
                      value={subStatusFilter}
                      onChange={(e) => setSubStatusFilter(e.target.value)}
                      className="rounded-xl bg-brand-card border border-white/15 px-3 py-2 text-xs sm:text-sm text-white"
                    >
                      <option value="ALL">{lang === "ar" ? "كل الحالات" : "All Statuses"}</option>
                      <option value="PENDING">PENDING</option>
                      <option value="PAID">PAID</option>
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="EXPIRED">EXPIRED</option>
                    </select>

                    <select
                      value={subLevelFilter}
                      onChange={(e) => setSubLevelFilter(e.target.value)}
                      className="rounded-xl bg-brand-card border border-white/15 px-3 py-2 text-xs sm:text-sm text-white"
                    >
                      <option value="ALL">{lang === "ar" ? "كل المستويات" : "All Levels"}</option>
                      <option value="BEGINNER">BEGINNER</option>
                      <option value="INTERMEDIATE">INTERMEDIATE</option>
                      <option value="ADVANCED">ADVANCED</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={handleExportCsv}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>{lang === "ar" ? "تصدير إلى CSV / Excel" : "Export CSV / Excel"}</span>
                  </button>
                </div>

                <div className="rounded-3xl border border-white/15 bg-brand-card overflow-x-auto">
                  <table className="w-full text-start text-xs sm:text-sm">
                    <thead className="bg-black/50 border-b border-white/10 text-white/60 uppercase text-[11px]">
                      <tr>
                        <th className="p-4 text-start">{lang === "ar" ? "المتدرب" : "Client"}</th>
                        <th className="p-4 text-start">{lang === "ar" ? "الباقة" : "Plan"}</th>
                        <th className="p-4 text-start">{lang === "ar" ? "المستوى" : "Level"}</th>
                        <th className="p-4 text-start">{lang === "ar" ? "المبلغ والعملة" : "Billing"}</th>
                        <th className="p-4 text-start">{lang === "ar" ? "الحالة" : "Status"}</th>
                        <th className="p-4 text-start">{lang === "ar" ? "تاريخ الانتهاء" : "End Date"}</th>
                        <th className="p-4 text-start">{lang === "ar" ? "إجراءات" : "Actions"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {filteredSubs.map((sub) => (
                        <tr key={sub.id} className="hover:bg-white/[0.02]">
                          <td className="p-4">
                            <div className="font-bold text-white">{sub.clientName}</div>
                            <div className="text-xs text-white/50">{sub.clientPhone}</div>
                            {sub.goal && (
                              <div className="text-[11px] text-brand-accent mt-0.5">{sub.goal}</div>
                            )}
                          </td>
                          <td className="p-4 font-semibold">
                            {lang === "ar" ? sub.planLabelAr : sub.planLabelEn}
                          </td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-full bg-brand-blue/20 text-brand-accent text-xs font-bold">
                              {sub.assessedLevel} ({sub.quizScore})
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-white">
                              {sub.displayedAmount} {sub.currencyCode}
                            </div>
                            <div className="text-[11px] text-white/50">
                              Base: {sub.basePriceEgp} EGP ({sub.paymentMethod})
                            </div>
                          </td>
                          <td className="p-4">
                            <select
                              value={sub.status}
                              onChange={(e) =>
                                handleUpdateSubscription(sub.id, { status: e.target.value })
                              }
                              className="rounded-lg bg-black/60 border border-white/15 px-2.5 py-1 text-xs font-bold text-white"
                            >
                              <option value="PENDING">PENDING</option>
                              <option value="PAID">PAID</option>
                              <option value="ACTIVE">ACTIVE</option>
                              <option value="EXPIRED">EXPIRED</option>
                            </select>
                          </td>
                          <td className="p-4 text-xs text-white/75">
                            {new Date(sub.endDate).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  handleUpdateSubscription(sub.id, { extendDays: 30 })
                                }
                                className="px-2.5 py-1 rounded-lg bg-brand-blue/20 hover:bg-brand-blue text-brand-accent hover:text-white text-xs font-bold"
                              >
                                +30d
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteSubscription(sub.id)}
                                className="p-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/30 text-red-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "PLANS" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <form
                  onSubmit={handleCreateWeeklyPlan}
                  className="lg:col-span-6 p-6 rounded-3xl border border-white/15 bg-brand-card space-y-4"
                >
                  <h3 className="text-lg font-black text-brand-accent">
                    {lang === "ar"
                      ? "إنشاء جدول تدريبي أسبوعي جديد"
                      : "Create New Weekly Workout Plan"}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-white/60 mb-1">العنوان (عربي)</label>
                      <input
                        type="text"
                        required
                        value={wpTitleAr}
                        onChange={(e) => setWpTitleAr(e.target.value)}
                        placeholder="برنامج القوة والمهارات - الأسبوع ٢"
                        className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/60 mb-1">Title (English)</label>
                      <input
                        type="text"
                        required
                        value={wpTitleEn}
                        onChange={(e) => setWpTitleEn(e.target.value)}
                        placeholder="Strength & Statics - Week 2"
                        className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-white/60 mb-1">
                        {lang === "ar" ? "رقم الأسبوع" : "Week Number"}
                      </label>
                      <input
                        type="number"
                        value={wpWeekNumber}
                        onChange={(e) => setWpWeekNumber(Number(e.target.value))}
                        className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/60 mb-1">
                        {lang === "ar" ? "المستوى المستهدف" : "Target Level Group"}
                      </label>
                      <select
                        value={wpTargetLevel}
                        onChange={(e) =>
                          setWpTargetLevel(e.target.value as typeof wpTargetLevel)
                        }
                        className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-xs text-white"
                      >
                        <option value="BEGINNER">BEGINNER</option>
                        <option value="INTERMEDIATE">INTERMEDIATE</option>
                        <option value="ADVANCED">ADVANCED</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-white/10 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white/80">
                        {lang === "ar"
                          ? "أيام التمرين والتمارين المرفقة"
                          : "Training Days & Exercises"}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setWpDays([
                            ...wpDays,
                            {
                              dayNumber: wpDays.length + 1,
                              titleAr: `اليوم ${wpDays.length + 1}: تمرين شامل`,
                              titleEn: `Day ${wpDays.length + 1}: Full Body Skill`,
                              exercises: [
                                {
                                  titleAr: "المتوازي العميق (Dips)",
                                  titleEn: "Parallel Bar Dips",
                                  sets: 4,
                                  reps: "10",
                                  restSeconds: 90,
                                  notesAr: "تحكم كامل",
                                  notesEn: "Strict form",
                                  videoUrl: "https://www.youtube.com/embed/2z8JmcrW-As",
                                },
                              ],
                            },
                          ])
                        }
                        className="px-3 py-1 rounded-lg bg-brand-blue/20 text-brand-accent text-xs font-bold flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{lang === "ar" ? "إضافة يوم" : "Add Day"}</span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-accent text-white font-bold text-xs sm:text-sm shadow-glow"
                  >
                    {lang === "ar"
                      ? "نشر الجدول الأسبوعي للمتدربين"
                      : "Publish Weekly Workout Plan"}
                  </button>
                </form>

                <div className="lg:col-span-6 space-y-4">
                  <h3 className="text-lg font-black">
                    {lang === "ar"
                      ? "الجداول التدريبية المنشورة حالياً"
                      : "Active Weekly Training Plans"}
                  </h3>
                  {weeklyPlans.map((wp) => (
                    <div
                      key={wp.id}
                      className="p-5 rounded-3xl border border-white/15 bg-brand-card space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-brand-blue/20 text-brand-accent text-xs font-bold">
                          Week #{wp.weekNumber} • {wp.targetLevel}
                        </span>
                      </div>
                      <div className="font-bold text-base">
                        {lang === "ar" ? wp.titleAr : wp.titleEn}
                      </div>
                      <div className="text-xs text-white/60">
                        {wp.days.length}{" "}
                        {lang === "ar" ? "أيام تمرين مبرمجة" : "structured training days"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "EXERCISES" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <form
                  onSubmit={handleAddExercise}
                  className="lg:col-span-5 p-6 rounded-3xl border border-white/15 bg-brand-card space-y-3 self-start"
                >
                  <h3 className="text-lg font-black text-brand-accent">
                    {lang === "ar" ? "إضافة تمرين جديد للمكتبة" : "Add New Exercise to Library"}
                  </h3>
                  <input
                    type="text"
                    required
                    value={newExTitleAr}
                    onChange={(e) => setNewExTitleAr(e.target.value)}
                    placeholder="اسم التمرين بالعربية"
                    className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-xs text-white"
                  />
                  <input
                    type="text"
                    required
                    value={newExTitleEn}
                    onChange={(e) => setNewExTitleEn(e.target.value)}
                    placeholder="Exercise Title in English"
                    className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-xs text-white"
                  />
                  <textarea
                    rows={2}
                    required
                    value={newExDescAr}
                    onChange={(e) => setNewExDescAr(e.target.value)}
                    placeholder="شرح التمرين بالعربية..."
                    className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-xs text-white"
                  />
                  <textarea
                    rows={2}
                    required
                    value={newExDescEn}
                    onChange={(e) => setNewExDescEn(e.target.value)}
                    placeholder="Exercise description in English..."
                    className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-xs text-white"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      value={newExLevel}
                      onChange={(e) => setNewExLevel(e.target.value as typeof newExLevel)}
                      className="rounded-xl bg-black/50 border border-white/15 px-2 py-2 text-xs text-white"
                    >
                      <option value="BEGINNER">BEGINNER</option>
                      <option value="INTERMEDIATE">INTERMEDIATE</option>
                      <option value="ADVANCED">ADVANCED</option>
                    </select>
                    <select
                      value={newExMuscle}
                      onChange={(e) => setNewExMuscle(e.target.value)}
                      className="rounded-xl bg-black/50 border border-white/15 px-2 py-2 text-xs text-white"
                    >
                      <option value="BACK">BACK</option>
                      <option value="SHOULDERS">SHOULDERS</option>
                      <option value="CHEST">CHEST</option>
                      <option value="CORE">CORE</option>
                      <option value="LEGS">LEGS</option>
                      <option value="FULL_BODY">FULL_BODY</option>
                    </select>
                    <select
                      value={newExSkill}
                      onChange={(e) => setNewExSkill(e.target.value)}
                      className="rounded-xl bg-black/50 border border-white/15 px-2 py-2 text-xs text-white"
                    >
                      <option value="PULL_UPS">PULL_UPS</option>
                      <option value="MUSCLE_UP">MUSCLE_UP</option>
                      <option value="PLANCHE">PLANCHE</option>
                      <option value="FRONT_LEVER">FRONT_LEVER</option>
                      <option value="HANDSTAND">HANDSTAND</option>
                      <option value="DIPS_PUSHUPS">DIPS_PUSHUPS</option>
                    </select>
                  </div>
                  <input
                    type="url"
                    value={newExVideo}
                    onChange={(e) => setNewExVideo(e.target.value)}
                    placeholder="YouTube/Vimeo Embed Video URL"
                    className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-xs text-white"
                  />
                  <input
                    type="url"
                    value={newExThumb}
                    onChange={(e) => setNewExThumb(e.target.value)}
                    placeholder="Thumbnail Photo URL"
                    className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-xs text-white"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-brand-blue hover:bg-brand-accent text-white font-bold text-xs sm:text-sm"
                  >
                    {lang === "ar" ? "إضافة التمرين وحفظ المكتبة" : "Add Exercise & Save"}
                  </button>
                </form>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {editExercises.map((ex) => (
                    <div
                      key={ex.id}
                      className="p-4 rounded-2xl border border-white/15 bg-brand-card flex flex-col justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-brand-accent font-bold mb-1">
                          <span>{ex.level}</span>
                          <span>{ex.skill}</span>
                        </div>
                        <div className="font-bold text-sm">
                          {lang === "ar" ? ex.titleAr : ex.titleEn}
                        </div>
                        <div className="text-xs text-white/60 mt-1 line-clamp-2">
                          {lang === "ar" ? ex.descriptionAr : ex.descriptionEn}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={async () => {
                          const filtered = editExercises.filter((item) => item.id !== ex.id);
                          setEditExercises(filtered);
                          await handleSaveSiteData({ exercises: filtered }, "Exercise deleted");
                        }}
                        className="self-end px-3 py-1 rounded-lg bg-red-500/15 hover:bg-red-500/30 text-red-300 text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{lang === "ar" ? "حذف" : "Delete"}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "CURRENCIES" && (
              <div className="space-y-8">
                <div className="p-6 rounded-3xl border border-white/15 bg-brand-card space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-black">
                        {lang === "ar"
                          ? "إدارة أسعار الباقات (بالجنيه المصري EGP) والأسعار الثابتة المخصصة"
                          : "Manage Plan Base Prices (EGP) & Fixed Currency Overrides"}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleSaveSiteData(
                          { pricingPlans: editPricingPlans },
                          lang === "ar" ? "تم حفظ أسعار الباقات!" : "Pricing plans saved!"
                        )
                      }
                      className="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-accent text-white font-bold text-xs flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>{lang === "ar" ? "حفظ تعديلات الباقات" : "Save Plan Prices"}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {editPricingPlans.map((plan, idx) => (
                      <div
                        key={plan.id}
                        className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2.5"
                      >
                        <div className="font-bold text-sm text-brand-accent">
                          {plan.labelAr} / {plan.labelEn}
                        </div>
                        <div>
                          <label className="block text-[11px] text-white/60">
                            Base Price (EGP)
                          </label>
                          <input
                            type="number"
                            value={plan.priceEgp}
                            onChange={(e) => {
                              const copy = [...editPricingPlans];
                              copy[idx].priceEgp = Number(e.target.value);
                              setEditPricingPlans(copy);
                            }}
                            className="w-full rounded-lg bg-black/60 border border-white/15 px-2.5 py-1.5 text-xs font-bold text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-white/60">
                            USD Override ($)
                          </label>
                          <input
                            type="number"
                            value={plan.overrides?.USD || ""}
                            onChange={(e) => {
                              const copy = [...editPricingPlans];
                              copy[idx].overrides = {
                                ...copy[idx].overrides,
                                USD: Number(e.target.value),
                              };
                              setEditPricingPlans(copy);
                            }}
                            placeholder="Auto"
                            className="w-full rounded-lg bg-black/60 border border-white/15 px-2.5 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-white/60">
                            SAR Override (ر.س)
                          </label>
                          <input
                            type="number"
                            value={plan.overrides?.SAR || ""}
                            onChange={(e) => {
                              const copy = [...editPricingPlans];
                              copy[idx].overrides = {
                                ...copy[idx].overrides,
                                SAR: Number(e.target.value),
                              };
                              setEditPricingPlans(copy);
                            }}
                            placeholder="Auto"
                            className="w-full rounded-lg bg-black/60 border border-white/15 px-2.5 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-3xl border border-white/15 bg-brand-card space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h3 className="text-lg font-black">
                      {lang === "ar"
                        ? "إدارة الـ ٢٢ عملة (الدولار + جميع العملات العربية) وقواعد التقريب"
                        : "22 Supported Currencies (USD + All Arab Currencies) & Rounding Rules"}
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSyncExchangeRates}
                        className="px-4 py-2 rounded-xl border border-brand-blue/50 bg-brand-blue/15 text-brand-accent font-bold text-xs flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>
                          {lang === "ar"
                            ? "تحديث تلقائي لأسعار الصرف"
                            : "Fetch Live Exchange Rates"}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleSaveSiteData(
                            { currencies: editCurrencies },
                            lang === "ar"
                              ? "تم حفظ إعدادات العملات!"
                              : "Currency settings saved!"
                          )
                        }
                        className="px-4 py-2 rounded-xl bg-brand-blue text-white font-bold text-xs flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{lang === "ar" ? "حفظ العملات" : "Save Currencies"}</span>
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-start text-xs">
                      <thead className="bg-black/50 text-white/60 border-b border-white/10">
                        <tr>
                          <th className="p-3 text-start">Currency</th>
                          <th className="p-3 text-start">Rate (1 EGP =)</th>
                          <th className="p-3 text-start">Mode</th>
                          <th className="p-3 text-start">Rounding Rule</th>
                          <th className="p-3 text-start">Enabled</th>
                          <th className="p-3 text-start">Default</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {editCurrencies.map((curr, idx) => (
                          <tr key={curr.code}>
                            <td className="p-3 font-bold">
                              {curr.flag} {curr.code} ({curr.symbol}) —{" "}
                              {lang === "ar" ? curr.nameAr : curr.nameEn}
                            </td>
                            <td className="p-3">
                              <input
                                type="number"
                                step="any"
                                value={curr.rateFromEgp}
                                onChange={(e) => {
                                  const copy = [...editCurrencies];
                                  copy[idx].rateFromEgp = Number(e.target.value);
                                  setEditCurrencies(copy);
                                }}
                                className="w-28 rounded bg-black/60 border border-white/15 px-2 py-1 text-white"
                              />
                            </td>
                            <td className="p-3">
                              <select
                                value={curr.isAutoRate ? "AUTO" : "MANUAL"}
                                onChange={(e) => {
                                  const copy = [...editCurrencies];
                                  copy[idx].isAutoRate = e.target.value === "AUTO";
                                  setEditCurrencies(copy);
                                }}
                                className="rounded bg-black/60 border border-white/15 px-2 py-1 text-white"
                              >
                                <option value="AUTO">Automatic API</option>
                                <option value="MANUAL">Manual Fixed</option>
                              </select>
                            </td>
                            <td className="p-3">
                              <select
                                value={curr.roundingRule}
                                onChange={(e) => {
                                  const copy = [...editCurrencies];
                                  copy[idx].roundingRule = Number(e.target.value);
                                  setEditCurrencies(copy);
                                }}
                                className="rounded bg-black/60 border border-white/15 px-2 py-1 text-white"
                              >
                                <option value={1}>Nearest 1</option>
                                <option value={5}>Nearest 5</option>
                                <option value={10}>Nearest 10</option>
                                <option value={50}>Nearest 50</option>
                              </select>
                            </td>
                            <td className="p-3">
                              <input
                                type="checkbox"
                                checked={curr.enabled}
                                onChange={(e) => {
                                  const copy = [...editCurrencies];
                                  copy[idx].enabled = e.target.checked;
                                  setEditCurrencies(copy);
                                }}
                              />
                            </td>
                            <td className="p-3">
                              <input
                                type="radio"
                                name="defaultCurrency"
                                checked={curr.isDefault}
                                onChange={() => {
                                  const copy = editCurrencies.map((c, i) => ({
                                    ...c,
                                    isDefault: i === idx,
                                  }));
                                  setEditCurrencies(copy);
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "CMS" && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl border border-white/15 bg-brand-card space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-brand-accent">
                      {lang === "ar"
                        ? "تعديل محتوى الموقع (العربية والإنجليزية) بدون كود"
                        : "Edit Bilingual Website Content (No-Code CMS)"}
                    </h3>
                    <button
                      type="button"
                      onClick={() =>
                        handleSaveSiteData(
                          {
                            siteConfig: editSiteConfig,
                            transformations: editTransformations,
                          },
                          lang === "ar"
                            ? "تم حفظ وتحديث الموقع مباشرة!"
                            : "Website content updated live!"
                        )
                      }
                      className="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-accent text-white font-bold text-xs flex items-center gap-2 shadow-glow"
                    >
                      <Save className="w-4 h-4" />
                      <span>{lang === "ar" ? "حفظ جميع التعديلات" : "Save All CMS Changes"}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/60 mb-1">
                        Hero Title (Arabic)
                      </label>
                      <input
                        type="text"
                        value={editSiteConfig.hero.titleAr}
                        onChange={(e) =>
                          setEditSiteConfig({
                            ...editSiteConfig,
                            hero: { ...editSiteConfig.hero, titleAr: e.target.value },
                          })
                        }
                        className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/60 mb-1">
                        Hero Title (English)
                      </label>
                      <input
                        type="text"
                        value={editSiteConfig.hero.titleEn}
                        onChange={(e) =>
                          setEditSiteConfig({
                            ...editSiteConfig,
                            hero: { ...editSiteConfig.hero, titleEn: e.target.value },
                          })
                        }
                        className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/60 mb-1">
                        About Story (Arabic)
                      </label>
                      <textarea
                        rows={3}
                        value={editSiteConfig.about.storyAr}
                        onChange={(e) =>
                          setEditSiteConfig({
                            ...editSiteConfig,
                            about: { ...editSiteConfig.about, storyAr: e.target.value },
                          })
                        }
                        className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/60 mb-1">
                        About Story (English)
                      </label>
                      <textarea
                        rows={3}
                        value={editSiteConfig.about.storyEn}
                        onChange={(e) =>
                          setEditSiteConfig({
                            ...editSiteConfig,
                            about: { ...editSiteConfig.about, storyEn: e.target.value },
                          })
                        }
                        className="w-full rounded-xl bg-black/50 border border-white/15 px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "QUIZ" && (
              <div className="p-6 rounded-3xl border border-white/15 bg-brand-card space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="text-lg font-black text-brand-accent">
                    {lang === "ar"
                      ? "إدارة أسئلة اختبار تحديد المستوى ونظام النقاط"
                      : "Level Assessment Quiz Questions & Tier Thresholds"}
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      handleSaveSiteData(
                        { quizConfig: editQuizConfig },
                        lang === "ar" ? "تم حفظ إعدادات الاختبار!" : "Quiz settings saved!"
                      )
                    }
                    className="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-accent text-white font-bold text-xs flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{lang === "ar" ? "حفظ تعديلات الاختبار" : "Save Quiz Config"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-black/40 border border-white/10">
                  <div>
                    <label className="block text-xs text-white/60 mb-1">
                      Intermediate Score Threshold
                    </label>
                    <input
                      type="number"
                      value={editQuizConfig.intermediateThreshold}
                      onChange={(e) =>
                        setEditQuizConfig({
                          ...editQuizConfig,
                          intermediateThreshold: Number(e.target.value),
                        })
                      }
                      className="w-full rounded-xl bg-black/60 border border-white/15 px-3 py-2 text-sm font-bold text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/60 mb-1">
                      Advanced Score Threshold
                    </label>
                    <input
                      type="number"
                      value={editQuizConfig.advancedThreshold}
                      onChange={(e) =>
                        setEditQuizConfig({
                          ...editQuizConfig,
                          advancedThreshold: Number(e.target.value),
                        })
                      }
                      className="w-full rounded-xl bg-black/60 border border-white/15 px-3 py-2 text-sm font-bold text-white"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {editQuizConfig.questions.map((q, qIdx) => (
                    <div
                      key={q.id}
                      className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={q.questionAr}
                          onChange={(e) => {
                            const copy = [...editQuizConfig.questions];
                            copy[qIdx].questionAr = e.target.value;
                            setEditQuizConfig({ ...editQuizConfig, questions: copy });
                          }}
                          className="rounded-lg bg-black/60 border border-white/15 px-3 py-1.5 text-xs font-bold text-white"
                        />
                        <input
                          type="text"
                          value={q.questionEn}
                          onChange={(e) => {
                            const copy = [...editQuizConfig.questions];
                            copy[qIdx].questionEn = e.target.value;
                            setEditQuizConfig({ ...editQuizConfig, questions: copy });
                          }}
                          className="rounded-lg bg-black/60 border border-white/15 px-3 py-1.5 text-xs font-bold text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

