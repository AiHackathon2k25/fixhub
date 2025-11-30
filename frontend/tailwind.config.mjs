/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Soft teal/cyan palette inspired by the template
        primary: {
          50: '#F0F9F9',
          100: '#D9F0F0',
          200: '#B3E0E0',
          300: '#8DD1D1',
          400: '#6EC4C4',
          500: '#7BA8A8',  // Main teal
          600: '#5A8B8B',
          700: '#446B6B',
          800: '#2E4A4A',
          900: '#1C2D2D',
        },
        // Soft background colors
        cream: {
          50: '#FDFCFB',
          100: '#FAF7F4',
          200: '#F5F1ED',
          300: '#F0EBE6',
          400: '#EBE5DF',
          500: '#E6DFD8',
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
  },
  plugins: [],
};

