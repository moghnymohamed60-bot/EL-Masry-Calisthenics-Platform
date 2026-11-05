import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#080A0F",
          navy: "#0B162C",
          royal: "#0F295C",
          card: "#111622",
          blue: "#1E5EFF",
          accent: "#3B82F6",
          grey: "#E5E9F0",
          "grey-mid": "#CBD5E1",
          "grey-dark": "#64748B",
          white: "#FFFFFF",
          glow: "rgba(30, 94, 255, 0.35)",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "var(--font-cairo)", "sans-serif"],
        sans: ["var(--font-inter)", "var(--font-cairo)", "sans-serif"],
        arabic: ["var(--font-cairo)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 28px rgba(30, 94, 255, 0.35)",
        "glow-lg": "0 0 50px rgba(59, 130, 246, 0.45)",
        "card-light": "0 20px 45px -15px rgba(8, 10, 15, 0.14), 0 0 1px 1px rgba(15, 41, 92, 0.08)",
        "card-dark": "0 24px 50px -12px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
