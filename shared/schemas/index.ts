import { z } from "zod";

export const SignupSubscriptionSchema = z.object({
  clientName: z.string().min(2, "Name is required"),
  clientPhone: z.string().min(6, "Phone / WhatsApp is required"),
  clientEmail: z.string().email().optional().or(z.literal("")),
  password: z.string().optional(),
  age: z.union([z.number(), z.string()]).optional(),
  heightCm: z.union([z.number(), z.string()]).optional(),
  weightKg: z.union([z.number(), z.string()]).optional(),
  goal: z.string().optional(),
  injuries: z.string().optional(),
  assessedLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).default("BEGINNER"),
  quizScore: z.number().default(0),
  quizAnswers: z.record(z.string(), z.number()).default({}),
  planId: z.string().min(1, "Plan ID is required"),
  currencyCode: z.string().default("EGP"),
  exchangeRateUsed: z.number().default(1),
  displayedAmount: z.number(),
  paymentMethod: z.enum(["WHATSAPP", "INSTAPAY", "PAYMOB", "FAWRY"]).default("WHATSAPP"),
});

export const ExerciseSchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  titleAr: z.string().min(2),
  titleEn: z.string().min(2),
  descriptionAr: z.string().min(2),
  descriptionEn: z.string().min(2),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  muscleGroup: z.string().min(2),
  skill: z.string().min(2),
  videoUrl: z.string().url(),
  thumbnailUrl: z.string().url(),
  photos: z.array(z.string()).default([]),
  cuesAr: z.array(z.string()).default([]),
  cuesEn: z.array(z.string()).default([]),
  featured: z.boolean().default(true),
});

export const CurrencyConfigSchema = z.object({
  code: z.string().min(3).max(3),
  nameEn: z.string(),
  nameAr: z.string(),
  symbol: z.string(),
  flag: z.string(),
  decimals: z.number().int().min(0).max(3),
  rateFromEgp: z.number().positive(),
  isAutoRate: z.boolean(),
  roundingRule: z.number().int(),
  enabled: z.boolean(),
  isDefault: z.boolean(),
  sortOrder: z.number().int(),
});

export const PricingPlanSchema = z.object({
  id: z.string(),
  slug: z.string(),
  durationMonths: z.number().int().positive(),
  labelAr: z.string(),
  labelEn: z.string(),
  priceEgp: z.number().positive(),
  isBestValue: z.boolean(),
  savingPercent: z.number().min(0).max(100),
  sortOrder: z.number().int(),
  overrides: z.record(z.string(), z.number()),
  featuresAr: z.array(z.string()),
  featuresEn: z.array(z.string()),
  active: z.boolean(),
});

export const WeeklyPlanSchema = z.object({
  id: z.string().optional(),
  titleAr: z.string().min(2),
  titleEn: z.string().min(2),
  weekNumber: z.number().int().positive().default(1),
  targetLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(),
  userId: z.string().optional(),
  notesAr: z.string().optional(),
  notesEn: z.string().optional(),
  days: z.array(
    z.object({
      dayNumber: z.number().int().positive(),
      titleAr: z.string(),
      titleEn: z.string(),
      exercises: z.array(
        z.object({
          titleAr: z.string(),
          titleEn: z.string(),
          sets: z.number().int().positive(),
          reps: z.string(),
          restSeconds: z.number().int().nonnegative(),
          notesAr: z.string().optional(),
          notesEn: z.string().optional(),
          videoUrl: z.string().optional(),
        })
      ),
    })
  ),
  active: z.boolean().default(true),
});

