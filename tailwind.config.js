/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f0ff',
          100: '#ebdfff',
          200: '#d7c0ff',
          300: '#b992ff',
          400: '#975bff',
          500: '#6a00ff', // Grocave signature primary purple
          600: '#5c00e6',
          700: '#4e00ba',
          800: '#3d0291',
          900: '#2b0366',
          accent: '#7c1cff',
          neon: '#a855f7'
        },
        dark: {
          bg: '#0B0B0F',
          surface: '#111118',
          card: '#161622',
          cardHover: '#1d1d2e',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(106, 0, 255, 0.4)'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
