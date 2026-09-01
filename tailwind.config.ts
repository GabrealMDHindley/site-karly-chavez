import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#161120",
        surface: "#1f1830",
        line: "#2a2140",
        paper: "#f5f1ea",
        muted: "#a89fb0",
        coral: "#f0818a",
        peach: "#f3a699",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
