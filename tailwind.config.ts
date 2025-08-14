import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#008B8B"
        }
      }
    }
  },
  plugins: []
};
export default config;
