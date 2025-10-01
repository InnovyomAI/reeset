import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        red: "#D32F2F",
        blue: "#1A237E",
        green: "#388E3C",
        gray: "#F5F5F5",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};

export default config;
