/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1F1D2B",
        darkGray: "#393C49",
        accent: "#EA7C69",
        offWhite: "#ABBBC2",
        dark: "#252836",
        overlay: "rgba(0, 0, 0, 0.7)",
      },
      lineHeight: {
        4.5: "1.125rem",
      },
      height: {
        9.5: "2.375rem",
        13.5: "3.375rem",
        15: "3.75rem",
        70: "17.5rem",
        35: "8.75rem",
      },
      width: {
        99: "24.75rem",
      },
      size: {
        9.5: "2.375rem",
        13.5: "3.375rem",
        15: "3.75rem",
      },
      space: {
        2.5: "0.625rem",
      },
      padding: {
        3.5: "0.875rem",
      },
      gridTemplateColumns: {
        "sm-product": "repeat(auto-fill, minmax(300px, 1fr))",
        "md-product": "repeat(auto-fill, minmax(176px, 1fr))",
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "21.6px" }],
        sm: ["0.875rem", { lineHeight: "19.6px" }],
        base: ["1rem", { lineHeight: "22.4px" }],
        lg: ["1.125rem", { lineHeight: "32.4px" }],
        "2xl": ["1.625rem", { lineHeight: "36.4px" }],
      },
      opacity: {
        4: "0.04",
        8: "0.08",
        18: "0.18",
      },
      boxShadow: {
        "2xl": "0px 8px 24px 0px rgba(234, 124, 105, 0.32)",
      },
    },
  },

  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/forms")],
};
