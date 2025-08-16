import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        teal: {
          DEFAULT: "#008B8B"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      }
    }
  },
  plugins: []
};
export default config;
