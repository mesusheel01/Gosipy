/** @type {import('tailwindcss').Config} */
export default {
    mode: 'jit',
    content: [
      "./index.html",
      "./src/**/*.{ts,tsx,js,jsx}"
    ],
    theme: {
      extend: {
        keyframes: {
          typewriterSm: {
            '0%': { width: '0%' },
            '100%': { width: '70%' },
          },
          typewriterMd: {
            '0%': { width: '0%' },
            '100%': { width: '60%' },
          },
          typewriterLg: {
            '0%': { width: '0%' },
            '100%': { width: '45%' },
          },
          blink: {
            '0%, 100%': { borderColor: 'transparent' },
            '50%': { borderColor: 'currentColor' },
          },
        },
        animation: {
          typewriterSm: 'typewriterSm 5s steps(50, end), blink 1s step-end infinite',
          typewriterMd: 'typewriterMd 5s steps(50, end), blink 1s step-end infinite',
          typewriterLg: 'typewriterLg 5s steps(50, end), blink 1s step-end infinite',
        },
        colors: {
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
