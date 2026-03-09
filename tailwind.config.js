/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors:{
        neon:"#00ffff",
        cyber:"#8b5cf6"
      }
    },
  },
  plugins: [],
}