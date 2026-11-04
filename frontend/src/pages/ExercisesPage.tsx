import React from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ExerciseLibrarySection } from "../components/exercises/ExerciseLibrarySection";
import { QuizSubscriptionModal } from "../components/quiz/QuizSubscriptionModal";

export function ExercisesPage() {
  return (
    <div className="min-h-screen bg-brand-black text-white">
      <Navbar />
      <QuizSubscriptionModal />
      <ExerciseLibrarySection />
      <Footer />
    </div>
  );
}

