/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'dark-bg': '#002233',
        'nav-accent': '#3DD7F5',
        'main-gray-bg': '#F6F8F9',
        'gray-text': '#73808C',
        'active-green': '#40BFBF',
        'default-text': '#00264D',
        'information-bg': '#CEF',
      },
      boxShadow: {
        small: '0px 2px 8px 0px rgba(4, 41, 49, 0.10);',
      },
      boxShadow: {
        small: '0px 2px 8px 0px rgba(4, 41, 49, 0.10);',
      },
    },
  },
  plugins: [],
  prefix: 'biz-',
  fontFamily: {
    inter: [
      'Inter, sans-serif',
      {
        fontFeatureSettings: '"cv01", "cv02", "cv03", "cv04"',
      },
    ],
  },
}
