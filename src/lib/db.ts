import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import {
  INITIAL_CURRENCIES,
  INITIAL_PRICING_PLANS,
  INITIAL_SITE_CONFIG,
  INITIAL_EXERCISES,
  INITIAL_TRANSFORMATIONS,
  INITIAL_QUIZ_CONFIG,
  INITIAL_WEEKLY_PLANS,
  CurrencyItem,
} from "./seed-data";

export interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  phone?: string;
  role: "ADMIN" | "CLIENT";
  forcePasswordChange: boolean;
  age?: number;
  heightCm?: number;
  weightKg?: number;
  goal?: string;
  injuries?: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  quizScore?: number;
  quizAnswers?: Record<string, number>;
  createdAt: string;
}

export interface SubscriptionRecord {
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
  assessedLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
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
  paymentMethod: "WHATSAPP" | "PAYMOB" | "FAWRY" | "INSTAPAY";
  status: "PENDING" | "PAID" | "ACTIVE" | "EXPIRED";
  startDate: string;
  endDate: string;
  notes?: string;
  createdAt: string;
}

export interface PricingPlanRecord {
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

export interface ExerciseRecord {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  muscleGroup: string;
  skill: string;
  videoUrl: string;
  thumbnailUrl: string;
  photos: string[];
  cuesAr: string[];
  cuesEn: string[];
  featured: boolean;
}

export interface WeeklyPlanRecord {
  id: string;
  titleAr: string;
  titleEn: string;
  weekNumber: number;
  targetLevel?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  userId?: string;
  notesAr?: string;
  notesEn?: string;
  days: {
    dayNumber: number;
    titleAr: string;
    titleEn: string;
    exercises: {
      titleAr: string;
      titleEn: string;
      sets: number;
      reps: string;
      restSeconds: number;
      notesAr?: string;
      notesEn?: string;
      videoUrl?: string;
    }[];
  }[];
  active: boolean;
  updatedAt: string;
}

export interface TransformationRecord {
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

export interface DatabaseSchema {
  users: UserRecord[];
  siteConfig: typeof INITIAL_SITE_CONFIG;
  pricingPlans: PricingPlanRecord[];
  currencies: CurrencyItem[];
  exercises: ExerciseRecord[];
  quizConfig: typeof INITIAL_QUIZ_CONFIG;
  subscriptions: SubscriptionRecord[];
  weeklyPlans: WeeklyPlanRecord[];
  transformations: TransformationRecord[];
  lastRateSync?: string;
}

const DB_FILE_PATH = path.join(process.cwd(), "prisma", "database.json");

function createInitialDatabase(): DatabaseSchema {
  const adminPasswordHash = bcrypt.hashSync("ElMasry@2026", 10);
  const clientPasswordHash = bcrypt.hashSync("Client@2026", 10);

  const now = new Date();
  const threeMonthsLater = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
  const sixMonthsLater = new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000);
  const twelveMonthsLater = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);

