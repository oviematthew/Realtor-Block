/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "var(--brand)",
        "brand-dark": "var(--brand-dark)",
        "brand-light": "var(--brand-light)",
      },
      fontFamily: {
        text: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
