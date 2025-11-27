/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bayou: {
                    dark: '#0c0a09', // stone-950
                    cream: '#f5f5f4', // stone-100
                    gold: '#d97706', // amber-600
                    green: '#064e3b', // emerald-900
                    accent: '#78350f', // amber-900
                }
            },
            fontFamily: {
                display: ['Oswald', 'Impact', 'sans-serif'],
                serif: ['Georgia', 'serif'],
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