  return {
    users: [
      {
        id: "admin-1",
        email: "admin@elmasry.com",
        passwordHash: adminPasswordHash,
        name: "Captain EL Masry (Admin)",
        phone: "+201099999999",
        role: "ADMIN",
        forcePasswordChange: true, // Required: force password change on first login
        level: "ADVANCED",
        createdAt: now.toISOString(),
      },
      {
        id: "client-1",
        email: "karim@example.com",
        passwordHash: clientPasswordHash,
        name: "Karim Adel",
        phone: "+201012345678",
        role: "CLIENT",
        forcePasswordChange: false,
        age: 24,
        heightCm: 178,
        weightKg: 74,
        goal: "Unlock Bar Muscle-Up & Front Lever",
        injuries: "None",
        level: "INTERMEDIATE",
        quizScore: 48,
        createdAt: now.toISOString(),
      },
      {
        id: "client-2",
        email: "fahad@example.com",
        passwordHash: clientPasswordHash,
        name: "Fahad Al-Otaibi",
        phone: "+966501234567",
        role: "CLIENT",
        forcePasswordChange: false,
        age: 27,
        heightCm: 175,
        weightKg: 71,
        goal: "Straddle Planche & Full Front Lever",
        injuries: "Mild left wrist tightness",
        level: "ADVANCED",
        quizScore: 78,
        createdAt: now.toISOString(),
      },
    ],
    siteConfig: INITIAL_SITE_CONFIG,
    pricingPlans: INITIAL_PRICING_PLANS.map((p, idx) => ({
      id: `plan-${idx + 1}`,
      ...p,
      active: true,
    })),
    currencies: INITIAL_CURRENCIES,
    exercises: INITIAL_EXERCISES.map((e, idx) => ({
      id: `ex-${idx + 1}`,
      ...e,
      level: e.level as "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
    })),
    quizConfig: INITIAL_QUIZ_CONFIG,
    subscriptions: [
      {
        id: "sub-1001",
        userId: "client-1",
        clientName: "Karim Adel",
        clientPhone: "+201012345678",
        clientEmail: "karim@example.com",
        age: 24,
        heightCm: 178,
        weightKg: 74,
        goal: "Unlock Bar Muscle-Up & Handstand",
        injuries: "None",
        assessedLevel: "INTERMEDIATE",
        quizScore: 48,
        quizAnswers: { "q1-pullups": 8, "q2-pushups": 7, "q3-dips": 8 },
        planId: "plan-3",
        planLabelEn: "3 Months",
        planLabelAr: "٣ شهور",
        durationMonths: 3,
        basePriceEgp: 4500,
        currencyCode: "EGP",
        exchangeRateUsed: 1,
        displayedAmount: 4500,
        paymentMethod: "INSTAPAY",
        status: "ACTIVE",
        startDate: now.toISOString(),
        endDate: threeMonthsLater.toISOString(),
        notes: "Paid via InstaPay, weekly check-in every Friday",
        createdAt: now.toISOString(),
      },
      {
        id: "sub-1002",
        userId: "client-2",
        clientName: "Fahad Al-Otaibi",
        clientPhone: "+966501234567",
        clientEmail: "fahad@example.com",
        age: 27,
        heightCm: 175,
        weightKg: 71,
        goal: "Straddle Planche & Full Front Lever",
        injuries: "None",
        assessedLevel: "ADVANCED",
        quizScore: 78,
        quizAnswers: { "q1-pullups": 12, "q2-pushups": 10, "q3-dips": 11 },
        planId: "plan-5",
        planLabelEn: "12 Months",
        planLabelAr: "١٢ شهر",
        durationMonths: 12,
        basePriceEgp: 9900,
        currencyCode: "SAR",
        exchangeRateUsed: 0.0765,
        displayedAmount: 750,
        paymentMethod: "WHATSAPP",
        status: "ACTIVE",
        startDate: now.toISOString(),
        endDate: twelveMonthsLater.toISOString(),
        notes: "VIP 12-Month Athlete from Riyadh",
        createdAt: now.toISOString(),
      },
      {
        id: "sub-1003",
        clientName: "Youssef Al-Shamsi",
        clientPhone: "+971509876543",
        clientEmail: "youssef@example.com",
        age: 22,
        heightCm: 181,
        weightKg: 84,
        goal: "Fat loss & first 10 strict pull-ups",
        injuries: "None",
        assessedLevel: "BEGINNER",
        quizScore: 18,
        quizAnswers: {},
        planId: "plan-4",
        planLabelEn: "6 Months",
        planLabelAr: "٦ شهور",
        durationMonths: 6,
        basePriceEgp: 7000,
        currencyCode: "AED",
        exchangeRateUsed: 0.0749,
        displayedAmount: 535,
        paymentMethod: "WHATSAPP",
        status: "PENDING",
        startDate: now.toISOString(),
        endDate: sixMonthsLater.toISOString(),
        notes: "Awaiting WhatsApp payment confirmation",
        createdAt: now.toISOString(),
      },
    ],
    weeklyPlans: INITIAL_WEEKLY_PLANS.map((wp, idx) => ({
      id: `wp-${idx + 1}`,
      ...wp,
      targetLevel: wp.targetLevel as "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
      active: true,
      updatedAt: now.toISOString(),
    })),
    transformations: INITIAL_TRANSFORMATIONS.map((t, idx) => ({
      id: `tr-${idx + 1}`,
      ...t,
    })),
    lastRateSync: now.toISOString(),
  };
}

export function getDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_FILE_PATH)) {
      const dir = path.dirname(DB_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const initial = createInitialDatabase();
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }
    const raw = fs.readFileSync(DB_FILE_PATH, "utf-8");
    return JSON.parse(raw) as DatabaseSchema;
  } catch (err) {
    console.error("Database read fallback:", err);
    return createInitialDatabase();
  }
}

export function saveDb(data: DatabaseSchema): void {
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save DB:", err);
  }
}

