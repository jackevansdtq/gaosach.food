/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'rice-field': {
          green: '#7cb342',
          'light-green': '#aed581',
        },
        'sunset': {
          orange: '#ff8f00',
          gold: '#ffc107',
          pink: '#ff7043',
        },
        'sky': {
          blue: '#81d4fa',
        },
        'earth': {
          brown: '#8d6e63',
        },
        'water': {
          blue: '#4fc3f7',
        },
      },
      backgroundImage: {
        'rice-field': 'linear-gradient(135deg, #7cb342 0%, #aed581 100%)',
        'sunset-sky': 'linear-gradient(135deg, #81d4fa 0%, #ff8f00 50%, #ff7043 100%)',
        'sunset-gold': 'linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)',
      },
      animation: {
        'sunrise-glow': 'sunrise-glow 3s ease-in-out infinite',
      },
      keyframes: {
        'sunrise-glow': {
          '0%': { boxShadow: '0 0 20px rgba(255, 193, 7, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 143, 0, 0.6)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 193, 7, 0.3)' },
        },
      },
    },
  },
  plugins: [],
};
