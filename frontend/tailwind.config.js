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
      {
        mytheme: {
          "primary": "#4ECCA3",
          "secondary": "#4EB1BA",
          "accent": "#4EB1BA",
          "neutral": "#333333",
          "base-100": "#FFFFFF",
          "info": "#4EB1BA",
          "success": "#28A745",
          "warning": "#FF6B6B",
          "error": "#FF6B6B",
        },
      },
      "business",
    ],
  }
}

