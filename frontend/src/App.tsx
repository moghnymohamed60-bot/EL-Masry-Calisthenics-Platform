import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { HomePage } from "./pages/HomePage";
import { PricingPage } from "./pages/PricingPage";
import { ExercisesPage } from "./pages/ExercisesPage";
import { ClientAreaPage } from "./pages/ClientAreaPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/client" element={<ClientAreaPage />} />
          <Route path="/login" element={<ClientAreaPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

