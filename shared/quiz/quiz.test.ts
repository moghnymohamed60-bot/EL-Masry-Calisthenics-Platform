import assert from "node:assert";
import { calculateQuizTotalScore, classifyAthleteLevel } from "./index";

export function runQuizTests() {
  // 1. Score calculation
  const score = calculateQuizTotalScore({ q1: 8, q2: 7, q3: 8, q4: 4 });
  assert.strictEqual(score, 27, "Total score should sum to 27");

  // 2. Beginner classification (< 35)
  assert.strictEqual(classifyAthleteLevel(20, 35, 70), "BEGINNER");

  // 3. Intermediate classification (35 - 69)
  assert.strictEqual(classifyAthleteLevel(35, 35, 70), "INTERMEDIATE");
  assert.strictEqual(classifyAthleteLevel(55, 35, 70), "INTERMEDIATE");

  // 4. Advanced classification (>= 70)
  assert.strictEqual(classifyAthleteLevel(70, 35, 70), "ADVANCED");
  assert.strictEqual(classifyAthleteLevel(95, 35, 70), "ADVANCED");

  console.log("✅ All shared/quiz unit tests passed!");
}

if (require.main === module) {
  runQuizTests();
}

