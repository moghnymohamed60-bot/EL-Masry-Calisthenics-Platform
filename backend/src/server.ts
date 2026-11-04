import { app } from "./app";
import { databaseRepository } from "./storage/databaseRepository";

const PORT = Number(process.env.PORT || 4000);

// Ensure initial seed data is ready on boot
databaseRepository.readState();

app.listen(PORT, () => {
  console.log(`🚀 EL Masry Calisthenics Express API Server running on http://localhost:${PORT}`);
});

