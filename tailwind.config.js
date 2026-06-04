/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          950: "#020617",
          900: "#07111f",
          800: "#0b1729",
        },
      },
      boxShadow: {
        soft: "0 18px 60px rgba(2, 6, 23, 0.18)",
        glow: "0 0 42px rgba(34, 211, 238, 0.18)",
      },
    },
  },
  plugins: [],
};
