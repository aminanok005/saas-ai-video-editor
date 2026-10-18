/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './providers.tsx',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background & Surfaces
        'app-bg': '#0D0E12',
        'surface': '#161820',
        'surface-hover': '#202330',
        'glass': 'rgba(22, 24, 32, 0.75)',

        // Accents
        'accent-gold': '#FFB800',
        'accent-orange': '#FF6B00',

        // Status Colors
        'status-pass': '#34C759',
        'status-warning': '#FF9F0A',
        'status-fail': '#FF3B30',
        'status-active': '#0A84FF',

        // Text
        'text-primary': '#F5F6FA',
        'text-secondary': '#9DA3B4',
        'text-muted': '#62687A',

        // Borders
        'border-subtle': '#2A2E3D',
        'border-focus': '#FFB800',
      },
      borderRadius: {
        sm: '8px',
        md: '14px',
        lg: '20px',
      },
      boxShadow: {
        card: '0 12px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      fontFamily: {
        main: ['Kanit', 'Inter', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}