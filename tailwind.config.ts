import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#2D3A47",
        card: "#3d4f5e",
        deep: "#1e2a35",
        accent: "#ECC4C3",
        accent2: "#B97D7B",
        text: "#DDD3C9",
        muted: "#A9B7C6",
        haki: "#928E5E",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;