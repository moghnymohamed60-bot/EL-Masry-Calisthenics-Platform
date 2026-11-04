import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "EL Masry Calisthenics | الكابتن المصري للتدريب الأونلاين",
  description:
    "Official online calisthenics coaching platform by Egyptian Champion EL Masry (1st Place iFlag, EGYFIT, Move DB). Custom workout plans, video exercise library, level assessment quiz, and weekly WhatsApp follow-ups.",
  keywords: [
    "EL Masry",
    "Calisthenics Coach Egypt",
    "كاليستنكس",
    "الكابتن المصري",
    "Online Calisthenics Coaching",
    "Planche",
    "Front Lever",
    "Muscle Up",
  ],
  openGraph: {
    title: "EL Masry Calisthenics | Master Your Bodyweight",
    description:
      "Structured online calisthenics coaching, level assessment quiz, and weekly WhatsApp follow-up with Champion Coach EL Masry.",
    type: "website",
    locale: "ar_EG",
    alternateLocale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "EL Masry Calisthenics Online Coaching",
    description:
      "Online calisthenics training programs, skill progressions, and 1-on-1 coaching by Egyptian Champion EL Masry.",
    founder: {
      "@type": "Person",
      name: "EL Masry",
      jobTitle: "Professional Calisthenics Coach & Champion",
      award: [
        "1st Place iFlag Championship",
        "1st Place EGYFIT",
        "1st Place Move DB",
        "2nd Place National Championship",
        "2nd Place Cali Coast",
      ],
    },
  };

  return (
    <html lang="ar" dir="rtl" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cairo:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-brand-black text-white min-h-screen">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}

