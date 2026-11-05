import React from "react";
import { Subscription } from "../../../../shared/types";
import { Users, CheckCircle2, Dumbbell, Trophy } from "lucide-react";

export function OverviewStats({
  subscriptions,
  exercisesCount,
  weeklyPlansCount,
  revenueCurrency,
  setRevenueCurrency,
  displayedRevenue,
  lang,
}: {
  subscriptions: Subscription[];
  exercisesCount: number;
  weeklyPlansCount: number;
  revenueCurrency: "EGP" | "USD";
  setRevenueCurrency: (c: "EGP" | "USD") => void;
  displayedRevenue: string;
  lang: "ar" | "en";
}) {
  const activeSubsCount = subscriptions.filter(
    (s) => s.status === "ACTIVE" || s.status === "PAID"
  ).length;
  const levelCounts = {
    BEGINNER: subscriptions.filter((s) => s.assessedLevel === "BEGINNER").length,
    INTERMEDIATE: subscriptions.filter((s) => s.assessedLevel === "INTERMEDIATE").length,
    ADVANCED: subscriptions.filter((s) => s.assessedLevel === "ADVANCED").length,
  };

  return (
    <div className="space-y-6">
      {/* Uploaded PDF Photos Preview Strip for Admin Quick Reference */}
      <div className="p-5 rounded-3xl border-2 border-brand-blue bg-brand-navy text-white flex flex-col lg:flex-row items-center justify-between gap-4 shadow-glow">
        <div className="space-y-1">
          <div className="text-xs font-black uppercase tracking-wider text-brand-grey flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-brand-accent" />
            <span>
              {lang === "ar"
                ? "مكتبة صور الكابتن المصري المفعلة في الموقع (٨ صور رسمية)"
                : "ACTIVE WEBSITE MEDIA ASSETS (8 OFFICIAL COACH PHOTOS)"}
            </span>
          </div>
          <p className="text-xs text-brand-grey">
            {lang === "ar"
              ? "جميع الصور المرفوعة مدمجة في الواجهة الرئيسية، سجل البطولات، الباقات، التمارين، وبوابة المتدرب."
              : "All 8 uploaded photos are integrated across Hero, About, Podiums, Pricing, Exercises, and Portals."}
          </p>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <img
              key={n}
              src={`/images/coach/image${n}.jpeg`}
              alt={`Coach Asset ${n}`}
              className="w-12 h-12 rounded-xl object-cover border-2 border-white shrink-0"
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-3xl border-2 border-brand-grey-mid bg-white text-brand-black space-y-2 shadow-card-light">
          <div className="flex items-center justify-between text-xs font-black text-brand-black/70 uppercase">
            <span>{lang === "ar" ? "إجمالي الاشتراكات" : "Total Subscriptions"}</span>
            <Users className="w-4 h-4 text-brand-blue" />
          </div>
          <div className="text-3xl font-black text-brand-black">{subscriptions.length}</div>
        </div>

        <div className="p-6 rounded-3xl border-2 border-brand-blue bg-brand-black text-white space-y-2 shadow-card-dark">
          <div className="flex items-center justify-between text-xs font-black text-brand-grey uppercase">
            <span>{lang === "ar" ? "الاشتراكات النشطة" : "Active Subscriptions"}</span>
            <CheckCircle2 className="w-4 h-4 text-brand-accent" />
          </div>
          <div className="text-3xl font-black text-white">{activeSubsCount}</div>
        </div>

        <div className="p-6 rounded-3xl border-2 border-white bg-gradient-to-br from-brand-blue to-brand-royal text-white space-y-2 shadow-glow">
          <div className="flex items-center justify-between text-xs font-black text-brand-grey uppercase">
            <span>{lang === "ar" ? "إجمالي الإيرادات" : "Total Revenue"}</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setRevenueCurrency("EGP")}
                className={`px-2 py-0.5 rounded text-[10px] font-black ${
                  revenueCurrency === "EGP"
                    ? "bg-white text-brand-black"
                    : "bg-brand-black/50 text-white"
                }`}
              >
                EGP
              </button>
              <button
                type="button"
                onClick={() => setRevenueCurrency("USD")}
                className={`px-2 py-0.5 rounded text-[10px] font-black ${
                  revenueCurrency === "USD"
                    ? "bg-white text-brand-black"
                    : "bg-brand-black/50 text-white"
                }`}
              >
                USD
              </button>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{displayedRevenue}</div>
        </div>

        <div className="p-6 rounded-3xl border-2 border-brand-grey-mid bg-brand-grey text-brand-black space-y-2 shadow-card-light">
          <div className="flex items-center justify-between text-xs font-black text-brand-navy uppercase">
            <span>{lang === "ar" ? "التمارين والجداول النشطة" : "Exercises & Weekly Plans"}</span>
            <Dumbbell className="w-4 h-4 text-brand-blue" />
          </div>
          <div className="text-3xl font-black text-brand-black">
            {exercisesCount} / {weeklyPlansCount}
          </div>
        </div>
      </div>

      <div className="p-6 rounded-3xl border-2 border-brand-grey-mid bg-white text-brand-black space-y-4 shadow-card-light">
        <h3 className="font-black text-base text-brand-black">
          {lang === "ar"
            ? "توزيع مستويات المتدربين (حسب نتائج الاختبار)"
            : "Athlete Level Distribution (Quiz Assessment Breakdown)"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              key: "BEGINNER",
              label: "Beginner (مبتدئ)",
              count: levelCounts.BEGINNER,
              bar: "bg-brand-navy",
            },
            {
              key: "INTERMEDIATE",
              label: "Intermediate (متوسط)",
              count: levelCounts.INTERMEDIATE,
              bar: "bg-brand-blue",
            },
            {
              key: "ADVANCED",
              label: "Advanced (متقدم)",
              count: levelCounts.ADVANCED,
              bar: "bg-brand-black",
            },
          ].map((item) => {
            const pct = subscriptions.length
              ? Math.round((item.count / subscriptions.length) * 100)
              : 0;
            return (
              <div
                key={item.key}
                className="p-4 rounded-2xl bg-brand-grey border border-brand-grey-mid space-y-2"
              >
                <div className="flex justify-between text-xs font-black text-brand-black">
                  <span>{item.label}</span>
                  <span>
                    {item.count} ({pct}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-brand-grey-mid">
                  <div className={`h-full ${item.bar}`} style={{ width: `${Math.max(pct, 8)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
