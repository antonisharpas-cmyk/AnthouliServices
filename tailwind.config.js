/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f7f0',
          100: '#e6ecdd',
          200: '#d0dbc1',
          300: '#b4c2a2',
          400: '#93a97a',
          500: '#688948',
          600: '#587640',
          700: '#475f34',
          800: '#3a4d2b',
          900: '#2f3f24',
          950: '#1a2314',
        },
        stone: {
          450: '#827e79',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(26,35,20,0.04), 0 8px 24px rgba(26,35,20,0.06)',
        cardHover: '0 2px 4px rgba(26,35,20,0.06), 0 16px 40px rgba(26,35,20,0.12)',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: 0, transform: 'translateY(16px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
      },
      animation: { fadeUp: 'fadeUp 0.7s ease-out both' },
    },
  },
  plugins: [],
}
