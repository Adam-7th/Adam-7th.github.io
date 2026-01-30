import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg))",
        panel: "hsl(var(--panel))",
        text: "hsl(var(--text))",
        muted: "hsl(var(--muted))",
        brand: "hsl(var(--brand))",
        brand2: "hsl(var(--brand-2))",
        ring: "hsl(var(--ring))",
        edge: "hsl(var(--edge))",
      },
      boxShadow: {
        glow:
          "0 0 0 1px hsl(var(--edge)), 0 20px 60px -20px hsl(var(--brand) / 0.35)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
