import React from "react";
import { WeeklyPlan } from "../../../../shared/types";
import { Play } from "lucide-react";

export function WeeklyPlanViewer({
  weeklyPlans,
  lang,
  onSelectVideo,
}: {
  weeklyPlans: WeeklyPlan[];
  lang: "ar" | "en";
  onSelectVideo: (url: string) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-black">
        {lang === "ar"
          ? "جدولك التدريبي الأسبوعي المخصص"
          : "YOUR STRUCTURED WEEKLY TRAINING PLAN"}
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
                            onClick={() => onSelectVideo(ex.videoUrl!)}
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
  );
}

