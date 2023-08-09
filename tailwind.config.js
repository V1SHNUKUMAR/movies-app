/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      openSans: ["Open Sans", "sans-serif"],
    },
    extend: {
      screens: {
        xs: "281px",
      },
    },
  },
  plugins: [],
};
