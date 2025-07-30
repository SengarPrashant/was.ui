/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        secondary: "#6C6C6C",
        icons: "#6C6C6C",
        placeholder: " #ADADAF",
        primary: "#363636",
        nav: "#00695C",
        sidebar: "#374151",
        pl8: "#034B48",
      },
      spacing: {
        110: "30rem",
      },
    },
  },
  plugins: [require("tailwindcss-font-inter")],
};
