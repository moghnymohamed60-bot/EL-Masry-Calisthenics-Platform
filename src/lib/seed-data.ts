// Default comprehensive seed data for EL Masry Calisthenics Platform
// Covers 22 Currencies (USD + 21 Arab Currencies), 5 Pricing Plans, Achievements, Timeline,
// Exercise Library, Transformations, 10-question Level Assessment Quiz, and Sample Weekly Plans.

export interface CurrencyItem {
  code: string;
  nameEn: string;
  nameAr: string;
  symbol: string;
  flag: string;
  decimals: number;
  rateFromEgp: number;
  isAutoRate: boolean;
  roundingRule: number; // 1 = exact/nearest 1, 5 = nearest 5, 10 = nearest 10, 50 = nearest 50
  enabled: boolean;
  isDefault: boolean;
  sortOrder: number;
}

export const INITIAL_CURRENCIES: CurrencyItem[] = [
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

export const INITIAL_PRICING_PLANS = [
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  }
];

export const INITIAL_SITE_CONFIG = {
  hero: {
    badgeAr: "بطل الكاليستنكس المصري • تدريب أونلاين احترافي",
    badgeEn: "EGYPTIAN CALISTHENICS CHAMPION • ELITE ONLINE COACHING",
    titleAr: "المصري — اصنع قوتك الحقيقية بوزن جسمك",
    titleEn: "EL MASRY — MASTER YOUR BODYWEIGHT",
    subtitleAr: "من البداية في ٢٠١٩ إلى منصات التتويج في ٢٠٢٢. احصل على خطة تدريبية مفصلة لمستواك ومتابعة شخصية أسبوعية مباشرة مع الكابتن المصري لتحقيق أقوى تحول جسدي ومهاري.",
    subtitleEn: "From starting out in 2019 to championship podiums since 2022. Get a structured training plan tailored to your exact level with weekly 1-on-1 WhatsApp follow-ups directly with Coach EL Masry.",
    ctaPrimaryAr: "ابدأ رحلتك الآن",
    ctaPrimaryEn: "Start Your Journey",
    ctaWhatsappAr: "تواصل عبر واتساب",
    ctaWhatsappEn: "Chat on WhatsApp",
    heroImageUrl: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1600&q=85",
    heroVideoUrl: "https://www.youtube.com/embed/IODxDxX7oi4"
  },
  about: {
    titleAr: "عن الكابتن المصري",
    titleEn: "ABOUT EL MASRY",
    subtitleAr: "قصة إصرار من التمرين في الحدائق إلى منصات البطولات",
    subtitleEn: "A Journey of Discipline from Street Bars to Championship Podiums",
    storyAr: "بدأت رحلتي في عالم الكاليستنكس عام ٢٠١٩ بشغف كبير للتحكم في وزن الجسم وبناء قوة حقيقية تتجاوز الشكل الظاهري. بعد ٣ سنوات من الالتزام الصارم والتجربة العلمية، دخلت عالم المنافسات الاحترافية في ٢٠٢٢ وحققت المركز الأول في بطولات كبرى مثل iFlag و EGYFIT و Move DB. هدفي الآن هو اختصار سنوات من التجربة والخطأ عليك من خلال نظام تدريبي علمي ومجرب يناسب مستواك سواء كنت مبتدئاً تماماً أو لاعباً متقدماً.",
    storyEn: "I began my calisthenics journey in 2019 with a relentless drive to master bodyweight strength and static skills. After three years of disciplined preparation, I stepped onto the competitive stage in 2022—claiming 1st Place titles at iFlag Championship, EGYFIT, and Move DB, alongside 2nd Place finishes at the National Championship and Cali Coast. Today, I coach athletes worldwide to shortcut years of trial and error through structured, injury-free progressions.",
    photoUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=85",
    stats: [
      { valueAr: "٢٠١٩", valueEn: "2019", labelAr: "بداية الرحلة", labelEn: "Started Journey" },
      { valueAr: "٢٠٢٢", valueEn: "2022", labelAr: "بداية البطولات", labelEn: "Started Competing" },
      { valueAr: "+٥", valueEn: "5+", labelAr: "بطولات كبرى", labelEn: "Major Podiums" },
      { valueAr: "+٥٠٠", valueEn: "500+", labelAr: "متدرب حول العالم", labelEn: "Athletes Coached" }
    ],
    timeline: [
      {
        year: "2019",
        titleAr: "انطلاق رحلة الكاليستنكس",
        titleEn: "Started Calisthenics Career",
        descAr: "بداية التأسيس البدني وبناء القوة الأساسية وإتقان الحركات المركبة بوزن الجسم.",
        descEn: "Built the foundational strength base, mastering strict pull-ups, dips, handstands, and core control."
      },
      {
        year: "2022",
        titleAr: "دخول ساحات البطولات",
        titleEn: "Entered Professional Competitions",
        descAr: "الانتقال للمستوى التنافسي الاحترافي وتقديم أقوى العروض في مهارات الثبات والديناميك.",
        descEn: "Transitioned to elite competitive calisthenics, showcasing world-class static holds and dynamic combos."
      },
      {
        year: "2022–Present",
        titleAr: "حصد المراكز الأولى وتأسيس التدريب الأونلاين",
        titleEn: "Championship Wins & Online Coaching Academy",
        descAr: "تحقيق المركز الأول في iFlag و EGYFIT و Move DB والمركز الثاني في بطولة الجمهورية و Cali Coast، وتدريب مئات الأبطال أونلاين.",
        descEn: "Won 1st Place at iFlag, EGYFIT, and Move DB, plus 2nd Place at Nationals & Cali Coast while coaching hundreds of athletes globally."
      }
    ]
  },
  achievements: [
    {
      id: "ach-1",
      medal: "🥇",
      rankAr: "المركز الأول",
      rankEn: "1st Place",
      titleAr: "بطولة iFlag Championship",
      titleEn: "iFlag Championship",
      year: "2023",
      categoryAr: "القوة والمهارات الاحترافية",
      categoryEn: "Elite Strength & Statics"
    },
    {
      id: "ach-2",
      medal: "🥇",
      rankAr: "المركز الأول",
      rankEn: "1st Place",
      titleAr: "بطولة EGYFIT",
      titleEn: "EGYFIT Championship",
      year: "2023",
      categoryAr: "الكاليستنكس للمحترفين",
      categoryEn: "Pro Calisthenics Division"
    },
    {
      id: "ach-3",
      medal: "🥇",
      rankAr: "المركز الأول",
      rankEn: "1st Place",
      titleAr: "بطولة Move DB",
      titleEn: "Move DB Competition",
      year: "2024",
      categoryAr: "التحمل والقوة القصوى",
      categoryEn: "Freestyle & Power"
    },
    {
      id: "ach-4",
      medal: "🥈",
      rankAr: "المركز الثاني",
      rankEn: "2nd Place",
      titleAr: "بطولة الجمهورية (National Championship)",
      titleEn: "National Championship",
      year: "2023",
      categoryAr: "البطولة الرسمية",
      categoryEn: "Official National Finals"
    },
    {
      id: "ach-5",
      medal: "🥈",
      rankAr: "المركز الثاني",
      rankEn: "2nd Place",
      titleAr: "بطولة Cali Coast",
      titleEn: "Cali Coast Championship",
      year: "2022",
      categoryAr: "منافسات الساحل",
      categoryEn: "Coastal Elite Battle"
    }
  ],
  howItWorks: [
    {
      step: "01",
      titleAr: "اختر باقتك",
      titleEn: "Choose Your Plan",
      descAr: "اختر مدة الاشتراك المناسبة لهدفك مع إمكانية عرض الأسعار بعملة بلدك.",
      descEn: "Select the coaching duration that fits your goals in your preferred local currency."
    },
    {
      step: "02",
      titleAr: "اختبر مستواك",
      titleEn: "Take the Level Quiz",
      descAr: "أجب عن اختبار التقييم السريع (١٠ أسئلة) لتحديد مستواك الدقيق (مبتدئ / متوسط / متقدم).",
      descEn: "Complete our interactive 10-question assessment to classify your exact strength tier."
    },
    {
      step: "03",
      titleAr: "استلم جدولك المخصص",
      titleEn: "Get Your Structured Plan",
      descAr: "احصل على جدولك الأسبوعي المفصل بالعدات والمجموعات وفيديوهات الشرح في حسابك الشخصي.",
      descEn: "Access your custom weekly workout schedule with sets, reps, rest times, and video guides."
    },
    {
      step: "04",
      titleAr: "متابعة أسبوعية عبر واتساب",
      titleEn: "Weekly WhatsApp Follow-up",
      descAr: "تواصل مباشر أسبوعياً مع الكابتن المصري لمراجعة الفيديوهات وتعديل الخطة لضمان التطور.",
      descEn: "Direct weekly check-ins with Coach EL Masry on WhatsApp for form reviews and plan adjustments."
    }
  ],
  testimonials: [
    {
      id: "test-1",
      nameAr: "أحمد محمود — القاهرة",
      nameEn: "Ahmed Mahmoud — Cairo",
      levelAr: "من مبتدئ إلى ١٥ عدة عقلة + ماصل أب",
      levelEn: "0 Pull-ups to 15 Clean Pull-ups & Muscle-Up",
      textAr: "بدأت مع الكابتن المصري ومكنتش بعرف أعمل عدة عقلة واحدة صح. خلال ٣ شهور بالالتزام على الجدول والمتابعة الأسبوعية على واتساب قدرت أجيب أول ماصل أب في حياتي بدون أي إصابة!",
      textEn: "I started with EL Masry unable to do a single strict pull-up. Within 3 months of following his structured progressions and weekly WhatsApp form checks, I unlocked my first clean bar muscle-up injury-free!",
      rating: 5
    },
    {
      id: "test-2",
      nameAr: "فهد العتيبي — الرياض",
      nameEn: "Fahad Al-Otaibi — Riyadh",
      levelAr: "إتقان الهاند ستاند والفرونت ليفر",
      levelEn: "Unlocked Freestanding Handstand & Front Lever",
      textAr: "الجدول منظم جداً وفيديوهات الشرح في المكتبة بتوضح كل تفصيلة في التكنيك. أفضل استثمار عملته في صحتي ولياقتي.",
      textEn: "The weekly programming is laser-focused and the exercise library videos break down every scapular cue. Best investment I have ever made in my physique.",
      rating: 5
    },
    {
      id: "test-3",
      nameAr: "يوسف الشامسي — دبي",
      nameEn: "Youssef Al-Shamsi — Dubai",
      levelAr: "تحول جسدي كامل في ٦ شهور",
      levelEn: "Complete 6-Month Body Recomposition",
      textAr: "نزلت ٩ كيلو دهون وزدت كتلة عضلية واضحة في الأكتاف والظهر، والأهم إني اتعلمت أتحكم في جسمي بالكامل.",
      textEn: "Dropped 9kg of fat while building dense shoulder and back muscle—all with bodyweight exercises at home and the local park.",
      rating: 5
    }
  ],
  faqs: [
    {
      qAr: "هل أحتاج إلى جيم أو أدوات كثيرة للبدء؟",
      qEn: "Do I need a gym membership or expensive equipment?",
      aAr: "لا إطلاقاً! يمكنك التمرين في المنزل أو الحديقة أو الجيم. كل ما تحتاجه أساساً هو بار عقلة ومتوازي، ويتم تفصيل الجدول حسب الأدوات المتاحة لديك.",
      aEn: "Not at all! You can train at home, in a park, or at a gym. A pull-up bar and dip bars (or rings) are plenty, and your plan is customized to whatever equipment you have."
    },
    {
      qAr: "أنا مبتدئ تماماً ووزني زائد، هل الكاليستنكس مناسب لي؟",
      qEn: "I am a complete beginner and overweight. Is calisthenics right for me?",
      aAr: "نعم بالتأكيد! اختبار تحديد المستوى يصمم لك تدريبات تأسيسية تبدأ من الصفر وتبني قوتك تدريجياً مع خطة تغذية لخسارة الدهون بأمان تام على المفاصل.",
      aEn: "Absolutely! Our level assessment places you in joint-safe foundational progressions combined with nutrition guidance so you shed fat while building real strength from day one."
    },
    {
      qAr: "كيف تتم المتابعة الأسبوعية مع الكابتن المصري؟",
      qEn: "How does the weekly WhatsApp follow-up work?",
      aAr: "في نهاية كل أسبوع ترسل فيديوهات لتمرينك وأسئلتك مباشرة للكابتن المصري على واتساب، ليقوم بتحليل أدائك وتصحيح الأخطاء وتحديث جدول الأسبوع التالي.",
      aEn: "Every week you send your workout clips and progress notes directly to EL Masry on WhatsApp. He personally reviews your form, gives feedback, and updates your next week's plan."
    },
    {
      qAr: "كيف يتم الدفع بعملة بلدي؟",
      qEn: "How do I pay in my local currency?",
      aAr: "يمكنك اختيار عملة بلدك من الموقع لمعرفة التكلفة التقريبية، وعند تأكيد الاشتراك عبر واتساب نوفر لك أسهل طرق الدفع المحلية والدولية (إنستا باي، فودافون كاش، تحويل بنكي، أو Paymob).",
      aEn: "Pick your currency in the switcher to see the converted rate. When you confirm on WhatsApp, we provide instant payment links via InstaPay, bank transfer, or local gateways."
    }
  ],
  contact: {
    whatsappNumber: "201099999999",
    instagramUrl: "https://instagram.com/elmasry_calisthenics",
    tiktokUrl: "https://tiktok.com/@elmasry_calisthenics",
    youtubeUrl: "https://youtube.com/@elmasry_calisthenics",
    email: "coach@elmasry-calisthenics.com"
  }
};

