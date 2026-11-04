import { databaseRepository } from "../src/storage/databaseRepository";

async function main() {
  console.log("🌱 Seeding EL Masry Calisthenics MySQL / Storage Repository...");
  const db = databaseRepository.seedDatabase();
  console.log(`✅ Seeded ${db.currencies.length} currencies (USD + 21 Arab currencies)`);
  console.log(`✅ Seeded ${db.pricingPlans.length} pricing plans`);
  console.log(`✅ Seeded ${db.exercises.length} calisthenics exercises with explanation videos`);
  console.log(`✅ Seeded ${db.quizConfig.questions.length} level assessment quiz questions`);
  console.log(`✅ Seeded default Admin: admin@elmasry.com / ElMasry@2026 (forcePasswordChange=true)`);
  console.log(`✅ Seeded demo Client: karim@example.com / Client@2026`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

