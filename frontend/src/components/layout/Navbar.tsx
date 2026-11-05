import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { Dumbbell, Globe, Menu, X, Shield, UserCheck, Flame } from "lucide-react";

export function Navbar() {
  const { lang, setLang, t, setIsQuizModalOpen } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navLinks = [
    { href: isHome ? "#about" : "/#about", label: t.nav.about },
    { href: isHome ? "#achievements" : "/#achievements", label: t.nav.achievements },
    { href: isHome ? "#transformations" : "/#transformations", label: t.nav.transformations },
    { href: isHome ? "#how-it-works" : "/#how-it-works", label: t.nav.howItWorks },
    { href: "/pricing", label: t.nav.pricing, isRoute: true },
    { href: "/exercises", label: t.nav.exercises, isRoute: true },
    { href: isHome ? "#faq" : "/#faq", label: t.nav.faq },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080A0F]/95 backdrop-blur-xl border-b border-brand-grey-mid/20 shadow-card-dark">
      {/* Top Championship Identity Ribbon (Inspired by Image 5 & 6) */}
      <div className="bg-gradient-to-r from-brand-navy via-brand-blue to-brand-navy border-b border-white/15 py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-bold tracking-wider uppercase text-white">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-brand-black/60 border border-white/20 text-brand-grey">
              🇪🇬 EG • CALISTHENICS
            </span>
            <span className="hidden sm:inline text-brand-grey">
              {lang === "ar"
                ? "أكاديمية الكابتن المصري للتدريب الأونلاين — القوة تُكتسب بالالتزام"
                : "STRENGTH IS EARNED • AUTHENTIC BODYWEIGHT POWER"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-brand-grey">
            <span>🥇 1st Place Move DB</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">🥈 2nd Place Summer Festival</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden border-2 border-brand-blue shadow-glow group-hover:scale-105 transition-transform bg-brand-navy flex items-center justify-center">
            <img
              src="/images/coach/image7.jpeg"
              alt="EL Masry"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute bottom-0 inset-x-0 h-1 bg-brand-blue" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-2xl sm:text-3xl font-black tracking-wider text-white leading-none">
              EL MASRY
            </span>
            <span className="text-[10px] tracking-[0.24em] text-brand-grey font-bold uppercase mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue inline-block" />
              {t.nav.brandSub}
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded-2xl p-1.5">
          {navLinks.map((item) => {
            const active =
              (item.isRoute && location.pathname === item.href) ||
              (!item.isRoute && location.hash === item.href);
            return item.isRoute ? (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all ${
                  active
                    ? "bg-brand-blue text-white shadow-glow"
                    : "text-brand-grey hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold text-brand-grey hover:text-white hover:bg-white/5 transition-all"
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <CurrencySwitcher compact />

          <button
            type="button"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            aria-label="Switch Language"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-brand-grey-mid/25 bg-brand-grey/10 hover:bg-white hover:text-brand-black text-xs font-extrabold text-white transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-brand-accent" />
            <span>{lang === "ar" ? "EN" : "عربي"}</span>
          </button>

          <Link
            to="/client"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-brand-grey-mid/30 bg-brand-grey text-brand-black hover:bg-white text-xs font-extrabold transition-all shadow-sm"
          >
            <UserCheck className="w-3.5 h-3.5 text-brand-blue" />
            <span>{t.nav.clientArea}</span>
          </Link>

          <Link
            to="/admin"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-brand-blue/50 bg-brand-navy hover:bg-brand-blue text-xs font-bold text-white transition-all"
          >
            <Shield className="w-3.5 h-3.5 text-brand-accent" />
            <span>{t.nav.admin}</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsQuizModalOpen(true)}
            className="hidden md:inline-flex items-center gap-1.5 justify-center px-4 py-2 rounded-xl bg-brand-blue hover:bg-brand-accent text-white font-black text-xs sm:text-sm shadow-glow transition-all"
          >
            <Flame className="w-4 h-4" />
            <span>{t.nav.levelQuiz}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden p-2 rounded-xl border border-white/20 text-white hover:bg-white/10"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-white/15 bg-brand-black px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) =>
              item.isRoute ? (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3.5 py-2.5 rounded-xl bg-brand-navy border border-white/10 text-sm font-bold text-brand-grey hover:bg-brand-blue hover:text-white"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3.5 py-2.5 rounded-xl bg-brand-navy border border-white/10 text-sm font-bold text-brand-grey hover:bg-brand-blue hover:text-white"
                >
                  {item.label}
                </a>
              )
            )}
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-white/10">
            <Link
              to="/client"
              onClick={() => setMobileOpen(false)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-brand-grey text-brand-black text-xs font-black"
            >
              <UserCheck className="w-4 h-4 text-brand-blue" />
              <span>{t.nav.clientArea}</span>
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-brand-blue/50 bg-brand-navy text-xs font-bold text-white"
            >
              <Shield className="w-4 h-4 text-brand-accent" />
              <span>{t.nav.admin}</span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              setIsQuizModalOpen(true);
            }}
            className="w-full py-3 rounded-xl bg-brand-blue text-white font-black text-sm shadow-glow flex items-center justify-center gap-2"
          >
            <Dumbbell className="w-4 h-4" />
            <span>{t.nav.levelQuiz}</span>
          </button>
        </div>
      )}
    </header>
  );
}
