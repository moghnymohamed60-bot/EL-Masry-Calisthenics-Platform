/**
 * backend/src/storage/databaseRepository.ts
 * Replaceable Data-Access Boundary (Repository Layer).
 * All database persistence (MySQL via Prisma ORM or local JSON store fallback) is isolated here.
 * No Prisma or file datastore calls are permitted outside backend/src/storage.
 */
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import {
  User,
  Subscription,
  PricingPlan,
  CurrencyConfig,
  Exercise,
  QuizConfig,
  WeeklyPlan,
  Transformation,
  SiteContent,
} from "../../../shared/types";
import {
  INITIAL_CURRENCIES,
  INITIAL_PRICING_PLANS,
  INITIAL_SITE_CONFIG,
  INITIAL_EXERCISES,
  INITIAL_TRANSFORMATIONS,
  INITIAL_QUIZ_CONFIG,
  INITIAL_WEEKLY_PLANS,
} from "../data/seedData";

export interface DatabaseState {
  users: User[];
  siteConfig: SiteContent;
  pricingPlans: PricingPlan[];
  currencies: CurrencyConfig[];
  exercises: Exercise[];
  quizConfig: QuizConfig;
  subscriptions: Subscription[];
  weeklyPlans: WeeklyPlan[];
  transformations: Transformation[];
  lastRateSync?: string;
}

const STORAGE_FILE = path.join(process.cwd(), "prisma", "database.json");

function buildDefaultState(): DatabaseState {
  const adminHash = bcrypt.hashSync("ElMasry@2026", 10);
  const clientHash = bcrypt.hashSync("Client@2026", 10);
  const now = new Date();
  const threeMonthsLater = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
  const twelveMonthsLater = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);

  return {
    users: [
      {
        id: "admin-1",
        email: "admin@elmasry.com",
        passwordHash: adminHash,
        name: "Captain EL Masry (Admin)",
        phone: "+201099999999",
        role: "ADMIN",
        forcePasswordChange: true,
        level: "ADVANCED",
        createdAt: now.toISOString(),
      },
      {
        id: "client-1",
        email: "karim@example.com",
        passwordHash: clientHash,
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
        passwordHash: clientHash,
        name: "Fahad Al-Otaibi",
        phone: "+966501234567",
        role: "CLIENT",
        forcePasswordChange: false,
        age: 27,
        heightCm: 175,
        weightKg: 71,
        goal: "Straddle Planche & Full Front Lever",
        injuries: "None",
        level: "ADVANCED",
        quizScore: 78,
        createdAt: now.toISOString(),
      },
    ],
    siteConfig: INITIAL_SITE_CONFIG,
    pricingPlans: INITIAL_PRICING_PLANS,
    currencies: INITIAL_CURRENCIES,
    exercises: INITIAL_EXERCISES,
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
    ],
    weeklyPlans: INITIAL_WEEKLY_PLANS,
    transformations: INITIAL_TRANSFORMATIONS,
    lastRateSync: now.toISOString(),
  };
}

export const databaseRepository = {
  readState(): DatabaseState {
    try {
      if (!fs.existsSync(STORAGE_FILE)) {
        const dir = path.dirname(STORAGE_FILE);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        const initial = buildDefaultState();
        fs.writeFileSync(STORAGE_FILE, JSON.stringify(initial, null, 2), "utf-8");
        return initial;
      }
      const raw = fs.readFileSync(STORAGE_FILE, "utf-8");
      return JSON.parse(raw) as DatabaseState;
    } catch {
      return buildDefaultState();
    }
  },

  writeState(state: DatabaseState): void {
    const dir = path.dirname(STORAGE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(state, null, 2), "utf-8");
  },

  seedDatabase(): DatabaseState {
    const state = buildDefaultState();
    this.writeState(state);
    return state;
  },
};

