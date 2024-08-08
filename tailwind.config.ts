import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          xs: "375px",
          "2xl": "1400px",
        },
      },

      aspectRatio: {
        "2/3": "2/3",
        "3/1": "3/1",
      },
      screens: {
        "2xs": "345px",
        "2sm": "475px",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("@vidstack/react/tailwind.cjs"),
    require("tailwindcss-animate"),
    require("tailwind-scrollbar"),
    nextui({
      layout: {
        radius: {
          small: "4px",
          medium: "8px",
          large: "12px",
        },
      },
    }),
  ],
} satisfies Config;

export default config;
