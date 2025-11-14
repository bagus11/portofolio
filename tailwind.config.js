/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        neon: {
          cyan: '#00ffff',
          blue: '#0080ff',
        },
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #020617 0%, #071226 100%)',
      },
      animation: {
        'typewriter': 'typewriter 2s steps(40, end) forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fadeIn': 'fadeIn 1s ease-in-out',
        'slideUp': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        typewriter: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        glow: {
          'from': { boxShadow: '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff' },
          'to': { boxShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideUp: {
          'from': { transform: 'translateY(20px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
