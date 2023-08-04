/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // app content
    "src/**/*.{js,ts,jsx,tsx}",
    // include packages if not transpiling
    // "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-gray": "#F6F8F9",
      },
    },
  },
  plugins: [],
};
