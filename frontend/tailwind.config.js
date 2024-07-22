/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'turquoise-green': '#4ECCA3',
        'light-turquoise': '#4EB1BA',
        'light-gray': '#F0F4F8',
        'dark-gray': '#333333',
        'error-red': '#FF6B6B',
        'success-green': '#28A745',
      },
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui:{
    themes: [
      "pastel",
    ],
  }
}

