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
      <h2 className="font-display text-2xl sm:text-4xl font-black text-brand-black">
        {lang === "ar"
          ? "جدولك التدريبي الأسبوعي المخصص"
          : "YOUR STRUCTURED WEEKLY TRAINING PLAN"}
      </h2>

      {weeklyPlans.map((plan) => (
        <div
          key={plan.id}
          className="rounded-3xl border-2 border-brand-black bg-white text-brand-black p-6 sm:p-8 space-y-6 shadow-card-light"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-brand-grey pb-4">
            <div>
              <span className="px-3.5 py-1 rounded-full bg-brand-blue text-white text-xs font-black uppercase">
                {lang === "ar" ? `الأسبوع رقم ${plan.weekNumber}` : `Week #${plan.weekNumber}`} •{" "}
                {plan.targetLevel}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-brand-black mt-2">
                {lang === "ar" ? plan.titleAr : plan.titleEn}
              </h3>
            </div>
          </div>

          {(lang === "ar" ? plan.notesAr : plan.notesEn) && (
            <div className="p-4 rounded-2xl bg-brand-navy text-white border-s-4 border-brand-blue text-xs sm:text-sm font-medium">
              <strong className="text-brand-grey font-black">
                {lang === "ar" ? "توجيهات الكابتن المصري:" : "Coach EL Masry's Notes:"}{" "}
              </strong>
              {lang === "ar" ? plan.notesAr : plan.notesEn}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plan.days.map((day, dIdx) => {
              const isDarkDay = dIdx % 2 === 1;
              return (
                <div
                  key={dIdx}
                  className={`rounded-2xl border-2 p-5 space-y-4 ${
                    isDarkDay
                      ? "bg-brand-black text-white border-brand-blue"
                      : "bg-brand-grey text-brand-black border-brand-grey-mid"
                  }`}
                >
                  <h4
                    className={`font-black text-base border-b pb-2.5 ${
                      isDarkDay
                        ? "text-white border-white/15"
                        : "text-brand-navy border-brand-grey-mid"
                    }`}
                  >
                    {lang === "ar" ? day.titleAr : day.titleEn}
                  </h4>

                  <div className="space-y-3">
                    {day.exercises.map((ex, eIdx) => (
                      <div
                        key={eIdx}
                        className={`p-3.5 rounded-xl border space-y-2 ${
                          isDarkDay
                            ? "bg-brand-navy/90 border-white/15 text-white"
                            : "bg-white border-brand-grey-mid text-brand-black"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="font-black text-sm">
                            {lang === "ar" ? ex.titleAr : ex.titleEn}
                          </div>
                          {ex.videoUrl && (
                            <button
                              type="button"
                              onClick={() => onSelectVideo(ex.videoUrl!)}
                              className="px-3 py-1 rounded-lg bg-brand-blue hover:bg-brand-accent text-white text-xs font-black flex items-center gap-1 shrink-0 transition-colors"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>{lang === "ar" ? "فيديو الشرح" : "Watch Video"}</span>
                            </button>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 text-xs font-bold">
                          <span
                            className={`px-2.5 py-0.5 rounded ${
                              isDarkDay
                                ? "bg-black/60 text-brand-grey"
                                : "bg-brand-grey text-brand-black"
                            }`}
                          >
                            {lang === "ar" ? `${ex.sets} مجموعات` : `${ex.sets} Sets`}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded ${
                              isDarkDay
                                ? "bg-black/60 text-brand-grey"
                                : "bg-brand-grey text-brand-black"
                            }`}
                          >
                            {lang === "ar" ? `العدات: ${ex.reps}` : `Reps: ${ex.reps}`}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded ${
                              isDarkDay
                                ? "bg-black/60 text-brand-grey"
                                : "bg-brand-grey text-brand-black"
                            }`}
                          >
                            {lang === "ar" ? `راحة: ${ex.restSeconds} ثانية` : `Rest: ${ex.restSeconds}s`}
                          </span>
                        </div>

                        {(lang === "ar" ? ex.notesAr : ex.notesEn) && (
                          <p
                            className={`text-[11px] font-semibold ${
                              isDarkDay ? "text-brand-grey" : "text-brand-blue"
                            }`}
                          >
                            • {lang === "ar" ? ex.notesAr : ex.notesEn}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
