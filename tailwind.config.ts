import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#003ABD",
          navy: "#00226E",
          dark: "#0B2349",
        },
        accent: "#FF8C00",
        gold: "#FFC200",
        coral: "#FF785E",
      },
      fontFamily: {
        sans: ["var(--font-barlow)", "Barlow", "sans-serif"],
      },
      maxWidth: {
        site: "1620px",
      },
      boxShadow: {
        panel: "3px 3px 9px 6px rgba(0,0,0,0.15)",
        card: "0 4px 4px rgba(0,0,0,0.25)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 250ms ease-out",
        "slide-up": "slide-up 300ms ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
