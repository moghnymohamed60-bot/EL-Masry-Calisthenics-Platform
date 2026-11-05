import React from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { PricingSection } from "../components/pricing/PricingSection";
import { QuizSubscriptionModal } from "../components/quiz/QuizSubscriptionModal";
import { useApp } from "../context/AppContext";
import { Trophy, CheckCircle2, Flame } from "lucide-react";

export function PricingPage() {
  const { lang, setIsQuizModalOpen } = useApp();

  return (
    <div className="min-h-screen bg-brand-black text-white">
      <Navbar />
      <QuizSubscriptionModal />

      {/* Dedicated Pricing Hero Banner Featuring Uploaded PDF Photos (Image 5 & Image 2) */}
      <section className="relative py-16 bg-brand-grey text-brand-black border-b-4 border-brand-blue bg-tech-grid-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-navy text-white text-xs font-black uppercase tracking-wider">
                <Trophy className="w-4 h-4 text-brand-accent" />
                <span>
                  {lang === "ar"
                    ? "تدريب شخصي مع بطل الجمهورية والبطولات الدولية"
                    : "TRAIN WITH EGYPT'S CHAMPION CALISTHENICS COACH"}
                </span>
              </div>
              <h1 className="font-display text-4xl sm:text-6xl font-black text-brand-black leading-tight">
                {lang === "ar"
                  ? "برنامج الكاليستنكس الأونلاين يبدأ من هنا"
                  : "ONLINE CALISTHENICS PROGRAM STARTS HERE"}
              </h1>
              <p className="text-sm sm:text-base text-brand-black/80 font-medium leading-relaxed">
                {lang === "ar"
                  ? "اختر مدة الاشتراك التي تناسب هدفك، واحصل على جدول تدريبي مفصل لمستواك، تقييم أسبوعي بالفيديو، ومتابعة مباشرة عبر واتساب مع الكابتن المصري."
                  : "Comprehensive Beginner to Advanced Programs, Weekly Expert Video Feedback, and your personal Progress Tracking Dashboard."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-white border-2 border-brand-grey-mid font-black text-xs text-brand-black flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                  <span>{lang === "ar" ? "٢٢ عملة مدعومة" : "22 Supported Currencies"}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-brand-black text-white border-2 border-brand-blue font-black text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                  <span>{lang === "ar" ? "تقييم مستوى دقيق" : "10-Question Level Quiz"}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border-2 border-brand-grey-mid font-black text-xs text-brand-black flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                  <span>{lang === "ar" ? "متابعة واتساب أسبوعية" : "Weekly 1-on-1 WhatsApp"}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsQuizModalOpen(true)}
                className="px-7 py-4 rounded-2xl bg-brand-blue hover:bg-brand-navy text-white font-black text-sm sm:text-base shadow-glow inline-flex items-center gap-2 transition-all"
              >
                <Flame className="w-5 h-5" />
                <span>{lang === "ar" ? "ابدأ اختبار المستوى الآن" : "Take Level Assessment Now"}</span>
              </button>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="rounded-3xl overflow-hidden border-4 border-brand-black bg-white shadow-card-light aspect-[4/5]">
                <img
                  src="/images/coach/image5.jpeg"
                  alt="Online Calisthenics Program"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden border-4 border-brand-blue bg-brand-navy shadow-card-dark aspect-[4/5]">
                <img
                  src="/images/coach/image2.jpeg"
                  alt="First Place Champion"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <PricingSection />
      <Footer />
    </div>
  );
}
