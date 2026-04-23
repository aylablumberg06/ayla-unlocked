import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FDF6F0',
        pink: {
          DEFAULT: '#E8295C',
          light: '#FFE4ED',
          pale: '#FFF5F8',
        },
        'left-bg': '#F7EEE7',
        dark: '#1A1A1A',
        mid: '#5C5C5C',
        'muted-light': '#ABABAB',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
