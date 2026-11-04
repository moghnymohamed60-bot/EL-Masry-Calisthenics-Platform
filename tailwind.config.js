/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0A0A0A",
          navy: "#070D19",
          card: "#111622",
          blue: "#1E6BFF",
          accent: "#2D7BFF",
          glow: "rgba(30, 107, 255, 0.35)",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "var(--font-cairo)", "sans-serif"],
        sans: ["var(--font-inter)", "var(--font-cairo)", "sans-serif"],
        arabic: ["var(--font-cairo)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(30, 107, 255, 0.35)",
        "glow-lg": "0 0 45px rgba(45, 123, 255, 0.5)",
      },
    },
  },
  plugins: [],
};

