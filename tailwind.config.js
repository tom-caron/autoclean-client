/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // Un beau bleu de lavage auto (Tailwind blue-600)
        secondary: '#1e40af', // Bleu plus foncé
      }
    },
  },
  plugins: [],
}