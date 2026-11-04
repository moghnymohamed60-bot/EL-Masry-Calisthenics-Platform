import { AthleteLevel } from "../types";
import { QUIZ_LEVEL_THRESHOLDS } from "../constants";

/**
 * Pure quiz scoring calculation from questionId -> points map
 */
export function calculateQuizTotalScore(answers: Record<string, number>): number {
  return Object.values(answers).reduce((sum, pts) => sum + (Number(pts) || 0), 0);
}

/**
 * Pure athlete level classification based on configurable thresholds
 */
export function classifyAthleteLevel(
  score: number,
  intermediateThreshold: number = QUIZ_LEVEL_THRESHOLDS.intermediate,
  advancedThreshold: number = QUIZ_LEVEL_THRESHOLDS.advanced
): AthleteLevel {
  if (score >= advancedThreshold) {
    return "ADVANCED";
  }
  if (score >= intermediateThreshold) {
    return "INTERMEDIATE";
  }
  return "BEGINNER";
}

