import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f7f2ed",
        panel: "#fffaf4",
        ink: "#1d1d1a",
        muted: "#5c554d",
        brand: { DEFAULT: "#b75f3d", deep: "#8e4329", soft: "#f4d7cc", sand: "#dcae7b" },
        success: { DEFAULT: "#2d7a5a", soft: "#dff3ea" },
      },
      fontFamily: { sans: ["Manrope", "system-ui", "sans-serif"] },
      boxShadow: { card: "0 18px 42px rgba(49, 33, 24, 0.08)" },
    },
  },
  plugins: [],
};
export default config;
