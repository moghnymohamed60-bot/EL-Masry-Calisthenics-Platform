import { CurrencyConfig, PricingPlan } from "../types";

export const QUIZ_LEVEL_THRESHOLDS = {
  intermediate: 35,
  advanced: 70,
} as const;

export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  { code: "EGP", nameEn: "Egyptian Pound", nameAr: "جنيه مصري", symbol: "ج.م", flag: "🇪🇬", decimals: 0, rateFromEgp: 1, isAutoRate: false, roundingRule: 1, enabled: true, isDefault: true, sortOrder: 1 },
  { code: "USD", nameEn: "US Dollar", nameAr: "دولار أمريكي", symbol: "$", flag: "🇺🇸", decimals: 2, rateFromEgp: 0.0204, isAutoRate: true, roundingRule: 5, enabled: true, isDefault: false, sortOrder: 2 },
  { code: "SAR", nameEn: "Saudi Riyal", nameAr: "ريال سعودي", symbol: "ر.س", flag: "🇸🇦", decimals: 2, rateFromEgp: 0.0765, isAutoRate: true, roundingRule: 5, enabled: true, isDefault: false, sortOrder: 3 },
  { code: "AED", nameEn: "UAE Dirham", nameAr: "درهم إماراتي", symbol: "د.إ", flag: "🇦🇪", decimals: 2, rateFromEgp: 0.0749, isAutoRate: true, roundingRule: 5, enabled: true, isDefault: false, sortOrder: 4 },
  { code: "KWD", nameEn: "Kuwaiti Dinar", nameAr: "دينار كويتي", symbol: "د.ك", flag: "🇰🇼", decimals: 3, rateFromEgp: 0.00626, isAutoRate: true, roundingRule: 1, enabled: true, isDefault: false, sortOrder: 5 },
  { code: "QAR", nameEn: "Qatari Riyal", nameAr: "ريال قطري", symbol: "ر.ق", flag: "🇶🇦", decimals: 2, rateFromEgp: 0.0743, isAutoRate: true, roundingRule: 5, enabled: true, isDefault: false, sortOrder: 6 },
  { code: "BHD", nameEn: "Bahraini Dinar", nameAr: "دينار بحريني", symbol: "د.ب", flag: "🇧🇭", decimals: 3, rateFromEgp: 0.00769, isAutoRate: true, roundingRule: 1, enabled: true, isDefault: false, sortOrder: 7 },
  { code: "OMR", nameEn: "Omani Rial", nameAr: "ريال عماني", symbol: "ر.ع", flag: "🇴🇲", decimals: 3, rateFromEgp: 0.00785, isAutoRate: true, roundingRule: 1, enabled: true, isDefault: false, sortOrder: 8 },
  { code: "JOD", nameEn: "Jordanian Dinar", nameAr: "دينار أردني", symbol: "د.أ", flag: "🇯🇴", decimals: 3, rateFromEgp: 0.0145, isAutoRate: true, roundingRule: 1, enabled: true, isDefault: false, sortOrder: 9 },
  { code: "IQD", nameEn: "Iraqi Dinar", nameAr: "دينار عراقي", symbol: "د.ع", flag: "🇮🇶", decimals: 0, rateFromEgp: 26.7, isAutoRate: true, roundingRule: 50, enabled: true, isDefault: false, sortOrder: 10 },
  { code: "LBP", nameEn: "Lebanese Pound", nameAr: "ليرة لبنانية", symbol: "ل.ل", flag: "🇱🇧", decimals: 0, rateFromEgp: 1825, isAutoRate: true, roundingRule: 50, enabled: true, isDefault: false, sortOrder: 11 },
  { code: "SYP", nameEn: "Syrian Pound", nameAr: "ليرة سورية", symbol: "ل.س", flag: "🇸🇾", decimals: 0, rateFromEgp: 265, isAutoRate: true, roundingRule: 50, enabled: true, isDefault: false, sortOrder: 12 },
  { code: "YER", nameEn: "Yemeni Rial", nameAr: "ريال يمني", symbol: "ر.ي", flag: "🇾🇪", decimals: 0, rateFromEgp: 5.1, isAutoRate: true, roundingRule: 10, enabled: true, isDefault: false, sortOrder: 13 },
  { code: "LYD", nameEn: "Libyan Dinar", nameAr: "دينار ليبي", symbol: "د.ل", flag: "🇱🇾", decimals: 3, rateFromEgp: 0.0985, isAutoRate: true, roundingRule: 1, enabled: true, isDefault: false, sortOrder: 14 },
  { code: "TND", nameEn: "Tunisian Dinar", nameAr: "دينار تونسي", symbol: "د.ت", flag: "🇹🇳", decimals: 3, rateFromEgp: 0.0635, isAutoRate: true, roundingRule: 1, enabled: true, isDefault: false, sortOrder: 15 },
  { code: "DZD", nameEn: "Algerian Dinar", nameAr: "دينار جزائري", symbol: "د.ج", flag: "🇩🇿", decimals: 2, rateFromEgp: 2.72, isAutoRate: true, roundingRule: 10, enabled: true, isDefault: false, sortOrder: 16 },
  { code: "MAD", nameEn: "Moroccan Dirham", nameAr: "درهم مغربي", symbol: "د.م", flag: "🇲🇦", decimals: 2, rateFromEgp: 0.202, isAutoRate: true, roundingRule: 5, enabled: true, isDefault: false, sortOrder: 17 },
  { code: "SDG", nameEn: "Sudanese Pound", nameAr: "جنيه سوداني", symbol: "ج.س", flag: "🇸🇩", decimals: 2, rateFromEgp: 12.25, isAutoRate: true, roundingRule: 50, enabled: true, isDefault: false, sortOrder: 18 },
  { code: "MRU", nameEn: "Mauritanian Ouguiya", nameAr: "أوقية موريتانية", symbol: "أ.م", flag: "🇲🇷", decimals: 2, rateFromEgp: 0.81, isAutoRate: true, roundingRule: 5, enabled: true, isDefault: false, sortOrder: 19 },
  { code: "SOS", nameEn: "Somali Shilling", nameAr: "شلن صومالي", symbol: "ش.ص", flag: "🇸🇴", decimals: 2, rateFromEgp: 11.65, isAutoRate: true, roundingRule: 50, enabled: true, isDefault: false, sortOrder: 20 },
  { code: "DJF", nameEn: "Djiboutian Franc", nameAr: "فرنك جيبوتي", symbol: "ف.ج", flag: "🇩🇯", decimals: 0, rateFromEgp: 3.63, isAutoRate: true, roundingRule: 10, enabled: true, isDefault: false, sortOrder: 21 },
  { code: "KMF", nameEn: "Comorian Franc", nameAr: "فرنك قمري", symbol: "ف.ق", flag: "🇰🇲", decimals: 0, rateFromEgp: 9.15, isAutoRate: true, roundingRule: 10, enabled: true, isDefault: false, sortOrder: 22 },
];

