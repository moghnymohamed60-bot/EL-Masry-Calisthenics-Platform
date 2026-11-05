import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Dumbbell, Instagram, Youtube, MessageCircle, Flame } from "lucide-react";

export function Footer() {
  const { lang, siteConfig, setIsQuizModalOpen } = useApp();
  const waNumber = (siteConfig.contact?.whatsappNumber || "201099999999").replace(/\D/g, "");
  const directWhatsappLink = `https://wa.me/${waNumber}`;

  return (
    <footer className="bg-brand-black pt-16 pb-12 text-brand-grey border-t-4 border-brand-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* High-Impact CTA Banner with Coach Photo & Blue/White/Grey/Black Contrast */}
        <div className="relative overflow-hidden p-6 sm:p-10 rounded-3xl border-2 border-brand-blue bg-gradient-to-r from-brand-navy via-brand-royal to-brand-black shadow-glow-lg flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-start">
            <img
              src="/images/coach/image1.jpeg"
              alt="Coach EL Masry"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover object-top border-2 border-white shadow-lg shrink-0"
            />
            <div className="space-y-2">
              <span className="inline-block px-3 py-0.5 rounded-full bg-white text-brand-black text-[11px] font-black uppercase tracking-wider">
                {lang === "ar" ? "انضم لأبطال الكابتن المصري" : "MASTER YOUR OWN BODY • DEFY GRAVITY"}
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-black text-white">
                {lang === "ar"
                  ? "هل أنت جاهز لبناء أقوى نسخة من نفسك؟"
                  : "READY TO MASTER YOUR BODYWEIGHT?"}
              </h2>
              <p className="text-xs sm:text-sm text-brand-grey font-medium max-w-xl">
                {lang === "ar"
                  ? "ابدأ اختبار تحديد المستوى الآن أو تواصل مباشرة مع الكابتن المصري عبر واتساب."
                  : "Take the 60-second level assessment quiz or message Coach EL Masry directly on WhatsApp."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsQuizModalOpen(true)}
              className="px-6 py-4 rounded-xl bg-brand-blue hover:bg-brand-accent text-white font-black text-xs sm:text-sm shadow-glow flex items-center gap-2 border border-white/25 transition-all"
            >
              <Flame className="w-4 h-4" />
              <span>{lang === "ar" ? "ابدأ اختبار المستوى الآن" : "Start Level Quiz"}</span>
            </button>
            <a
              href={directWhatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl bg-white hover:bg-brand-grey text-brand-black font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 text-brand-blue" />
              <span>{lang === "ar" ? "تواصل عبر واتساب" : "WhatsApp Coach"}</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/15 pt-8 text-xs font-semibold">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-blue flex items-center justify-center text-white border border-white/20">
              <Dumbbell className="w-4 h-4" />
            </div>
            <span className="font-black text-white tracking-wider">EL MASRY CALISTHENICS</span>
            <span className="px-2 py-0.5 rounded bg-brand-grey text-brand-black text-[10px] font-black">
              🇪🇬 EG
            </span>
            <span>© {new Date().getFullYear()}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={siteConfig.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Instagram className="w-4 h-4 text-brand-accent" />
              <span>Instagram</span>
            </a>
            <a
              href={siteConfig.contact.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              TikTok
            </a>
            <a
              href={siteConfig.contact.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Youtube className="w-4 h-4 text-brand-accent" />
              <span>YouTube</span>
            </a>
            <Link to="/pricing" className="hover:text-white">
              {lang === "ar" ? "الباقات" : "Pricing"}
            </Link>
            <Link to="/exercises" className="hover:text-white">
              {lang === "ar" ? "التمارين" : "Exercises"}
            </Link>
            <Link to="/client" className="hover:text-white">
              {lang === "ar" ? "منطقة المتدرب" : "Client Portal"}
            </Link>
            <Link to="/admin" className="text-brand-accent hover:text-white font-bold">
              {lang === "ar" ? "لوحة الإدارة" : "Admin"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
