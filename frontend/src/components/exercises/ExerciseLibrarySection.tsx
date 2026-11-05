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
    BEGINNER: {
      ar: "مبتدئ",
      en: "Beginner",
      badge: "bg-white text-brand-black border-brand-grey-mid",
    },
    INTERMEDIATE: {
      ar: "متوسط",
      en: "Intermediate",
      badge: "bg-brand-blue text-white border-white/30",
    },
    ADVANCED: {
      ar: "متقدم",
      en: "Advanced",
      badge: "bg-brand-black text-brand-grey border-brand-blue",
    },
  };

  return (
    <section
      id="exercises"
      className="py-20 bg-white text-brand-black border-b-4 border-brand-blue"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-navy text-white text-xs font-black uppercase tracking-wider">
              <Video className="w-3.5 h-3.5 text-brand-accent" />
              <span>{t.exercises.badge}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-brand-black">
              {t.exercises.title}
            </h2>
          </div>
        </div>

        {/* Light Grey & Black Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10 p-4 rounded-2xl border-2 border-brand-grey-mid bg-brand-grey shadow-sm">
          <div className="relative">
            <Search className="w-4 h-4 text-brand-black/50 absolute start-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={exSearch}
              onChange={(e) => setExSearch(e.target.value)}
              placeholder={t.exercises.searchPlaceholder}
              className="w-full rounded-xl bg-white border-2 border-brand-grey-mid focus:border-brand-blue ps-10 pe-3 py-2.5 text-xs sm:text-sm font-bold text-brand-black placeholder:text-brand-black/45 outline-none"
            />
          </div>

          <select
            value={exLevel}
            onChange={(e) => setExLevel(e.target.value)}
            aria-label="Filter by Level"
            className="rounded-xl bg-brand-black border-2 border-brand-navy focus:border-brand-blue px-3.5 py-2.5 text-xs sm:text-sm font-bold text-white outline-none"
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
            className="rounded-xl bg-brand-black border-2 border-brand-navy focus:border-brand-blue px-3.5 py-2.5 text-xs sm:text-sm font-bold text-white outline-none"
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
            className="rounded-xl bg-brand-black border-2 border-brand-navy focus:border-brand-blue px-3.5 py-2.5 text-xs sm:text-sm font-bold text-white outline-none"
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
          {filteredExercises.map((ex, idx) => {
            const lvl = levelLabels[ex.level] || levelLabels.BEGINNER;
            const isDarkCard = idx % 2 === 1;
            return (
              <div
                key={ex.id}
                onClick={() => setActiveExerciseModal(ex)}
                className={`group cursor-pointer rounded-3xl border-2 overflow-hidden transition-all flex flex-col justify-between hover:-translate-y-1.5 ${
                  isDarkCard
                    ? "bg-brand-black text-white border-brand-navy hover:border-brand-blue shadow-card-dark"
                    : "bg-brand-grey text-brand-black border-brand-grey-mid hover:border-brand-blue shadow-card-light"
                }`}
              >
                <div>
                  <div className="relative aspect-video bg-brand-black overflow-hidden">
                    <img
                      src={ex.thumbnailUrl}
                      alt={lang === "ar" ? ex.titleAr : ex.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/85 via-brand-black/20 to-transparent flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform border-2 border-white">
                        <Play className="w-5 h-5 fill-current ms-0.5" />
                      </div>
                    </div>
                    <span
                      className={`absolute top-3 start-3 px-3 py-0.5 rounded-full text-[11px] font-black border ${lvl.badge}`}
                    >
                      {lang === "ar" ? lvl.ar : lvl.en}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="text-[11px] text-brand-blue font-black uppercase tracking-wider">
                      {ex.skill.replace("_", " ")} • {ex.muscleGroup}
                    </div>
                    <h3
                      className={`font-black text-base transition-colors ${
                        isDarkCard
                          ? "text-white group-hover:text-brand-accent"
                          : "text-brand-black group-hover:text-brand-blue"
                      }`}
                    >
                      {lang === "ar" ? ex.titleAr : ex.titleEn}
                    </h3>
                    <p
                      className={`text-xs line-clamp-2 leading-relaxed font-medium ${
                        isDarkCard ? "text-brand-grey" : "text-brand-black/75"
                      }`}
                    >
                      {lang === "ar" ? ex.descriptionAr : ex.descriptionEn}
                    </p>
                  </div>
                </div>

                <div
                  className={`px-5 py-3 border-t flex items-center justify-between text-xs font-black ${
                    isDarkCard
                      ? "border-white/10 bg-brand-navy/60 text-white"
                      : "border-brand-grey-mid bg-white text-brand-blue"
                  }`}
                >
                  <span>{t.exercises.watchVideo}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {activeExerciseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl rounded-3xl border-2 border-brand-blue bg-brand-black text-white shadow-glow-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/15 bg-brand-navy">
              <h3 className="font-black text-lg">
                {lang === "ar" ? activeExerciseModal.titleAr : activeExerciseModal.titleEn}
              </h3>
              <button
                type="button"
                onClick={() => setActiveExerciseModal(null)}
                className="p-2 rounded-xl bg-white text-brand-black hover:bg-brand-grey font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border-2 border-brand-grey/20">
                <iframe
                  src={activeExerciseModal.videoUrl}
                  title={activeExerciseModal.titleEn}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-sm text-brand-grey font-medium leading-relaxed">
                {lang === "ar" ? activeExerciseModal.descriptionAr : activeExerciseModal.descriptionEn}
              </p>
              {((lang === "ar" ? activeExerciseModal.cuesAr : activeExerciseModal.cuesEn) || []).length > 0 && (
                <div className="p-4 rounded-2xl bg-white text-brand-black border-2 border-brand-blue space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-brand-blue">
                    {lang === "ar" ? "أهم نقاط الأداء الصحيح (Coaching Cues):" : "Key Coaching Cues:"}
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm font-bold text-brand-black">
                    {(lang === "ar" ? activeExerciseModal.cuesAr : activeExerciseModal.cuesEn).map((cue, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
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
