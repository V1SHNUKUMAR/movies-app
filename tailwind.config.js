/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      openSans: ["Open Sans", "sans-serif"],
      Gilroy: ["Roboto", "Arial", "Helvetica", "sans-serif"],
    },
    extend: {
      screens: {
        xs: "281px",
      },
    },
  },
  plugins: [],
};
