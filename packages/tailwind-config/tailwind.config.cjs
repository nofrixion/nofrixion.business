/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', '../../packages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        mainGrey: '#F6F8F9',
        'default-text': '#00264D',
        greyText: '#73808C',
        greyTextHover: '#0F3357',
        controlGrey: '#8F99A3',
        controlGreyHover: '#454D54',
        negativeRed: '#F32448',
        highlightedNegativeRed: '#FF6681',
        darkerNegativeRed: '#DA0C30',
        greyBg: '#EDF2F7',
        positiveActionBackground: '#40BFBF',
        negativeActionBackground: '#E9EDF1',
        greenText: '#05C786',
        primaryGreen: '#40BFBF',
        primaryGreenHover: '#00807F',
        borderGrey: '#D5DBDD',
        borderGreyHighlighted: '#ABB2BA',
        errorBg: '#FEE7EB',
        disabledText: '#C7CCD1',
        selectedPill: '#042931',
        secondaryButton: '#DEE5ED',
        secondaryButtonHover: '#BDCCDB',
        disabledIcon: '#ABB3BA',
        'dark-bg': '#002233',
        'nav-accent': '#3DD7F5',
        'main-gray-bg': '#F6F8F9',
        'gray-text': '#73808C',
        'active-green': '#40BFBF',
        'default-text': '#00264D',
        'information-bg': '#CEF',
      },
      fontSize: {
        '13px': '0.8125rem',
      },
      boxShadow: {
        small: '0px 2px 8px 0px rgba(4, 41, 49, 0.10);',
      },
      fontFamily: {
        inter: [
          'Inter, sans-serif',
          {
            fontFeatureSettings: '"cv01", "cv02", "cv03", "cv04"',
          },
        ],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
