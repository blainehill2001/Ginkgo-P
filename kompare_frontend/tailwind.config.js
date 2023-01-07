/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {}
  },
  daisyui: {
    theme: true
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")]
};
