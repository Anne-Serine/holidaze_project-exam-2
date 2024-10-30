/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      container: {
        center: true
      },
      colors: {
        "daze-bg": "#F2F2F2",
        "daze-text": "#141F2A",
        "daze-primary": "#2F4A52",
        "daze-primary-op50": "#909EA2",
        "daze-secondary": "#648E94",
        "daze-accent": "#C78D70",
        "daze-accent-op30": "#E5D4CB",
        "daze-white": "#FFFFFF",
        "daze-gray": "#353535"
      }
    },
  },
  plugins: [],
}