export const INITIAL_EXERCISES = [
  {
    slug: "strict-pull-ups",
    titleAr: "العقلة القياسية (Strict Pull-ups)",
    titleEn: "Strict Scapular Pull-ups",
    descriptionAr: "التمرين الأساسي لبناء قوة السحب وعضلات الظهر العلوية والبايسبس مع التحكم الكامل في لوح الكتف.",
    descriptionEn: "The cornerstone upper-body pulling exercise for building dense lats, upper back control, and raw pulling power.",
    level: "BEGINNER",
    muscleGroup: "BACK",
    skill: "PULL_UPS",
    videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g",
    thumbnailUrl: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=900&q=80",
    photos: [
      "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=900&q=80"
    ],
    cuesAr: ["ابدأ من التعلق الكامل بفرط الذراعين", "اسحب لوحي الكتف للأسفل قبل ثني الكوع", "اطلع بصدرك للبار وتحكم في النزول لمدة ثانيتين"],
    cuesEn: ["Start from a dead hang with active shoulders", "Depress scapulae before bending elbows", "Drive chest to the bar and control the 2-second eccentric"],
    featured: true
  },
  {
    slug: "bar-muscle-up",
    titleAr: "الماصل أب على البار (Bar Muscle-Up)",
    titleEn: "Explosive Bar Muscle-Up",
    descriptionAr: "حركة مركبة تجمع بين السحب الانفجاري والدفع فوق البار، وتعد بوابة الدخول لمهارات الكاليستنكس المتقدمة.",
    descriptionEn: "An explosive transition combining a high pull-up and straight-bar dip—the signature milestone of intermediate calisthenics.",
    level: "INTERMEDIATE",
    muscleGroup: "FULL_BODY",
    skill: "MUSCLE_UP",
    videoUrl: "https://www.youtube.com/embed/pS1A6ys82bA",
    thumbnailUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80",
    photos: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80"
    ],
    cuesAr: ["استخدم قبضة شبه كاذبة لسهولة الدوران", "اسحب البار نحو أسفل الصدر/البطن بحركة القوس", "اقلب المعصم بسرعة فوق البار وادفع للأعلى"],
    cuesEn: ["Generate C-shaped swing momentum in front of the bar", "Pull explosively to the lower sternum", "Snap wrists over the bar and press to full lockout"],
    featured: true
  },
  {
    slug: "straddle-planche",
    titleAr: "سترادل بلانش (Straddle Planche)",
    titleEn: "Straddle Planche Hold",
    descriptionAr: "من أقوى مهارات الثبات في الكاليستنكس، تعتمد على قوة الأكتاف الأمامية وفرط الكوع بالكامل مع رفع الجسم موازياً للأرض.",
    descriptionEn: "Elite straight-arm static hold requiring immense anterior deltoid, protraction, and core compression strength.",
    level: "ADVANCED",
    muscleGroup: "SHOULDERS",
    skill: "PLANCHE",
    videoUrl: "https://www.youtube.com/embed/OmS5XnB-K2g",
    thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80",
    photos: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80"
    ],
    cuesAr: ["افرد الكوع ١٠٠٪ وادفع الكتف للأمام (Protraction)", "حافظ على ميلان الكتف للأمام فوق المعصم", "شد عضلات البطن والمؤخرة للحفاظ على خط مستقيم"],
    cuesEn: ["Lock elbows 100% and maximize scapular protraction", "Lean shoulders well past wrists", "Engage glutes and lower back for horizontal alignment"],
    featured: true
  },
  {
    slug: "full-front-lever",
    titleAr: "الفرونت ليفر الكامل (Full Front Lever)",
    titleEn: "Full Front Lever",
    descriptionAr: "مهارة ثبات أفقية أسطورية تستهدف عضلات المجنص (Lats) والبطن مع ذراعين مفرودتين تماماً تحت البار.",
    descriptionEn: "A gravity-defying horizontal pull hold demanding extreme straight-arm lat power and posterior chain tension.",
    level: "ADVANCED",
    muscleGroup: "BACK",
    skill: "FRONT_LEVER",
    videoUrl: "https://www.youtube.com/embed/AGhb8bdE2hU",
    thumbnailUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
    photos: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80"
    ],
    cuesAr: ["تخيل أنك تكسر البار بيديك لتفعيل المجنص", "لا تثنِ الكوع أبداً أثناء الثبات", "حافظ على الحوض في نفس مستوى الكتف"],
    cuesEn: ["Depress and retract scapulae with straight arms", "Press the bar down towards your hips", "Maintain a rigid posterior pelvic tilt"],
    featured: true
  },
  {
    slug: "freestanding-handstand",
    titleAr: "الوقوف على اليدين الحر (Freestanding Handstand)",
    titleEn: "Freestanding Handstand Balance",
    descriptionAr: "إتقان التوازن الكامل على اليدين وبناء قوة الأكتاف والتحكم العصبي العضلي في الفراغ.",
    descriptionEn: "Master full-body inversion alignment, finger-heel balance control, and overhead shoulder stability.",
    level: "INTERMEDIATE",
    muscleGroup: "SHOULDERS",
    skill: "HANDSTAND",
    videoUrl: "https://www.youtube.com/embed/tW5p6P9B8eE",
    thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80",
    photos: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80"
    ],
    cuesAr: ["افتح أصابع اليد وتمسك بالأرض للتحكم في التوازن", "ادفع كتفك لأقصى درجة نحو الأذن (Elevation)", "ضم القدمين وشد البطن لمنع تقوس الظهر"],
    cuesEn: ["Grip the floor with your fingertips to correct balance", "Push tall through shoulders (full elevation)", "Stack ribs, hips, and toes in one vertical line"],
    featured: true
  },
  {
    slug: "parallel-bar-dips",
    titleAr: "المتوازي العميق (Parallel Bar Dips)",
    titleEn: "Deep Parallel Bar Dips",
    descriptionAr: "أقوى تمرين دفع لبناء الصدر والترايسبس والأكتاف الأمامية وتأسيس قوة الدفع للبلانش والماصل أب.",
    descriptionEn: "Essential upper-body pushing builder for chest, triceps, and anterior deltoid strength.",
    level: "BEGINNER",
    muscleGroup: "CHEST",
    skill: "DIPS_PUSHUPS",
    videoUrl: "https://www.youtube.com/embed/2z8JmcrW-As",
    thumbnailUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80",
    photos: [
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80"
    ],
    cuesAr: ["انزل ببطء حتى يصبح الكتف أسفل الكوع قليلاً", "مل بالجذع للأمام قليلاً لتفعيل الصدر والكتف", "افرد الكوع بالكامل في أعلى الحركة"],
    cuesEn: ["Lower under control until shoulders dip below elbows", "Slight forward torso lean for shoulder & chest engagement", "Lock out elbows completely at the top"],
    featured: false
  },
  {
    slug: "l-sit-hold",
    titleAr: "ثبات حرف L (L-Sit Hold)",
    titleEn: "Strict L-Sit Compression",
    descriptionAr: "تمرين جوهري لتقوية عضلات البطن السفلية وقابضات الفخذ وثبات الأكتاف.",
    descriptionEn: "Foundational isometric core and hip-flexor compression hold on parallettes or floor.",
    level: "BEGINNER",
    muscleGroup: "CORE",
    skill: "FUNDAMENTALS",
    videoUrl: "https://www.youtube.com/embed/IUZJoSP66HI",
    thumbnailUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
    photos: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80"
    ],
    cuesAr: ["ادفع الكتف للأسفل بعيداً عن الأذنين", "افرد الركبتين بالكامل وارفعهما لمستوى الحوض", "تنفس بانتظام أثناء الثبات"],
    cuesEn: ["Depress shoulders strongly away from ears", "Lock knees completely and point toes", "Maintain steady breathing throughout the hold"],
    featured: false
  },
  {
    slug: "pistol-squats",
    titleAr: "بيستول سكوات بقدم واحدة (Pistol Squat)",
    titleEn: "Single-Leg Pistol Squat",
    descriptionAr: "أفضل تمرين بوزن الجسم لبناء قوة الأرجل والتوازن ومرونة الكاحل والحوض.",
    descriptionEn: "Unilateral lower-body mastery combining raw quad/glute strength, balance, and ankle mobility.",
    level: "INTERMEDIATE",
    muscleGroup: "LEGS",
    skill: "FUNDAMENTALS",
    videoUrl: "https://www.youtube.com/embed/vq5-vdgJc0I",
    thumbnailUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=900&q=80",
    photos: [
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=900&q=80"
    ],
    cuesAr: ["امدد القدم الحرة للأمام مفرودة", "حافظ على كعب القدم الثابتة ملتصقاً بالأرض", "انزل بتحكم كامل ثم ادفع بقوة للأعلى"],
    cuesEn: ["Extend non-working leg straight in front", "Keep working heel planted firmly on the floor", "Control the bottom pause and drive up smoothly"],
    featured: false
  }
];

