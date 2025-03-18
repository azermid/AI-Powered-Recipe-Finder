/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'apple-black': '#000000',
        'apple-dark-gray': '#1d1d1f',
        'apple-text': '#f5f5f7',
        'apple-accent': '#2997ff',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}