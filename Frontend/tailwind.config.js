/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      current: 'currentColor',
      'Primary_dark': '#25424C',
      'Secondary_dark': '#FFA45B',
      'Third_dark': '#FB770D',
      'white': '#FFFFFF'
    },
    extend: {},
  },
  plugins: [],
}