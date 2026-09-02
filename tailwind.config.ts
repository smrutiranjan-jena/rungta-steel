import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base = #1e3a8a. Scale built around it so bg-primary-600 is exactly your brand color.
        primary: {
          50: "#eef2fb",
          100: "#dce6f7",
          200: "#b3c5ec",
          300: "#8aa3e0",
          400: "#4d6cc9",
          500: "#2748a8",
          600: "#1e3a8a", // brand primary
          700: "#182f6f",
          800: "#142556",
          900: "#101d42",
        },
        // Warm steel/rust accent — used sparingly (focus rings, selected state, small emphasis)
        // accent: {
        //   400: "#e07a3f",
        //   500: "#c2611f",
        //   600: "#a3521c",
        // },

        accent: {
          400: "#ff4d4d",
          500: "#ff0000",
          600: "#cc0000",
        },


        // Cool graphite neutrals, slightly blue-tinted to sit next to the navy
        graphite: {
          50: "#f6f7f9",
          100: "#eceef2",
          200: "#d8dce3",
          300: "#b8bfcc",
          400: "#8b93a5",
          500: "#5f6779",
          600: "#454c5c",
          700: "#313644",
          800: "#20232d",
          900: "#14161c",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20, 37, 86, 0.06), 0 1px 1px rgba(20, 37, 86, 0.04)",
      },
    },
  },
  plugins: [],
} satisfies Config;