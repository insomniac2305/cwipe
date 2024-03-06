import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(closest-side, var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        heading: ["var(--font-heading)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            background: "#030712",
            foreground: "#f9fafb",
            default: {
              50: "#111827",
              100: "#1f2937",
              200: "#374151",
              300: "#4b5563",
              400: "#6b7280",
              500: "#9ca3af",
              600: "#d1d5db",
              700: "#e5e7eb",
              800: "#f3f4f6",
              900: "#f9fafb",
              DEFAULT: "#374151",
            },
            content1: "#111827",
            content2: "#1f2937",
            content3: "#374151",
            content4: "#4b5563",
          },
        },
      },
    }),
  ],
};
export default config;
