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
        "default-text": "#00264D",
        "main-gray": "#F6F8F9",
        "positive-action": "#40BFBF",
        "positive-action-hover": "#00807F",
        "secondary-button": "#DEE5ED",
        "gray-text": "#73808C",
        "gray-text-hover": "#0F3357",
        "control-gray": "#8F99A3",
        "control-gray-hover": "#454D54",
        "negative-red": "#F32448",
        "highlighted-negative-red": "#FF6681",
        "darker-negative-red": "#DA0C30",
        "gray-bg": "#EDF2F7",
        "green-text": "#05C786",
        "border-gray": "#D5DBDD",
        "border-gray-highlighted": "#ABB2BA",
        "error-bg": "#FEE7EB",
        "disabled-text": "#C7CCD1",
        "selected-pill": "#042931",
        "secondary-button-hover": "#BDCCDB",
        "disabled-icon": "#ABB3BA",
      },
    },
  },
  plugins: [],
};
