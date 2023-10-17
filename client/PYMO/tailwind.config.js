/** @type {import('tailwindcss').Config} */

export default {
  content:  ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'bg1': 'url(./src/assets/deg1.png)',
        'bg2': 'url(./src/assets/deg2.png)',
        'bg3': 'url(./src/assets/deg3.png)'
      },
      fontFamily: {
        filson: ['Filson', 'sans'],
        agora: ['Agora', 'sans']
      }
    },
  },
  plugins: [],
}

