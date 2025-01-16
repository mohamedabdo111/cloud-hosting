import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true, // Center the container by default
      padding: {
        DEFAULT: "1rem", // Default padding
        sm: "2rem", // Padding for small screens
        lg: "4rem", // Padding for large screens
        xl: "5rem", // Padding for extra-large screens
      },
      screens: {
        sm: "640px", // Breakpoint for small screens
        md: "768px", // Breakpoint for medium screens
        lg: "1024px", // Breakpoint for large screens
        xl: "1280px", // Breakpoint for extra-large screens
        "2xl": "1536px", // Breakpoint for 2x extra-large screens
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
