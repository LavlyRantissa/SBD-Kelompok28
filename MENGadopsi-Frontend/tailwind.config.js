/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        current: 'currentColor',
        'primary': '#F8770D',
        'secondary': '#25424C',
        'third': '#FFA45B',
        'fourth': '#FFEBDB',
        'white': '#FFFFFF',
        'black': '#000000'
      },
      fontFamily: {
        josefin_sans: ['Josefin Sans'],
      },
    },
  },
  plugins: [],
}