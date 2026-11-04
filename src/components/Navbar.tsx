"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { Dumbbell, Globe, Menu, X, Shield, UserCheck } from "lucide-react";

export function Navbar() {
  const { lang, setLang, setIsQuizModalOpen } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "#about", labelAr: "عن المصري", labelEn: "About" },
    { href: "#achievements", labelAr: "البطولات", labelEn: "Achievements" },
    { href: "#transformations", labelAr: "التحولات", labelEn: "Results" },
    { href: "#how-it-works", labelAr: "كيف نبدأ", labelEn: "How It Works" },
    { href: "#pricing", labelAr: "الباقات", labelEn: "Pricing" },
    { href: "#exercises", labelAr: "مكتبة التمارين", labelEn: "Exercises" },
    { href: "#faq", labelAr: "الأسئلة", labelEn: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-accent flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
            <Dumbbell className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl sm:text-2xl font-black tracking-wider text-white leading-none">
              EL MASRY
            </span>
            <span className="text-[10px] tracking-[0.22em] text-brand-accent font-semibold uppercase">
              {lang === "ar" ? "كاليستنكس" : "CALISTHENICS"}
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/75 hover:text-brand-accent transition-colors"
            >
              {lang === "ar" ? item.labelAr : item.labelEn}
            </a>
          ))}
        </nav>

        {/* Controls: Currency + Language + Client/Admin + CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <CurrencySwitcher compact />

          <button
            type="button"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            aria-label="Switch Language"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs sm:text-sm font-semibold text-white transition-all"
          >
            <Globe className="w-4 h-4 text-brand-accent" />
            <span>{lang === "ar" ? "EN" : "عربي"}</span>
          </button>

          <Link
            href="/client"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs sm:text-sm font-medium text-white/90 transition-all"
          >
            <UserCheck className="w-4 h-4 text-brand-accent" />
            <span>{lang === "ar" ? "منطقة المتدرب" : "Client Area"}</span>
          </Link>

          <Link
            href="/admin"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-brand-blue/40 bg-brand-blue/10 hover:bg-brand-blue/20 text-xs font-medium text-brand-accent transition-all"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{lang === "ar" ? "لوحة التحكم" : "Admin"}</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsQuizModalOpen(true)}
            className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-accent hover:brightness-110 text-white font-bold text-xs sm:text-sm shadow-glow transition-all"
          >
            {lang === "ar" ? "اختبر مستواك" : "Level Quiz"}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden p-2 rounded-xl border border-white/15 text-white hover:bg-white/10"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0A0A0A]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 rounded-xl bg-white/5 text-sm font-medium text-white/85 hover:bg-brand-blue/20 hover:text-white"
              >
                {lang === "ar" ? item.labelAr : item.labelEn}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-white/10">
            <Link
              href="/client"
              onClick={() => setMobileOpen(false)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-white/15 bg-white/5 text-xs font-semibold text-white"
            >
              <UserCheck className="w-4 h-4 text-brand-accent" />
              <span>{lang === "ar" ? "منطقة المتدرب" : "Client Login"}</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-brand-blue/40 bg-brand-blue/10 text-xs font-semibold text-brand-accent"
            >
              <Shield className="w-4 h-4" />
              <span>{lang === "ar" ? "لوحة الإدارة" : "Admin Panel"}</span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              setIsQuizModalOpen(true);
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-accent text-white font-bold text-sm shadow-glow"
          >
            {lang === "ar" ? "ابدأ اختبار المستوى والاشتراك الآن" : "Take Level Quiz & Start Now"}
          </button>
        </div>
      )}
    </header>
  );
}

