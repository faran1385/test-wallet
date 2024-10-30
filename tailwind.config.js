/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                wallet: {
                    dark: '#242431',
                    green: '#24D998',
                    disable: {
                        background: '#CAD2DC',
                        text:'#4F5459'
                    }
                }
            },
        },
    },
    plugins: [],
}