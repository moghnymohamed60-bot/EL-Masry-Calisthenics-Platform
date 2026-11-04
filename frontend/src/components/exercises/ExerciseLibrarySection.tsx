import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Exercise } from "../../../../shared/types";
import { Play, Search, ArrowUpRight, Video, CheckCircle2, X } from "lucide-react";

export function ExerciseLibrarySection() {
  const { lang, t, exercises } = useApp();
  const [exSearch, setExSearch] = useState("");
  const [exLevel, setExLevel] = useState("ALL");
  const [exMuscle, setExMuscle] = useState("ALL");
  const [exSkill, setExSkill] = useState("ALL");
  const [activeExerciseModal, setActiveExerciseModal] = useState<Exercise | null>(null);

  const filteredExercises = exercises.filter((ex) => {
    const q = exSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      ex.titleAr.toLowerCase().includes(q) ||
      ex.titleEn.toLowerCase().includes(q) ||
      ex.descriptionAr.toLowerCase().includes(q) ||
      ex.descriptionEn.toLowerCase().includes(q);
    const matchesLevel = exLevel === "ALL" || ex.level === exLevel;
    const matchesMuscle = exMuscle === "ALL" || ex.muscleGroup === exMuscle;
    const matchesSkill = exSkill === "ALL" || ex.skill === exSkill;
    return matchesSearch && matchesLevel && matchesMuscle && matchesSkill;
  });

  const levelLabels: Record<string, { ar: string; en: string; badge: string }> = {
    BEGINNER: { ar: "مبتدئ", en: "Beginner", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    INTERMEDIATE: { ar: "متوسط", en: "Intermediate", badge: "bg-brand-blue/20 text-brand-accent border-brand-blue/40" },
    ADVANCED: { ar: "متقدم", en: "Advanced", badge: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  };

  return (
    <section id="exercises" className="py-20 bg-brand-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue/15 border border-brand-blue/40 text-brand-accent text-xs font-bold">
              <Video className="w-3.5 h-3.5" />
              <span>{t.exercises.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black">{t.exercises.title}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8 p-4 rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="relative">
            <Search className="w-4 h-4 text-white/40 absolute start-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={exSearch}
              onChange={(e) => setExSearch(e.target.value)}
              placeholder={t.exercises.searchPlaceholder}
              className="w-full rounded-xl bg-black/60 border border-white/15 focus:border-brand-blue ps-10 pe-3 py-2.5 text-xs sm:text-sm text-white outline-none"
            />
          </div>

          <select
            value={exLevel}
            onChange={(e) => setExLevel(e.target.value)}
            aria-label="Filter by Level"
            className="rounded-xl bg-black/60 border border-white/15 focus:border-brand-blue px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none"
          >
            <option value="ALL">{t.exercises.allLevels}</option>
            <option value="BEGINNER">{lang === "ar" ? "مبتدئ (Beginner)" : "Beginner"}</option>
            <option value="INTERMEDIATE">{lang === "ar" ? "متوسط (Intermediate)" : "Intermediate"}</option>
            <option value="ADVANCED">{lang === "ar" ? "متقدم (Advanced)" : "Advanced"}</option>
          </select>

          <select
            value={exMuscle}
            onChange={(e) => setExMuscle(e.target.value)}
            aria-label="Filter by Muscle Group"
            className="rounded-xl bg-black/60 border border-white/15 focus:border-brand-blue px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none"
          >
            <option value="ALL">{t.exercises.allMuscles}</option>
            <option value="BACK">{lang === "ar" ? "الظهر والسحب (Back)" : "Back & Pulling"}</option>
            <option value="SHOULDERS">{lang === "ar" ? "الأكتاف (Shoulders)" : "Shoulders"}</option>
            <option value="CHEST">{lang === "ar" ? "الصدر والدفع (Chest)" : "Chest & Triceps"}</option>
            <option value="CORE">{lang === "ar" ? "البطن والجذع (Core)" : "Core & Compression"}</option>
            <option value="LEGS">{lang === "ar" ? "الأرجل (Legs)" : "Legs"}</option>
            <option value="FULL_BODY">{lang === "ar" ? "جسم كامل (Full Body)" : "Full Body"}</option>
          </select>

          <select
            value={exSkill}
            onChange={(e) => setExSkill(e.target.value)}
            aria-label="Filter by Skill"
            className="rounded-xl bg-black/60 border border-white/15 focus:border-brand-blue px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none"
          >
            <option value="ALL">{t.exercises.allSkills}</option>
            <option value="PULL_UPS">{lang === "ar" ? "العقلة (Pull-ups)" : "Pull-ups"}</option>
            <option value="MUSCLE_UP">{lang === "ar" ? "الماصل أب (Muscle-up)" : "Muscle-Up"}</option>
            <option value="PLANCHE">{lang === "ar" ? "البلانش (Planche)" : "Planche"}</option>
            <option value="FRONT_LEVER">{lang === "ar" ? "الفرونت ليفر (Front Lever)" : "Front Lever"}</option>
            <option value="HANDSTAND">{lang === "ar" ? "الهاند ستاند (Handstand)" : "Handstand"}</option>
            <option value="DIPS_PUSHUPS">{lang === "ar" ? "المتوازي والضغط (Dips)" : "Dips & Push-ups"}</option>
            <option value="FUNDAMENTALS">{lang === "ar" ? "الأساسيات (Fundamentals)" : "Fundamentals"}</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredExercises.map((ex) => {
            const lvl = levelLabels[ex.level] || levelLabels.BEGINNER;
            return (
              <div
                key={ex.id}
                onClick={() => setActiveExerciseModal(ex)}
                className="group cursor-pointer rounded-3xl border border-white/15 bg-brand-card overflow-hidden hover:border-brand-blue transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={ex.thumbnailUrl}
                      alt={lang === "ar" ? ex.titleAr : ex.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-brand-blue/90 text-white flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ms-0.5" />
                      </div>
                    </div>
                    <span
                      className={`absolute top-3 start-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${lvl.badge}`}
                    >
                      {lang === "ar" ? lvl.ar : lvl.en}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="text-[11px] text-brand-accent font-bold uppercase tracking-wider">
                      {ex.skill.replace("_", " ")} • {ex.muscleGroup}
                    </div>
                    <h3 className="font-bold text-base text-white group-hover:text-brand-accent transition-colors">
                      {lang === "ar" ? ex.titleAr : ex.titleEn}
                    </h3>
                    <p className="text-xs text-white/65 line-clamp-2 leading-relaxed">
                      {lang === "ar" ? ex.descriptionAr : ex.descriptionEn}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-4 pt-2 flex items-center justify-between text-xs text-brand-accent font-semibold">
                  <span>{t.exercises.watchVideo}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {activeExerciseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl rounded-3xl border border-white/15 bg-[#0D1320] text-white shadow-glow-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h3 className="font-bold text-lg">
                {lang === "ar" ? activeExerciseModal.titleAr : activeExerciseModal.titleEn}
              </h3>
              <button
                type="button"
                onClick={() => setActiveExerciseModal(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10">
                <iframe
                  src={activeExerciseModal.videoUrl}
                  title={activeExerciseModal.titleEn}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                {lang === "ar" ? activeExerciseModal.descriptionAr : activeExerciseModal.descriptionEn}
              </p>
              {((lang === "ar" ? activeExerciseModal.cuesAr : activeExerciseModal.cuesEn) || []).length > 0 && (
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-accent">
                    {lang === "ar" ? "أهم نقاط الأداء الصحيح (Coaching Cues):" : "Key Coaching Cues:"}
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-white/85">
                    {(lang === "ar" ? activeExerciseModal.cuesAr : activeExerciseModal.cuesEn).map((cue, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                        <span>{cue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

