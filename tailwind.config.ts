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
          primary: "#1F3864",
          "primary-light": "#3B5C8F",
          "primary-dark": "#0B1F3A",
          "primary-50": "#F2F5FB",
          navy: "#0B1F3A",
          "navy-light": "#1F3864",
        },
        amber: {
          DEFAULT: "#E8A33D",
          hover: "#F0B45F",
          ink: "#0B1F3A",
        },
        cta: {
          primary: "#E8A33D",
          hover: "#F0B45F",
        },
        surface: {
          primary: "#FFFFFF",
          secondary: "#F2F5FB",
          tertiary: "#E3EAF5",
        },
      },
      fontFamily: {
        display: ['"Inter"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'brand-sm': '0 1px 2px rgba(15, 31, 58, 0.06)',
        'brand-md': '0 4px 12px rgba(15, 31, 58, 0.08)',
        'brand-lg': '0 12px 32px rgba(15, 31, 58, 0.12)',
        'cta': '0 2px 8px rgba(232, 163, 61, 0.35)',
        'cta-hover': '0 4px 16px rgba(232, 163, 61, 0.45)',
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
