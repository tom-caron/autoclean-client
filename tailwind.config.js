/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#78e0dc',   // Le turquoise principal
        secondary: '#8eedf7', // Le bleu ciel clair
        tertiary: '#a1cdf1',  // Le bleu pastel plus doux
      }
    },
  },
  plugins: [],
}