/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
<<<<<<< HEAD
    extend: {
      colors: {
        // Professional colors - Blue/Purple gradient template (Aternus 42 style)
        primary: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',  // Vibrant blue-purple
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
        accent: {
          blue: '#6366F1',  // Primary blue-purple
          purple: '#8B5CF6', // Purple accent
          dark: '#1E293B',   // Dark grey for text
          light: '#F8FAFC',  // Off-white
        },
        // Off-white/light beige backgrounds
        cream: {
          50: '#FEFDFB',
          100: '#FDFBF7',
          200: '#FBF7EF',
          300: '#F9F3E7',
          400: '#F7EFDF',
          500: '#F5EBD7',
        },
        // Soft pastel blue (hero and section backgrounds)
        sky: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
        },
        // Muted slate for text and UI elements
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        // Accent colors
        sage: {
          50: '#F5F7F5',
          100: '#E8EDE8',
          200: '#D1DBD1',
          300: '#B3C4B3',
          400: '#8FA98F',
          500: '#6B8E6B',
          600: '#557155',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-1': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-2': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-3': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(123, 168, 168, 0.1), 0 4px 6px -2px rgba(123, 168, 168, 0.05)',
        'soft-lg': '0 10px 40px -10px rgba(123, 168, 168, 0.15), 0 4px 6px -2px rgba(123, 168, 168, 0.05)',
        'soft-xl': '0 20px 50px -12px rgba(123, 168, 168, 0.2)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
=======
    extend: {},
>>>>>>> d3e4fdb54f63a5644688415307bdc5786787a8fc
  },
  plugins: [],
};

