export interface CurrencyConfig {
  code: string;
  nameEn: string;
  nameAr: string;
  symbol: string;
  flag: string;
  decimals: number;
  rateFromEgp: number;
  isAutoRate: boolean;
  roundingRule: number; // 1, 5, 10, 50
  enabled: boolean;
  isDefault: boolean;
  sortOrder: number;
}

export interface PricingPlan {
  id: string;
  slug: string;
  durationMonths: number;
  labelAr: string;
  labelEn: string;
  priceEgp: number;
  isBestValue: boolean;
  savingPercent: number;
  sortOrder: number;
  overrides: Record<string, number>;
  featuresAr: string[];
  featuresEn: string[];
  active: boolean;
}

export type AthleteLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export type SubscriptionStatus = "PENDING" | "PAID" | "ACTIVE" | "EXPIRED";

export type PaymentMethod = "WHATSAPP" | "INSTAPAY" | "PAYMOB" | "FAWRY";

export interface User {
  id: string;
  email: string;
  passwordHash?: string;
  name: string;
  phone?: string;
  role: "ADMIN" | "CLIENT";
  forcePasswordChange: boolean;
  age?: number;
  heightCm?: number;
  weightKg?: number;
  goal?: string;
  injuries?: string;
  level: AthleteLevel;
  quizScore?: number;
  quizAnswers?: Record<string, number>;
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId?: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  age?: number;
  heightCm?: number;
  weightKg?: number;
  goal?: string;
  injuries?: string;
  assessedLevel: AthleteLevel;
  quizScore: number;
  quizAnswers: Record<string, number>;
  planId: string;
  planLabelEn: string;
  planLabelAr: string;
  durationMonths: number;
  basePriceEgp: number;
  currencyCode: string;
  exchangeRateUsed: number;
  displayedAmount: number;
  paymentMethod: PaymentMethod;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  notes?: string;
  createdAt: string;
}

export interface Exercise {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  level: AthleteLevel;
  muscleGroup: string;
  skill: string;
  videoUrl: string;
  thumbnailUrl: string;
  photos: string[];
  cuesAr: string[];
  cuesEn: string[];
  featured: boolean;
}

export interface QuizOption {
  labelAr: string;
  labelEn: string;
  points: number;
}

export interface QuizQuestion {
  id: string;
  questionAr: string;
  questionEn: string;
  options: QuizOption[];
}

export interface QuizConfig {
  intermediateThreshold: number;
  advancedThreshold: number;
  questions: QuizQuestion[];
}

export interface WeeklyPlanExerciseItem {
  titleAr: string;
  titleEn: string;
  sets: number;
  reps: string;
  restSeconds: number;
  notesAr?: string;
  notesEn?: string;
  videoUrl?: string;
}

export interface WeeklyPlanDay {
  dayNumber: number;
  titleAr: string;
  titleEn: string;
  exercises: WeeklyPlanExerciseItem[];
}

export interface WeeklyPlan {
  id: string;
  titleAr: string;
  titleEn: string;
  weekNumber: number;
  targetLevel?: AthleteLevel;
  userId?: string;
  notesAr?: string;
  notesEn?: string;
  days: WeeklyPlanDay[];
  active: boolean;
  updatedAt: string;
}

export interface Transformation {
  id: string;
  clientNameAr: string;
  clientNameEn: string;
  durationAr: string;
  durationEn: string;
  quoteAr: string;
  quoteEn: string;
  beforePhoto: string;
  afterPhoto: string;
  videoUrl?: string;
  levelAchieved: string;
  featured: boolean;
}

export interface SiteContent {
  hero: {
    badgeAr: string;
    badgeEn: string;
    titleAr: string;
    titleEn: string;
    subtitleAr: string;
    subtitleEn: string;
    ctaPrimaryAr: string;
    ctaPrimaryEn: string;
    ctaWhatsappAr: string;
    ctaWhatsappEn: string;
    heroImageUrl: string;
    heroVideoUrl: string;
  };
  about: {
    titleAr: string;
    titleEn: string;
    subtitleAr: string;
    subtitleEn: string;
    storyAr: string;
    storyEn: string;
    photoUrl: string;
    stats: { valueAr: string; valueEn: string; labelAr: string; labelEn: string }[];
    timeline: {
      year: string;
      titleAr: string;
      titleEn: string;
      descAr: string;
      descEn: string;
    }[];
  };
  achievements: {
    id: string;
    medal: string;
    rankAr: string;
    rankEn: string;
    titleAr: string;
    titleEn: string;
    year: string;
    categoryAr: string;
    categoryEn: string;
  }[];
  howItWorks: {
    step: string;
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
  }[];
  testimonials: {
    id: string;
    nameAr: string;
    nameEn: string;
    levelAr: string;
    levelEn: string;
    textAr: string;
    textEn: string;
    rating: number;
  }[];
  faqs: {
    qAr: string;
    qEn: string;
    aAr: string;
    aEn: string;
  }[];
  contact: {
    whatsappNumber: string;
    instagramUrl: string;
    tiktokUrl: string;
    youtubeUrl: string;
    email: string;
  };
}
