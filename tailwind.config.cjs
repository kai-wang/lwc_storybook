/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/modules/**/*.{html, js}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
      }
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
