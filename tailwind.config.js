/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      scale: {
        '115': '1.15',
      },
      backgroundColor: {
        'warm': 'var(--color-bg-warm)',
        'warmer': 'var(--color-bg-warmer)',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-warm',
    'bg-warmer',
    'bg-primary',
    'bg-primary-light',
    'text-primary',
    'text-accent',
  ]
}

