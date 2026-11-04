import React from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { PricingSection } from "../components/pricing/PricingSection";
import { QuizSubscriptionModal } from "../components/quiz/QuizSubscriptionModal";

export function PricingPage() {
  return (
    <div className="min-h-screen bg-brand-black text-white">
      <Navbar />
      <QuizSubscriptionModal />
      <PricingSection />
      <Footer />
    </div>
  );
}

