/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#7c3aed",

          "secondary": "#e879f9",

          "accent": "#84cc16",

          "neutral": "#bac4e6",

          "base-100": "#f3e8ff",

          "info": "#38bdf8",

          "success": "#14b8a6",

          "warning": "#F3CC30",

          "error": "#E24056"
        }
      }
    ]
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")]
};
