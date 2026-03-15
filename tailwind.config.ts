import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        brand: {
          primary: "#7B6BA6",
          "primary-light": "#9B8EC0",
          "primary-dark": "#5C4F82",
          "primary-50": "#F3F0F8",
          navy: "#1B2A4A",
          "navy-light": "#2A3F6B",
        },
        cta: {
          primary: "#8B5CF6",
          hover: "#7C3AED",
        },
        surface: {
          primary: "#FFFFFF",
          secondary: "#F9F8FC",
          tertiary: "#F3F0F8",
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'brand-sm': '0 1px 2px rgba(123, 107, 166, 0.06)',
        'brand-md': '0 4px 12px rgba(123, 107, 166, 0.08)',
        'brand-lg': '0 12px 32px rgba(123, 107, 166, 0.12)',
        'cta': '0 2px 8px rgba(139, 92, 246, 0.3)',
        'cta-hover': '0 4px 16px rgba(139, 92, 246, 0.4)',
      },
      maxWidth: {
        'content': '1200px',
        'narrow': '720px',
      },
    }
  },
  plugins: []
};
export default config;
