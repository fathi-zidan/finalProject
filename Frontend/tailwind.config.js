/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sideMenuColor: '#343A40',
        sideMenuTextColor: '#B6AABB',
        hoverColor:'#5B548D',
        formBlack: '#1B191B'
      },
    },
  },
  plugins: [],
}

