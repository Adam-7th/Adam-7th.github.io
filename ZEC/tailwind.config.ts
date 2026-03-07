import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg))",
        panel: "hsl(var(--surface))",
        panel2: "hsl(var(--surface-2))",
        text: "hsl(var(--text))",
        muted: "hsl(var(--muted))",
        edge: "hsl(var(--border))",
        brand: "hsl(var(--accent))",
        brand2: "hsl(var(--accent))",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px hsl(var(--border)), 0 20px 55px -36px hsl(var(--accent) / 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
