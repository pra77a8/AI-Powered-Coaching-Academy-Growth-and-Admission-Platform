import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EFF7F4',
          100: '#DCEFEA',
          700: '#18796D',
          800: '#12645B',
          900: '#0B4F49',
          950: '#073B36',
        },
        background: '#F7F8F6',
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F1F4F2',
        },
        'text-primary': '#172522',
        'text-secondary': '#66736F',
        'border-subtle': '#E2E8E5',
        'border-strong': '#CBD6D1',
        semantic: {
          success: '#16845B',
          warning: '#B7791F',
          danger: '#C2413B',
          info: '#3478A8',
          neutral: '#64716C',
        },
        chart: {
          1: '#0B6B60',
          2: '#4B83C4',
          3: '#D69A36',
          4: '#8873B8',
          5: '#84938D',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Manrope', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
        btn: '10px',
        panel: '20px',
      },
      boxShadow: {
        soft: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.02)',
        elevation: '0 4px 14px rgba(7, 59, 54, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;

