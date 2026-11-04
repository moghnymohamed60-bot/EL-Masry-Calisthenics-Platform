import React from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { HomeSections } from "../components/home/HomeSections";
import { PricingSection } from "../components/pricing/PricingSection";
import { ExerciseLibrarySection } from "../components/exercises/ExerciseLibrarySection";
import { QuizSubscriptionModal } from "../components/quiz/QuizSubscriptionModal";

export function HomePage() {
  return (
    <div className="min-h-screen bg-brand-black text-white selection:bg-brand-blue selection:text-white">
      <Navbar />
      <QuizSubscriptionModal />
      <HomeSections />
      <PricingSection />
      <ExerciseLibrarySection />
      <Footer />
    </div>
  );
}