export const INITIAL_TRANSFORMATIONS = [
  {
    clientNameAr: "كريم عادل — الإسكندرية",
    clientNameEn: "Karim Adel — Alexandria",
    durationAr: "٣ شهور (٩٠ يوم)",
    durationEn: "3 Months (90 Days)",
    quoteAr: "من ٠ عقلة وزيادة ١٢ كجم في الوزن إلى ١٤ عدة عقلة نظيفة وأول ماصل أب!",
    quoteEn: "Went from 0 pull-ups and 12kg overweight to 14 strict pull-ups and my first bar muscle-up!",
    beforePhoto: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80",
    afterPhoto: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=700&q=80",
    videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g",
    levelAchieved: "INTERMEDIATE",
    featured: true
  },
  {
    clientNameAr: "عمر الدوسري — جدة",
    clientNameEn: "Omar Al-Dosari — Jeddah",
    durationAr: "٦ شهور",
    durationEn: "6 Months",
    quoteAr: "إتقان الفرونت ليفر الكامل والهاند ستاند الحر لأكثر من ٣٠ ثانية مع تغير كامل في شكل الجسم.",
    quoteEn: "Unlocked a 10-second Full Front Lever and 30s freestanding handstand while getting shredded.",
    beforePhoto: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=700&q=80",
    afterPhoto: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=700&q=80",
    videoUrl: "https://www.youtube.com/embed/AGhb8bdE2hU",
    levelAchieved: "ADVANCED",
    featured: true
  },
  {
    clientNameAr: "سيف المنصوري — أبوظبي",
    clientNameEn: "Saif Al-Mansoori — Abu Dhabi",
    durationAr: "٤ شهور",
    durationEn: "4 Months",
    quoteAr: "تخلصت من آلام الكتف القديمة وبنيت أقوى فورمة في حياتي بتمارين وزن الجسم فقط.",
    quoteEn: "Eliminated chronic shoulder pain and built my strongest physique ever using purely bodyweight training.",
    beforePhoto: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80",
    afterPhoto: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=700&q=80",
    videoUrl: "https://www.youtube.com/embed/OmS5XnB-K2g",
    levelAchieved: "INTERMEDIATE",
    featured: true
  }
];

