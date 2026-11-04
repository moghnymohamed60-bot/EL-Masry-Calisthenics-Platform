import React from "react";
import { Subscription } from "../../../../shared/types";
import { Users, CheckCircle2, Dumbbell } from "lucide-react";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-3xl border border-white/15 bg-brand-card space-y-2">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>{lang === "ar" ? "إجمالي الاشتراكات" : "Total Subscriptions"}</span>
            <Users className="w-4 h-4 text-brand-accent" />
          </div>
          <div className="text-3xl font-black">{subscriptions.length}</div>
        </div>

        <div className="p-6 rounded-3xl border border-white/15 bg-brand-card space-y-2">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>{lang === "ar" ? "الاشتراكات النشطة" : "Active Subscriptions"}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">{activeSubsCount}</div>
        </div>

        <div className="p-6 rounded-3xl border border-white/15 bg-brand-card space-y-2">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>{lang === "ar" ? "إجمالي الإيرادات" : "Total Revenue"}</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setRevenueCurrency("EGP")}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  revenueCurrency === "EGP" ? "bg-brand-blue text-white" : "bg-white/10"
                }`}
              >
                EGP
              </button>
              <button
                type="button"
                onClick={() => setRevenueCurrency("USD")}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  revenueCurrency === "USD" ? "bg-brand-blue text-white" : "bg-white/10"
                }`}
              >
                USD
              </button>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-brand-accent">
            {displayedRevenue}
          </div>
        </div>

        <div className="p-6 rounded-3xl border border-white/15 bg-brand-card space-y-2">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>{lang === "ar" ? "التمارين والجداول النشطة" : "Exercises & Weekly Plans"}</span>
            <Dumbbell className="w-4 h-4 text-brand-accent" />
          </div>
          <div className="text-3xl font-black">
            {exercisesCount} / {weeklyPlansCount}
          </div>
        </div>
      </div>

      <div className="p-6 rounded-3xl border border-white/15 bg-brand-card space-y-4">
        <h3 className="font-bold text-base">
          {lang === "ar"
            ? "توزيع مستويات المتدربين (حسب نتائج الاختبار)"
            : "Athlete Level Distribution (Quiz Assessment Breakdown)"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { key: "BEGINNER", label: "Beginner (مبتدئ)", count: levelCounts.BEGINNER, color: "bg-emerald-500" },
            { key: "INTERMEDIATE", label: "Intermediate (متوسط)", count: levelCounts.INTERMEDIATE, color: "bg-brand-blue" },
            { key: "ADVANCED", label: "Advanced (متقدم)", count: levelCounts.ADVANCED, color: "bg-amber-500" },
          ].map((item) => {
            const pct = subscriptions.length
              ? Math.round((item.count / subscriptions.length) * 100)
              : 0;
            return (
              <div key={item.key} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>{item.label}</span>
                  <span>
                    {item.count} ({pct}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${Math.max(pct, 8)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