export const BASE_PRICING_PLANS: PricingPlan[] = [
  {
    id: "plan-1",
    slug: "1-month",
    durationMonths: 1,
    labelAr: "شهر",
    labelEn: "1 Month",
    priceEgp: 2000,
    isBestValue: false,
    savingPercent: 0,
    sortOrder: 1,
    overrides: { USD: 45, SAR: 165, AED: 165 },
    featuresAr: [
      "متابعة أسبوعية مباشرة على واتساب مع الكابتن المصري",
      "جدول تدريبي مخصص بالكامل لهدفك ومستواك الحالي",
      "وصول كامل لمكتبة التمارين مع فيديوهات الشرح التفصيلية",
      "مراجعة الأداء الحركي وتصحيح التكنيك بالفيديو"
    ],
    featuresEn: [
      "Weekly follow-up on WhatsApp directly with EL Masry",
      "A structured training plan personalized to your goals & level",
      "Full access to the exercise library with explanation videos",
      "Video form checks and technique correction"
    ],
    active: true
  },
  {
    id: "plan-2",
    slug: "2-months",
    durationMonths: 2,
    labelAr: "شهرين",
    labelEn: "2 Months",
    priceEgp: 3000,
    isBestValue: false,
    savingPercent: 25,
    sortOrder: 2,
    overrides: { USD: 65, SAR: 245, AED: 240 },
    featuresAr: [
      "متابعة أسبوعية مباشرة على واتساب مع الكابتن المصري",
      "جدول تدريبي مخصص يتطور معك كل أسبوعين",
      "وصول كامل لمكتبة التمارين مع فيديوهات الشرح التفصيلية",
      "توفير ٢٥٪ مقارنة بالاشتراك الشهري",
      "إرشادات تغذية واستشفاء عضلي مخصصة"
    ],
    featuresEn: [
      "Weekly follow-up on WhatsApp directly with EL Masry",
      "A structured training plan personalized to your goals & level",
      "Full access to the exercise library with explanation videos",
      "Save 25% compared to monthly billing",
      "Personalized nutrition & recovery guidelines"
    ],
    active: true
  },
  {
    id: "plan-3",
    slug: "3-months",
    durationMonths: 3,
    labelAr: "٣ شهور",
    labelEn: "3 Months",
    priceEgp: 4500,
    isBestValue: false,
    savingPercent: 25,
    sortOrder: 3,
    overrides: { USD: 95, SAR: 355, AED: 350 },
    featuresAr: [
      "متابعة أسبوعية مباشرة على واتساب مع الكابتن المصري",
      "جدول تدريبي مخصص ومقسم لمراحل بناء القوة والمهارات",
      "وصول كامل لمكتبة التمارين مع فيديوهات الشرح التفصيلية",
      "خطة تغذية متكاملة لبناء العضلات أو التنشيف",
      "تقييم شامل للمستوى كل شهر وتحديث الأهداف"
    ],
    featuresEn: [
      "Weekly follow-up on WhatsApp directly with EL Masry",
      "A structured training plan personalized to your goals & level",
      "Full access to the exercise library with explanation videos",
      "Complete nutrition macros blueprint for muscle gain or shred",
      "Monthly level re-assessment and skill progression updates"
    ],
    active: true
  },
  {
    id: "plan-4",
    slug: "6-months",
    durationMonths: 6,
    labelAr: "٦ شهور",
    labelEn: "6 Months",
    priceEgp: 7000,
    isBestValue: false,
    savingPercent: 42,
    sortOrder: 4,
    overrides: { USD: 145, SAR: 545, AED: 535 },
    featuresAr: [
      "متابعة أسبوعية مباشرة على واتساب مع الكابتن المصري",
      "جدول تدريبي مخصص لإتقان المهارات المتقدمة (بلانش، فرونت ليفر، ماصل أب)",
      "وصول كامل لمكتبة التمارين مع فيديوهات الشرح التفصيلية",
      "توفير ٤٢٪ مقارنة بالاشتراك الشهري",
      "خطة مرونة وحماية المفاصل من الإصابات",
      "أولوية في الرد ومراجعة الفيديوهات"
    ],
    featuresEn: [
      "Weekly follow-up on WhatsApp directly with EL Masry",
      "A structured training plan personalized to your goals & level",
      "Full access to the exercise library with explanation videos",
      "Save 42% compared to monthly billing",
      "Mobility & joint-bulletproofing protocol",
      "Priority video form analysis & coaching support"
    ],
    active: true
  },
  {
    id: "plan-5",
    slug: "12-months",
    durationMonths: 12,
    labelAr: "١٢ شهر",
    labelEn: "12 Months",
    priceEgp: 9900,
    isBestValue: true,
    savingPercent: 59,
    sortOrder: 5,
    overrides: { USD: 199, SAR: 750, AED: 740 },
    featuresAr: [
      "أفضل قيمة على الإطلاق — توفير ٥٩٪ مقارنة بالاشتراك الشهري!",
      "متابعة أسبوعية مباشرة على واتساب مع الكابتن المصري طوال العام",
      "جدول تدريبي شامل يأخذك من مستواك الحالي إلى مستوى البطولات",
      "وصول كامل لمكتبة التمارين مع فيديوهات الشرح التفصيلية",
      "خطة تغذية واستشفاء ومكملات محدثة باستمرار",
      "تأهيل خاص للمهارات الاحترافية والبطولات"
    ],
    featuresEn: [
      "BEST VALUE — Save 59% compared to the monthly price!",
      "Weekly follow-up on WhatsApp directly with EL Masry all year",
      "A structured training plan personalized to your goals & level",
      "Full access to the exercise library with explanation videos",
      "Year-round periodization from fundamentals to competition-ready skills",
      "VIP priority support, nutrition updates & injury prevention"
    ],
    active: true
  }
];