export const INITIAL_QUIZ_CONFIG = {
  intermediateThreshold: 35,
  advancedThreshold: 70,
  questions: [
    {
      id: "q1-pullups",
      questionAr: "١. كم عدد عدات العقلة (Pull-ups) الصحيحة الكاملة التي يمكنك أداؤها في مجموعة واحدة؟",
      questionEn: "1. How many strict dead-hang pull-ups can you perform in a single unbroken set?",
      options: [
        { labelAr: "٠ عدات (لا أستطيع عمل عدة كاملة بعد)", labelEn: "0 reps (Cannot do a full strict pull-up yet)", points: 0 },
        { labelAr: "١ إلى ٥ عدات", labelEn: "1 to 5 reps", points: 4 },
        { labelAr: "٦ إلى ١٢ عدة", labelEn: "6 to 12 reps", points: 8 },
        { labelAr: "١٣ إلى ٢٠ عدة", labelEn: "13 to 20 reps", points: 12 },
        { labelAr: "أكثر من ٢٠ عدة نظيفة", labelEn: "20+ strict reps", points: 15 }
      ]
    },
    {
      id: "q2-pushups",
      questionAr: "٢. كم عدد عدات الضغط (Push-ups) المتتالية بأداء صحيح؟",
      questionEn: "2. How many clean chest-to-floor push-ups can you perform in one set?",
      options: [
        { labelAr: "أقل من ٥ عدات", labelEn: "Under 5 reps", points: 0 },
        { labelAr: "٥ إلى ١٥ عدة", labelEn: "5 to 15 reps", points: 3 },
        { labelAr: "١٦ إلى ٣٠ عدة", labelEn: "16 to 30 reps", points: 7 },
        { labelAr: "٣١ إلى ٥٠ عدة", labelEn: "31 to 50 reps", points: 10 },
        { labelAr: "أكثر من ٥٠ عدة", labelEn: "50+ reps", points: 12 }
      ]
    },
    {
      id: "q3-dips",
      questionAr: "٣. كم عدد عدات المتوازي (Parallel Bar Dips) الكاملة؟",
      questionEn: "3. How many full-range parallel bar dips can you complete in one set?",
      options: [
        { labelAr: "٠ عدات", labelEn: "0 reps", points: 0 },
        { labelAr: "١ إلى ٦ عدات", labelEn: "1 to 6 reps", points: 4 },
        { labelAr: "٧ إلى ١٥ عدة", labelEn: "7 to 15 reps", points: 8 },
        { labelAr: "١٦ إلى ٢٥ عدة", labelEn: "16 to 25 reps", points: 11 },
        { labelAr: "أكثر من ٢٥ عدة", labelEn: "25+ reps", points: 14 }
      ]
    },
    {
      id: "q4-plank",
      questionAr: "٤. ما هي أقصى مدة ثبات في تمرين البلانك (Plank) أو Hollow Body؟",
      questionEn: "4. How long can you hold a strict Plank or Hollow Body position?",
      options: [
        { labelAr: "أقل من ٣٠ ثانية", labelEn: "Under 30 seconds", points: 1 },
        { labelAr: "٣٠ إلى ٦٠ ثانية", labelEn: "30 to 60 seconds", points: 4 },
        { labelAr: "١ إلى ٢ دقيقة", labelEn: "1 to 2 minutes", points: 7 },
        { labelAr: "أكثر من دقيقتين بتحكم كامل", labelEn: "Over 2 minutes with strict form", points: 10 }
      ]
    },
    {
      id: "q5-lsit",
      questionAr: "٥. هل تستطيع أداء مهارة ثبات الـ L-Sit؟",
      questionEn: "5. What is your current ability on the L-Sit hold?",
      options: [
        { labelAr: "لا أستطيع رفع القدمين عن الأرض بعد", labelEn: "Cannot lift feet off the floor yet", points: 0 },
        { labelAr: "ثبات مع ثني الركبتين (Tuck L-Sit) لمدة ١٠ ثوانٍ", labelEn: "Tuck L-Sit for 10+ seconds", points: 4 },
        { labelAr: "ثبات L-Sit كامل لمدة ٥ إلى ١٥ ثانية", labelEn: "Full straight-leg L-Sit for 5–15 seconds", points: 8 },
        { labelAr: "ثبات L-Sit كامل لأكثر من ٢٠ ثانية أو V-Sit", labelEn: "Full L-Sit 20s+ or V-Sit progression", points: 12 }
      ]
    },
    {
      id: "q6-handstand",
      questionAr: "٦. ما هو مستواك الحالي في مهارة الوقوف على اليدين (Handstand)؟",
      questionEn: "6. What is your current Handstand skill level?",
      options: [
        { labelAr: "لم أجربها أو أخاف من الانقلاب", labelEn: "Never tried or uncomfortable kicking up", points: 0 },
        { labelAr: "وقوف على اليدين مسنوداً على الحائط (٣٠ ثانية+)", labelEn: "Wall-assisted handstand hold (30s+)", points: 4 },
        { labelAr: "وقوف حر بدون حائط من ٥ إلى ١٠ ثوانٍ", labelEn: "Freestanding handstand for 5–10 seconds", points: 8 },
        { labelAr: "وقوف حر ثابت أكثر من ١٥ ثانية أو ضغط باليدين (HSPU)", labelEn: "Solid 15s+ freestanding handstand or Handstand Push-ups", points: 12 }
      ]
    },
    {
      id: "q7-muscleup",
      questionAr: "٧. هل تستطيع أداء حركة الماصل أب (Muscle-Up) على البار أو الحلق؟",
      questionEn: "7. Can you perform a Bar or Ring Muscle-Up?",
      options: [
        { labelAr: "لا، لم أصل إليها بعد", labelEn: "No, not yet", points: 0 },
        { labelAr: "أستطيع عملها بأستك المقاومة (Resistance Band)", labelEn: "Yes, with a resistance band", points: 4 },
        { labelAr: "نعم، ١ إلى ٣ عدات ماصل أب", labelEn: "Yes, 1 to 3 clean Muscle-Ups", points: 9 },
        { labelAr: "نعم، ٤ عدات فأكثر بتحكم عالٍ", labelEn: "Yes, 4+ strict/clean Muscle-Ups", points: 14 }
      ]
    },
    {
      id: "q8-statics",
      questionAr: "٨. ما هي خبرتك في مهارات الثبات المتقدمة (Planche / Front Lever)؟",
      questionEn: "8. What is your experience with advanced statics (Planche / Front Lever)?",
      options: [
        { labelAr: "لا توجد خبرة سابقة", labelEn: "No experience yet", points: 0 },
        { labelAr: "Tuck Planche / Tuck Front Lever لمدة ١٠ ثوانٍ", labelEn: "Tuck Planche or Tuck Front Lever for 10s", points: 5 },
        { labelAr: "Advanced Tuck أو One-Leg", labelEn: "Advanced Tuck or Single-Leg variations", points: 9 },
        { labelAr: "Straddle أو Full Planche / Front Lever", labelEn: "Straddle or Full Planche / Front Lever", points: 15 }
      ]
    },
    {
      id: "q9-experience",
      questionAr: "٩. منذ متى وأنت تتمرن (كاليستنكس أو جيم) بشكل منتظم؟",
      questionEn: "9. How long have you been training consistently (calisthenics or gym)?",
      options: [
        { labelAr: "مبتدئ تماماً / منقطع منذ فترة طويلة", labelEn: "Complete beginner / returning after a long break", points: 0 },
        { labelAr: "أقل من ٦ شهور", labelEn: "Less than 6 months", points: 3 },
        { labelAr: "من ٦ شهور إلى سنتين", labelEn: "6 months to 2 years", points: 6 },
        { labelAr: "أكثر من سنتين", labelEn: "Over 2 years of consistent training", points: 9 }
      ]
    },
    {
      id: "q10-days",
      questionAr: "١٠. كم يوماً في الأسبوع يمكنك الالتزام بالتمرين؟",
      questionEn: "10. How many days per week can you commit to structured training?",
      options: [
        { labelAr: "٣ أيام في الأسبوع", labelEn: "3 days per week", points: 2 },
        { labelAr: "٤ أيام في الأسبوع", labelEn: "4 days per week", points: 4 },
        { labelAr: "٥ أيام في الأسبوع", labelEn: "5 days per week", points: 5 },
        { labelAr: "٦ أيام في الأسبوع", labelEn: "6 days per week", points: 5 }
      ]
    }
  ]
};

