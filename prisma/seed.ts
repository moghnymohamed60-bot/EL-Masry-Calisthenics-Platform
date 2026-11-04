/**
 * Seed script for EL Masry Calisthenics Database
 * Run with: npm run db:seed
 */
import { getDb, saveDb } from "../src/lib/db";

async function main() {
  console.log("🌱 Seeding EL Masry Calisthenics database...");
  const db = getDb();
  saveDb(db);
  console.log(`✅ Seeded ${db.currencies.length} currencies (USD + 21 Arab currencies)`);
  console.log(`✅ Seeded ${db.pricingPlans.length} pricing plans`);
  console.log(`✅ Seeded ${db.exercises.length} calisthenics exercises with videos`);
  console.log(`✅ Seeded ${db.quizConfig.questions.length} level assessment quiz questions`);
  console.log(`✅ Seeded default Admin account: admin@elmasry.com / ElMasry@2026 (forcePasswordChange=true)`);
  console.log(`✅ Seeded sample Client account: karim@example.com / Client@2026`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

