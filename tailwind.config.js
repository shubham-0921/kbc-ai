/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kbc-purple': '#1a0b2e', // Deep purple
        'kbc-purple-light': '#2d1b4e', // Lighter purple
        'kbc-gold': '#ffd700', // Gold
        'kbc-gold-dark': '#b8860b', // Dark gold
        'kbc-blue': '#0a0e27', // Dark blue
        'game-primary': '#ffd700', // Gold
        'game-secondary': '#2d1b4e', // Purple
        'correct': '#00ff00', // Bright green
        'incorrect': '#ff0000', // Bright red
      },
      fontFamily: {
        'display': ['Georgia', 'serif'],
        'body': ['Arial', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'shimmer': 'shimmer 2s infinite',
        'fadeIn': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      },
      backgroundImage: {
        'kbc-gradient': 'linear-gradient(180deg, #0a0e27 0%, #1a0b2e 50%, #2d1b4e 100%)',
      }
    },
  },
  plugins: [],
}
