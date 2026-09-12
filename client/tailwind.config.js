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
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          800: '#1e293b',
          900: '#0f172a',
          950: '#060810',
        },
        kerala: {
          blue: '#0066ff',
          yellow: '#ffcc00',
          lime: '#a3e635',
          red: '#ef4444',
          orange: '#f97316',
          dark: '#08080d',
          card: '#101320',
          cream: '#fefce8',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        bungee: ['Bungee', 'cursive', 'sans-serif'],
        malayalam: ['Noto Sans Malayalam', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
