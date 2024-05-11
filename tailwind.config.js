/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1F1D2B",
        accent: "#EA7C69",
        dark: "#252836",
        overlay: "rgba(0, 0, 0, 0.7)",
      },
      dropShadow: {
        "2xl": "0px 8px 24px 0px rgba(234, 124, 105, 0.32)",
      },
    },
  },

  plugins: [],
};
