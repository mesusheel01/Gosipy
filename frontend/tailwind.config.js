/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
        colors:{
            "my-900": "#0d1321",
            "my-700": "#1d2d44",
            "my-500": "#3e5c76",
            "my-300": "#748cab",
            "my-200": "#f0ebd8",
        }
    },
  },
  plugins: [],
}
