import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        porcelain: "#f7f5f0",
        cream: "#efe9dd",
        card: "#ffffff",
        ink: "#1c1913",
        night: "#14120d",
        stone: "#6e675c",
        line: "#e5e0d6",
        brass: "#9a7b3f",
        "brass-deep": "#7c6230",
        "brass-pale": "#c9ad72",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      maxWidth: {
        shell: "76rem",
      },
    },
  },
  plugins: [],
};

export default config;
