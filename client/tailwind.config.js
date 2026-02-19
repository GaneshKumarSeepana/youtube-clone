/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0c',
        sidebar: 'rgba(15, 15, 18, 0.8)',
        navbar: 'rgba(10, 10, 12, 0.85)',
        accent: '#22c55e',
        primary: '#fffffe',
        secondary: '#94a1b2',
        card: '#16161a',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
