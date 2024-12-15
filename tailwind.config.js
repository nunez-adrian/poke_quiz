/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true, // Para que no haga override los estilos de material. Solo queremos los componentes
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

