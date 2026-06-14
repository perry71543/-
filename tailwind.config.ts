import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        carbon: "#050505",
        graphite: "#111214",
        steel: "#25282c",
        mist: "#d9dde2",
        chrome: "#f4f6f8",
        line: "#06c755",
        shopee: "#ee4d2d"
      },
      boxShadow: {
        "silver-glow": "0 24px 80px rgba(216, 222, 228, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
