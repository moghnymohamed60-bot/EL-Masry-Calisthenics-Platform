import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Dumbbell, Instagram, Youtube, MessageCircle } from "lucide-react";

export function Footer() {
  const { lang, siteConfig, setIsQuizModalOpen } = useApp();
  const waNumber = (siteConfig.contact?.whatsappNumber || "201099999999").replace(/\D/g, "");
  const directWhatsappLink = `https://wa.me/${waNumber}`;

  return (
    <footer className="bg-[#060911] pt-16 pb-12 text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="p-8 sm:p-12 rounded-3xl border border-brand-blue/40 bg-gradient-to-r from-[#0F1B35] via-[#0B1324] to-[#0A0A0A] shadow-glow flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-start">
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              {lang === "ar"
                ? "هل أنت جاهز لبناء أقوى نسخة من نفسك؟"
                : "READY TO MASTER YOUR BODYWEIGHT?"}
            </h2>
            <p className="text-sm text-white/75">
              {lang === "ar"
                ? "ابدأ اختبار تحديد المستوى الآن أو تواصل مباشرة مع الكابتن المصري عبر واتساب."
                : "Take the 60-second level assessment quiz or message Coach EL Masry directly on WhatsApp."}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsQuizModalOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-accent text-white font-bold text-sm shadow-glow"
            >
              {lang === "ar" ? "ابدأ اختبار المستوى الآن" : "Start Level Quiz"}
            </button>
            <a
              href={directWhatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{lang === "ar" ? "تواصل عبر واتساب" : "WhatsApp Coach"}</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center text-white">
              <Dumbbell className="w-4 h-4" />
            </div>
            <span className="font-bold text-white">EL MASRY CALISTHENICS</span>
            <span>© {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={siteConfig.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-accent transition-colors flex items-center gap-1"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>
            <a
              href={siteConfig.contact.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-accent transition-colors"
            >
              TikTok
            </a>
            <a
              href={siteConfig.contact.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-accent transition-colors flex items-center gap-1"
            >
              <Youtube className="w-4 h-4" />
              <span>YouTube</span>
            </a>
            <Link to="/client" className="hover:text-white">
              {lang === "ar" ? "منطقة المتدرب" : "Client Portal"}
            </Link>
            <Link to="/admin" className="hover:text-brand-accent">
              {lang === "ar" ? "لوحة الإدارة" : "Admin"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

