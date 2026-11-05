import React, { useState, useRef, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { ChevronDown, Search, Check } from "lucide-react";

export function CurrencySwitcher({ compact = false }: { compact?: boolean }) {
  const { currency, currencies, setCurrencyByCode, lang } = useApp();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = currencies.filter((c) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      c.code.toLowerCase().includes(q) ||
      c.nameEn.toLowerCase().includes(q) ||
      c.nameAr.includes(q) ||
      c.symbol.toLowerCase().includes(q)
    );
  });

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={lang === "ar" ? "تغيير العملة" : "Select Currency"}
        className={`flex items-center gap-2 rounded-xl border border-brand-blue/50 bg-brand-black hover:bg-brand-navy hover:border-brand-blue transition-all text-white font-bold shadow-sm ${
          compact ? "px-3 py-1.5 text-xs sm:text-sm" : "px-4 py-2.5 text-sm"
        }`}
      >
        <span className="text-base leading-none">{currency.flag}</span>
        <span className="font-black tracking-wide text-white">{currency.code}</span>
        <span className="text-brand-grey text-xs">({currency.symbol})</span>
        <ChevronDown
          className={`w-4 h-4 text-brand-accent transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className={`absolute z-50 mt-2 w-72 rounded-2xl border-2 border-brand-blue bg-brand-black text-white shadow-glow-lg overflow-hidden ${
            lang === "ar" ? "left-0" : "right-0"
          }`}
        >
          <div className="p-2.5 border-b border-white/15 bg-brand-navy">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-brand-grey absolute start-3 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={
                  lang === "ar" ? "ابحث عن العملة أو الدولة..." : "Search currency or country..."
                }
                className="w-full bg-brand-black border border-white/20 focus:border-brand-blue rounded-lg ps-9 pe-3 py-2 text-xs text-white placeholder:text-brand-grey/60 outline-none font-medium"
              />
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto divide-y divide-white/10">
            {filtered.length === 0 ? (
              <div className="p-4 text-center text-xs text-brand-grey">
                {lang === "ar" ? "لا توجد عملة مطابقة" : "No matching currency"}
              </div>
            ) : (
              filtered.map((item) => {
                const isSelected = item.code === currency.code;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      setCurrencyByCode(item.code);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs sm:text-sm transition-colors ${
                      isSelected
                        ? "bg-brand-blue text-white font-black"
                        : "text-brand-grey hover:bg-brand-navy hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{item.flag}</span>
                      <div className="text-start">
                        <div className="flex items-center gap-1.5">
                          <span className="font-black text-white">{item.code}</span>
                          <span
                            className={`text-xs font-bold ${
                              isSelected ? "text-white" : "text-brand-accent"
                            }`}
                          >
                            ({item.symbol})
                          </span>
                        </div>
                        <div
                          className={`text-[11px] ${
                            isSelected ? "text-brand-grey" : "text-brand-grey/70"
                          }`}
                        >
                          {lang === "ar" ? item.nameAr : item.nameEn}
                        </div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
