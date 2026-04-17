/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-monument)', 'sans-serif'],
      },
      colors: {
        background: '#0a0a0a',
        foreground: '#f0f0f0',
        accent: '#7B61FF',
        muted: '#2a2a2a',
        border: '#1a1a1a',
      },
    },
  },
  plugins: [],
}
