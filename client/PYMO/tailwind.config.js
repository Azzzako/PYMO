/** @type {import('tailwindcss').Config} */

export default {
  content:  ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'bg1': 'url(./src/assets/deg1.png)'
      }
    },
  },
  plugins: [],
}