export const INITIAL_WEEKLY_PLANS = [
  {
    titleAr: "البرنامج التأسيسي — بناء القوة والتحكم العصبي (المستوى المبتدئ)",
    titleEn: "Foundation Protocol — Bodyweight Mastery (Beginner Level)",
    weekNumber: 1,
    targetLevel: "BEGINNER",
    notesAr: "ركز على الأداء الصحيح والتحكم في النزول البطئ (Eccentric). صوّر آخر مجموعة من كل تمرين وأرسلها للكابتن المصري على واتساب في نهاية الأسبوع.",
    notesEn: "Prioritize strict scapular control and a 2-second lowering phase on every rep. Film your final working set of key exercises for your weekly WhatsApp check-in with Coach EL Masry.",
    days: [
      {
        dayNumber: 1,
        titleAr: "اليوم الأول: قوة السحب والبطن (Pull & Core)",
        titleEn: "Day 1: Pulling Foundation & Core Compression",
        exercises: [
          {
            titleAr: "سحب لوح الكتف على العقلة (Scapular Pulls) + عقلة سلبية",
            titleEn: "Scapular Pulls + Negative Pull-ups",
            sets: 4,
            reps: "6-8 عدات (نزول في ٤ ثوانٍ)",
            restSeconds: 90,
            notesAr: "اثبت ثانية أعلى البار قبل النزول البطيء",
            notesEn: "Hold chin over bar for 1s, then lower for 4 full seconds",
            videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g"
          },
          {
            titleAr: "عقلة أسترالي (Australian Body Rows)",
            titleEn: "Australian Inverted Rows",
            sets: 4,
            reps: "10-12",
            restSeconds: 75,
            notesAr: "الجسم خط مستقيم بالكامل من الكتف للكعب",
            notesEn: "Keep body completely rigid from shoulders to heels",
            videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g"
          },
          {
            titleAr: "ثبات حرف L بضم الركب (Tuck L-Sit Hold)",
            titleEn: "Tuck L-Sit Compression Hold",
            sets: 4,
            reps: "15-20 ثانية",
            restSeconds: 60,
            notesAr: "ادفع الكتف لأسفل بقوة",
            notesEn: "Depress shoulders strongly away from ears",
            videoUrl: "https://www.youtube.com/embed/IUZJoSP66HI"
          }
        ]
      },
      {
        dayNumber: 2,
        titleAr: "اليوم الثاني: قوة الدفع وتأسيس الأكتاف (Push & Handstand Prep)",
        titleEn: "Day 2: Pushing Strength & Handstand Alignment",
        exercises: [
          {
            titleAr: "ثبات الهاند ستاند على الحائط (Chest-to-Wall Handstand)",
            titleEn: "Chest-to-Wall Handstand Hold",
            sets: 4,
            reps: "30-45 ثانية",
            restSeconds: 90,
            notesAr: "افرد الكوع تماماً وشد عضلات البطن",
            notesEn: "Lock elbows 100% and maintain hollow body alignment",
            videoUrl: "https://www.youtube.com/embed/tW5p6P9B8eE"
          },
          {
            titleAr: "المتوازي الكامل أو بمساعدة أستك (Parallel Bar Dips)",
            titleEn: "Parallel Bar Dips (Strict)",
            sets: 4,
            reps: "6-10",
            restSeconds: 90,
            notesAr: "النزول لزاوية ٩٠ درجة مع فرد كامل في الأعلى",
            notesEn: "Lower to 90 degrees and lock out completely at top",
            videoUrl: "https://www.youtube.com/embed/2z8JmcrW-As"
          },
          {
            titleAr: "ضغط بلانش مائل للأمام (Pseudo Planche Push-ups)",
            titleEn: "Pseudo Planche Lean Push-ups",
            sets: 3,
            reps: "8-12",
            restSeconds: 75,
            notesAr: "حافظ على ميلان الكتف للأمام طوال المجموعة",
            notesEn: "Maintain forward shoulder lean on every repetition",
            videoUrl: "https://www.youtube.com/embed/OmS5XnB-K2g"
          }
        ]
      },
      {
        dayNumber: 3,
        titleAr: "اليوم الثالث: القوة السفلى والمرونة (Lower Body & Mobility)",
        titleEn: "Day 3: Unilateral Legs & Joint Bulletproofing",
        exercises: [
          {
            titleAr: "بيستول سكوات على صندوق (Box Pistol Squats)",
            titleEn: "Assisted / Box Pistol Squats",
            sets: 4,
            reps: "8 لكل رجل",
            restSeconds: 90,
            notesAr: "تحكم في الركبة ولا تسمح لها بالميل للداخل",
            notesEn: "Track knee directly over toes with controlled descent",
            videoUrl: "https://www.youtube.com/embed/vq5-vdgJc0I"
          }
        ]
      }
    ]
  },
  {
    titleAr: "برنامج المهارات والقوة المتوسطة — الماصل أب والهاند ستاند (المستوى المتوسط)",
    titleEn: "Skill & Explosive Power Protocol (Intermediate Level)",
    weekNumber: 1,
    targetLevel: "INTERMEDIATE",
    notesAr: "ابدأ كل حصة بإحماء المفاصل والمعصم لمدة ١٠ دقائق. تمارين المهارات تؤدى في بداية التمرين وأنت بكامل طاقتك.",
    notesEn: "Complete a 10-minute wrist and scapular warm-up before every session. Perform skill work fresh at the start of the workout.",
    days: [
      {
        dayNumber: 1,
        titleAr: "اليوم الأول: الماصل أب الانفجاري والفرونت ليفر",
        titleEn: "Day 1: Explosive Muscle-Up & Front Lever Progressions",
        exercises: [
          {
            titleAr: "ماصل أب على البار أو سحب انفجاري للبطن",
            titleEn: "Bar Muscle-Ups / High Explosive Chest-to-Bar Pulls",
            sets: 5,
            reps: "3-5 عدات انفجارية",
            restSeconds: 120,
            notesAr: "ركز على سرعة الانتقال فوق البار",
            notesEn: "Maximize pull velocity and fast wrist turnover",
            videoUrl: "https://www.youtube.com/embed/pS1A6ys82bA"
          },
          {
            titleAr: "ثبات فرونت ليفر متقدم (Advanced Tuck Front Lever)",
            titleEn: "Advanced Tuck Front Lever Hold",
            sets: 5,
            reps: "10-15 ثانية",
            restSeconds: 90,
            notesAr: "افرد الظهر تماماً وادفع البار بيديك مفرودتين",
            notesEn: "Keep flat back and straight arms throughout hold",
            videoUrl: "https://www.youtube.com/embed/AGhb8bdE2hU"
          }
        ]
      },
      {
        dayNumber: 2,
        titleAr: "اليوم الثاني: التوازن الحر وتأسيس البلانش",
        titleEn: "Day 2: Freestanding Handstand & Planche Strength",
        exercises: [
          {
            titleAr: "وقوف على اليدين حر (Freestanding Handstand Practice)",
            titleEn: "Freestanding Handstand Balance Sets",
            sets: 6,
            reps: "محاولات لمدة ١٥-٣٠ ثانية",
            restSeconds: 75,
            notesAr: "تحكم في التوازن بأصابع اليد",
            notesEn: "Use finger pressure to correct over-balance",
            videoUrl: "https://www.youtube.com/embed/tW5p6P9B8eE"
          },
          {
            titleAr: "ثبات تاك بلانش (Tuck Planche Hold)",
            titleEn: "Strict Tuck Planche Hold",
            sets: 5,
            reps: "12-15 ثانية",
            restSeconds: 90,
            notesAr: "كوع مفرود ١٠٠٪ مع دفع لوح الكتف للأعلى",
            notesEn: "100% locked elbows and maximal scapular protraction",
            videoUrl: "https://www.youtube.com/embed/OmS5XnB-K2g"
          }
        ]
      }
    ]
  },
  {
    titleAr: "برنامج المحترفين والبطولات — ثبات البلانش والفرونت ليفر الكامل (المستوى المتقدم)",
    titleEn: "Championship Elite Statics & Combos (Advanced Level)",
    weekNumber: 1,
    targetLevel: "ADVANCED",
    notesAr: "برنامج مخصص للمستوى المتقدم لإتقان Straddle/Full Planche و Full Front Lever مع الحفاظ على صحة الأوتار والمفاصل.",
    notesEn: "High-intensity static hold protocol designed for Straddle/Full Planche and Full Front Lever mastery.",
    days: [
      {
        dayNumber: 1,
        titleAr: "اليوم الأول: ثبات البلانش والضغط باليدين",
        titleEn: "Day 1: Straddle Planche & Freestanding HSPU",
        exercises: [
          {
            titleAr: "ثبات سترادل بلانش (Straddle Planche Hold)",
            titleEn: "Straddle Planche Isometric Hold",
            sets: 6,
            reps: "6-10 ثوانٍ",
            restSeconds: 150,
            notesAr: "حافظ على استقامة الخط الأفقي وفرط الكوع",
            notesEn: "Maintain horizontal body line and full elbow lockout",
            videoUrl: "https://www.youtube.com/embed/OmS5XnB-K2g"
          },
          {
            titleAr: "فرونت ليفر كامل + سحب (Full Front Lever & Pulls)",
            titleEn: "Full Front Lever Hold + Ice Cream Makers",
            sets: 5,
            reps: "8 ثوانٍ ثبات + 3 سحبات",
            restSeconds: 150,
            notesAr: "تحكم كامل بدون ثني الكوع",
            notesEn: "Zero elbow bend throughout the entire set",
            videoUrl: "https://www.youtube.com/embed/AGhb8bdE2hU"
          }
        ]
      }
    ]
  }
];

