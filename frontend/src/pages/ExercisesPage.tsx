import React from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ExerciseLibrarySection } from "../components/exercises/ExerciseLibrarySection";
import { QuizSubscriptionModal } from "../components/quiz/QuizSubscriptionModal";
import { useApp } from "../context/AppContext";
import { Dumbbell } from "lucide-react";

export function ExercisesPage() {
  const { lang } = useApp();

  return (
    <div className="min-h-screen bg-brand-black text-white">
      <Navbar />
      <QuizSubscriptionModal />

      {/* Dedicated Exercises Page Header with Uploaded Action Shots (Image 1, Image 6, Image 8) */}
      <section className="py-14 bg-gradient-to-b from-brand-navy to-brand-black border-b-4 border-brand-blue bg-tech-grid-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-brand-navy text-xs font-black uppercase tracking-wider">
                <Dumbbell className="w-4 h-4 text-brand-blue" />
                <span>
                  {lang === "ar"
                    ? "الأداء القياسي والتكنيك الصحيح"
                    : "MASTER YOUR OWN BODY • DEFY GRAVITY"}
                </span>
              </div>
              <h1 className="font-display text-4xl sm:text-6xl font-black text-white leading-tight">
                {lang === "ar"
                  ? "موسوعة تمارين ومهارات الكابتن المصري"
                  : "EL MASRY CALISTHENICS SKILL & EXERCISE VAULT"}
              </h1>
              <p className="text-sm sm:text-base text-brand-grey font-medium max-w-2xl">
                {lang === "ar"
                  ? "تصفح التمارين حسب المستوى (مبتدئ / متوسط / متقدم) أو العضلة المستهدفة أو المهارة، وشاهد شرح الأداء الصحيح خطوة بخطوة."
                  : "Filter by Beginner, Intermediate, or Advanced progressions and study strict biomechanics and scapular cues."}
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl overflow-hidden border-2 border-white aspect-[3/4] bg-brand-black">
                <img
                  src="/images/coach/image1.jpeg"
                  alt="Parallel Bar Dips"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border-2 border-brand-blue aspect-[3/4] bg-brand-navy -translate-y-2 shadow-glow">
                <img
                  src="/images/coach/image6.jpeg"
                  alt="Defy Gravity"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border-2 border-brand-grey aspect-[3/4] bg-brand-black">
                <img
                  src="/images/coach/image8.jpeg"
                  alt="Weighted Muscle Up"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ExerciseLibrarySection />
      <Footer />
    </div>
  );
}
