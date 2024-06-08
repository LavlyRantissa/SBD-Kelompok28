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
        'primary': '#F78F43',
        'secondary': '#FFFDD0',
        'third': '#F5B24D',
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